import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const changepassword = async (password: string) => {
  const { data, error } = await supabase.auth.updateUser({ password });
  if (error) {
    return {
      success: false,
      message: error.message,
      status: 500,
    };
  }
  console.log(data);
  return {
    success: true,
    message: "Password changed successfully",
    status: 200,
  };
};

export { changepassword };
