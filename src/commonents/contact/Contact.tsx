"use client";

import React from "react";

import { Button } from "@/components/ui/button";
const Contact = () => {
  return (
    <>
      <section className="container mx-auto py-12 px-6">
        <h2 className="text-center text-3xl font-semibold mb-6">
          CONTACT <span className="font-bold">US</span>
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-8 pt-4">
          {/* Left Image */}
          <div className="md:w-1/2 flex justify-end">
            <img
              src="https://prescripto.vercel.app/assets/contact_image-IJu_19v_.png"
              alt="Doctor with Patient"
              width={500}
              height={350}
              className="rounded-lg"
            />
          </div>
          {/* Right Content */}
          <div className="md:w-1/2 text-gray-700 text-lg">
            <h3 className="font-semibold text-xl">OUR OFFICE</h3>
            <p className="mt-2 text-gray-600 text-sm">
              54709 Willins Station
              <br />
              Suite 350, Washington, USA
            </p>
            <p className="mt-2 text-gray-600 text-sm">Tel: (415) 555-0132</p>
            <p className="text-gray-600 text-sm">
              Email: greatstackdev@gmail.com
            </p>

            <h3 className="font-semibold text-xl mt-6">
              CAREERS AT PRESCRIPTO
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              Learn more about our teams and job openings.
            </p>
            <Button className="mt-4 border border-gray-600 text-gray-800 px-6 py-2 rounded-lg hover:bg-black hover:text-white transition-all duration-200 bg-white cursor-pointer">
              Explore Jobs
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
