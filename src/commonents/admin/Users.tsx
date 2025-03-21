"use client";

import { getUsers } from "@/apis/admin/getuser";
import { User } from "@/type/type";
import React, { useEffect } from "react";
import toast from "react-hot-toast";


const Patients = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  console.log(users);
  useEffect(() => {
    getUsers().then((data) => {
      if (data) {
        setUsers(data);
      } else {
        toast.error("Error fetching users");
      }
    });
  }, []);

  return (
    <div>
      <div className="w-full flex gap-[44px] flex-wrap mt-4">
        {users.map((doctor) => (
          <>
            <div
              className="bg-gray-100 p-4 rounded-lg shadow-md"
              key={doctor.id}
            >
              {doctor.profilepic ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}${doctor?.profilepic}`}
                  alt={doctor.role}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              ) : (
                <img
                  src="https://i.pinimg.com/280x280_RS/e1/08/21/e10821c74b533d465ba888ea66daa30f.jpg"
                  alt={doctor.role}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              )}

              <div className="mt-3 text-left">
                <h3 className="text-lg font-semibold mt-1">
                  {doctor?.fullname}
                </h3>
                <h4 className="font-medium ">{doctor?.phone}</h4>
                <h4 className="font-medium text-[13px]">{doctor?.address}</h4>

                <p className="text-gray-500 text-sm">{doctor.gender}</p>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Patients;
