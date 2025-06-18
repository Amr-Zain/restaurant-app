"use client";

import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "@/i18n/routing";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslations } from "next-intl";
import { ArrowRight } from "../Icons";

function SliderSection({ title, to, items }: { title: string, to: string, items: React.ReactNode[]}) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }, []);
  const t = useTranslations();
  if(!items.length) return;
  return (
    <div className="p-sec">
      <div 
        className="flex justify-between items-center mb-4"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h3 
          className="text-2xl font-bold text-text md:text-4xl md:font-bold"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          {title}
        </h3>
        <Link 
          href={to} 
          className="flex gap-2 items-center text-primary cursor-pointer text-sm md:text-lg font-medium hover:opacity-80 transition-opacity"
          data-aos="fade-left"
          data-aos-delay="200"
        >
         {t("TEXT.viewAll")+" "}
          <span className={t('lang') ==="rtl"?"rotate-180":''}>
            <ArrowRight />
          </span>
        </Link>
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <Swiper
          modules={[Autoplay]}
          spaceBetween={5}
          slidesPerView={1.2}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            400:{
              spaceBetween: 10,
              slidesPerView: 1.8,
            },
            555: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            
            740: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            930: {
              slidesPerView: 3.5,
              spaceBetween: 10,
            },
            1150: {
              slidesPerView: 4.5,
              spaceBetween: 10,
            },
            1536: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          className="mySwiper"
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div 
                className="pb-10"
                data-aos="zoom-in"
                data-aos-delay={400 + (index * 100)}
              >
                {item}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SliderSection;