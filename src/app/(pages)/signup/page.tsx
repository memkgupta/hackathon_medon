"use client"
import { BASE_URL } from '@/constants';

import { registerUserProps } from '@/types';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import React, { FormEvent, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

import { ToastContainer, toast } from 'react-toastify';

const page = () => {
    const [loading,setLoading] = useState(false);
    const router = useRouter();
  
      
    const [view,setView] = useState(false);
   

      const {
        register,handleSubmit,watch,formState:{errors}
      } = useForm<registerUserProps>();
      const onSubmit : SubmitHandler<registerUserProps> = async(data)=>{
setLoading(loading);
try {
const res = await axios.post(`${BASE_URL}/user/register`,data);
    if(res.status===201){
        toast.success("User Registration successfull");
        router.replace(`/verify?token=${res.data.token}`)
    }
    else{
        toast.error(res.data.message);
    }
} catch (error:any) {
    toast.error(error.message);
}

      }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
        <ToastContainer></ToastContainer>
      <div className="bg-white p-10 rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>
<form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mx-auto">
<div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Full Name</label>
        <input {...register("fullName",{ required: true })}
          type="text"
          id="fullName"
          name="fullName"
         
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.fullName ? 'border-red-500' : ''}`}
          placeholder="Your Name"
        />
       
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Your Phone number</label>
        <input {...register("phone",{ required: true, pattern: /^[a-zA-Z0-9_.]+$/ })}
          type="tel"
          id="phone"
          name="phone"
          
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone ? 'border-red-500' : ''}`}
          placeholder="Your Phone number"
        />
        {errors.phone && <p className="text-red-500 text-xs italic">Invalid Phone number</p>}
      </div>
     
      
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
        <input   {...register("password",{ required: true,minLength: 6,pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/})}
          type={`${view?'text':'password'}`}
          id="password"
          name="password"
          
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
          placeholder="Your Password"
        />
        {errors.password && <p className="text-red-500 text-xs italic">Password should maintain the pattern</p>}
  
      </div>
    
      <div className="flex justify-center">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Sign Up {loading&&'....'}
        </button>
      </div>
</form>
      </div>
    </div>
  )
}

export default page