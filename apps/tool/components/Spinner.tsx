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
        border: "2px solid ",
        borderColor: "var(--colors-rose-700)!important",
        borderLeftColor: "var(--colors-rose-200)!important",
        borderTopColor: "var(--colors-rose-200)!important",
        animation: "spin",
      })}
    ></span>
  );
};
