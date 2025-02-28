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
    question: "Geen Rook Binnehuis",
    answer:
      "Rook is nie toegelaat binne die eiendom nie. Daar is spesifieke buite-areas vir rokers ,asbakkies word voorsien vir behoorlike wegdoening.",
    icon: IoLogoNoSmoking,
  },
  {
    question: "Diere Beleid",
    answer: "Jammer, maar geen troeteldiere word toegelaat.",
    icon: MdPets,
  },
  {
    question: "Stiltetyd",
    answer: "Stiltetyd is vanaf 10:00 NM tot 8:00 VM",
    icon: IoVolumeMute,
  },
  {
    question: "Maksimum Besetting",
    answer:
      "Die maksimum aantal gaste is beperk tot 6 persone. Maar julle is meer as welkom om dagbesoekers te hê.",
    icon: GiNightSleep,
  },
  {
    question: "Inklok en Uitklok",
    answer: "Inklok is om 14:00 NM en uitklok is om 10:00 VM.",
    icon: CiCircleCheck,
  },
  {
    question: "Respek vir Eiendom en Buurmanne",
    answer:
      "Maak asseblief gebruik van die aangewese afvalverwyderingstelsel en handhaaf die skoonheid van die eiendom deur afval behoorlik te verwyder.Volg asseblief die aangewese parkeer reëls en -areas om te verseker dat voertuie nie die toegang tot die eiendom of aangrensende eiendomme belemmer nie.Dankie vir u samewerking om 'n aangename omgewing vir almal te handhaaf.",
    icon: BsFillHouseCheckFill,
  },
  {
    question: "Veiligheid en Sekuriteit",
    answer:
      "Die eiendom is geleë in 'n veilige buurt, maar dit is altyd 'n goeie idee om die eiendom veilig te hou.Die voertuigtoegangshek maak nie vanself toe nie.",
    icon: MdOutlineSecurity,
  },
  {
    question: "Slaapbankstelle",
    answer:
      "Die bankstelle is in die sitkamer en kan as 'n bed vir 2 persone gebruik word.Maar GEBRUIK asseblief die beskermende oortreksels vir die slaapbankstelle wanneer julle dit as 'n bed gebruik.Die beskermende oortreksels is in die kas in die beige kamer.",
    icon: LiaCouchSolid,
  },
  {
    question: "Wi-Fi",
    answer: "Gratis Wi-Fi is beskikbaar in die eiendom. ",
    icon: FaWifi,
  },
  // {
  //   question: "Breekskadedeposito",
  //   answer:
  //     "n Breekskadedeposito van R3000 is betaalbaar voor aankoms. Dit kan in kontant betaal word op aankoms of voor aankoms via EFT. Dit sal terugbetaal word binne 48 uur na vertrek,as daar geen gebreekte goed of skade aan die eiendom is nie. Net vepligtend vir huur langer as 7 dae. Huur langer as 2 weke vereis n breekskadedeposito van R5000.",
  //   icon: GiHammerBreak,
  // },
  {
    question: "Kansellasies en Terugbetalings",
    answer:
      "Die gas sal 'n 50%-terugbetaling ontvang indien die bespreking minstens 30 dae voor die aankomsdatum gekanselleer word. Indien die gas 14 dae voor die aankomsdatum kanselleer, word die nagte wat nie deurgebring is nie, nie terugbetaal nie. Indien die gas opdaag en besluit om vroeg te vertrek, word die nagte wat nie deurgebring is nie, nie terugbetaal nie.",
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
              <HouserulesNav page={"afrikaans"} />
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
