"use client";

import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormTypes } from '../../schemas/login.schema';
import { LoginFormValues, loginSchema } from '../../schemas/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import loginAction from '../../server/login.actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { faEnvelope, faLock, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { setToken } from '../../server/auth.actions';
import { setAuthInfo } from '../../server/auth.slice';
import { userInfo } from 'os';
import { useDispatch } from 'react-redux';

export default function LoginForm() {

  const router = useRouter()
const didpatch=useDispatch()
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } =
    useForm<LoginFormTypes>({
      defaultValues: {
        email: "",
        password: "",
        rememberMe: false
      },
      resolver: zodResolver(loginSchema),
      mode: "onSubmit",
      reValidateMode: "onChange"
    })

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      const respons = await loginAction(values)

      if (respons.success) {

        await setToken(respons.data.token, values.rememberMe);


      didpatch(setAuthInfo( {isAuthenticated:true,userInfo:{...respons.data.user}}))

        toast.success(respons?.message)

        setTimeout(() => {
          router.push("/")
        }, 3000)

      } else {
        if (respons?.errors) {
          Object.keys(respons.errors).forEach((key) => {
            setError(key as keyof LoginFormValues, { message: respons.errors[key] })
          })
        }
      }

    } catch (error) { }
  }

  return (
    <>
      <div className='bg-white shadow-xl rounded-xl p-6'>

        <div className="title text-center mb-4">
          <h2 className='text-3xl font-bold'>Fresh <span className='text-green-500'>Cart</span></h2>
          <h3 className='text-green-500 text-3xl font-bold'>Welcom Back!</h3>
          <p className='mt-1'>Sign in continue your fresh shopping experience</p>
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

        <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>

          {/* Email */}
          <div className='flex flex-col items-start w-full space-y-1'>
            <label className='text-sm font-semibold text-gray-700' htmlFor="email">
              Email
            </label>

            <div className='relative w-full'>

              <input
                className='peer border border-gray-300 p-2 pl-10 rounded-md focus:outline-green-500 w-full'
                type="email"
                id='email'
                required
                {...register("email")}
              />

              
              <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'>
                <FontAwesomeIcon icon={faEnvelope} />
              </div>

              
              <span className='absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none
                               peer-focus:hidden peer-valid:hidden'>
                Enter your email
              </span>

            </div>

            {errors.email && (
              <p className='text-red-500 text-sm'>*{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className='flex flex-col items-start w-full space-y-1'>
            <label className='text-sm font-semibold text-gray-700'>
              Your Password
            </label>

            <div className="relative w-full">

              <input
                type="password"
                required
                className="peer border border-gray-300 p-2 pl-10 rounded-md w-full focus:outline-green-500"
                {...register("password")}
              />

              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <FontAwesomeIcon icon={faLock} />
              </div>

              <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none
                               peer-focus:hidden peer-valid:hidden">
                Enter your password
              </span>

            </div>

            {errors.password && (
              <p className='text-red-500 text-sm'>{errors.password.message}</p>
            )}
          </div>

          <div className='flex items-center justify-start py-2'>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className='h-4 w-4 accent-green-600 border-2 border-gray-300 rounded'
                {...register("rememberMe")}
              />
              <span className='text-sm text-gray-700'>
                keep me signed in
              </span>
            </label>
          </div>

          <button
            type='submit'
            className='w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-800 transition flex items-center justify-center gap-2 cursor-pointer'
          >
            {
              isSubmitting ? <>
                <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                <span>Signing in....</span>
              </> : <>sign in</>
            }
          </button>

        </form>

        <p className='text-center mt-4'>
          New to FreshCart? <Link href={`/login`} className="text-green-600">Creat an account</Link>
        </p>

      </div>
    </>
  );
}