import { css } from "@/styled-system/css";
import { circle, hstack } from "@/styled-system/patterns";
import { useState } from "react";

type props = {
  isPrivate: boolean;
  onSetIsPrivte: (value: boolean) => void;
};

export const ToggleButton = ({ isPrivate, onSetIsPrivte }: props) => {
  return (
    <div
      className={css({
        borderRadius: "3xl",
        bg: isPrivate ? "sky.400" : "gray.400",
        w: "70px",
        height: "30px",
        cursor: "pointer",
        position: "relative",
        transition: "0.3s",
      })}
      onClick={() => onSetIsPrivte(!isPrivate)}
    >
      <span
        className={circle({
          position: "absolute",
          size: "24px",
          bg: "white",
          m: "3px",
          transition: "0.5s",
          transform: isPrivate ? "translateX(40px)" : "translateX(0)",
        })}
      ></span>
    </div>
  );
};
