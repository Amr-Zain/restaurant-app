import LocalePath from "@/components/LocalePath";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Cute from "@/assets/images/notFound.png";

export default async function NotFound() {
  const t = await getTranslations('NotFoundPage'); 

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
        <h1 className="text-text my-2 text-center text-2xl font-bold">
          {t("title")}
        </h1>
        <p>{t('description')}</p>
        <Button className="bg-primary mt-5 flex !h-10 !cursor-pointer justify-center rounded-full px-6 text-white">
          <LocalePath href="/">{t("returnHome")}</LocalePath>
        </Button>
      </div>
    </div>
  );
}