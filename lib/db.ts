import "server-only";

import path from "node:path";
import { neon } from "@neondatabase/serverless";
import type { PGlite } from "@electric-sql/pglite";

// One SQL client for the whole app, used only from server code.
// - DATABASE_URL set (e.g. Neon):  connects to that Postgres database.
// - DATABASE_URL empty:            uses a local PGlite database stored in db/data (for testing).

type Query = (text: string, params: unknown[]) => Promise<Record<string, unknown>[]>;

export const LOCAL_DB_DIR = path.join(process.cwd(), "db", "data");

const globalForDb = globalThis as unknown as { pglite?: Promise<PGlite> };

function localDb() {
  // Reuse one instance across hot reloads; PGlite allows only one open connection per folder.
  globalForDb.pglite ??= import("@electric-sql/pglite").then(async ({ PGlite }) => {
    const db = new PGlite(LOCAL_DB_DIR);
    await db.waitReady;
    return db;
  });
  return globalForDb.pglite;
}

function createQuery(): Query {
  const url = process.env.DATABASE_URL?.trim();
  if (url) {
    const client = neon(url);
    return (text, params) => client.query(text, params) as Promise<Record<string, unknown>[]>;
  }
  return async (text, params) => (await (await localDb()).query<Record<string, unknown>>(text, params)).rows;
}

const query = createQuery();

/** Tagged template: sql`SELECT * FROM services WHERE slug = ${slug}`. Values are always sent as parameters. */
export async function sql<T = Record<string, unknown>>(strings: TemplateStringsArray, ...values: unknown[]): Promise<T[]> {
  const text = strings.reduce((acc, part, i) => acc + `$${i}` + part);
  return (await query(text, values)) as T[];
}

export const usingLocalDb = !process.env.DATABASE_URL?.trim();
