"use server";

import axios, { AxiosRequestConfig } from "axios";
import { CategoriesResponse } from "../types/Category.types";


  export default  async  function getAllCategories():Promise<CategoriesResponse>{

try{
    const options:AxiosRequestConfig={

url:"https://ecommerce.routemisr.com/api/v1/categories",
method:"GET"
    }

const{data}=await axios.request(options)

return data;
} catch (error: any) {
    console.error("Full Error Response:", error.response?.data || error.message);
    
    throw error;
}


  }
