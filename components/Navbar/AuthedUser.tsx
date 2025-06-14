"use client";
import { Link } from "@/i18n/routing";
import { Button } from "../ui/button";
import Pofile from "./Profile";
import { useAuthStore } from "@/stores/auth";
import { useTranslations } from "next-intl";
import Stores from "./stores";

function AuthdUser() {
  const user = useAuthStore((state) => state.user);
  const T = useTranslations("NAV");

  return (
    <>
      {user?.id ? (
        <>
          <div className="nav-icon">
            <Pofile />
          </div>
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
