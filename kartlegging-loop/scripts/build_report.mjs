#!/usr/bin/env node
import fs from 'node:fs';

function usage() {
  console.error('Usage: node build_report.mjs <diff.json> <out.md>');
  process.exit(1);
}

const [diffPath, outPath] = process.argv.slice(2);
if (!diffPath || !outPath) usage();

const diff = JSON.parse(fs.readFileSync(diffPath, 'utf8'));
const s = diff.summary || {};

const lines = [];
lines.push(`# Kartlegging rapport`);
lines.push(``);
lines.push(`Generert: ${diff.generated_at || new Date().toISOString()}`);
lines.push(``);
lines.push(`## Oppsummering`);
lines.push(`- Forrige snapshot: ${s.old_count ?? 0}`);
lines.push(`- Nytt snapshot: ${s.new_count ?? 0}`);
lines.push(`- Nye objekter: **${s.added_count ?? 0}**`);
lines.push(`- Endrede objekter: **${s.changed_count ?? 0}**`);
lines.push(`- Fjernede objekter: **${s.removed_count ?? 0}**`);
lines.push(``);

if ((diff.added || []).length) {
  lines.push(`## Nye objekter`);
  for (const x of diff.added.slice(0, 20)) {
    const area = [x.area_m2_min, x.area_m2_max].filter(Boolean).join('–') || 'ukjent m²';
    const url = x.url ? ` (${x.url})` : '';
    lines.push(`- ${x.title || x.address || x.id} · ${area}${url}`);
  }
  lines.push('');
}

if ((diff.changed || []).length) {
  lines.push(`## Endringer`);
  for (const x of diff.changed.slice(0, 20)) {
    lines.push(`- ${x.title}${x.url ? ` (${x.url})` : ''}`);
    for (const [field, d] of Object.entries(x.changes || {})) {
      lines.push(`  - ${field}: ${JSON.stringify(d.old)} → ${JSON.stringify(d.new)}`);
    }
  }
  lines.push('');
}

if ((diff.removed || []).length) {
  lines.push(`## Fjernet siden sist`);
  for (const x of diff.removed.slice(0, 20)) {
    lines.push(`- ${x.title || x.address || x.id}`);
  }
  lines.push('');
}

lines.push(`---`);
lines.push(`Loop v1 · openclaw-research/kartlegging-loop`);

fs.writeFileSync(outPath, lines.join('\n'));
console.log(`Report written to ${outPath}`);
