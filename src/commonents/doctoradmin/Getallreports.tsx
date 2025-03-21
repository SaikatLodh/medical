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
import { getpatainsreport } from "@/type/type";
import { getReports } from "@/apis/doctor/getreports";
import { downloadFile } from "@/apis/doctor/downloafile";
import toast from "react-hot-toast";

const Getallreports = () => {
  const [appointments, setappointments] = useState<getpatainsreport[]>([]);

  useEffect(() => {
    getReports().then((data) => {
      if (data) {
        setappointments(data);
      }
    });
  }, []);

  const handleDownload = (path: string) => {
    const extractPath = path.slice(path.indexOf("/") + 1);
    downloadFile(extractPath).then((data) => {
      if (data.success === true) {
        toast.success(data.message);
      }

      if (data.success === false) {
        toast.error(data.message);
      }
    });
  };
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
                <TableHead className="px-4 py-2">Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment, index) => (
                <TableRow key={appointment?.id}>
                  <TableCell className="px-4 py-2">{index + 1}</TableCell>
                  <TableCell className="px-4 py-2 flex items-center gap-2">
                    {appointment?.user?.profilepic ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}${appointment?.user?.profilepic}`}
                        alt={appointment?.user?.fullname}
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    ) : (
                      <img
                        src="https://i.pinimg.com/280x280_RS/e1/08/21/e10821c74b533d465ba888ea66daa30f.jpg"
                        alt={appointment?.user?.fullname}
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                    )}

                    {appointment?.user?.fullname}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {appointment?.user?.gender}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {appointment?.user?.phone}
                  </TableCell>
                  <TableCell className="px-4 py-2 ">
                    <button
                      className="bg-[#5F6DFF] hover:bg-blue-700 transition-all duration-300 text-white font-bold py-[5px] px-4 rounded cursor-pointer"
                      onClick={() => handleDownload(appointment?.image)}
                    >
                      Download Report
                    </button>
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

export default Getallreports;
