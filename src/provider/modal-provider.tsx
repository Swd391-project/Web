"use client";

import CheckInCheckOutForm from "@/components/Form/CheckInCheckOutForm";
import DeleteBookingForm from "@/components/Form/DeleteBookingForm";
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

    const handleDeleteBookingSuccess = () => {
        console.log("Booking deleted successfully!");
    };

    if (!isMounted) return null;
    return (
        <>
            <EditUserForm />
            <DeleteUserForm />
            <EditCourtGroupForm />
            <EditCourtForm />
            <DeleteBookingForm onDeleteSuccess={handleDeleteBookingSuccess} />
            <CheckInCheckOutForm />
        </>
    );
};

export default ModalProvider;