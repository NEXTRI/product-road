"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebarToggle } from "@/context/SidebarContext";

const ToggleSidebar = () => {
  const { sidebarOpen, toggleSidebar } = useSidebarToggle();
  const handleClick = () => {
    toggleSidebar();
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
              className={`w-1 h-3 bg-zinc-500 shadow-lg rounded-t-sm -mb-[2px] transition origin-bottom ${
                sidebarOpen ? "rotate-12" : "-rotate-12"
              }`}
            ></span>
            <span
              className={`w-1 h-3 bg-zinc-500 shadow-lg rounded-b-sm origin-top transition ${
                sidebarOpen ? "-rotate-12" : "rotate-12"
              }`}
            ></span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{sidebarOpen ? "Close Sidebar" : "Open Sidebar"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToggleSidebar;
