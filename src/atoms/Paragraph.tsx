import { type DetailedHTMLProps, type HTMLAttributes } from "react";
import { cn } from "./cn";

export function Paragraph(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >,
) {
  return <p {...props} />;
}

export function P(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >,
) {
  return <Paragraph {...props} className={cn("text-xs", props.className)} />;
}
