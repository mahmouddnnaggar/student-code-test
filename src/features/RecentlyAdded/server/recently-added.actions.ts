"use server";
import axios, { AxiosRequestConfig } from "axios";

export async function getRecentProductsAction() {
  const BASE_URL = "https://ecommerce.routemisr.com/api/v1/products";

  try {
    const options: AxiosRequestConfig = {
      url: `${BASE_URL}?sort=-createdAt&limit=8`, 
      method: "GET",
    };

    const { data } = await axios.request(options);
    
    return data.data; 
  } catch (error: any) {
    console.error("Error in getRecentProductsAction:", error);
    throw error;
  }
}