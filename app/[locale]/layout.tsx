
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import type { Metadata } from "next";

import AosWrapper from "@/components/layout/AosWrapper";
import ScrollBtn from "@/components/layout/ScrollBtn";
import ToastProvider from "@/utils/providers/toastProvider";
import "animate.css";
import "aos/dist/aos.css";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import Location from "@/components/Location";
import { getSettingsData } from "@/services/ApiHandler";
import Theme from "@/components/general/Theme";

export async function generateMetadata( ): Promise<Metadata> {
  const websiteSetting = (await getSettingsData()).website_setting;
  return {
    
    title: websiteSetting.website_title,
    description: websiteSetting.footer_desc,
    icons: {
      icon: websiteSetting.website_fav_icon,
    },
    
    openGraph: {
      title: websiteSetting.website_title,
      description: websiteSetting.footer_desc,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const setting = await getSettingsData();
  const defaultLanguage = setting.website_setting .website_default_language
  const { locale } = await params;
  const messages = await getMessages({ locale: locale||defaultLanguage });
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <link rel="icon" href={setting.website_setting .website_fav_icon} />
      </head>
      <body className="bg-backgroud overflow-x-hidden ">
        <NextIntlClientProvider messages={messages}>
          <ToastProvider>
            <AosWrapper>
              <div className="flex min-h-screen flex-col" id="app_wrapper">
                {children}
                <Toaster position="top-right" />
                <Theme colors = {setting.website_colors}/>
                <Location />
              </div>
            </AosWrapper>
            <ScrollBtn />
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
