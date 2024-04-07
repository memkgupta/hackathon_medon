'use client'
import DoctorCard from '@/components/DoctorCard';
import { BASE_URL } from '@/constants';
import { doctorProps } from '@/types';
import axios, { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const doctors = () => {
    const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [page,setPage] = useState(1);
  const [doctors,setDoctors] = useState<doctorProps[]>([]);
  const [totalResults,setTotalResults] = useState()
 const [loading,setLoading] = useState(true);
 

  const searchParams = useSearchParams();

  useEffect(()=>{
    const timer = setTimeout(() => {
        axios.get(`${BASE_URL}/doctor/search`,{params:{keyword:searchQuery?searchQuery:null,gender:selectedGender?selectedGender:null,page:page}})
        .then((res)=>{
     setDoctors(res.data.doctors);
     setTotalResults(res.data.totalDoctors);
        })
        .catch((error:any)=>{
         if(error.response?.data){
             toast.error(error.response.data)
     
         }
         else{
             toast.error("Some error occured");
         }
        })
        .finally(()=>{
     setLoading(false);
        })
      }, 300)
      return () => clearTimeout(timer);
  },[searchQuery,selectedGender])
  return (
    <div>
<div className="flex items-center justify-between mb-4">
      <input
        type="text"
        placeholder="Search by doctor's name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-1/2 mr-2"
      />
      <select
        value={selectedGender}
        onChange={(e) => setSelectedGender(e.target.value)}
        className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      >
        <option value="">Select Gender</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
        <option value="OTHER">Other</option>
      </select>
     
    </div>
    <div className='flex justify-start mt-12 p-2'>
    {
        doctors.length>0 &&
        (
            doctors.map((doctor,index)=>(
                <DoctorCard doctor={doctor} key={index}/>
            ))
        )
    }
    </div>
  
    </div>
  )
}

export default doctors