"use client";
import React, { useState, PropsWithChildren } from "react";
import "@/styles/side-menu.scss";

import { TimesIcon } from "@/components/Icons";

type Props = {
  title?: string;

  close: () => void;
};

const SideMenu = ({
  title = "",
  children,
  close,
}: PropsWithChildren<Props>) => {
  const [closing, setClose] = useState(false);

  function closeMeun() {
    setClose(true);

    setTimeout(() => close(), 300);
  }

  return (
    <div className="fixed left-0 top-0 z-50 h-screen gap-5 bg-backgroud max-w-[12rem] w-[90%]">
      <div className={`side_menu relative ${closing ? "closing" : ""}`}>
        <header className="bg-website_white flex h-[90px] items-center justify-between px-3">
          {title ?? (
            <h3 className="px-2 text-3xl font-bold capitalize">{title}</h3>
          )}

          <button
            className="text-3xl font-normal"
            type="button"
            onClick={closeMeun}
          >
            <TimesIcon />
          </button>
        </header>
        <div className="side_menu_content" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
