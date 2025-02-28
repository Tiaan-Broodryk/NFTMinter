import { RecordId, type RecordIdValue } from "surrealdb";
import { z } from "zod";

export function string_to_record_id(input: string): RecordId {
  const rid = new RecordId(input.split(":")[0]!, input.split(":")[1]!);
  return rid;
}


export const RecordIdZod = z
  .object({
    tb: z.string(),
    id: z.unknown(),
  })
  .refine((x) => x.tb.length > 0, { message: "Table name cannot be empty" })
  .transform((x) => new RecordId(x.tb, x.id as RecordIdValue));