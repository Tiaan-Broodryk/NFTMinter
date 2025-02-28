# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.



## SURREAL SCHEMA

```sql
DEFINE FIELD invoice_code ON invoice TYPE number DEFAULT ((SELECT invoice_code FROM invoice WHERE team = $parent.team ORDER BY invoice_code DESC LIMIT 1)[0].invoice_code OR 1000) + 1 PERMISSIONS FULL;

DEFINE FIELD cost_code ON vehicle_cost TYPE number DEFAULT ((SELECT cost_code FROM vehicle_cost WHERE team = $parent.team ORDER BY cost_code DESC LIMIT 1)[0].cost_code OR 1000) + 1 PERMISSIONS FULL;

DEFINE FIELD otp_code ON OfferToPurchase TYPE number DEFAULT ((SELECT otp_code FROM OfferToPurchase WHERE team = $parent.team ORDER BY otp_code DESC LIMIT 1)[0].otp_code OR 1000) + 1 PERMISSIONS FULL;

DEFINE FIELD stock_code ON vehicle TYPE number DEFAULT ((SELECT stock_code FROM vehicle WHERE team = $parent.team ORDER BY stock_code DESC LIMIT 1)[0].stock_code OR 1000) + 1 PERMISSIONS FULL;

DEFINE FIELD vehicle_id ON vehicle_image TYPE record<vehicle> PERMISSIONS FULL;
DEFINE INDEX veh_id_idx ON vehicle_image FIELDS vehicle_id;
```