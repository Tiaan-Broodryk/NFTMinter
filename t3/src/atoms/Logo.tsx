// import Image from "next/image";

import { cn } from "~/utils/cn";
// import { FaHeartPulse } from "react-icons/fa6";

import { LuCodepen } from "react-icons/lu";

export function Logo(props: { dark_on_white?: boolean; className?: string }) {
  return (
    <div className={cn("group relative size-10 antialiased ", props.className)}>
      <LuCodepen
        className={cn(
          "absolute -top-[0px] left-0 z-40 size-10 text-blue-500/50 antialiased transition-all duration-1000 group-hover:-top-[6px]  dark:text-blue-600",
          props.className,
        )}
      />
      <LuCodepen
        className={cn(
          "absolute left-0 top-0 z-50 size-10 text-neutral-700 transition-all dark:text-white",
          props.className,
        )}
      />
      <LuCodepen
        className={cn(
          "absolute left-0 top-[0px] z-30 size-10 text-orange-500/50 transition-all duration-1000 group-hover:top-[6px] dark:text-orange-600",
          props.className,
        )}
      />
    </div>
  );
}
