import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { getCsrfToken } from "next-auth/react";
import { Input, Label } from "~/atoms";

import Image from "next/image";

export default function SignIn({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <div className="relative flex h-screen  w-screen bg-neutral-800 text-neutral-200 ">
        <div className="absolute grid  h-full w-full  items-center justify-center p-2 text-white">
          <div className="z-50 mx-auto grid grid-cols-1 rounded-md bg-neutral-600  p-4 shadow-2xl shadow-neutral-500 md:max-w-xl">
            <div>
              <Image
                src={"/Images/Logo3.png"}
                alt={""}
                width={2000 * 4}
                height={2000 * 4}
                className=" mx-auto mb-5 w-2/3"
              />
            </div>
            <form
              method="post"
              action="/api/auth/signin/email"
              className="grid grid-cols-1"
            >
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <div>Email Address</div>
              <Input
                type="email"
                id="email"
                name="email"
                className="white w-full"
              />

              <button
                className="mt-5 rounded-md bg-indigo-600 p-3 px-4 font-bold text-white  hover:bg-indigo-500  hover:shadow-lg"
                type="submit"
              >
                Sign in with Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();

  return {
    props: { providers: providers ?? [], csrfToken },
  };
}
