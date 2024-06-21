"use client";
import BreadScrum from "@/components/BreadScrum";
import Profile from "@/components/CourtGroupId/Profile";
import { CourtGroup, User } from "../../../../../../type";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";

interface CourtGroupIdProps {
    params: {
        courtgroupId: string;
    };
}

const CourtGroupIdPage = ({ params }: CourtGroupIdProps) => {
    const [courtGroup, setCourtGroup] = useState<CourtGroup | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const API_URL = `https://swdbbmsapi20240605224753.azurewebsites.net/api/court-group/${params.courtgroupId}`;

    useEffect(() => {
        const fetchCourtGroup = async () => {
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

                const data: CourtGroup = await response.json();
                setCourtGroup(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourtGroup();
    }, [API_URL]);

    if (loading) {
        return <div className="content-body h-[650px]">Loading...</div>;
    }

    if (error) {
        return <div className="content-body h-[650px]">Error: {error}</div>;
    }

    if (!courtGroup) return null;

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
                            id={courtGroup.id}
                            name={courtGroup.name}
                            address={courtGroup.address}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourtGroupIdPage;
