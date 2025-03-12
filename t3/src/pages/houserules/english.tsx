import { Disclosure } from "@headlessui/react";
import { BsPlusSquare } from "react-icons/bs";
import { IoBed } from "react-icons/io5";
import { LiaCouchSolid } from "react-icons/lia";
import { LuParkingCircle } from "react-icons/lu";
import { MdPets } from "react-icons/md";
import { IoVolumeMute } from "react-icons/io5";
import { PiBathtubDuotone, PiMinusSquareLight } from "react-icons/pi";
import { TbToolsKitchen2 } from "react-icons/tb";
import { IoLogoNoSmoking } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import { BsFillHouseCheckFill } from "react-icons/bs";
import { FaWifi } from "react-icons/fa";
import { GiNightSleep } from "react-icons/gi";
import { CiCircleCheck } from "react-icons/ci";
import { GiHammerBreak } from "react-icons/gi";
import { TbHomeCancel } from "react-icons/tb";
import Footer from "~/components/Footer";
import HouserulesNav from "~/components/houserulesNav";
import Nav from "~/components/Nav";
const faqs = [
  {
    question: "No Smoking",
    answer:
      "Smoking is not permitted inside the property. There are specific outdoor areas for smoking and provided ashtrays for proper disposal.",
    icon: IoLogoNoSmoking,
  },
  {
    question: "Pet Policy",
    answer: "Sorry but no pets are allowed.",
    icon: MdPets,
  },
  {
    question: "Quiet Hours",
    answer: "Quiet hours are from 10:00 PM to 8:00 AM",
    icon: IoVolumeMute,
  },
  {
    question: "Maximum Occupancy",
    answer:
      "The maximum number of guests is limited to 6 persons. But you are more than welcome to have day visitors.",
    icon: GiNightSleep,
  },
  {
    question: "Check-in and Check-out",
    answer: "Check-in time is 14:00 PM and check-out time is 10:00 AM.",
    icon: CiCircleCheck,
  },
  {
    question: "Respect for Property and Neighbours",
    answer:
      "Please adhere to the following guidelines for waste disposal and parking to ensure a positive stay experience Waste Disposal: Kindly make use of the designated waste disposal system and maintain the property's cleanliness by properly disposing of waste. Parking: Follow the designated parking rules and areas to ensure that vehicles do not obstruct access to the property or neighboring properties. Thank you for your cooperation in maintaining a pleasant environment for everyone.",
    icon: BsFillHouseCheckFill,
  },
  {
    question: "Safety and Security",
    answer:
      "Please keep the side gates locked at all times. The property is located in a safe neighborhood, but it is always a good idea to keep the property secure. The vehicle entry gate does not close by it self.",
    icon: MdOutlineSecurity,
  },
  // {
  //   question: "Sleeper Sofa's",
  //   answer:
  //     "The sofa's are located in the living room and can be used as a bed for 2 persons. But Please USE the protective covers for the sofa's when using them as a bed. The protective covers are located in the closet in the beige room.",
  //   icon: LiaCouchSolid,
  // },
  {
    question: "Wi-Fi",
    answer: "The property has free Wi-Fi.",
    icon: FaWifi,
  },
  // {
  //   question: "Breakage Deposit",
  //   answer:
  //     " A breakage deposit of R3000 is required. This must be paid in cash on arrival. This will be returned to you within 48h from departure, provided there are no breakages or damages to the property. Only compulsery for stays logner than 7 days.Stays longer than 2 weeks require a R5000 breakage deposit.",
  //   icon: GiHammerBreak,
  // },
  {
    question: "Cancellations and Refunds",
    answer:
      "The guest will receive a 50% refund if the booking is cancelled at least 30 days before the arrival date. If the guest cancels 14 days before the arrival date, the nights not spent are not refunded. If the guest arrives and decides to leave early, the nights not spent are not refunded.",
    icon: TbHomeCancel,
  },
  // More questions...
];
export default function Houserules() {
  return (
    <>
      <div>
        <Nav />
        <div className="h-full bg-gray-200 pb-20 pt-20">
          <div className="mx-auto max-w-7xl rounded-md bg-neutral-800 pb-10 shadow-2xl">
            <div className="  p-5">
              <HouserulesNav page={"english"} />
            </div>
            <div className=" text-center text-3xl font-bold text-white">
              House Rules
            </div>
            <div className="mx-auto max-w-7xl px-6  sm:py-10 lg:px-8 ">
              <div className="mx-auto max-w-4xl divide-y divide-white">
                <dl className="mt-10 space-y-6 divide-y divide-white">
                  {faqs.map((faq) => (
                    <Disclosure as="div" key={faq.question} className="pt-6">
                      {({ open }) => (
                        <>
                          <dt>
                            <Disclosure.Button className="flex w-full items-start justify-between text-left text-white">
                              <span className="flex gap-2 text-base font-semibold leading-7">
                                {faq.question}
                                <faq.icon
                                  className="h-6 w-6 text-white "
                                  aria-hidden="true"
                                />
                              </span>
                              <span className="ml-6 flex h-7 items-center">
                                {open ? (
                                  <PiMinusSquareLight
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <BsPlusSquare
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </dt>
                          <Disclosure.Panel as="dd" className="mt-2 pr-12">
                            <p className="flex gap-2 text-base leading-7 text-white">
                              {faq.answer}
                            </p>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
