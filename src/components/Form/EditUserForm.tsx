"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useModal } from "@/hook/useModal";
import { toast } from "react-toastify";

const formSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    "full-name": z.string().min(2, "Full name must be at least 2 characters"),
    role: z.string().min(1, "Role must be specified"),
});

interface EditUserFormProps {
    onUpdate: () => void; // Define the type of onUpdate prop
}

const EditUserForm: React.FC<EditUserFormProps> = ({ onUpdate }) => {
    const { isOpen, type, onClose, data } = useModal();
    const isModalOpen = isOpen && type === "EditUserForm";
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            "full-name": "",
            role: "",
        },
    });

    useEffect(() => {
        if (data && data.user) {
            form.setValue("username", data.user.username);
            form.setValue("full-name", data.user["full-name"]);
            form.setValue("role", data.user.role);
        }
    }, [data, form]);

    const updateStaff = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.put(`https://swdbbmsapi.azurewebsites.net/api/user/${data.user?.id}`, values);
            toast.success("Cập nhật nhân viên thành công");
            onClose();
            form.reset();
            router.refresh();
            onUpdate(); // Call onUpdate prop to trigger data update
        } catch (error) {
            console.error("Đã có lỗi xảy ra!", error);
            toast.error("Đã có lỗi xảy ra!");
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
                    <div className="card-body">
                        <div className="basic-form">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(updateStaff)}>
                                    <div className="row">
                                        <div className="col-xl-8">
                                            <div className="form-group">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nhập họ tên..."
                                                        {...form.register("full-name")}
                                                        className="form-control"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                            <div className="form-group">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nhập username..."
                                                        {...form.register("username")}
                                                        className="form-control"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                            <div className="form-group">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nhập role..."
                                                        {...form.register("role")}
                                                        className="form-control"
                                                    />
                                                </FormControl>
                                                <FormMessage />
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

export default EditUserForm;
