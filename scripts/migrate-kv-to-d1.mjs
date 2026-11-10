/**
 * One-off migration: copy existing visitor counts from the old KV namespace to D1.
 *
 * Usage:
 *   npm run migrate:kv-to-d1 -- <kv-namespace-id>
 *   npx wrangler d1 execute anime-counter --remote --file=migrations-data/kv-counters.sql
 *
 * Only `counter:<username>` keys are migrated. The old `theme:*` asset cache keys are
 * no longer needed (sprites are embedded in the Worker bundle).
 * Re-running is safe: existing D1 rows keep the larger of the two values.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const namespaceId = process.argv[2];
if (!namespaceId) {
  console.error('Usage: npm run migrate:kv-to-d1 -- <kv-namespace-id>');
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../migrations-data');
const outFile = path.join(outDir, 'kv-counters.sql');

function wrangler(args) {
  return execFileSync('npx', ['wrangler', ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
}

console.log(`🔎 Listing counter keys in KV namespace ${namespaceId}...`);
const keys = JSON.parse(wrangler(['kv', 'key', 'list', '--namespace-id', namespaceId, '--prefix', 'counter:']));

const statements = [];
for (const { name } of keys) {
  const username = name.slice('counter:'.length);
  if (!/^[a-zA-Z0-9_-]{1,64}$/.test(username)) {
    console.warn(`   Skipping invalid key: ${name}`);
    continue;
  }
  const raw = wrangler(['kv', 'key', 'get', name, '--namespace-id', namespaceId]).trim();
  const count = parseInt(raw, 10);
  if (!Number.isSafeInteger(count) || count < 0) {
    console.warn(`   Skipping ${name}: invalid value "${raw}"`);
    continue;
  }
  console.log(`   ${username}: ${count}`);
  statements.push(
    `INSERT INTO counters (username, count) VALUES ('${username}', ${count}) ` +
      `ON CONFLICT(username) DO UPDATE SET count = MAX(count, excluded.count);`
  );
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, statements.join('\n') + '\n');
console.log(`\n✅ Wrote ${statements.length} rows to ${path.relative(process.cwd(), outFile)}`);
console.log('Next: npx wrangler d1 execute anime-counter --remote --file=migrations-data/kv-counters.sql');
