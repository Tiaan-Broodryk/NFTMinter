import { type ComponentProps, type ReactNode } from "react";
import { type IconType } from "react-icons";
import { RiArrowDownSFill, RiCloseLine } from "react-icons/ri";
import { cn } from "~/utils/cn";
import { ButtonIcon } from "~/atoms/ButtonIcon";

export type ChipListProps = {
  name: string;
  value?: string;
  subitems?: ChipListProps[];
  icon?: ReactNode;
  Icon?: IconType;
  active?: boolean;
};

export function Chip(props: {
  item?: ChipListProps;
  darkmode?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  onDelete?: (item: ChipListProps) => void;
  variant?: "default" | "outlined";
}) {
  return (
    <div
      className={cn(
        "pointer-events-auto flex select-none items-center gap-2 rounded-full px-3 py-1 text-sm font-medium text-neutral-500 transition",
        props.onClick && "cursor-pointer",
        props.darkmode === true
          ? cn(
              "bg-neutral-800/80 text-white",
              props.onClick && "hover:bg-neutral-700/90",
              props.item?.active ? " bg-indigo-100" : "bg-neutral-800/80",
            )
          : cn(
              `border-primary-950/20`,
              props.onClick && "hover:bg-neutral-200",
              props.item?.active ? " bg-indigo-100" : "bg-neutral-100",
            ),
        props.variant === "outlined" && cn("border bg-white"),
        props.className,
      )}
    >
      {props.item?.Icon && <props.item.Icon size={20} />}
      {props.item?.icon}
      {props.children}
      <div className={cn("flex-1")}>{props.item?.name}</div>

      {props.item?.subitems && <RiArrowDownSFill size={20} />}
      {props.onDelete && (
        <ButtonIcon
          onClick={() => {
            if (props.item && props.onDelete) props.onDelete(props.item);
          }}
        >
          <RiCloseLine size={20} />
        </ButtonIcon>
      )}
    </div>
  );
}

export function ChipList(props: {
  items: ChipListProps[];
  className?: string;
  variant?: ComponentProps<typeof Chip>["variant"];
  onDelete?: ComponentProps<typeof Chip>["onDelete"];
}) {
  return (
    <div
      className={cn("flex flex-wrap gap-3 whitespace-nowrap", props.className)}
    >
      {props.items.map((i, key) => (
        <Chip
          item={i}
          key={key}
          variant={props.variant}
          onDelete={props.onDelete}
        />
      ))}
    </div>
  );
}
