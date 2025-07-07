import { useRouter } from "@/i18n/routing";
import { deleteAccount, logout } from "@/services/ClientApiHandler";
import { useAuthStore } from "@/stores/auth";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";


export const useProfile = () => {
  const [profileSheetOpen, setProfileSheetOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [confirmModalState, setConfirmModalState] = useState<{
    type: "logout" | "notify" | "deleteAccout";
    title: string;
    open: boolean;
    desc: string;
    onConfirm: () => Promise<void>;
  } | null>(null);

  const clearUser = useAuthStore((state) => state.clearUser);
  const taggleNotify = useAuthStore((state) => state.setNotifiable);

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

  const handleDeleteAccount = async () => {
    try {
      const res = await deleteAccount();
      if (res.status === "success") {
        toast.success(res.message);
        clearUser();
        router.replace("/");
      } else {
        toast.error(res.message || t("errors.deleteAccountFailed"));
      }
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : t("errors.deleteAccountFailed"),
      );
    } finally {
      setConfirmModalState(null);
    }
  };

  const handleOpenModal = (type: "favorite" | "address") => {
    setProfileSheetOpen(false);
    setTimeout(() => {
      if (type === "favorite") setFavoritesOpen(true);
      else setAddressOpen(true);
    }, 100);
  };

  const openConfirmationModal = (
    type: "logout" | "notify" | "deleteAccout",
  ) => {
    let title = "";
    let desc = "";
    let onConfirm: () => Promise<void>;

    switch (type) {
      case "logout":
        title = t("confirmModal.logoutTitle");
        desc = t("confirmModal.logoutDesc");
        onConfirm = handleLogout;
        break;
      case "deleteAccout":
        title = t("TEXT.deleteAccount");
        desc = t("TEXT.deleteAccountDesc");
        onConfirm = handleDeleteAccount;
        break;
      case "notify":
        title = t("TEXT.changeNotifications");
        desc = t("TEXT.changeNotificationsDesc");
        onConfirm = taggleNotify;
        break;
      default:
        return;
    }

    setConfirmModalState({
      open: true,
      type,
      title,
      desc,
      onConfirm,
    });
  };

  return {
    profileSheetOpen,
    favoritesOpen,
    addressOpen,
    handleOpenModal,
    openConfirmationModal,
    confirmModalState,
    setProfileSheetOpen,
    setConfirmModalState,
    setFavoritesOpen,
    setAddressOpen,
  };
};
