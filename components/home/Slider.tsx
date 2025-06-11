"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import SocialLinks from "../general/SocialLinks";
import type { Swiper as SwiperType } from "swiper/types";
import { useTranslations } from "next-intl";

const HomeSlider = ({
  slides,
}: {
  slides: { image: string; title: string; desc: string; id: number }[];
}) => {
  const swiperRef = React.useRef<SwiperType | null>(null);
  const t = useTranslations();
  return (
    <div className="relative mx-auto h-[90vh] w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={`slider ${slide.id}`}>
            <div className={` relative h-full w-full`}>
              <Image
                src={slide.image}
                alt={`slider image ${index}`}
                className="h-full w-full object-cover"
                width={100}
                height={100}
              />
            </div>
            <div className="absolute top-[50%] left-[50%] z-20 flex w-full translate-x-[-50%] translate-y-[-50%] flex-col gap-3 px-4 text-center text-white">
              <h1
                dangerouslySetInnerHTML={{
                  __html: slide.title,
                }}
                className="font-serif text-3xl font-bold italic md:text-5xl"
              />
              <p
                dangerouslySetInnerHTML={{
                  __html: slide.desc,
                }}
                className="mx-auto max-w-2xl"
              />
              <Link
                href="/menu"
                className="flex justify-center gap-2 underline"
              >
                {t("buttons.discoverMore")}{" "}
                <svg
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.86574 1.6942L14.4173 2.44237L13.6692 10.994M1.39459 13.3698L14.2871 2.55164"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
            <div className="absolute inset-0 z-10 bg-black/60"></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Center Content */}

      <div className="absolute right-0 bottom-0 left-0 z-20 flex items-center justify-between p-4">
        <div className="flex text-white">
          <SocialLinks className="flex gap-2" />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
