/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { RecordId } from "surrealdb";
import moment from "moment";
const invoiceItemes = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string().optional(),
  vatable: z.boolean().optional(),
  quantity: z.number(),
});

const invoice_z = z.object({
  invoiceToId: z.string().optional(),
  clientName: z.string().optional(),
  reference: z.boolean().optional(),
  clientReference: z.string().optional(),

  due: z.date().optional(),

  status: z.string().optional(),
  issued: z.date().optional(),

  items: z.array(invoiceItemes),
});

export const MiscInvoiceRouter = createTRPCRouter({
  Create_invoice: protectedProcedure
    .input(invoice_z)
    .mutation(async ({ ctx, input }) => {
      const invoice = await ctx.db.query(
        /* surrealql */ `CREATE misc_invoice SET issued = d"${input.issued?.toISOString()}",
            invoiceToId = ${input.invoiceToId},
            reference = ${input.reference},
            clientReference = "${input.clientReference}",
            due = d"${input.due?.toISOString()}",
            status = "${input?.status}";
               `,
        "GetAllInvoices",
        {
          skip_write: false,
        },
      );
      const invoiceId = invoice[0];

      // for (const item of input.items) {
      //   const invoiceItems = await ctx.db.client
      //     .query(/* surrealql */ `CREATE invoice_items SET
      //         description= "${item.description}",
      //         amount= ${item.amount},
      //         invoice_id=${invoiceId[0]?.id},
      //        quantity=${item.quantity},
      //        vatable=${item.vatable};
      //         `);
      //   console.log("created invoiceItems", invoiceItems);
      // }
    }),

  get_All_invoices: protectedProcedure
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.query(
        /* surrealql */ `SELECT * ,(SELECT * FROM invoice_items WHERE invoice_id = $parent.id) as invoice_items  FROM misc_invoice FETCH invoiceToId;`,
        "GetAllInvoices",
        {
          skip_write: false,
        },
      );
      const invoices = result[0];
      return { invoices };
    }),

  get_invoice: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.query(
        /* surrealql */ `SELECT * ,(SELECT * FROM invoice_items WHERE invoice_id = $parent.id) as invoice_items  FROM misc_invoice WHERE id = misc_invoice:${input.id}  FETCH invoiceToId;`,
        "GetMiscInvoice",
        {
          skip_write: false,
        },
      );
      const invoice = result[0];
      return { invoice };
    }),
});
