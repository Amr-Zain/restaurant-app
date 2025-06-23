"use client";
import { Suspense, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut, Package, User, MapPin, Heart } from "lucide-react";
import { logout } from "@/services/ClientApiHandler";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Favorites from "../Favorites";
import AddressModal from "../address/AddressModal";
import DeleteAccount from "./DeleteAccount";
import { ProfileIcon } from "../Icons";
import { cn } from "@/lib/utils";
import CardModal from "./CardModal";
import Notifiable from "./Notifiable";

const Profile = ({ wallet, loyalCard }:{wallet:Promise<Wallet>; loyalCard:Promise<Wallet>}) => {
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
    toast.error(res.message || t("errors.logoutFailed"));
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
          <div className="nav-icon relative">
            <ProfileIcon />
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="rounded-r-2xl border-r-1">
          <SheetHeader>
            <SheetTitle>{t("profile.title")}</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col overflow-y-auto p-2">
            <Link
              className="nav-item gap-2 p-4"
              href={"/orders"}
              onClick={() => setProfileSheetOpen(false)}
            >
              <div className="nav-icon">
                <Package className="size-5" />
              </div>
              {t("profile.orders")}
            </Link>
            <Link
              className="nav-item gap-2 p-4"
              href={"/profile"}
              onClick={() => setProfileSheetOpen(false)}
            >
              <div className="nav-icon">
                <User className="size-5" />
              </div>
              {t("profile.myAccount")}
            </Link>
            <div
              className="nav-item p-3"
              onClick={() => handleOpenModal("address")}
            >
              <div className="nav-icon">
                <MapPin className="size-5" />
              </div>
              {t("profile.myAddress")}
            </div>
            <div
              className="nav-item p-3"
              onClick={() => handleOpenModal("favorite")}
            >
              <div className="nav-icon">
                <div className="nav-icon">
                  <Heart className="size-5" />
                </div>
              </div>
              {t("profile.favorite")}
            </div>
           <Suspense fallback={"loading..."}>
              <CardModal type="cridtCard" data={wallet} />
            </Suspense>
            <Suspense fallback={"loading..."}>
              <CardModal type="loyaltyCard" data={loyalCard}/>
            </Suspense>
            <Notifiable />
            <DeleteAccount />
            <div
              className={cn("nav-item p-3", "p-4 !text-red-600")}
              onClick={handleLogout}
            >
              <div className="nav-icon">
                <LogOut className="size-6" />
              </div>
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
export default Profile;
