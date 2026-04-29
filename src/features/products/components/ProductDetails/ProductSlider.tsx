"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

type Props = {
  images: string[];
  title: string;
  onSelect?: (index: number) => void; 
};

export default function ProductSlider({ images, title, onSelect }: Props) {
  const [selected, setSelected] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const handleSelect = (index: number) => {
    setSelected(index);
    if (onSelect) onSelect(index);
  };

  return (
    <div>
      {/* الصورة الكبيرة */}
      <div className="border    border-green-500 rounded-xl bg-white p-10 flex justify-center mb-4">
        <Image
          src={images[selected] || "/placeholder.png"}
          alt={title}
          width={420}
          height={420}
        />
      </div>

      {/* Slider للصور الصغيرة */}
      <Swiper
        modules={[Navigation]}
        navigation={false} // 
        spaceBetween={10}
        slidesPerView={4}
        onSwiper={setSwiperInstance}
        className="mt-4"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <button onClick={() => handleSelect(index)}>
              <Image
                src={img}
                alt={`${title} ${index}`}
                width={90}
                height={90}
                className={`border       rounded-md p-2 cursor-pointer ${
                  selected === index ? "border-green-500" : ""
                }`}
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* أزرار مستقلة */}
      <div className="flex gap-2 mt-2 justify-center">
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => swiperInstance?.slidePrev()}
        >
          Prev
        </button>
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => swiperInstance?.slideNext()}
        >
          Next
        </button>
      </div>
    </div>
  );
}