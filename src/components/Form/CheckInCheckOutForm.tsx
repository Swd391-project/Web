import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { useModal } from '@/hook/useModal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { parseCookies } from 'nookies';

const formSchema = z.object({
});

const CheckInCheckOutForm = () => {
    const { isOpen, type, onClose, data } = useModal();
    const isModalOpen = isOpen && type === "CheckInCheckOutForm";
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    });

    useEffect(() => {
        console.log(data.booking)
        if (data && data.booking) {
        }
    }, [data, form]);

    const updateCheckIn = async (values: z.infer<typeof formSchema>) => {
        try {
            const cookies = parseCookies();
            const token = cookies.sessionToken;
            const response = await axios.put(`https://swdbbmsapi.azurewebsites.net/api/booking/check-in/${data.booking?.id}`, values, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        } catch (error) {
            throw error;
        }
    };

    const updateCheckOut = async (values: z.infer<typeof formSchema>) => {
        try {
            const cookies = parseCookies();
            const token = cookies.sessionToken;
            const response = await axios.put(`https://swdbbmsapi.azurewebsites.net/api/booking/check-out/${data.booking?.id}`, values, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            return response;
        } catch (error) {
            throw error;
        }
    };

    const onCheckInSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await updateCheckIn(values);
            toast.success("Check in thành công");
            onClose();
            form.reset();
            router.refresh();
        } catch (error: any) {
            // console.log(error);
            toast.error(error.response.data);
        }
    };

    const onCheckOutSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await updateCheckOut(values);
            toast.success("Check out thành công");
            onClose();
            form.reset();
            router.refresh();
            if (response.data && response.data["payment-url"]) {
                window.location.href = response.data["payment-url"];
            }
        } catch (error: any) {
            //console.error(error);
            toast.error(error.response.data);
        }
    };

    const isLoading = form.formState.isSubmitting;

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[750px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you are done.
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="checkIn" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="checkIn">Check In</TabsTrigger>
                        <TabsTrigger value="checkOut">Check Out</TabsTrigger>
                    </TabsList>
                    <TabsContent value="checkIn">
                        <form onSubmit={form.handleSubmit(onCheckInSubmit)}>
                            {/* Add any necessary form fields here */}
                            <DialogFooter>
                                <Button type="submit" disabled={isLoading}>
                                    Check In
                                </Button>
                            </DialogFooter>
                        </form>
                    </TabsContent>
                    <TabsContent value="checkOut">
                        <form onSubmit={form.handleSubmit(onCheckOutSubmit)}>
                            {/* Add any necessary form fields here */}
                            <DialogFooter>
                                <Button type="submit" disabled={isLoading}>
                                    Check Out
                                </Button>
                            </DialogFooter>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default CheckInCheckOutForm;
