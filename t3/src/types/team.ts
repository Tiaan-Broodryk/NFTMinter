import { z } from "zod";

export const team_zod = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    // deleted_at: z.date().optional(),
    owner: z.string(),
    members: z.array(z.string()).optional(),
    projects: z.array(z.string()).optional(),
});