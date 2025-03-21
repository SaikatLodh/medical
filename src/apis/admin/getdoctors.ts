import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const getDoctors = async () => {
  const { data } = await supabase
    .from("doctor")
    .select(
      "id , created_at ,photo,name,email,speciality,education,experience,addressone,addresstwo,fees,description ,adminid"
    )
    .order("created_at", { ascending: false });

  if (data) {
    return data;
  }

  return [];
};

export { getDoctors };
