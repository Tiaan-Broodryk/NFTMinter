import { type DetailedHTMLProps, type TextareaHTMLAttributes } from "react";
import { cn } from "~/utils/cn";

export function TextArea(
  props: DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
) {
  return (
    <textarea
      {...props}
      className={cn(
        "accent-primary-500 rounded border border-neutral-300 bg-white p-2  focus:border-blue-400 focus:outline-none",
        "dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200",
        props.className,
      )}
    />
  );
}
