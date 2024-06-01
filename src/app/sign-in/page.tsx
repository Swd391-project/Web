"use client"
import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "react-toastify";
import LoginForm from "@/components/Form/LoginForm"

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string()
})

export function InputForm() {
    // const form = useForm<z.infer<typeof FormSchema>>({
    //     resolver: zodResolver(FormSchema),
    //     defaultValues: {
    //         username: "",
    //         password: "",
    //     },
    // })


    return (
        <>
            <div id="main-wrapper" className="show">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6 ">
                            <div className="p-5">
                                <div className="px-5">
                                    <div className="px-5">
                                        <div className="text-center">
                                            <a className="logo flex" href="/sign-in">
                                                <img
                                                    className="img-fluid w-[20%]"
                                                    src="assets/images/badmintonBackground-removebg-preview.png"
                                                    alt="icon page"
                                                />
                                                <img
                                                    className="img-fluid mt-5"
                                                    src="assets/images/logo.png"
                                                    alt="login page"
                                                />
                                            </a>
                                        </div>
                                        <div className="login-main">
                                            <LoginForm />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-6 login-page min-vh-100"></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default InputForm;
