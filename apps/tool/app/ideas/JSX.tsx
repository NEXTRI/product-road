"use client";
import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";
import { css } from "@/styled-system/css";
import { container, hstack, vstack } from "@/styled-system/patterns";
import { Plus } from "lucide-react";
import { sideBarItem } from "@/lib/types";
import NewIdea from "@/components/NewIdea";
import { useEffect, useState } from "react";

type props = {
  topics: Array<sideBarItem> | undefined;
  statuses: Array<sideBarItem> | undefined;
};

export default function JSX({ statuses, topics }: props) {
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (openDrawer) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [openDrawer]);
  return (
    <div
      className={css({
        position: "relative",
        overflowX: "hidden",
      })}
    >
      <NewIdea
        openDrawer={openDrawer}
        onSetOpenDrawer={setOpenDrawer}
        topics={topics}
      />
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
            gap: 0,
          })}
        >
          <SideBar
            items={[
              { title: "statuses", elements: statuses! },
              { title: "topics", elements: topics! },
            ]}
          />
          <div className={css({ w: "72" })}></div>
          <div
            className={css({
              flex: 1,
              minH: "screen",
            })}
          >
            <div className={container({ maxWidth: "3xl" })}>
              <div className={hstack({ justify: "space-between" })}>
                <p
                  className={css({
                    fontSize: "2xl",
                    fontWeight: "bold",
                  })}
                >
                  Feature idea
                </p>
                <button
                  className={hstack({
                    bg: "rose.500",
                    color: "white",
                    py: "3",
                    px: "4",
                    borderRadius: "md",
                    cursor: "pointer",
                  })}
                  onClick={() => setOpenDrawer(true)}
                >
                  <Plus size={16} />
                  <span>submit idea</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
