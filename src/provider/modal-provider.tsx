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

    const handleUpdateUserSuccess = () => {
        console.log("User update successfully!");
    };

    const handleUpdateCourtSuccess = () => {
        console.log("Court update successfully!");
    };

    const handleUpdateCourtGroupSuccess = () => {
        console.log("Court Group update successfully!");
    };

    if (!isMounted) return null;
    return (
        <>
            <EditUserForm onUpdate={handleUpdateUserSuccess} />
            <DeleteUserForm />
            <EditCourtGroupForm onUpdate={handleUpdateCourtGroupSuccess} />
            <EditCourtForm onUpdate={handleUpdateCourtSuccess} />
            <DeleteBookingForm onDeleteSuccess={handleDeleteBookingSuccess} />
            <CheckInCheckOutForm />
        </>
    );
};

export default ModalProvider;