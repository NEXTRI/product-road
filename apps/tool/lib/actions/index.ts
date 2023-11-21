"use server";
import createSupabaseServerClient from "../supabase/supabase-client";

export const getUserSession = async () => {
  const supabase = await createSupabaseServerClient();

  return supabase.auth.getSession();
};
