"use client";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CourtColumns, UserColumn } from "../../../../type";
import { useModal } from "@/hook/useModal";
import { useAuth } from "@/context/authContext";

interface CellActionProps {
    data: CourtColumns;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const { user } = useAuth();
    const isAdmin = user?.role === "Admin";
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const { onOpen } = useModal();

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
    };
    //console.log(data)
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => onOpen("EditCourtForm", { court: data })}
                    >
                        <Edit className="mr-2 h-4 w-4" /> Chỉnh xửa
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`court/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4" /> Chi tiết
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem
                        onClick={() => onOpen("DeleteUserForm", { court: data })}
                    >
                        <Edit className="mr-2 h-4 w-4" /> Xóa
                    </DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
