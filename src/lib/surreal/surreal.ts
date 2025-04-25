import { Surreal } from "surrealdb";
import { env } from "~/env";

let db: Surreal | undefined;

export async function initDb(): Promise<Surreal> {
  console.log("initDb --------");
  if (db) return db;

  db = new Surreal();
  await db.connect(`${env.SURREALDB_HOST}/rpc`);
  await db.use({ namespace: env.SURREALDB_NS, database: env.SURREALDB_DB });
  await db.signin({
    username: env.SURREALDB_USER,
    password: env.SURREALDB_PASS,
  });

  if (!db) {
    throw new Error("Could not connect to database");
  }

  return db;
}

// export async function closeDb(): Promise<void> {
//     if (!db) return;
//     await db.close();
//     db = undefined;
// }

// export function getDb(): Surreal | undefined {
//     return db;
// }
