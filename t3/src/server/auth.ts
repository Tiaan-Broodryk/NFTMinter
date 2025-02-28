import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { env } from "~/env";
import { EmailProviderCustom } from "./emailProvider_Custom";
import { SurrealAdapter } from "./adapter_surrealdb";
import { db } from "./db";
import { RecordId } from "surrealdb";
// import { initDb } from "~/utils/surreldb";
import { initDb } from "~/lib/surreal/surreal";
import GoogleProvider from "next-auth/providers/google";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
      apikey: string;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async (inp) => {
      const { session, user } = inp;

      const dbs = await db();

      // console.log("===== SESSION ====== ")
      // console.log(inp);

      const apikey_req = await dbs.query(
        `SELECT * from only apikey WHERE user = ${user.id} LIMIT 1;`,
        "GetApiKeyForUser",
      );

      console.log("------------");
      console.log(apikey_req);

      let apikey = apikey_req[0]?.apikey as string | undefined;

      if (!apikey) {
        /////// create first default apikey
        apikey = crypto.randomUUID().replaceAll("-", "");
        await dbs.client.create("apikey", {
          apikey: apikey,
          user: new RecordId("user", user.id.split(":")[1]!),
        });
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          apikey,
        },
      };
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  adapter: SurrealAdapter({
    getDB: async () => {
      // const db = await getDB();
      const db = await initDb();

      return db
    },
  }),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    EmailProviderCustom({
      id: "email",
      type: "email",
      apikey: env.RESEND_API_KEY,
      from: env.RESEND_FROM,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
