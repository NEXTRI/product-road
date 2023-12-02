import { css } from "@/styled-system/css";
import { vstack } from "@/styled-system/patterns";
import { SideBarItem } from "./SideBarItem";
import { sideBarSection } from "@/lib/types";

type Props = {
  items: Array<sideBarSection>;
};

export const SideBar = ({ items }: Props) => {
  return (
    <div
      className={css({
        position: "fixed",
        w: "72",
        h: "calc(100vh - var(--sizes-14))",
        borderRight: "solid 1px var(--colors-gray-300)",
        bg: "gray.100",
        fontSize: "small",
        overflowY: "auto",
      })}
    >
      <div className={vstack({ alignItems: "flex-start", p: "8" })}>
        {items.map((item) => (
          <div
            className={vstack({
              alignItems: "flex-start",
              w: "full",
              gap: 0,
              mb: "5",
            })}
          >
            <p
              className={css({
                color: "gray.400",
                fontWeight: "semibold",
                px: "3",
              })}
            >
              {item.title}
            </p>
            {item.elements.map((element) => (
              <SideBarItem
                type={item.title}
                color={element.color}
                text={element.name}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
