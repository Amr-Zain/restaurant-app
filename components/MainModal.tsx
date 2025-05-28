import React, { PropsWithChildren } from "react";
import { TimesIcon } from "./Icons";

type Props = {
  closeBtn?: boolean;
  close: () => void;
  presist?: boolean;
};
export default function MainModal({
  closeBtn = true,
  children,
  close,
  presist = false,
}: PropsWithChildren<Props>) {
  return (
    <div
      className="main-modal fixed left-0 top-0 z-99999 flex h-screen w-screen flex-col items-center justify-center gap-5 bg-[#00000071]"
      onClick={() => (presist ? "" : close())}
    >
      {closeBtn && (
        <button
          className="text-4xl font-medium text-gray-200"
          type="button"
          onClick={close}
        >
          <TimesIcon className="text-white" />
        </button>
      )}

      {children}
    </div>
  );
}
