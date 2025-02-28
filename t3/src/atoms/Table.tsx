import {
  type HTMLAttributes,
  type DetailedHTMLProps,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
} from "react";
import { cn } from "~/utils/cn";

export function Table(
  props: DetailedHTMLProps<
    TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  >,
) {
  const { className, ...rest } = props;
  return (
    <table {...rest} className={cn("w-full border bg-white", className)} />
  );
}

export function THead(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >,
) {
  const { className, ...rest } = props;
  return <thead {...rest} className={cn("", className)} />;
}

export function TBody(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >,
) {
  const { className, ...rest } = props;
  return <tbody {...rest} className={cn("", className)} />;
}

export function TRow(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > & { active?: boolean },
) {
  const { className, active, ...rest } = props;
  return (
    <tr
      {...rest}
      className={cn(
        "text-neutral-600 transition",
        active ? "bg-blue-100  hover:bg-blue-100" : "hover:bg-neutral-100",
        className,
      )}
    />
  );
}

export function TCell(
  props: DetailedHTMLProps<
    TdHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >,
) {
  const { className, ...rest } = props;
  return (
    <td
      {...rest}
      className={cn("whitespace-nowrap border px-1 text-xs ", className)}
    />
  );
}

export function THeadCell(
  props: DetailedHTMLProps<
    TdHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >,
) {
  const { className, ...rest } = props;
  return (
    <th {...rest} className={cn("border px-1 text-left text-xs", className)} />
  );
}

export function TD(props: { className?: string; children: React.ReactNode }) {
  return (
    <td className={cn("m-0 border-y p-0", props.className)}>
      {props.children}
    </td>
  );
}

export function TH(props: { className?: string; children?: React.ReactNode }) {
  return (
    <th className={cn("m-0 border-y p-0 text-left", props.className)}>
      {props.children}
    </th>
  );
}
