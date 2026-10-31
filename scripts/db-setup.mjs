// npm run db:setup — creates the tables (db/schema.sql), loads sample data (db/seed.sql)
// and prints a row count for every table. Safe to run repeatedly.
//
// Uses DATABASE_URL from .env when set (e.g. Neon); otherwise the local PGlite database in db/data.

import { readFile } from "node:fs/promises";
import net from "node:net";
import path from "node:path";

const root = process.cwd();
try {
  process.loadEnvFile(path.join(root, ".env"));
} catch {
  // No .env file: fall back to the local database.
}

const TABLES = [
  "admin_users",
  "services",
  "industries",
  "case_studies",
  "insights",
  "testimonials",
  "consultation_bookings",
  "contact_messages",
  "job_openings",
  "job_applications",
  "newsletter_subscribers",
];

const portInUse = (port) =>
  new Promise((resolve) => {
    const socket = net.connect({ port, host: "127.0.0.1" });
    socket.once("connect", () => (socket.destroy(), resolve(true)));
    socket.once("error", () => resolve(false));
  });

async function connect() {
  const url = process.env.DATABASE_URL?.trim();
  if (url) {
    const { Client } = await import("@neondatabase/serverless");
    const client = new Client(url);
    await client.connect();
    return {
      label: "Neon / Postgres (DATABASE_URL)",
      exec: (text) => client.query(text),
      count: async (table) => Number((await client.query(`SELECT count(*)::int AS n FROM ${table}`)).rows[0].n),
      close: () => client.end(),
    };
  }

  // The local database can only be opened by one program at a time.
  if (await portInUse(3000)) {
    console.error("\nThe dev server is running on port 3000 and is using the local database.");
    console.error("Stop it first (press Ctrl+C in its terminal), run `npm run db:setup` again, then restart `npm run dev`.\n");
    process.exit(1);
  }

  const { PGlite } = await import("@electric-sql/pglite");
  const db = new PGlite(path.join(root, "db", "data"));
  await db.waitReady;
  return {
    label: "Local test database (db/data)",
    exec: (text) => db.exec(text),
    count: async (table) => Number((await db.query(`SELECT count(*)::int AS n FROM ${table}`)).rows[0].n),
    close: () => db.close(),
  };
}

const db = await connect();
console.log(`\nDatabase: ${db.label}`);
try {
  for (const file of ["schema.sql", "seed.sql"]) {
    await db.exec(await readFile(path.join(root, "db", file), "utf8"));
    console.log(`  ✓ ran db/${file}`);
  }
  console.log("\nRow counts:");
  const counts = {};
  for (const table of TABLES) counts[table] = await db.count(table);
  console.table(counts);
} finally {
  await db.close();
}
