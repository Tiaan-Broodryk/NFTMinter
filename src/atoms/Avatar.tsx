import Image from "next/image";
import { cn } from "~/utils/cn";
export function Avatar({
  src,
  className,
  resolution = 40,
}: {
  src?: string | null;
  className?: string;
  resolution?: number;
}) {
  return (
    <Image
      src={src ?? "/user_placeholder.png"}
      alt="Logo"
      width={resolution}
      height={resolution}
      className={cn(
        "size-5 rounded-full border bg-white object-contain",
        className,
      )}
    />
  );
}
