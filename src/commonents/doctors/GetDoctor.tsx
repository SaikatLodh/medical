"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/type/type";
import { getDoctors } from "@/apis/user/getdoctors";

const GetDoctor = () => {
  const [doctors, setDoctors] = React.useState<Doctor[]>([]);
  const dublicatespecialities = doctors.map((doctor) => doctor.speciality);
  const specialities = [...new Set(dublicatespecialities)];

  const [selectedSpeciality, setSelectedSpeciality] = useState("");

  const filteredDoctors = selectedSpeciality
    ? doctors.filter((doctor) => doctor.speciality === selectedSpeciality)
    : doctors;

  React.useEffect(() => {
    getDoctors().then((doctors) => {
      setDoctors(doctors);
    });
  }, []);
  return (
    <>
      <section className=" py-12 px-6">
        <h2 className="text-lg font-semibold mb-4">
          Browse through the doctors specialist.
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4 space-y-2">
            {specialities.map((speciality, index) => (
              <Button
                key={index}
                onClick={() => setSelectedSpeciality(speciality)}
                className={`w-full py-2 px-4 border rounded-md text-left cursor-pointer bg-white text-black hover:bg-gray-100 ${
                  selectedSpeciality === speciality ? "bg-[#E2E5FF]" : ""
                }`}
              >
                {speciality}
              </Button>
            ))}
          </div>
          <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <Link
                href={`/doctor/${doctor?.id}/speciality/${encodeURIComponent(
                  doctor?.speciality || ""
                )}`}
                key={doctor?.id}
              >
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  {doctor.photo ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}${doctor?.photo}`}
                      alt={doctor.name}
                      width={200}
                      height={200}
                      className="rounded-lg h-[282px] object-cover"
                    />
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
                    <span className="text-green-600 font-medium">
                      ● Available
                    </span>
                    <h3 className="text-lg font-semibold mt-1">
                      {doctor.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{doctor.speciality}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default GetDoctor;
