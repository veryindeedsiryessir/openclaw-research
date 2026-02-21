#!/usr/bin/env node
import fs from 'node:fs';

function usage() {
  console.error('Usage: node diff_snapshots.mjs <old.json> <new.json> <out.json>');
  process.exit(1);
}

const [oldPath, newPath, outPath] = process.argv.slice(2);
if (!oldPath || !newPath || !outPath) usage();

const oldArr = JSON.parse(fs.readFileSync(oldPath, 'utf8'));
const newArr = JSON.parse(fs.readFileSync(newPath, 'utf8'));

if (!Array.isArray(oldArr) || !Array.isArray(newArr)) {
  throw new Error('Both input files must contain JSON arrays');
}

const keyOf = (x) => x.id || x.url || `${x.address || ''}-${x.title || ''}`;

const oldMap = new Map(oldArr.map((x) => [keyOf(x), x]));
const newMap = new Map(newArr.map((x) => [keyOf(x), x]));

const added = [];
const removed = [];
const changed = [];

for (const [k, n] of newMap.entries()) {
  if (!oldMap.has(k)) {
    added.push(n);
    continue;
  }
  const o = oldMap.get(k);
  const fieldsToCheck = ['area_m2_min', 'area_m2_max', 'price_nok_per_m2', 'status', 'types'];
  const diff = {};
  for (const f of fieldsToCheck) {
    const ov = JSON.stringify(o[f] ?? null);
    const nv = JSON.stringify(n[f] ?? null);
    if (ov !== nv) diff[f] = { old: o[f] ?? null, new: n[f] ?? null };
  }
  if (Object.keys(diff).length > 0) {
    changed.push({ id: keyOf(n), title: n.title || n.address || keyOf(n), url: n.url || null, changes: diff });
  }
}

for (const [k, o] of oldMap.entries()) {
  if (!newMap.has(k)) removed.push(o);
}

const output = {
  generated_at: new Date().toISOString(),
  old_snapshot: oldPath,
  new_snapshot: newPath,
  summary: {
    old_count: oldArr.length,
    new_count: newArr.length,
    added_count: added.length,
    changed_count: changed.length,
    removed_count: removed.length
  },
  added,
  changed,
  removed
};

fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log(`Diff written to ${outPath}`);
