"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMinus,
  faPlus,
  faShareNodes,
  faTruckFast,
  faBolt,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Rating from "@/components/ui/Rating";
import ProductSlider from "./ProductSlider";
import { useState } from "react";
import { useAppDispatch } from "@/features/auth/store/store";
import { addProducToCart } from "@/features/cart/server/cart.actions";
import { getLoggedUserCart } from "@/features/cart/store/cart.slice";
import { addProductToWishlist, fetchWishlist } from "@/features/wishlist/store/wishlist.slice";
import { toast } from "react-toastify";
import type { Product } from "../../types/products.types";

export default function ProductInfo({ product }: { product: Product }) {
  // ✅ 2. ضفنا الـ id هنا عشان نستخدمه في الأكشنز
  const {
    id,
    title,
    description,
    images,
    ratingsAverage,
    ratingsQuantity,
    price,
    priceAfterDiscount,
    quantity,
    category,
    brand,
  } = product;

  const dispatch = useAppDispatch(); // ✅
  const [count, setcount] = useState(1);

  const onSale = priceAfterDiscount ? priceAfterDiscount < price : false;
  const discountPercentage = priceAfterDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;
  const isLowStore = quantity > 0 && quantity < 10;

  const handleAddToCart = async () => {
    try {
      const response = await addProducToCart({ productId: id });
      if (response.status === "success") {
        toast.success(response.message);
        dispatch(getLoggedUserCart()); // تحديث رقم الكارت في الهيدر
      }
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const handleAddToWishlist = async () => {
    try {
      await dispatch(addProductToWishlist(id)).unwrap();
      toast.success("Product added to wishlist ❤️");
      dispatch(fetchWishlist())
    } catch (error) {
      toast.error("Failed to add to wishlist");
    }
  };

  return (
    <section id="product-detail" className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start grid-cols-1">
          {/* الصور */}
          <ProductSlider images={images} title={title} />

          {/* معلومات المنتج */}
          <div className="space-y-5">
            <p className="text-green-600 text-sm font-medium">{category.name}</p>
            <h1 className="text-3xl font-semibold leading-snug">{title}</h1>
            <p className="text-gray-600">
              Brand : <span className="font-medium">{brand.name}</span>
            </p>

            <div className="flex items-center gap-2">
              <Rating rating={ratingsAverage} />
              <span className="text-yellow-500 font-medium">{ratingsAverage}</span>
              <span className="text-gray-500 text-sm">({ratingsQuantity} reviews)</span>
            </div>

            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-bold text-green-600">
                {priceAfterDiscount || price} EGP
              </h2>
              {onSale && (
                <>
                  <p className="line-through text-gray-400">{price} EGP</p>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                    -{discountPercentage}%
                  </span>
                </>
              )}
            </div>

            <div>
              <p className="text-green-600 font-medium">
                {quantity > 0 ? "In Stock" : "Out Of Stock"}
              </p>
              {isLowStore && (
                <p className="text-red-500 text-sm mt-1">
                  Only {quantity} left in stock
                </p>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed">{description}</p>

            <div className="flex items-center gap-6">
              <span className="text-gray-600">Available : {quantity}</span>
              <div className="flex border rounded-md overflow-hidden">
                <button 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer" 
                  onClick={() => count > 1 && setcount(count - 1)}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span className="px-5 py-2 border-x">{count}</span>
                <button 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setcount(count + 1)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center border-t pt-4">
              <p className="text-gray-500">Total Price</p>
              <p className="text-green-600 text-2xl font-bold">
                {count * (priceAfterDiscount || price)} EGP
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* ✅ ربط دالة الكارت */}
              <button 
                onClick={handleAddToCart}
                className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-md w-full flex items-center justify-center gap-2 cursor-pointer"
              >
                <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
              </button>
              <button className="bg-black hover:bg-gray-900 transition text-white px-6 py-3 rounded-md w-full cursor-pointer">
                Buy Now
              </button>
            </div>

            <div className="flex gap-6 text-gray-500">
              {/* ✅ ربط دالة الـ Wishlist */}
              <button 
                onClick={handleAddToWishlist}
                className="flex items-center gap-2 hover:text-red-700 cursor-pointer"
              >
                <FontAwesomeIcon icon={faHeart} /> Wishlist
              </button>
              <button className="flex items-center gap-2 hover:text-green-700 cursor-pointer">
                <FontAwesomeIcon icon={faShareNodes} /> Share
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 text-center pt-6 border-t">
              <div>
                <FontAwesomeIcon icon={faTruckFast} className="text-xl text-green-500" />
                <p className="text-sm mt-2 text-gray-600">Fast Delivery</p>
              </div>
              <div>
                <FontAwesomeIcon icon={faBolt} className="text-xl text-green-500" />
                <p className="text-sm mt-2 text-gray-600">Quick Payment</p>
              </div>
              <div>
                <FontAwesomeIcon icon={faShieldHalved} className="text-xl text-green-500" />
                <p className="text-sm mt-2 text-gray-600">Secure Order</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
