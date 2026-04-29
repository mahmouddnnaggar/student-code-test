"use server"

import axios, { AxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

// --- دالة الحصول على قائمة الأمنيات ---
export async function getWishlist() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || null;

    if (!token) throw new Error("Authentication required");

    try {
        const options: AxiosRequestConfig = {
            url: BASE_URL,
            method: "GET",
            headers: { token },
        };

        const { data } = await axios.request(options);
        return data;
    } catch (error: any) {
        throw error;
    }
}

// --- دالة إضافة منتج لقائمة الأمنيات ---
export async function addToWishlist(productId: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || null;

    if (!token) throw new Error("Authentication required");

    try {
        const options: AxiosRequestConfig = {
            url: BASE_URL,
            method: "POST",
            headers: { token },
            data: { productId }
        };

        const { data } = await axios.request(options);
        return data;
    } catch (error: any) {
        throw error;
    }
}

// --- دالة مسح منتج من قائمة الأمنيات ---
export async function removeFromWishlist(productId: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || null;

    if (!token) throw new Error("Authentication required");

    try {
        const options: AxiosRequestConfig = {
            url: `${BASE_URL}/${productId}`,
            method: "DELETE",
            headers: { token },
        };

        const { data } = await axios.request(options);
        return data;
    } catch (error: any) {
        throw error;
    }
}