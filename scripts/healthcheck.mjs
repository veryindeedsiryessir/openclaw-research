#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';

const repo = '/Users/abraham/.openclaw/workspace/openclaw-research';
const now = new Date();

function run(command) {
  try {
    const out = execSync(command, { cwd: repo, stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();
    return { ok: true, out };
  } catch (err) {
    return {
      ok: false,
      out: String(err?.stdout || '').trim(),
      err: String(err?.stderr || err?.message || err).trim()
    };
  }
}

function headUrl(url) {
  return run(`curl -I -s ${url} | head -n 8`);
}

const checks = [];

const ghAuth = run('gh auth status');
checks.push({
  name: 'GitHub auth',
  ok: ghAuth.ok,
  detail: ghAuth.ok ? 'Logged in' : (ghAuth.err || ghAuth.out || 'Not logged in')
});

const gitBranch = run('git status --short --branch');
checks.push({
  name: 'Git branch sync',
  ok: gitBranch.ok,
  detail: gitBranch.out || gitBranch.err
});

const pagesRun = run('gh run list --repo veryindeedsiryessir/openclaw-research --limit 1');
checks.push({
  name: 'Latest Pages workflow',
  ok: pagesRun.ok && /completed\s+success/.test(pagesRun.out),
  detail: pagesRun.out || pagesRun.err
});

const siteHead = headUrl('https://veryindeedsiryessir.github.io/openclaw-research/');
checks.push({
  name: 'Pages endpoint',
  ok: siteHead.ok && /HTTP\/2 200|HTTP\/1\.1 200/.test(siteHead.out),
  detail: siteHead.out || siteHead.err
});

const isHealthy = checks.every((c) => c.ok);

const report = {
  generatedAt: now.toISOString(),
  healthy: isHealthy,
  checks
};

const md = [];
md.push('# Ops Healthcheck');
md.push('');
md.push(`Generated: ${report.generatedAt}`);
md.push(`Overall: ${report.healthy ? '✅ Healthy' : '⚠️ Attention needed'}`);
md.push('');
md.push('## Checks');
for (const c of checks) {
  md.push(`- ${c.ok ? '✅' : '❌'} **${c.name}**`);
  if (c.detail) md.push(`  - ${c.detail.replace(/\n/g, '\n  - ')}`);
}
md.push('');

await mkdir(new URL('../reports', import.meta.url), { recursive: true });
await writeFile(new URL('../reports/healthcheck.json', import.meta.url), JSON.stringify(report, null, 2));
await writeFile(new URL('../reports/healthcheck.md', import.meta.url), `${md.join('\n')}\n`);

console.log('✅ Wrote reports/healthcheck.json');
console.log('✅ Wrote reports/healthcheck.md');
console.log(report.healthy ? '✅ Overall healthy' : '⚠️ Attention needed');
