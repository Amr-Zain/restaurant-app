import React from "react";
import LocalePath from "@/components/LocalePath";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Cute from "@/assets/images/notFound.png";
import Group from "@/public/assets/images/Group.png";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations();
  return (
    <div className="containerr grid h-screen items-center">
      <div className="flex flex-col items-center justify-start">
        <Image
          width="500"
          height="500"
          src={Cute}
          alt="not found icon"
          loading="lazy"
        />
        {/* <div className="error_section"> */}
        <h1 className="text-text my-2 text-center text-2xl font-bold">
          {t("something went wrong")}
        </h1>

        <Button className="bg-primary mt-5 flex !h-10 !cursor-pointer justify-center rounded-full px-6 text-white">
          <LocalePath href="/">{t("Back_to_home")}</LocalePath>
        </Button>
        {/* </div> */}
      </div>
    </div>
  );
}
