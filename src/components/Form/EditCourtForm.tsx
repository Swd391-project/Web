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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";


import { useRouter } from "next/navigation";
import axios from "axios";
import { useModal } from "@/hook/useModal";
import { toast } from "react-toastify";

const formSchema = z.object({
    status: z.string().min(2, "Full name must be at least 2 characters"),
});

const EditCourtForm = () => {
    const { isOpen, type, onClose, data } = useModal();
    const isModalOpen = isOpen && type === "EditCourtForm";
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: "",
        },
    });

    useEffect(() => {

        if (data && data.court) {
            form.setValue("status", data.court?.status);
        }
    }, [data, form]);

    const updateCourtGroup = async (values: z.infer<typeof formSchema>) => {
        return axios.put(`https://swdbbmsapi.azurewebsites.net/api/court/${data.court?.id}`, values);
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (data?.court) {
            try {
                await updateCourtGroup(values);
                toast.success("Cập nhật cụm sân thành công");
                onClose();
                form.reset();
                router.refresh();

            } catch (error) {
                console.error(error);
                toast.error("Đã có lỗi xảy ra!");
            }
        }
    };
    const isLoading = form.formState.isSubmitting;

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="sm:min-w-[750px]">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
                </DialogHeader>

                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Điền Thông Tin</h4>
                    </div>
                    <div className="card-body">
                        <div className="basic-form">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="row">
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <FormField
                                                    control={form.control}
                                                    name="status"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Email</FormLabel>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select a verified email to display" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="Available">Đang hoạt động</SelectItem>
                                                                    <SelectItem value="Closed">Đóng cửa</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="form-group text-right">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary float-end"
                                                    disabled={isLoading}
                                                >
                                                    Cập nhật thông tin
                                                </button>
                                            </div>
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

export default EditCourtForm;
