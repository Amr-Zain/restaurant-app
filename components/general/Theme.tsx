"use client";
import { useEffect } from "react";

function Theme({ colors }: { colors: Record<string, string> }) {
  useEffect(() => {

    for (const key in colors) {
      console.log(key)
      if (Object.hasOwnProperty.call(colors, key)) {
        const value = colors[key];
        document.documentElement.style.setProperty(`--${key}`, value);
        console.log(key,document.documentElement.style.getPropertyValue(`--${key}`));
      }
    }
  }, [colors]);

  return <></>;
}

export default Theme;
