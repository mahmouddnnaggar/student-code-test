"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { shippingAdressValuse } from "../schemas/checkout.schemas";

interface shippingAddressFormProps{
  register:UseFormRegister<shippingAdressValuse>
  errors:FieldErrors<shippingAdressValuse>
}

export default function ShippingForm({register,errors}:shippingAddressFormProps) {
  return (
    <div className="mt-6">
      <div className="bg-white rounded-2xl shadow-lg border border-green-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-green-600 text-white px-5 py-4">
          <h2 className="text-lg font-semibold">Shipping Address</h2>
          <p className="text-xs opacity-80">Where should we deliver your order?</p>
        </div>

        <div className="p-6 space-y-5">

          {/* Info Box */}
          <div className="bg-gray-100 rounded-xl p-4 text-sm">
            📦 Delivery Information <br />
            <span className="text-gray-500 text-xs">
              Please ensure your address is accurate for smooth delivery
            </span>
          </div>

          <div className="grid grid-cols-12 gap-4">

            {/* Phone */}
            <div className="col-span-12 md:col-span-6">
              <label className="text-sm font-medium text-gray-600 mb-1 block">Phone Number *</label>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  📞
                </span>

                <input
                  type="text"
                  placeholder="01xxxxxxxxx"
                  className="w-full border border-green-200 rounded-xl px-4 py-3 pl-10 outline-none focus:ring-1 focus:ring-green-500 transition-all"
                  {...register("phone")}
                />
              </div>

              {errors.phone&&(
                <p className="text-sm text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="col-span-12">
              <label className="text-sm font-medium text-gray-600 mb-1 block">Street Address *</label>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  📍
                </span>

                <input
                  type="text"
                  placeholder="Street name, building number..."
                  className="w-full border border-green-200 rounded-xl px-4 py-3 pl-10 outline-none focus:ring-1 focus:ring-green-500 transition-all"
                  {...register("details")}
                />
              </div>

              {errors.details&&(
                <p className="text-sm text-red-500 mt-1">
                  {errors.details.message}
                </p>
              )}
            </div>

            {/* City */}
            <div className="col-span-12 md:col-span-6">
              <label className="text-sm font-medium text-gray-600 mb-1 block">City *</label>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  🏙️
                </span>

                <input
                  type="text"
                  placeholder="Cairo, Giza..."
                  className="w-full border border-green-200 rounded-xl px-4 py-3 pl-10 outline-none focus:ring-1 focus:ring-green-500 transition-all"
                  {...register("city")}
                />
              </div>

              {errors.city&&(
                <p className="text-sm text-red-500 mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* Notes */}
            <div className="col-span-12">
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Order Notes (Optional)
              </label>
              <textarea
                rows={4}
                placeholder="Apartment floor, landmark, etc..."
                className="w-full border border-green-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}