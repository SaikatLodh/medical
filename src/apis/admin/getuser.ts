import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const getUsers = async () => {
  const { data } = await supabase.from("user").select("*");

  if (data) {
    return data;
  }

  return [];
};

export { getUsers };
