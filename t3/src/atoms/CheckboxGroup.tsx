import { Checkbox } from "./Checkbox";
import { Label } from "./Label";

export function CheckboxGroup<G>(props: {
  value: G;
  options: { label: string; value: G; description: string }[];
  onChange: (value: G) => void;
}) {
  return (
    <div className="flex flex-col gap-2 transition-all">
      {props.options.map((option) => {
        return (
          <div
            key={String(option.value)}
            className="flex cursor-pointer items-start gap-2 rounded border bg-white/50 p-2 transition-all hover:bg-sky-500/20"
            onClick={() => props.onChange(option.value)}
          >
            <Checkbox
              checked={props.value === option.value}
              onChange={() => {
                props.onChange(option.value);
              }}
              className="m-0.5"
            />
            <div className="flex flex-col">
              <span className="font-semibold">{option.label}</span>
              <p className="text-xs opacity-80">{option.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
