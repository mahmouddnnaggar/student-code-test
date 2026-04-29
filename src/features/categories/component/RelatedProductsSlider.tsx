"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

import ProductCard from "../../products/components/ProductCard";

interface RelatedProductsSliderProps {
  products: any[];
}

export default function RelatedProductsSlider({ products }: RelatedProductsSliderProps) {
  return (
    <div className="mt-20 mb-16 px-4 overflow-hidden">
      <h3 className="text-2xl font-bold mb-10 text-gray-800 border-r-4 border-green-500 pr-4">
        منتجات قد تعجبك
      </h3>
      
      <Swiper
        modules={[Autoplay, EffectCoverflow]} 
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true} 
        coverflowEffect={{
          rotate: 35,
          stretch: 0,
          depth: 250,
          modifier: 1,
          slideShadows: false,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="pt-10 pb-20" 
      >
        {products.map((product: any) => (
          <SwiperSlide key={product._id} className="max-w-[300px]">
            <div className="transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(34,197,94,0.35)] rounded-xl">
              <ProductCard info={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}