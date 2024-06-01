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

// const roleMap: Record<string, StaffRole> = {
//     STAFF: StaffRole.STAFF,
//     MANAGER: StaffRole.MANAGER,
// };
// const rolearr = Object.entries(roleMap).map(([key, value]) => ({ key, value }));

const formSchema = z.object({
    image_url: z
        .string()
        .min(1, { message: "Please upload at least one image" }),
    username: z.string().min(2, { message: "Tên tài khoản có ít nhật 2 kí tự" }),
    email: z.string().email({ message: "Email không hợp lệ" }),
    password: z.string().refine((value) => /^[A-Z].*$/.test(value), {
        message: "Password phải bắt đầu bằng một chữ cái viết hoa",
    }),
    fullName: z.string().min(2),
    //roleId: z.coerce.number()
    role: z.string(),
});

const AddUserForm = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image_url: "",
            username: "",
            email: "",
            password: "",
            fullName: "",
            role: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        //TO DO xử lý form (api)
        try {
            await axios.post(
                "https://bird-swp.azurewebsites.net/api/users/create",
                values
            );

            toast.success("Thêm nhân viên thành công");

            form.reset();
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
                                <div className="col-xl-4">
                                    {/* <div className="form-group row widget-3">
                    <div className="form-input">
                      <label className="labeltest" htmlFor="file-ip-1">
                        <span> ... </span>
                      </label>
                      <input
                        type="file"
                        id="file-ip-1"
                        accept="image/*"
                        // onchange="showPreview(event);"
                      />
                      <div className="preview">
                        <img id="file-ip-1-preview" src="#" alt="img" />
                      </div>
                    </div>
                  </div> */}
                                    <FormField
                                        control={form.control}
                                        name="image_url"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <ImageUploadOne value={field.value}
                                                        disabled={isLoading}
                                                        onChange={(imageUrl) => field.onChange(imageUrl)}
                                                        onRemove={() => field.onChange(null)} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="col-xl-8">
                                    <div className="form-group">
                                        <FormField
                                            control={form.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Nhập tài khoản."
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
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Nhập email"
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
                                            name="fullName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Nhập họ tên"
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
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Nhập mật khẩu"
                                                            {...field}
                                                            className="form-control"
                                                        />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* <div className="form-group">
                                        <FormField
                                            control={form.control}
                                            name="role"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select
                                                        disabled={isLoading}
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Chọn vai trò" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Chọn vai trò</SelectLabel>
                                                                <SelectItem value="male">Nhân viên</SelectItem>
                                <SelectItem value="female">Quản lí</SelectItem>
                                                                {rolearr.map((item) => (
                                                                    <SelectItem value={item.key} key={item.key}>
                                                                        {item.value}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div> */}

                                    <div className="form-group">
                                        <select className="form-control form-select">
                                            <option>Nhân Viên</option>
                                            <option>Quản lí</option>
                                        </select>
                                    </div>
                                    <div className="form-group text-right ">
                                        <button type="submit" className="btn btn-primary float-end">
                                            Thêm Nhân Viên
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

export default AddUserForm;