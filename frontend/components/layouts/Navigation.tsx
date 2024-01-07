"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  MessageSquareText,
  KanbanSquare,
  Wallet,
  Annoyed,
} from "lucide-react";

// Define types
interface MenuItem {
  id: number;
  label: string;
  url: string;
  iconName?: React.ComponentType;
}

const menu: MenuItem[] = [
  { id: 1, label: "Dashboard", url: "/", iconName: Home },
  { id: 2, label: "FeedBacks", url: "/feedback", iconName: MessageSquareText },
  { id: 3, label: "Kanban", url: "#", iconName: KanbanSquare },
  { id: 4, label: "Billing", url: "#", iconName: Wallet },
];

function fetchMenuItem({ id, label, url, iconName }: MenuItem) {
  const Icon = iconName || Annoyed;
  const currentRoute = usePathname();
  let className = currentRoute === url ? "active" : "";
  return (
    <li key={id} className={cn("px-8 relative text-gray-500", className)}>
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
      <ul className="flex flex-col gap-8">{menu.map(fetchMenuItem)}</ul>
    </nav>
  );
};

export default Navigation;
