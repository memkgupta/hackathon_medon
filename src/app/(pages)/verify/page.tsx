'use client'
import { BASE_URL } from '@/constants';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';

const page = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [otp, setOtp] = useState('');
    const [cookies,setCookie] = useCookies(['token']);
    const router = useRouter();
  const handleChange = (e:any) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    try {
const res = await axios.put(`${BASE_URL}/user/verify-otp`,{token:token,otp:otp});
        if(res.status===200){
            toast.success("OTP verification successfull");
            const token = res.data.token;
            setCookie('token',token,{expires:new Date(Date.now()+864000000)});
            router.replace('/home');
        }
    } catch (error:any) {
        toast.error(error.message)
    }


  };
  return (
    <div className="flex justify-center items-center h-screen">
   <ToastContainer/>
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <div className="mb-4">
        <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">
          Enter OTP
        </label>
        <input
          type="text"
          id="otp"
          name="otp"
          value={otp}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter OTP"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Verify OTP
        </button>
      </div>
    </form>
  </div>
  )
}

export default page