import { cn } from "./cn";

export function Progressbar(props: {
  /** 0 - 100 */
  value: number;
  success?: boolean;
  className?: string;
}) {
  const value = props.success ? 100 : props.value;

  return (
    <div
      className={cn(
        "mb-5 h-1 bg-neutral-900 transition",
        value == 0 ? "opacity-0" : "opacity-100",
        props.className,
      )}
    >
      <div className="h-full bg-emerald-500" style={{ width: `${value}%` }} />
      <div className="flex">
        <span className="text-xs text-emerald-500">{Math.round(value)} %</span>
        <div className="flex-1" />
        {props.success && (
          <span className="text-right text-xs text-emerald-500">SUCCESS</span>
        )}
      </div>
    </div>
  );
}
