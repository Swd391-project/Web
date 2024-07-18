"use client"
import { useAuth } from "@/context/authContext";
import React from "react";

const Profile = ({
    id,
    name,
    status,
}: {
    id: number;
    name: string;
    status: string;
}) => {
    const { user } = useAuth();
    const isAdmin = user?.role === "Admin";
    return (
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">Thông Tin</h4>
            </div>
            <div className="card-body">
                <div className="basic-form">
                    <form>
                        <div className="row">
                            <div className="col-xl-8 ">
                                <div className="flex justify-between mb-2.5;">
                                    <label className="basis-[30%]">Mã số:</label>
                                    <div className="grow pl-2.5">{id}</div>
                                </div>
                                <div className="flex justify-between mb-2.5;">
                                    <label className="basis-[30%]">Tên cụm sân:</label>
                                    <div className="grow pl-2.5">{name}</div>
                                </div>
                                <div className="flex justify-between mb-2.5;">
                                    <label className="basis-[30%]">Trạng thái hoạt động:</label>
                                    <div className="grow pl-2.5">{status}</div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;