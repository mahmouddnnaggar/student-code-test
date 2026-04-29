"use client";

import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faSpinner, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/dist/client/link'
import {SubmitHandler, useForm}from "react-hook-form"
import {date, object, z}from "zod"
import{zodResolver}from"@hookform/resolvers/zod"
import{SignupForValuse, signupSchema}from"../../schemas/signup.schema"
import SignupAction from '../../server/signup.actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
export default function SignupForm() {

 const  router=  useRouter()


const {register,
    handleSubmit,
    setError,
    formState:{errors,isSubmitting}
}=useForm<SignupForValuse>({

    defaultValues:{
        
  name: "",
  email: "",
  password: "",
  rePassword: "",
  mobile:"",
  terms:false,
  dateOfBirth:"",
  gender:"male",
    },







resolver:zodResolver(signupSchema),
mode:"onSubmit",
reValidateMode:"onChange"
});

;[]




const onSubmit:SubmitHandler<SignupForValuse>= async (values:any)=>{
const dataToSend={
  
  name:values.name,
  email:values.email,
  password: values.password,
  rePassword:values.rePassword,
  mobile:values.mobile,
  gender:values.gender,
dateOfBirth:values.dateOfBirth,
  terms:values.terms,



}


try{  const response = await  SignupAction(dataToSend as any);

if(response?.success){
toast.success(response.message);
setTimeout(()=>{
  router.push("/login")
},2000)

}else{
  if(response?.errors){
//setError("name",{message:"name is required"})

Object.keys(response.errors).forEach((key)=>{
setError(key as keyof SignupForValuse,{message:response.errors[key]})

});
  }
}

}catch(error){


console.log(error)

}






}





  return (
    <>
      <div className='bg-white shadow-xl rounded-xl p-6'>

        <div className="title text-center mb-4">
          <h2 className='text-3xl font-bold'>Create Your Account</h2>
          <p className='mt-1'>Start Your fresh journey with us today</p>
        </div>

        <div className='flex gap-4 mb-4 py-4 justify-center'>
          <button className='bg-white border border-gray-50 hover:bg-gray-700 px-6 py-2 rounded-lg transition duration-300 cursor-pointer flex items-center justify-center gap-2 w-70'>
            <FontAwesomeIcon className="text-red-500" icon={faGoogle} />
            <span>Google</span>
          </button>

          <button className='bg-gray-500/20 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition duration-300 cursor-pointer w-70 flex items-center justify-center gap-2'>
            <FontAwesomeIcon icon={faFacebook} className="text-blue-500" />
            <span>Facebook</span>
          </button>
        </div>

        <div className='relative flex py-5 items-center'>
          <div className='flex-grow border-t border-gray-400'></div>
          <span className='flex-shrink mx-4 text-gray-400 text-sm'>or</span>
          <div className='flex-grow border-t border-gray-400'></div>
        </div>

        <form className='space-y-4'onSubmit={handleSubmit(onSubmit)}>

          {/* Name */}
          <div className='flex flex-col items-start w-full'>
            <label className='text-sm font-semibold text-gray-700 mb-1' htmlFor="name">
              Name
            </label>
            <input
              className='border border-gray-300 p-2 rounded-md focus:outline-green-500 w-full'
              type="text"
              id='name'
              placeholder='your name'
        {...register("name"
            
        )}

            />
            {errors.name&&<p className='text-red-500'>*{errors.name.message}</p>}
        
          </div>

          {/* Email */}
          <div className='flex flex-col items-start w-full'>
            <label className='text-sm font-semibold text-gray-700 mb-1' htmlFor="email">
              Email
            </label>
            <input
              className='border border-gray-300 p-2 rounded-md focus:outline-green-500 w-full'
              type="email"
              id='email'
              placeholder='your email'
              {...register("email")}
            />
                        {errors.email&&<p className='text-red-500'>*{errors.email.message}</p>}

          </div>

          {/* Phone */}
          <div className='flex flex-col items-start w-full'>
            <label className='text-sm font-semibold text-gray-700 mb-1' htmlFor="phone">
              Phone
            </label>
            <input
              className='border border-gray-300 p-2 rounded-md focus:outline-green-500 w-full'
              type="tel"
              id='phone'
              placeholder='+2 010 9751 4862'
              {...register("mobile")}
            />
                        {errors.mobile&&<p className='text-red-500'>*{errors.mobile.message}</p>}

          </div>

          {/* Password */}
          <div className='flex flex-col items-start w-full'>
            <label className='text-sm font-semibold text-gray-700 mb-1' htmlFor="password">
              Your Password
            </label>
            <input
              className='border border-gray-300 p-2 rounded-md focus:outline-green-500 w-full'
              type="password"
              id='password'
              placeholder='create a strong password'
              {...register("password")}
            />
            
    {errors.password&&<p className='text-red-500'>*{errors.password.message}</p>}


          </div>

<div className='password-strength flex gap-2 items-center'>
    <div className='bark w-full h-1  overflow-hidden  bg-gray-400 rounded-xl'>
<div className='progress w-1/4 bg-red-500 h-full rounded-xl'></div>
    </div>
<span>Week</span>
</div>



          {/*  rePassword */}
          <div className='flex flex-col items-start w-full'>
            <label className='text-sm font-semibold text-gray-700 mb-1' htmlFor="rePassword">
              Confirm Password
            </label>
            <input
              className='border border-gray-300 p-2 rounded-md focus:outline-green-500 w-full'
              type="password"
              id='rePassword'
              placeholder='re-enter password'
              {...register("rePassword")}
            />
             {errors.rePassword&&<p className='text-red-500'>*{errors.rePassword.message}</p>}

          </div>
 



{/* Date of Birth */}
<div className='flex flex-col items-start w-full'>
  <label
    className='text-sm font-semibold text-gray-700 mb-1'
    htmlFor="dateOfBirth"
  >
    Date of Birth
  </label>

  <input
    className='border border-gray-300 p-2 rounded-md focus:outline-green-500 w-full'
    type="date"
    id='dateOfBirth'
    {...register("dateOfBirth")}
  />

  {errors.dateOfBirth && (
    <p className='text-red-500'>*{errors.dateOfBirth.message}</p>
  )}
</div>




{/* Gender */}
<div className='flex flex-col items-start w-full'>
  <label className='text-sm font-semibold text-gray-700 mb-1'>
    Gender
  </label>

  <div className='flex gap-4'>
    <label className='flex items-center gap-2 text-sm text-gray-700'>
      <input
        type="radio"
        value="male"
        {...register("gender")}
        className="accent-green-500"
      />
      Male
    </label>

    <label className='flex items-center gap-2 text-sm text-gray-700'>
      <input
        type="radio"
        value="female"
        {...register("gender")}
        className="accent-green-500"
      />
      Female
    </label>
  </div>

  {errors.gender && (
    <p className='text-red-500'>*{errors.gender.message}</p>
  )}
</div>




          {/* Terms */}
          <div className='flex items-center gap-2'>
            <input  className="accent-green-500" type="checkbox" id='terms'{...register("terms")} />
            <label className='text-sm text-gray-700' htmlFor="terms">
              I agree to the <Link href={`/terms`} className="text-green-600">Terms of Service</Link> and <Link href={`/privacy`} className="text-green-600">Privacy Policy</Link>
            </label>
        {errors.terms&&<p className='text-red-500'>*{errors.terms.message}</p>}

          </div>

          {/* Submit */}
          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-800 transition flex items-center justify-center gap-2 cursor-pointer'
          >
            {isSubmitting ?(<>
            
            <FontAwesomeIcon icon={faSpinner}spin className="me-2"/>
               
                <span>Creating an account...</span>
              
            
            </>
            ):(<>
            <FontAwesomeIcon icon={faUserPlus} className="me-2"/>
               
                <span>Creating my Account</span>
                </>
  )}
          </button>

        </form>

        <p className='text-center mt-4'>
          Already have an account? <Link href={`/login`} className="text-green-600">Sign In</Link>
        </p>

      </div>
    </>
  )
}