"use client";
import Image from "next/image"; 
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function Slider() {
  return (
    <section className="w-full relative z-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]} // ضيفنا EffectCoverflow هنا كمان
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="h-[450px]"
      >
        <SwiperSlide>
          <div className="relative h-[450px] w-full">
            <Image
              src="/home-slider-1.png"
              alt="slider"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-green-600/50 flex flex-col justify-center items-center text-center gap-4 md:items-start md:text-left md:pl-20">
              <h2 className="text-white text-4xl font-bold">Fast & Free Delivery</h2>
              <p className="text-white text-lg">Same day delivery available</p>
              <div className="flex gap-4 mt-2 justify-center md:justify-start">
                <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">Order Now</button>
                <button className="border border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-green-600 transition">Delivery Info</button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* باقي الـ Slides بنفس الطريقة... */}
      </Swiper>

      {/* الـ Styles بتاعتك زي ما هي */}
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev { color: white; }
        .swiper-pagination-bullet { background: rgba(255, 255, 255, 0.7); width: 12px; height: 12px; margin: 0 6px; transition: all 0.3s ease; }
        .swiper-pagination-bullet-active { background: rgba(255, 255, 255, 1); width: 32px; border-radius: 6px; }
      `}</style>
    </section>
  );
}