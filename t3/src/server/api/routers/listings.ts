import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";


export const listingRouter = createTRPCRouter({










    getAllListings: publicProcedure
        .query(async ({ ctx }) => {
            const listingsQuery = await ctx.db.query(
                /* surrealql */ `
                SELECT * FROM nft_listing;
                `, "GetAllListings",
                { skip_write: true }
            );
            const listings = listingsQuery[0];
            return listings;
        }),




    createNFTListing: publicProcedure
        .input(
            z.object({
                title: z.string(),
                description: z.string(),
                imageUrl: z.string(),
                price: z.number().optional(),
                mintAddress: z.string().optional(),
                creator: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const listing = await ctx.db.query(
                /* surrealql */ `
                CREATE nft_listing SET 
                    title = "${input.title}",
                    description = "${input.description}",
                    image_url = "${input.imageUrl}",
                    price = ${input.price},
                    mint_address = "${input.mintAddress}",
                    creator = "${input.creator}",
                    created_at = time::now(),
                    listed = true;
                `, "CreateNftListing",
                { skip_write: true }


            );

            return listing[0];
        }),
})