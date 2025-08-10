"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ArrowRight } from "../Icons";
import { FadeIn, ScaleIn } from "../animations";
function SliderSection({
  title,
  to,
  items,
}: {
  title: string;
  to: string;
  items: React.ReactNode[];
}) {
  const [, setApi] = useState<CarouselApi>();
  const t = useTranslations();
/* 
  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [api]); */

  if (!items.length) return null;

  return (
    <div className="p-sec">
      <FadeIn
        direction="up"
        delay={0.1}
        duration={0.6}
        className="mb-4 flex items-center justify-between"
      >
        <FadeIn
          direction="left"
          delay={0.2}
          duration={0.6}
          className="text-text text-2xl font-bold md:text-4xl md:font-bold"
        >
          {title}
        </FadeIn>
        <FadeIn
          direction="right"
          delay={0.2}
          duration={0.6}
        >
          <Link
            href={to}
            className="text-primary flex cursor-pointer items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80 md:text-lg"
          >
            {t("TEXT.viewAll") + " "}
            <span className={"rtl:rotate-180"}>
              <ArrowRight />
            </span>
          </Link>
        </FadeIn>
      </FadeIn>

      <FadeIn
        direction="up"
        delay={0.3}
        duration={0.6}
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-1">
            {items.map((item, index) => (
              <CarouselItem
                key={index}
                className="basis-4/5 pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/5 2xl:basis-1/6"
              >
                <ScaleIn
                  initialScale={0.8}
                  duration={0.5}
                  delay={0.4 + index * 0.1} 
                  className="pb-10"
                >
                  {item}
                </ScaleIn>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/*  <CarouselPrevious className="hidden sm:flex -left-4 h-10 w-10" />
          <CarouselNext className="hidden sm:flex -right-4 h-10 w-10" /> */}
        </Carousel>
      </FadeIn>
    </div>
  );
}

export default SliderSection;