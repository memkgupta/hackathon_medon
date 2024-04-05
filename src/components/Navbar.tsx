"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GrUserManager } from "react-icons/gr";
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10 bg-red-200">
    <Link href="/home" className="flex items-center gap-1">
      <Image
        src="/icons/logo.svg"
        width={32}
        height={32}
        alt="medon_logo"
        className="max-sm:size-10"
      />
      <p className="text-[26px] font-extrabold  max-sm:hidden">
        Medon
      </p>
    </Link>
    <div className="flex-between gap-5">
  

     
    </div>
  </nav>
  )
}

export default Navbar