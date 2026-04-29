"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeWishlistItem } from "../store/wishlist.slice";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "@/features/auth/store/store";
import { addProducToCart } from "@/features/cart/server/cart.actions"; // ✅ استيراد الأكشن
import { getLoggedUserCart } from "@/features/cart/store/cart.slice"; // ✅ استيراد تحديث الكارت

export default function WishlistScreen() {
  const dispatch = useDispatch<AppDispatch>();

  // سحب البيانات من الـ Store
  const { wishlistData, isLoading } = useSelector(
    (state: RootState) => state.wishlist
  );

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  // دالة المسح من الـ Wishlist
  const handleRemove = (id: string) => {
    dispatch(removeWishlistItem(id))
      .unwrap()
      .then(() => {
        toast.success("Product removed successfully");
      })
      .catch(() => {
        toast.error("Failed to remove product");
      });
  };

  // ✅ دالة الإضافة للكارت
  const handleAddToCart = async (id: string) => {
    try {
      const response = await addProducToCart({ productId: id });
      if (response.status === "success") {
        toast.success(response.message);
        // تحديث رقم الكارت في الهيدر فوراً
        dispatch(getLoggedUserCart());
      }
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <i className="fas fa-spinner fa-spin text-5xl text-main"></i>
      </div>
    );
  }

  return (
    <section className="container mx-auto my-10 px-4">
      <div className="bg-gray-50 p-6 md:p-10 rounded-lg shadow-sm">
        <h2 className="text-3xl font-bold mb-8 text-green-800">My Wish List</h2>

        {wishlistData.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-xl">
            Your wishlist is empty.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {wishlistData.map((product) => (
              <div
                key={product._id}
                className="flex flex-col md:flex-row items-center py-6 gap-6"
              >
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-grow flex flex-col gap-1 text-center md:text-left">
                  <h3 className="font-bold text-xl text-gray-900 line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-main font-semibold text-2xl text-green-500">
                    {product.price} EGP
                  </p>
                  <button
                    onClick={() => handleRemove(product._id)}
                    className="text-red-600 flex items-center justify-center md:justify-start gap-2 hover:text-red-800 transition-colors mt-2 cursor-pointer"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                    Remove
                  </button>
                </div>

                <div className="w-full md:w-auto">
                  {/* ✅ الزرار دلوقتي شغال وبيضيف للكارت فعلاً */}
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="w-full md:w-48 py-3 px-4 border border-green-400 text-green-400 rounded-lg hover:bg-green-900 hover:text-white transition-all font-semibold cursor-pointer"
                  >
                    Add To Cart
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