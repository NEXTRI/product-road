import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SupabaseClient } from "@supabase/supabase-js";
import { sideBarItem } from "@/lib/types";
import { cookies } from "next/headers";
import JSX from "./JSX";

async function getStatuses(
  supabase: SupabaseClient
): Promise<Array<sideBarItem> | undefined> {
  let { data, error } = await supabase
    .from("statuses")
    .select("id, name, color");

  if (data) return data;
}

async function getTopics(
  supabase: SupabaseClient
): Promise<Array<sideBarItem> | undefined> {
  let { data, error } = await supabase.from("topics").select("id, name");

  if (data) return data;
}

export default async function Ideas() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const statuses = await getStatuses(supabase);
  const topics = await getTopics(supabase);
  const { data } = await supabase.auth.getSession();
  const res = await supabase.auth.getUser();

  if (!data.session) {
    redirect("/login");
  }

  return <JSX statuses={statuses} topics={topics} />;
}
