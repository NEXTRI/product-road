"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const text = {
  opened: "Close Sidebar",
  closed: "Open Sidebar",
};
const ToggleSidebar = ({ sidebarOpen, toggleOpen }) => {
  const handleClick = () => {
    toggleOpen();
  };
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="flex flex-col absolute top-1/2 left-0 cursor-pointer p-2 justify-center items-center"
            onClick={handleClick}
          >
            <span
              className={`w-1 h-3 bg-slate-500 rounded-t-sm -mb-[2px] transition origin-bottom ${
                sidebarOpen ? "-rotate-12" : "rotate-12 "
              }`}
            ></span>
            <span
              className={`w-1 h-3 bg-slate-500 rounded-b-sm origin-top transition ${
                sidebarOpen ? "rotate-12" : "-rotate-12 "
              }`}
            ></span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text["closed"]}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToggleSidebar;
