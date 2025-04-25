import Link from "next/link";
import { cn } from "~/utils/cn";

import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

function Btn2(props: {
  label: string;
  onClick?: () => void;
  className?: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={cn(
        "relative m-2 rounded-md bg-blue-500 p-2 font-bold text-white hover:bg-blue-700 hover:shadow-md",
        props.active ? " bg-blue-700" : "",

        props.className,
      )}
    >
      {props.label}
    </button>
  );
}

export function ButtonGroup2<G>(props: {
  value: G;
  options?: { label: string; value: G; href?: string }[];
  onChange?: (val: G) => void;
  className?: string;
  vertical?: boolean;
  dropdown?: boolean;
  title?: string;
  disabled?: boolean;
}) {
  const vertical = props.vertical ?? false;
  return (
    <div
      className={cn("isolate inline-flex ", vertical ? "flex-col" : "flex-row")}
    >
      {props.options?.map((i, idx, arr) => {
        const active = i.value === props.value;

        if (i.href)
          return (
            <Link key={i.label} href={i.href}>
              <Btn2
                label={i.label}
                active={active}
                className={cn(
                  idx === 0 && (vertical ? "" : "p-1"),
                  idx === arr.length - 1 && (vertical ? "" : ""),
                  props.className,
                )}
              />
            </Link>
          );

        return (
          <Btn2
            key={i.label}
            label={i.label}
            active={active}
            className={cn(
              idx === 0 && (vertical ? "" : " p-1"),
              idx === arr.length - 1 && (vertical ? "" : ""),
              props.className,
            )}
            onClick={() => {
              if (props.onChange) props.onChange(i.value);
            }}
          />
        );
      })}
    </div>
  );
}
