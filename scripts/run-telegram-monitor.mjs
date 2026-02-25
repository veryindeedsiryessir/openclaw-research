#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const CONFIG_PATH = new URL('../data/telegram-monitor.json', import.meta.url);
const REPORT_MD_PATH = new URL('../reports/telegram-monitor-report.md', import.meta.url);
const REPORT_JSON_PATH = new URL('../reports/telegram-monitor-report.json', import.meta.url);

function nowIso() {
  return new Date().toISOString();
}

function normalizeText(s = '') {
  return String(s).toLowerCase();
}

function toFileUrl(relPath) {
  return new URL(`../${relPath.replace(/^\.\//, '')}`, import.meta.url);
}

function truncate(s, max = 240) {
  const text = String(s || '').replace(/\s+/g, ' ').trim();
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}

async function readJsonSafe(pathUrl, fallback) {
  try {
    return JSON.parse(await readFile(pathUrl, 'utf8'));
  } catch {
    return fallback;
  }
}

async function sendTelegramMessage(botToken, chatId, text) {
  const endpoint = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true
    })
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(`Telegram send failed: HTTP ${res.status} ${JSON.stringify(data)}`);
  }
  return data;
}

function itemKey(item) {
  return item.url || `${item.sourceName || ''}::${item.title || ''}::${item.publishedAt || ''}`;
}

function buildAlertMessage(item, keyword) {
  const date = new Date(item.timestamp || item.publishedAt || Date.now()).toISOString().slice(0, 10);
  return [
    '🚨 OpenClaw Monitor Alert',
    `${date} · ${item.sourceName || 'Unknown source'}`,
    `Keyword: ${keyword}`,
    `${item.title || '(untitled)'}`,
    item.url || '',
    item.summary ? `\n${truncate(item.summary, 280)}` : ''
  ].filter(Boolean).join('\n');
}

function buildDigestMessage(items) {
  const lines = ['📰 OpenClaw Monitor Digest'];
  for (const item of items) {
    const date = new Date(item.timestamp || item.publishedAt || Date.now()).toISOString().slice(5, 10);
    lines.push(`- ${date} · ${truncate(item.title, 90)}`);
    if (item.url) lines.push(`  ${item.url}`);
  }
  return lines.join('\n');
}

const config = await readJsonSafe(CONFIG_PATH, {});
const mode = (config.mode || 'passive').toLowerCase();
const keywords = Array.isArray(config.keywords) ? config.keywords.map((k) => normalizeText(k)).filter(Boolean) : [];
const maxAlertsPerRun = Number(config.maxAlertsPerRun || 5);
const digestMaxItems = Number(config.digestMaxItems || 8);

const digestPath = toFileUrl(config?.sources?.dailyDigestJson || 'reports/daily-digest.json');
const statePath = toFileUrl(config?.sources?.stateJson || 'reports/telegram-monitor-state.json');

const digest = await readJsonSafe(digestPath, { items: [] });
const state = await readJsonSafe(statePath, {
  seenKeys: [],
  lastRunAt: null,
  lastDigestAt: null,
  totalAlertsSent: 0
});

const allItems = Array.isArray(digest.items) ? digest.items : [];
const seen = new Set(Array.isArray(state.seenKeys) ? state.seenKeys : []);
const newItems = allItems.filter((item) => !seen.has(itemKey(item)));

const keywordMatches = [];
for (const item of newItems) {
  const haystack = normalizeText(`${item.title || ''} ${item.summary || ''}`);
  for (const kw of keywords) {
    if (haystack.includes(kw)) {
      keywordMatches.push({ item, keyword: kw });
      break;
    }
  }
}

const alerts = keywordMatches.slice(0, maxAlertsPerRun);
const digestItems = newItems.slice(0, digestMaxItems);

const telegramEnabled = Boolean(config?.telegram?.enabled);
const chatIdEnv = config?.telegram?.chatIdEnv || 'TELEGRAM_CHAT_ID';
const botTokenEnv = config?.telegram?.botTokenEnv || 'TELEGRAM_BOT_TOKEN';
const chatId = process.env[chatIdEnv];
const botToken = process.env[botTokenEnv];

const canSend = telegramEnabled && Boolean(chatId) && Boolean(botToken);
const sent = { alerts: 0, digest: 0, errors: [] };

if (mode === 'alerts' || mode === 'active') {
  for (const { item, keyword } of alerts) {
    const msg = buildAlertMessage(item, keyword);
    if (canSend) {
      try {
        await sendTelegramMessage(botToken, chatId, msg);
        sent.alerts += 1;
      } catch (err) {
        sent.errors.push(String(err.message || err));
      }
    }
  }
}

if (mode === 'digest') {
  if (digestItems.length > 0) {
    const msg = buildDigestMessage(digestItems);
    if (canSend) {
      try {
        await sendTelegramMessage(botToken, chatId, msg);
        sent.digest += 1;
      } catch (err) {
        sent.errors.push(String(err.message || err));
      }
    }
  }
}

for (const item of newItems) seen.add(itemKey(item));
const nextState = {
  seenKeys: [...seen].slice(-1500),
  lastRunAt: nowIso(),
  lastDigestAt: mode === 'digest' ? nowIso() : state.lastDigestAt || null,
  totalAlertsSent: Number(state.totalAlertsSent || 0) + sent.alerts
};

const report = {
  generatedAt: nowIso(),
  mode,
  totals: {
    digestItemsTotal: allItems.length,
    newItems: newItems.length,
    keywordMatches: keywordMatches.length,
    alertsPlanned: alerts.length
  },
  telegram: {
    enabled: telegramEnabled,
    canSend,
    sent,
    env: {
      chatIdEnv,
      botTokenEnv,
      chatIdPresent: Boolean(chatId),
      botTokenPresent: Boolean(botToken)
    }
  },
  alerts: alerts.map(({ item, keyword }) => ({
    keyword,
    source: item.sourceName,
    title: item.title,
    url: item.url,
    publishedAt: item.publishedAt
  })),
  digestPreview: digestItems.map((item) => ({
    source: item.sourceName,
    title: item.title,
    url: item.url,
    publishedAt: item.publishedAt
  }))
};

const md = [];
md.push('# Telegram Monitoring Report');
md.push('');
md.push(`Generated: ${report.generatedAt}`);
md.push(`Mode: ${mode}`);
md.push('');
md.push('## Summary');
md.push(`- Digest items available: **${report.totals.digestItemsTotal}**`);
md.push(`- New unseen items: **${report.totals.newItems}**`);
md.push(`- Keyword matches: **${report.totals.keywordMatches}**`);
md.push(`- Alerts planned this run: **${report.totals.alertsPlanned}**`);
md.push('');
md.push('## Telegram Delivery');
md.push(`- Enabled in config: **${report.telegram.enabled}**`);
md.push(`- Can send now: **${report.telegram.canSend}**`);
md.push(`- Alerts sent: **${report.telegram.sent.alerts}**`);
md.push(`- Digest sent: **${report.telegram.sent.digest}**`);
if (report.telegram.sent.errors.length) {
  md.push('- Errors:');
  for (const err of report.telegram.sent.errors) md.push(`  - ${err}`);
}
md.push('');
md.push('## Alert Candidates');
if (report.alerts.length) {
  for (const a of report.alerts) {
    md.push(`- [${a.keyword}] ${a.title} (${a.source})`);
    if (a.url) md.push(`  - ${a.url}`);
  }
} else {
  md.push('- No alert candidates this run.');
}
md.push('');
md.push('## Digest Preview');
if (report.digestPreview.length) {
  for (const d of report.digestPreview) {
    md.push(`- ${d.title} (${d.source})`);
  }
} else {
  md.push('- No new items for digest preview.');
}
md.push('');

await mkdir(new URL('../reports', import.meta.url), { recursive: true });
await writeFile(REPORT_MD_PATH, `${md.join('\n')}\n`, 'utf8');
await writeFile(REPORT_JSON_PATH, JSON.stringify(report, null, 2), 'utf8');
await writeFile(statePath, JSON.stringify(nextState, null, 2), 'utf8');

console.log('✅ Wrote reports/telegram-monitor-report.md');
console.log('✅ Wrote reports/telegram-monitor-report.json');
console.log('✅ Updated reports/telegram-monitor-state.json');
