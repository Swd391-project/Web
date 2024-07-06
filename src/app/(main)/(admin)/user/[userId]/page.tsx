"use client";
import BreadScrum from "@/components/BreadScrum";
import Profile from "@/components/UserId/Profile";
import { User } from "../../../../../../type";
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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const API_URL = `https://swdbbmsapi.azurewebsites.net/api/user/${params.userId}`;

    useEffect(() => {
        const fetchUser = async () => {
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

                const data: User = await response.json();
                setUser(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [API_URL]);

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
                            imageUrl={user.imageUrl}
                            username={user.email}
                            full-name={user["full-name"]}
                            role={user.role}
                            phone-number={user["phone-number"]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserIdPage;
