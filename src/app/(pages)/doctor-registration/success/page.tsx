import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 className="text-3xl font-bold mb-4">Registration Accepted</h1>
    <p className="text-lg mb-6">Your request for registration as a doctor has been accepted.</p>
    <p className="text-lg mb-6">Our representative will come for document verification soon.</p>
    <img src="/success.png" alt="Verification Illustration" className="w-64" />
  </div>
  )
}

export default page