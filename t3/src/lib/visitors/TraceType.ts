import z from "zod";

export const TraceTypeZod = z.object({
    fl: z.string(),
    h: z.string(),
    ip: z.string(),
    ts: z.string(),
    visit_scheme: z.string(),
    uag: z.string(),
    colo: z.string(),
    sliver: z.string(),
    http: z.string(),
    loc: z.string(),
    tls: z.string(),
    sni: z.string(),
    warp: z.string(),
    gateway: z.string(),
    rbi: z.string(),
    kex: z.string(),
}
)
