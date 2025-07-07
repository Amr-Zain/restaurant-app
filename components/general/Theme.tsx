"use client";
import { useLayoutEffect } from "react";

function Theme({ colors }: { colors: Record<string, string> }) {
   useLayoutEffect(() => {

    for (const key in colors) {
      if (Object.hasOwnProperty.call(colors, key)) {
        const value = colors[key];
        document.documentElement.style.setProperty(`--${key}`, value);
      }
    }
  }, [colors]);

  return <></>;
}

export default Theme;
