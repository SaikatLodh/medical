"use client";

import { getPatients } from "@/apis/doctor/getpatients";
import { patients } from "@/type/type";
import React, { useEffect } from "react";

const Patients = () => {
  const [patients, setPatients] = React.useState<patients[]>([]);

  useEffect(() => {
    getPatients().then((data) => {
      if (data) {
        setPatients(data);
      }
    });
  }, []);

  return (
    <div>
      <div className="w-full flex gap-[44px] flex-wrap mt-4">
        {patients.map((doctor) => (
          <>
            <div
              className="bg-gray-100 p-4 rounded-lg shadow-md"
              key={doctor?.user?.id}
            >
              {doctor?.user?.profilepic ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}${doctor?.user?.profilepic}`}
                  alt={doctor?.user?.fullname}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              ) : (
                <img
                  src="https://i.pinimg.com/280x280_RS/e1/08/21/e10821c74b533d465ba888ea66daa30f.jpg"
                  alt={doctor?.user?.fullname}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              )}

              <div className="mt-3 text-left">
                <h3 className="text-lg font-semibold mt-1">
                  {doctor?.user?.fullname}
                </h3>
                <h4 className="font-medium ">{doctor?.user?.phone}</h4>

                <p className="text-gray-500 text-sm">{doctor.user.gender}</p>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Patients;
