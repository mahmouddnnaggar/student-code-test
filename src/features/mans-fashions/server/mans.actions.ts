import { Category } from './../../categories/types/Category.types';
import axios, { AxiosRequestConfig } from "axios";
import { MansFashionResponse } from "../types/mans.types";

export default async function getMansFashion(): Promise<MansFashionResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
      params:{"category[in]":"6439d5b90049ad0b52b90048"}
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error: any) {
    console.error("Error fetching Men's Fashion:", error.message);
    throw error;
  }
}