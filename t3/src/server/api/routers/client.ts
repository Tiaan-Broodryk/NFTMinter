import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

import { RecordId } from "surrealdb";

const client_z = z.object({
  id: z.coerce.string().optional(),
  contact_name: z.string().nullable().optional(),
  contact_surname: z.string().nullable().optional(),
  contact_email: z.string().nullable().optional(),
  contact_phone: z.string().nullable().optional(),
  client_company_name: z.string().nullable().optional(),
  client_company_reg: z.string().nullable().optional(),
  client_company_vat: z.string().nullable().optional(),
  client_address: z.string().nullable().optional(),
  client_city: z.string().nullable().optional(),
  client_postal_code: z.string().nullable().optional(),
  client_company_cell: z.string().nullable().optional(),
  client_company_trading_name: z.string().nullable().optional(),
  client_is_company: z.boolean().optional(),
  client_id_no: z.string().nullable().optional(),


});

export const clientsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(client_z)
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.db.client.insert("clients", {
        ...input,

      });
      return true;
    }),
  UPDATE: protectedProcedure
    .input(client_z)
    .mutation(async ({ input, ctx }) => {
      //complete the surrealql query
      const result = await ctx.db.client
        .query(/* surrealql */ `UPDATE ${input.id} SET  contact_name="${input.contact_name}",
  contact_surname="${input.contact_surname}",
  contact_email="${input.contact_email}",
  contact_phone="${input.contact_phone}",
  client_company_name="${input.client_company_name}",
  client_company_reg="${input.client_company_reg}",
  client_company_vat="${input.client_company_vat}",
  client_address="${input.client_address}",
  client_city="${input.client_city}",
  client_postal_code="${input.client_postal_code}",
  client_company_cell="${input.client_company_cell}",
  client_company_trading_name="${input.client_company_trading_name}",
  client_is_company= ${input.client_is_company},
  client_id_no= "${input.client_id_no}"
 ;`);

      return result;
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.client.select("clients");
    const parsed = client_z.array().parse(result);
    return parsed;
  }),
  get_clients: protectedProcedure

    .query(async ({ ctx, input }) => {
      // TODO add security checks
      const result = await ctx.db.query(
        /* surrealql */ `SELECT * FROM clients `,
        "GetTeamClients",
        { skip_write: true },
      );
      return { clients: result[0] };
    }),
  get_client: protectedProcedure
    .input(z.object({ client_id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      // TODO add security checks
      const result = await ctx.db.query(
        /* surrealql */ `SELECT * FROM clients:${input.client_id} limit 1`,
        "GetClient",
        { skip_write: true },
      );
      return { client: result[0] };
    }),
  get_client2: protectedProcedure
    .input(z.object({ client_id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      // TODO add security checks
      const result = await ctx.db.query(
        /* surrealql */ `SELECT * FROM ${input.client_id} limit 1`,
        "GetClient",
        { skip_write: true },
      );
      return { client: result[0] };
    }),
});
