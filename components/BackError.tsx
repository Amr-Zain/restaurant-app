"use client";
import { useTranslations } from "next-intl";
import React from "react";
import ErrorImage from "@/assets/media/images/error.png";
import ConnectionImage from "@/assets/media/images/connection.png";
import Image from "next/image";

const BackError = () => {
  const t = useTranslations();
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center">
      <div className="text-center space-y-6 w-full">
        <Image src={ErrorImage} alt="connection" className="m-auto" />
        <h3 className="font-bold text-[44px] text-center capitalize">
          {t("TITLES.Internal server error")}
        </h3>
        <Image src={ConnectionImage} alt="connection" className="w-full" />
        <p className="max-w-[423px] m-auto">{t("LABELS.errorDesc")}</p>
      </div>
    </div>
  );
};

export default BackError;
