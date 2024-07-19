"use client";
import BreadScrum from "@/components/BreadScrum";
import Profile from "@/components/BookingId/Profile";
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { BookingListColumns } from "../../../../../../type";

interface BookingIdPageProps {
    params: {
        bookingId: number;
    };
}

const BookingIdPage = ({ params }: BookingIdPageProps) => {
    const [booking, setBooking] = useState<BookingListColumns | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const API_URL = `https://swdbbmsapi.azurewebsites.net/api/booking/${params.bookingId}`;

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const cookies = parseCookies();
                const token = cookies.sessionToken;

                const response = await fetch(API_URL, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(response);

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const data: BookingListColumns = await response.json();
                setBooking(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, [API_URL]);

    if (loading) {
        return <div className="content-body h-[650px]">Loading...</div>;
    }

    if (error) {
        return <div className="content-body h-[650px]">Error: {error}</div>;
    }

    if (!booking) return null;

    return (
        <div id="main-wrapper" className="show">
            <div className="content-body">
                <div className="warper container-fluid">
                    <div className="all-patients main_container">
                        <BreadScrum
                            title="Thông Tin Nhân Viên"
                            subRouteTitle="user"
                            subTitle1="Tất Cả Nhân Viên"
                            subTitle2="Thông Tin Nhân Viên"
                        />
                        <Profile
                            id={booking.id}
                            date={booking.date}
                            status={booking.status}
                            full-name={booking.customer["full-name"]}
                            from-time={booking["from-time"]}
                            to-time={booking["to-time"]}
                            court-id={booking["court-id"]}
                            created-date={booking["created-date"]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingIdPage;
