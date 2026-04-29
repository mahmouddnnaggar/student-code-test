"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/features/auth/store/store";
import { getLoggedUserCart } from "@/features/cart/store/cart.slice";
import Swal from 'sweetalert2';

import {
  faPlus,
  faMinus,
  faTrashAlt,
  faCheckCircle,
  faShoppingCart,
  faBox,
  faShippingFast,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { removeProductFromCart, updateProdactQuantity } from "../server/cart.actions";
import { useRouter } from "next/navigation"; // <-- استيراد useRouter

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter(); // <-- انشاء instance من router

  const { numOfCartItems, products, totalCartPrice, isLoading } =
    useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getLoggedUserCart());
  }, [dispatch]);

  const freeShippingThreshold = 500;
  const remaining = Math.max(freeShippingThreshold - totalCartPrice, 0);
  const progress = Math.min((totalCartPrice / freeShippingThreshold) * 100, 100);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const handleRemove = async (id: string, title: string) => {
    const result = await Swal.fire({
      html: `
        <div class="text-center py-2">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7L5 7M10 11V17M14 11V17M6 7L7 19C7 20.1046 7.89543 21 9 21H15C16.1046 21 17 20.1046 17 19L18 7M9 7V5C9 4.44772 9.44772 4 10 4H14C14.5523 4 15 4.44772 15 5V7">
              </path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            Remove Item?
          </h3>
          <p class="text-gray-500 text-sm leading-relaxed">
            Are you sure you want to remove 
            <span class="font-semibold text-gray-800">
              ${title.length > 40 ? title.slice(0, 40) + "..." : title}
            </span>
            from your cart?
          </p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#16a34a",
      customClass: {
        popup: "rounded-2xl shadow-xl",
        confirmButton: "rounded-xl px-5 py-2 text-white font-semibold ",
        cancelButton: "rounded-xl px-5 py-2 text-white font-semibold",
      },
    });

    if (result.isConfirmed) {
      await removeProductFromCart(id);
      dispatch(getLoggedUserCart());
      Swal.fire({
        icon: "success",
        title: "Removed!",
        text: `${title} has been removed from your cart.`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleUpdate = async (id: string, newCount: number, maxCount: number) => {
    if (newCount < 1 || newCount > maxCount) return;

    try {
      await updateProdactQuantity(id, newCount);

      dispatch({
        type: "cart/updateQuantityLocally",
        payload: { id, count: newCount },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = () => {
    if (products.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Cart is empty",
        text: "Please add some products before proceeding to checkout.",
      });
      return;
    }

    router.push("/checkout"); // <-- تحويل للصفحة المطلوبة
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-sm text-green-500 mb-8">
        <Link href="/" className="hover:text-green-600 transition">Home /</Link>
        <Link href={"checkout"}>checkout /</Link>
        <span className="text-gray-900 font-bold">Shopping Cart</span>
      </nav>

      <div className="flex items-center gap-5 bg-white p-7 rounded-3xl shadow-sm border border-gray-100 mb-10">
        <div className="bg-green-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl">
          <FontAwesomeIcon icon={faShoppingCart} />
        </div>
        <div>
          <Link href={"/"}>
            <h1 className="text-3xl font-black text-gray-950">Shopping Cart</h1>
          </Link>
          <p className="text-gray-500 mt-1 font-medium">
            You have{" "}
            <span className={numOfCartItems > 0 ? "text-green-600 font-bold" : "text-gray-500 font-bold"}>
              {numOfCartItems}
            </span>{" "}
            <span className={numOfCartItems > 0 ? "text-green-600 font-bold" : "text-gray-500 font-bold"}>
              {numOfCartItems === 1 ? "item" : "items"}
            </span>{" "}
            in your cart
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {products?.map((item) => (
            <div key={item._id} className="bg-white p-6 rounded-3xl shadow-sm border border-green-300 flex flex-col md:flex-row items-center gap-6">
              <div className="w-28 h-28 bg-gray-50 rounded-2xl border border-green-200 flex items-center justify-center overflow-hidden">
                <img src={item.product.imageCover} alt={item.product.title} className="w-full h-full object-contain p-2" />
              </div>

              <div className="flex-1 w-full">
                <h2 className="text-xl font-extrabold text-gray-950 line-clamp-1">{item.product.title}</h2>
                <p className="text-green-700 font-bold text-sm uppercase">{item.product.category?.name}</p>
                <span className="inline-flex items-center gap-2 text-xs font-black text-green-700 bg-green-50 px-4 py-2 rounded-full border mt-3">
                  <FontAwesomeIcon icon={faCheckCircle} /> In Stock
                </span>
              </div>

              <div className="flex flex-col items-end gap-4">
                <p className="text-2xl font-black text-green-500">{item.price} EGP</p>
                <p className="text-xl font-black text-gray-950">{item.price * item.count} EGP</p>

                <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-green-300">
                  <button
                    className="w-10 h-10 rounded-xl bg-white text-gray-400 flex items-center justify-center hover:text-red-500 transition"
                    disabled={item.count <= 1}
                    onClick={() => handleUpdate(item.product.id, item.count - 1, item.product.quantity)}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>

                  <span className="text-xl font-black w-8 text-center">{item.count}</span>

                  <button
                    className="w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition"
                    disabled={item.count >= item.product.quantity}
                    onClick={() => handleUpdate(item.product.id, item.count + 1, item.product.quantity)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>

                <button
                  className="text-red-400 hover:text-red-600 transition"
                  onClick={() => handleRemove(item.product.id, item.product.title)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="sticky top-10 h-fit">
          <div className="bg-white rounded-3xl shadow-xl border border-green-200 overflow-hidden">
            <div className="bg-gray-950 text-white p-6 flex items-center gap-3">
              <FontAwesomeIcon icon={faBox} className="text-green-500" />
              <h2 className="text-xl font-bold">Order Summary</h2>
            </div>

            <div className="p-8 space-y-6">
              {totalCartPrice < freeShippingThreshold && (
                <div className="bg-orange-50 border p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faShippingFast} className="text-orange-500 text-xl" />
                    <p className="text-orange-700 font-bold text-sm">
                      Add {remaining} EGP for free shipping
                    </p>
                  </div>
                  <div className="h-2 bg-orange-200 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              )}

              {totalCartPrice >= freeShippingThreshold && (
                <div className="bg-green-50 border p-5 rounded-2xl flex items-center gap-4">
                  <FontAwesomeIcon icon={faShippingFast} className="text-green-600 text-3xl" />
                  <div>
                    <p className="text-green-900 font-black text-sm uppercase">Free Shipping!</p>
                    <p className="text-green-700 text-xs font-medium">You qualify for free delivery</p>
                  </div>
                </div>
              )}

              <div className="flex justify-between text-gray-500 font-bold">
                <span>Subtotal</span>
                <span className="text-green-600 font-black">{totalCartPrice} EGP</span>
              </div>

              <div className="border-t pt-6 flex justify-between items-end">
                <span className="text-gray-900 font-bold">Total Pay</span>
                <p className="text-4xl font-black text-green-500">{totalCartPrice} EGP</p>
              </div>

              <button
                className="w-full bg-green-600 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-4"
                onClick={handleCheckout} // <-- ربط الزر بالفنكشن
              >
                <FontAwesomeIcon icon={faLock} />
                Secure Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
