import { doctorProps } from '@/types'
import Link from 'next/link'
import React from 'react'

const DoctorCard = ({doctor}:{doctor:doctorProps}) => {
  return (
    <Link href={`/doctor/${doctor._id}`} className="bg-white shadow-md w-2/3  rounded-lg p-4">
    <div className="flex items-center">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="w-16 h-16 rounded-full mr-4"
      />
      <div>
        <h2 className="text-lg font-semibold">Dr. {doctor.name}</h2>
        <p className="text-gray-600">gender {doctor.gender}</p>
        <span className="text-gray-600 flex gap-2">qualifications {doctor.qualifications.map((qualification,index)=>(<p>{qualification.name} ,</p>))}</span>
        <p className="text-gray-600">Rating: {doctor.ratings}</p>
      </div>
    </div>
  </Link>
  )
}

export default DoctorCard