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
import { MenuIcon } from "lucide-react";
import Image from "next/image";

interface NavItem {
  value: string;
  path: string;
  icon: React.ReactNode | string;
}

const MobileMenu = ({ items }: { items: NavItem[] }) => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <MenuIcon
          className="text-primary block h-8 w-8 cursor-pointer lg:hidden"
          aria-hidden="true"
        />
      </SheetTrigger>
      <SheetContent side="left" className="w-70 rounded-r-2xl border-r-1">
        <SheetHeader>
          <SheetTitle>{t("NAV.Menu")}</SheetTitle>
        </SheetHeader>
        <nav>
          <ul className="flex list-none flex-col gap-2 p-4">
            {items.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  onClick={() => setOpen(false)}
                  className="text-text hover:text-primary flex items-center gap-2 text-base transition-colors"
                >
                  {item.icon && (
                    <span className="flex-shrink-0">
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
                    </span>
                  )}
                  {item.value}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
