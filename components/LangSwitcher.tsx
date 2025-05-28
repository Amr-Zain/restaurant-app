"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useLocale, useTranslations } from "next-intl";
import { Internet } from "@/components/Icons";

const LangSwitcher: React.FC<{ className?: string }> = ({ className = "" }) => {
  const locale = useLocale();

  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const setLanguage = (locale: string) => {
    const lang = locale === "en" ? "ar" : "en";

    Cookies.set("NEXT_LOCALE", lang);
    if (pathname.includes("/ar")) {
      router.push(`/${lang}/${pathname.slice(3)}`);
    } else {
      router.push(`/${lang}/${pathname}`);
    }
  };

  return (
    <button
      className={`flex items-center justify-center gap-1 text-sm font-bold text-text ${className}`}
      onClick={() => setLanguage(locale)}
    >
      <Internet />
      <span className="inline-flex leading-none">{t(`locale.${locale}`)}</span>
    </button>
  );
};

export default LangSwitcher;
