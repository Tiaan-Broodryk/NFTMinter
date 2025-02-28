import { type ReactNode } from "react";
import { cn } from "~/utils/cn";
import { Heading } from "./Heading";

export function Panel(props: {
  children: ReactNode;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "tertiary" | "contained";
  title?: string;
}) {
  return (
    <div
      className={cn(
        "w-full items-center gap-5 rounded bg-white p-3 shadow-xl shadow-neutral-100",
        "dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400 dark:shadow-neutral-800",
        props.variant === "primary" &&
          "rounded-md border border-neutral-200 bg-white shadow-xl",
        props.variant === "secondary" && "bg-neutral-200/50 shadow-none",
        props.variant === "tertiary" && "rounded bg-neutral-100 shadow-none",
        props.variant === "contained" &&
          "bg-brand-500 rounded text-white shadow-xl",

        props.className,
      )}
    >
      <div className="h-full w-full">
        <div className="flex h-full flex-col">
          <div>{props.title && <Heading>{props.title}</Heading>}</div>
          <div className="flex-1">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
