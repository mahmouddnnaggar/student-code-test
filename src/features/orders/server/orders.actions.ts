"use server"
import {jwtDecode}from"jwt-decode"
import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers"
import { Order } from "../types/orders.types";

export async function getUserOrder():Promise<Order[]>{

const cookieStore= await cookies();
const token= cookieStore.get("token")?.value||null

if(!token){

  throw new Error("Authentication required")
}


try{
    const decoded:any=jwtDecode(token)
    const userId=decoded.id;
const options:AxiosRequestConfig={

url:`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
method:"GET",
headers:{
    token
}
}
const {data}=await axios.request(options)
return data


}catch(error){
 throw error

}



}
