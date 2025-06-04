
import Image from "next/image";
import Link from "@/components/LocalePath";
import LOGO from "@/assets/images/logo.png";
import DesktopNavigation from "./DesktopNav";
import CartModal from "./Cart";
import Notifications from "./Notifications";
import MobileMenu from "./MobileMenu";
import { getTranslations } from "next-intl/server";
import AuthdUser from "./AuthedUser";



async function NavBar() {
  const T = await getTranslations("NAV");
  //const user = await getUserFromCookie();
  const navItems = [
    { value: T("about"), path: "/about-us" },
    { value: T("Reservation"), path: "/reservation" },
    { value: T("Menu"), path: "/menu" },
    { value: T("contact"), path: "/contact-us" },
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

          <DesktopNavigation items={navItems} ariaLabel={T("mainNavigation")} />
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
