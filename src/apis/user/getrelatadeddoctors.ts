import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const getrelatadeddoctors = async (speciality: string) => {
  const { data: doctors } = await supabase
    .from("doctor")
    .select(
      "id,photo,name,speciality,education,experience,addressone,addresstwo,fees,description"
    )
    .eq("speciality", speciality);

  if (doctors) {
    return doctors;
  }

  return [];
};

export { getrelatadeddoctors };
