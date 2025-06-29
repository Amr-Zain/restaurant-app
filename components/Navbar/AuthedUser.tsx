"use client";
import { Link } from "@/i18n/routing";
import { Button } from "../ui/button";
import { useAuthStore } from "@/stores/auth";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { SkeletonStore } from "../skelton/SkeltonCards";
import { useEffect, useState } from "react";

const Stores = dynamic(() => import("./stores"), {
  ssr: false,
});

const Profile = dynamic(() => import("./Profile"), {
  ssr: false,
});

function AuthdUser({ wallet, loyalCard }:{wallet:Promise<Wallet>; loyalCard:Promise<Wallet>}) {
  const user = useAuthStore((state) => state.user);
  const T = useTranslations("NAV");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
        <div className="size-8 shrink-0 animate-pulse rounded-full bg-gray-300"></div>
        <SkeletonStore />
      </>
    );
  }

  return (
    <>
      {user?.id ? (
        <>
          <Profile {...{ wallet, loyalCard }} />
          <Stores />
        </>
      ) : (
        <Link href="/auth/login">
          <Button className="!h-8 w-24 cursor-pointer rounded-full">
            {T("login")}
          </Button>
        </Link>
      )}
    </>
  );
}

export default AuthdUser;
