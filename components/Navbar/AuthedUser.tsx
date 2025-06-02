'use client';
import { Link } from "@/i18n/routing";
import { Button } from "../ui/button";
import Image from "next/image";
import Pofile from "./Profile";
import { useAuthStore } from "@/stores/auth";
import profile from "@/assets/images/profile.png";
import { useTranslations } from "next-intl";

function AuthdUser() {
      const user = useAuthStore(state=>state.user);
  const T = useTranslations("NAV");

    return (  <>
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
                  className="hidden object-cover size-10 rounded-full sm:block"
                />

                <div>
                  <h3 className="text-text">{user.full_name}</h3>
                  <div className="text-sub flex w-24 items-center gap-1">
                    <div className="truncate text-sm !text-ellipsis">
                      Dubai Mall and adjacent to Burj Khalifa,{" "}
                    </div>
                    <span>
                      <svg
                        width="15"
                        height="10"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.665235 0.704804C0.665235 0.609804 0.700234 0.514804 0.775234 0.439804C0.920235 0.294804 1.16023 0.294804 1.30523 0.439804L4.56523 3.69981C4.80523 3.93981 5.19523 3.93981 5.43523 3.69981L8.69523 0.439805C8.84023 0.294805 9.08023 0.294805 9.22523 0.439805C9.37023 0.584805 9.37023 0.824805 9.22523 0.969805L5.96523 4.22981C5.71023 4.48481 5.36523 4.62981 5.00023 4.62981C4.63523 4.62981 4.29023 4.48981 4.03523 4.22981L0.775234 0.969804C0.705235 0.894804 0.665235 0.799804 0.665235 0.704804Z"
                          fill="#BDC1DF"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4"></div>
              </div>
            </>
          ) : (
            <Link href="/auth/login">
              <Button className="!h-8 w-24 cursor-pointer rounded-full">
                {T("login")}
              </Button>
            </Link>
          )}</>);
}

export default AuthdUser;