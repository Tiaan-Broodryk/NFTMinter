import React, {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type ReactNode,
} from "react";
import { cn } from "~/utils/cn";
import { Tooltip } from "./Tooltip";
import Link from "next/link";

type ButtonEvent = Parameters<
  NonNullable<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >["onClick"]
  >
>[0];

export function Button(
  props: {
    icon?: ReactNode;
    children?: ReactNode;
    href?: string;
    size?: "sm" | "md" | "lg";
    variant?:
      | "text"
      | "contained"
      | "outlined"
      | "subtle"
      | "tab"
      | "chip"
      | "input";
    className?: string;
    active?: boolean;
    tooltip?: string;
    onClick?: (e: ButtonEvent) => void | Promise<void>;
  } & DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
) {
  const {
    icon,
    size = "md",
    active: active,
    tooltip,
    variant,
    className,
    disabled,
    href,
    ...rest
  } = props;

  const classNameCode = cn(
    "flex font-normal tracking-wider transition",
    "items-center whitespace-nowrap rounded p-1 px-2 gap-2",
    "text-neutral-500 hover:text-neutral-600",

    size === "sm" && "gap-1 rounded p-1 text-xs px-1.5",
    size === "md" || (!size && "gap-3 rounded p-2 px-3 font-normal"),
    size == "lg" && "gap-4 rounded-lg p-2 px-3 text-lg",

    active && "text-neutral-500",

    variant === "text" &&
      cn(
        "bg-neutral-500/5 hover:bg-neutral-500/10 text-neutral-500 hover:text-neutral-600",
        active &&
          cn(
            "hover:bg-neutral-200/70 bg-neutral-100 text-neutral-600 hover:text-neutral-600",
          ),
      ),

    variant === "subtle" &&
      cn(
        "hover:bg-neutral-200 bg-neutral-50 text-neutral-500 hover:text-neutral-600",
        "dark:bg-neutral-500/10 dark:border-2 dark:border-sky-300/5 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-100",
        active &&
          cn(
            "hover:bg-neutral-200/70 bg-neutral-100 text-neutral-600 hover:text-neutral-600",
          ),
      ),

    variant === "contained" &&
      cn(
        "bg-black/5 text-black hover:bg-neutral-700 hover:text-sky-500 hover:bg-sky-500/10",
        "dark:bg-neutral-950 dark:text-white hover:dark:bg-neutral-700 hover:dark:text-neutral-100 dark:bg-sky-500/10",
        active &&
          cn(
            "hover:bg-neutral-600/70 bg-neutral-500 text-white hover:text-white",
          ),
        disabled &&
          "cursor-default bg-neutral-300 hover:bg-neutral-300 hover:text-white",
      ),

    variant === "outlined" &&
      cn(
        "border",
        "hover:bg-neutral-500/10 border-neutral-200 bg-white text-neutral-500 hover:text-neutral-600",

        active &&
          cn(
            "hover:border-neutral-600, hover:bg-neutral-200/70 border-neutral-500 bg-neutral-200 text-neutral-900 hover:text-neutral-600",
          ),
      ),

    variant === "tab" &&
      cn(
        "rounded-none border-b-2 translate-y-[2px] border-neutral-200 px-3",
        "hover:border-neutral-400",
        active && "border-neutral-500 text-neutral-800",
      ),

    variant === "chip" &&
      cn(
        "rounded-none border first:rounded-l-full last:rounded-r-full px-3 first:pl-4 last:pr-4",
        "hover:bg-neutral-50 border-neutral-200 bg-white text-neutral-500 hover:text-neutral-600",

        active &&
          cn(
            "hover:border-neutral-600, hover:bg-neutral-200/70 border-neutral-500 bg-neutral-200 text-neutral-900 hover:text-neutral-600",
          ),
      ),

    variant === "input" &&
      "flex items-center self-stretch rounded border border-neutral-300  bg-white p-2 text-neutral-400 accent-primary-500 focus:border-green-400 focus:outline-none",

    className,
  );

  function render_button() {
    return (
      <button {...rest} disabled={disabled} className={classNameCode}>
        {icon}
        {props.children}
      </button>
    );
  }

  if (tooltip) {
    return <Tooltip tooltip={tooltip}>{render_button()}</Tooltip>;
  }

  if (href) {
    return (
      <Link href={href} className={classNameCode}>
        {icon}
        {props.children}
      </Link>
    );
  }

  return render_button();
}
