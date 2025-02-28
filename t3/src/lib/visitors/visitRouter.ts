import { z } from "zod";
import { env } from "~/env";
import { publicProcedure } from "~/server/api/trpc";

import geoip from "fast-geoip";
import { TraceTypeZod } from "./TraceType";
import { db } from "~/server/db";
import { RecordId } from "surrealdb";

function RecordIdFromString(str: string): RecordId {
  const [table, id] = str.split(":");
  return new RecordId(table!, id!);
}

export const visitRoute = publicProcedure
  .input(
    z.object({
      trace: TraceTypeZod,
      query: z.unknown().optional(),
      pathname: z.string().optional(),
    }),
  )
  .query(async ({ ctx, input }) => {
    // dont record dev traffic
    if (env.NODE_ENV === "development") return true;

    const dbi = await db();

    // {
    //     range: [ <low bound of IP block>, <high bound of IP block> ],
    //     country: 'XX',                 // 2 letter ISO-3166-1 country code
    //     region: 'RR',                  // Up to 3 alphanumeric variable length characters as ISO 3166-2 code
    //                                    // For US states this is the 2 letter state
    //                                    // For the United Kingdom this could be ENG as a country like “England
    //                                    // FIPS 10-4 subcountry code
    //     eu: '0',                       // 1 if the country is a member state of the European Union, 0 otherwise.
    //     timezone: 'Country/Zone',      // Timezone from IANA Time Zone Database
    //     city: "City Name",             // This is the full city name
    //     ll: [<latitude>, <longitude>], // The latitude and longitude of the city
    //     metro: <metro code>,           // Metro code
    //     area: <accuracy_radius>        // The approximate accuracy radius (km), around the latitude and longitude
    //  }

    const geo = await geoip.lookup(input.trace.ip);
    {
      ctx?.session?.user.id.toString() !== "user:1sr23anoqz8o6nwdsc83" &&
        (await dbi.client.create("visitor", {
          created_at: new Date(),
          user: ctx?.session?.user.id
            ? RecordIdFromString(ctx.session.user.id)
            : null,
          session: ctx.session,
          trace: input.trace,
          geo,
          lat: geo?.ll[0],
          lon: geo?.ll[1],
          query: input.query,
          pathname: input.pathname,
        }));
    }

    return true;
  });
