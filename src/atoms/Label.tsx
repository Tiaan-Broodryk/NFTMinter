import {
  type ReactNode,
  type DetailedHTMLProps,
  type LabelHTMLAttributes,
} from "react";
import { cn } from "~/utils/cn";

export function Label(
  props: Omit<
    DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
    "title"
  > & {
    title: string;
    children: ReactNode;
    align?: "right" | "left" | "top";
  },
) {
  const { title, children, ...rest } = props;

  if (props.align === "left") {
    return (
      <div className={cn("flex flex-row items-center gap-2", props.className)}>
        <label {...rest} className={cn("text-sm text-neutral-600")}>
          {title}
        </label>
        <div className={props.className}>{children}</div>
      </div>
    );
  }

  if (props.align === "right") {
    return (
      <div className={cn("flex flex-row items-center gap-2", props.className)}>
        <div className={props.className}>{children}</div>
        <label {...rest} className={cn("text-sm text-neutral-600")}>
          {title}
        </label>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col", props.className)}>
      <label {...rest} className={cn("text-sm text-neutral-500")}>
        {title}
      </label>
      <div className={props.className}>{children}</div>
    </div>
  );
}
