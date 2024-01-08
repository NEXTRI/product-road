"use client";
import { useState } from "react";
import { Inter } from "next/font/google";
import { Sidebar, ToggleSidebar } from "../components/layouts";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-full flex">
          <Sidebar sidebarOpen={sidebarOpen} />
          <main className="relative bg-gray-100 px-8 py-10 flex-1">
            <ToggleSidebar
              sidebarOpen={sidebarOpen}
              toggleOpen={toggleSidebar}
            />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
