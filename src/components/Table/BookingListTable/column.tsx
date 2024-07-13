"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { BookingListColumns } from "../../../../type";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<BookingListColumns>[] = [
    // {
    //     accessorKey: "id",
    //     header: "Mã",
    // },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Ngày chơi
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "court-id",
        header: "Sân",
    },
    {
        accessorKey: "from-time",
        header: "Giờ bắt đầu",
    },
    {
        accessorKey: "to-time",
        header: "Giờ kết thúc",
    },
    {
        accessorKey: "customer-id",
        header: "Người đặt",
    },
    {
        accessorKey: "status",
        header: "Tình trạng",
    },
    {
        accessorKey: "created-date",
        header: "Ngày đặt",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
