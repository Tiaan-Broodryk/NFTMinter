import { type ReactNode } from "react";
import { cn } from "~/utils/cn";

export function Alert(props: {
  severity?: "error" | "success" | "info" | "warning";
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded border px-3 py-2 text-xs",
        props.severity === "error" && "border-red-500 bg-red-50 text-red-600",
        props.severity === "success" &&
          "border-green-500 bg-green-50 text-green-600",
        props.severity === "info" && "border-sky-500 bg-sky-50 text-sky-600",
        props.severity === "warning" &&
          "border-orange-500 bg-orange-50 text-orange-600",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
