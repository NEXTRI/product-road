"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface SidebarContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextType | null>(null);

interface SidebarToggleProviderProps {
  children: ReactNode;
}

export const SidebarToggleProvider: React.FC<SidebarToggleProviderProps> = ({
  children,
}: SidebarToggleProviderProps) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen);
  };

  return (
    <SidebarContext.Provider value={{ sidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

const useSidebarToggle = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  // if (!context) {
  //   console.log("helloooo, context", context);
  //   throw new Error(
  //     "useSidebarToggle must be used within a SidebarToggleProvider"
  //   );
  // }
  return context as SidebarContextType;
};

export { useSidebarToggle };
