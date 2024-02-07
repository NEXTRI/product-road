import { CategoryProps, ColumnProps } from "@/types/kanban";

export const COLUMNS: ColumnProps[] = [
  { id: "c1", title: "No Status", color: "#454545" },
  { id: "c2", title: "Under consideration", color: "#E1783D" },
  { id: "c3", title: "Planned", color: "#52A734" },
  { id: "c4", title: "In Development", color: "#52A2CE" },
  { id: "c5", title: "Shipped", color: "#E25F5F" },
];
export const CATEGORIES: CategoryProps[] = [
  { id: "styling", label: "Styling", color: "#E1783D" },
  { id: "feature-request", label: "Feature Request", color: "#52A2CE" },
  { id: "bug-report", label: "Bug Report", color: "#E25F5F" },
];
