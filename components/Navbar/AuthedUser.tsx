"use client";
import { Link } from "@/i18n/routing";
import { Button } from "../ui/button";
import Image from "next/image";
import Pofile from "./Profile";
import { useAuthStore } from "@/stores/auth";
import profile from "@/assets/images/profile.png";
import { useTranslations } from "next-intl";
import Stores from "./stores";

function AuthdUser() {
  const user = useAuthStore((state) => state.user);
  const T = useTranslations("NAV");

  return (
    <>
      {user?.id ? (
        <>
          <div className="flex size-10 items-center justify-center rounded-full bg-[#F6F6FD] sm:size-12">
            <Pofile />
          </div>
          <div className="hidden items-center justify-center gap-2 sm:flex">
            <Image
              width={55}
              height={55}
              src={profile}
              alt="profile image"
              className="hidden size-10 rounded-full object-cover sm:block"
            />

            <Stores />
            <div className="flex items-center gap-4"></div>
          </div>
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
