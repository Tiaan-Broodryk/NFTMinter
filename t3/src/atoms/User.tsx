import { Avatar } from "./Avatar";

export function User(props: {
  user?:
    | {
        image?: string | null;
        email?: string | null | undefined;
        name?: string | null | undefined;
      }
    | null
    | undefined;
}) {
  if (!props.user) {
    return null;
  }
  return (
    <div className="flex items-center gap-1 text-xs">
      {props.user.image && <Avatar src={props.user.image} className="size-3" />}
      <span>{props.user.name}</span>
    </div>
  );
}
