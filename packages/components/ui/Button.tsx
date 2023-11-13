"use client";

import * as React from "react";
import { css } from "../../../apps/storybook/styled-system/css";

export const Button = () => {
  return <button className={css({
    bg: "green.400",
    px: "3",
    py: "4",
    color: "white"
  })} onClick={() => alert("boop")}>Boop</button>;
};
