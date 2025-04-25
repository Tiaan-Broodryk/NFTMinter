import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "../utils/cn";

export function Loading(props: { className?: string; size?: number }) {
  return (
    <AiOutlineLoading3Quarters
      className={cn(
        "animate-spin self-center text-neutral-400",
        props.className,
      )}
      size={props.size}
    />
  );
}

export function LoadingLarge(props?: { size?: number; className?: string }) {
  return (
    <div className="flex items-center justify-center py-5">
      <Loading size={props?.size ?? 50} className={props?.className} />
    </div>
  );
}

export function LoadingFullscreen(props?: { alt?: boolean }) {
  if (props?.alt) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <LoadingLarge size={75} className="text-white" />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-neutral-100">
      <LoadingLarge size={75} className="text-neutral-300" />
    </div>
  );
}
