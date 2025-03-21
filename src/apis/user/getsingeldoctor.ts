import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const getsingeldoctor = async (id: string) => {
  const { data } = await supabase
    .from("doctor")
    .select(
      "id,photo,name,speciality,education,experience,addressone,addresstwo,fees,description"
    )
    .eq("id", id)
    .single();

  if (data) {
    return data;
  }

  return null;
};

export { getsingeldoctor };
