import { circle } from "@/styled-system/patterns";

type Props = {};

export function Spinner() {
  return (
    <span
      className={circle({
        size: "24px",
        border: "2px solid ",
        borderColor: "var(--colors-rose-500)!important",
        borderLeftColor: "var(--colors-rose-400)!important",
        animation: "spin",
      })}
    ></span>
  );
}
