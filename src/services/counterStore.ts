/**
 * Counter storage driver supporting both Cloudflare D1 and Cloudflare KV.
 *
 * If D1 ("DB") is configured, it uses atomic SQLite transactions.
 * If only KV ("KV") is configured (legacy mode), it reads and writes to KV directly,
 * ensuring zero downtime and 100% backward compatibility with existing visitor counts.
 * Falls back to an in-memory store for unit tests when no bindings are present.
 */

export interface CounterStore {
  get(username: string): Promise<number>;
  increment(username: string): Promise<number>;
}

export class D1CounterStore implements CounterStore {
  constructor(private readonly db: D1Database) {}

  async get(username: string): Promise<number> {
    const count = await this.db
      .prepare('SELECT count FROM counters WHERE username = ?1')
      .bind(username)
      .first<number>('count');
    return count ?? 0;
  }

  async increment(username: string): Promise<number> {
    const count = await this.db
      .prepare(
        'INSERT INTO counters (username, count) VALUES (?1, 1) ' +
          'ON CONFLICT(username) DO UPDATE SET count = count + 1 ' +
          'RETURNING count'
      )
      .bind(username)
      .first<number>('count');
    if (count === null) {
      throw new Error(`D1 increment returned no row for "${username}"`);
    }
    return count;
  }
}

export class KVCounterStore implements CounterStore {
  constructor(private readonly kv: KVNamespace) {}

  async get(username: string): Promise<number> {
    const raw = await this.kv.get(`counter:${username}`);
    const count = raw ? parseInt(raw, 10) : 0;
    return isNaN(count) ? 0 : count;
  }

  async increment(username: string): Promise<number> {
    const key = `counter:${username}`;
    const raw = await this.kv.get(key);
    let count = raw ? parseInt(raw, 10) : 0;
    if (isNaN(count)) count = 0;
    const next = count + 1;
    await this.kv.put(key, next.toString());
    return next;
  }
}

export class MemoryCounterStore implements CounterStore {
  private readonly counts = new Map<string, number>();

  async get(username: string): Promise<number> {
    return this.counts.get(username) ?? 0;
  }

  async increment(username: string): Promise<number> {
    const next = (this.counts.get(username) ?? 0) + 1;
    this.counts.set(username, next);
    return next;
  }
}

let memoryStore: MemoryCounterStore | undefined;

export function getCounterStore(env: { DB?: D1Database; KV?: KVNamespace } = {}): CounterStore {
  if (env.DB) {
    return new D1CounterStore(env.DB);
  }
  if (env.KV) {
    return new KVCounterStore(env.KV);
  }
  if (!memoryStore) {
    memoryStore = new MemoryCounterStore();
  }
  return memoryStore;
}
