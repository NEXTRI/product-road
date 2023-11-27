"use client";
import { css } from "@/styled-system/css";
import { Circle } from "rc-progress";

type props = {
  percent: number;
  width: number | string;
};

export default function ProgressBar({ percent, width }: props) {
  return (
    <Circle
      percent={percent}
      strokeWidth={7}
      trailWidth={7}
      className={css({
        w: width,
      })}
    />
  );
}
