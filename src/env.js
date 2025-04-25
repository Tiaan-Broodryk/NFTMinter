import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),

    RESEND_API_KEY: z.string(),
    RESEND_FROM: z.string(),
    // PINATA_JWT: z.string(),


    SURREALDB_HOST: z.string(),
    SURREALDB_USER: z.string(),
    SURREALDB_PASS: z.string(),
    SURREALDB_NS: z.string(),
    SURREALDB_DB: z.string(),

    NETRON_APIRS: z.string(),
    PAYFAST_URL: z.string(),
    PAYFAST_MERCHANT_ID: z.string(),
    PAYFAST_MERCHANT_KEY: z.string(),
    PAYFAST_SALT_PASSPHRASE: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_MAPBOX_KEY: z.string(),
    NEXT_PUBLIC_NODE_ENV: z.enum(["development", "test", "production"]),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    // PINATA_JWT: process.env.PINATA_JWT,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM: process.env.RESEND_FROM,
    SURREALDB_HOST: process.env.SURREALDB_HOST,
    SURREALDB_USER: process.env.SURREALDB_USER,
    SURREALDB_PASS: process.env.SURREALDB_PASS,
    SURREALDB_NS: process.env.SURREALDB_NS,
    SURREALDB_DB: process.env.SURREALDB_DB,
    NEXT_PUBLIC_MAPBOX_KEY: process.env.NEXT_PUBLIC_MAPBOX_KEY,
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
    NETRON_APIRS: process.env.NETRON_APIRS,
    PAYFAST_URL: process.env.PAYFAST_URL,
    PAYFAST_MERCHANT_ID: process.env.PAYFAST_MERCHANT_ID,
    PAYFAST_MERCHANT_KEY: process.env.PAYFAST_MERCHANT_KEY,
    PAYFAST_SALT_PASSPHRASE: process.env.PAYFAST_SALT_PASSPHRASE,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
