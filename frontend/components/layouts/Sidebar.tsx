"use client";
import React from "react";
import { Logo, Navigation, ComboboxDemo } from "./index";
import { cn } from "@/lib/utils";
import { useSidebarToggle } from "@/context/SidebarContext";

const Sidebar = () => {
  const { sidebarOpen } = useSidebarToggle();
  const toggleStyle = sidebarOpen ? "ml-0" : "-ml-[250px]";
  return (
    <aside
      className={cn(
        "bg-white py-8 w-[250px] flex flex-col justify-between transition-all delay-200",
        toggleStyle
      )}
    >
      <div>
        <Logo />
        <ComboboxDemo />
        <Navigation />
      </div>
      <ComboboxDemo />
    </aside>
  );
};

export default Sidebar;
