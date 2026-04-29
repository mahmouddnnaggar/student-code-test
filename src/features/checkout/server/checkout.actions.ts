"use server"

import axios, { AxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';
import { shippingAdressValuse } from '../schemas/checkout.schemas';

// دالة الدفع الكاش
export default async function createCashOrder({cartId, shippingAddress}: {cartId: string; shippingAddress: shippingAdressValuse}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || null;

    if (!token) throw new Error("Authentication required");

    try {
        const options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            method: "POST",
            headers: { token },
            data: { shippingAddress }
        };
        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        throw error;
    }
}

// دالة الدفع الأونلاين (تم إضافة url كـ parameter)
export async function createOnlineOrder({cartId, shippingAddress, url}: {cartId: string; shippingAddress: shippingAdressValuse; url: string}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || null;

    if (!token) throw new Error("Authentication required");

    try {
        const options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
            method: "POST",
            headers: { token },
            data: { shippingAddress }
        };
        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        throw error;
    }
}