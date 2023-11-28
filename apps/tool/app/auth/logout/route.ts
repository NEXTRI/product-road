import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      return NextResponse.redirect(`${origin}/login`);
    }
  }
  return NextResponse.redirect(`${origin}/login`);
}
