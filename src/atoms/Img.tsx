import Image from "next/image";
export function Img(
  props: Omit<React.ComponentProps<typeof Image>, "alt"> & { alt?: string },
) {
  return (
    <Image
      {...props}
      alt={props.alt ?? "image"}
      width={props.width ?? 256}
      height={props.height ?? 256}
    />
  );
}
