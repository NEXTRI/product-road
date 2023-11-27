import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";

export default async function Dashboard() {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    redirect("/login");
  }
  return (
    <main>
      <Header />
    </main>
  );
}
