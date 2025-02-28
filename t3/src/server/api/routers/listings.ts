import { z } from "zod";
import { GetVehicleImages } from "~/generated/querytypes/GetVehicleImages";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { Resend } from "resend";
import { env } from "~/env";
import { render } from "~/lib/reactmail/render";
import { EmailLead } from "~/emails/lead";
import { GetListingImages } from "~/generated/querytypes/GetListingImages";

export const listingRouter = createTRPCRouter({

    create: protectedProcedure
        .input(
            z.object({
                Description: z.string(),
                Title: z.string(),
                braai: z.boolean(),
                swimingPool: z.boolean(),
                wifi: z.boolean(),
                price: z.number(),
                bedrooms: z.number(),
                bathrooms: z.number(),
                parking: z.number(),
                people: z.number(),
                Images: z.array(z.object({ src: z.string(), order: z.number(), id: z.coerce.string() })),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const today = new Date();
            const listing = await ctx.db.query(
          /* surrealql */ `CREATE Listing SET braai = ${input.braai} ,swimmingPool = ${input.swimingPool} , wifi = ${input.wifi} , Title = "${input.Title}",Description = "${input.Description}",price = ${input.price},bedrooms = ${input.bedrooms},bathrooms = ${input.bathrooms},parking = ${input.parking},people = ${input.people};`,
                "ListingCreate",
                { skip_write: false }
            );
            const listings = listing[0];

            for (const Image of input.Images.filter((i) => i.src !== "")) {
                const extras = await ctx.db.client
                    .query(/* surrealql */ `CREATE listing_image SET
                     Order = ${Image.order},
                     image_url = "${Image.src}",

                     listing_id = ${listings[0]?.id.toString()};

                     `);
                console.log("created extras", extras);
            }
            return listing;
        }),
    update: protectedProcedure
        .input(
            z.object({
                Description: z.string(),
                Title: z.string(),
                braai: z.boolean(),
                swimingPool: z.boolean(),
                wifi: z.boolean(),
                price: z.number(),
                bedrooms: z.number(),
                bathrooms: z.number(),
                parking: z.number(),
                id: z.string(),
                people: z.number(),

            }),
        )
        .mutation(async ({ input, ctx }) => {
            const today = new Date();
            const listing = await ctx.db.query(
          /* surrealql */ `UPDATE ${input.id} SET braai = ${input.braai} ,swimmingPool = ${input.swimingPool} , wifi = ${input.wifi} , Title = "${input.Title}",Description = "${input.Description}",price = ${input.price},bedrooms = ${input.bedrooms},bathrooms = ${input.bathrooms},parking = ${input.parking},people = ${input.people};`,
                "ListingCreate",
                { skip_write: true }
            );
            const listings = listing[0];

            // for (const Image of input.Images.filter((i) => i.src !== "")) {
            //     if (Image.id.includes("listing_image")) {
            //         const UpdateImages = await ctx.db.client
            //             .query(/* surrealql */ `UPDATE ${Image.id} SET order = ${Image.Order};`);

            //     } else {
            //         const CreateImages = await ctx.db.client
            //             .query(/* surrealql */ `CREATE listing_image SET
            //      Order = ${Image.Order},
            //      image_url = "${Image.src}",

            //      listing_id = ${listings[0]?.id.toString()};

            //      `);
            //     }

            // }
            return listing;
        }),


    get_listing_images: publicProcedure
        .input(
            z.object({
                listing_id: z.string(),
            }),
        )
        .query(async ({ input, ctx }) => {
            const result = await ctx.db.query(
      /* surrealql */ `SELECT * FROM listing_image WHERE listing_id = ${input.listing_id}`,
                "GetListingImages",
                { skip_write: true }
            );
            const images = result[0];
            return images;
        }),

    update_images: protectedProcedure
        .input(
            z.object({
                images: z
                    .object({
                        id: z.string().startsWith("listing_image:"),
                        Order: z.number(),
                    })
                    .array(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            for (const image of input.images) {
                await ctx.db.query(
              /* surrealql */ `UPDATE ${image.id} SET Order = ${image.Order};`,
                    "UpdateImages",
                );
            }
            return true;
        }),
    ////////////////////////
    image_delete: protectedProcedure
        .input(z.object({ image_id: z.string().startsWith("listing_image:") }))
        .mutation(async ({ ctx, input }) => {
            // if (ctx.session.user.superadmin !== true) {
            //     throw new Error("You are not authorized to delete images");
            // }
            const image = await ctx.db.query(
            /* surrealql */ `delete ${input.image_id}`,
                "DeleteImages",
            );
            return true;
        }),
    Listing_images: protectedProcedure
        .input(
            z.object({
                listing_id: z.string(),
                image_url: z.string().array(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const db = ctx.db.client;
            const images_req = await db.query(
                `select * from listing_image where listing_id = ${input.listing_id};`,
            );
            const images = images_req[0] as { order: number }[];
            const highestorder =
                images
                    .map((i) => i.order)
                    .sort()
                    .reverse()
                    .at(0) ?? 0;

            let order = highestorder + 1;
            const newimages: GetListingImages[] = [];
            for (const image_url of input.image_url) {
                const addListingImage = (await ctx.db.client.query(
              /* surrealql */ `CREATE listing_image SET listing_id = ${input.listing_id}, image_url = "${image_url}",Order = ${order};`,
                )) as unknown as [GetListingImages];
                newimages.push(addListingImage[0]);
                order++;
            }

            return newimages;
        }),

    GetListings: publicProcedure
        .query(async ({ ctx }) => {
            const listings = await ctx.db.query(
                /* surrealql */ `SELECT * ,(SELECT * FROM listing_image WHERE listing_id = $parent.id)  as listing_images FROM Listing;`,
                "Listings",

                { skip_write: false }
            );
            const Listings = listings[0];
            return Listings;
        }),


    Create_Listing_Lead: publicProcedure
        .input(
            z.object({
                listing_id: z.string(),
                name: z.string().optional(),
                email: z.string().optional(),
                phone: z.string().optional(),
                message: z.string().optional(),

            }),
        )
        .mutation(async ({ ctx, input }) => {
            const today = new Date();
            const lead = await ctx.db.client.query(
            /* surrealql */ `CREATE listing_lead SET listing = ${input.listing_id} ,read = false , name = "${input.name}" , email = "${input.email}", phone = "${input.phone}", message = "${input.message}", lead_date = d"${today.toISOString()}";`,
            );



            const listing = await ctx.db.query(
            /* surrealql */ `SELECT * FROM ${input.listing_id} `,
                "GetListingMarketEmail",
                {
                    skip_write: true,
                },
            );
            const listingData = listing[0];


            const resend = new Resend();

            await resend.emails.send({
                from: env.RESEND_FROM,
                to: "tiaanbroodryk44@gmail.com",
                subject: `New Lead on ${listingData[0]?.Title ?? ""}`,
                text: render(
                    EmailLead({
                        Receiver_name: "Nadia",
                        Lead_Listing: `${listingData[0]?.Title ?? ""}`,
                        Lead_name: input.name ?? "",
                        Lead_email: input.email ?? "",
                        Lead_contact_number: input.phone ?? "",
                        Lead_message: input.message ?? "",
                    }),
                    {
                        plainText: true,
                    },
                ),
                html: render(
                    EmailLead({
                        Receiver_name: "Nadia",
                        Lead_Listing: `${listingData[0]?.Title ?? ""}`,
                        Lead_name: input.name ?? "",
                        Lead_email: input.email ?? "",
                        Lead_contact_number: input.phone ?? "",
                        Lead_message: input.message ?? "",
                    }),
                    {},
                ),
            });





            return lead;
        }),
})