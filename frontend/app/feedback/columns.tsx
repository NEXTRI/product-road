"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const columns: ColumnDef<Feedback>[] = [
  {
    accessorKey: "user_id",
    header: "UserID",
  },
  {
    accessorKey: "title",
    header: "Message",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: () => (
      <Link href="#" className="underline ">
        View Detail
      </Link>
    ),
  },
];
