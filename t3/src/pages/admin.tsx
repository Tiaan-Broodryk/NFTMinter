import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { Input, Label, Loading, Upload } from "~/atoms";
import { Gallery2 } from "~/components/Gallery";
import Nav from "~/components/Nav";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtub } from "react-icons/pi";
import { TbParkingCircle } from "react-icons/tb";
import { GiBarbecue } from "react-icons/gi";
import { IoPersonSharp } from "react-icons/io5";
import { Switch } from "@headlessui/react";
import { FaSwimmingPool } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { api, RouterInputs } from "~/utils/api";
import Saved from "~/components/notifications/saved";
import PublishedNotify from "~/components/notifications/published";
import ListingTile from "~/components/ListingTile";
import MiscInvoice from "~/components/Invoicing";
import Clients from "~/components/clients";
export default function Admin() {
  const [createOpen, setCreateOpen] = useState({
    open: false,
  });
  const [form, setForm] = useState<RouterInputs["Listing"]["create"]>({
    Description: "",
    Title: "",
    braai: false,
    swimingPool: false,
    wifi: false,
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    people: 0,
    Images: [{ src: "", order: 0, id: "" }],
  });

  const CreateListing = api.Listing.create.useMutation();
  const Listings = api.Listing.GetListings.useQuery();
  return (
    <div className="min-h-screen bg-neutral-200">
      <Nav />
      {CreateListing.isSuccess && (
        <>
          <PublishedNotify />
        </>
      )}
      {createOpen.open === true && (
        <>
          <div className="relative z-50">
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                <div className="relative transform   rounded-sm bg-white p-2 text-left transition-all  data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-7xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 md:px-4  md:pb-4 md:pt-5 ">
                  <div className=" text-right">
                    <button
                      onClick={() =>
                        setCreateOpen({
                          ...createOpen,
                          open: false,
                        })
                      }
                      className="rounded bg-red-500 p-1 text-white hover:bg-red-600"
                    >
                      <RiCloseLargeLine />
                    </button>
                  </div>
                  {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
                  <div className="grid grid-cols-1 gap-2 border-b-2 border-blue-500 p-2 text-xl font-bold text-black md:grid-cols-2 ">
                    <div className="flex gap-2">
                      <div>Add a Listing</div>
                    </div>
                  </div>
                  <div className="mt-2 rounded-md p-2">
                    <Label title="Name">
                      <input
                        onChange={(e) => {
                          setForm({
                            ...form,
                            Title: e.target.value,
                          });
                        }}
                        className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                      />
                    </Label>
                  </div>

                  <div className="mb-2 mt-2 rounded-md bg-neutral-200 p-4">
                    <div className=" font-semibold text-gray-900">
                      Listing Images
                    </div>
                    <div>
                      {form.Images.length !== 0 && (
                        <>
                          <Gallery2
                            images={
                              form.Images.filter((image) => image.src !== "") ??
                              []
                            }
                            onReorder={async (updated) => {
                              console.log(updated);
                              // setPhotos(updated);

                              const res = updated.map((img) => ({
                                src: img.src, // Assuming d.url is in scope (from an outer context)
                                id: img.id.toString(),
                                order: img.order,
                              }));
                              setForm((prevForm) => ({
                                ...prevForm,
                                Images: [...res], // Correctly update the Images array
                              }));
                            }}
                            onDelete={async (img) => {
                              setForm((prevForm) => ({
                                ...prevForm,
                                Images: prevForm.Images.filter(
                                  (i) => i.id !== img.id.toString(),
                                ),
                              }));
                            }}
                          />
                        </>
                      )}
                    </div>
                    <Upload
                      onUpload={async (data) => {
                        console.log("uploaded");
                        console.log(data);
                        const first = data[0];

                        if (!first) return;

                        console.log(first);

                        const res = data.map((d) => {
                          setForm({
                            ...form,
                            Images: [
                              ...form.Images,
                              {
                                src: d.url,
                                order:
                                  form.Images.filter((e) => e.src !== "")
                                    .length + 1,
                                id: crypto.randomUUID(),
                              },
                            ],
                          });
                        });
                      }}
                      multiple
                    />
                  </div>
                  <div className="mt-2 rounded-md  p-2">
                    <Label title="Description">
                      <textarea
                        onChange={(e) => {
                          setForm({
                            ...form,
                            Description: e.target.value,
                          });
                        }}
                        className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                      />
                    </Label>
                  </div>
                  <div className="mt-2 rounded-md p-2">
                    <Label title="Price">
                      <input
                        onChange={(e) => {
                          setForm({
                            ...form,
                            price: parseFloat(e.target.value),
                          });
                        }}
                        className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                      />
                    </Label>
                  </div>
                  <div className="mt-2 rounded-md bg-neutral-200 p-2">
                    <div className="font-bold">Listing Specs</div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                      <div className="flex">
                        <div className="w-full">
                          <input
                            onChange={(e) => {
                              setForm({
                                ...form,
                                bedrooms: parseFloat(e.target.value),
                              });
                            }}
                            type="number"
                            className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                          />
                        </div>
                        <div className="ml-1 rounded-full bg-white p-1 text-2xl">
                          <IoBedOutline />
                        </div>
                      </div>

                      <div className="flex">
                        <div className="w-full">
                          <input
                            onChange={(e) => {
                              setForm({
                                ...form,
                                bathrooms: parseFloat(e.target.value),
                              });
                            }}
                            type="number"
                            className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                          />
                        </div>
                        <div className="ml-1 rounded-full bg-white p-1 text-2xl">
                          <PiBathtub />
                        </div>
                      </div>

                      <div className="flex">
                        <div className="w-full">
                          <input
                            onChange={(e) => {
                              setForm({
                                ...form,
                                parking: parseFloat(e.target.value),
                              });
                            }}
                            type="number"
                            className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                          />
                        </div>
                        <div className="ml-1 rounded-full bg-white p-1 text-2xl">
                          <TbParkingCircle />
                        </div>
                      </div>

                      <div className="flex w-full">
                        <div className="w-full">
                          <input
                            onChange={(e) => {
                              setForm({
                                ...form,
                                people: parseFloat(e.target.value),
                              });
                            }}
                            type="number"
                            className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                          />
                        </div>
                        <div className="ml-1 rounded-full bg-white p-1 text-2xl">
                          <IoPersonSharp />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-center font-bold">
                      Listing Features
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {" "}
                      <div className="flex gap-2 rounded-full border-2 p-1 md:border-none">
                        <div className="pt-1">
                          <Switch
                            checked={form.braai}
                            onChange={() =>
                              setForm({
                                ...form,
                                braai: !form.braai,
                              })
                            }
                            className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-100 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 data-[checked]:bg-blue-600"
                          >
                            <span className="sr-only">Use setting</span>
                            <span className="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in group-data-[checked]:opacity-0 group-data-[checked]:duration-100 group-data-[checked]:ease-out"
                              >
                                <svg
                                  fill="none"
                                  viewBox="0 0 12 12"
                                  className="h-3 w-3 text-gray-400"
                                >
                                  <path
                                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-data-[checked]:opacity-100 group-data-[checked]:duration-200 group-data-[checked]:ease-in"
                              >
                                <svg
                                  fill="currentColor"
                                  viewBox="0 0 12 12"
                                  className="h-3 w-3 text-blue-600"
                                >
                                  <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                </svg>
                              </span>
                            </span>
                          </Switch>
                        </div>
                        <div className="ml-1 rounded-full bg-white p-1 text-2xl">
                          <FaSwimmingPool />
                        </div>
                      </div>
                      <div className="flex gap-2 rounded-full border-2 p-1 md:border-none">
                        <div className="pt-1">
                          <Switch
                            checked={form.swimingPool}
                            onChange={() =>
                              setForm({
                                ...form,
                                swimingPool: !form.swimingPool,
                              })
                            }
                            className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-100 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 data-[checked]:bg-blue-600"
                          >
                            <span className="sr-only">Use setting</span>
                            <span className="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in group-data-[checked]:opacity-0 group-data-[checked]:duration-100 group-data-[checked]:ease-out"
                              >
                                <svg
                                  fill="none"
                                  viewBox="0 0 12 12"
                                  className="h-3 w-3 text-gray-400"
                                >
                                  <path
                                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-data-[checked]:opacity-100 group-data-[checked]:duration-200 group-data-[checked]:ease-in"
                              >
                                <svg
                                  fill="currentColor"
                                  viewBox="0 0 12 12"
                                  className="h-3 w-3 text-blue-600"
                                >
                                  <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                </svg>
                              </span>
                            </span>
                          </Switch>
                        </div>
                        <div className="ml-1 rounded-full bg-white p-1 text-2xl">
                          <GiBarbecue />
                        </div>
                      </div>
                      <div className="flex gap-2 rounded-full border-2 p-1 md:border-none">
                        <div className="pt-1">
                          <Switch
                            checked={form.wifi}
                            onChange={() =>
                              setForm({
                                ...form,
                                wifi: !form.wifi,
                              })
                            }
                            className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-100 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 data-[checked]:bg-blue-600"
                          >
                            <span className="sr-only">Use setting</span>
                            <span className="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in group-data-[checked]:opacity-0 group-data-[checked]:duration-100 group-data-[checked]:ease-out"
                              >
                                <svg
                                  fill="none"
                                  viewBox="0 0 12 12"
                                  className="h-3 w-3 text-gray-400"
                                >
                                  <path
                                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-data-[checked]:opacity-100 group-data-[checked]:duration-200 group-data-[checked]:ease-in"
                              >
                                <svg
                                  fill="currentColor"
                                  viewBox="0 0 12 12"
                                  className="h-3 w-3 text-blue-600"
                                >
                                  <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                </svg>
                              </span>
                            </span>
                          </Switch>
                        </div>
                        <div className="ml-1 rounded-full bg-white p-1 text-2xl">
                          <FaWifi />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" bottom-0 mt-5  w-full p-2 md:text-right">
                    <button
                      onClick={async () => {
                        CreateListing.mutate(form);

                        setCreateOpen({
                          ...createOpen,
                          open: false,
                        });
                      }}
                      className=" w-full rounded-sm bg-blue-600  p-1 px-4 font-bold text-white hover:bg-blue-500 hover:shadow-lg  md:ml-2  md:w-fit"
                    >
                      Publish Listing
                      {CreateListing.isPending && (
                        <Loading className="text-white" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="mx-auto mt-10 max-w-6xl p-2">
        <div className=" grid grid-cols-2 rounded-md bg-white p-2">
          <div className="p-2 font-bold">Listings</div>
          <div className="text-right">
            <button
              className="rounded-md bg-blue-500 p-2 font-bold text-white hover:bg-blue-600"
              onClick={() =>
                setCreateOpen({
                  ...createOpen,
                  open: true,
                })
              }
            >
              Add a Listing
            </button>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-4">
          {Listings.data?.map((listing) => (
            <>
              <ListingTile
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
                    src: image.image_url,
                    Order: image.Order,
                    id: image.id.toString(),
                    listing_id: image.listing_id.toString(),
                  })) ?? []
                }
              />
            </>
          ))}
        </div>
        <div className="mt-5">
          <Clients />
        </div>
        <div className="mt-5">
          {" "}
          <MiscInvoice />
        </div>
      </div>
      {/* <pre>{JSON.stringify(Listings, null, 2)}</pre> */}
    </div>
  );
}
