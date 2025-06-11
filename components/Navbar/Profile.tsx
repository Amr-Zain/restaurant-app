"use client";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut } from "lucide-react";
import { logout } from "@/services/ClientApiHandler";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Favorites from "../Favorites";
import AddressModal from "../address/AddressModal";

const Pofile = () => {
  const [profileSheetOpen, setProfileSheetOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);

  const clearUser = useAuthStore((state) => state.clearUser);
  const t = useTranslations();
  const router = useRouter();

  const handleLogout = async () => {
    const res = await logout();
    if (res.status === "success") {
      toast.success(res.message);
      clearUser();
      router.refresh();
      router.replace("/auth/login");
      return;
    }
    toast.success(res.message);
  };

  const handleOpenModal = (type: "favorite" | "address") => {
    setProfileSheetOpen(false);
    setTimeout(() => {
      if (type === "favorite") setFavoritesOpen(true);
      else setAddressOpen(true);
    }, 100);
  };

  return (
    <>
      <Sheet open={profileSheetOpen} onOpenChange={setProfileSheetOpen}>
        <SheetTrigger asChild>
          <div className="relative nav-icon">
            <svg
              width="24"
              height="25"
              className="text-[#BDC1DF]"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1211 11.6182L12.1514 11.6201H12.1221C12.0877 11.6166 12.0535 11.614 12.0195 11.6133C12.0511 11.6139 12.0867 11.6155 12.1211 11.6182ZM11.9893 11.6123C11.9817 11.6123 11.9743 11.6131 11.9668 11.6133L11.9697 11.6123H11.9893ZM12.4014 11.6055C12.3822 11.6071 12.363 11.608 12.3438 11.6094C12.363 11.6079 12.3822 11.6072 12.4014 11.6055ZM12.6201 11.5811C12.5948 11.5845 12.5694 11.5868 12.5439 11.5898C12.5694 11.5868 12.5948 11.5845 12.6201 11.5811ZM12.8584 11.542C12.8121 11.5508 12.7655 11.558 12.7188 11.5654C12.7655 11.5579 12.8122 11.551 12.8584 11.542ZM16.3877 7.85156C16.1077 9.71159 14.6969 11.1834 12.873 11.5391C14.7003 11.1782 16.1077 9.7 16.3877 7.84961V7.85156ZM7.58008 7.63477C7.64823 8.32977 7.87584 8.97558 8.22461 9.53711C7.91108 9.03416 7.69641 8.46422 7.60645 7.85254L7.58008 7.63477ZM16.4326 7.41211L16.415 7.63379C16.4298 7.48904 16.4377 7.34184 16.4385 7.19336L16.4326 7.41211ZM7.8291 5.66699C7.7542 5.8708 7.69391 6.08149 7.64941 6.29785L7.61035 6.51562C7.65539 6.22208 7.72923 5.93791 7.8291 5.66602V5.66699ZM13.5225 3.02051C14.9494 3.54458 16.0362 4.78181 16.3477 6.29688L16.3877 6.51562C16.1511 4.97569 15.1171 3.69101 13.7236 3.09961L13.5225 3.02051ZM11.3242 2.80176C9.85771 3.02716 8.62319 3.97514 7.99805 5.26855L7.9082 5.46484C8.47104 4.13746 9.66241 3.13743 11.1055 2.84082L11.3242 2.80176ZM12.8916 2.84082C12.9639 2.85567 13.0355 2.87229 13.1064 2.89062L13.3164 2.9502C13.2469 2.92846 13.1764 2.90897 13.1055 2.89062L12.8916 2.84082Z"
                stroke="#BDC1DF"
                strokeWidth="1.5"
              />
              <path
                d="M7.16309 21.1836L6.76855 21.7715L6.77051 21.7686L7.16309 21.1826V21.1836ZM5.92773 20.0078C5.91435 19.9887 5.90158 19.9694 5.88867 19.9502C5.90159 19.9694 5.91441 19.9888 5.92773 20.0078ZM5.8125 19.832C5.79926 19.8106 5.7861 19.7892 5.77344 19.7676C5.78612 19.7892 5.79931 19.8106 5.8125 19.832ZM5.71289 19.6602C5.69598 19.6287 5.67977 19.5971 5.66406 19.5654C5.67984 19.5972 5.69603 19.6288 5.71289 19.6602ZM5.61719 19.4658C5.60303 19.4346 5.58919 19.4035 5.57617 19.3721C5.58926 19.4035 5.60305 19.4347 5.61719 19.4658ZM5.53516 19.2686C5.52296 19.2358 5.51196 19.2028 5.50098 19.1699C5.51203 19.2029 5.52296 19.2359 5.53516 19.2686ZM5.46094 19.043C5.45724 19.03 5.45371 19.0169 5.4502 19.0039C5.45372 19.0169 5.45723 19.03 5.46094 19.043ZM5.41602 18.8643C5.40895 18.8318 5.40339 18.7992 5.39746 18.7666C5.40339 18.7993 5.40897 18.8319 5.41602 18.8643ZM5.37793 18.6504C5.37306 18.6156 5.3698 18.5807 5.36621 18.5459C5.36976 18.5809 5.37311 18.6157 5.37793 18.6504ZM5.34961 18.2549C5.34961 18.2533 5.34961 18.2516 5.34961 18.25C5.34961 17.1851 5.93496 16.128 7.16699 15.3037L7.16602 15.3027C8.51807 14.4067 10.3302 13.9376 12.1768 13.9375C13.9091 13.9375 15.6056 14.351 16.916 15.1406L17.1729 15.3037H17.1738C18.3989 16.1204 18.9893 17.1696 18.9893 18.2305C18.9893 18.2337 18.9893 18.237 18.9893 18.2402L18.9814 18.0195C18.8965 16.9284 18.1854 15.9869 17.1748 15.3164H17.1758C15.7791 14.3853 13.9518 13.9454 12.1699 13.9453C10.4993 13.9453 8.78884 14.3319 7.43066 15.1475L7.16406 15.3164C6.07345 16.0435 5.35167 17.0665 5.34961 18.2549ZM5.35742 18.457C5.3542 18.4122 5.35268 18.3672 5.35156 18.3223C5.35255 18.3674 5.35432 18.4123 5.35742 18.457Z"
                stroke="#BDC1DF"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="rounded-r-2xl border-r-1">
          <SheetHeader>
            <SheetTitle>{t("profile.title")}</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col justify-between p-4">
            <div className="flex flex-col gap-2 p-4">
              <Link
                className="text-text hover:text-primary flex cursor-pointer items-center gap-1 text-base transition-colors"
                href={"/orders"}
                onClick={() => setProfileSheetOpen(false)} // Close sheet on navigation
              >
                {t("profile.orders")}
              </Link>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <Link
                className="text-text hover:text-primary flex cursor-pointer items-center gap-1 text-base transition-colors"
                href={"/profile"}
                onClick={() => setProfileSheetOpen(false)}
              >
                {t("profile.myAccount")}
              </Link>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <div
                className="text-text hover:text-primary flex cursor-pointer items-center gap-1 text-base transition-colors"
                onClick={()=>handleOpenModal("address")}
              >
                {t("profile.myAddress")}
              </div>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <div
                className="text-text hover:text-primary flex cursor-pointer items-center gap-1 text-base transition-colors"
                onClick={()=>handleOpenModal("favorite")}
              >
                {t("profile.favorite")}
              </div>
            </div>
            <div
              className="text-text hover:text-primary flex cursor-pointer items-center gap-1 text-base transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="size-6" />
              <div>{t("buttons.logout")}</div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Favorites open={favoritesOpen} onOpenChange={setFavoritesOpen} />
      <AddressModal open={addressOpen} onOpenChange={setAddressOpen} />
    </>
  );
};
export default Pofile;
