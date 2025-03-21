"use client";

import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const getSingleDoctor = async (id: string) => {
  const { data } = await supabase
    .from("doctor")
    .select("*")
    .eq("id", id)
    .single();

  if (data) {
    return data;
  }

  return null;
};

export { getSingleDoctor };
