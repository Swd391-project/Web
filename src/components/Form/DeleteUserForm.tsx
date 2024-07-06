"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useModal } from "@/hook/useModal";
import { toast } from "react-toastify";
import { ImageUploadOne } from "../image-cloudinary-upload/image-upload";
import { Button } from "../ui/button";

const formSchema = z.object({
    status: z.string()
});

const DeleteUserForm = () => {
    const { isOpen, type, onClose, data } = useModal();
    const isModalOpen = isOpen && type === "DeleteUserForm";
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: "",

        },
    });

    useEffect(() => {
        if (data && data.user) {
            form.setValue("status", data.user.status);
        }
    }, [data, form]);

    const updateStaff = async (values: z.infer<typeof formSchema>) => {
        return axios.put(`https://swdbbmsapi.azurewebsites.net/api/user/${data.user?.id}`, values);
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            values.status = "Inactive";
            const response = await axios.put(
                `https://swdbbmsapi.azurewebsites.net/api/user/${data.user?.id}`,
                values
            );
            console.log(data.user?.id)
            toast.success("User deleted successfully");
            onClose();
            form.reset();
            router.refresh();
            return response.data; // Return data if needed
        } catch (error: any) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
    };
    const isLoading = form.formState.isSubmitting;

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="sm:min-w-[750px]">
                <DialogHeader>
                    <DialogTitle>Xóa người dùng</DialogTitle>
                </DialogHeader>
                <div className="card">
                    <div className="card-body">
                        <div className="basic-form">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="row">
                                        <div className="flex items-center justify-between w-full">
                                            <Button
                                                disabled={isLoading}
                                                onClick={onClose}
                                                variant="ghost"
                                            >
                                                Không
                                            </Button>
                                            <Button
                                                disabled={isLoading}
                                                variant="destructive"
                                                type="submit"
                                            >
                                                Xác nhận
                                            </Button>
                                        </div>
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

export default DeleteUserForm;
