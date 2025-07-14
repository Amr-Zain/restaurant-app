"use client";

import * as React from "react";
import Link from "next/link";
import { Share2, Copy, Check, X } from "lucide-react";
import { useTranslations } from "next-intl"; 
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function ShareDrawer() {
  const t = useTranslations('share'); 
  const [copied, setCopied] = React.useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const pageTitle =
    typeof document !== "undefined" ? document.title : t("checkThisOut");

  const shareOptions = [
    {
      name: t("whatsApp"),
      icon: (
        <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z" />
        </svg>
      ),
      url: `https://wa.me/?text=${encodeURIComponent(`${pageTitle} ${currentUrl}`)}`,
      bgColor: "bg-green-500 hover:bg-green-600",
    },
    {
      name: t("facebook"),
      icon: (
        <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      bgColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: t("twitter"),
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(pageTitle)}`,
      bgColor: "bg-black hover:bg-black/90",
    },
    {
      name: t("email"),
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
        </svg>
      ),
      url: `mailto:?subject=${encodeURIComponent(pageTitle)}&body=${encodeURIComponent(`I thought you might be interested in this: ${currentUrl}`)}`,
      bgColor: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="bg-primary/5 size-8 cursor-pointer rounded-full"
        >
          <Share2
            className="text-primary hover:text-primary/50 cursor-pointer"
            size={24}
          />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto max-w-150 rounded-tr-5xl">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 end-2 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
            <DrawerTitle className="text-xl text-text">
              {t("shareThisItem")}
            </DrawerTitle>
          </DrawerHeader>

          <div className=" py-4 md:p-6 pb-8">
            <div className="flex items-center justify-center space-x-4 sm:space-x-6">
              <div className="flex flex-col items-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={copyToClipboard}
                  className="size-12 sm:size-14 rounded-full border-0 cursor-pointer"
                >
                  {copied ? (
                    <Check className="size-6 text-green-600" />
                  ) : (
                    <Copy className="size-6 text-primary" />
                  )}
                </Button>
                <span className="text-xs text-primary">{t("copyLink")}</span>
              </div>

              {shareOptions.map((shareOption) => (
                <div
                  key={shareOption.name}
                  className="flex flex-col items-center"
                >
                  <Link
                    href={shareOption.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`size-12 sm:size-14 rounded-full cursor-pointer text-white flex items-center justify-center ${shareOption.bgColor} transition-colors duration-200`}
                  >
                    {shareOption.icon}
                  </Link>
                  <span className="text-xs text-primary whitespace-nowrap pt-2">
                    {shareOption.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}