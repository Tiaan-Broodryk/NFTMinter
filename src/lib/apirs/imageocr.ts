import { z } from "zod";
import { env } from "~/env";

export async function imageocr(props: { imageurl: string }) {
  const result = (await fetch(`${env.NETRON_APIRS}/image/ocrs`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ imageurl: props.imageurl }),
  }).then((res) => res.json())) as unknown;

  const output = z
    .strictObject({
      line_texts: z
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
        .array(),
    })
    .parse(result);

  console.log(output);

  return output;
}
