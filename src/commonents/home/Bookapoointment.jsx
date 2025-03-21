"use client"

import React from 'react'
import { Button } from "@/components/ui/button";
import Link from 'next/link';
const Bookapoointment = () => {
  return (
   <>
    <section className="flex items-center justify-between bg-[#5F6FFF] text-white px-10 py-16 rounded-lg h-[455px] my-20">
      {/* Left Content */}
      <div className="max-w-lg">
        <h1 className="text-4xl font-bold mb-4">Book Appointment<br />With 100+ Trusted Doctors</h1>
        {/* Button */}
      <Link href='/doctors'>
      <Button className="bg-white text-black font-medium px-6 py-2 rounded-full hover:bg-gray-200 mt-4 cursor-pointer">
          Make an Appointment
        </Button>
      </Link>  
      </div>
      {/* Right Image */}
      <div>
        <img src="https://prescripto.vercel.app/assets/appointment_img-DzbZlMsi.png" alt="Doctor" width={420} height={400}/>
      </div>
    </section>
   </>
  )
}

export default Bookapoointment
