import { User } from "@/type/type";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const updateUserDetails = async (data: User, id: string) => {
  if (data.profilepic[0]) {
    const { data: dataBucket } = await supabase.storage
      .from("userprofile")
      .list(`${id}`);

    const getFileName = dataBucket?.map((item) => item.name).join(",");
    const pathName = `${id}/${getFileName}`;

    const { data: filedata, error } = await supabase.storage
      .from("userprofile")
      .update(pathName, data.profilepic[0], {
        upsert: true,
        cacheControl: "3600",
      });

    if (error) {
      return {
        success: false,
        message: error.message,
        status: 400,
      };
    }

    const updateData = {
      phone: data.phone,
      address: data.address,
      gender: data.gender,
      birthday: data.birthday,
      profilepic: filedata?.fullPath,
    };

    const { error: updateError } = await supabase
      .from("user")
      .update(updateData)
      .eq("id", id);

    if (updateError) {
      return {
        success: false,
        message: updateError?.message,
        status: 400,
      };
    }

    return {
      success: true,
      message: "Profile updated successfully",
      status: 201,
    };
  }

  if (!data.profilepic[0]) {
    const updateData = {
      phone: data.phone,
      address: data.address,
      gender: data.gender,
      birthday: data.birthday,
    };

    const { error } = await supabase
      .from("user")
      .update(updateData)
      .eq("id", id);

    if (error) {
      return {
        success: false,
        message: error?.message,
        status: 400,
      };
    }

    return {
      success: true,
      message: "Profile updated successfully",
      status: 201,
    };
  }
};

export { updateUserDetails };
