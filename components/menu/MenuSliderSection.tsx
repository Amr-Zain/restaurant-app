"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "@/i18n/routing";
function SliderSection({ title, to, items }: { title: string, to: string, items: React.ReactNode[]}) {
  return (
    <div className="p-sec">
      <div className="flex justify-between items-center mb-4">
        <h3 className=" text-2xl font-bold text-text md:text-4xl md:font-bold lg:text-4xl">{title}</h3>
        <Link href={to} className="flex gap-2 items-center text-primary cursor-pointer text-lg font-medium">
          View All{" "}
          <span>
            <svg
              width="20"
              height="15"
              viewBox="0 0 20 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.43 1.42969L18.5 7.49969L12.43 13.5697M1.5 7.49969H18.33"
                stroke="#5A6AE8"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>

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
            <div className="pb-10">
              {item}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export default SliderSection