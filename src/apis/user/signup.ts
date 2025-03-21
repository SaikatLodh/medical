"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    fullname: formData.get("fullname") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    role: "Patient",
  };

  const { data: user } = await supabase.auth.getUser();
  if (user.user?.email === data.email) {
    return {
      success: false,
      message: "User already exist",
      status: 400,
    };
  }

  const { error, data: session } = await supabase.auth.signUp({
    email: data?.email,
    password: data?.password,
    options: {
      data: {
        fullname: data?.fullname,
        role: data?.role,
      },
    },
  });

  if (error) {
    redirect("/error");
  }

  if (session) {
    return {
      success: true,
      message: "Check youe mail for verification",
      status: 201,
    };
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
