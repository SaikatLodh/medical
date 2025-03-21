import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const getAlldoctorreports = async (id: string) => {
  const { data } = await supabase.from("report").select("*").eq("doctorid", id);

  if (data) return data;

  return [];
};

export { getAlldoctorreports };
