import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar, ToggleSidebar } from "../components/layouts";
import { SidebarToggleProvider } from "../context/SidebarContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarToggleProvider>
          <div className="h-full flex">
            <Sidebar />
            <main className="relative bg-gray-100 px-8 py-10 flex-1">
              <ToggleSidebar />
              {children}
            </main>
          </div>
        </SidebarToggleProvider>
        <Toaster />
      </body>
    </html>
  );
}
