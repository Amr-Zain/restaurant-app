"use client";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import { useTranslations } from "next-intl";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CalendarCheck, MenuIcon } from "lucide-react";
import Image from "next/image";
import Reservation from "./Reservations";
import LangSwitcher from "../LangSwitcher";
interface NavItem {
  value: string;
  path: string;
  icon: React.ReactNode | string;
}

const MobileMenu = ({ items }: { items: NavItem[] }) => {
  const t = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild>
        <MenuIcon
          className="text-primary block size-6 sm:size-8 cursor-pointer xl:hidden"
          aria-hidden="true"
        />
      </SheetTrigger>
      <SheetContent side="left" className="w-70 rounded-r-2xl border-r-1">
        <SheetHeader>
          <SheetTitle>{t("NAV.Menu")}</SheetTitle>
        </SheetHeader>
        <nav className=" overflow-y-auto">
          <ul className="flex list-none flex-col gap-2 p-2">
            <li className="nav-item p-2"> 
              <div className="nav-icon !size-10"> 
                <CalendarCheck className="size-5" />
              </div>
              <Reservation />
            </li>

            {items.map((item,i) => (
              <li key={item.path+i}>
                <Link
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="nav-item p-2"
                >
                  {item.icon && (
                    <div className="nav-icon !size-10"> 
                      {typeof item.icon === "string" ? (
                        <Image
                          src={item.icon}
                          width={20}
                          height={20}
                          alt={`${item.value} icon`}
                          className="size-5 object-contain" 
                        />
                      ) : (
                        item.icon
                      )}
                    </div>
                  )}
                  {item.value}
                </Link>
              </li>
            ))}
            
            <LangSwitcher className='justify-start ps-4' />
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;