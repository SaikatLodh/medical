import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";
const supabase = createClient();

const report = async (data: File, id: string) => {
  console.log(data);
  const { data: authUser } = await supabase.auth.getUser();

  if (authUser.user?.user_metadata.role !== "Patient") {
    return {
      stattus: 401,
      message: "Unauthorized",
      success: false,
    };
  }

  const path = `${authUser.user.id}/${uuidv4()}`;
  const { data: filedata, error } = await supabase.storage
    .from("report")
    .upload(path, data);

  if (error) {
    return {
      stattus: 400,
      message: error.message,
      success: false,
    };
  }

  const { error: inserterror } = await supabase.from("report").insert({
    image: filedata?.fullPath,
    userid: authUser.user.id,
    doctorid: id,
  });

  if (inserterror) {
    return {
      status: 400,
      message: inserterror.message,
      success: false,
    };
  }

  return {
    status: 200,
    message: "Report uploaded successfully",
    success: true,
  };
};

export { report };
