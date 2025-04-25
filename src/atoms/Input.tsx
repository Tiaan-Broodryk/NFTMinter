import { type InputHTMLAttributes, type DetailedHTMLProps } from "react";
import { cn } from "~/utils/cn";

export function Input(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
) {
  return (
    <input
      {...props}
      value={props.value}
      className={cn(
        "accent-primary-500 rounded border border-neutral-300 bg-white p-2  focus:border-blue-400 focus:outline-none",

        props.disabled && "opacity-30",
        props.type === "color" &&
          "m-0 aspect-square h-10 w-10 cursor-pointer border-none p-0",
        props.className,
      )}
    />
  );
}
