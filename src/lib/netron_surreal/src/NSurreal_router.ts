import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { init_storage, read_querytypes } from "./NSurreal_serverside";
import { writeFile } from "fs/promises";
export const nsurrealRouter = createTRPCRouter({
  init_storage: publicProcedure
    .input(z.object({ path: z.string() }))
    .mutation(async ({ input }) => {
      await init_storage(input.path);
    }),
  read_querytypes: publicProcedure
    .input(z.object({ path: z.string() }))
    .mutation(async ({ input }) => {
      return await read_querytypes(input.path);
    }),
  writeFile: publicProcedure
    .input(
      z.object({
        path: z.string(),
        data: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await writeFile(input.path, input.data);
    }),
});
