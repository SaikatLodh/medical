"use client";

import React, { useEffect } from "react";
import { Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { getsingeldoctor } from "@/apis/user/getsingeldoctor";
import { Doctor } from "@/type/type";
import { getrelatadeddoctors } from "@/apis/user/getrelatadeddoctors";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { createappointment } from "@/apis/user/createappointment";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type DatePicker = {
  date: Dayjs;
};

type paramsId = {
  id: string;
  speciality: string;
};

const GetSingleDoctor = () => {
  const params = useParams<paramsId>();
  const [doctor, setDoctor] = React.useState<Doctor | null>(null);
  const [relatedDoctors, setRelatedDoctors] = React.useState<Doctor[]>([]);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const { control, handleSubmit, reset } = useForm<DatePicker>({
    defaultValues: {
      date: dayjs(),
    },
  });

  const onSubmit: SubmitHandler<DatePicker> = (data: DatePicker) => {
    setLoading(true);
    const submitData = {
      date: data.date?.format("YYYY-MM-DD"),
      doctorid: params.id,
      time: data.date?.format("HH:mm"),
    };

    createappointment(submitData).then((res) => {
      if (res?.success === true) {
        setLoading(false);
        toast.success(res.message);
        reset();
        router.push("/getallappointments");
      }

      if (res?.success === false) {
        toast.error(res.message);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    getsingeldoctor(params.id).then((res) => setDoctor(res));
    getrelatadeddoctors(params.speciality).then((res) =>
      setRelatedDoctors(res)
    );
  }, [params.id, params.speciality]);

  return (
    <>
      <section className="container mx-auto py-6 px-6">
        <div className="flex bg-white shadow-md rounded-lg overflow-hidden border">
          <div className="w-1/4 flex items-center justify-center p-4">
            {doctor?.photo ? (
              <img
                src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}${doctor?.photo}`}
                alt="Doctor"
                className="rounded-lg w-full  object-cover"
              />
            ) : (
              <img
                src="https://i.pinimg.com/280x280_RS/e1/08/21/e10821c74b533d465ba888ea66daa30f.jpg"
                alt="Doctor"
                className="rounded-lg w-full h-[226px] object-cover"
              />
            )}
          </div>

          <div className="w-3/4 p-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {doctor?.name} <span className="text-blue-600">✔</span>
            </h2>
            <p className="text-gray-600">
              {doctor?.speciality}
              <span className="px-2 py-1 text-sm border rounded-full">
                {doctor?.experience} Years
              </span>
            </p>

            <div className="flex items-center gap-1 mt-4 text-gray-800">
              <Info size={16} />
              <h3 className="font-semibold">About</h3>
            </div>
            <p className="text-gray-600 text-sm mt-2">{doctor?.description}</p>

            <p className="font-semibold mt-4">
              Appointment fee:{" "}
              <span className="text-black">{doctor?.fees}</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["StaticDateTimePicker"]}>
              <DemoItem>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <StaticDateTimePicker
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>

          {loading ? (
            <button
              className="bg-[#5F6FFF] hover:bg-blue-500 transition-all duration-200 text-white font-bold py-2 px-4 rounded cursor-pointer mt-4"
              disabled
            >
              Loading...
            </button>
          ) : (
            <button
              className="bg-[#5F6FFF] hover:bg-blue-500 transition-all duration-200 text-white font-bold py-2 px-4 rounded cursor-pointer mt-4"
              type="submit"
            >
              Book Your Appointment
            </button>
          )}
        </form>
      </section>

      {/* Related Doctors Section */}
      <section className="container mx-auto py-12 px-6">
        <h2 className="text-center text-2xl font-semibold">Related Doctors</h2>
        <p className="text-center text-gray-600 mt-2 mb-6">
          Simply browse through our extensive list of trusted doctors.
        </p>
        <div className="flex justify-center gap-6">
          {relatedDoctors.length > 0 ? (
            relatedDoctors.map((doctor) => (
              <Card
                key={doctor?.id}
                className="w-64 p-4 shadow-md rounded-lg text-center"
              >
                <CardContent>
                  {doctor?.photo ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}${doctor?.photo}`}
                      alt="Doctor"
                      className="rounded-lg w-full h-[226px] object-cover"
                    />
                  ) : (
                    <img
                      src="https://i.pinimg.com/280x280_RS/e1/08/21/e10821c74b533d465ba888ea66daa30f.jpg"
                      alt="Doctor"
                      className="rounded-lg w-full h-[226px] object-cover"
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
                </CardContent>
              </Card>
            ))
          ) : (
            <h3 className="text-2xl font-semibold text-center">
              No Related Doctors
            </h3>
          )}
        </div>
      </section>
    </>
  );
};

export default GetSingleDoctor;
