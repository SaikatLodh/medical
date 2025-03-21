"use client";

import React from "react";

const About = () => {
  return (
    <>
      <section className="container mx-auto py-12 px-6">
        <h2 className="text-center text-3xl font-semibold mb-6">
          <span className="font-medium">ABOUT </span>{" "}
          <span className="font-bold">US</span>
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left Image */}
          <div className="md:w-1/3 border-4 border-blue-500 p-2 rounded-lg">
            <img
              src="https://prescripto.vercel.app/assets/about_image-MG9zrc7b.png"
              alt="Doctors"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
          {/* Right Content */}
          <div className="md:w-2/3 text-gray-700 text-lg">
            <p className="mb-4">
              Welcome to Prescripto, your trusted partner in managing your
              healthcare needs conveniently and efficiently. At Prescripto, we
              understand the challenges individuals face when it comes to
              scheduling doctor appointments and managing their health records.
            </p>
            <p className="mb-4">
              Prescripto is committed to excellence in healthcare technology. We
              continuously strive to enhance our platform, integrating the
              latest advancements to improve user experience and deliver
              superior service. Whether you're booking your first appointment or
              managing ongoing care, Prescripto is here to support you every
              step of the way.
            </p>
            <h3 className="font-semibold text-xl mt-6">Our Vision</h3>
            <p>
              Our vision at Prescripto is to create a seamless healthcare
              experience for every user. We aim to bridge the gap between
              patients and healthcare providers, making it easier for you to
              access the care you need, when you need it.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-12 px-6">
        <h2 className="text-left text-xl font-semibold mb-6">
          WHY <span className="font-bold"> US</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border rounded-lg p-6">
          <div className="border-r md:border-r md:border-b-0 p-4">
            <h3 className="font-bold text-lg">EFFICIENCY:</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>
          <div className="border-r md:border-r md:border-b-0 p-4 ">
            <h3 className="font-bold text-lg">CONVENIENCE:</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>
          <div className="p-4 ">
            <h3 className="font-bold text-lg">PERSONALIZATION:</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
