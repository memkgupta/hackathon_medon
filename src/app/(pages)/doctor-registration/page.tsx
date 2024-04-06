'use client'
import DoctorRegistrationForm from '@/components/DoctorRegistrationForm'
import useAuth from '@/context/useAuth'
import { registerDoctorProps } from '@/types'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const page = () => {
const router = useRouter();
const {authStatus,user} = useAuth();
 

useEffect(()=>{
  if(!authStatus){
      router.push('/login');
  }
  },[]);
  return (
    <div className=' '>

<div className='mt-12 mx-12'>
<DoctorRegistrationForm/>
</div>

    </div>
  )
}

export default page