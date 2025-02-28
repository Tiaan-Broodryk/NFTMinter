import { type Adapter } from "next-auth/adapters";
import { type Uuid, type RecordId } from "surrealdb";
import type Surreal from "surrealdb";
import { z } from "zod";

export function queryParse<T>(data: unknown, parser: z.ZodType<T>) {
  const res = z.array(
    z.object({
      result: z.array(parser),
    }),
  );
  const p = res.parse(data);

  const output = p[0]?.result[0];

  if (!output) return null;

  const out = parser.parse(output);
  return out;
}

// export function RecordIdString(input: RecordId) {
//   return input.toString();
// }

// https://stackoverflow.com/questions/43159887/make-a-single-property-optional-in-typescript
// type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

const AdapterUserZod = z.object({
  id: z.string(),
  name: z.string(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().optional(),
  email: z.string(),
  superadmin: z.boolean().optional(),
});

const AdapterAccountZod = z.object({
  access_token: z.string(),
  expires_at: z.number(),
  userId: z.string(),
  id: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional(),
  scope: z.string(),
  provider: z.string(),
  token_type: z.string(),
  type: z.union([
    z.literal("oauth"),
    z.literal("email"),
    z.literal("credentials"),
  ]),
});

const AdapaterSessionZod = z.object({
  id: z.string(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
});

const VerificationTokenZod = z.object({
  // id: z.string(),
  identifier: z.string(),
  expires: z.coerce.date(),
  token: z.string(),
});

export function SurrealAdapter(inputs: {
  getDB: () => Promise<Surreal>;
}): Adapter {
  return {
    // ============================================================================================
    async createUser(data: {
      email: string;
      name?: string | null;
      emailVerified?: Date | null;
      image?: string | null;
    }) {
      if (!data.name) data.name = data.email;

      const client = await inputs.getDB();
      const userCreated = await client.create("user", data);
      const output = userCreated[0]!;

      if (!output) throw new Error("could not create user");

      /////// create first default apikey
      await client.create("apikey", {
        apikey: crypto.randomUUID().replaceAll("-", ""),
        user: output.id,
      });

      const user = AdapterUserZod.parse({
        email: output.email,
        emailVerified: output.emailVerified,
        id: output.id.toString(),
        image: output.image,
        name: output.name,
      });

      return user;
    },
    // ============================================================================================
    async getUser(id) {
      const client = await inputs.getDB();
      const data = await client.query<
        [
          {
            email: string;
            emailVerified: Date;
            id: RecordId;
            image: string;
            name: string;
            is_admin: boolean;
          },
        ]
      >(/* surql */ `SELECT * FROM ONLY user:${id};`);

      if (!data[0]) return null;

      const user = AdapterUserZod.parse({
        email: data[0].email,
        emailVerified: data[0].emailVerified,
        id: data[0].id.toString(),
        image: data[0].image,
        name: data[0].name,
        is_admin: data[0].is_admin,
      });

      // const user = queryParse(data, AdapterUserZod);
      return user;
    },
    // ============================================================================================
    async getUserByEmail(email) {
      const client = await inputs.getDB();
      const data = await client.query<
        [
          {
            email: string;
            emailVerified: Date | null;
            id: RecordId;
            image: string | undefined | null;
            name: string;
          },
        ]
      >(
        /* surql */ `SELECT * FROM ONLY user WHERE email = "${email}" LIMIT 1;`,
      );

      if (!data[0]) return null;

      const user = AdapterUserZod.parse({
        email: data[0].email,
        emailVerified: data[0].emailVerified,
        id: data[0].id.toString(),
        image: data[0].image,
        name: data[0].name,
      });

      return user;
    },
    // ============================================================================================
    async getUserByAccount(props) {
      const { providerAccountId } = props;
      const client = await inputs.getDB();

      const account_data = await client
        .query<
          [
            {
              access_token: string;
              expires_at: number;
              id: RecordId;
              provider: string;
              providerAccountId: string;
              refresh_token: string;
              scope: string;
              token_type: string;
              type: string;
              userId: RecordId;
            },
          ]
        >(
          /* surql */ `SELECT * FROM ONLY account WHERE providerAccountId = "${providerAccountId}" LIMIT 1;`,
        )
        .catch((err) => {
          if (err instanceof Error) {
            console.log(err.message);
          }
          console.log("-------- DB ERROR --------");
        });

      if (!account_data) return null;
      if (!account_data[0]) return null;

      const account = AdapterAccountZod.parse({
        access_token: account_data[0].access_token,
        expires_at: account_data[0].expires_at,
        id: account_data[0].id.toString(),
        provider: account_data[0].provider,
        providerAccountId: account_data[0].providerAccountId,
        refresh_token: account_data[0].refresh_token,
        scope: account_data[0].scope,
        token_type: account_data[0].token_type,
        type: account_data[0].type,
        userId: account_data[0].userId.toString(),
      });

      if (!account) return null;

      const user_data = await client.query<
        [
          {
            email: string;
            emailVerified: Date;
            id: RecordId;
            image: string;
            name: string;
            is_admin?: boolean;
          },
        ]
      >(
        /* surql */ `SELECT * FROM ONLY user WHERE id = ${account.userId} LIMIT 1;`,
      );

      const user = AdapterUserZod.parse({
        email: user_data[0].email,
        emailVerified: user_data[0].emailVerified,
        id: user_data[0].id.toString(),
        image: user_data[0].image,
        name: user_data[0].name,
        is_admin: user_data[0].is_admin,
      });

      return user;
    },
    async updateUser(user) {
      const { id, ...data } = user;
      const client = await inputs.getDB();
      const updated_user_data = await client.query<
        [
          {
            email: string;
            emailVerified: Date | null;
            id: RecordId;
            image: string | undefined | null;
            name: string;
          }[],
        ]
      >(
        /* surql */ `UPDATE ${id} MERGE ${JSON.stringify(data)} RETURN AFTER; `,
      );

      const updated_user_data_entry = updated_user_data[0][0]!;

      const user_updated = AdapterUserZod.parse({
        email: updated_user_data_entry.email,
        emailVerified: updated_user_data_entry.emailVerified,
        id: updated_user_data_entry.id.toString(),
        image: updated_user_data_entry.image,
        name: updated_user_data_entry.name,
      });

      if (!user_updated) throw new Error("Could not update user account");
      return user_updated;
    },
    async deleteUser(id) {
      const client = await inputs.getDB();
      await client.query(`DELETE user:${id};`);
      return;
    },
    async linkAccount(account: {
      type: "email" | "oauth" | "credentials" | "oidc" | "webauthn";
      // id: string;
      access_token?: string;
      expires_at?: number;
      userId: string;
      providerAccountId: string;
      scope?: string;
      provider: string;
      token_type?: string | undefined;
      refresh_token?: string | undefined;
    }) {
      const client = await inputs.getDB();
      const account_data = await client.query<
        [
          {
            access_token: string;
            expires_at: number;
            id: RecordId;
            provider: string;
            providerAccountId: string;
            refresh_token: string | undefined;
            scope: string;
            token_type: string;
            type: string;
            userId: RecordId;
          },
        ]
      >(
        /* surql */ `CREATE ONLY account CONTENT ${JSON.stringify(account)} RETURN AFTER;`,
      );

      if (!account_data[0]) throw new Error("Could not link account");

      const account_b = AdapterAccountZod.parse({
        access_token: account_data[0].access_token,
        expires_at: account_data[0].expires_at,
        id: account_data[0].id.toString(),
        provider: account_data[0].provider,
        providerAccountId: account_data[0].providerAccountId,
        refresh_token: account_data[0].refresh_token,
        scope: account_data[0].scope,
        token_type: account_data[0].token_type,
        type: account_data[0].type,
        userId: account_data[0].userId.toString(),
      });

      if (!account_b) throw new Error("Could not link account");
      return;
      // return account_b;
    },
    async unlinkAccount({ providerAccountId }: { providerAccountId: string }) {
      // return await client.delete<AdapterAccount & { id?: string }>("account", {
      //   where: { providerAccountId },
      // });
      const client = await inputs.getDB();

      const delete_account_data = await client.query(
        `DELETE account WHERE providerAccountId = "${providerAccountId}";`,
      );

      const account_deleted = queryParse(
        delete_account_data,
        AdapterAccountZod,
      );

      if (!account_deleted) throw new Error("Could not delete account");

      // return account_deleted;
      return;
    },
    // ============================================================================================
    // CREATE SESSION
    async createSession(data) {
      const client = await inputs.getDB();
      const session_data = await client.query<
        [
          {
            expires: Date;
            id: RecordId;
            sessionToken: Uuid;
            userId: RecordId;
          },
        ]
      >(`CREATE ONLY session CONTENT ${JSON.stringify(data)}; `);

      // const session = queryParse(session_data, AdapaterSessionZod);
      const session = AdapaterSessionZod.parse({
        expires: session_data[0].expires,
        id: session_data[0].id.toString(),
        sessionToken: session_data[0].sessionToken.toString(),
        userId: session_data[0].userId.toString(),
      });

      if (!session) {
        throw new Error("Could not create session");
      }

      session.expires = new Date(session.expires);

      return session;
    },
    // ============================================================================================
    // GET SESSION AND USER
    async getSessionAndUser(sessionToken) {
      const client = await inputs.getDB();

      const session_data = await client
        .query<
          [
            {
              expires: Date;
              id: RecordId;
              sessionToken: Uuid;
              userId: RecordId;
            },
          ]
        >(
          `SELECT * FROM ONLY session WHERE sessionToken = "${sessionToken}" LIMIT 1; `,
        )
        .catch((err) => {
          console.log(err);
        });

      if (!session_data) {
        return null;
      }

      if (!session_data[0]) {
        return null;
      }

      const data_result = session_data[0];

      const prepared = {
        expires: data_result.expires,
        id: data_result.id.toString(),
        sessionToken: data_result.sessionToken.toString(),
        userId: data_result.userId.toString(),
      };

      const session = AdapaterSessionZod.parse(prepared);

      if (!session) {
        return null;
      }

      const user_data = await client.query<
        [
          {
            email: string;
            emailVerified: Date;
            id: RecordId;
            image: string;
            name: string;
          },
        ]
      >(`SELECT * FROM ONLY ${session.userId}; `);

      if (!user_data.at(0)) return null;

      const user = AdapterUserZod.parse({
        ...user_data[0],
        email: user_data[0].email,
        emailVerified: user_data[0].emailVerified,
        id: `${user_data[0].id.tb}:${user_data[0].id.id as string}`,
        image: user_data[0].image,
        name: user_data[0].name,
      });

      if (!user) return null;

      return { user, session };
    },
    async updateSession(data) {
      const client = await inputs.getDB();

      const session_data = await client.query<
        [
          {
            expires: Date;
            id: RecordId;
            sessionToken: Uuid;
            userId: RecordId;
          }[],
        ]
      >(
        `UPDATE session SET expires = d"${data.expires?.toISOString()}" WHERE sessionToken = "${data.sessionToken
        }";`,
      );

      const sessdata = session_data[0][0];

      if (!sessdata) {
        return null;
      }

      const session = AdapaterSessionZod.parse({
        expires: sessdata.expires,
        id: sessdata.id.toString(),
        sessionToken: sessdata.sessionToken.toString(),
        userId: sessdata.userId.toString(),
      });

      return session;
    },
    // ============================================================================================
    // DELETE SESSION
    async deleteSession(sessionToken) {
      const client = await inputs.getDB();
      const delete_session_data = await client.query<
        [
          {
            expires: Date;
            id: RecordId;
            sessionToken: Uuid;
            userId: RecordId;
          },
        ]
      >(
        `DELETE ONLY session WHERE sessionToken = "${sessionToken}" RETURN BEFORE;`,
      );

      const delete_session = AdapaterSessionZod.parse({
        expires: delete_session_data[0].expires,
        id: delete_session_data[0].id.toString(),
        sessionToken: delete_session_data[0].sessionToken.toString(),
        userId: delete_session_data[0].userId.toString(),
      });

      return delete_session;

      // return await client.delete<AdapterSession & { id?: string }>("session", {
      //   where: { sessionToken },
      // });
    },
    async createVerificationToken(data) {
      const client = await inputs.getDB();

      const verification_token_data = await client.query<
        [
          {
            identifier: string;
            expires: Date;
            token: string;
          },
        ]
      >(
        `CREATE ONLY verificationToken CONTENT ${JSON.stringify(
          data,
        )} RETURN AFTER;`,
      );

      if (!verification_token_data[0])
        throw new Error("Could not create verification token");

      const verification_token = VerificationTokenZod.parse({
        identifier: verification_token_data[0].identifier,
        expires: verification_token_data[0].expires,
        token: verification_token_data[0].token,
      });

      return verification_token;
    },
    async useVerificationToken({ identifier, token }) {
      try {
        const client = await inputs.getDB();

        const verification_token_data = await client.query<
          [
            {
              expires: Date;
              id: RecordId;
              identifier: string;
              token: string;
            }[],
          ]
        >(
          `DELETE verificationToken WHERE identifier = "${identifier}" AND token = "${token}" RETURN BEFORE;`,
        );

        if (!verification_token_data?.[0]?.[0]) {
          throw new Error("Could not use verification token");
        }

        const result = verification_token_data[0][0];

        const verification_token = VerificationTokenZod.parse({
          identifier: result.identifier,
          expires: result.expires,
          token: result.token,
        });

        return verification_token;
      } catch (error) {
        return null;

        // throw error;
      }
    },
  };
}
