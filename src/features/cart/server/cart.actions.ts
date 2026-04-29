"use server";



import { Product } from './../../products/types/products.types';



import { date } from 'zod';




import axios, { AxiosRequestConfig } from 'axios';




import { cookies, headers } from 'next/headers';
import { CartResponse } from '../types/cart.types';

export  async function addProducToCart({productId}:{productId:string}){

const cookieStore=await cookies();
const token=cookieStore.get("token")?.value||null


if(!token){


    throw new Error("Authentication required")
}

try{
const options:AxiosRequestConfig={
    url:"https://ecommerce.routemisr.com/api/v1/cart",
    method:"POST",
    headers:{
        token
    },
data:{
productId
}
}
const{data}=await axios.request(options);
  return data;

}catch(error){
throw error
}
}


export async function getLoggedUserCart ():Promise<CartResponse>{


const cookieStore=await cookies();
const token=cookieStore.get("token")?.value||null

if(!token){


    throw new Error("Authentication required")
}

try{
const options:AxiosRequestConfig={
    url:"https://ecommerce.routemisr.com/api/v1/cart",
    method:"GET",
    headers:{
        token
    }
}
const {data}=await axios.request(options)
return data
}catch(error){


    throw error;
}

}

export async function removeProductFromCart(productId:string):Promise<CartResponse>{

const cookieStore=await cookies();
const token=cookieStore.get("token")?.value||null

if(!token){


    throw new Error("Authentication required")
}

try{

const options:AxiosRequestConfig={
url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
method:"DELETE",
headers:{
token
}

}
const{data}=await axios.request(options)

return data

}catch(error){

throw error;

}
}



export async function updateProdactQuantity(ProductId:string,count:number):Promise<CartResponse>{

const cookieStore=await cookies();
const token=cookieStore.get("token")?.value||null

if(!token){


    throw new Error("Authentication required")
}
try{

const options:AxiosRequestConfig={
url:`https://ecommerce.routemisr.com/api/v1/cart/${ProductId}`,
method:"PUT",
headers:{
token
},
data:{
  count
}
}
const{data}=await axios.request(options)
return data
}catch(error){

throw error


}

}