import { css } from "@/styled-system/css";
import React from "react";
import { center, circle, flex, hstack, square } from "@/styled-system/patterns";
import { Home, Map, Megaphone, Wand2, Zap } from "lucide-react";
import { SearchBar } from "./SearchBar";
import ProgressBar from "./ProgressBar";
import DropDownMenu from "./DropDownMenu";

type Props = {};

export const Header = (props: Props) => {
  return (
    <header className={flex({ w: "full", height: "14" })}>
      <div
        className={hstack({
          height: "14",
          w: "full",
          borderBottom: "solid",
          borderBottomWidth: "1px",
          borderBottomColor: "gray.300",
          justify: "space-between",
          fontWeight: "500",
          fontSize: "sm",
          px: "10",
          position: "fixed",
          top: 0,
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
              className={square({
                size: "8",
                bg: "pink.100",
                border: "1px solid",
                borderColor: "pink.200!important",
                borderRadius: "sm",
                color: "pink.600",
              })}
            >
              P
            </div>
            <h2>product-road</h2>
          </a>
          <a
            href=""
            className={css({
              px: "2",
              borderLeft: "solid 1px",
              borderLeftColor: "gray.300",
              borderRight: "solid 1px",
              borderRightColor: "gray.300",
            })}
          >
            <Home strokeWidth={2} size={18} />
          </a>
          <a
            href="/ideas"
            className={css({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            })}
          >
            <Wand2 strokeWidth={2} size={18} />
            <span
              className={css({
                ps: "1",
              })}
            >
              Ideas
            </span>
          </a>
          <a
            href=""
            className={css({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            })}
          >
            <Map strokeWidth={2} size={18} />
            <span
              className={css({
                ps: "1",
              })}
            >
              Roadmap
            </span>
          </a>
          <a
            href=""
            className={css({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            })}
          >
            <Megaphone strokeWidth={2} size={18} />
            <span
              className={css({
                ps: "1",
              })}
            >
              Announcements
            </span>
          </a>
        </div>
        <div
          className={css({
            display: "flex",
            flex: 1,
            justifyContent: "end",
            alignItems: "center",
          })}
        >
          <SearchBar />
          <button
            className={circle({
              size: "6",
              border: "solid 2px",
              borderColor: "gray.300",
              ms: "3",
            })}
          >
            <Zap size={10} />
          </button>

          <button
            className={circle({
              size: "6",
              position: "relative",
              ms: "3",
            })}
          >
            <span
              className={center({
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "x-small",
                color: "gray.500",
              })}
            >
              7
            </span>
            <ProgressBar percent={7} width={"full"} />
          </button>
          <DropDownMenu />
        </div>
      </div>
    </header>
  );
};
