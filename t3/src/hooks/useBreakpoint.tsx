import { useMediaQuery } from "react-responsive";
import twconfig from "~/../tailwind.config"; // Your tailwind config

const breakpoints = twconfig.theme.screens;

type BreakpointKey = keyof typeof breakpoints;

export function useBreakpoint<K extends BreakpointKey>(breakpointKey: K) {
  const bool = useMediaQuery({
    query: `(min-width: ${breakpoints[breakpointKey]})`,
  });
  const capitalizedKey =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    breakpointKey[0]!.toUpperCase() + breakpointKey.substring(1);
  type Key = `is${Capitalize<K>}`;
  return {
    [`is${capitalizedKey}`]: bool,
  } as Record<Key, boolean>;
}
