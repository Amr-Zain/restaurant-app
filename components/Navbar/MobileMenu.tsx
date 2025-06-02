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

const MobileMenu = ({
  items,
}: {
  items: Array<{ value: string; path: string }>;
}) => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <MenuIcon className='block md:hidden w-8 h-8 text-primary cursor-pointer' aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="left" className="border-r-1 rounded-r-2xl w-70">
        {" "}
        {/*'left', 'right', 'top', or 'bottom' */}
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
                  className="text-list-color block text-base transition-colors hover:text-gray-400" // Adjusted font size
                >
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
