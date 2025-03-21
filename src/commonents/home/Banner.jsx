"use client"

import React from 'react'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from 'next/link';

const Banner = () => {
  
  return (
    <>
    <section className="flex items-center justify-between bg-[#5F6FFF] text-white px-10  rounded-lg">
      {/* Left Content */}
      <div className="max-w-lg">
        <h1 className="text-5xl font-bold mb-4">Book Appointment<br />With Trusted Doctors</h1>
        <p className="text-sm text-gray-200 mb-4 flex gap-2 py-4">
            <span><img src="https://prescripto.vercel.app/assets/group_profiles-BCL6AVF5.png" alt="" /></span>
          Simply browse through our extensive list of trusted doctors,
          schedule your appointment hassle-free.
        </p>
        {/* Avatars */}
       
        {/* Button */}
     <Link href='/doctors'>
     <Button className="bg-white text-black font-medium px-6 py-6 rounded-full hover:bg-gray-200 transition-all duration-200 cursor-pointer">
          Book appointment →
        </Button>
     </Link>   
      </div>
      {/* Right Image */}
      <div className='w-[500px]'>
        <img src={`https://prescripto.vercel.app/assets/header_img-DhAi3lLA.png`} alt="Doctors" className="w-[882px] " />
      </div>
    </section>
    </>
  )
}

export default Banner
