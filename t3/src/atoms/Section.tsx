import { type ReactNode, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { ButtonIcon } from "~/atoms/ButtonIcon";
import { cn } from "~/utils/cn";

export function Section({
  heading,
  children,
  className,
  collapsable,
}: {
  heading?: ReactNode;
  children: ReactNode;
  className?: string;
  collapsable?: boolean;
}) {
  const [state, setState] = useState({
    collapsed: false,
  });

  return (
    <section
      className={cn(
        "flex flex-col gap-2 rounded-md border bg-neutral-50 p-5 dark:border-transparent dark:bg-neutral-900/20",
        className,
      )}
    >
      {(heading ?? collapsable) && (
        <div className="flex items-center">
          <div className="pl-2">{heading}</div>
          <div className="flex-1" />
          {collapsable && (
            <ButtonIcon
              variant="subtle"
              className=""
              onClick={() => {
                setState({ ...state, collapsed: !state.collapsed });
              }}
            >
              <FaChevronDown
                className={cn(
                  "transition",
                  state.collapsed ? "rotate-180" : "",
                )}
              />
            </ButtonIcon>
          )}
        </div>
      )}

      {!state.collapsed && <div className={className}>{children}</div>}
    </section>
  );
}
