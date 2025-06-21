import Image from "next/image";
import Link from "@/components/LocalePath";
import DesktopNavigation from "./DesktopNav";
import CartModal from "./Cart";
import Notifications from "./Notifications";
import MobileMenu from "./MobileMenu";
import { getTranslations } from "next-intl/server";
import AuthdUser from "./AuthedUser";
import { getCmsPages } from "@/services/ApiHandler";
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
  const cmsPages = await getCmsPages();
  const notifications = await getNotifications();
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
  const logoOrder =
    (logoPosition === "left" && t("lang") === "ltr") ||
    (logoPosition === "right" && t("lang") === "rtl")
      ? "order-1"
      : "order-last";
  
  return (
    <div className="p-sec text-sub bg-backgroud h-[4.5rem] w-full backdrop-blur-md">
      <div className={`mx-auto flex h-full items-center justify-${logoOrder==='order-1'?"start":'end'}`}>
        <Link href="/" className={`mx-4 shrink-0 ${logoOrder}`}>
          <Image src={logo} alt={"logo"} width={50} height={50} />
        </Link>
        <div className="flex items-center justify-between w-full gap-2">
          <nav className="flex h-full items-center">
            <DesktopNavigation items={navItems} />
          </nav>
          <div className="flex items-center justify-center gap-2">
            <CartModal />
            <Notifications notifications={notifications} />
            <AuthdUser />
            <LangSwitcher className="text-text hover:text-primary hidden cursor-pointer transition-colors xl:flex" />

            <MobileMenu items={navItems} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
