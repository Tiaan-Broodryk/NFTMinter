
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

import { apirs } from "./routers/apirs";

import { listingRouter } from "./routers/listings";


export const appRouter = createTRPCRouter({


  apirs,

  Listing: listingRouter,

});


export type AppRouter = typeof appRouter;


export const createCaller = createCallerFactory(appRouter);
