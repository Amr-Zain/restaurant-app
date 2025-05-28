import React from "react";
import LocalePath from "./LocalePath";
import { useTranslations } from "next-intl";
import Image from "next/image";
import cuate from "@/assets/images/notFound.png";

export default function NotFound() {
  const t = useTranslations();
  return (
    <div className="container my-20">
      <div className="flex justify-center flex-col items-center">
        <Image
          width="500"
          height="500"
          src={cuate}
          alt="not found icon"
          loading="lazy"
        />
        <div className="error_section">
          <h1 className="text-center font-bold text-2xl my-4 text-text">
            {t("something went wrong")}
          </h1>
          <p className="text-center max-w-[500px] text-text-light">
            {t("pleaseKindlyTryAgain")}
          </p>
          <div className="flex justify-center mt-5">
            <LocalePath href="/" className="base-btn mx-2">
              {t("Back to home")}
            </LocalePath>
          </div>
        </div>
      </div>
    </div>
  );
}
