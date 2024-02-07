import { Home, MessageSquareText, KanbanSquare, Wallet } from "lucide-react";

export const navigationMenu = [
  { id: 1, label: "Dashboard", url: "/", iconName: Home },
  { id: 2, label: "FeedBacks", url: "/feedback", iconName: MessageSquareText },
  { id: 3, label: "Kanban", url: "/kanban", iconName: KanbanSquare },
  { id: 4, label: "Billing", url: "#", iconName: Wallet },
];

// will add project toggle menu & profile menu
