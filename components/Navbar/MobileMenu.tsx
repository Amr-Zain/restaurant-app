"use client";
import { Link } from "@/i18n/routing";
import SideMenu from "../general/SideMenu";
import Teleport from "../Teleport";
import { useState } from "react";
import { MenuIcon } from "../Icons";
import { useTranslations } from "next-intl";

const MobileMenu = ({
  items,
}: {
  items: Array<{ value: string; path: string }>;
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
    const t = useTranslations();

  return (
    <>
     <button
          className="text-primary focus:ring-primary block rounded-full p-2 focus:ring-1 focus:outline-none md:hidden"
          onClick={() => setShowMobileMenu(true)}
        >
          <MenuIcon aria-hidden="true" />
        </button>
   {showMobileMenu&& <Teleport to="body">
      <SideMenu close={()=>setShowMobileMenu(false)} title={t("menu")} >
        <nav >
          <ul className="flex list-none flex-col px-4">
            {items.map((item) => (
              <li onClick={()=>setShowMobileMenu(false)} key={item.path}>
                <Link
                  href={item.path}
                  className="block py-2 text-sm text-list-color transition-colors hover:text-gray-400"
                >
                  {item.value}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SideMenu>
    </Teleport>}
    </>
  );
};
export default MobileMenu;