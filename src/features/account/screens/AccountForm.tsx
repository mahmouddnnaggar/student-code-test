"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faSpinner, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { changePasswordSchema, ChangePasswordValues } from '../schema/account.schema';
import changePasswordAction from '../server/account.actions';
import { setToken } from '@/features/auth/server/auth.actions';

export default function AccountForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<ChangePasswordValues>({
      resolver: zodResolver(changePasswordSchema),
      mode: "onSubmit"
    });

  const onSubmit = async (values: ChangePasswordValues) => {
    const response = await changePasswordAction(values);

    if (response.success) {
      await setToken(response.data.token, true);
      toast.success("Password updated successfully! 🔐");
      reset(); 
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className='bg-white shadow-xl rounded-xl p-6 max-w-lg mx-auto'>
      <div className="title text-center mb-6">
        <h2 className='text-3xl font-bold italic'>Secure <span className='text-green-500'>Account</span></h2>
        <p className='mt-1 text-gray-500'>Change your password to keep your account safe</p>
      </div>

      <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
        
        {/* Current Password */}
        <div className='flex flex-col items-start w-full space-y-1'>
          <label className='text-sm font-semibold text-gray-700'>Current Password</label>
          <div className="relative w-full">
            <input
              type="password"
              className="peer border border-gray-300 p-2 pl-10 rounded-md w-full focus:outline-green-500"
              {...register("currentPassword")}
              placeholder=" "
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <FontAwesomeIcon icon={faShieldHalved} />
            </div>
            <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none peer-focus:hidden peer-not-placeholder-shown:hidden">
              Enter current password
            </span>
          </div>
          {errors.currentPassword && <p className='text-red-500 text-sm'>*{errors.currentPassword.message}</p>}
        </div>

        {/* New Password */}
        <div className='flex flex-col items-start w-full space-y-1'>
          <label className='text-sm font-semibold text-gray-700'>New Password</label>
          <div className="relative w-full">
            <input
              type="password"
              className="peer border border-gray-300 p-2 pl-10 rounded-md w-full focus:outline-green-500"
              {...register("password")}
              placeholder=" "
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none peer-focus:hidden peer-not-placeholder-shown:hidden">
              New password
            </span>
          </div>
          {errors.password && <p className='text-red-500 text-sm'>*{errors.password.message}</p>}
        </div>

        {/* Re-Password */}
        <div className='flex flex-col items-start w-full space-y-1'>
          <label className='text-sm font-semibold text-gray-700'>Confirm Password</label>
          <div className="relative w-full">
            <input
              type="password"
              className="peer border border-gray-300 p-2 pl-10 rounded-md w-full focus:outline-green-500"
              {...register("rePassword")}
              placeholder=" "
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none peer-focus:hidden peer-not-placeholder-shown:hidden">
              Confirm new password
            </span>
          </div>
          {errors.rePassword && <p className='text-red-500 text-sm'>*{errors.rePassword.message}</p>}
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-800 transition flex items-center justify-center gap-2 cursor-pointer'
        >
          {isSubmitting ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
              <span>Updating Password...</span>
            </>
          ) : (
            "Update Password"
          )}
        </button>

      </form>
    </div>
  );
}