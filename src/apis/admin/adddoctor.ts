"use server";

import { sendMail } from "@/mail/semdmail";
import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";

export async function addDoctor(doctorData: {
  photo: File;
  name: string;
  email: string;
  speciality: string;
  education: string;
  password: string;
  experience: number;
  addressone: string;
  addresstwo?: string | undefined;
  fees: number;
  description: string;
}) {
  const supabase = createClient();
  const { data: adminData } = await (await supabase).auth.getUser();

  if ((adminData.user?.email === "adminn@yopmail.com") === false) {
    return {
      success: false,
      message: "You are not authorized to add a doctor",
      status: 404,
    };
  }
  const { data: doctorEmail } = await (await supabase)
    .from("doctor")
    .select("email")
    .eq("email", doctorData?.email)
    .single();

  if (doctorEmail) {
    return {
      success: false,
      message: "Doctor already exists",
      status: 400,
    };
  }

  const { error, data: session } = await (
    await supabase
  ).auth.signUp({
    email: doctorData?.email,
    password: doctorData?.password,
    options: {
      data: {
        fullname: doctorData?.name,
        role: "Doctor",
      },
    },
  });

  if (error) {
    return {
      success: false,
      message: `Error: ${error.message}`,
      status: 500,
    };
  }

  if (session) {
    sendMail({
      email: doctorData.email,
      subject: `Hey Doctor ${doctorData.name} this is your email and password`,
      message: `Email: ${doctorData.email} Password: ${doctorData.password}`,
    });
    const path = `${session?.user?.id}/${uuidv4()}`;
    const { data: filedata, error } = await (await supabase).storage
      .from("doctor")
      .upload(path, doctorData.photo);

    if (error) {
      return {
        success: false,
        message: `Error: ${error.message}`,
        status: 500,
      };
    } else {
      const { data: updateData, error } = await (
        await supabase
      )

        .from("doctor")
        .insert({
          id: session?.user?.id,
          photo: filedata?.fullPath,
          name: doctorData?.name,
          email: doctorData?.email,
          speciality: doctorData?.speciality,
          education: doctorData?.education,
          password: doctorData?.password,
          experience: doctorData?.experience,
          addressone: doctorData?.addressone,
          addresstwo: doctorData?.addresstwo,
          fees: doctorData?.fees,
          description: doctorData?.description,
          role: "Doctor",
        })
        .select("*");

      await (
        await supabase
      )
        .from("admin")
        .insert({
          doctorid: updateData?.[0]?.id,
        })
        .eq("email", adminData?.user?.email);

      if (error) {
        return {
          success: false,
          message: `Error: ${error.message}`,
          status: 500,
        };
      }
      if (updateData) {
        return {
          success: true,
          message: "Doctor added successfully",
          status: 201,
        };
      }
    }
  }
}
