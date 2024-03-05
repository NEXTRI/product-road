import { Home, MessageSquareText, KanbanSquare, Wallet } from "lucide-react";

export const navigationMenu = [
  { id: 1, label: "Dashboard", url: "/", iconName: Home },
  { id: 2, label: "FeedBacks", url: "/feedback", iconName: MessageSquareText },
  { id: 3, label: "Kanban", url: "#", iconName: KanbanSquare },
  { id: 4, label: "Billing", url: "#", iconName: Wallet },
];

export const feedbackCategories = [
  "Bug",
  "Question",
  "Idea",
  "Enhancement",
  "Other",
];
export const feedbackStatus = [
  "Open",
  "Under consideration",
  "Planned",
  "In Progress",
  "Shipped",
  "Rejected",
];

// will add project toggle menu & profile menu
