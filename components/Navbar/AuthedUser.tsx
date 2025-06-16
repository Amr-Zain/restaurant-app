"use client";
import { Link } from "@/i18n/routing";
import { Button } from "../ui/button";
//import Profile from "./Profile";
import { useAuthStore } from "@/stores/auth";
import { useTranslations } from "next-intl";
//import Stores from "./stores";
import dynamic from 'next/dynamic'
 
const Stores = dynamic(() => import('./stores'), {
  loading: () => <p>Loading...</p>,
  ssr:false
})
 
const Profile = dynamic(() => import('./Profile'), {
  loading: () => <p>Loading...</p>,
  ssr:false
})

function AuthdUser() {
  const user = useAuthStore((state) => state.user);
  const T = useTranslations("NAV");

  return (
    <>
      {user?.id ? (
        <>
          <div className="nav-icon">
            <Profile />
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
