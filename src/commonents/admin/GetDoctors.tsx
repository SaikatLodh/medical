"use clirent";

import React from "react";
import { getDoctors } from "@/apis/admin/getdoctors";
import { Doctor } from "@/type/type";
import Link from "next/link";
import { deletedoctor } from "@/apis/admin/deletedoctor";
import toast from "react-hot-toast";

const GetDoctors = () => {
  const [doctors, setDoctors] = React.useState<Doctor[]>([]);

  React.useEffect(() => {
    getDoctors().then((doctors) => {
      setDoctors(doctors);
    });
  }, []);

  const handelDelete = (id: string) => {
    deletedoctor(id).then((res) => {
      if (res.success === true) {
        toast.success(res.message);
        setDoctors(doctors.filter((doctor) => doctor.id !== id));
      }

      if (res.success === false) {
        toast.error(res.message);
      }
    });
  };

  return (
    <div>
      <div className="w-full flex gap-[44px] flex-wrap mt-4">
        {doctors.map((doctor) => (
          <>
            <div
              className="bg-gray-100 p-4 rounded-lg shadow-md"
              key={doctor.id}
            >
              <h3 className="text-lg font-semibold mt-1">{doctor.name}</h3>
              {doctor.photo ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}${doctor.photo}`}
                  // alt={doctor.name}
                  width={200}
                  height={200}
                  className="rounded-lg h-[200px] object-cover my-2"
                />
              ) : (
                <img
                  src="https://i.pinimg.com/280x280_RS/e1/08/21/e10821c74b533d465ba888ea66daa30f.jpg"
                  alt={doctor.name}
                  width={200}
                  height={200}
                  className="rounded-lg h-[200px] object-cover my-2"
                />
              )}
              <div className="mt-3 text-left">
                <span className="text-green-600 font-medium">● Available</span>
                <h3 className="text-lg font-semibold mt-1">{doctor.email}</h3>
                <p className="text-gray-500 text-sm">{doctor.speciality}</p>
              </div>
              <div className="flex justify-between mt-2 items-center">
                <Link href={`/admin/updatedoctor/${doctor.id}`}>
                  <button className="cursor-pointer">Edit</button>
                </Link>
                <button
                  className="cursor-pointer"
                  onClick={() => handelDelete(doctor.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default GetDoctors;
