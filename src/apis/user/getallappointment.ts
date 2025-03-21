import { appoinment } from "@/type/type";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const getAllAppointments = async (id: string): Promise<appoinment[]> => {
  const { data, error } = await supabase
    .from("appointment")
    .select(
      "id, created_at, userid, date, time, status, doctorid,cancellation, doctor:doctorid(id, name, speciality, photo, addressone, addresstwo, fees)"
    )
    .eq("userid", id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching appointments:", error.message);
    return [];
  }

  // Convert doctor array to a single object
  const formattedData = data.map((appointment) => ({
    ...appointment,
    doctor: Array.isArray(appointment.doctor)
      ? appointment.doctor[0]
      : appointment.doctor,
  }));

  return formattedData;
};

export { getAllAppointments };
