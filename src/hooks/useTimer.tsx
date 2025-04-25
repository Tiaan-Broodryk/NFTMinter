import { useEffect, useState } from "react";

export function useTimer(props?: { speed?: number }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setFrame((frame) => frame + 1);
      },
      props?.speed ?? 100,
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  function set(frame?: number) {
    setFrame(frame ?? 0);
  }

  return { frame, set, reset: set };
}
