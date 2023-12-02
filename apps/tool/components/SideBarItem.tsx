import { css } from "@/styled-system/css";
import { hstack } from "@/styled-system/patterns";
import { Circle, Hash } from "lucide-react";

type Props = {
  type: string;
  color?: string;
  text: string;
  number?: number;
};

export const SideBarItem = ({ color, text, type, number }: Props) => {
  return (
    <button
      className={hstack({
        cursor: "pointer",
        px: "3",
        py: 2,
        w: "full",
        borderRadius: "md",
        _hover: {
          bg: "gray.200",
        },
      })}
    >
      {type == "statuses" ? (
        <Circle color={color} className={css({ color: color, w: "2" })} />
      ) : (
        <Hash className={css({ color: "gray.400", w: "3" })} />
      )}
      <span className={css({ textTransform: "capitalize" })}>{text}</span>
      {number && (
        <span className={css({ color: "gray.400", ms: "auto" })}>{number}</span>
      )}
    </button>
  );
};
