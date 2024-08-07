// "use client"
// import React, { useEffect, useState } from 'react';
// import { Button } from "@/components/ui/button";
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { toast } from 'react-toastify';
// import { format, parseISO } from 'date-fns';
// import { useModal } from '@/hook/useModal';
// import { BookingListColumns } from '../../../type';
// import useCustomers from '@/hook/useCustomer';
// import CheckInCheckOutForm from '../Form/CheckInCheckOutForm';

// interface Customer {
//     id: number;
//     "full-name": string;
//     "phone-number": string;
// }

// interface Booking {
//     id: number;
//     date: string;
//     note: string | null;
//     status: string;
//     'court-id': number;
//     'from-time': string;
//     'to-time': string;
//     'created-date': string;
//     customer: Customer;
//     customerId: number;
//     customerName?: string;
// }

// interface Court {
//     id: number;
//     name: string;
// }

// const formSchema = z.object({
//     date: z.string().min(2, {
//         message: "Date must be at least 2 characters.",
//     }),
// });

// export const Schedule: React.FC = () => {
//     const [bookings, setBookings] = useState<Booking[]>([]);
//     const [courtGroupId, setCourtGroupId] = useState<string | null>(null);
//     const [courts, setCourts] = useState<Court[]>([]);
//     const { onOpen } = useModal();
//     const { customers } = useCustomers();
//     const form = useForm({
//         resolver: zodResolver(formSchema),
//     });

//     const fetchBookings = (courtGroupId: string, date?: string) => {
//         const dateQuery = date ? `?date=${date}` : '';
//         fetch(`https://swdbbmsapi.azurewebsites.net/api/booking/court-group/${courtGroupId}${dateQuery}`)
//             .then(response => response.json())
//             .then(data => {
//                 if (Array.isArray(data)) {
//                     setBookings(data);
//                     if (date) {
//                         const formattedDate = format(parseISO(date), 'dd/MM/yyyy');
//                         toast.success(`Lịch của ngày ${formattedDate}`);
//                     }
//                 } else if (data && typeof data === 'object') {
//                     setBookings([data]);
//                 } else {
//                     console.error('Fetched data is not an array or object:', data);
//                 }
//             })
//             .catch(error => console.error('Error fetching bookings:', error));
//     };

//     const fetchCourts = (courtGroupId: string) => {
//         fetch(`https://swdbbmsapi.azurewebsites.net/api/court/court-group/${courtGroupId}`)
//             .then(response => response.json())
//             .then(data => {
//                 if (Array.isArray(data)) {
//                     setCourts(data);
//                 } else {
//                     console.error('Fetched data is not an array:', data);
//                 }
//             })
//             .catch(error => console.error('Error fetching courts:', error));
//     };

//     useEffect(() => {
//         const storedCourtGroupId = sessionStorage.getItem('selectedCourtGroupId');
//         setCourtGroupId(storedCourtGroupId);

//         if (storedCourtGroupId) {
//             fetchBookings(storedCourtGroupId);
//             fetchCourts(storedCourtGroupId);
//         }

//         const handleCourtGroupIdChange = (event: Event) => {
//             const customEvent = event as CustomEvent;
//             if ('detail' in customEvent) {
//                 const newCourtGroupId = customEvent.detail;
//                 setCourtGroupId(newCourtGroupId);
//                 fetchBookings(newCourtGroupId);
//                 fetchCourts(newCourtGroupId);
//             }
//         };

//         window.addEventListener('courtGroupIdChange', handleCourtGroupIdChange);

//         return () => {
//             window.removeEventListener('courtGroupIdChange', handleCourtGroupIdChange);
//         };
//     }, []);

//     useEffect(() => { }, [bookings]);

//     const timeSlots = Array.from({ length: 20 }, (_, i) => {
//         const hour = 5 + i;
//         return `${hour < 10 ? '0' : ''}${hour}:00`;
//     });

//     const groupedBookings: { [key: string]: { [key: number]: Booking } } = {};

//     bookings.forEach((booking) => {
//         const fromTime = booking['from-time'];
//         const toTime = booking['to-time'];
//         const fromHour = parseInt(fromTime.split(':')[0], 10);
//         const toHour = parseInt(toTime.split(':')[0], 10) - 1;
//         for (let hour = fromHour; hour <= toHour; hour++) {
//             const timeSlot = `${hour < 10 ? '0' : ''}${hour}:00`;
//             if (!groupedBookings[timeSlot]) {
//                 groupedBookings[timeSlot] = {};
//             }
//             groupedBookings[timeSlot][booking['court-id']] = booking;
//         }
//     });

//     const onSubmit = (data: any) => {
//         if (courtGroupId) {
//             fetchBookings(courtGroupId, data.date);
//         }
//     };

//     const openDialog = (booking: Booking) => {
//         onOpen("CheckInCheckOutForm", { booking });
//         console.log(booking.customer['full-name'])
//     };


//     return (
//         <div>
//             <h1>Schedule</h1>
//             <div className="form-group">
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                         <FormField
//                             control={form.control}
//                             name="date"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Chọn ngày</FormLabel>
//                                     <FormControl>
//                                         <Input type='date' placeholder="" {...field} />
//                                     </FormControl>
//                                     <FormDescription>
//                                         Chọn ngày để xem lịch đặt sân
//                                     </FormDescription>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <Button type="submit">Chọn ngày</Button>
//                     </form>
//                 </Form>
//             </div>
//             <div className="table-container">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Time Slot</th>
//                             {courts.map(court => (
//                                 <th key={court.id}>{court.name || court.id}</th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {timeSlots.map((slot) => {
//                             const bookingsForSlot = groupedBookings[slot] || {};
//                             const courtsList: Array<Booking | null> = courts.map(court => bookingsForSlot[court.id] || null);

//                             return (
//                                 <tr key={slot}>
//                                     <td>{slot}</td>
//                                     {courtsList.map((booking, index) => (
//                                         <td key={index} className={
//                                             booking
//                                                 ? booking.status === "Confirmed" || booking.status === "InProgress"
//                                                     ? "highlight-yellow"
//                                                     : booking.status === "Completed"
//                                                         ? "highlight-green"
//                                                         : "highlight-gray"
//                                                 : ""
//                                         }>
//                                             {booking ? (
//                                                 <>
//                                                     {`Mã đặt sân: ${booking.id}\nTên khách hàng: ${booking.customer["full-name"]}\nTrạng thái: ${booking.status}\nBắt đầu: ${booking['from-time']}\nKết thúc: ${booking['to-time']}\n`}
//                                                     {(booking.status === "Confirmed" || booking.status === "InProgress") && (
//                                                         <Button
//                                                             onClick={() => openDialog(booking)}
//                                                             className="ml-2"
//                                                         >
//                                                             Check in/Check out
//                                                         </Button>
//                                                     )}
//                                                 </>
//                                             ) : (
//                                                 ""
//                                             )}
//                                         </td>
//                                     ))}
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>
//             </div>
//             <style jsx>{`
//                 .table-container {
//                     overflow-x: auto;
//                 }
//                 table {
//                     width: 100%;
//                     border-collapse: collapse;
//                 }
//                 th, td {
//                     border: 1px solid black;
//                     text-align: center;
//                     padding: 8px;
//                     white-space: pre-line;
//                 }
//                 .highlight-yellow {
//                     background-color: yellow;
//                 }
//                 .highlight-green {
//                     background-color: green;
//                     color: white;
//                 }
//                 .highlight-gray {
//                     background-color: gray;
//                     color: white;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default Schedule;

"use client"
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import { useModal } from '@/hook/useModal';
import { BookingListColumns } from '../../../type';
import useCustomers from '@/hook/useCustomer';
import CheckInCheckOutForm from '../Form/CheckInCheckOutForm';

interface Customer {
    id: number;
    "full-name": string;
    "phone-number": string;
}

interface Booking {
    id: number;
    date: string;
    note: string | null;
    status: string;
    'court-id': number;
    'from-time': string;
    'to-time': string;
    'created-date': string;
    customer: Customer;
    customerId: number;
    customerName?: string;
}

interface Court {
    id: number;
    name: string;
}

const formSchema = z.object({
    date: z.string().min(2, {
        message: "Date must be at least 2 characters.",
    }),
});

export const Schedule: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [courtGroupId, setCourtGroupId] = useState<string | null>(null);
    const [courts, setCourts] = useState<Court[]>([]);
    const { onOpen } = useModal();
    const { customers } = useCustomers();
    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const fetchBookings = (courtGroupId: string, date?: string) => {
        const dateQuery = date ? `?date=${date}` : '';
        const effectiveCourtGroupId = courtGroupId || '1';
        //console.log(effectiveCourtGroupId)
        fetch(`https://swdbbmsapi.azurewebsites.net/api/booking/court-group/${courtGroupId}${dateQuery}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setBookings(data);
                    if (date) {
                        const formattedDate = format(parseISO(date), 'dd/MM/yyyy');
                        toast.success(`Lịch của ngày ${formattedDate}`);
                    }
                } else if (data && typeof data === 'object') {
                    setBookings([data]);
                } else {
                    console.error('Fetched data is not an array or object:', data);
                }
            })
            .catch(error => console.error('Error fetching bookings:', error));
    };

    const fetchCourts = (courtGroupId: string) => {
        fetch(`https://swdbbmsapi.azurewebsites.net/api/court/court-group/${courtGroupId}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCourts(data);
                } else {
                    console.error('Fetched data is not an array:', data);
                }
            })
            .catch(error => console.error('Error fetching courts:', error));
    };

    useEffect(() => {
        const storedCourtGroupId = sessionStorage.getItem('selectedCourtGroupId');
        setCourtGroupId(storedCourtGroupId);

        if (storedCourtGroupId) {
            fetchBookings(storedCourtGroupId);
            fetchCourts(storedCourtGroupId);
        }

        const handleCourtGroupIdChange = (event: Event) => {
            const customEvent = event as CustomEvent;
            if ('detail' in customEvent) {
                const newCourtGroupId = customEvent.detail;
                setCourtGroupId(newCourtGroupId);
                fetchBookings(newCourtGroupId);
                fetchCourts(newCourtGroupId);
            }
        };

        window.addEventListener('courtGroupIdChange', handleCourtGroupIdChange);

        return () => {
            window.removeEventListener('courtGroupIdChange', handleCourtGroupIdChange);
        };
    }, []);

    useEffect(() => { }, [bookings]);

    const timeSlots = Array.from({ length: 20 }, (_, i) => {
        const hour = 5 + i;
        return `${hour < 10 ? '0' : ''}${hour}:00`;
    });

    const groupedBookings: { [key: string]: { [key: number]: Booking } } = {};

    bookings.forEach((booking) => {
        const fromTime = booking['from-time'];
        const toTime = booking['to-time'];
        const fromHour = parseInt(fromTime.split(':')[0], 10);
        const toHour = parseInt(toTime.split(':')[0], 10) - 1;
        for (let hour = fromHour; hour <= toHour; hour++) {
            const timeSlot = `${hour < 10 ? '0' : ''}${hour}:00`;
            if (!groupedBookings[timeSlot]) {
                groupedBookings[timeSlot] = {};
            }
            groupedBookings[timeSlot][booking['court-id']] = booking;
        }
    });

    const onSubmit = (data: any) => {
        if (courtGroupId) {
            fetchBookings(courtGroupId, data.date);
        }
    };

    const openDialog = (booking: Booking) => {
        onOpen("CheckInCheckOutForm", { booking });
        console.log(booking.customer['full-name'])
    };

    const handleUpdate = (date?: string) => {
        if (courtGroupId) {
            fetchBookings(courtGroupId, date);
        }
    };

    return (
        <div>
            <h1>Schedule</h1>
            <div className="form-group">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Chọn ngày</FormLabel>
                                    <FormControl>
                                        <Input type='date' placeholder="" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Chọn ngày để xem lịch đặt sân
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Chọn ngày</Button>
                    </form>
                </Form>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Time Slot</th>
                            {courts.map(court => (
                                <th key={court.id}>{court.name || court.id}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map((slot) => {
                            const bookingsForSlot = groupedBookings[slot] || {};
                            const courtsList: Array<Booking | null> = courts.map(court => bookingsForSlot[court.id] || null);

                            return (
                                <tr key={slot}>
                                    <td>{slot}</td>
                                    {courtsList.map((booking, index) => (
                                        <td key={index} className={
                                            booking
                                                ? booking.status === "Confirmed" || booking.status === "InProgress"
                                                    ? "highlight-yellow"
                                                    : booking.status === "Completed"
                                                        ? "highlight-green"
                                                        : "highlight-gray"
                                                : ""
                                        }>
                                            {booking ? (
                                                <>
                                                    {`Mã đặt sân: ${booking.id}\nTên khách hàng: ${booking.customer["full-name"]}\nTrạng thái: ${booking.status}\nBắt đầu: ${booking['from-time']}\nKết thúc: ${booking['to-time']}\n`}
                                                    {(booking.status === "Confirmed" || booking.status === "InProgress") && (
                                                        <Button
                                                            onClick={() => openDialog(booking)}
                                                            className="ml-2"
                                                        >
                                                            Check in/Check out
                                                        </Button>
                                                    )}
                                                </>
                                            ) : (
                                                ""
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <CheckInCheckOutForm onUpdate={() => handleUpdate(form.getValues('date'))} />
            <style jsx>{`
                .table-container {
                    overflow-x: auto;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid black;
                    text-align: center;
                    padding: 8px;
                    white-space: pre-line;
                }
                .highlight-yellow {
                    background-color: yellow;
                }
                .highlight-green {
                    background-color: green;
                    color: white;
                }
                .highlight-gray {
                    background-color: gray;
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default Schedule;
