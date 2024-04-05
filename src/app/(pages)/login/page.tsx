'use client'
import { BASE_URL } from '@/constants';
import useAuth from '@/context/useAuth';
import { loginUserProps } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify'

const login = () => {
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    const { register, handleSubmit, formState:{errors} } = useForm<loginUserProps>();
    const [cookies,setCookie] = useCookies(['token']);
    const onSubmit:SubmitHandler<loginUserProps> = async(data)=>{
        try {
            setLoading(true);
            const res = await axios.post(`${BASE_URL}/user/login`,data);
            if(res.status===200){
                toast.success(res.data.message);
            
                setAuthStatus(true);
                setCookie('token',res.data.token,{expires:new Date(Date.now()+864000000)});
                router.replace("/home")
            }
        } catch (error) {
            
        }
    }

    const {setAuthStatus,user,authStatus} = useAuth();
  return (
    <div className='flex flex-col justify-center h-screen gap-4 items-center'>
    <ToastContainer>

    </ToastContainer>
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
        <input  {...register("phone",{ required: true })}
          type="tel"
          id="phone"
          name="phone"
        
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone ? 'border-red-500' : ''}`}
          placeholder="Your Phone number"
        />
        {errors.phone && <p className="text-red-500 text-xs italic">Phone is required</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input {...register("password",{ required: true })}
          type="password"
          id="password"
          name="password"
         
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
          placeholder="Your Password"
        />
        {errors.password && <p className="text-red-500 text-xs italic">Password is required</p>}
      </div>
      <div className="flex items-center justify-between">
        <button type="submit" disabled ={loading}className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Sign In {loading&&' ....'}
        </button>
      </div>
    </form>

    </div>
  )
}

export default login