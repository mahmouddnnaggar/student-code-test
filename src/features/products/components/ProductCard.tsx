"use client";

import { Product } from "../types/products.types";
import Rating from "@/components/ui/Rating";
import { addProducToCart } from "@/features/cart/server/cart.actions";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/features/auth/store/store";
import { getLoggedUserCart } from "@/features/cart/store/cart.slice";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/features/auth/store/store";
import { addProductToWishlist ,fetchWishlist } from "@/features/wishlist/store/wishlist.slice";
import Link from "next/link";


export default function ProductCard({ info }: { info: Product }) {
  const {
    id,
    category,
    imageCover,
    ratingsAverage,
    ratingsQuantity,
    price,
    title,
    priceAfterDiscount,
  } = info;

  const dispatch = useAppDispatch();

  // سحب الـ wishlistIds من الـ store
  const { wishlistIds } = useSelector((state: RootState) => state.wishlist);
  const isFavourite = wishlistIds.includes(id);

  const onSale = priceAfterDiscount ? priceAfterDiscount < price : false;
  const discountPercentage = priceAfterDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;

  const handleAddToCart = async () => {
    try {
      const response = await addProducToCart({ productId: id });
      console.log(response);

      if (response.status === "success") {
        toast.success(response.message);
        dispatch(getLoggedUserCart());
      }
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  };

  // دالة التعامل مع إضافة المنتج للـ wishlist
  const handleAddToWishlist = async () => {
    try {
      await dispatch(addProductToWishlist(id)).unwrap();
      toast.success("Product added to wishlist ❤️");
      dispatch(fetchWishlist());
    } catch (error: any) {
      toast.error(error || "Failed to add to wishlist");
    }
  };

  return (
    <div className="relative group border border-green-200 rounded-lg p-4 bg-white hover:shadow-lg transition">
      {/* Discount badge */}
      {onSale && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
          -{discountPercentage}%
        </span>
      )}

      {/* Icons */}
      <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
        <button 
          onClick={handleAddToWishlist}
          className={`w-8 h-8 flex items-center justify-center bg-white border border-green-200 rounded-full cursor-pointer transition-colors ${
            isFavourite ? "text-red-500 border-red-200" : "hover:text-red-500"
          }`}
        >
          {isFavourite ? "❤️" : "♥"}
        </button>


        <Link href={`/products/${id}`} className="w-8 h-8 flex items-center justify-center bg-white border border-green-200 rounded-full hover:text-blue-500 cursor-pointer">
          👁
        </Link>
      </div>

      {/* Image */}
      <div className="flex justify-center mb-3">
        <Image src={imageCover} alt={title} width={140} height={140} className="object-contain" />
      </div>

      {/* Category */}
      <div className="text-xs text-gray-400">{category.name}</div>

      {/* Title */}
      <h3 className="text-sm font-medium text-gray-700">{title}</h3>

      {/* Rating */}
      <div className="text-xs text-gray-400 mt-1">
        <Rating rating={ratingsAverage} /> {ratingsAverage} ({ratingsQuantity} reviews)
      </div>

      {/* Price */}
      <div className="flex items-center justify-between mt-3">
        <div>
          <span className="text-green-600 font-semibold">{priceAfterDiscount || price} EGP</span>
          {onSale && (
            <span className="text-gray-400 line-through text-sm ml-2">{price} EGP</span>
          )}
        </div>

        {/* Add to cart button */}
        <button
          className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 cursor-pointer"
          onClick={handleAddToCart}
        >
          +
        </button>
      </div>
    </div>
  );
}