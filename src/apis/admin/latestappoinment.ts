import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const latestappointment = async () => {
  const { data } = await supabase.auth.getUser();

  if ((data.user?.user_metadata.role === "Admin") === false) {
    return {
      status: 401,
      message: "You are unauthorized user",
      success: false,
    };
  }

  const { data: latestappointment } = await supabase
    .from("appointment")
    .select(
      "id,created_at,date,time,status,cancellation,user:userid(id,created_at,email,phone,gender,birthday,fullname,profilepic)"
    )
    .range(0, 50)
    .order("created_at", { ascending: false });

  if (latestappointment) {
    return latestappointment;
  }

  return [];
};

export { latestappointment };
