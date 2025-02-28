import { createTRPCRouter, protectedProcedure } from "../trpc";

import { z } from "zod";
import slug from "slug";

import { RecordId } from "surrealdb";
import { TRPCError } from "@trpc/server";
import { type role_types } from "~/components/members/roles";
import { type NSurreal } from "~/lib/netron_surreal";
import { type Queries } from "~/generated/combined";
import { type Awaitable } from "next-auth";
import {
  type CommonProviderOptions,
  type EmailUserConfig,
  type SendVerificationRequestParams,
} from "next-auth/providers/index";
import { Resend } from "resend";

import { render } from "~/lib/reactmail/render";
import { EmailInvite } from "~/emails/inviteMember";
import { env } from "~/env";
import Auction from "~/pages/[team]/~/auction";
import CompanyExpenses from "~/pages/[team]/~/expenses";
import { v4 as uuidv4 } from "uuid";

export interface EmailUserConfigCustom extends Record<string, unknown> {
  type?: "email";
  /** @default `"Auth.js <no-reply@authjs.dev>"` */
  from?: string;
  /**
   * How long until the e-mail can be used to log the user in,
   * in seconds. Defaults to 1 day
   *
   * @default 86400
   */
  maxAge?: number;
  /** [Documentation](https://authjs.dev/guides/providers/email#customizing-emails) */
  sendVerificationRequest?: (
    params: SendVerificationRequestParams,
  ) => Awaitable<void>;

  generateVerificationToken?: () => Awaitable<string>;
  /** If defined, it is used to hash the verification token when saving to the database . */
  secret?: string;

  normalizeIdentifier?: (identifier: string) => string;
}

export interface EmailConfig extends CommonProviderOptions {
  // defaults
  id: "email";
  type: "email";

  name: "Email";
  server: NonNullable<EmailUserConfig["server"]>;
  from: string;
  maxAge: number;
  sendVerificationRequest: (
    params: SendVerificationRequestParams,
  ) => Awaitable<void>;

  /**
   * This is copied into EmailConfig in parseProviders() don't use elsewhere
   */
  options: EmailUserConfigCustom;

  secret?: string;
  generateVerificationToken?: () => Awaitable<string>;
  normalizeIdentifier?: (identifier: string) => string;
}

async function create_team(input: {
  name: string;
  owner: RecordId<"user">;
  image?: string | null;
  db: NSurreal<Queries>;
}) {
  const db = input.db;
  // CHECK DUPES
  const team_slug = slug(input.name);

  const check_exists = await db.client.query<[{ id: RecordId; slug: string }]>(
    `SELECT id, slug FROM ONLY team WHERE slug = "${team_slug}" LIMIT 1;`,
  );

  if (check_exists[0]) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Team already exists.",
    });
  }

  // CREATE NEW TEAM
  const newteamname = input.name ?? "new team";
  const newt = (await db.client.create("team", {
    name: newteamname,
    description: newteamname,
    slug: team_slug,
    owner: input.owner,
    image: input.image,
    pro: false,
    freeTrial: false,
    team_type: "Advertise",
  })) as [
      {
        id: RecordId;
        name: string;
        description: string;
        slug: string;
        owner: string;
        image?: string;
      },
    ];

  // CREATE MEMBERSHIP ENTRY

  const newmember = (await db.client.create("teammember", {
    user: input.owner,
    team: newt[0].id,
    role: "owner",
    pending: false,
  })) as [
      {
        id: RecordId<"teammember">;
        created_at: Date;
        role: (typeof role_types)[number]["id"];
        team: RecordId<"team">;
        user: RecordId<"user">;
        pending: boolean;
      },
    ];

  const newmembership = {
    ...newmember[0],
    team: newt[0],
  };

  return newmembership;
}

async function create_project(input: {
  name: string;
  owner: RecordId<"user">;
  team: RecordId<"team">;
  db: NSurreal<Queries>;
}) {
  // todo check user has permission to create project.
  // todo switch to using user scope rules and direct apicalls instead of server side.

  const project_slug = slug(input.name);

  const newproject = (await input.db.client.create("project", {
    name: input.name,
    owner: input.owner,
    team: input.team,
    slug: project_slug,
  })) as [
      {
        id: RecordId;
        name: string;
        owner: string;
        team: string;
        slug: string;
      },
    ];

  return newproject[0];
}

async function check_teammembership(input: {
  userid_string: string;
  user_email?: string | null;
  teamslug: string;
  db: NSurreal<Queries>;
}) {
  const result = await input.db.query(
    `select * from only teammember where user = ${input.userid_string} and pending IS false and team.slug = "${input.teamslug}" limit 1;`,
    "CheckTeamMembership",
    {
      skip_write: true,
    },
  );

  const permission = result[0];

  if (!permission) {
    // check for invites?

    if (!input.user_email) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You do not have permission to access this team.",
      });
    }

    const invited = await input.db.query(
      `select created_at, email, id, invited_by_user, pending, role, team.id, team.image, team.name, team.image from only teammember where email = "${input.user_email}" AND team.slug = "${input.teamslug}" AND pending IS true limit 1 fetch team;`,
      "CheckTeamMembershipInvited",
      // {
      //   skip_write: true,
      // },
    );

    const invite = invited[0];

    if (!invite) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You do not have permission to access this team.",
      });
    }
    return { invite };
  }

  return { permission };
}

export const systemRouter = createTRPCRouter({
  accept_invite: protectedProcedure
    .input(z.object({ teammember_id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.client.query(
        `update only teammember:${input.teammember_id} SET pending = false, user = ${ctx.session.user.id} RETURN AFTER;`,
      );
      return { success: true };
    }),
  check_team_membership: protectedProcedure
    .input(z.object({ teamslug: z.string() }))
    .query(async ({ ctx, input }) => {
      return await check_teammembership({
        userid_string: ctx.session.user.id,
        teamslug: input.teamslug,
        user_email: ctx.session.user.email,
        db: ctx.db,
      });
    }),
  get_team_details: protectedProcedure
    .input(z.object({ teamslug: z.string() }))
    .query(async ({ input, ctx }) => {
      // TODO add security checks

      // const test = await ctx.db.client.query(
      //   `select * from team where slug IS "${input.teamslug}";`,
      // );

      const result = await ctx.db.query(
        `select * from only team where slug = "${input.teamslug}" limit 1;`,
        "GetTeamDetails",
        {
          skip_write: true,
        },
      );

      if (!result[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Team not found.",
        });
      }

      return { team: result[0] };
    }),

  Update_Team_MarketPage_Info: protectedProcedure
    .input(
      z.object({
        team: z.string().optional(),
        monday: z.boolean().optional(),
        mondayOpen: z.string().optional(),
        mondayClose: z.string().optional(),
        tuesday: z.boolean().optional(),
        tuesdayOpen: z.string().optional(),
        tuesdayClose: z.string().optional(),
        wednesday: z.boolean().optional(),
        wednesdayOpen: z.string().optional(),
        wednesdayClose: z.string().optional(),
        thursday: z.boolean().optional(),
        thursdayOpen: z.string().optional(),
        thursdayClose: z.string().optional(),
        friday: z.boolean().optional(),
        province: z.string().optional(),
        fridayOpen: z.string().optional(),
        fridayClose: z.string().optional(),
        saturday: z.boolean().optional(),
        saturdayOpen: z.string().optional(),
        saturdayClose: z.string().optional(),
        sunday: z.boolean().optional(),
        sundayOpen: z.string().optional(),
        sundayClose: z.string().optional(),
        companyName: z.string().optional(),
        officeCell: z.string().optional(),
        city: z.string().optional(),
        leads_email: z.string().optional(),
        streetAddress: z.string().optional(),
        postalCode: z.string().optional(),
        dealershipDescription: z.string().optional(),
        private_seller: z.boolean().optional(),
        selectProfile: z.boolean().optional(),
        CMS_Dealer: z.boolean().optional(),
        CMS_Dealer_Code: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const UpdateTeamMarketInfo = await ctx.db.client
        .query(/* surrealql */ `UPDATE ${input.team} SET   monday =  ${input.monday},
    mondayOpen =  "${input.mondayOpen?.replace(":", "-")}",
    mondayClose =  "${input.mondayClose?.replace(":", "-")}",
    tuesday =  ${input.tuesday},
    tuesdayOpen =  "${input.tuesdayOpen?.replace(":", "-")}",
    tuesdayClose =  "${input.tuesdayClose?.replace(":", "-")}",
    wednesday =  ${input.wednesday},
    wednesdayOpen = "${input.wednesdayOpen?.replace(":", "-")}",
    wednesdayClose =  "${input.wednesdayClose?.replace(":", "-")}",
    thursday =  ${input.thursday},
    thursdayOpen =  "${input.thursdayOpen?.replace(":", "-")}",
    thursdayClose =  "${input.thursdayClose?.replace(":", "-")}",
    friday =  ${input.friday},
    fridayOpen =  "${input.fridayOpen?.replace(":", "-")}",
    fridayClose =  "${input.fridayClose?.replace(":", "-")}",
    saturday =  ${input.saturday},
    saturdayOpen =  "${input.saturdayOpen?.replace(":", "-")}",
    saturdayClose =  "${input.saturdayClose?.replace(":", "-")}",
    sunday =  ${input.sunday},
    select_profile = ${input.selectProfile},
    leads_email = "${input.leads_email}",
    private_seller =  ${input.private_seller},
    sundayOpen =  "${input.sundayOpen?.replace(":", "-")}",
    sundayClose =  "${input.sundayClose?.replace(":", "-")}",
    company_name = "${input.companyName}",
    office_cell = "${input.officeCell}",
    city = "${input.city}",
    CMS_Dealer = ${input.CMS_Dealer},
    CMS_Dealer_Code = "${input.CMS_Dealer_Code}",
    province = "${input.province}",
    street_address = "${input.streetAddress}",
    postal_code = "${input.postalCode}",
    dealershipDescription = "${input.dealershipDescription}";`);

      return UpdateTeamMarketInfo;
    }),

  Update_Team_image: protectedProcedure
    .input(
      z.object({
        team_id: z.string(),
        image_url: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const addVehicleImage = await ctx.db.client.query(
        /* surrealql */ `UPDATE ${input.team_id} SET  image = "${input.image_url}";`,
      );

      return addVehicleImage;
    }),
  get_user_teams: protectedProcedure.query(async (props) => {
    const ctx = props.ctx;

    const result = await ctx.db.query(
      `select * from teammember where user = ${ctx.session.user.id} fetch team;`,
      "GetUserTeams",
      {
        skip_write: true,
      },
    );

    const teammember = result[0];

    if (!result[0][0]) {
      // auto creates a team if user has no teams.. this should be done on user signup later on.
      console.log("==== debug ==== create_team")
      const newteammembership = await create_team({
        name: ctx.session.user.name ?? ctx.session.user.email ?? "new team",
        owner: new RecordId("user", ctx.session.user.id.split(":")[1]!),
        image: ctx.session.user.image,
        db: ctx.db,
      });
      console.log("==== debug ==== create_team after", newteammembership)

      return { teammember: [newteammembership] };
    }

    return { teammember };
  }),
  create_team: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      /////////

      const newteam = await create_team({
        name: input.name,
        owner: new RecordId("user", ctx.session.user.id.split(":")[1]!),
        // image: ctx.session.user.image,
        db: ctx.db,
      });

      return { teammembership: newteam };
    }),
  projects: createTRPCRouter({
    create_project: protectedProcedure
      .input(z.object({ name: z.string(), team_id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const owner = new RecordId("user", ctx.session.user.id.split(":")[1]!);

        const newproject = await create_project({
          name: input.name,
          owner,
          team: new RecordId("team", input.team_id),
          db: ctx.db,
        });

        return { project: newproject };
      }),
    // get_projects: protectedProcedure
    //   .input(z.object({ teamslug: z.string() }))
    //   .query(async ({ ctx, input }) => {
    //     // TODO add security checks

    //     const result = await ctx.db.query(
    //       // `select name, slug, owner.name, owner.email from project where team.slug = "${input.teamslug}";`,

    //       `SELECT id,
    //       name,
    //       slug,
    //       count((SELECT id FROM source WHERE project = $parent.id)) AS sources,
    //       team,
    //       count((SELECT id FROM source WHERE project = $parent.id)) AS source_count,
    //       image
    //       FROM (SELECT * FROM project WHERE team = (SELECT team FROM ONLY teammember WHERE team.slug = "${input.teamslug}" AND user.id = ${ctx.session.user.id} LIMIT 1).team);`,
    //       "GetProjects",
    //     );

    //     return { projects: result[0] };
    //   }),
    sources: createTRPCRouter({
      get_sources: protectedProcedure
        .input(z.object({ projectslug: z.string() }))
        .query(async ({ input, ctx }) => {
          const result = await ctx.db.client.query<
            [
              {
                id: RecordId;
                name: string;
                project: string;
                type: string;
                config: string;
                details: {
                  brand: string;
                  make: string;
                  model: string;
                };
                gps: { lat: number; lon: number };
              }[],
            ]
          >(
            `select * from source where project.slug = "${input.projectslug}" fetch project;`,
          );

          return { sources: result[0] };
        }),
    }),
  }),

  members: createTRPCRouter({
    get_team_members: protectedProcedure
      .input(z.object({ teamslug: z.string() }))
      .query(async ({ ctx, input }) => {
        const membership_check = await check_teammembership({
          userid_string: ctx.session.user.id,
          teamslug: input.teamslug,
          db: ctx.db,
        });

        const result = await ctx.db.query(
          `select * from teammember where team.slug = "${input.teamslug}" AND pending IS true fetch invited_by_user;
            select * from teammember where team.slug = "${input.teamslug}" AND user AND pending IS NOT true fetch user;
          `,
          "GetTeamMembers",
          {
            skip_write: true,
          },
        );

        return { pending: result[0], members: result[1] };
      }),
    invite_member: protectedProcedure
      .input(
        z.object({
          email: z.string(),
          role: z.string(),
          team_id: z.string(),
          teamSlug: z.string(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        // check user exists
        const user = await ctx.db.client.query(
          `select * from only user where email = "${input.email}" limit 1;`,
        );

        const user_exists = Boolean(user[0]);

        // todo check user has permission to invite member.
        // todo switch to using user scope rules and direct apicalls instead of server side.

        const newmember = (await ctx.db.client.create("teammember", {
          email: input.email,
          role: input.role,
          team: new RecordId("team", input.team_id),
          created_at: new Date(),
          invited_by: new RecordId("user", ctx.session.user.id.split(":")[1]!),
          pending: true,
        })) as [
            {
              id: RecordId<"teammember">;
              email: string;
              role: string;
              team: RecordId<"team">;
              created_at: Date;
              invited_by: RecordId<"user">;
              pending: boolean;
            },
          ];

        const resend = new Resend();

        if (user_exists) {
          await resend.emails.send({
            from: env.RESEND_FROM,
            to: input.email,
            subject: `Invitation to join ${input.teamSlug}`,
            text: render(
              EmailInvite({
                url: `autodex.co.za/${input.teamSlug}`,
                team: input.teamSlug,
              }),
              {
                plainText: true,
              },
            ),
            html: render(
              EmailInvite({
                url: `autodex.co.za/${input.teamSlug}`,
                team: input.teamSlug,
              }),
              {},
            ),
          });
        }

        return { member: newmember[0], user_exists };
      }),
  }),

  // update_team_member_nav: protectedProcedure
  //   .input(
  //     z.object({
  //       teammember: z.coerce.string(),
  //       nav_option_stock: z.boolean(),
  //       nav_option_vehicles: z.boolean(),
  //       nav_option_auction: z.boolean(),
  //       nav_option_suppliers: z.boolean(),
  //       nav_option_clients: z.boolean(),
  //       nav_option_marketPage: z.boolean(),
  //       nav_option_financeCalculator: z.boolean(),
  //       nav_option_companyExpenses: z.boolean(),
  //       nav_option_reports: z.boolean(),
  //       nav_option_settings: z.boolean(),
  //     }),
  //   )
  //   .mutation(async ({ input, ctx }) => {
  //     const result = await ctx.db.client.query(
  //       /* surrealql */ `update teammember:${input.teammember} SET nav_option_stock = ${input.nav_option_stock}, nav_option_vehicles = ${input.nav_option_vehicles}, nav_option_auctions = ${input.nav_option_auctions}, nav_option_suppliers = ${input.nav_option_suppliers}, nav_option_clients = ${input.nav_option_clients}, nav_option_marketPage = ${input.nav_option_marketPage}, nav_option_financeCalculator = ${input.nav_option_financeCalculator}, nav_option_companyExpenses = ${input.nav_option_companyExpenses}, nav_option_reports = ${input.nav_option_reports}, nav_option_settings = ${input.nav_option_settings};`,
  //     );

  //     return { teammember: result[0] };
  //   }),

  get_team_member: protectedProcedure
    .input(z.object({ team: z.coerce.string(), user: z.coerce.string() }))
    .query(async ({ input, ctx }) => {
      const result = await ctx.db.query(
        /* surrealql */ `SELECT * FROM ONLY teammember WHERE team = ${input.team} and user = ${input.user} LIMIT 1;`,
        "GetTeamMember",
        {
          skip_write: false,
        },
      );

      const teammember = result[0];

      return teammember;
    }),

  source: createTRPCRouter({
    get_source_by_id: protectedProcedure
      .input(z.object({ source_id: z.string() }))
      .query(async ({ input, ctx }) => {
        const result = await ctx.db.client.query<
          [
            {
              id: RecordId;
              name: string;
              project: string;
              type: string;
              config: string;
              details: {
                brand: string;
                make: string;
                model: string;
              };
              gps: { lat: number; lon: number };
            },
          ]
        >(
          /* surrealql */ `SELECT * FROM ONLY source where id = source:${input.source_id} LIMIT 1;`,
        );

        const source = result[0];

        return { source };
      }),
  }),
  telemetry: createTRPCRouter({
    get_telemetry: protectedProcedure
      .input(
        z.object({
          source_id: z.string(),
          type: z.string(),
          limit: z.number(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const result = await ctx.db.client.query<
          [
            {
              id: RecordId;
              source: string;
              data: string;
              timestamp: Date;
            }[],
          ]
        >(
          `SELECT * FROM telemetry where source = source:${input.source_id} AND type = "${input.type}" ORDER BY entrytime DESC LIMIT ${input.limit};`,
        );

        return { telemetry: result[0] };
      }),
  }),
  apikeys: createTRPCRouter({
    create_api_key: protectedProcedure
      .input(z.object({ name: z.string() }))
      .mutation(async ({ ctx, input }) => {
        await ctx.db.client.create("apikey", {
          name: input.name,
          user: new RecordId("user", ctx.session.user.id.split(":")[1]!),
          secret: uuidv4().replaceAll("-", ""),
          created_at: new Date(),
        });

        return true;
      }),
    list_apikeys: protectedProcedure.query(async ({ ctx }) => {
      const apikey_query = await ctx.db.client.query<
        [
          {
            name: string;
            secret: string;
            id: RecordId<"apikey">;
            created_at: Date;
          }[],
        ]
      >(`select * from apikey where user = ${ctx.session.user.id};`);
      const apikeys = apikey_query.at(0)!;
      return { apikeys };
    }),
    delete_api_key: protectedProcedure
      .input(z.object({ apikey_id: z.string() }))
      .mutation(async ({ input, ctx }) => {
        await ctx.db.client.query(`delete apikey:${input.apikey_id};`);
        return true;
      }),
  }),

  updateTeamView: protectedProcedure
    .input(
      z.object({
        team: z.string(),
        view: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.db.client.query(
        /* surrealql */ `UPDATE ${input.team} SET market_page_view = ${input.view};`,
      );

      return { team: result[0] };
    }),

  updateTeamPlan: protectedProcedure
    .input(
      z.object({
        team: z.coerce.string(),
        plan: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const today = new Date();
      const fourteenDaysFromNow = new Date(today.setDate(today.getDate() + 14));

      if (input.plan === "pro") {
        const result = await ctx.db.client.query(
          /* surrealql */ `update ${input.team} SET pro = true, freeTrial = true,freeTrialEndDate = d"${fourteenDaysFromNow.toISOString()}";`,
        );

        return { team: result[0] };
      }
      if (input.plan === "free") {
        const result = await ctx.db.client.query(
          /* surrealql */ `update ${input.team} SET pro = false, freeTrial = false;`,
        );

        return { team: result[0] };
      }
    }),

  updateTeamCompanyDetails: protectedProcedure
    .input(
      z.object({
        team: z.coerce.string(),
        companyName: z.string(),
        companyTradingName: z.string(),
        companyReg: z.string(),
        vatNo: z.string(),
        officeCell: z.string(),
        city: z.string(),
        streetAddress: z.string(),
        postalCode: z.string(),
        currency: z.string(),
        currency_symbol: z.string(),
        vat: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.db.client.query(
        /* surrealql */ `update ${input.team} SET company_name = "${input.companyName}",currency_symbol = "${input.currency_symbol}",vat_percentage = ${input.vat},currency = "${input.currency}" ,company_trading_name = "${input.companyTradingName}", company_reg = "${input.companyReg}", vat_no = "${input.vatNo}", office_cell = "${input.officeCell}", city = "${input.city}", street_address = "${input.streetAddress}", postal_code = "${input.postalCode}";`,
      );

      return { team: result[0] };
    }),
  GetTeamCompanyDetails: protectedProcedure
    .input(z.object({ team: z.string() }))
    .query(async ({ input, ctx }) => {
      const result = await ctx.db.query(
        /* surrealql */ `SELECT * FROM team:${input.team};`,
        "GetTeamDetails",
        {
          skip_write: true,
        },
      );
      const team = result[0];

      return team;
    }),
});
