"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useModal } from "@/hook/useModal";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

interface DeleteBookingFormProps {
    onDeleteSuccess: () => void;
}

const formSchema = z.object({});

const DeleteBookingForm: React.FC<DeleteBookingFormProps> = ({ onDeleteSuccess }) => {
    const { isOpen, type, onClose, data } = useModal();
    const isModalOpen = isOpen && type === "DeleteBookingForm";
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });

    useEffect(() => {
        if (data && data.booking) {
            form.reset(data.booking);
        }
    }, [data, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.delete(
                `https://swdbbmsapi.azurewebsites.net/api/booking/${data.booking?.id}`
            );
            toast.success("Booking deleted successfully");
            onClose();
            form.reset();
            onDeleteSuccess();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete booking");
        }
    };

    const isLoading = form.formState.isSubmitting;

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="sm:min-w-[450px]">
                <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                </DialogHeader>
                <div className="card">
                    <div className="card-body">
                        <div className="basic-form">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="flex items-center justify-between w-full mt-4">
                                        <Button
                                            disabled={isLoading}
                                            onClick={onClose}
                                            className="bg-gray-300 text-gray-800 hover:bg-gray-400"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            disabled={isLoading}
                                            className="bg-red-600 text-white hover:bg-red-700"
                                            type="submit"
                                        >
                                            Confirm
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteBookingForm;
