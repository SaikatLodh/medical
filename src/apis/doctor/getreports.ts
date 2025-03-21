import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const getReports = async () => {
  const { data: authUser } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("report")
    .select(
      "id ,created_at, doctorid ,userid ,image ,user:userid(id,created_at,email,phone,gender,birthday,fullname,profilepic)"
    )
    .eq("doctorid", authUser?.user?.id)
    .order("created_at", { ascending: false });

  if (data) {
    return data;
  }

  return [];
};

export { getReports };
