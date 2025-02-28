import Link from "next/link";
import {
  type ComponentProps,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import { cn } from "~/utils/cn";
import { Button } from "../atoms/Button";

export function ButtonIcon(props: {
  // icon?: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  children?: ReactNode;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  tooltip?: string;
  variant?: ComponentProps<typeof Button>["variant"];
  // primaryColor?: string;
}) {
  if (!props.href) {
    return (
      <Button
        disabled={props.disabled}
        onClick={props.onClick}
        active={props.active}
        className={cn("aspect-square", props.className)}
        variant={props.variant}
        tooltip={props.tooltip}
        // primaryColor={props.primaryColor}
      >
        {props.children}
      </Button>
    );
  }

  return (
    <Link href={props.href}>
      <Button
        disabled={props.disabled}
        onClick={props.onClick}
        active={props.active}
        className={cn("aspect-square", props.className)}
        variant={props.variant}
        tooltip={props.tooltip}
        // primaryColor={props.primaryColor}
      >
        {props.children}
      </Button>
    </Link>
  );
}
