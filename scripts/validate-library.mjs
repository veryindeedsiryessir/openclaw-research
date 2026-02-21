#!/usr/bin/env node
import { readFile } from 'node:fs/promises';

const REQUIRED = ['id', 'title', 'category', 'summary', 'url', 'source', 'type', 'difficulty', 'impact', 'tags', 'lastUpdated'];
const CATEGORIES = new Set(['Use Cases', 'CLI', 'Tools', 'Skills', 'Process', 'Creators', 'Security', 'Architecture']);
const IMPACT = new Set(['Low', 'Medium', 'High']);
const DIFFICULTY = new Set(['Beginner', 'Intermediate', 'Advanced']);

function isIsoDate(s) {
  return /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(new Date(s).getTime());
}

const raw = await readFile(new URL('../data/library.json', import.meta.url), 'utf8');
const data = JSON.parse(raw);

if (!Array.isArray(data)) throw new Error('library.json must be an array');

const errors = [];
const seen = new Set();

for (const [i, row] of data.entries()) {
  const p = `#${i + 1}${row?.id ? ` (${row.id})` : ''}`;
  for (const key of REQUIRED) {
    if (!(key in row)) errors.push(`${p} missing ${key}`);
  }

  if (seen.has(row.id)) errors.push(`${p} duplicate id: ${row.id}`);
  seen.add(row.id);

  if (!CATEGORIES.has(row.category)) errors.push(`${p} invalid category: ${row.category}`);
  if (!IMPACT.has(row.impact)) errors.push(`${p} invalid impact: ${row.impact}`);
  if (!DIFFICULTY.has(row.difficulty)) errors.push(`${p} invalid difficulty: ${row.difficulty}`);
  if (!Array.isArray(row.tags) || row.tags.length === 0) errors.push(`${p} tags must be non-empty array`);
  if (!isIsoDate(row.lastUpdated)) errors.push(`${p} invalid lastUpdated (YYYY-MM-DD): ${row.lastUpdated}`);
  if (typeof row.summary !== 'string' || row.summary.length < 20) errors.push(`${p} summary too short`);
  if (typeof row.url !== 'string' || !row.url.trim()) errors.push(`${p} url must be non-empty string`);
}

if (errors.length) {
  console.error(`❌ Validation failed with ${errors.length} issue(s):`);
  for (const e of errors) console.error(` - ${e}`);
  process.exit(1);
}

const byCategory = data.reduce((acc, r) => {
  acc[r.category] = (acc[r.category] || 0) + 1;
  return acc;
}, {});

console.log(`✅ library.json valid (${data.length} entries)`);
console.log('Category counts:', byCategory);
