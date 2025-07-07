"use client";
import { Suspense } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Favorites from "../Favorites";
import AddressModal from "../address/AddressModal";
import { ProfileIcon } from "../Icons";
import { cn } from "@/lib/utils";
import CardModal from "./CardModal";
import ConfirmModal from "../general/ConfirmModal";
import { Switch } from "../ui/switch";
import { useProfile } from "@/hooks/useProfile";
import { LogOut, Package, User, MapPin, Heart } from "lucide-react";
import { Bell, Trash } from "@/components/Icons";
import { useAuthStore } from "@/stores/auth";
const Profile = ({
  wallet,
  loyalCard,
}: {
  wallet: Promise<Wallet>;
  loyalCard: Promise<Wallet>;
}) => {
  const t = useTranslations();
  const isNotifiable = useAuthStore((state) => state.user?.notifiable)!;

  const {
    addressOpen,
    confirmModalState,
    favoritesOpen,
    profileSheetOpen,
    openConfirmationModal,
    handleOpenModal,
    setProfileSheetOpen,
    setFavoritesOpen,
    setAddressOpen,
    setConfirmModalState,
  } = useProfile();

  const navItems = [
    {
      label: "profile.orders",
      icon: <Package className="size-5" />,
      href: "/orders",
      type: "link",
    },
    {
      label: "profile.myAccount",
      icon: <User className="size-5" />,
      href: "/profile",
      type: "link",
    },
    {
      label: "profile.myAddress",
      icon: <MapPin className="size-5" />,
      onClick: () => handleOpenModal("address"),
      type: "button",
    },
    {
      label: "profile.favorite",
      icon: <Heart className="size-5" />,
      onClick: () => handleOpenModal("favorite"),
      type: "button",
    },
    {
      label: "NAV.notification",
      icon: <Bell className="size-5 hover:!text-primary" />,
      type: "switch",
      checked: isNotifiable,
      onClick: () => openConfirmationModal("notify"),
    },
    {
      label: "TEXT.deleteAccount",
      icon: <Trash />,
      className: "!text-red-600",
      onClick: () => openConfirmationModal("deleteAccout"),
      type: "button",
    },
    {
      label: "buttons.logout",
      icon: <LogOut className="size-5" />,
      className: "!text-red-600",
      onClick: () => openConfirmationModal("logout"),
      type: "button",
    },
  ];
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
            <Suspense fallback={"loading..."}>
              <CardModal type="cridtCard" data={wallet} />
            </Suspense>
            <Suspense fallback={"loading..."}>
              <CardModal type="loyaltyCard" data={loyalCard} />
            </Suspense>
            {navItems.map((item, index) => (
              <div key={index}>
                {item.type === "link" ? (
                  <Link
                    className="nav-item gap-2 p-4"
                    href={item.href!}
                    onClick={() => setProfileSheetOpen(false)}
                  >
                    <div className="nav-icon">{item.icon}</div>
                    {t(item.label)}
                  </Link>
                ) : item.type === "button" ? (
                  <div
                    className={cn("nav-item p-3", item.className)}
                    onClick={item.onClick}
                  >
                    <div
                      className={cn(
                        "nav-icon",
                        item.className 
                          ? item.className
                          : "",
                      )}
                    >
                      <div className="nav-icon">{item.icon}</div>
                    </div>
                      {t(item.label)}
                  </div>
                ) : item.type === "switch" ? (
                  <div
                    className="flex items-center justify-between"
                    onClick={item.onClick}
                  >
                    <div className={"nav-item p-3"}>
                      <div className="nav-icon">{item.icon}</div>
                      {t(item.label)}
                    </div>
                    <Switch
                      dir="ltr"
                      checked={item.checked}
                      className="data-[state=checked]:bg-primary scale-120 cursor-pointer"
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <Favorites open={favoritesOpen} onOpenChange={setFavoritesOpen} />
      <AddressModal open={addressOpen} onOpenChange={setAddressOpen} />
      {confirmModalState && (
        <ConfirmModal
          open={confirmModalState.open}
          setOpen={(open: boolean) => {
            if (!open) {
              setConfirmModalState(null);
            }
          }}
          title={confirmModalState.title}
          desc={confirmModalState.desc}
          onClick={confirmModalState.onConfirm}
        />
      )}
    </>
  );
};
export default Profile;
