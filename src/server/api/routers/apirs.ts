import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

import { env } from "~/env";

async function imageocr(props: { imageurl: string }) {
  const result = (await fetch(`${env.NETRON_APIRS}/image/ocrs`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ imageurl: props.imageurl }),
  }).then((res) => res.json())) as {
    line_texts: {
      words: string;
      chars: {
        char: string;
        top_left_x: number;
        top_left_y: number;
        bottom_right_x: number;
        bottom_right_y: number;
      }[];
    }[];
  };

  const output = z
    .strictObject({
      words: z.string(),
      chars: z
        .strictObject({
          char: z.string(),
          top_left_x: z.number(),
          top_left_y: z.number(),
          bottom_right_x: z.number(),
          bottom_right_y: z.number(),
        })
        .array(),
    })
    .array()
    .parse(result.line_texts.filter((i) => i !== null));

  return output;
}

export const apirs = createTRPCRouter({
  imageocr: protectedProcedure
    .input(z.object({ imageurl: z.string() }))
    .mutation(async ({ input }) => {
      const result = await imageocr({ imageurl: input.imageurl });
      return result;
    }),
});
