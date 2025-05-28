import React from "react";
import LocalePath from "@/components/LocalePath";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Cute from "@/public/assets/images/cuate.png";
import Group from "@/public/assets/images/Group.png";

export default function NotFound() {
  const t = useTranslations();
  return (
    <div className="containerr grid h-screen items-center">
      <div className="flex flex-col items-center justify-center">
        <Image
          width="500"
          height="500"
          src={Cute}
          alt="not found icon"
          loading="lazy"
        />
        {/* <div className="error_section"> */}
        <h1 className="my-4 text-center text-2xl font-bold text-text">
          {t("something went wrong")}
        </h1>
        <Image
          width="1000"
          height="1000"
          src={Group}
          alt="not found icon"
          loading="lazy"
          className="w-full"
        />

        <div className="mt-5 flex justify-center rounded-xl bg-primary px-16 py-4 text-white">
          <LocalePath href="/" className="base-btn mx-2">
            {t("Back_to_home")}
          </LocalePath>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
