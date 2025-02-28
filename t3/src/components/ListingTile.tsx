import Image from "next/image";
import { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaSwimmingPool,
  FaWifi,
} from "react-icons/fa";
import { GiBarbecue } from "react-icons/gi";
import { IoBedOutline, IoPersonSharp } from "react-icons/io5";
import { PiBathtub } from "react-icons/pi";
import { RiCloseLargeLine } from "react-icons/ri";
import { TbParkingCircle } from "react-icons/tb";
import { Button, Label, Loading, Upload } from "~/atoms";
import { RouterInputs, api } from "~/utils/api";
import Sent from "./notifications/sent";
import { Gallery2 } from "./Gallery";
import { Switch } from "@headlessui/react";
import { list } from "postcss";
import { Gallery3 } from "./Gallery2";
import Saved from "./notifications/saved";

export default function ListingTile(props: {
  Description: string;
  Title: string;
  braai: boolean;
  swimingPool: boolean;
  wifi: boolean;
  price: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  people: number;
  id: string;
  Images: {
    src: string;
    Order: number;
    id: string;
    listing_id: string;
  }[];
}) {
  const [Open, setOpen] = useState({
    open: false,
  });
  const [form, setForm] = useState({
    Description: "",
    Title: "",
    braai: false,
    swimingPool: false,
    wifi: false,
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    id: "",
    people: 0,
    // Images: [{ src: "", Order: 0, id: "", listing_id: "" }],
  });
  const images = api.Listing.get_listing_images.useQuery({
    listing_id: props.id,
  });
  const imageData = images.data ?? [];

  if (form.id !== props.id) {
    setForm(props);
  }
  const [photos, setPhotos] = useState([
    { id: "", src: "", order: 0, vehicle_id: "" },
  ]);

  const update_images = api.Listing.update_images.useMutation();
  const image_delete = api.Listing.image_delete.useMutation();

  const addImage = api.Listing.Listing_images.useMutation();

  const UpdateListing = api.Listing.update.useMutation();
  return (
    <>
      <div>
        {UpdateListing.isSuccess && (
          <>
            <Saved />
          </>
        )}
        {Open.open === true && (
          <>
            <div className="relative z-50">
              <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />
              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                  <div className="relative transform   rounded-2xl bg-white p-2 text-left transition-all  data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-7xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 md:px-4  md:pb-4 md:pt-5 ">
                    <div className=" text-right">
                      <button
                        onClick={() =>
                          setOpen({
                            ...Open,
                            open: false,
                          })
                        }
                        className="rounded-full bg-red-500 p-2 text-xl  text-white hover:bg-red-600"
                      >
                        <RiCloseLargeLine />
                      </button>
                    </div>
                    {/* <pre>{JSON.stringify(imageData, null, 2)}</pre> */}

                    <div className="mt-2 rounded-md p-2">
                      <Label title="Name">
                        <input
                          value={form.Title}
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
                        {imageData.length !== 0 && (
                          <>
                            <Gallery3
                              images={imageData.map((img) => ({
                                image_url: img.image_url,
                                Order: img.Order,
                                id: img.id.toString(),
                                listing_id: img.listing_id.toString(),
                              }))}
                              onReorder={async (updated) => {
                                console.log(updated);
                                // setPhotos(updated);
                                await update_images.mutateAsync({
                                  images: updated.map((img) => ({
                                    id: img.id.toString(),
                                    Order: img.Order,
                                  })),
                                });
                                await images.refetch();
                              }}
                              onDelete={async (img) => {
                                await image_delete.mutateAsync({
                                  image_id: img.id.toString(),
                                });
                                setPhotos(
                                  photos?.filter(
                                    (i) => i.id !== img.id.toString(),
                                  ) ?? [],
                                );
                                await images.refetch();
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

                          const res = await addImage.mutateAsync({
                            image_url: data.map((d) => d.url),

                            listing_id: props.id.toString() ?? "",
                          });
                          await images.refetch();
                        }}
                        multiple
                      />
                    </div>
                    <div className="mt-2 rounded-md  p-2">
                      <Label title="Description">
                        <textarea
                          value={form.Description}
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
                          value={form.price}
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
                              value={form.bedrooms}
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
                              value={form.bathrooms}
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
                              value={form.parking}
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
                              value={form.people}
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
                          UpdateListing.mutate(form);

                          setOpen({
                            ...Open,
                            open: false,
                          });
                        }}
                        className=" w-full rounded-sm bg-blue-600  p-1 px-4 font-bold text-white hover:bg-blue-500 hover:shadow-lg  md:ml-2  md:w-fit"
                      >
                        Update Listing
                        {UpdateListing.isPending && (
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
        <button
          onClick={() =>
            setOpen({
              ...Open,
              open: true,
            })
          }
          className="rounded-2xl bg-white p-2 shadow-md hover:shadow-md hover:shadow-white"
        >
          <div className="h-[300px] overflow-hidden rounded-2xl ">
            {" "}
            <Image
              src={
                props.Images.filter((image) => image.Order === 1)[0]?.src ?? ""
              }
              alt={
                props.Images.filter((image) => image.Order === 1)[0]?.src ?? ""
              }
              height={1000}
              width={1000}
              className=" h-[300px] rounded-2xl object-cover"
            />
          </div>
          <div className="overflow-hidden pt-2">
            <div className=" flex w-full gap-1  text-black">
              <div className="font-bold "> {props.Title}, Hartenbos</div>
            </div>

            <div className="mt-2 flex gap-1">
              {" "}
              <div className=" text-lg font-bold tracking-widest">
                R{props.price} ZAR
              </div>{" "}
              <div className="mt-0.5 font-thin ">night</div>
            </div>
          </div>
        </button>
      </div>
    </>
  );
}
