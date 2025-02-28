import { type RecordId } from "surrealdb";
import { z } from "zod";

/** unwraps surreal response array to return a single typed result */
export function queryParse<T>(data: unknown, parser: z.ZodType<T>) {
  const res = z.array(
    z.object({
      result: z.array(parser),
    }),
  );
  const p = res.parse(data);

  const output = p[0]?.result[0];

  if (!output) return null;

  const out = parser.parse(output);
  return out;
}

export function RecordIdString(input: RecordId) {
  return `${input.tb}:${input.id as string}`;
}
