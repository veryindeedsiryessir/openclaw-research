#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const BACKLOG_PATH = new URL('../backlog-v1.md', import.meta.url);
const DIGEST_PATH = new URL('../reports/daily-digest.json', import.meta.url);
const LIBRARY_PATH = new URL('../data/library.json', import.meta.url);
const REPORT_MD_PATH = new URL('../reports/weekly-implementation-report.md', import.meta.url);
const REPORT_JSON_PATH = new URL('../reports/weekly-implementation-report.json', import.meta.url);

const [backlogRaw, digestRaw, libraryRaw] = await Promise.all([
  readFile(BACKLOG_PATH, 'utf8'),
  readFile(DIGEST_PATH, 'utf8').catch(() => '{}'),
  readFile(LIBRARY_PATH, 'utf8')
]);

const digest = JSON.parse(digestRaw);
const library = JSON.parse(libraryRaw);
const now = new Date();

function parseBacklogTable(md) {
  const rows = md
    .split('\n')
    .filter((line) => /^\|\s*\d+\s*\|/.test(line));

  return rows.map((line) => {
    const cols = line.split('|').map((x) => x.trim()).filter(Boolean);
    // cols: [#, Feature/prosess, Byggbarhet, Effekt, Driftbarhet, Risiko, Total]
    return {
      rank: Number(cols[0]),
      title: cols[1],
      buildability: Number(cols[2]),
      effect: Number(cols[3]),
      operability: Number(cols[4]),
      risk: Number(cols[5]),
      total: Number(String(cols[6]).replace(/[^\d.]/g, ''))
    };
  }).sort((a, b) => b.total - a.total || a.rank - b.rank);
}

function tallyByCategory(entries) {
  return entries.reduce((acc, row) => {
    acc[row.category] = (acc[row.category] || 0) + 1;
    return acc;
  }, {});
}

function detectThemes(items = []) {
  const joined = items.map((x) => `${x.title || ''} ${x.summary || ''}`).join(' \n ').toLowerCase();

  const themes = [
    {
      key: 'release-velocity',
      label: 'Release velocity & platform changes',
      score: (joined.match(/release|changelog|openclaw\s20\d\d|provider|gateway/g) || []).length
    },
    {
      key: 'agentic-dev-practices',
      label: 'Agentic engineering practices',
      score: (joined.match(/agentic|tests|tdd|workflow|coding agent|remote control/g) || []).length
    },
    {
      key: 'security-governance',
      label: 'Security & governance pressure',
      score: (joined.match(/security|vuln|distillation|attack|risk/g) || []).length
    }
  ];

  return themes.filter((x) => x.score > 0).sort((a, b) => b.score - a.score);
}

function pickWeeklyFocus(backlog, themes) {
  const topBacklog = backlog.slice(0, 5);

  return topBacklog.map((item) => {
    let rationale = 'High total score and strong execution feasibility this sprint.';

    if (/telegram/i.test(item.title)) {
      rationale = 'Matches ongoing need for fast signal capture and alerting loops.';
    } else if (/ukentlig|rapport|weekly/i.test(item.title)) {
      rationale = 'Compounds value by turning raw signals into weekly implementation decisions.';
    } else if (/digest|nyhetsdigest|daily/i.test(item.title)) {
      rationale = 'Foundation workflow; keep iterating quality and source coverage.';
    } else if (/activity feed/i.test(item.title)) {
      rationale = 'Improves observability for what the agent actually does each day.';
    }

    // small boost if themes suggest this area is hot
    const themeBoost = themes.some((t) => /agentic|release/.test(t.key)) ? ' Signal environment supports this now.' : '';

    return {
      ...item,
      rationale: rationale + themeBoost
    };
  });
}

const backlogItems = parseBacklogTable(backlogRaw);
const digestItems = Array.isArray(digest.items) ? digest.items : [];
const themes = detectThemes(digestItems);
const weeklyFocus = pickWeeklyFocus(backlogItems, themes);

const byCategory = tallyByCategory(library);
const topCategories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]).slice(0, 5);

const reportJson = {
  generatedAt: now.toISOString(),
  inputs: {
    backlogItems: backlogItems.length,
    digestItems: digestItems.length,
    libraryEntries: library.length
  },
  themes,
  weeklyFocus: weeklyFocus.slice(0, 5),
  suggestedNextActions: [
    'Finalize weekly report format and send every Monday morning.',
    'Add Telegram monitoring loop as a direct source for weekly prioritization.',
    'Track delivered-vs-planned items to improve backlog scoring confidence.'
  ]
};

const md = [];
md.push('# Weekly Implementation Report');
md.push('');
md.push(`Generated: ${now.toISOString()}`);
md.push('Period: Rolling 7-day planning window');
md.push('');
md.push('## Executive Summary');
md.push(`- Backlog candidates analyzed: **${backlogItems.length}**`);
md.push(`- Fresh signal items considered: **${digestItems.length}**`);
md.push(`- Library entries in scope: **${library.length}**`);
md.push('');
md.push('## Recommended Priorities (this week)');
for (const item of weeklyFocus.slice(0, 3)) {
  md.push(`1. **${item.title}** (score: ${item.total.toFixed(1)})`);
  md.push(`   - Why now: ${item.rationale}`);
}
md.push('');
md.push('## Signal Themes');
if (themes.length) {
  for (const t of themes.slice(0, 5)) {
    md.push(`- **${t.label}** (intensity: ${t.score})`);
  }
} else {
  md.push('- No dominant themes detected from current digest window.');
}
md.push('');
md.push('## Research Coverage Snapshot (top categories)');
for (const [cat, count] of topCategories) {
  md.push(`- ${cat}: ${count}`);
}
md.push('');
md.push('## Suggested Next Actions');
for (const action of reportJson.suggestedNextActions) {
  md.push(`- ${action}`);
}
md.push('');
md.push('## Delivery Checklist');
md.push('- [ ] Review and approve this week\'s top 3');
md.push('- [ ] Move accepted items into active sprint board');
md.push('- [ ] Define success metrics per item (time saved, insight quality, reliability)');
md.push('');

await mkdir(new URL('../reports', import.meta.url), { recursive: true });
await writeFile(REPORT_MD_PATH, `${md.join('\n')}\n`, 'utf8');
await writeFile(REPORT_JSON_PATH, JSON.stringify(reportJson, null, 2), 'utf8');

console.log('✅ Wrote reports/weekly-implementation-report.md');
console.log('✅ Wrote reports/weekly-implementation-report.json');
