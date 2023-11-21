"use server";

import createSupabaseServerClient from "@/lib/supabase/supabase-client";

export const loginOTP = async (email: string) => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: "http://localhost:3000/welcome",
    },
  });

  return [data, error];
};

export const loginWithGithub = async () => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  return [data, error];
};
