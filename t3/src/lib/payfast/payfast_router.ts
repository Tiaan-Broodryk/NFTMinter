import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { env } from "~/env";
import { payment_z } from "~/types/payment";


import {
  generateSignature,
  payfast_schema,
  payfast_subscription_cancel,
  payfast_subscription_fetch,
  payfast_subscription_pause,
  payfast_subscription_unpause,
  payfast_subscription_update,
  payfast_update_schema,
} from "./payfast_functions";
import { get_subscriptions } from "./get_subscriptions";

const subscriptions_router = createTRPCRouter({
  fetch: protectedProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const data = await payfast_subscription_fetch({ token: input.token });
      return data;
    }),
  unpause: protectedProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      const data = await payfast_subscription_unpause(input);
      return data;
    }),
  pause: protectedProcedure
    .input(z.object({ token: z.string(), cycles: z.number().optional() }))
    .mutation(async ({ input }) => {
      const data = await payfast_subscription_pause(input);
      return data;
    }),
  update: protectedProcedure
    .input(
      z.object({
        token: z.string(),

        amount: z.number().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const data = await payfast_subscription_update(input);
      return data;
    }),
  cancel: protectedProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      const data = await payfast_subscription_cancel(input);
      return data;
    }),
});

export const payfast_router = createTRPCRouter({
  get_payfast_info: protectedProcedure.query(() => {
    return {
      action_url: env.PAYFAST_URL,
      merchant_id: env.PAYFAST_MERCHANT_ID,
      merchant_key: env.PAYFAST_MERCHANT_KEY,
    };
  }),
  generate_signature: protectedProcedure
    .input(payfast_schema)
    .query(({ input }) => {
      if (input.merchant_id != env.PAYFAST_MERCHANT_ID) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Merchant ID mismatch",
        });
      }

      if (input.merchant_key != env.PAYFAST_MERCHANT_KEY) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Merchant Key mismatch",
        });
      }

      return generateSignature(input, env.PAYFAST_SALT_PASSPHRASE).signature;
    }),
  generate_signature_update: protectedProcedure
    .input(payfast_update_schema)
    .query(({ input }) => {
      if (input.merchant_id != env.PAYFAST_MERCHANT_ID) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Merchant ID mismatch",
        });
      }

      if (input.merchant_key != env.PAYFAST_MERCHANT_KEY) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Merchant Key mismatch",
        });
      }

      return generateSignature(input, env.PAYFAST_SALT_PASSPHRASE).signature;
    }),
  subscriptions: subscriptions_router,
  get_payments: protectedProcedure
    .input(z.object({ team_id: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      const res = await ctx.db.query(
        `SELECT * FROM payment where raw_data.email_address = "${ctx.session.user.email}" AND team = ${input.team_id};`,
        "PayFastGetPayments",
      );

      const payments = payment_z.array().parse(res[0]);

      return payments;
    }),
  get_subscriptions: protectedProcedure
    .input(z.object({ team_id: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      const subs = await get_subscriptions({
        db: ctx.db,
        email: ctx.session.user.email ?? "",
        team_id: input.team_id,
      });
      return subs;
    }),
});
