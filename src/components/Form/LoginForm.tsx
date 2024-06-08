"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import { setCookie } from "nookies";
import { useAuth } from "@/context/authContext";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

const LoginForm = () => {
  const { login, user, logout } = useAuth();
  // console.log(user);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // setLoading(true);
    // try {
    //     const response = await fetch('https://swdbbmsapi20240605224753.azurewebsites.net/api/auth/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(values), // Gửi trực tiếp các trường
    //     });

    //     const sessionToken = await response.text(); // Đọc phản hồi như text

    //     if (!response.ok) {
    //         throw new Error(sessionToken);
    //     }

    //     toast.success("Đăng nhập thành công");

    //     // Lưu token vào cookie (hoặc session)
    //     setCookie(null, 'sessionToken', sessionToken, {
    //         maxAge: 30 * 24 * 60 * 60,
    //         path: '/',
    //     });

    //     router.push('/');
    // } catch (error) {
    //     console.error('Login error:', error);
    //     toast.error("Đã có lỗi xảy ra");
    // }
    // setLoading(false);

    login(values.username, values.password);
  };

  return (
    <div className="mt-4">
      <h4 className="title">Đăng nhập</h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="form-group">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tài khoản</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tài khoản" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {form.formState.errors.username && (
            <p>{form.formState.errors.username.message}</p>
          )}

          <div className="form-group">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Nhập mật khẩu"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {form.formState.errors.password && (
            <p>{form.formState.errors.password.message}</p>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
