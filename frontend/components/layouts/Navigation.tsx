"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Annoyed } from "lucide-react";
import { navigationMenu } from "../../data/constants";

function FetchMenuItem({ id, label, url, iconName }: NavMenuItem) {
  const Icon = iconName || Annoyed;
  const currentRoute = usePathname();
  let className =
    currentRoute === url || currentRoute.startsWith(url + "/") ? "active" : "";
  return (
    <li key={id} className={cn("px-8 relative text-theme-gray", className)}>
      <span></span>
      <Link href={url} className="flex gap-2">
        <Icon />
        {label}
      </Link>
    </li>
  );
}

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-8">
        {navigationMenu.map(FetchMenuItem)}
      </ul>
    </nav>
  );
};

export default Navigation;
