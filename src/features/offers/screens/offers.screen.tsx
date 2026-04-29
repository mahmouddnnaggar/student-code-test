"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/features/auth/store/store";
import ProductCard from "@/features/products/components/ProductCard";
import { fetchOffers } from "../server/offers.actions"; // الأكشن بتاع العروض

export default function OffersScreen() {
  const dispatch = useAppDispatch();
  
  // بنسحب بيانات الـ offers من الـ store
  const { products, isLoading } = useAppSelector((state) => state.offers);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4">
        {/* عنوان وهمي */}
        <div className="h-10 w-64 bg-gray-200 animate-pulse mb-8 rounded-lg"></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* عرض 10 كروت وهمية */}
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="border border-gray-100 rounded-xl p-4 animate-pulse bg-white">
              {/* مكان الصورة */}
              <div className="bg-gray-200 h-48 w-full rounded-lg mb-4"></div>
              {/* مكان العنوان */}
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              {/* مكان السعر */}
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      {/* عنوان الصفحة */}
      <h2 className="text-3xl font-bold mb-8 border-r-4 border-green-500 pr-4">
        أقوى العروض الحصرية
      </h2>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((item: any) => (
            <ProductCard key={item._id} info={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          لا توجد عروض متاحة حالياً.
        </div>
      )}
    </div>
  );
}