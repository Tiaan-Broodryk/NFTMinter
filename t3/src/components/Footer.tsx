const navigation = {
  solutions: [
    { name: "Marketing", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Automation", href: "#" },
    { name: "Commerce", href: "#" },
    { name: "Insights", href: "#" },
  ],
  support: [
    { name: "Submit ticket", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
  ],
  legal: [
    { name: "Terms of service", href: "#" },
    { name: "Privacy policy", href: "#" },
    { name: "License", href: "#" },
  ],
};
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div>
            <div>
              {" "}
              <Image
                className="mx-auto  opacity-90 md:block"
                src="/Images/Logo1.png"
                alt=""
                width={1000}
                height={1000}
              />
            </div>
            <div className="font-bold text-white">Cell : 060 814 4291</div>
            <div className="font-bold text-white">
              Email : nadiaswalepoel36@gmail.com
            </div>
          </div>
          <div className="mt-16 grid  grid-cols-2 gap-8 pt-5 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <Link className="text-sm/6 font-semibold text-white" href={"/"}>
                  Home
                </Link>
              </div>
              <div className="mt-10 md:mt-0">
                <Link
                  href={"/accommodation"}
                  className="text-sm/6 font-semibold text-white"
                >
                  Accommodation
                </Link>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <Link
                  href={"/houserules/english"}
                  className="text-sm/6 font-semibold text-white"
                >
                  Rules
                </Link>
              </div>
              {/* <div className="mt-10 md:mt-0">
                <Link href={""} className="text-sm/6 font-semibold text-white">
                  Contact
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
