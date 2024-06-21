"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { CourtGroupColumns } from "../../../../type";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<CourtGroupColumns>[] = [
  // {
  //   accessorKey: "id",
  //   header: "Id",
  // },
  {
    accessorKey: "name",
    header: "Court Group Name",
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
