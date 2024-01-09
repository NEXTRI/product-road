"use client";

import { ColumnDef } from "@tanstack/react-table";
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
    header: "Category",
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
