import {
  Surreal,
  ConnectionStatus,
  type AnyAuth,
} from "surrealdb";
import JsonToTS from "./jsontots";
import { type NSurrealOptions } from "./NSurrealOptions";

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type ConnectionOptions = {
  namespace?: string | undefined;
  database?: string | undefined;
  auth?: string | AnyAuth | undefined;
  prepare?: ((connection: Surreal) => unknown) | undefined;
  versionCheck?: boolean | undefined;
  versionCheckTimeout?: number | undefined;
}

// eslint-disable-next-line no-var
// var globalClient = new Surreal();

/** TypeSafe SurrealDB Client https://jsr.io/@netron/surreal based on surrealdb.js
 * See https://surrealdb.com/docs/surrealdb/integration/sdks/javascript */
export class NSurreal<G extends Record<string, object>> {
  client: Surreal;

  timestamp_connected: Date | undefined;
  url: string | undefined;
  opts: ConnectionOptions | undefined;
  output_path = "./src/generated";
  debug = false;
  skip_write = false;

  read_querytypes: undefined | ((output_path: string) => Promise<string[]>);
  init_storage: undefined | ((output_path: string) => Promise<void>);
  writeFile: undefined | ((path: string, data: string) => Promise<void>);

  constructor(options?: {
    output_path?: string;
    debug?: boolean;
    skip_write?: boolean;
    read_querytypes?: (output_path: string) => Promise<string[]>;
    init_storage?: (output_path: string) => Promise<void>;
    writeFile?: (path: string, data: string) => Promise<void>;
  }) {
    if (options) {
      this.read_querytypes = options.read_querytypes;
      this.init_storage = options.init_storage;
      this.writeFile = options.writeFile;
    }

    if (options?.output_path) {
      this.output_path = options.output_path;
    }

    if (options?.debug) {
      this.debug = options.debug;
    }

    if (options?.skip_write) {
      this.skip_write = options.skip_write;
    }

    this.client = new Surreal();
    // this.timer = setInterval(() => {
    //   if (!this.timestamp_connected) return;
    //   const diff = new Date().getTime() - this.timestamp_connected.getTime();
    //   if (diff > 1000 * 60) {
    //     if (this.client) {
    //       this.client.close().catch(console.error);
    //     }
    //     this.connect(this.url!, this.opts).catch(console.error);
    //   }
    // }, 10000);
  }

  /** Connects to a local or remote database endpoint.
   * https://surrealdb.com/docs/surrealdb/integration/sdks/javascript#connect
   */

  log(...input: Parameters<typeof console.log>) {
    if (this.debug) console.log(`NSurreal -`, input);
  }

  async connect(url: string, opts?: ConnectionOptions): Promise<void> {
    this.log(`Connecting to ${url}`);
    if (!this.client) {
      this.log(`Client not connected`);
      throw new Error("Client not connected");
    }
    this.opts = opts;
    this.url = url;
    await this.client.connect(url);
    this.log("Connected!");
    this.timestamp_connected = new Date();

    this.client.emitter.subscribe("error", (err) => {
      console.log(err);
    });
  }

  async signin(auth: { username: string; password: string }): Promise<void> {
    if (!this.client) {
      throw new Error("Client not connected");
    }
    await this.client.signin(auth);
  }

  /** Switch to a specific namespace and database. If only the ns or db property is specified,
   * the current connection details will be used to fill the other property. */
  async use(opts: { namespace: string; database: string }): Promise<void> {
    if (!this.client) throw new Error("Client not connected");
    await this.client.use(opts);
    return;
  }

  /** lists the known schema types for queries. */
  // async read_querytypes_old(): Promise<string[]> {
  //   return new Promise<string[]>((resolve) => {
  //     fs.readdir(`${this.output_path}/querytypes`, (err, files) => {
  //       resolve(files.filter((i) => i.endsWith(".ts")));
  //     });
  //   });
  // }

  /** Runs a set of SurrealQL statements against the database.
   * See https://surrealdb.com/docs/surrealdb/integration/sdks/javascript#query
   */
  /** we create a unique tag for this query to link the output back to the type */

  async query<Q extends keyof G>(
    query: string,
    /** we create a unique tag for this query to link the output back to the type */
    uniqueID: Q,
    options?: NSurrealOptions,
    queryParameters?: Record<string, unknown>,
  ): Promise<G[Q]> {
    if (this.timestamp_connected) {
      const diff = new Date().getTime() - this.timestamp_connected.getTime();
      if (diff > 1000 * 60) {
        if (
          this.client &&
          this.client.connection?.status === ConnectionStatus.Connected
        ) {
          this.client.close().catch(() => {
            return;
          });
          this.connect(this.url!, this.opts).catch(console.error);
        }
      }
    }

    // wait for connection or timeout
    let ready = false;
    let counter = 0;
    while (!ready) {
      counter++;
      if (this.client?.connection?.status === ConnectionStatus.Connected) {
        ready = true;
      } else {
        await delay(10);
      }
      if (counter > 100) {
        throw new Error("Not connected!");
      }
    }

    /////////////////////////////////////////////////////

    const skip_write = options?.skip_write ?? this.skip_write;
    this.log("Querying", query, uniqueID);
    query = query.trim();
    if (!this.client) throw new Error("Client not connected");

    if (!uniqueID) {
      throw new Error("uniqueID is required for query.");
    }

    const uid = uniqueID as string;

    // ensure uniqueId starts with capital.
    if (!uid.startsWith(uid.at(0)?.toUpperCase() ?? "")) {
      throw new Error("uniqueID must start with a capital letter.");
    }

    if (!/^[A-Z][A-Za-z0-9_]*$/.test(uid)) {
      throw new Error("uniqueID must be a valid identifier.");
    }

    // const stack = new Error();

    // if (!stack.stack) {
    //   throw new Error("Could not generate unique identifier for query.");
    // }

    const result = await this.client.query(query, queryParameters);

    this.log("Query result", result);

    if (uniqueID && !skip_write) {
      const uid = uniqueID as string;

      let querycount = query.split(";").length;
      if (query.endsWith(";")) {
        querycount -= 1;
      }

      this.log(`Query count: ${querycount}`);

      const responseobj: Record<string, (typeof result)[number]> = {};

      result.forEach((i, idx) => {
        responseobj[`${uid}_query${idx + 1}`] = i;
      });

      if (this.debug) {
        console.log(responseobj);
      }

      const ts = JsonToTS(responseobj, { useTypeAlias: true, rootName: uid });

      this.log("Generated types", ts);

      this.log(
        "Creating directory if needed.",
        `${this.output_path}/querytypes`,
      );

      if (this.init_storage) {
        await this.init_storage(this.output_path);
      }

      const outputtype = ts.map((i, idx) => {
        if (idx == 0) {
          let output = i.split("\n").at(0)?.replace("{", "[");
          output += "\n";
          // change object to tuple..
          output += i
            .split("\n")
            .slice(1, -1)
            .map((x) => x.split(":").at(1)?.slice(0, -1))
            .join(",\n");

          output += "\n";
          output += i.split("\n").at(-1)!.replace("}", "]");

          return output;
        }

        return i;
      });

      this.log("Writing to file", `${this.output_path}/querytypes/${uid}.ts`);

      if (this.writeFile) {
        await this.writeFile(
          `${this.output_path}/querytypes/${uid}.ts`,

          `/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
          
          import type { Uuid, RecordId } from "surrealdb";
export ${outputtype.join("\n")}`,
        ).catch((err) => {
          this.log("Error writing to file", err);
        });
      }

      const schemas = this.read_querytypes
        ? await this.read_querytypes(this.output_path)
        : [];

      if (this.writeFile) {
        await this.writeFile(
          `${this.output_path}/combined.ts`,
          `${schemas
            .map((i) => {
              return `import type { ${i.replace(
                ".ts",
                "",
              )} } from "./querytypes/${i.replace(".ts", "")}";`;
            })
            .join("\n")}
      
export type Queries = {\n${schemas
            .map((i) => `  ${i.replace(".ts", "")}: ${i.replace(".ts", "")};`)
            .join("\n")}\n}`,
        );
      }
    }

    return result as G[Q];
  }
}
