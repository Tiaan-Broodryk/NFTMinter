import {
  DetailedHTMLProps,
  FormEventHandler,
  ReactNode,
  type ComponentProps,
  type HTMLAttributes,
  type ReactNode as string,
} from "react";
import { cn } from "~/utils/cn";

export function Heading(
  props: {
    id?: string;
    children?: ReactNode;
    className?: HTMLAttributes<HTMLHeadingElement>["className"];
    variant?: "h1" | "h2" | "h3" | "h4" | "h5";
    contentEditable?: boolean;
    onBlur?: FormEventHandler<HTMLHeadingElement>;
  } & DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
) {
  function render_heading() {
    if (props.variant === "h5") {
      return (
        <h5
          id={props.id}
          className={cn(
            "text w-full text-sm font-semibold  tracking-tight text-neutral-600",
            props.className,
          )}
          contentEditable={props.contentEditable}
          onBlur={props.onBlur}
          suppressContentEditableWarning={true}
          {...props}
        >
          {props.children}
        </h5>
      );
    }

    if (props.variant === "h4") {
      return (
        <h4
          id={props.id}
          className={cn(
            "text w-full text-lg font-bold uppercase tracking-tight text-neutral-700",
            props.className,
          )}
          contentEditable={props.contentEditable}
          onBlur={props.onBlur}
          suppressContentEditableWarning={true}
          {...props}
        >
          {props.children}
        </h4>
      );
    }

    if (props.variant === "h3") {
      return (
        <h3
          id={props.id}
          className={cn(
            "text w-full font-semibold text-neutral-500",
            props.className,
          )}
          contentEditable={props.contentEditable}
          onBlur={props.onBlur}
          suppressContentEditableWarning={true}
          {...props}
        >
          {props.children}
        </h3>
      );
    }

    if (props.variant === "h2") {
      return (
        <h2
          id={props.id}
          className={cn(
            "w-full text-2xl font-semibold text-neutral-900",
            props.className,
          )}
          contentEditable={props.contentEditable}
          onBlur={props.onBlur}
          suppressContentEditableWarning={true}
          {...props}
        >
          {props.children}
        </h2>
      );
    }

    return (
      <h1
        id={props.id}
        className={cn(
          "w-full text-2xl font-bold tracking-wide text-neutral-800 dark:text-emerald-500 sm:text-4xl",

          props.className,
        )}
        contentEditable={props.contentEditable}
        onBlur={props.onBlur}
        suppressContentEditableWarning={true}
        {...props}
      >
        {props.children}
      </h1>
    );
  }

  return render_heading();
}

export function H1(props: ComponentProps<typeof Heading>) {
  return <Heading variant="h1" {...props} />;
}

export function H2(props: ComponentProps<typeof Heading>) {
  return <Heading variant="h2" {...props} />;
}

export function H3(props: ComponentProps<typeof Heading>) {
  return <Heading variant="h3" {...props} />;
}

export function H4(props: ComponentProps<typeof Heading>) {
  return <Heading variant="h4" {...props} />;
}
