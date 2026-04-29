
"use server"



import axios, { AxiosRequestConfig } from 'axios';
import { ProductsResponse, SingleProductResponse } from '../types/products.types';
import { date } from 'zod';
import { promises } from 'dns';
export   default   async  function getproducts():Promise<ProductsResponse>{
try{

const options:AxiosRequestConfig={

url:'https://ecommerce.routemisr.com/api/v1/products',
method:"GET",

}

const{data}=await axios.request(options)
    return   data;

}catch(error){

throw error;
}

}




export async function getProductById({id}:{id:string}):Promise<SingleProductResponse> {


    try{
const options:AxiosRequestConfig={
    url:`https://ecommerce.routemisr.com/api/v1/products/${id}`,
method:"GET",

};

const {data}= await axios.request(options)
return data

    }catch(error){

throw error


    }
    
}