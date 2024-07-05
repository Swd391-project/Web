"use client";

import DeleteUserForm from "@/components/Form/DeleteUserForm";
import EditCourtForm from "@/components/Form/EditCourtForm";
import EditCourtGroupForm from "@/components/Form/EditCourtGroupForm";
import EditUserForm from "@/components/Form/EditUserForm";
import { useEffect, useState } from "react";
const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;
    return (
        <>
            <EditUserForm />
            <DeleteUserForm />
            <EditCourtGroupForm />
            <EditCourtForm />
        </>
    );
};

export default ModalProvider;