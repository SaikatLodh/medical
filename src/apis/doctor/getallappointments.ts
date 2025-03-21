import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const getallAppointments = async () => {
  const { data } = await supabase.auth.getUser();

  if (
    data.user?.user_metadata.role !== "Doctor" &&
    data.user?.user_metadata.role !== "Admin"
  ) {
    return {
      status: false,
      message: "You are not authorized to access this page",
      success: false,
    };
  }

  const { data: appointments } = await supabase
    .from("appointment")
    .select(
      "id,created_at,date,time,status,cancellation,user:userid(id,created_at,email,phone,gender,birthday,fullname,profilepic)"
    )
    .eq("doctorid", data.user?.id)
    .order("created_at", { ascending: false });

  if (appointments) {
    return appointments;
  }

  return [];
};

export { getallAppointments };
