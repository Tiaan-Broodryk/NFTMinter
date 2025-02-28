// https://stockfeed.cmscloud.co.za/cms/publishedStock

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import * as fs from "fs";
import { z } from "zod";
import { db } from "~/server/db";
import { type RecordId } from "surrealdb";
import { cmscloud_lead_push } from "./cmscloud_lead_push";

export async function cmscloud_fetch() {
  const data = await fetch(
    "https://stockfeed.cmscloud.co.za/cms/publishedStock",
  )
    .then((res) => res.text())
    .catch(console.log);

  console.log(data);

  if (data) {
    await fs.promises.writeFile("cmsdata.txt", data);
  }

  return true;
}

function processvehicle(input: { vehiclestring: string }) {
  const data = input.vehiclestring.trim().replaceAll("</row>", "").split("\n");

  const vehddata: {
    DTMaintenancePlanExpiry: Date | string | null;
    DTUpdated: Date | string | null;
    DTCreated: Date | string | null;
    Thumbs: { DTCreated: Date; src: string }[];
    Pics: { DTCreated: Date; src: string }[];
  } = {
    DTMaintenancePlanExpiry: null,
    DTUpdated: null,
    DTCreated: null,
    Thumbs: [],
    Pics: [],
  };

  let currentkey = "";
  let currentvalue = "";

  data.forEach((line) => {
    const startkey = line.trim().split("<")[1]?.split(">")[0];

    if (!line.trim().startsWith("</")) {
      if (startkey) {
        currentkey = startkey;
        const value =
          line.split(`<${startkey}>`)[1]?.split(`</${startkey}>`)[0] ?? "";
        currentvalue = value;
      } else {
        const value = line + "\n";
        currentvalue += value;
      }
    }

    if (currentkey.endsWith("/")) {
      currentkey = currentkey.slice(0, -1);
    }

    let saved = false;

    if (currentkey.startsWith("Thumb ")) {
      vehddata.Thumbs.push({
        DTCreated: new Date(
          currentkey.split(`DTCreated="`)[1]?.split(`"`)[0] ?? "",
        ),
        src: currentvalue.replaceAll("</Thumb>", "").trim(),
      });
      saved = true;
    }

    if (currentkey.startsWith("Pic ")) {
      vehddata.Pics.push({
        DTCreated: new Date(
          currentkey.split(`DTCreated="`)[1]?.split(`"`)[0] ?? "",
        ),
        src: currentvalue.replaceAll("</Pic>", "").trim(),
      });
      saved = true;
    }

    if (!saved) {
      const c = currentkey as keyof Omit<typeof vehddata, "Thumbs" | "Pics">;
      vehddata[c] = currentvalue;
    }
  });

  // zod

  vehddata.DTMaintenancePlanExpiry =
    vehddata.DTMaintenancePlanExpiry != "" &&
      vehddata.DTMaintenancePlanExpiry != null
      ? new Date(vehddata.DTMaintenancePlanExpiry)
      : null;

  vehddata.DTUpdated =
    vehddata.DTUpdated != "" && vehddata.DTUpdated != null
      ? new Date(vehddata.DTUpdated)
      : null;

  vehddata.DTCreated =
    vehddata.DTCreated != "" && vehddata.DTCreated != null
      ? new Date(vehddata.DTCreated)
      : null;

  const parsed = z
    .object({
      Thumbs: z.array(z.strictObject({ DTCreated: z.date(), src: z.string() })),
      Pics: z.array(z.strictObject({ DTCreated: z.date(), src: z.string() })),
      NewUsed: z.string(),
      Brand: z.string(),
      Model: z.string(),
      MMCode: z.string(),
      ID: z.string(),
      Year: z.string(),
      Mileage: z.string(),
      Price: z.string(),
      Region: z.string(),
      DealershipID: z.string(),
      OriginalDealershipID: z.string(),
      DealershipName: z.string(),
      Email: z.string(),
      CellNumber: z.string(),
      ContactPerson: z.string(),
      Colour: z.string(),
      StockNo: z.string(),
      StockNoDisplay: z.string(),
      Features: z.string(),
      Comments: z.string(),
      FSH: z.string(),
      VIN: z.string(),
      Type: z.string(),
      ServicePlanValid: z.string(),
      ServiceBooksProvided: z.string(),
      DTLastService: z.string(),
      NumPanelsToBeRepaired: z.string(),
      DTServicePlanExpiry: z.string(),
      TwoKeys: z.string(),
      LastServiceKMS: z.string(),
      NumBumpersToBeRepaired: z.string(),
      MaintenancePlanValid: z.string(),
      ServiceHistory: z.string(),
      DTNextService: z.string(),
      NumTyresToBeReplaced: z.string(),
      DTMaintenancePlanExpiry: z.coerce.date().nullable(),
      LastServiceDoneBy: z.string(),
      NextServiceKMS: z.string(),
      WarrantyActive: z.string(),
      WarrantyDescription: z.string(),
      DTWarrantyInception: z.string(),
      DTWarrantyExpiry: z.string(),
      WarrantyDistance: z.string(),
      WarrantyDistanceUnlimited: z.string(),
      FuelType: z.string(),
      BodyType: z.string(),
      Transmission: z.string(),
      ModelRange: z.string(),
      MovURL: z.string(),
      Disclaimer: z.string(),
      Category: z.string(),
      EngineNo: z.string(),
      RegNo: z.string(),
      ServicePlanExpiryKMS: z.string(),
      MaintenancePlanExpiryKMS: z.string(),
      Classification: z.string(),
      MonthlyRepayment: z.string(),
      RepaymentTerm: z.string(),
      RepaymentInterestRate: z.string(),
      RepaymentDepositPerc: z.string(),
      RepaymentBalloonPerc: z.string(),
      InitiationFee: z.string(),
      MonthlyAdminFee: z.string(),
      DTSpecialPriceExpiry: z.string(),
      SpecialPrice: z.string(),
      DTUpdated: z.coerce.date().nullable(),
      DTCreated: z.coerce.date().nullable(),
    })
    .safeParse(vehddata);

  if (!parsed.success) {
    console.log("------------------- EROR ZOD");
    console.log(vehddata);
    throw new Error(parsed.error.message);
  }
  //

  return parsed.data;
}

export async function cmscloud_process() {
  const data = await fs.promises.readFile("cmsdata.txt", "utf-8");

  if (!data) {
    throw new Error("No data");
  }

  const vehicles = data.split("<row>");

  const vehicles_parsed = vehicles
    .slice(1)
    .map((vehicle) => processvehicle({ vehiclestring: vehicle }));

  //   const firstveh = processvehicle({ vehiclestring: vehicles[1]! });

  return { vehicle_count: vehicles.length, vehicles_parsed };
}

export const cmscloud_router = createTRPCRouter({
  fetch: protectedProcedure.mutation(async () => {
    const data = await cmscloud_fetch();
    return data;
  }),
  process: protectedProcedure.mutation(async () => {
    const vehicle_parsed = await cmscloud_process();

    // fetch all dealers with codes
    // tian add dealer code to fetch codes from db.
    const dbc = await db();
    const dealercodes = await dbc.client.query(
      /* surrealql */ `SELECT CMS_Dealer, CMS_Dealer_Code, id, name FROM team WHERE CMS_Dealer == true;`,
    );

    console.log(vehicle_parsed.vehicle_count);
    console.log(dealercodes);

    const dealers = dealercodes[0] as {
      CMS_Dealer?: boolean;
      CMS_Dealer_Code?: string;
      id: RecordId;
      name: string;
    }[];

    for (const d of dealers) {
      console.log("dealer:", d);

      const vehicles_for_this_dealer = vehicle_parsed.vehicles_parsed.filter(
        (i) => i.DealershipID == d.CMS_Dealer_Code,
      );

      console.log(
        `vehicles for dealer ${d.name}:`,
        vehicles_for_this_dealer.length,
      );
    }

    // match vehicles to dealers using codes

    // add/update vehicles for each dealer

    return vehicle_parsed;
  }),
  /////////
  lead_push: publicProcedure
    .input(
      z.object({
        cmsStockNo: z.string(),
        FirstName: z.string(), // add form info
        Surname: z.string(), // add form info
        Email: z.string(), // add form info
        CellPhone: z.string(),
        vehicleId: z.string(),
        teamId: z.string(),
        message: z.string(),
        // add form info
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await cmscloud_lead_push({
        cmsStockNo: input.cmsStockNo,
        FirstName: input.FirstName,
        Surname: input.Surname,
        Email: input.Email,
        CellPhone: input.CellPhone,
        vehicleId: input.vehicleId,
        teamId: input.teamId,
        message: input.message,
        // form info in here..
      });
      return result;
    }),
});
