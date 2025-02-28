import { type NextApiRequest, type NextApiResponse } from "next";

import client from "prom-client";
import { db } from "~/server/db";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const collectDefaultMetrics = client.collectDefaultMetrics;
  const Registry = client.Registry;
  const register = new Registry();
  collectDefaultMetrics({ register });

  let metrics = await register.metrics();
  res.setHeader("Content-type", register.contentType);

  const dbi = await db();

  const visit_req = await dbi.client.query(`count(SELECT 
	id, created_at
FROM visitor where created_at > time::now() - 24h)`);

  console.log(visit_req);
  const visit_count = visit_req[0] as number;

  metrics += `visitors_last_24h ${visit_count}\n`;

  res.send(metrics);
}
