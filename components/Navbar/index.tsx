import Image from "next/image";
import Link from "@/components/LocalePath";
import DesktopNavigation from "./DesktopNav";
import CartModal from "./Cart";
import Notifications from "./Notifications";
import MobileMenu from "./MobileMenu";
import { getTranslations } from "next-intl/server";
import AuthdUser from "./AuthedUser";
import { getCmsPages, getLoyalCard, getWallet } from "@/services/ApiHandler";
import { Book } from "lucide-react";
import LangSwitcher from "../LangSwitcher";
import { getNotifications } from "@/services/ApiHandler";

async function NavBar({
  logo,
  logoPosition,
}: {
  logo: string;
  logoPosition: string;
}) {
  const t = await getTranslations("NAV");
  const [cmsPages, notifications] = await Promise.all([
    getCmsPages(),
    getNotifications(),
  ]);
  const wallet = getWallet();
  const loyalCard = getLoyalCard();
  const navItems = [
    { value: t("Menu"), path: "/menu", icon: <Book className="h-4 w-4" /> },
    /* {
      value: t("contact"),
      path: "/contact-us",
      icon: <Mail className="h-4 w-4" />,
    }, */
    ...cmsPages.map((item) => ({
      value: item.title,
      path: `/${item.slug}`,
      icon: item.icon,
    })),
  ];

  return (
    <div className="p-sec text-sub bg-backgroud h-[4.5rem] w-full backdrop-blur-md">
      <div className={`mx-auto flex h-full items-center justify-between`}>
        <Link
          href="/"
          className={`mx-4 shrink-0 ${
            logoPosition === "right"
              ? "ltr:order-last rtl:order-1"
              : "ltr:order-1 rtl:order-last"
          }`}
        >
          <Image src={logo} alt={"logo"} width={50} height={50} />
        </Link>
        <div className="flex w-full items-center justify-between gap-2">
          <nav className="flex h-full items-center">
            <DesktopNavigation items={navItems} />
          </nav>
          <div className="flex items-center justify-center gap-2">
            <CartModal />
            <Notifications notifications={notifications} />
            <AuthdUser wallet={wallet} loyalCard={loyalCard} />
            <LangSwitcher className="text-text hover:text-primary hidden cursor-pointer transition-colors xl:flex" />

            <MobileMenu items={navItems} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
