import { css } from "@/styled-system/css";
import { circle } from "@/styled-system/patterns";
import React from "react";

type Props = {};

export const Spinner = (props: Props) => {
  return (
    <span
      className={circle({
        size: "24px",
        // borderWidth: "2px",
        border: "2px solid",
        borderColor: "rose.500",
        borderLeftColor: "rose.100",
        animation: "spin",
      })}
    ></span>
  );
};
