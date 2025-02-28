// import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { type Queries } from "~/generated/combined";
import { NSurreal } from "./NSurreal";
import { create } from "zustand";
import { api } from "~/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { env } from "~/env";
import { fe_env } from "~/fe_env";
import { type NSurrealOptions } from "./NSurrealOptions";
import { ConnectionStatus } from "surrealdb";

interface DBState {
  db: NSurreal<Queries>;
  guestmode: boolean | null;
  uid: string;
  pass: string;
  set: (state: Partial<DBState>) => void;
}

const useDBState = create<DBState>()((set) => ({
  db: new NSurreal<Queries>(),
  guestmode: null,
  uid: crypto.randomUUID(),
  pass: crypto.randomUUID(),
  set,
}));

export function useDB() {
  const [state, setState] = useState<{
    getting_token: boolean;
    apikey_name: string;
    token: string | null;
    ready: boolean | void | undefined;
  }>({
    getting_token: false,
    apikey_name: "",
    token: "",
    ready: undefined,
  });
  const dbstate = useDBState();
  const init_storage = api.nsurreal.init_storage.useMutation();
  const read_querytypes = api.nsurreal.read_querytypes.useMutation();
  const writeFile = api.nsurreal.writeFile.useMutation();

  if (env.NEXT_PUBLIC_NODE_ENV === "development") {
    dbstate.db.init_storage = async (path) => {
      await init_storage.mutateAsync({ path });
    };

    dbstate.db.read_querytypes = async (path) => {
      return await read_querytypes.mutateAsync({ path });
    };

    dbstate.db.writeFile = async (path, data) => {
      await writeFile.mutateAsync({ path, data });
    };
  } else {
    // production dont update types
    dbstate.db.skip_write = true;
  }

  const session = useSession();

  async function GetToken() {
    if (session.status === "loading") return;

    await dbstate.db
      .connect(fe_env.SURREALDB_HOST, {
        namespace: fe_env.SURREALDB_NS,
        database: fe_env.SURREALDB_DB,
      })
      .catch(console.log);

    await dbstate.db.use({
      namespace: fe_env.SURREALDB_NS,
      database: fe_env.SURREALDB_DB,
    });

    // if (token) {
    //   try {
    //     const decoded = jwtDecode(token);
    //     if (decoded?.exp && decoded.exp > Date.now() / 1000) {
    //       console.log("using stored token!");

    //       await dbstate.db
    //         .connect("wss://db.netron.co.za/rpc", {
    //           namespace: "netron",
    //           database: "netron",
    //         })
    //         .catch(console.log);

    //       await dbstate.db.client.authenticate(token);

    //       console.log("waiting for ready state");
    //       const ready = await dbstate.db.client.ready;
    //       console.log("--------------------");

    //       setState({ ...state, token, ready });
    //       return;
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

    if (session.status === "unauthenticated") {
      console.log("signup..");

      const tokenSignin = await dbstate.db.client.signup({
        scope: "guest",
        namespace: fe_env.SURREALDB_NS,
        database: fe_env.SURREALDB_DB,
        // uid: dbstate.uid,
        // pass: dbstate.pass,
      });

      console.log(tokenSignin);

      //   console.log("signed up..");
      const ready = await dbstate.db.client.ready;
      setState({ ...state, token: tokenSignin, ready });
      console.log("GUEST");
    }

    if (session.status === "authenticated") {
      const apikey = session.data.user.apikey;
      if (!apikey) {
        throw new Error("no apikey");
      }
      const tokenSignin = await dbstate.db.client.signin({
        scope: "apikey",
        namespace: fe_env.SURREALDB_NS,
        database: fe_env.SURREALDB_DB,
        apikey,
      });

      const ready = await dbstate.db.client.ready;
      setState({ ...state, token: tokenSignin, ready });
    }
  }

  useEffect(() => {
    if (session.status === "loading") return;

    if (!state.getting_token) {
      setState({ ...state, getting_token: true });
      GetToken().catch(console.error);
    }
  }, [session]);

  return dbstate.db;
}

export function useDBQuery<Q extends keyof Queries>(
  query: string,
  uniqueID: Q,
  options?: NSurrealOptions,
) {
  const db = useDB();

  const queryQ = useQuery({
    queryKey: [query],
    queryFn: async () => {
      const result = db.query(query, uniqueID, options ?? undefined);
      return result;
    },
    enabled: db.client.connection?.status === ConnectionStatus.Connected,
  });

  return { ...queryQ, db };
}

export function useDBMutation<Q extends keyof Queries>(uniqueID: Q) {
  const db = useDB();

  const queryQ = useMutation({
    mutationKey: [uniqueID],
    mutationFn: async (query: string) => {
      try {
        const result = db.query(query, uniqueID);
        return result;
      } catch (err) {
        console.log(err);
      }
    },
  });

  return { ...queryQ, db };
}
