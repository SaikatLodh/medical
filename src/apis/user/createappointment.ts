import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const createappointment = async (data: {
  date: string;
  doctorid: string;
  time: string;
}) => {
  const { data: authUser } = await supabase.auth.getUser();

  if ((authUser.user?.user_metadata.role === "Patient") === false) {
    return {
      success: false,
      message: "You are not authorized to create an appointment",
      status: 401,
    };
  }

  const { error } = await supabase.from("appointment").insert(data);

  if (error) {
    return {
      success: false,
      message: error.message,
      status: 400,
    };
  }

  return {
    success: true,
    message: "Appointment created successfully",
    status: 201,
  };
};

export { createappointment };
