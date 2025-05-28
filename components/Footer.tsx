import { useTranslations } from "next-intl";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { Link } from "@/i18n/routing";
import SocialLinks from "./general/SocialLinks";

function Footer() {
  const t = useTranslations("Footer");

  const sections = [t("menu"), t("offers"), t("reservation"), t("favorite")];
  const links = [t("privacyPolicy"), t("faqs"), t("termsConditions")];
  const contact = [
    { title: t("callCenter"), value: "(13) 3078-6114" },
    { title: t("email"), value: "michelle.rivera@example.com" },
  ];

  return (
    <footer className="text-sub mt-auto bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* About Section */}
          <div className="space-y-4">
            <Image
              src={logo}
              width={80}
              height={80}
              alt="logo"
              className="rounded-lg"
            />
            <p className={`text-sub text-sm leading-relaxed`}>
              {t("description")}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="mb-4 text-sm font-semibold text-white uppercase">
              {t("sectionsHeading")}
            </h3>
            <ul className="space-y-2">
              {sections.map((item, i) => (
                <li key={i}>
                  <Link
                    href="#"
                    className="text-sub text-sm transition-colors hover:text-white"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="mb-4 text-sm font-semibold text-white uppercase">
              {t("linksHeading")}
            </h3>
            <ul className="space-y-2">
              {links.map((item, i) => (
                <li key={i}>
                  <Link
                    href="#"
                    className="text-sub text-sm transition-colors hover:text-white"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="mb-4 text-sm font-semibold text-white uppercase">
              {t("contactHeading")}
            </h3>
            <ul className="space-y-3">
              {contact.map((item, i) => (
                <li key={i}>
                  <span className="block text-xs font-medium text-white uppercase">
                    {item.title}
                  </span>
                  <span className="text-sub mt-1 block text-sm">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-between border-t border-white pt-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {t("rightsReserved")}
          </p>
          <div className="flex">
            <SocialLinks className="flex gap-2" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
