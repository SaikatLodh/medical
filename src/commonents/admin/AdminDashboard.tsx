"use client";

import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookMarked,
  BookOpenText,
  BriefcaseMedical,
  UserRound,
} from "lucide-react";

import toast from "react-hot-toast";
import { getDoctors } from "@/apis/admin/getdoctors";
import {
  Doctor,
  getallAppoinment,
  getallAppoinmentForAdmin,
  User,
} from "@/type/type";
import { latestappointment } from "@/apis/admin/latestappoinment";
import { getAppoinments } from "@/apis/admin/getallappointments";
import { getPatients } from "@/apis/doctor/getpatients";

const AdminDashboard = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [appointments, setAppoinments] = React.useState<
    getallAppoinmentForAdmin[]
  >([]);
  const [doctors, setDoctors] = React.useState<Doctor[]>([]);
  const [latestappointments, setLatestAppointments] = React.useState<
    getallAppoinment[]
  >([]);
  const stats = [
    { label: "Doctors", value: doctors.length, icon: <BriefcaseMedical /> },
    {
      label: "Appointments",
      value: appointments.length,
      icon: <BookOpenText />,
    },
    { label: "Users", value: users.length, icon: <UserRound /> },
  ];

  useEffect(() => {
    getPatients().then((data) => {
      if (data) {
        setUsers(data);
      } else {
        toast.error("Error fetching users");
      }
    });

    getAppoinments().then((data) => {
      if (data) {
        setAppoinments(data);
      } else {
        toast.error("Error fetching appointments");
      }
    });

    getDoctors().then((data) => {
      if (data) {
        setDoctors(data);
      } else {
        toast.error("Error fetching doctors");
      }
    });

    latestappointment().then((data) => {
      if (data) {
        setLatestAppointments(data);
      }
    });
  }, []);

  return (
    <div>
      <section className="container mx-auto py-6 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className=" flex items-center flex-row justify-center gap-4 p-4 shadow-md rounded-lg bg-gray-50"
          >
            <div className="text-[#5E6DFF]"> {stat.icon}</div>
            <CardContent className="flex flex-col">
              <span className="text-2xl font-semibold">{stat.value}</span>
              <span className="text-gray-500 text-sm">{stat.label}</span>
            </CardContent>
          </Card>
        ))}
      </section>
      <section className="container py-6 px-6 max-w-lg">
        <div className="flex items-center justify-between border-b pb-2 mb-3">
          <div className="flex items-center gap-4">
            <BookMarked size={30} color="#5F6DFE" />
            <h2 className="text-md font-semibold text-2xl">
              Latest Appointment
            </h2>
          </div>
        </div>
        {latestappointments.map((item) => {
          return (
            <>
              <Card
                className="p-4 shadow-md rounded-lg bg-gray-50"
                key={item.user.id}
              >
                <CardContent>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-6">
                      {item.user.profilepic ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}${item.user.profilepic}`}
                          alt={item.user.fullname}
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                      ) : (
                        <img
                          src="https://i.pinimg.com/280x280_RS/e1/08/21/e10821c74b533d465ba888ea66daa30f.jpg"
                          alt={item?.user?.fullname}
                          width={200}
                          height={200}
                          className="rounded-lg"
                        />
                      )}
                      <div>
                        <h3 className="text-sm font-semibold">
                          {item.user.fullname}
                        </h3>
                        <p className="text-gray-500 text-xs">
                          Booking on {item.date}
                        </p>
                      </div>
                    </div>
                    {/* <div className="flex items-center">
                      {item.status === "confirmed" ? (
                        <button className="text-green-500 hover:bg-red-100 p-2 rounded-full cursor-pointer">
                          confirmed
                        </button>
                      ) : item.status === "cancelled" ? (
                        <button className="text-red-500 hover:bg-red-100 p-2 rounded-full cursor-pointer">
                          cancelled
                        </button>
                      ) : (
                        <div>
                          <button
                            className="text-green-500 hover:bg-red-100 p-2 rounded-full cursor-pointer"
                            onClick={() => confirmStatusHandel(item?.id)}
                          >
                            <Check size={16} />
                          </button>
                          <Button
                            variant="ghost"
                            className="text-red-500 hover:bg-red-100 p-2 rounded-full cursor-pointer"
                            onClick={() => handleCancelAppointment(item.id)}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      )}
                    </div> */}
                  </div>
                </CardContent>
              </Card>
            </>
          );
        })}
      </section>
    </div>
  );
};

export default AdminDashboard;
