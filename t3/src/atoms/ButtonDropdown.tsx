import { type ComponentProps, type ReactNode, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Button } from "./Button";
import { cn } from "~/utils/cn";

export function ButtonDropdown(props: {
  buttonProps: ComponentProps<typeof Button>;
  children: ReactNode;
  show_chevron?: boolean;
  open?: boolean;
  onOpen?: (open: boolean) => void;
  align?: "left" | "right" | "full";
}) {
  const [local_open, set_open] = useState(props.open ?? false);

  const open = props.open ?? local_open;
  return (
    <div className="relative">
      <Button
        {...props.buttonProps}
        onClick={() => {
          set_open(!open);
          props.onOpen?.(!open);
        }}
      >
        {props.buttonProps.children}
        {props.show_chevron != false && <FiChevronDown />}
      </Button>

      {open && (
        <>
          <div
            className={cn(
              "absolute top-10 z-50 flex flex-col gap-2 whitespace-nowrap rounded border bg-white p-2 shadow-xl",
              props.align === "right" && "right-0",
              props.align === "left" && "left-0",
              props.align === "full" && "left-0 right-0",
            )}
          >
            {props.children}
          </div>
          <div
            className="fixed left-0 top-0 h-screen w-screen"
            onClick={() => {
              set_open(false);
              props.onOpen?.(false);
            }}
          />
        </>
      )}
    </div>
  );
}
