import { createClient } from "@/utils/supabase/client";

const supase = createClient();

const getPatients = async () => {
  const { data } = await supase.auth.getUser();

  if ((data.user?.user_metadata.role === "Doctor") === false) {
    return {
      success: true,
      message: "You are not authorized user",
      status: 401,
    };
  }

  const { data: patients } = await supase
    .from("appointment")
    .select(
      "user:userid(id,created_at,email,phone,gender,birthday,fullname,profilepic)"
    )
    .eq("doctorid", data.user.id)
    .order("created_at", { ascending: false });

  if (patients) {
    return patients;
  }

  return [];
};

export { getPatients };
