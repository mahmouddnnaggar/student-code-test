"use client";

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getWomenFashion from '../server/women.actions';
import { setWomenProducts } from '../store/women.slice';
import { RootState, useAppDispatch } from '@/features/auth/store/store'; 
import { Product } from '../types/women.types'; // تأكد إن ملف الـ types موجود بنفس الاسم
import { getLoggedUserCart } from "@/features/cart/store/cart.slice";
import { addProducToCart } from "@/features/cart/server/cart.actions"; 
import { toast } from "react-toastify";

const ProductSkeleton = () => (
  <div className="border rounded-2xl p-4 shadow-sm bg-white animate-pulse">
    <div className="w-full h-56 bg-gray-200 rounded-xl mb-4"></div>
    <div className="h-4 bg-gray-200 rounded-full w-2/3 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded-full w-full mb-4"></div>
    <div className="flex justify-between items-center mt-auto">
      <div className="h-6 bg-gray-200 rounded-full w-24"></div>
      <div className="h-6 bg-gray-200 rounded-full w-12"></div>
    </div>
  </div>
);

export default function WomenFashionScreen() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { products } = useSelector((state: RootState) => state.womenFashion);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getWomenFashion();
        dispatch(setWomenProducts(response.data));
      } catch (err: any) {
        setError("Failed to load Women's Fashion products.");
      } finally {
        setIsLoading(false);
      }
    };

    if (products.length === 0) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [dispatch, products.length]);

  const handleAddToCart = async (id: string) => {
    try {
      const response = await addProducToCart({ productId: id });
      if (response.status === "success") {
        toast.success(response.message || "Added to cart! 🛒");
        dispatch(getLoggedUserCart()); 
      }
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
             <span className="text-green-600">Women's</span> Fashion
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Explore our latest collection of premium womenswear and accessories.
          </p>
        </div>

        {error && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-red-100">
            <p className="text-xl text-red-600 font-medium">{error}</p>
          </div>
        )}

        {isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(8)].map((_, index) => <ProductSkeleton key={index} />)}
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product: Product) => (
              <div 
                key={product._id} 
                className="group border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-lg hover:border-green-100 transition-all duration-300 bg-white flex flex-col h-full"
              >
                {/* Product Image */}
                <div className="relative w-full h-64 bg-gray-50 rounded-xl p-4 mb-5 flex items-center justify-center overflow-hidden">
                  <img 
                    src={product.imageCover} 
                    alt={product.title} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Quick Badge */}
                  <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-green-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">
                    New Arrival
                  </span>
                </div>

                {/* Product Details */}
                <div className="flex flex-col flex-grow">
                  <span className="text-xs text-green-600 font-bold uppercase mb-2 tracking-wide">
                    {product.category.name}
                  </span>
                  <h3 className="font-bold text-gray-800 line-clamp-2 mb-3 leading-snug group-hover:text-green-600 transition-colors">
                    {product.title}
                  </h3>
                  
                  {/* Rating & Price Row */}
                  <div className="flex justify-between items-center mt-auto mb-6">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-green-500">
                        {product.price} <span className="text-xs font-normal text-gray-500 italic">EGP</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                       <span className='text-yellow-500 text-sm'>★</span> 
                       <span className='font-bold text-gray-800 text-sm'>{product.ratingsAverage?.toFixed(1) || "0.0"}</span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => handleAddToCart(product._id)}
                    className="w-full bg-gray-900 hover:bg-green-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg active:scale-95"
                  >
                    <span className="text-lg">🛒</span>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}