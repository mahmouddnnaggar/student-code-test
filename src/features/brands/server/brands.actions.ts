import axios, { AxiosRequestConfig } from "axios";
import { BrandsResponse } from "../types/brands.types";

export default async function getAllBrands(): Promise<BrandsResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/brands",
      method: "GET",
    };

    const { data } = await axios.request(options);

    return data;
  } catch (error: any) {
    console.error("Full Error Response:", error.response?.data || error.message);
    throw error;
  }
}