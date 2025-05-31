
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

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";
  console.log(isArabic);

  return {
    title: "title",
    description: "Desc",
    icons: {
      icon: "/logo.png",
    },
    openGraph: {
      title: "title",
      description: "Desc",
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
  const { locale } = await params;
  const messages = await getMessages({ locale: locale });
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className="bg-backgroud overflow-x-hidden ">
        <NextIntlClientProvider messages={messages}>
          <ToastProvider>
            <AosWrapper>
              <div className="flex min-h-screen flex-col" id="app_wrapper">
                {children}
                <Toaster position="top-right" />
              </div>
            </AosWrapper>
            <ScrollBtn />
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
