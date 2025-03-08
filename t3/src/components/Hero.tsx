import Image from "next/image";

export default function Hero() {
  return (
    <>
      <div className="">
        <div className="relative  h-[300px] bg-black  md:h-[580px]">
          <Image
            src={"/Images/Hero.jpg"}
            alt={""}
            height={4000}
            width={4000}
            className="absolute  h-full w-full object-cover opacity-80 md:block dark:opacity-50"
          />
          <div className="grid w-full grid-cols-1 px-5 pt-24 md:absolute  md:px-0 md:pt-60">
            <div>
              <Image
                className="mx-auto  opacity-90 md:block"
                src="/Images/Logo1.png"
                alt=""
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </div>
        <div>
          {" "}
          <div className="relative isolate bg-neutral-600 pb-10">
            <div
              aria-hidden="true"
              className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
            >
              <div
                style={{
                  clipPath:
                    "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
                }}
                className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#f7f7f7] to-[#ebebed] opacity-30"
              />
            </div>
            <div className="overflow-hidden">
              <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
                <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                  <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                    <h1 className="text-pretty text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                      Redefining Getaways for the Modern Traveler
                    </h1>
                    <p className="mt-8 text-pretty text-lg font-medium text-neutral-200 sm:max-w-md sm:text-xl/8 lg:max-w-none">
                      We believe that everyone deserves a space meant solely for
                      them. Book yours with our diverse range of properties.
                    </p>
                  </div>
                  <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                    <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                      <div className="relative">
                        <Image
                          alt=""
                          src="/Images/alikreukel/living1.jpeg"
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                          width={1000}
                          height={1000}
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                      </div>
                    </div>
                    <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                      <div className="relative">
                        <Image
                          width={1000}
                          height={1000}
                          alt=""
                          src="/Images/inikol27/focus.jpeg"
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                      </div>
                      <div className="relative">
                        <Image
                          width={1000}
                          height={1000}
                          alt=""
                          src="/Images/mossel102/focus.jpeg"
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                      </div>
                    </div>
                    <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                      <div className="relative">
                        <Image
                          width={1000}
                          height={1000}
                          alt=""
                          src="/Images/alikreukel/focus.jpeg"
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                      </div>
                      <div className="relative">
                        <Image
                          width={1000}
                          height={1000}
                          alt=""
                          src="/Images/alikreukel/focus2.jpeg"
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 p-5 md:grid-cols-3 md:p-0">
              <div className="rounded-lg  bg-neutral-100 shadow-xl shadow-neutral-800">
                <div className="p-5 text-center text-2xl font-bold text-neutral-800">
                  Happy Clients
                </div>
                <div className="p-4 text-center text-neutral-500">
                  We help you get into your dream vacation rental with a wide
                  range to choose from.
                </div>
              </div>{" "}
              <div className="rounded-lg  bg-neutral-100 shadow-xl shadow-neutral-800">
                <div className="p-5 text-center text-2xl font-bold text-neutral-800">
                  A Space for work
                </div>
                <div className="p-4 text-center text-neutral-500">
                  All our units are equipped with free unlimited wi-fi.
                </div>
              </div>{" "}
              <div className="rounded-lg  bg-neutral-100 shadow-xl shadow-neutral-800">
                <div className="p-5 text-center text-2xl font-bold text-neutral-800">
                  Pleasant & Relaxing
                </div>
                <div className="p-4 text-center text-neutral-500">
                  Come and relax in our modern apartments designed to perfection
                  to give a relaxing atmosphere.
                </div>
              </div>
            </div>
          </div>
          <div className="mt-32 overflow-hidden pb-10 sm:mt-40">
            <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
                <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                  <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    Our Apartments
                  </h2>
                  <p className="mt-6 text-xl/8 text-gray-600">
                    All our apartments are designed to perfection to give a
                    relaxing atmosphere. We believe that everyone deserves a
                    space meant solely for them. Book yours with our diverse
                    range of properties.
                  </p>
                  <p className="mt-6 text-base/7 text-gray-600">
                    All our apartments have 2 bedrooms and 1 bathroom and
                    sleeper couch in the lounge. The kitchen is fully equipped
                    with a fridge, microwave, stove, and oven. The lounge has a
                    Smart TV with Netflix.
                  </p>
                </div>
                <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                  <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                    <Image
                      width={1000}
                      height={1000}
                      alt=""
                      src="/Images/alikreukel/bedroom1.jpeg"
                      className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                  <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                    <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                      <Image
                        width={1000}
                        height={1000}
                        alt=""
                        src="/Images/alikreukel/kitchen1.jpeg"
                        className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                      />
                    </div>
                    <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                      <Image
                        width={1000}
                        height={1000}
                        alt=""
                        src="/Images/inikol27/bedroom2.jpeg"
                        className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                      />
                    </div>
                    <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                      <Image
                        width={1000}
                        height={1000}
                        alt=""
                        src="/Images/mossel102/bathroom.jpeg"
                        className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
