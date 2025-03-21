import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const getDoctors = async () => {
  const { data } = await supabase
    .from("doctor")
    .select(
      "id,photo,name,speciality,education,experience,addressone,addresstwo,fees,description"
    );

  if (data) {
    return data;
  }

  return [];
};

export { getDoctors };
