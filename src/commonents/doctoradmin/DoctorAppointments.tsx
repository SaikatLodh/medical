"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { getallAppoinment } from "@/type/type";
import { getallAppointments } from "@/apis/doctor/getallappointments";

const DoctorAppointments = () => {
  const [appointments, setappointments] = useState<getallAppoinment[]>([]);

  useEffect(() => {
    getallAppointments().then((data) => {
      if (data) {
        setappointments(data);
      }
    });
  }, []);
  return (
    <div>
      <div>
        <section className="container mx-auto py-6 px-6">
          <h2 className="text-2xl font-semibold mb-4">All Appointments</h2>
          <Table className="w-full border rounded-lg shadow-sm">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="px-4 py-2">#</TableHead>
                <TableHead className="px-4 py-2">Patient</TableHead>
                <TableHead className="px-4 py-2">Gender</TableHead>
                <TableHead className="px-4 py-2">Phone</TableHead>
                <TableHead className="px-4 py-2">Date & Time</TableHead>
                <TableHead className="px-4 py-2">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment, index) => (
                <TableRow key={appointment.id}>
                  <TableCell className="px-4 py-2">{index + 1}</TableCell>
                  <TableCell className="px-4 py-2 flex items-center gap-2">
                    {appointment.user.profilepic ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}${appointment.user.profilepic}`}
                        alt={appointment.user.fullname}
                        width={30}
                        height={30}
                        className="rounded-full"
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

                    {appointment.user.fullname}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {appointment.user.gender}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {appointment.user.phone}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {appointment.date}| {appointment.time.slice(0, 5)}{" "}
                    {appointment.time >= "12:00" ? "PM" : "AM"}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    <p
                      className={`${
                        (appointment.status === "pending" &&
                          "text-[#5E6DFF]") ||
                        (appointment.status === "confirmed" &&
                          "text-green-500") ||
                        (appointment.status === "cancelled" && "text-red-500")
                      }`}
                    >
                      {" "}
                      {appointment.status}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </div>
    </div>
  );
};

export default DoctorAppointments;
