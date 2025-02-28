/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, type ReactNode } from "react";

export function Tooltip(props: { children: ReactNode; tooltip?: string }) {
  const [hover, hover_set] = useState(false);
  const [aligned_to, aligned_to_set] = useState<"left" | "right">("left");

  if (!props.tooltip) return <>{props.children}</>;

  return (
    <div
      onMouseEnter={(ev) => {
        if (window) {
          aligned_to_set(
            window.innerWidth - ev.clientX < 200 ? "right" : "left",
          );
        }
        hover_set(true);
      }}
      onMouseLeave={() => {
        hover_set(false);
      }}
      className="relative"
      // Tooltip in _app
      data-tooltip-id="my-tooltip"
      data-tooltip-content={props.tooltip}
    >
      {props.children}
    </div>
  );
}
