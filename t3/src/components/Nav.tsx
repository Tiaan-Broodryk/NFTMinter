import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import Image from "next/image";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { signIn, useSession } from "next-auth/react";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Accommodation", href: "/accommodation", current: false },
  { name: "Rules", href: "/houserules/english", current: false },
  // { name: "About", href: "#", current: false },
  { name: "Admin", href: "/admin", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const session = useSession();
  return (
    <div>
      {" "}
      {/* <div>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div> */}
      <Disclosure as="nav" className="bg-black">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center  justify-center rounded-md p-2 text-neutral-400 hover:bg-neutral-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center  sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center ">
                <Image
                  alt="Your Company"
                  src="/Images/Logo3.png"
                  className="h-8 w-auto "
                  width={2000}
                  height={2000}
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {session.status === "authenticated" &&
                    session.data.user.email ===
                      "nadiaswanepoel36@gmail.com" && (
                      <>
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            aria-current={item.current ? "page" : undefined}
                            className={classNames(
                              item.current
                                ? "bg-neutral-900 text-white"
                                : "text-neutral-300 hover:bg-neutral-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium",
                            )}
                          >
                            {item.name}
                          </a>
                        ))}
                      </>
                    )}
                  {session.status === "authenticated" &&
                    session.data.user.email !==
                      "nadiaswanepoel36@gmail.com" && (
                      <>
                        {navigation
                          .filter((item) => item.name !== "Admin")
                          .map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              aria-current={item.current ? "page" : undefined}
                              className={classNames(
                                item.current
                                  ? "bg-neutral-900 text-white"
                                  : "text-neutral-300 hover:bg-neutral-700 hover:text-white",
                                "rounded-md px-3 py-2 text-sm font-medium",
                              )}
                            >
                              {item.name}
                            </a>
                          ))}
                      </>
                    )}

                  {session.status === "unauthenticated" && (
                    <>
                      {navigation
                        .filter((item) => item.name !== "Admin")
                        .map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            aria-current={item.current ? "page" : undefined}
                            className={classNames(
                              item.current
                                ? "bg-neutral-900 text-white"
                                : "text-neutral-300 hover:bg-neutral-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium",
                            )}
                          >
                            {item.name}
                          </a>
                        ))}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div>
              {session.status === "unauthenticated" && (
                <>
                  {" "}
                  <button
                    onClick={async () => {
                      await signIn();
                    }}
                    className="hidden rounded-md bg-neutral-700 p-2 text-white hover:bg-neutral-600  md:block"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {session.status === "authenticated" &&
              session.data.user.email === "nadiaswanepoel36@gmail.com" && (
                <>
                  {navigation.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-300 hover:bg-neutral-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium ",
                      )}
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </>
              )}
            {session.status === "authenticated" &&
              session.data.user.email !== "nadiaswanepoel36@gmail.com" && (
                <>
                  {navigation
                    .filter((item) => item.name !== "Admin")
                    .map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          item.current
                            ? "bg-neutral-900 text-white"
                            : "text-neutral-300 hover:bg-neutral-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium ",
                        )}
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                </>
              )}

            {session.status === "unauthenticated" && (
              <>
                {navigation
                  .filter((item) => item.name !== "Admin")
                  .map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-300 hover:bg-neutral-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium ",
                      )}
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
              </>
            )}

            {session.status === "unauthenticated" && (
              <>
                {" "}
                <button
                  onClick={async () => {
                    await signIn();
                  }}
                  className="block w-full rounded-md bg-neutral-900 px-3 py-2 text-base font-medium  text-white hover:bg-neutral-700 hover:text-white"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
