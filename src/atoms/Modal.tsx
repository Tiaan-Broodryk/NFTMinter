import { type ReactNode } from "react";
import { Panel } from "./Panel";
import { Heading } from "./Heading";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { ButtonIcon } from "./ButtonIcon";
import { Seperator } from "./Seperator";
import { cn } from "./cn";

// ref https://mui.com/material-ui/react-modal/
export function Modal(props: {
  open: boolean;
  children: ReactNode;
  onClose?: () => void;
  onBack?: () => void;
  title?: string | ReactNode;
  type?: "over" | "right";
  className?: string;
}) {
  if (!props.open) return <></>;

  if (props.type === "right") {
    return (
      <div
        className={cn(
          "absolute bottom-0 right-0 top-0 z-[100] h-screen min-w-[35%] overflow-hidden bg-neutral-300/50 shadow-2xl backdrop-blur-sm",
          "bg-neutral-900",
        )}
      >
        <Panel className="h-full">
          <header className="flex">
            <Heading>{props.title ?? ""}</Heading>
            <ButtonIcon
              variant="subtle"
              onClick={() => {
                if (props.onClose) {
                  props.onClose();
                }
              }}
            >
              <FaTimes />
            </ButtonIcon>
          </header>
          <Seperator />
          {props.children}
        </Panel>
      </div>
    );
  }

  return (
    <>
      <div className={cn("fixed left-0 top-0 z-[100] h-screen w-screen")}>
        <div
          className="fixed left-0 top-0 h-screen w-screen transition"
          onClick={() => {
            if (props.onClose) props.onClose();
            if (props.onBack) props.onBack();
          }}
        />
        <section
          className={cn(
            "container relative z-20 mx-auto h-screen rounded-lg p-5 backdrop-blur dark:bg-neutral-900/90 md:mt-20 md:max-w-md",
            props.className,
          )}
        >
          <header className="flex items-center pb-3">
            {props.onBack && (
              <ButtonIcon
                variant="subtle"
                className="mr-2"
                onClick={props.onBack}
              >
                <FaArrowLeft />
              </ButtonIcon>
            )}

            <Heading className="capitalize" variant="h3">
              {props.title}
            </Heading>
            {props.onClose && (
              <ButtonIcon
                variant="subtle"
                onClick={() => {
                  if (props.onClose) props.onClose();
                }}
              >
                <FaTimes />
              </ButtonIcon>
            )}
          </header>
          {/* <Seperator /> */}

          {props.children}
        </section>
      </div>
    </>
  );
}
