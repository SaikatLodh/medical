import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const getAppoinments = async () => {
  const { data } = await supabase.auth.getUser();

  if ((data.user?.user_metadata.role === "Admin") === false) {
    return {
      status: 401,
      message: "You are unauthorized user",
      success: false,
    };
  }
  const { data: getallAppointments } = await supabase
    .from("appointment")
    .select(
      "id,created_at,date,time,status,cancellation,user:userid(id,created_at,email,phone,gender,birthday,fullname,profilepic),doctor:doctorid(id,created_at,photo,name,email,speciality,education,experience,addressone,addresstwo,fees)"
    )
    .order("created_at", { ascending: false });

  if (getallAppointments) {
    return getallAppointments;
  }

  return [];
};

export { getAppoinments };
