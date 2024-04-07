'use client'
import { BASE_URL } from '@/constants'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [cookies] = useCookies(['token']);
  const [loading,setLoading] = useState(true);
  const router = useRouter()
  useEffect(()=>{
if(id&&cookies?.token){
  axios.get(`${BASE_URL}/doctor/request/${id}`,{headers:{Authorization:`Bearer ${cookies.token}`}})
  .then((res)=>{
    
  })
  .catch((err:any)=>{
    if(err.response){
      toast.error(err.response.data);
      router.replace("/home");
    }
  })
  .finally(()=>{
    setLoading(false);
  })

}
else{
  router.replace("/not-found");
}
  },[])
  return (
    <>
     {loading?"Loading":
     (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Registration Accepted</h1>
      <p className="text-lg mb-6">Your request for registration as a doctor has been accepted.</p>
      <p className="text-lg mb-6">Our representative will come for document verification soon.</p>
      <img src="/success.png" alt="Verification Illustration" className="w-64" />
    </div>
     )}
    </>

  )
}

export default page