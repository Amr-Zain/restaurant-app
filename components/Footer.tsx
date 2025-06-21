import Image from "next/image";
import { Link } from "@/i18n/routing";
import Reservation from "./Navbar/Reservations";
import { getCmsPages } from "@/services/ApiHandler";
import { getTranslations } from "next-intl/server";
import { Separator } from "./ui/separator";

async function Footer({
  desc,
  logo,
  offers,
  phoneNumber,
  email,
  mainPartAvailability,
}: {
  desc: string;
  logo: string;
  offers: string;
  mainPartAvailability: boolean;
  phoneNumber: { flag: string; phone: number; phone_code: string };
  email: string;
}) {
  const t = await getTranslations("Footer");
  const cmsPages = await getCmsPages();

  const links = [
    ...cmsPages.map((item) => ({
      value: item.title,
      path: `/${item.slug}`,
    })),
  ];
  const contact = [
    {
      title: t("callCenter"),
      value: `(+${phoneNumber.phone_code}) ${phoneNumber.phone}`,
    },
    { title: t("email"), value: email },
  ];

  return (
    <footer className="text-sub mt-auto bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {mainPartAvailability && (
            <div className="space-y-4">
              <Image
                src={logo}
                width={80}
                height={80}
                alt="logo"
                className="rounded-lg"
              />
              <p className={`text-sub text-sm leading-relaxed`}>{desc}</p>
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div className="space-y-4">
              <h3 className="mb-4 text-sm font-semibold text-white uppercase">
                {t("sectionsHeading")}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/menu"
                    className="text-sub text-sm font-semibold transition-colors hover:text-white"
                  >
                    {t("menu")}
                  </Link>
                </li>
                <div className="font-semibold">
                  <Reservation />
                </div>
                {offers === "show" && (
                  <li>
                    <Link
                      href="/offers"
                      className="text-sub text-sm font-semibold transition-colors hover:text-white"
                    >
                      {t("offers")}
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="mb-4 text-sm font-bold text-white uppercase">
                {t("linksHeading")}
              </h3>
              <ul className="space-y-2">
                {links.map((item, i) => (
                  <li key={`like ${i}`}>
                    <Link
                      href={item.path}
                      className="text-sub text-sm font-semibold transition-colors hover:text-white"
                    >
                      {item.value}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="mb-4 text-sm font-bold text-white uppercase">
                {t("contactHeading")}
              </h3>
              <ul className="space-y-3">
                {contact.map((item, i) => (
                  <>
                    <li key={`contact ${i}`}>
                      <span className="block text-xs font-bold text-white uppercase">
                        {item.title}
                      </span>
                      <span className="text-sub mt-1 block text-sm font-normal">
                        {item.value}
                      </span>
                    </li>
                    {i < contact.length - 1 && (
                      <Separator className="text-gray-500 max-w-25" />
                    )}
                  </>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-between border-t border-white pt-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {t("rightsReserved")}
          </p>
          {/* <div className="flex">
            <SocialLinks className="flex gap-2" />
          </div> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
