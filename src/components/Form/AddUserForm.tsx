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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";
import { toast } from "react-toastify";
import { ImageUploadOne } from "../image-cloudinary-upload/image-upload";
import { parseCookies } from "nookies";

type userType = {
  role: string;
  name: string;
};

const usersType: userType[] = [
  {
    role: "Staff",
    name: "Nhân viên",
  },
  {
    role: "Manager",
    name: "Quản lí",
  },
];

const formSchema = z.object({
  // image_url: z
  //     .string()
  //     .min(1, { message: "Please upload at least one image" }),
  image_url: z.string(),
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().refine((value) => /^[A-Z].*$/.test(value), {
    message: "Password phải bắt đầu bằng một chữ cái viết hoa",
  }),
  fullName: z.string().min(2),
  role: z.string(),
  PhoneNumber: z.string(),
  createdBy: z.number(),
  modifiedBy: z.number(),
});

const AddUserForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image_url: "",
      email: "",
      password: "",
      fullName: "",
      role: "",
      PhoneNumber: "",
      createdBy: 1,
      modifiedBy: 1,
    },
  });
  const API_URL = "https://swdbbmsapi20240605224753.azurewebsites.net/api/user";

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
      });
      if (response.ok) {
        toast.success("Thêm nhân viên thành công");
        form.reset();
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
                <div className="col-xl-4">
                  <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ImageUploadOne
                            value={field.value}
                            // disabled={isLoading}
                            onChange={(imageUrl) => field.onChange(imageUrl)}
                            onRemove={() => field.onChange(null)}
                          />
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
                      name="PhoneNumber"
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

                  <div className="form-group">
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            // disabled={isLoading}
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
                                {usersType.map((item) => (
                                  <SelectItem value={item.role} key={item.role}>
                                    {item.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
