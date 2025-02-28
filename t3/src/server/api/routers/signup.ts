/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { db } from "~/server/db";
import { RecordId } from "surrealdb";

const signUp_z = z.object({
  plan: z.string().optional(),

  teamName: z.string().optional(),
  companyName: z.string().optional(),
  companyTradingName: z.string().optional(),
  companyReg: z.string().optional(),
  vatNo: z.string().optional(),
  officeCell: z.string().optional(),
  city: z.string().optional(),
  streetAddress: z.string().optional(),
  postalCode: z.string().optional(),
  currency_symbol: z.string().optional(),
  currency: z.string().optional(),
  vat: z.number().optional(),
  email: z.string().optional(),
  userName: z.string().optional(),
  freeTrialEndDate: z.date().optional(),
});
const signUp_2z = z.object({
  plan: z.string().optional(),

  teamName: z.string().optional(),
  email: z.string().optional(),
  userName: z.string().optional(),
});

export const signUpRouter = createTRPCRouter({
  SignUpPro: publicProcedure
    .input(signUp_z)
    .mutation(async ({ input, ctx }) => {
      const today = new Date();
      const fourteenDaysFromNow = new Date(today.setDate(today.getDate() + 14));

      const checkFroUser = await ctx.db.query(
        /* surrealql */ `SELECT * FROM ONLY user WHERE email = "${input.email}" LIMIT 1`,
        "UsersSignUp",
        {
          skip_write: true,
        },
      );
      let user_id: RecordId | null = checkFroUser[0]?.id ?? null;

      console.log("Found user", checkFroUser);
      if (!user_id) {
        const newuser = await ctx.db.query(
          /* surrealql */ `CREATE user SET email = "${input.email}", name = "${input.userName}", emailVerified = d"${new Date().toISOString()}" `,
          "UsersSignUpCreate",
          {
            skip_write: false,
          },
        );
        console.log("created user ", newuser);
        const newId = newuser[0][0] ?? { id: null };
        user_id = newId.id;
        console.log("created user ", newId.id);
      } else {
        console.log("found user exists", user_id);
      }
      const newTeam = await ctx.db.query(
        /* surrealql */ `CREATE team SET freeTrial = true,pro = true,freeTrialEndDate = d"${fourteenDaysFromNow.toISOString()}",city = "${input.city}",company_name = "${input.companyName}",company_reg = "${input.companyReg}",company_trading_name = "${input.companyTradingName}",currency = "${input.currency}",currency_symbol = "${input.currency_symbol}",description = "${input.teamName}" , name = "${input.teamName}",office_cell = "${input.officeCell}",owner = ${user_id?.toString()},postal_code = "${input.postalCode}",slug = "${input.teamName}",street_address = "${input.streetAddress}",vat_no = "${input.vatNo}",vat_percentage = ${input.vat}`,
        "TeamSignUpCreateTeam",
        {
          skip_write: false,
        },
      );
      console.log("created team ", newTeam);

      const new_team_id = newTeam[0];

      const newTeamMember = await ctx.db.query(
        /* surrealql */ `CREATE teammember SET created_at = d"${new Date().toISOString()}",email = "${input.email}",pending = false,team = ${new_team_id[0]?.id.toString()},user = ${user_id?.toString()},role = "owner"`,
        "TeamSignUpCreateTeamMember",
        {
          skip_write: false,
        },
      );
      console.log("created team member ", newTeamMember);

      console.log("new pro signup completed");
    }),
  SignUpFree: publicProcedure
    .input(signUp_2z)
    .mutation(async ({ input, ctx }) => {
      const today = new Date();
      const fourteenDaysFromNow = new Date(today.setDate(today.getDate() + 14));

      const checkFroUser = await ctx.db.query(
        /* surrealql */ `SELECT * FROM ONLY user WHERE email = "${input.email}" LIMIT 1`,
        "UsersSignUp",
        {
          skip_write: true,
        },
      );
      let user_id: RecordId | null = checkFroUser[0]?.id ?? null;

      console.log("Found user", checkFroUser);
      if (!user_id) {
        const newuser = await ctx.db.query(
          /* surrealql */ `CREATE user SET email = "${input.email}", name = "${input.userName}", emailVerified = d"${new Date().toISOString()}" `,
          "UsersSignUpCreate",
          {
            skip_write: false,
          },
        );
        console.log("created user ", newuser);
        const newId = newuser[0][0] ?? { id: null };
        user_id = newId.id;
        console.log("created user ", newId.id);
      } else {
        console.log("found user exists", user_id);
      }
      const newTeam = await ctx.db.query(
        /* surrealql */ `CREATE team SET description = "${input.teamName}" , name = "${input.teamName}",freeTrial = false ,pro = false ,owner = ${user_id?.toString()},slug = "${input.teamName}"`,
        "TeamSignUpCreateTeam",
        {
          skip_write: false,
        },
      );
      console.log("created team ", newTeam);

      const new_team_id = newTeam[0];

      const newTeamMember = await ctx.db.query(
        /* surrealql */ `CREATE teammember SET created_at = d"${new Date().toISOString()}",email = "${input.email}",pending = false,team = ${new_team_id[0]?.id.toString()},user = ${user_id?.toString()},role = "owner"`,
        "TeamSignUpCreateTeamMember",
        {
          skip_write: false,
        },
      );
      console.log("created team member ", newTeamMember);

      console.log("new pro signup completed");
    }),
});
