"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { AuthState } from "./auth.slice";

export async function setToken(token: string, rememberMe: boolean): Promise<void> {
    const cookieStore = await cookies();

    if (rememberMe) {
        cookieStore.set("token", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60, // 30 يوم
            path: "/",
        });
    } else {
        cookieStore.set("token", token, {
            httpOnly: true,
            maxAge: 1 * 24 * 60 * 60, // يوم واحد
            path: "/",
        });
    }
}

export async function getToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || null;
    return token;
}

export async function clearToken(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete("token");
}

export async function verifytoken(): Promise<AuthState> {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || null;

    if (!token) {
        return {
            isAuthenticated: false,
            userInfo: null,
        };
    }

    try {
        const options: AxiosRequestConfig = {
            url: "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
            method: "GET",
            headers: {
                token: token
            }
        };

        const { data } = await axios.request(options);

        if (data.message === "success") {
            const { name, _id, email } = data.user as any;
            return {
                isAuthenticated: true,
                userInfo: {
                    name: name,
                    id: _id, // تحويل الـ _id من الـ API إلى id اللي الـ App محتاجها
                    email: email
                } as any 
            };
        }

        return {
            isAuthenticated: false,
            userInfo: null,
        };

    } catch (error) {
        return {
            isAuthenticated: false,
            userInfo: null,
        };
    }
}