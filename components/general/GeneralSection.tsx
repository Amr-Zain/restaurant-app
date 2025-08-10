import React from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "../ui/button";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

import { FadeIn } from "../animations"; 

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

  let imageAnimDirection: "left" | "right" | "up";
  let contentAnimDirection: "left" | "right" | "up";

  if (animationDirection === "ltr") {
    contentAnimDirection = isImageStart ? "left" : "right";
    imageAnimDirection = isImageStart ? "right" : "left";
  } else {
    imageAnimDirection = isImageStart ? "left" : "right";
    contentAnimDirection = isImageStart ? "right" : "left";
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
            <FadeIn
              direction={imageAnimDirection}
              duration={1.3} 
              delay={0.1} 
              className={`h-full w-full ${className ? className : ""}`}
            >
              <Image
                width={560}
                height={700}
                src={item.image}
                alt={item.title||'Section Image'}
                className="mx-auto h-[700px] max-h-full w-[560px] max-w-full rounded-t-[300px] rounded-b-[300px] object-cover"
              />
            </FadeIn>
          )}

          <FadeIn
            direction={contentAnimDirection}
            duration={1.3} 
            delay={0.2}
            className={`max-w-[800px] space-y-5 bg-bottom-right bg-no-repeat`}
          >
            {item.heading && (
              <FadeIn
                direction="up" 
                delay={0.4}
                duration={0.8}
                className="font-500 text-primary flex items-center gap-4 whitespace-nowrap uppercase"
              >
                {item.heading}
                <hr className="border-primary hidden w-[50%] md:flex" />
              </FadeIn>
            )}

            <FadeIn
              direction="up" 
              delay={0.5}
              duration={1.0} 
            >
              <h3
                className="text-4xl font-extrabold"
                dangerouslySetInnerHTML={{
                  __html: item.title,
                }}
              />
            </FadeIn>

            <FadeIn
              direction="up" 
              delay={0.6} 
              duration={1.0} 
            >
              <div
                className="text-sub text-lg font-thin"
                dangerouslySetInnerHTML={{
                  __html: item.desc,
                }}
              />
            </FadeIn>

            {item.desc2 && (
              <FadeIn
                direction="up"
                delay={0.7} 
                duration={1.0}
              >
                <div className="text-sub text-lg font-thin">
                  {item.desc2}
                </div>
              </FadeIn>
            )}

            {to && (
              <FadeIn
                direction="up"
                delay={0.8} 
                duration={1.0}
              >
                <Link href={to}>
                  <Button
                    variant={"outline"}
                    className="h-14 px-6 !py-4 text-lg transition-transform hover:scale-105"
                  >
                    {t("buttons.discoverMore")}
                  </Button>
                </Link>
              </FadeIn>
            )}

            {children && (
              <FadeIn
                direction="up"
                delay={0.9} 
                duration={1.0}
              >
                {children}
              </FadeIn>
            )}
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default GeneralSection;