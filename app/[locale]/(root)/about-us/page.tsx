import GeneralSection from "@/components/general/GeneralSection";
import HeroSection from "@/components/general/HeroSection";
import { getTranslations } from "next-intl/server";
import img from "@/assets/images/about/about2.jpg";
import img2 from "@/assets/images/about/about1.jpg";
export default async function AboutPage() {
  const t = await getTranslations();

  return (
    <div className="space-y-16">
      <HeroSection
        title={t("NAV.about")}
        home={t("NAV.home")}
        section={t("NAV.about")}
        href="/about"
      />
      <div className="p-sec mx-auto space-y-12">
        <GeneralSection
          item={{
            title: "We Provide Good Food For Your Family!",
            heading: "HEY! WELCOME TO mea telecom",
            desc: `We see our customers as invited guests to a party, and we are the hosts.
         It's our job every day to make every important aspect of the customer experience a little bit better.
          Donec quam felis, ultricies nec, pellentesque eu.',heading:"Food is the foundation of true happiness.
           Lorem ipsum dolor sit amet, consectetuer adipiscing elit aenean commodo.`,
            desc2: `We see our customers as invited guests to a party, and we are the hosts. 
           It's our job every day to make every important aspect of the customer experience a little bit better.
            Donec quam felis, ultricies nec, pellentesque eu.`,
            image: img,
          }}
        />
        <GeneralSection
          item={{
            title:
              "We make a small, intimate, and inviting space for an unforgettable meal",
            desc: `Food is the foundation of true happiness. Lorem ipsum dolor sit amet, consectetuer adipiscing elit aenean commodo.`,
            desc2: `We see our customers as invited guests to a party, and we are the hosts. 
            It’s our job every day to make every important aspect of the customer experience 
            a little bit better. Donec quam felis, ultricies nec, pellentesque eu.`,
          }}
        />
        <GeneralSection
          item={{
            title: "We Provide Good Food For Your Family!",
            heading: "HEY! WELCOME TO mea telecom",
            desc: `We see our customers as invited guests to a party, and we are the hosts.
         It's our job every day to make every important aspect of the customer experience a little bit better.
          Donec quam felis, ultricies nec, pellentesque eu.',heading:"Food is the foundation of true happiness.
           Lorem ipsum dolor sit amet, consectetuer adipiscing elit aenean commodo.`,
            desc2: `We see our customers as invited guests to a party, and we are the hosts. 
           It's our job every day to make every important aspect of the customer experience a little bit better.
            Donec quam felis, ultricies nec, pellentesque eu.`,
            image: img2,
          }}
        />
        <GeneralSection
          item={{
            title:
              "Immerse yourself in an experience that transcends the ordinary",
            desc: `Food is the foundation of true happiness. Lorem ipsum dolor sit amet, consectetuer adipiscing elit aenean commodo.`,
            desc2: `We see our customers as invited guests to a party, and we are the hosts. 
            It’s our job every day to make every important aspect of the customer experience 
            a little bit better. Donec quam felis, ultricies nec, pellentesque eu.`,
          }}
        />
      </div>
    </div>
  );
}
