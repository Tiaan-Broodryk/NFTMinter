import { BiCheck, BiMinus } from "react-icons/bi";
import { cn } from "~/utils/cn";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

export type TrueFalseNull = boolean | null | undefined;

export function Checkbox(
  props: { size?: number; className?: string } & (
    | {
        checked: TrueFalseNull;
        onChange?: (value: TrueFalseNull) => void;
        threestates: true;
      }
    | {
        checked: boolean;
        onChange?: (value: boolean) => void;
        threestates?: false;
      }
  ),
) {
  // const [state, setState] = useState<boolean | null>(props.checked);

  const state = props.checked;

  return (
    <div>
      <div
        onClick={() => {
          if (!props.threestates) {
            const newstate = !state;
            // setState(newstate);
            if (props.onChange) props.onChange(newstate);
          }

          if (props.threestates) {
            let newstate: TrueFalseNull = true;

            switch (state) {
              case true:
                newstate = false;
                break;
              case false:
                newstate = null;
                break;
              case null:
                newstate = true;
                break;
              default:
                break;
            }

            // setState(newstate);
            if (props.onChange) props.onChange(newstate);
          }
        }}
        className={cn(
          "flex aspect-square h-5 w-5 cursor-pointer items-center justify-center rounded",
          "select-none bg-neutral-100 text-white",
          state && "bg-sky-500 hover:bg-sky-500",
          state === false && "text-neutral-300 hover:text-neutral-400",
          state === null && "bg-neutral-300 hover:bg-neutral-400",
          props.className,
        )}
      >
        {state === true && <BiCheck size={props.size ?? 20} />}
        {state === false && (
          <MdOutlineCheckBoxOutlineBlank size={props.size ?? 20} />
        )}
        {(state === null || state === undefined) && (
          <BiMinus size={props.size ?? 20} />
        )}
      </div>
    </div>
  );
}
