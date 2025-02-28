import Link from "next/link";
import { cn } from "~/utils/cn";

export default function Btn(props: {
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
        " rounded-full  bg-black p-2 text-lg  font-bold text-white",
        props.active ? "bg-white text-black " : "",

        props.className,
      )}
    >
      {props.label}
    </button>
  );
}

export function NavButtonGroup<G>(props: {
  value: G;
  options: { label: string; value: G; href?: string }[];
  onChange?: (val: G) => void;
  className?: string;
  vertical?: boolean;
}) {
  const vertical = props.vertical ?? false;

  return (
    <div
      className={cn(
        "overflow-hiden isolate ml-2 inline-flex w-min rounded-full border border-white bg-black",
        vertical ? "flex-col" : "flex-row",
      )}
    >
      {props.options.map((i, idx, arr) => {
        const active = i.value === props.value;

        if (i.href)
          return (
            <Link key={i.label} href={i.href}>
              <Btn
                label={i.label}
                active={active}
                className={cn(
                  idx === 0 && (vertical ? "" : ""),
                  idx === arr.length - 1 && (vertical ? "" : ""),
                  props.className,
                )}
              />
            </Link>
          );

        return (
          <Btn
            key={i.label}
            label={i.label}
            active={active}
            className={cn(
              idx === 0 && (vertical ? "" : ""),
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
