import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "../../../utils/supabase/server";

export async function GET(request: Request) {
  const { origin, searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/dashboard";

  if (token_hash && type) {
    const cookieStore = cookies();

    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }

    // TODO: handle error properly (create the page )
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }
}
