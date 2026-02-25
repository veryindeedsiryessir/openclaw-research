#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const SOURCES_PATH = new URL('../data/sources.json', import.meta.url);
const REPORT_MD_PATH = new URL('../reports/daily-digest.md', import.meta.url);
const REPORT_JSON_PATH = new URL('../reports/daily-digest.json', import.meta.url);

const raw = await readFile(SOURCES_PATH, 'utf8');
const cfg = JSON.parse(raw);

const now = new Date();
const lookbackHours = Number(cfg.lookbackHours || 72);
const lookbackMs = lookbackHours * 60 * 60 * 1000;
const cutoffTs = now.getTime() - lookbackMs;

function clean(s = '') {
  return String(s).replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function safeDate(v) {
  const t = new Date(v).getTime();
  return Number.isNaN(t) ? null : t;
}

function pickTag(content, tag) {
  const m = content.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return m ? clean(m[1]) : '';
}

function pickAttr(content, tag, attr) {
  const m = content.match(new RegExp(`<${tag}[^>]*${attr}=["']([^"']+)["'][^>]*>`, 'i'));
  return m ? m[1] : '';
}

function parseFeed(xml, source) {
  const items = [];
  const itemBlocks = [...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)].map((m) => m[0]);
  const entryBlocks = [...xml.matchAll(/<entry\b[\s\S]*?<\/entry>/gi)].map((m) => m[0]);
  const blocks = itemBlocks.length ? itemBlocks : entryBlocks;

  for (const block of blocks) {
    const title = pickTag(block, 'title');
    const link = pickTag(block, 'link') || pickAttr(block, 'link', 'href');
    const pubDateRaw =
      pickTag(block, 'pubDate') ||
      pickTag(block, 'updated') ||
      pickTag(block, 'published') ||
      pickTag(block, 'dc:date');
    const summary = pickTag(block, 'description') || pickTag(block, 'summary') || pickTag(block, 'content');

    const ts = safeDate(pubDateRaw) || Date.now();
    items.push({
      sourceId: source.id,
      sourceName: source.name,
      sourcePriority: source.priority || 5,
      title,
      url: link,
      publishedAt: new Date(ts).toISOString(),
      timestamp: ts,
      summary: summary.slice(0, 280)
    });
  }

  return items;
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'openclaw-research-digest'
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'openclaw-research-digest' }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return res.text();
}

async function collectFromSource(source) {
  if (!source.enabled) return [];

  try {
    if (source.type === 'github-releases') {
      const url = `https://api.github.com/repos/${source.repo}/releases?per_page=${Math.max(1, Number(cfg.maxItemsPerSource || 8))}`;
      const releases = await fetchJson(url);
      return releases.map((r) => ({
        sourceId: source.id,
        sourceName: source.name,
        sourcePriority: source.priority || 5,
        title: `${r.name || r.tag_name}`,
        url: r.html_url,
        publishedAt: r.published_at || r.created_at,
        timestamp: safeDate(r.published_at || r.created_at) || Date.now(),
        summary: clean((r.body || '').slice(0, 500)).slice(0, 280)
      }));
    }

    if (source.type === 'rss' || source.type === 'atom') {
      const xml = await fetchText(source.url);
      return parseFeed(xml, source);
    }

    return [];
  } catch (err) {
    return [{
      sourceId: source.id,
      sourceName: source.name,
      sourcePriority: source.priority || 5,
      title: '[Fetch error]',
      url: source.url || `https://github.com/${source.repo}`,
      publishedAt: now.toISOString(),
      timestamp: Date.now(),
      summary: `Failed to fetch source: ${err.message}`,
      isError: true
    }];
  }
}

function score(item) {
  const ageHours = Math.max(0, (Date.now() - item.timestamp) / 36e5);
  const recency = Math.max(0, 100 - ageHours);
  const priority = Number(item.sourcePriority || 5) * 10;
  const keywordBoost = /(release|security|breaking|major|agent|workflow|memory|telegram)/i.test(item.title + ' ' + (item.summary || '')) ? 10 : 0;
  return recency + priority + keywordBoost;
}

const allSources = Array.isArray(cfg.sources) ? cfg.sources : [];
const collected = (await Promise.all(allSources.map(collectFromSource))).flat();

const recent = collected
  .filter((x) => x.timestamp >= cutoffTs)
  .sort((a, b) => score(b) - score(a) || b.timestamp - a.timestamp)
  .slice(0, Number(cfg.maxItemsTotal || 20));

const grouped = recent.reduce((acc, item) => {
  if (!acc[item.sourceName]) acc[item.sourceName] = [];
  acc[item.sourceName].push(item);
  return acc;
}, {});

const topActions = [];
if (recent.some((x) => /release|major|breaking/i.test(x.title + ' ' + x.summary))) {
  topActions.push('Review release notes and flag any upgrade blockers before next deploy window.');
}
if (recent.some((x) => /security|vuln|cve/i.test(x.title + ' ' + x.summary))) {
  topActions.push('Run a quick security sweep for impacted dependencies and automation surfaces.');
}
if (recent.some((x) => /skill|workflow|agent/i.test(x.title + ' ' + x.summary))) {
  topActions.push('Select 1 workflow/skill to trial this week and define success criteria in backlog-v1.');
}
if (!topActions.length) {
  topActions.push('No urgent changes detected. Continue with planned sprint items and monitor tomorrow.');
}

const lines = [];
lines.push('# Daily OpenClaw Digest');
lines.push('');
lines.push(`Generated: ${now.toISOString()}`);
lines.push(`Window: last ${lookbackHours} hours`);
lines.push(`Sources checked: ${allSources.filter((s) => s.enabled).length}`);
lines.push(`Items included: ${recent.length}`);
lines.push('');
lines.push('## Top Actions');
for (const action of topActions.slice(0, 3)) lines.push(`- ${action}`);
lines.push('');
lines.push('## Signal Feed');

for (const [sourceName, items] of Object.entries(grouped)) {
  lines.push(`### ${sourceName}`);
  for (const item of items.slice(0, Number(cfg.maxItemsPerSource || 8))) {
    const d = new Date(item.timestamp).toISOString().slice(0, 10);
    const title = item.url ? `[${item.title}](${item.url})` : item.title;
    lines.push(`- **${d}** — ${title}`);
    if (item.summary) lines.push(`  - ${item.summary}`);
  }
  lines.push('');
}

if (!recent.length) {
  lines.push('No fresh items matched the lookback window. Consider increasing `lookbackHours` in `data/sources.json`.');
  lines.push('');
}

await mkdir(new URL('../reports', import.meta.url), { recursive: true });
await writeFile(REPORT_MD_PATH, `${lines.join('\n')}\n`, 'utf8');
await writeFile(REPORT_JSON_PATH, JSON.stringify({
  generatedAt: now.toISOString(),
  lookbackHours,
  cutoff: new Date(cutoffTs).toISOString(),
  sourceCount: allSources.length,
  includedItems: recent.length,
  items: recent
}, null, 2), 'utf8');

console.log('✅ Wrote reports/daily-digest.md');
console.log('✅ Wrote reports/daily-digest.json');
