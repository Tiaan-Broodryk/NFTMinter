import { useSession } from "next-auth/react";

import { api, type RouterOutputs } from "~/utils/api";
import { useVisitCount } from "~/lib/visitors/useVisitCount";
import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";
import { db_getserversideprops } from "~/server/db_getserversideprops";
import { useRouter } from "next/router";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Nav from "~/components/Nav";
import Hero from "~/components/Hero";
import Listings from "~/components/Lisings";
import ListingTile from "~/components/ListingTile";
import ListingTile2 from "~/components/ListingTile2";
import Footer from "~/components/Footer";

type Listings = RouterOutputs["Listing"]["GetListings"];
export async function getServerSideProps(context: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
  query: {
    id: string;
  };
}) {
  const session = await getServerAuthSession(context);
  const dbconnected = await db_getserversideprops();
  const listings = await dbconnected.client.query(
    /* surrealql */ `SELECT * ,(SELECT * FROM listing_image WHERE listing_id = $parent.id)  as listing_images FROM Listing;`,
  );

  return {
    props: {
      data: {
        listings: listings[0] as Listings,
      },
    },
  };
}

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const session = useSession();
  const router = useRouter();
  const listings = props.data.listings;
  return (
    <>
      <Head>
        <title>Nadia&apos;s Accommodation</title>
        <meta name="og.description" content="Choose it Drive it" />
        <meta property="og:title" content="Auto Dex" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="https://www.autodex.co.za/_next/image?url=https%3A%2F%2Fapirs.netron.co.za%2Fuploads%2Fed687870450c444a98b5641cb99c19b8.png&w=640&q=75"
        />
        <meta
          property="og:image:secure_url"
          content="https://www.autodex.co.za/_next/image?url=https%3A%2F%2Fapirs.netron.co.za%2Fuploads%2Fed687870450c444a98b5641cb99c19b8.png&w=640&q=75"
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:alt" content="Image" />
      </Head>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KFWF2WS5"
          height="0"
          width="0"
          className="display:none;visibility:hidden hidden"
        ></iframe>
      </noscript>
      <div>
        {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
        <Nav />
        <Hero />
        <div className="bg-neutral-600 p-5">
          {" "}
          <div className="mx-auto mt-2 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
            {listings.map((listing) => (
              <>
                <ListingTile2
                  Description={listing.Description}
                  Title={listing.Title}
                  braai={listing.braai}
                  swimingPool={listing.swimmingPool}
                  wifi={listing.wifi}
                  price={listing.price}
                  bedrooms={listing.bedrooms}
                  bathrooms={listing.bathrooms}
                  parking={listing.parking}
                  people={listing.people}
                  id={listing.id.toString()}
                  Images={
                    listing.listing_images.map((image) => ({
                      image_url: image.image_url,
                      Order: image.Order,
                      id: image.id.toString(),
                      listing_id: image.listing_id.toString(),
                    })) ?? []
                  }
                />
              </>
            ))}
          </div>
        </div>
        <div className="relative  h-[300px] bg-black md:h-[580px]">
          <div className="z-10">
            {" "}
            <Image
              src={"/Images/Hero.jpg"}
              alt={""}
              height={4000}
              width={4000}
              className="absolute   block h-full w-full  object-cover opacity-50 "
            />
          </div>

          <div className="absolute grid w-full grid-cols-1 px-5 pt-24  md:px-0 md:pt-60">
            <div className="text-center text-2xl font-bold text-white  md:text-7xl">
              You have a place here
            </div>
            <div className="text-center font-bold text-white  md:text-xl">
              Book now and have your best vacation.
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
