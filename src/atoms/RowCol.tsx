import { type DefaultProps } from ".";
import { cn } from "./cn";

export function Col(props: DefaultProps<{ primary?: boolean }>) {
  return (
    <div className={cn("flex flex-col gap-5", props.className)}>
      {props.children}
    </div>
  );
}

export function Row(
  props: DefaultProps<{ primary?: boolean; active?: boolean }>,
) {
  return (
    <div
      className={cn(
        "flex flex-row items-center gap-2",
        props.active && "bg-blue-100",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
