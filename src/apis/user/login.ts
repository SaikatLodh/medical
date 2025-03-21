"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data: session } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      success: false,
      message: error.message,
      status: 500,
    };
  }

  if (session) {
    const { data: userRole } = await supabase.auth.getUser();

    if (userRole.user?.email === "adminn@yopmail.com") {
      const { data: adminData } = await supabase
        .from("admin")
        .select("*")
        .eq("email", "adminn@yopmail.com")
        .single();

      if (!adminData) {
        await supabase.auth.updateUser({
          data: {
            role: "Admin",
          },
        });

        const { error } = await supabase.from("admin").insert({
          email: session.user.email,
          fullname: "Saikat Lodh",
          role: userRole.user.user_metadata.role,
        });

        if (error) {
          return {
            status: 500,
            message: error.message,
            success: false,
          };
        }
      }
    }

    if (userRole.user?.user_metadata.role === "Patient") {
      const { data: user } = await supabase
        .from("user")
        .select("*")
        .eq("email", data?.email)
        .limit(1)
        .single();

      if (!user) {
        const { error: userError } = await supabase.from("user").insert({
          email: session?.user?.email,
          fullname: session?.user?.user_metadata?.fullname,
          role: userRole?.user?.user_metadata?.role,
        });

        if (userError) {
          return {
            status: 500,
            message: userError.message,
            success: false,
          };
        }
      }
    }

    if (session) {
      return {
        status: 200,
        message: "User login successfully",
        success: true,
      };
    }

    if (userRole.user?.user_metadata.role === "Patient") {
      revalidatePath("/", "layout");
      redirect("/home");
    }

    if (userRole.user?.user_metadata.role === "Doctor") {
      revalidatePath("/", "layout");
      redirect("/doctoradmin");
    }

    if (userRole.user?.user_metadata.role === "Admin") {
      revalidatePath("/", "layout");
      redirect("/admin");
    }
  }
}
