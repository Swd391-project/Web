"use client";
import BreadScrum from "@/components/BreadScrum";
import Profile from "@/components/UserId/Profile";
import { User, BookingList } from "../../../../../../type"; // Ensure you have Booking type defined
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";

interface UserIdPageProps {
  params: {
    userId: string;
  };
}

const UserIdPage = ({ params }: UserIdPageProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<BookingList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL_USER = `https://swdbbmsapi.azurewebsites.net/api/user/${params.userId}`;
  const API_URL_BOOKINGS = `https://swdbbmsapi.azurewebsites.net/api/booking/user-booking/${params.userId}`;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const cookies = parseCookies();
        const token = cookies.sessionToken;

        const response = await fetch(API_URL_USER, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data: User = await response.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    const fetchBookings = async () => {
      try {
        const cookies = parseCookies();
        const token = cookies.sessionToken;

        const response = await fetch(API_URL_BOOKINGS, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch booking data");
        }

        const data: BookingList[] = await response.json();
        setBookings(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchBookings();
  }, [API_URL_USER, API_URL_BOOKINGS]);

  if (loading) {
    return <div className="content-body h-[650px]">Loading...</div>;
  }

  if (error) {
    return <div className="content-body h-[650px]">Error: {error}</div>;
  }

  if (!user) return null;

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
              image={user.image}
              username={user.email}
              full-name={user["full-name"]}
              role={user.role}
              phone-number={user["phone-number"]}
            />
            <div className="booking-table mt-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">Lịch sử đặt sân</h2>
              {bookings.length === 0 ? (
                <p className="text-center text-gray-600">Chưa từng đặt sân</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Date</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">From Time</th>
                        <th className="py-2 px-4 border-b">To Time</th>
                        <th className="py-2 px-4 border-b">Customer Name</th>
                        <th className="py-2 px-4 border-b">Customer Phone</th>
                        <th className="py-2 px-4 border-b">Court Name</th>
                        <th className="py-2 px-4 border-b">Court Group Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-100">
                          <td className="py-2 px-4 border-b text-center">{booking.id}</td>
                          <td className="py-2 px-4 border-b text-center">{booking.date}</td>
                          <td className="py-2 px-4 border-b text-center">{booking.status}</td>
                          <td className="py-2 px-4 border-b text-center">{booking["from-time"]}</td>
                          <td className="py-2 px-4 border-b text-center">{booking["to-time"]}</td>
                          <td className="py-2 px-4 border-b text-center">{booking.customer["full-name"]}</td>
                          <td className="py-2 px-4 border-b text-center">{booking.customer["phone-number"]}</td>
                          <td className="py-2 px-4 border-b text-center">{booking.court.name}</td>
                          <td className="py-2 px-4 border-b text-center">{booking.court["court-group"].name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserIdPage;
