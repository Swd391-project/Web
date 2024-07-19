"use client";

import Error from "@/components/Error";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function AdminRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = useAuth();
    const router = useRouter();
    // console.log(user?.role)
    if (!user || user.role === "Customer") {
        return (
            <div className="content-body">
                <Error />
            </div>
        );
    }
    return <div>{children}</div>;
}
