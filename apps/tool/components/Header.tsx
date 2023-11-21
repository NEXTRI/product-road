import { css } from "@/styled-system/css";
import React from "react";
import { SearchBar } from "./SearchBar";
import { GrHomeRounded } from "react-icons/gr";
import { VscWand } from "react-icons/vsc";
import { IoMapOutline } from "react-icons/io5";
import { CiBullhorn } from "react-icons/ci";
import { MdBolt } from "react-icons/md";
import { circle, hstack } from "@/styled-system/patterns";

type Props = {};

export const Header = (props: Props) => {
  return (
    <header
      className={hstack({
        height: "16",
        w: "full",
        borderBottom: "solid",
        borderBottomWidth: "1px",
        borderBottomColor: "black",
        justify: "space-between",
      })}
    >
      <div
        className={hstack({
          justify: "center",
          alignContent: "center",
        })}
      >
        <a
          className={hstack({
            justify: "space-between",
            alignItems: "center",
          })}
        >
          <div
            className={css({
              border: "1px solid",
              borderColor: "pink",
              padding: "3",
              borderRadius: "2xl",
            })}
          >
            P
          </div>
          <h2>product-road</h2>
        </a>
        <a href="">
          <GrHomeRounded />
        </a>
        <a
          href=""
          className={css({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          })}
        >
          <VscWand />
          <span>Ideas</span>
        </a>
        <a
          href=""
          className={css({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          })}
        >
          <IoMapOutline />
          <span>Roadmap</span>
        </a>
        <a
          href=""
          className={css({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          })}
        >
          <CiBullhorn />
          <span>Announcements</span>
        </a>
      </div>
      <div
        className={css({
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <SearchBar />
        <button>
          <MdBolt />
        </button>
        <button>7</button>
        <button
          className={circle({
            w: "50px",
            h: "50px",
          })}
        >
          R
        </button>
      </div>
    </header>
  );
};
