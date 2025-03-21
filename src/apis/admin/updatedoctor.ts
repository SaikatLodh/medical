import { addDoctors } from "@/type/type";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const updatedoctor = async (data: addDoctors, id: string) => {
  const { data: authUser } = await supabase.auth.getUser();

  if (
    authUser.user?.user_metadata.role !== "Admin" &&
    authUser.user?.user_metadata.role !== "Doctor"
  ) {
    return {
      success: false,
      message: "You are not authorized to update a doctor",
      status: 401,
    };
  }

  if (data.photo[0]) {
    const { data: dataBucket } = await supabase.storage
      .from("doctor")
      .list(`${id}`);

    const getFileName = dataBucket?.map((item) => item.name).join(",");
    const path = `${id}/${getFileName}`;

    const { data: updatebucket, error } = await supabase.storage
      .from("doctor")
      .update(path, data.photo[0], {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      return {
        success: false,
        message: `${error?.message}`,
        status: 400,
      };
    }

    if (updatebucket.fullPath) {
      const { data: updatedata, error: doctorbaseerror } = await supabase
        .from("doctor")
        .update({ photo: updatebucket.fullPath })
        .eq("id", id)
        .single();
      console.log(updatedata);
      if (doctorbaseerror) {
        return {
          success: false,
          message: doctorbaseerror.message,
          status: 400,
        };
      }

      return {
        success: true,
        message: "Doctor updated successfully",
        status: 201,
      };
    }
  }

  if (!data.photo[0]) {
    const { error } = await supabase.from("doctor").update(data).eq("id", id);

    if (error) {
      return {
        success: false,
        message: error.message,
        status: 400,
      };
    }
    return {
      success: true,
      message: "Doctor updated successfully",
      status: 201,
    };
  }
};

export { updatedoctor };
