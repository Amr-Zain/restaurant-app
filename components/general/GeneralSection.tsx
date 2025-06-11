import React from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "../ui/button";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

type Props = {
  item: {
    image?: string | StaticImageData;
    title: string;
    heading?: string;
    desc: string;
    desc2?: string;
  };
  className?: string;
  to?: string;
  children?: React.ReactNode;
};

const GeneralSection = async ({
  item,
  className,
  to,
  children,
}: Props) => {
  const t = await getTranslations();
  const animationDirection = t("lang");
  const isImageStart = className ? false : true;

  let imageAnim ;
  let contentAnim;
  if (animationDirection === "ltr") {
    contentAnim = isImageStart ? "fade-left" : "fade-right";
    imageAnim = isImageStart ? "fade-right" : "fade-left";
  } else {
  imageAnim = isImageStart ? "fade-left" : "fade-right";
  contentAnim = isImageStart ? "fade-right" : "fade-left";
}

  return (
    <div className="my-8 bg-bottom-right bg-no-repeat">
      <div className="bg-position-[left_3rem_top] bg-no-repeat">
        <div
          className={`container items-center gap-10 bg-top-left bg-no-repeat ${
            item?.image ? "grid grid-cols-1 md:grid-cols-2" : ""
          }`}
        >
          {item.image && (
            <div
              className={`h-full w-full ${className}`}
              data-aos={imageAnim}
              data-aos-duration="1300"
              data-aos-delay="100"
            >
              <Image
                width={560}
                height={700}
                src={item.image}
                alt={item.title}
                className="mx-auto h-[700px] max-h-full w-[560px] max-w-full rounded-t-[300px] rounded-b-[300px] object-cover"
              />
            </div>
          )}

          <div
            className={`max-w-[800px] space-y-5 bg-bottom-right bg-no-repeat`}
            data-aos={contentAnim}
            data-aos-duration="1300"
            data-aos-delay="200"
          >
            {item.heading && (
              <div
                className="font-500 text-primary flex items-center gap-4 whitespace-nowrap uppercase"
                data-aos="fade-up"
                data-aos-delay="400"
                data-aos-duration="800"
              >
                {item.heading}
                <hr className="border-primary hidden w-[50%] md:flex" />
              </div>
            )}

            <h3
              className="text-4xl font-extrabold"
              dangerouslySetInnerHTML={{
                __html: item.title,
              }}
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-duration="1000"
            />

            <div
              className="text-sub text-lg font-thin"
              dangerouslySetInnerHTML={{
                __html: item.desc,
              }}
              data-aos="fade-up"
              data-aos-delay="600"
              data-aos-duration="1000"
            />

            {item.desc2 && (
              <div
                className="text-sub text-lg font-thin"
                data-aos="fade-up"
                data-aos-delay="700"
                data-aos-duration="1000"
              >
                {item.desc2}
              </div>
            )}

            {to && (
              <div
                data-aos="fade-up"
                data-aos-delay="800"
                data-aos-duration="1000"
              >
                <Link href={to}>
                  <Button
                    variant={"outline"}
                    className="h-14 px-6 !py-4 text-lg transition-transform hover:scale-105"
                  >
                    {t("buttons.discoverMore")}
                  </Button>
                </Link>
              </div>
            )}

            {children && (
              <div
                data-aos="fade-up"
                data-aos-delay="900"
                data-aos-duration="1000"
              >
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSection;
