"use server"


import { email, success } from 'zod';

import axios, {AxiosError, AxiosRequestConfig}from "axios"

import { SignupForValuse, signupSchema } from "../schemas/signup.schema";

export default async function SignupAction(values:SignupForValuse) {
      
console.log("signupAction called with valuse",values)

    const ValidationResult=signupSchema.safeParse(values)
    console.log("validation Result",ValidationResult)
if(!ValidationResult.success){
const errors:Record<string,string>={};
  

if(ValidationResult.error){

   ValidationResult.error.issues.forEach((issues)=>{

    const field=issues.path[0]as string;
    const message=issues.message;

if(!errors[field]){
    errors[field]=message
}


   })
}

return{
    success:false,
    message:"validation Errors",
    errors,
};



}
    const {terms,mobile, ... requestBody}=values

try{
        const options:AxiosRequestConfig={
            url:"https://ecommerce.routemisr.com/api/v1/auth/signup",
            method:"POST",
            data:requestBody,


        }
const {data}=await axios.request(options)
console.log("Api Response",data)

return{
    success:true,
    message:"account created successFully ",data
}



}catch (error:any) {  


if(error instanceof AxiosError){
    console.log("Axios Error Response",error.response?.data)
const errorMessage= error.response?.data.message;
if(errorMessage.toLowerCase().includes("user already exists")){

    console.log(error.response?.data)
return{
success:false,
message:"account exists",
errors:{

email:"an account with this email already exists",
}



}



}

return{
    success:false,
    message:"something went wrong, pleas try again later"
}


}


}

}