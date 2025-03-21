"use client";

import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getDoctors } from "@/apis/user/getdoctors";
import { Doctor } from "@/type/type";
import Link from "next/link";

const DoctorBook = () => {
  const [doctors, setDoctors] = React.useState<Doctor[]>([]);

  React.useEffect(() => {
    getDoctors().then((doctors) => {
      setDoctors(doctors);
    });
  }, []);
  return (
    <>
      <section className="text-center">
        <h2 className="text-3xl font-semibold">Top Doctors to Book</h2>
        <p className="text-gray-600 mt-2 mb-6">
          Simply browse through our extensive list of trusted doctors.
        </p>
        <div className="flex gap-6 flex-wrap">
          {doctors.map((doctor) => (
            <div
              className="bg-gray-100 p-4 rounded-lg shadow-md w-[16%]"
              key={doctor.id}
            >
              {doctor.photo ? (
                <Link
                  href={`/doctor/${doctor?.id}/speciality/${encodeURIComponent(
                    doctor?.name || ""
                  )}`}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}${doctor?.photo}`}
                    alt={doctor.name}
                    width={200}
                    height={200}
                    className="rounded-lg h-[282px] object-cover"
                  />
                </Link>
              ) : (
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  width={200}
                  height={200}
                  className="https://i.pinimg.com/280x280_RS/e1/08/21/e10821c74b533d465ba888ea66daa30f.jpg"
                />
              )}
              <div className="mt-3 text-left">
                <span className="text-green-600 font-medium">● Available</span>
                <h3 className="text-lg font-semibold mt-1">{doctor.name}</h3>
                <p className="text-gray-500 text-sm">{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default DoctorBook;
