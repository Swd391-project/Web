"use client";

import React from "react";
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

import axios from "axios";
import { toast } from "react-toastify";
import { ImageUploadOne } from "../image-cloudinary-upload/image-upload";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import useCourtGroup from "@/hook/useCourtGroup";

const formSchema = z.object({
    name: z.string(),
    address: z.string(),
    // company: z.string(),
});
const AddCourtGroupForm = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            address: "",
            // company: "",
        },
    });
    const API_URL = "https://swdbbmsapi.azurewebsites.net/api/court-group";
    const router = useRouter();
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        //TO DO xử lý form (api)
        try {
            const cookies = parseCookies();
            const token = cookies.sessionToken;
            const response = await fetch(API_URL, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                body: JSON.stringify(values),
            });
            console.log(values)
            if (response.ok) {
                toast.success("Thêm cụm sân thành công");
                form.reset();
                router.push("/court-group")
            } else {
                toast.error("Bạn không đủ phân quyền để tạo user");
                form.reset();
            }
        } catch (error) {
            toast.error("Tài khoản đã tồn tại");
            console.log(error);
        }
    };

    // const isLoading = form.formState.isSubmitting;

    return (
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">Điền Thông Tin </h4>
            </div>
            <div className="card-body">
                <div className="basic-form">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-xl-8">
                                    <div className="form-group">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Nhập tên cụm sân."
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
                                                            placeholder="Nhập địa chỉ"
                                                            {...field}
                                                            className="form-control"
                                                        />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="form-group text-right ">
                                        <button type="submit" className="btn btn-primary float-end">
                                            Thêm Cụm Sân
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AddCourtGroupForm;
