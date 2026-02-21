#!/usr/bin/env node
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const raw = await readFile(new URL('../data/library.json', import.meta.url), 'utf8');
const data = JSON.parse(raw);

const by = (key) => data.reduce((acc, row) => {
  acc[row[key]] = (acc[row[key]] || 0) + 1;
  return acc;
}, {});

const byCategory = by('category');
const byType = by('type');
const byDifficulty = by('difficulty');
const byImpact = by('impact');

const latest = [...data]
  .map((x) => x.lastUpdated)
  .filter(Boolean)
  .sort()
  .reverse()
  .slice(0, 10);

const md = `# Library Summary\n\nGenerated: ${new Date().toISOString()}\n\n## Totals\n- Entries: **${data.length}**\n- Categories: **${Object.keys(byCategory).length}**\n- Types: **${Object.keys(byType).length}**\n\n## By Category\n${Object.entries(byCategory).sort((a,b) => b[1]-a[1]).map(([k,v]) => `- ${k}: ${v}`).join('\n')}\n\n## By Type\n${Object.entries(byType).sort((a,b) => b[1]-a[1]).map(([k,v]) => `- ${k}: ${v}`).join('\n')}\n\n## By Difficulty\n${Object.entries(byDifficulty).sort((a,b) => b[1]-a[1]).map(([k,v]) => `- ${k}: ${v}`).join('\n')}\n\n## By Impact\n${Object.entries(byImpact).sort((a,b) => b[1]-a[1]).map(([k,v]) => `- ${k}: ${v}`).join('\n')}\n\n## Most Recently Updated Dates (top 10)\n${latest.map((d) => `- ${d}`).join('\n')}\n`;

await mkdir(new URL('../reports', import.meta.url), { recursive: true });
await writeFile(new URL('../reports/library-summary.md', import.meta.url), md, 'utf8');
console.log('✅ Wrote reports/library-summary.md');
