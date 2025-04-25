import React, { type ReactNode, useEffect, useState } from "react";

export function NoSSR(props: { children: ReactNode }) {
  const [showChild, setShowChild] = useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    if (!showChild) setShowChild(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return <></>;
  }

  return <>{props.children}</>;
}
