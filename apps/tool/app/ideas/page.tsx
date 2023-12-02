import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";
import { css } from "@/styled-system/css";
import { hstack, vstack } from "@/styled-system/patterns";
import { SupabaseClient } from "@supabase/supabase-js";
import { sideBarItem } from "@/lib/types";

async function getStatuses(
  supabase: SupabaseClient
): Promise<Array<sideBarItem> | undefined> {
  let { data, error } = await supabase.from("statuses").select("name, color");

  if (data) return data;
}

async function getTopics(
  supabase: SupabaseClient
): Promise<Array<sideBarItem> | undefined> {
  let { data, error } = await supabase.from("topics").select("name");

  if (data) return data;
}

export default async function Dashboard() {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getSession();
  const statuses: Array<sideBarItem> | undefined = await getStatuses(supabase);
  const topics: Array<sideBarItem> | undefined = await getTopics(supabase);

  if (!data.session) {
    redirect("/login");
  }
  return (
    <main
      className={css({
        position: "relative",
      })}
    >
      <Header />
      <div
        className={vstack({
          flexGrow: 1,
          position: "relative",
          minH: "screen",
        })}
      >
        <div
          className={hstack({
            w: "full",
            flexGrow: 1,
            position: "relative",
            alignItems: "flex-start",
          })}
        >
          <SideBar
            items={[
              { title: "statuses", elements: statuses! },
              { title: "topics", elements: topics! },
            ]}
          />
          <div
            className={css({
              height: "500px",
            })}
          ></div>
        </div>
      </div>
    </main>
  );
}
