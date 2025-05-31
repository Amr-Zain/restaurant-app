import React from "react";
import LocalePath from "./LocalePath";
import { useTranslations } from "next-intl";
import Image from "next/image";
import cuate from "@/assets/images/notFound.png";

export default function NotFound() {
  const t = useTranslations();
  return (
    <div className="container my-20">
      <div className="flex flex-col items-center justify-center">
        <Image
          width="500"
          height="500"
          src={cuate}
          alt="not found icon"
          loading="lazy"
        />
        <div className="error_section">
          <h1 className="text-text my-4 text-center text-2xl font-bold">
            {t("something went wrong")}
          </h1>
          <p className="text-text-light max-w-[500px] text-center">
            {t("pleaseKindlyTryAgain")}
          </p>
          <div className="mt-5 flex justify-center">
            <LocalePath href="/" className="base-btn mx-2">
              {t("Back to home")}
            </LocalePath>
          </div>
        </div>
      </div>
    </div>
  );
}
