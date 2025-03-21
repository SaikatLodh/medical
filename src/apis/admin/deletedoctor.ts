"use server";

import { createClient } from "@/utils/supabase/server";

export async function deletedoctor(id: string) {
  const supabase = createClient();

  // const { error: authError } = await (
  //   await supabase
  // ).auth.admin.deleteUser(`${id}`);

  // if (authError) {
  //   return {
  //     success: false,
  //     message: authError.message,
  //     status: 400,
  //   };
  // }

  const { data: dataBucket } = await (await supabase).storage
    .from("doctor")
    .list(`${id}`);
  const getFileName = dataBucket?.map((item) => item.name).join(",");
  const path = `${id}/${getFileName}`;
  const { error: storageError } = await (await supabase).storage
    .from("doctor")
    .remove([path]);

  if (storageError) {
    return {
      success: false,
      message: storageError.message,
      status: 400,
    };
  }

  const { error: adminError } = await (await supabase)
    .from("admin")
    .update({ doctorid: null })
    .eq("doctorid", id);
  if (adminError) {
    return {
      success: false,
      message: adminError.message,
      status: 400,
    };
  }

  const { error: doctorError } = await (await supabase)
    .from("doctor")
    .delete()
    .eq("id", id);

  if (doctorError) {
    return {
      success: false,
      message: doctorError.message,
      status: 400,
    };
  }

  const { error: userError } = await (await supabase)
    .from("user")
    .update({ doctorid: null })
    .eq("doctorid", id);
  if (userError) {
    return {
      success: false,
      message: userError.message,
      status: 400,
    };
  }

  return {
    success: true,
    message: "Doctor deleted successfully",
    status: 200,
  };
}
