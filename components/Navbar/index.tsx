
import Image from "next/image";
import Link from "@/components/LocalePath";
import LOGO from "@/assets/images/logo.png";
import DesktopNavigation from "./DesktopNav";
import CartModal from "./Cart";
import Notifications from "./Notifications";
import MobileMenu from "./MobileMenu";
import { getTranslations } from "next-intl/server";
import AuthdUser from "./AuthedUser";
import { getCmsPages } from "@/services/ApiHandler";
import { Book, CalendarCheck, Info, Mail } from "lucide-react";



async function NavBar() {
  const t = await getTranslations("NAV");
  //const user = await getUserFromCookie();
  const cmsPages = await getCmsPages();

  const navItems = [
    { value: t("about"), path: "/about-us", icon: <Info className="h-4 w-4" /> },
    { value: t("Reservation"), path: "/reservation", icon: <CalendarCheck className="h-4 w-4" /> },
    { value: t("Menu"), path: "/menu", icon: <Book className="h-4 w-4" /> },
    { value: t("contact"), path: "/contact-us", icon: <Mail className="h-4 w-4" /> },
    ...cmsPages.map(item=>({value:item.title, path:`/${item.slug}`, icon:item.icon,}))
  ];

  return (
    <div className="text-sub bg-backgroud h-[4.5rem] w-full backdrop-blur-md">
      <div className="p-sec mx-auto flex h-full justify-between">
        <nav className="flex h-full items-center">
          <Link href="/" className="shrink-0 me-4">
            <Image
              src={LOGO}
              alt={"logo"}
              width={60}
              height={60}
            />
          </Link>

          <DesktopNavigation items={navItems} />
        </nav>
        <div className="flex items-center justify-center gap-2">
          <CartModal />
          <Notifications />
          <AuthdUser />
          <MobileMenu items={navItems} />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
