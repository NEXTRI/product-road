"use client";
import { css } from "@/styled-system/css";
import { circle, divider } from "@/styled-system/patterns";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function DropDownMenu() {
  const [open, setOpen] = useState(false);
  let menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("mousedown", (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as HTMLElement)
      ) {
        setOpen(false);
      }
    });
  }, [menuRef]);

  return (
    <div ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className={circle({
          size: "6",
          bg: "pink.100",
          border: "1px solid",
          borderColor: "pink.200!important",
          color: "pink.600",
          fontSize: "x-small",
          ms: "3",
        })}
      >
        R
      </button>
      {open && (
        <ul
          className={css({
            position: "absolute",
            top: "16",
            right: "10",
            backgroundColor: "white",
            border: "solid 1px",
            borderColor: "gray.300",
            borderRadius: "sm",
            p: "10px",
            w: "200px",
          })}
        >
          <DropDownItem link="" text="Settings" />
          <DropDownItem link="" text="Profile" />
          <DropDownItem link="" text="My content" />
          <DropDownItem link="" text="Help Docs" />
          <DropDownItem link="" text="Suggest a new feature" />
          <div
            className={divider({
              orientation: "horizontal",
              color: "gray.200",
              my: "2",
            })}
          ></div>
          <DropDownItem link="" text="Create a company" />
          <div
            className={divider({
              orientation: "horizontal",
              color: "gray.200",
              my: "2",
            })}
          ></div>
          <DropDownItem link="/auth/logout" text="logout" />
        </ul>
      )}
    </div>
  );
}

type DropDownItemProps = {
  text: string;
  link: string;
};

function DropDownItem({ text, link }: DropDownItemProps) {
  return (
    <li>
      <Link
        href={link}
        className={css({
          fontWeight: "300",
          color: "gray.600",
          fontSize: "small",
          cursor: "pointer",
          display: "block",
          p: 2,
          borderRadius: "md",
          _hover: {
            bg: "gray.200",
          },
        })}
      >
        {text}
      </Link>
    </li>
  );
}
