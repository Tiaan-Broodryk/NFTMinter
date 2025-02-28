import { type NextApiRequest, type NextApiResponse } from "next";

import { db } from "~/server/db";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const dbi = await db();

  const visit_req = await dbi.client.query(`SELECT 
	count() AS Name, 
	lat as Latitude, 
	lon as Longitude 
FROM visitor 
GROUP BY Latitude, Longitude;`);

  res.json(visit_req[0]);
}
