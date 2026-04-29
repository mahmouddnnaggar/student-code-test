"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/features/auth/store/store"; 
import ProductCard from "../../products/components/ProductCard";
import { fetchRecentProducts } from "@/features/RecentlyAdded/store/recently-added.slice";

export default function RecentlyAddedScreen() {
  const dispatch = useAppDispatch();
  
  const { products, isLoading, error } = useAppSelector((state) => state.recentlyAdded);

  useEffect(() => {
    dispatch(fetchRecentProducts());
  }, [dispatch]);

  // تعديل الجزء ده فقط للتحميل الاحترافي
  if (isLoading) return (
    <div className="container mx-auto py-10 px-4">
      <div className="h-10 w-72 bg-gray-200 animate-pulse mb-8 rounded-lg border-l-4 border-gray-300"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="border border-gray-100 rounded-xl p-4 animate-pulse">
            <div className="bg-gray-200 h-48 w-full rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );

  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 border-l-4 border-green-500 pl-4">
        Recently Added Products
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products && products.length > 0 ? (
          products.map((item: any) => (
            <ProductCard key={item._id} info={item} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}