import axios from "axios";
import { type NextApiRequest, type NextApiResponse } from "next";
import { type Stream } from "stream";
import { env } from "~/env";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Awaited<{ message: string }>>,
) {
  return new Promise((resolve, reject) => {
    if (req.method == "POST") {
      axios
        .post(`${env.NETRON_APIRS}/upload`, req, {
          responseType: "stream",
          headers: {
            "Content-Type": req.headers["content-type"],
          },
        })
        .then((ax) => {
          const stream = ax.data as Stream;
          stream.on("data", (filename: string) => {
            const finalfilename = filename.toString();
            console.log(filename);
            resolve(
              res
                .status(200)
                .json({
                  message: `${env.NETRON_APIRS}/uploads/${finalfilename}`,
                }),
            );
          });
        })
        .catch(reject);
    }
  });
}
