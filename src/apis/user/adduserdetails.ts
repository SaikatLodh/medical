import { User } from "@/type/type";
import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";
const supabase = createClient();

const addUserDetails = async (data: User, userid: string) => {
  const { data: dataBucket } = await supabase.storage
    .from("userprofile")
    .list(`${userid}`);
  const getFileName = dataBucket?.map((item) => item.name).join(",");
  const pathName = `${userid}/${getFileName}`;

  const { error: deleteError } = await supabase.storage
    .from("userprofile")
    .remove([pathName]);

  if (deleteError) {
    return {
      success: false,
      message: deleteError.message,
      status: 400,
    };
  }

  const path = `${userid}/${uuidv4()}`;
  const { data: filedata, error } = await supabase.storage
    .from("userprofile")
    .upload(path, data.profilepic[0]);

  if (error) {
    return {
      success: false,
      message: error.message,
      status: 400,
    };
  }

  const updataUser = {
    phone: data.phone,
    address: data.address,
    gender: data.gender,
    birthday: data.birthday,
    profilepic: filedata.fullPath,
  };

  const { error: updateError } = await supabase
    .from("user")
    .update(updataUser)
    .eq("id", userid);

  if (updateError) {
    return {
      success: false,
      message: updateError.message,
      status: 400,
    };
  }

  return {
    success: true,
    message: "User updated successfully",
    status: 200,
  };
};

export { addUserDetails };
