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


import { useRouter } from "next/navigation";
import axios from "axios";
import { useModal } from "@/hook/useModal";
import { toast } from "react-toastify";

const formSchema = z.object({
    name: z.string().min(2, "Username must be at least 2 characters"),
    address: z.string().min(2, "Full name must be at least 2 characters"),
});

const EditCourtGroupForm = () => {
    const { isOpen, type, onClose, data } = useModal();
    // const { refetch } = useQuery({ queryKey: ["users"], });
    const isModalOpen = isOpen && type === "EditCourtGroupForm";
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            address: "",
        },
    });

    useEffect(() => {

        if (data && data.courtGroup) {
            form.setValue("name", data.courtGroup.name);
            form.setValue("address", data.courtGroup?.address);
        }
    }, [data, form]);

    const updateCourtGroup = async (values: z.infer<typeof formSchema>) => {
        return axios.put(`https://swdbbmsapi.azurewebsites.net/api/court-group/${data.courtGroup?.id}`, values);
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        //console.log(data.courtGroup);
        if (data?.courtGroup) {
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
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Nhập tên cụm sân..."
                                                                    {...field}
                                                                    className="form-control"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <FormField
                                                    control={form.control}
                                                    name="address"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Nhập địa chỉ..."
                                                                    {...field}
                                                                    className="form-control"
                                                                />
                                                            </FormControl>
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

export default EditCourtGroupForm;
