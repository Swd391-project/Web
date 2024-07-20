"use client";

import React, { useEffect, useState } from "react";
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

import { toast } from "react-toastify";
import { parseCookies } from "nookies";
import { useAuth } from "@/context/authContext";
import useCourtGroup from "@/hook/useCourtGroup";

type slotType = {
    id: string;
    time: string;
};

const slotsType: slotType[] = [
    { id: "05:00", time: "05:00" },
    { id: "06:00", time: "06:00" },
    { id: "07:00", time: "07:00" },
    { id: "08:00", time: "08:00" },
    { id: "09:00", time: "09:00" },
    { id: "10:00", time: "10:00" },
    { id: "11:00", time: "11:00" },
    { id: "12:00", time: "12:00" },
    { id: "13:00", time: "13:00" },
    { id: "14:00", time: "14:00" },
    { id: "15:00", time: "15:00" },
    { id: "16:00", time: "16:00" },
    { id: "17:00", time: "17:00" },
    { id: "18:00", time: "18:00" },
    { id: "19:00", time: "19:00" },
    { id: "20:00", time: "20:00" },
    { id: "21:00", time: "21:00" },
    { id: "22:00", time: "22:00" },
    { id: "23:00", time: "23:00" },
    { id: "00:00", time: "00:00" },
];

const formSchema = z.object({
    date: z.string(),
    "from-time": z.string(),
    "to-time": z.string(),
    "full-name": z.string(),
    "phone-number": z.string()
});

const AddBookingCourtForm = () => {
    const { user } = useAuth();
    const [startTime, setStartTime] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<string>("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            "from-time": "",
            "to-time": "",
            date: "",
            "full-name": "",
            "phone-number": ""
        },
    });

    const [courtGroupId, setCourtGroupId] = useState<number | null>(null);

    useEffect(() => {
        const storedCourtGroupId = sessionStorage.getItem("selectedCourtGroupId");
        if (storedCourtGroupId) {
            setCourtGroupId(parseInt(storedCourtGroupId, 10));
        }
    }, []);

    useEffect(() => {
        const handleCourtGroupIdChange = (event: Event) => {
            const customEvent = event as CustomEvent<number>;
            setCourtGroupId(customEvent.detail);
        };

        window.addEventListener("courtGroupIdChange", handleCourtGroupIdChange as EventListener);

        return () => {
            window.removeEventListener("courtGroupIdChange", handleCourtGroupIdChange as EventListener);
        };
    }, []);

    useEffect(() => {
        // console.log(courtGroupId);
    }, [courtGroupId]);
    const effectiveCourtGroupId = courtGroupId || '1';
    console.log(effectiveCourtGroupId)
    const API_URL = `https://swdbbmsapi.azurewebsites.net/api/booking/${effectiveCourtGroupId}`;
    const cookies = parseCookies();
    const token = cookies.sessionToken;

    const filterStartTimes = () => {
        if (selectedDate === new Date().toISOString().split('T')[0]) {
            const currentHour = new Date().getHours();
            return slotsType.filter(slot => parseInt(slot.id.split(":")[0], 10) > currentHour);
        }
        return slotsType;
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch(API_URL, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                body: JSON.stringify(values),
            });

            if (courtGroupId === null) {
                toast.error("Xin hãy chọn cụm sân !");
                form.reset();
            }

            if (response.ok) {
                toast.success("Đặt sân thành công");
                form.reset();
            } else {
                response.json().then(errorData => {
                    let errorMessage = errorData.message || "Không còn sân !";
                    console.log(errorData.response)
                    console.log(errorMessage);
                    toast.error(errorMessage);
                    form.reset();
                }).catch(() => {
                    toast.error(`Việc đặt sân có xảy ra lỗi: ${response.status} ${response.statusText}`);
                    form.reset();
                });
            }
        } catch (error: any) {
            toast.error(error.response.data);
        }
    };

    const filteredEndTimeSlots = slotsType.filter(slot => slot.id > startTime);

    return (
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">Điền Thông Tin</h4>
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
                                            name="date"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Nhập ngày"
                                                            {...field}
                                                            className="form-control"
                                                            type="date"
                                                            min={new Date().toISOString().split('T')[0]}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                setSelectedDate(e.target.value);
                                                            }}
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
                                            name="from-time"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select
                                                        onValueChange={value => {
                                                            field.onChange(value);
                                                            setStartTime(value);
                                                        }}
                                                        value={field.value}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Chọn thời gian bắt đầu" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Chọn thời gian bắt đầu</SelectLabel>
                                                                {filterStartTimes().map((item) => (
                                                                    <SelectItem value={item.id} key={item.time}>
                                                                        {item.time}
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

                                    <div className="form-group">
                                        <FormField
                                            control={form.control}
                                            name="to-time"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Chọn thời gian kết thúc" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Chọn thời gian kết thúc</SelectLabel>
                                                                {filteredEndTimeSlots.map((item) => (
                                                                    <SelectItem value={item.id} key={item.time}>
                                                                        {item.time}
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

                                    <div className="form-group">
                                        <FormField
                                            control={form.control}
                                            name="full-name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Nhập họ tên"
                                                            {...field}
                                                            className="form-control"
                                                            required
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
                                            name="phone-number"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Nhập số điện thoại khách hàng"
                                                            {...field}
                                                            className="form-control"
                                                            required
                                                        />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="form-group text-right">
                                        <button type="submit" className="btn btn-primary float-end">
                                            Đặt Lịch
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

export default AddBookingCourtForm;
