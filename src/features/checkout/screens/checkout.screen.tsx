"use client";

import React, { useState } from "react";
import ShippingForm from "../components/ShippingForm";
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingAdressSchema, shippingAdressValuse } from "../schemas/checkout.schemas";
import PaymentMethod from "../components/PaymentMethods";
import createCashOrder, { createOnlineOrder } from "../server/checkout.actions";
import { useAppDispatch, useAppSelector } from "@/features/auth/store/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { clearCart } from "@/features/cart/store/cart.slice";
import Link from "next/link";

export default function CheckoutScreen() {

  const [paymentMethod, setpaymentMethod] = useState<"cash" | "card">("cash")
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { cartId, products, totalCartPrice } = useAppSelector((state) => state.cart)

  const shippingCost = totalCartPrice < 500 ? 50 : 0;
  const finalTotal = totalCartPrice + shippingCost;

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { details: "", phone: "", city: "" },
    resolver: zodResolver(shippingAdressSchema),
    mode: "onSubmit",
    reValidateMode: "onChange"
  })

  const onSubmit: SubmitHandler<shippingAdressValuse> = async (values) => {
    console.log("submit working")
    try {
      if (!cartId) return;

      if (paymentMethod == "cash") {
        const response = await createCashOrder({ cartId, shippingAddress: values })
        if (response.status == "success") {
          dispatch(clearCart())
          toast.success("order created successfully")
          reset()
          setTimeout(() => { router.push("/orders") }, 3000)
        }
      } else {
        const response = await createOnlineOrder({
          cartId,
          shippingAddress: values,
          url: window.location.origin
        })
        
        if (response.session?.url) {
          dispatch(clearCart()); 
          window.location.href = response.session.url;
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <nav className="text-sm text-gray-500">
            <Link className="text-green-500" href={"/"}>Home /</Link> <Link className="text-green-500" href={"/cart"}>Cart</Link> <span className="text-gray-600 font-semibold">Checkout</span>
          </nav>
          <button className="text-sm text-gray-600 hover:text-green-600 flex items-center gap-1 transition">
            ← Back to Cart
          </button>
        </div>

        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-green-100 p-3 rounded-2xl text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1"></rect>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Complete Your Order</h1>
                <p className="text-gray-500 text-sm">Review your items and complete your purchase</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <ShippingForm register={register} errors={errors} />
              <div className="py-4">
                <PaymentMethod selectedMethod={paymentMethod} changeMethod={setpaymentMethod} />
              </div>
              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-green-100 mt-4">
                Proceed to Payment
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </form>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-green-700 text-white px-6 py-4 flex items-center gap-2">
                <h2 className="font-semibold text-lg">Order Summary</h2>
              </div>
              <div className="p-6 space-y-5">

                {/* عرض المنتجات من الـ Store */}
                <div className="max-h-64 overflow-y-auto space-y-4 mb-4 pr-2">
                  {products?.map((item) => (
                    <div key={item._id} className="flex gap-3 items-center border-b border-gray-50 pb-3">
                      <img 
                        src={item.product.imageCover} 
                        alt={item.product.title} 
                        className="w-14 h-14 object-cover rounded-lg border border-gray-100"
                      />
                      <div className="flex-1 text-sm">
                        <h3 className="font-bold text-gray-800 line-clamp-1">{item.product.title}</h3>
                        <p className="text-gray-500 text-xs">Qty: {item.count}</p>
                        <p className="text-green-600 font-bold">{item.price} EGP</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-gray-600">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold text-gray-900">{totalCartPrice} EGP</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span className="font-medium flex items-center gap-2">🚚 Shipping</span>
                  <span className={shippingCost === 0 ? "text-green-600 font-bold" : "text-gray-900 font-bold"}>
                    {shippingCost === 0 ? "FREE" : `${shippingCost} EGP`}
                  </span>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-5 flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-green-700">{finalTotal} EGP</span>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Including VAT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}