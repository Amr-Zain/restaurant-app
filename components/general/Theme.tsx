"use client";
import { useEffect } from "react";

function Theme({ colors }: { colors: Record<string, string> }) {
  useEffect(() => {

    for (const key in colors) {
      if (Object.hasOwnProperty.call(colors, key)) {
        const value = colors[key];
        let cssVarName: string;

        switch (key) {
          case "website_primary_color":
            cssVarName = "--color-primary";
            break;
          case "website_font_color":
            cssVarName = "--color-text";
            break;
          case "website_tertiary_color":
            cssVarName = "--sub";
            break;
          case "website_footer_color":
            cssVarName = "--footer";
            break;
          default:
            cssVarName = key
              .replace(/^website_/, "")
              .replace(/_color$/, "")
              .replace(/_/g, "-");
            cssVarName = `--${cssVarName}`;
            break;
        }
        document.body.style.setProperty(cssVarName, value);
      }
    }
  }, [colors]);

  return <></>;
}

export default Theme;
