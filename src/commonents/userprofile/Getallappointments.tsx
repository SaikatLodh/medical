"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllAppointments } from "@/apis/user/getallappointment";
import { appoinment, responseType } from "@/type/type";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { cancelAppointment } from "@/apis/user/cancelappointment";

const Getallappointments = () => {
  const [appointments, setAppointments] = React.useState<appoinment[]>([]);
  const [userData, setUserData] = React.useState("");

  React.useEffect(() => {
    const getData = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        return "";
      }
      if (data.user.id) {
        setUserData(data.user.id);
      }
    };

    getData();
  }, []);

  React.useEffect(() => {
    if (!userData) return;
    getAllAppointments(userData).then((data: appoinment[]) => {
      setAppointments(data);
    });
  }, [userData]);

  const handleCancelAppointment = (id: string) => {
    cancelAppointment(id).then((data: responseType) => {
      if (data.success) {
        toast.success(data.message);

        setAppointments((prevAppointments) =>
          prevAppointments.map((item) =>
            item.id === id
              ? { ...item, cancellation: true, status: "cancelled" }
              : item
          )
        );
      } else {
        toast.error(data.message);
      }
    });
  };

  return (
    <div>
      <section className="container mx-auto py-6 px-6 max-w-3xl">
        {appointments.length > 0 ? (
          <>
            {appointments.map((appointment) => (
              <Card
                className="p-4 shadow-md rounded-lg flex items-center justify-between"
                key={appointment?.id}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}${appointment?.doctor?.photo}`}
                    alt="Dr. Richard James"
                    className="rounded-lg w-[100%] h-[100%] object-cover"
                  />
                  <div className="w-[70%]">
                    <h2 className="text-lg font-semibold">
                      {appointment?.doctor?.name}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {appointment?.doctor?.speciality}
                    </p>
                    <p className="text-sm font-semibold mt-2">Address:</p>
                    <p className="text-gray-600 text-sm">
                      {appointment?.doctor?.addressone}
                    </p>
                    <p className="text-sm font-semibold mt-2">Date & Time:</p>
                    <p className="text-gray-600 text-sm">
                      {appointment.date}| {appointment.time.slice(0, 5)}{" "}
                      {appointment.time >= "12:00:00" ? "PM" : "AM"}
                    </p>
                    <div className="flex flex-col gap-2 my-4">
                      {/* {appointment.cancellation === true ? (
                        <Button
                          className="bg-[#5E6EFF] text-white px-4 py-2 rounded-md cursor-pointer transition-all duration-300"
                          disabled
                        >
                          Pay
                        </Button>
                      ) : (
                        <Button className="bg-[#5E6EFF] text-white px-4 py-2 rounded-md cursor-pointer transition-all duration-300">
                          Pay
                        </Button>
                      )} */}

                      {appointment.status === "confirmed" && (
                        <Button className="bg-[#5E6EFF] text-white px-4 py-2 rounded-md cursor-pointer transition-all duration-300">
                          <Link
                            href={`report/${appointment?.doctorid}`}
                            className="w-full"
                          >
                            Send Reports
                          </Link>
                        </Button>
                      )}

                      {appointment.status === "confirmed" && (
                        <Button className="bg-[#5E6EFF] text-white px-4 py-2 rounded-md cursor-pointer transition-all duration-300">
                          <Link
                            href={`getalldoctorreports/${appointment?.doctorid}`}
                            className="w-full"
                          >
                            See Reports
                          </Link>
                        </Button>
                      )}

                      {appointment.cancellation === true ? (
                        <Button
                          variant="outline"
                          className="border-gray-400 px-4 py-2 rounded-md cursor-pointer bg:hover:bg-gray-200 transition-all duration-300"
                          disabled
                        >
                          Canceled
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="border-gray-400 px-4 py-2 rounded-md cursor-pointer bg:hover:bg-gray-200 transition-all duration-300"
                          onClick={() =>
                            handleCancelAppointment(appointment.id)
                          }
                        >
                          Cancel appointment
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </>
        ) : (
         (
          <h2 className="text-2xl font-semibold text-center">No Appointments</h2>
         )
        )}
      </section>
    </div>
  );
};

export default Getallappointments;
