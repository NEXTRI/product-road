import { css } from "@/styled-system/css";
import { hstack } from "@/styled-system/patterns";
import { Search } from "lucide-react";
import React from "react";

type Props = {};

export const SearchBar = (props: Props) => {
  return (
    <button
      role="button"
      className={hstack({
        cursor: "pointer",
        bg: "gray.200",
        alignItems: "center",
        p: "2",
        borderRadius: "sm",
        fontSize: "small",
        _hover: {
          "&:last-child": css.raw({ visibility: "visible" }), //not working
        },
      })}
    >
      <Search size={14} className={css({ color: "gray.500" })} />
      <span className={css({ color: "gray.500" })}>Search Ideas...</span>
      <span
      // className={css({
      //   visibility: "hidden",
      // })}
      >
        <span
          className={css({
            bg: "gray.300",
            p: 1,
            fontSize: "xx-small",
            borderRadius: "sm",
            color: "gray.500",
            me: "1",
          })}
        >
          Ctrl
        </span>
        <span
          className={css({
            bg: "gray.300",
            p: 1,
            fontSize: "xx-small",
            borderRadius: "sm",
            color: "gray.500",
          })}
        >
          K
        </span>
      </span>
    </button>
  );
};
