"use client";
import BreadScrum from "@/components/BreadScrum";
import Profile from "@/components/CourtGroupId/Profile";
import { Court, CourtGroup, User } from "../../../../../../type";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";

interface CourtIdProps {
    params: {
        courtId: string;
    };
}

const CourtIdPage = ({ params }: CourtIdProps) => {
    const [court, setCourt] = useState<Court | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const API_URL = `https://swdbbmsapi.azurewebsites.net/api/court/details/${params.courtId}`;

    useEffect(() => {
        const fetchCourt = async () => {
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
                    throw new Error("Failed to fetch court group data");
                }

                const data: Court = await response.json();
                setCourt(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourt();
    }, [API_URL]);

    if (loading) {
        return <div className="content-body h-[650px]">Loading...</div>;
    }

    if (error) {
        return <div className="content-body h-[650px]">Error: {error}</div>;
    }


    if (!court) return null;

    const status = court.status === "Available" ? "Đang hoạt động" : "Không hoạt động";

    return (
        <div id="main-wrapper" className="show">
            <div className="content-body">
                <div className="warper container-fluid">
                    <div className="all-patients main_container">
                        <BreadScrum
                            title="Thông Tin Cụm Sân"
                            subRouteTitle="court-group"
                            subTitle1="Tất Cả Cụm Sân"
                            subTitle2="Thông Tin Cụm Sân"
                        />
                        <Profile
                            id={court.id}
                            name={court["court-group-name"]}
                            status={status}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourtIdPage;
