import Image from "next/image";

import { type ReactNode } from "react";
import { cn } from "~/utils/cn";
export function Data<G extends string | number>(props: {
  label: string;
  value?: G | undefined;
  children?: ReactNode;
  type?: "image";
  onChange?: (value: G) => Promise<boolean | string>;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", props.className)}>
      <label className="text-sm text-neutral-500">{props.label}</label>
      {props.value != undefined && (
        <>
          {props.type === "image" && (
            <div>
              {props.value != "" && (
                <Image
                  src={props.value as string}
                  alt={props.label}
                  width={100}
                  height={100}
                />
              )}
              UPLOAD
            </div>
          )}
          {props.type != "image" && !props.onChange && <div>{props.value}</div>}
        </>
      )}
      {props.children}
    </div>
  );
}
