import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { systemRouter } from "./routers/system";


import { clientsRouter } from "./routers/client";
import { apirs } from "./routers/apirs";


import { nsurrealRouter } from "~/lib/netron_surreal/src/NSurreal_router";


import { signUpRouter } from "./routers/signup";
import { payfast_router } from "~/lib/payfast/payfast_router";

import { visitRoute } from "~/lib/visitors/visitRouter";
import { cmscloud_router } from "~/lib/cmscloud/cmscloud_fetch";

import { MiscInvoiceRouter } from "./routers/miscInvoice";
import { listingRouter } from "./routers/listings";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  system: systemRouter,

  client: clientsRouter,

  apirs,
  nsurreal: nsurrealRouter,

  signup: signUpRouter,
  lib: createTRPCRouter({
    payfast: payfast_router,
  }),

  visit: visitRoute,
  cmscloud: cmscloud_router,
  Listing: listingRouter,
  MiscInvoiceRouter: MiscInvoiceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
