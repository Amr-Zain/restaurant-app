"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
// import { DeclineArrow } from "../Icons";

const HomeSlider = ({
  slides,
}: {
  slides: { image: string; title: string; desc: string; id: number }[];
}) => {
  const t = useTranslations();
  const [api, setApi] = React.useState<CarouselApi>();


  React.useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    const handlePointerDown = () => {
      clearInterval(interval);
    };

    api.on("pointerDown", handlePointerDown);

    return () => {
      clearInterval(interval);
      api.off("pointerDown", handlePointerDown);
    };
  }, [api]);
  return (
    <Carousel
      setApi={setApi}
      opts={{
        loop: true,
      }}
      className="relative mx-auto h-[90vh] w-full"
    >
      <CarouselContent className="!h-full">
        {slides.map((slide, index) => (
          <CarouselItem key={`slider-${slide.id}`} className="h-full">
            <div className="relative h-full w-full">
              <div className="h-full w-full">
                <Image
                  src={slide.image}
                  alt={`slider image ${index}`}
                  className="h-full w-full object-cover"
                  width={1920}
                  height={1080}
                  priority={index === 0}
                />
              </div>

              <div className="absolute inset-0 z-10 bg-black/60"></div>

              <div className="absolute top-[50%] left-[50%] z-20 flex w-full translate-x-[-50%] translate-y-[-50%] flex-col gap-3 px-4 text-center text-white">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  dangerouslySetInnerHTML={{
                    __html: slide.title,
                  }}
                  className="font-Allura text-4xl md:text-6xl"
                />
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  dangerouslySetInnerHTML={{
                    __html: slide.desc,
                  }}
                  className="mx-auto max-w-70 md:max-w-sm"
                />
               {/*  <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                >
                  <Link
                    href="/menu"
                    className="flex justify-center gap-2 underline transition-opacity hover:opacity-80"
                  >
                    {t("buttons.discoverMore")} <DeclineArrow />
                  </Link>
                </motion.div> */}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="absolute right-0 bottom-0 left-0 z-20 flex items-center justify-between p-4">
        <div></div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex gap-2"
        >
          <CarouselPrevious
            className={`static mr-0 h-8 w-8 translate-x-0 translate-y-0 cursor-pointer rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 ${t("lang") === "rtl" ? "rotate-180" : ""}`}
          >
            <ChevronLeft className="h-6 w-6" />
          </CarouselPrevious>
          <CarouselNext
            className={`static h-8 w-8 translate-x-0 translate-y-0 cursor-pointer rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 ${t("lang") === "rtl" ? "rotate-180" : ""}`}
          >
            <ChevronRight className="h-6 w-6" />
          </CarouselNext>
        </motion.div>
      </div>
    </Carousel>
  );
};

export default HomeSlider;
