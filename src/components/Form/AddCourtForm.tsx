"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import { toast } from "react-toastify";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import useCourtGroup from "@/hook/useCourtGroup";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
    status: z.string(),
    "court-group-id": z.string(),
});
const AddCourtForm = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: "Available",
            "court-group-id": "",
        },
    });
    const API_URL = "https://swdbbmsapi.azurewebsites.net/api/court";
    const router = useRouter();
    const { courtGroups } = useCourtGroup();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
                toast.success("Thêm sân thành công");
                form.reset();
                router.push("/court")
            } else {
                toast.error("Bạn không đủ phân quyền để tạo user");
                form.reset();
            }
        } catch (error) {
            toast.error("Tài khoản đã tồn tại");
            console.log(error);
        }
    };

    const isLoading = form.formState.isSubmitting;

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


                                    {/* <div className="form-group">
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Nhập trạng thái"
                                                            {...field}
                                                            className="form-control"
                                                        />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div> */}

                                    <div className="form-group">
                                        <FormField
                                            control={form.control}
                                            name="court-group-id"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            disabled={isLoading}
                                                            onValueChange={(value) => {
                                                                field.onChange(value);
                                                                form.setValue("court-group-id", value);
                                                            }}
                                                            value={field.value}
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Chọn cụm sân" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectLabel>Chọn cụm sân</SelectLabel>
                                                                    {courtGroups.map((CourtGroup) => (
                                                                        <SelectItem
                                                                            key={CourtGroup.id}
                                                                            value={CourtGroup.id.toString()}
                                                                        >
                                                                            {CourtGroup.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="form-group text-right ">
                                        <button type="submit" className="btn btn-primary float-end">
                                            Thêm Sân
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

export default AddCourtForm;
