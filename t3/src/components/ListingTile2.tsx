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
import { Button, Input, Label, TextArea } from "~/atoms";
import { api, RouterInputs } from "~/utils/api";
import Sent from "./notifications/sent";

export default function ListingTile2(props: {
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
    image_url: string;
    Order: number;
    id: string;
    listing_id: string;
  }[];
}) {
  const [Open, setOpen] = useState({
    open: false,
  });
  const imageData = props.Images;
  const [currentImage, setCurrentImage] = useState({
    src: "",
    order: 0,
  });
  if (currentImage.src === "" && imageData.length > 0) {
    setCurrentImage({
      ...currentImage,
      src: imageData[0]?.image_url ?? "",
    });
  }
  const goToPrevios = () => {
    const isFirstSlide = currentImage.order === 0;
    const newIndex = isFirstSlide
      ? imageData.length - 1
      : currentImage.order - 1;
    setCurrentImage({
      ...currentImage,
      src: imageData[newIndex]?.image_url ?? "",
      order: newIndex,
    });
  };
  const goToNext = () => {
    const isLastSlide = currentImage.order === imageData.length - 1;
    const newIndex = isLastSlide ? 0 : currentImage.order + 1;
    setCurrentImage({
      ...currentImage,
      src: imageData[newIndex]?.image_url ?? "",
      order: newIndex,
    });
  };

  const [lead, setLead] = useState<
    RouterInputs["Listing"]["Create_Listing_Lead"]
  >({
    listing_id: props.id,
    name: "",
    email: "",
    phone: "",
    message: "Hi I want to book this listing...",
  });
  const createLead = api.Listing.Create_Listing_Lead.useMutation();

  const [leadIncomplete, setLeadIncomplete] = useState({ incomplete: false });
  return (
    <>
      <div>
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
                    {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
                    <div className="grid grid-cols-1 gap-2 border-b-2 border-neutral-500 p-2 text-xl font-bold text-black md:grid-cols-2 ">
                      <div className="flex gap-2">
                        <div>{props.Title},Hartenbos</div>
                      </div>
                    </div>
                    <div className="pl-5 pr-5 pt-5">
                      <div className="grid grid-cols-1 gap-2 overflow-hidden rounded-sm bg-white p-2 xl:grid-cols-3 ">
                        <div className="md:col-span-2 ">
                          <div className="group relative flex h-64  w-full overflow-hidden rounded-2xl sm:h-96 md:h-[400px] lg:h-[500px] xl:rounded-l-2xl ">
                            {currentImage.src && (
                              <>
                                <button className=" h-full w-full  object-cover">
                                  {" "}
                                  <Image
                                    height={4000 * 4}
                                    width={4000 * 4}
                                    alt="vehicle"
                                    src={currentImage.src}
                                    className=" h-full w-full  object-cover "
                                  />
                                </button>
                              </>
                            )}
                            <Button
                              onClick={goToPrevios}
                              className="absolute bottom-1/2 left-0 m-1 size-7 rounded-full border bg-neutral-800/60 text-white transition hover:text-gray-300 group-hover:opacity-100 md:opacity-0"
                            >
                              <FaArrowLeft />
                            </Button>
                            <Button
                              className="absolute bottom-1/2 right-0 m-1 size-7 rounded-full border bg-neutral-800/60 text-white transition hover:text-gray-300 group-hover:opacity-100 md:opacity-0"
                              onClick={goToNext}
                            >
                              <FaArrowRight />
                            </Button>
                          </div>
                        </div>
                        <div className="grid  grid-cols-6 flex-wrap gap-2 overflow-hidden rounded-2xl xl:grid-cols-2   xl:rounded-r-2xl">
                          {imageData
                            ?.sort((a, b) => (a.Order < b.Order ? -1 : 1))
                            .filter((item, idx) => idx < 6)
                            .map((i, idx) => (
                              <>
                                <button
                                  className="group relative flex h-10 w-full overflow-hidden hover:border hover:border-blue-500  md:h-20 xl:h-[160px]"
                                  onClick={() =>
                                    setCurrentImage({
                                      ...currentImage,
                                      src: i.image_url,
                                      order: i.Order,
                                    })
                                  }
                                >
                                  <Image
                                    height={4000 * 4}
                                    width={4000 * 4}
                                    alt="vehicle"
                                    src={i.image_url}
                                    className=" h-full w-full object-cover"
                                  />
                                </button>
                              </>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-5 px-1 py-2 pl-5 pr-5 md:grid-cols-7">
                      <div>
                        {" "}
                        <div className="mx-auto flex w-min gap-2 rounded-full bg-neutral-200 p-1 pl-3">
                          <div className="pt-1">{props.bedrooms}</div>{" "}
                          <div className="ml-1 rounded-full bg-white p-1 text-2xl">
                            <IoBedOutline />
                          </div>
                        </div>
                      </div>
                      <div>
                        {" "}
                        <div className="mx-auto flex w-min gap-2 rounded-full bg-neutral-200 p-1 pl-3">
                          <div className="pt-1">{props.bathrooms}</div>{" "}
                          <div className="ml-1 rounded-full bg-white p-1 text-2xl">
                            <PiBathtub />
                          </div>
                        </div>
                      </div>
                      <div>
                        {" "}
                        <div className="mx-auto flex w-min gap-2 rounded-full bg-neutral-200 p-1 pl-3">
                          <div className="pt-1">{props.parking}</div>{" "}
                          <div className="ml-1 rounded-full bg-white p-1 text-2xl">
                            <TbParkingCircle />
                          </div>
                        </div>
                      </div>
                      <div>
                        {" "}
                        <div className="mx-auto flex w-min gap-2 rounded-full bg-neutral-200 p-1 pl-3">
                          <div className="pt-1">{props.people}</div>{" "}
                          <div className="ml-1 rounded-full bg-white p-1 text-2xl">
                            <IoPersonSharp />
                          </div>
                        </div>
                      </div>
                      {props.swimingPool === true && (
                        <>
                          <div>
                            {" "}
                            <div className="mx-auto flex w-min gap-2 rounded-full bg-neutral-200 p-1">
                              <div className="rounded-full bg-white p-1 text-2xl">
                                <FaSwimmingPool />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      {props.braai === true && (
                        <>
                          <div>
                            {" "}
                            <div className="mx-auto flex w-min gap-2 rounded-full bg-neutral-200 p-1">
                              <div className="rounded-full bg-white p-1 text-2xl">
                                <GiBarbecue />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      {props.wifi === true && (
                        <>
                          <div>
                            {" "}
                            <div className="mx-auto flex w-min gap-2 rounded-full bg-neutral-200 p-1">
                              <div className="rounded-full bg-white p-1 text-2xl">
                                <FaWifi />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    {createLead.isSuccess && (
                      <>
                        <Sent />
                      </>
                    )}
                    <div className="m-5 grid grid-cols-1 overflow-hidden rounded-2xl border shadow-2xl md:grid-cols-6">
                      <div className="col-span-4  p-5">
                        {" "}
                        {props.Description}
                      </div>
                      <div className="col-span-2 p-5 shadow-xl shadow-neutral-500">
                        <div className="mt-2 flex gap-1">
                          {" "}
                          <div className=" text-lg font-bold tracking-widest">
                            R{props.price} ZAR
                          </div>
                          <div className="mt-0.5 font-thin ">night</div>
                        </div>
                        <div>
                          <Label title="Name & Surname">
                            <input
                              value={lead.name}
                              onChange={(e) =>
                                setLead({
                                  ...lead,
                                  name: e.target.value,
                                })
                              }
                              className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none "
                            />
                          </Label>
                        </div>
                        <div>
                          <Label title="Email">
                            <input
                              value={lead.email}
                              onChange={(e) =>
                                setLead({
                                  ...lead,
                                  email: e.target.value,
                                })
                              }
                              className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none "
                            />
                          </Label>
                        </div>
                        <div>
                          <Label title="Phone">
                            <input
                              value={lead.phone}
                              onChange={(e) =>
                                setLead({
                                  ...lead,
                                  phone: e.target.value,
                                })
                              }
                              className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none "
                            />
                          </Label>
                        </div>
                        <div>
                          <Label title="Message">
                            <textarea
                              value={lead.message}
                              onChange={(e) =>
                                setLead({
                                  ...lead,
                                  message: e.target.value,
                                })
                              }
                              className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                            />
                          </Label>
                        </div>
                        <div className="pt-5">
                          {lead.phone === "" &&
                            lead.email === "" &&
                            leadIncomplete.incomplete === true && (
                              <>
                                <div className="text-center text-red-500">
                                  Please Complete email or phone field.
                                </div>
                              </>
                            )}
                          {lead.phone === "" && lead.email === "" && (
                            <button
                              onClick={() => {
                                // Create the lead
                                setLeadIncomplete({
                                  ...leadIncomplete,
                                  incomplete: true,
                                });
                              }}
                              className=" w-full rounded-xl bg-gradient-to-tr from-blue-500 to-yellow-500 p-1 px-4 py-5 font-bold text-white hover:opacity-80 hover:shadow-lg  "
                            >
                              Book Now
                            </button>
                          )}

                          {lead.phone !== "" && lead.email === "" && (
                            <>
                              {" "}
                              <button
                                onClick={async () => {
                                  await createLead.mutateAsync(lead);
                                }}
                                className=" w-full rounded-xl bg-gradient-to-tr from-blue-500 to-yellow-500 p-1 px-4 py-5 font-bold text-white hover:opacity-80 hover:shadow-lg  "
                              >
                                Book Now
                              </button>
                            </>
                          )}
                          {lead.email !== "" && lead.phone === "" && (
                            <>
                              {" "}
                              <button
                                onClick={async () => {
                                  await createLead.mutateAsync(lead);
                                }}
                                className=" w-full rounded-xl bg-gradient-to-tr from-blue-500 to-yellow-500 p-1 px-4 py-5 font-bold text-white hover:opacity-80 hover:shadow-lg  "
                              >
                                Book Now
                              </button>
                            </>
                          )}
                          {lead.email !== "" && lead.phone !== "" && (
                            <>
                              {" "}
                              <button
                                onClick={async () => {
                                  await createLead.mutateAsync(lead);
                                }}
                                className=" w-full rounded-xl bg-gradient-to-tr from-blue-500 to-yellow-500 p-1 px-4 py-5 font-bold text-white hover:opacity-80 hover:shadow-lg  "
                              >
                                Book Now
                              </button>
                            </>
                          )}
                        </div>
                      </div>
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
                props.Images.filter((image) => image.Order === 0)[0]
                  ?.image_url ?? ""
              }
              alt={
                props.Images.filter((image) => image.Order === 0)[0]
                  ?.image_url ?? ""
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
            <div className="grid grid-cols-4 px-1 py-2">
              <div>
                {" "}
                <div className="mx-auto flex w-min gap-2 rounded-full bg-neutral-200 p-1 pl-3">
                  <div className="pt-1">{props.bedrooms}</div>{" "}
                  <div className="ml-1 rounded-full bg-white p-1 text-2xl">
                    <IoBedOutline />
                  </div>
                </div>
              </div>
              <div>
                {" "}
                <div className="mx-auto flex w-min gap-2 rounded-full bg-neutral-200 p-1 pl-3">
                  <div className="pt-1">{props.bathrooms}</div>{" "}
                  <div className="ml-1 rounded-full bg-white p-1 text-2xl">
                    <PiBathtub />
                  </div>
                </div>
              </div>
              <div>
                {" "}
                <div className="mx-auto flex w-min gap-2 rounded-full bg-neutral-200 p-1 pl-3">
                  <div className="pt-1">{props.parking}</div>{" "}
                  <div className="ml-1 rounded-full bg-white p-1 text-2xl">
                    <TbParkingCircle />
                  </div>
                </div>
              </div>
              <div>
                {" "}
                <div className="mx-auto flex w-min gap-2 rounded-full bg-neutral-200 p-1 pl-3">
                  <div className="pt-1">{props.people}</div>{" "}
                  <div className="ml-1 rounded-full bg-white p-1 text-2xl">
                    <IoPersonSharp />
                  </div>
                </div>
              </div>
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
