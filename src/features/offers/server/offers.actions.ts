// src/features/offers/server/offers.actions.ts
import axios, { AxiosRequestConfig } from "axios";
import { AppDispatch } from "@/features/auth/store/store"; // نفس مسار الـ store عندك
import { setLoading } from "@/features/featured-products/store/featured-products.slice";
import { setOffers } from "../store/offers.slice";

export const fetchOffers = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading());

        const options: AxiosRequestConfig = {
            url: "https://ecommerce.routemisr.com/api/v1/products",
            method: "GET",
        };

        const { data } = await axios.request(options);

        const offersProducts = data.data.filter((product: any) => product.priceAfterDiscount);

        dispatch(setOffers(offersProducts));
    } catch (error) {
        console.error("Error fetching offers:", error);
    }
};