import { responseType } from "@/type/type";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const confirmstatus = async (id: string): Promise<responseType> => {
  const { data } = await supabase.auth.getUser();

  if (data.user?.user_metadata.role !== "Doctor") {
    return {
      status: 401,
      message: "You are not a Doctor",
      success: false,
    };
  }

  const { error } = await supabase
    .from("appointment")
    .update({ status: "confirmed" })
    .eq("id", id);

  if (error) {
    return {
      status: 500,
      message: error.message,
      success: false,
    };
  }

  return {
    status: 200,
    message: "Appointment confirmed successfully",
    success: true,
  };
};

export { confirmstatus };
