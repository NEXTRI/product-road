import { circle } from "@/styled-system/patterns";
import React from "react";

type Props = {
  size?: string | number;
};

export const Spinner = ({ size }: Props) => {
  return (
    <span
      className={circle({
        size: "24px",
        border: "2px solid",
        borderColor: "frenchRose",
        borderLeftColor: "rose.500",
        borderBottomColor: "rose.500",
        animation: "spin",
      })}
    ></span>
  );
};
