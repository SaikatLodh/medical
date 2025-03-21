import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const getUser = async () => {
  const { data: authUser } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("id", authUser.user?.id)
    .single();

  if (error) {
    return {
      success: false,
      message: error.message,
      status: 400,
    };
  }

  if (data) {
    return data;
  }
};

export { getUser };
