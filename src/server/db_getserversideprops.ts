import { env } from "~/env.js";
import { NSurreal } from "~/lib/netron_surreal";
import {
  init_storage,
  read_querytypes,
} from "~/lib/netron_surreal/src/NSurreal_serverside";
import { type Queries } from "~/generated/combined";
// import fs from "fs";

export async function db_getserversideprops() {
  const client = new NSurreal<Queries>({
    debug: false,
    // dont update types in production
    skip_write: true, // env.NODE_ENV === "production",
    // read_querytypes,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // init_storage,
    // writeFile: fs.promises.writeFile,
  });

  await client.connect(`${process.env.SURREALDB_HOST}/rpc`);

  await client.use({ namespace: env.SURREALDB_NS, database: env.SURREALDB_DB });

  await client.signin({
    username: env.SURREALDB_USER,
    password: env.SURREALDB_PASS,
  })

  if (!client) {
    throw new Error("Could not connect to database");
  }

  return client;
}

export async function getToken(sessionToken: string) {
  const r = (await fetch(`${env.SURREALDB_HOST}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      NS: env.SURREALDB_NS,
      DB: env.SURREALDB_DB,
      SC: "account",
      pass: sessionToken,
    }),
  }).then((r) => r.json())) as unknown as {
    code: number;
    details: string;
    token: string;
  };
  //   const data = await r.json();
  //   resultSet(data);
  //   if (data.token) {
  //     localStorage.setItem("token", data.token);
  //     tokenSet(data.token);
  //   }
  return r;
}
