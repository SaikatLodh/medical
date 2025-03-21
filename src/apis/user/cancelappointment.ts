import { responseType } from "@/type/type";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();
const cancelAppointment = async (id: string): Promise<responseType> => {
  const { data } = await supabase.auth.getUser();

  if (
    data.user?.user_metadata.role !== "Patient" &&
    data.user?.user_metadata.role !== "Doctor"
  ) {
    return {
      success: false,
      message: "You are not authorized to cancel an appointment",
      status: 401,
    };
  }
  const { error } = await supabase
    .from("appointment")
    .update({
      status: "cancelled",
      cancellation: true,
    })
    .eq("id", id);
  if (error) {
    return {
      success: false,
      message: error.message,
      status: 400,
    };
  }
  return {
    success: true,
    message: "Appointment cancelled successfully",
    status: 200,
  };
};

export { cancelAppointment };
