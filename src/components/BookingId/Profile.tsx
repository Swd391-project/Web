"use client"
import { useAuth } from "@/context/authContext";
import React from "react";
import { User } from "../../../type";


const Profile = ({
    id,
    date,
    status,
    "court-id": courtId,
    "from-time": fromTime,
    "to-time": toTime,
    "created-date": createdDate,
    "full-name": fullName
}: {
    id: number;
    date: string;
    status: string;
    "court-id": number;
    "from-time": string;
    "to-time": string;
    "created-date": string;
    "full-name": string;

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
                            {/* <div className="col-xl-4">
                                <div className="form-group row widget-3">

                                    <div className="w-[300px] h-[200px]">
                                        <img src={imageUrl ? imageUrl : "/assets/images/noimage.jpg"} alt="image" className="rounded-md " />
                                    </div>
                                </div>
                            </div> */}

                            <div className="col-xl-8 ">

                                <div className="flex justify-between mb-2.5;">
                                    <label className="basis-[30%]">Mã đặt sân:</label>
                                    <div className="grow pl-2.5">{id}</div>
                                </div>

                                <div className="flex justify-between mb-2.5;">
                                    <label className="basis-[30%]">Full Name:</label>
                                    <div className="grow pl-2.5">{fullName}</div>
                                </div>

                                <div className="flex justify-between mb-2.5;">
                                    <label className="basis-[30%]">Ngày chơi:</label>
                                    <div className="grow pl-2.5">{date}</div>
                                </div>
                                <div className="flex justify-between mb-2.5;">
                                    <label className="basis-[30%]">Trạng thái:</label>
                                    <div className="grow pl-2.5">{status}</div>
                                </div>
                                <div className="flex justify-between mb-2.5;">
                                    <label className="basis-[30%]">Sân:</label>
                                    <div className="grow pl-2.5">{courtId}</div>
                                </div>

                                <div className="flex justify-between mb-2.5;">
                                    <label className="basis-[30%]">From time:</label>
                                    <div className="grow pl-2.5">{fromTime}</div>
                                </div>
                                <div className="flex justify-between mb-2.5;">
                                    <label className="basis-[30%]">To time:</label>
                                    <div className="grow pl-2.5">{toTime}</div>
                                </div>
                                <div className="flex justify-between mb-2.5;">
                                    <label className="basis-[30%]">Created date:</label>
                                    <div className="grow pl-2.5">{createdDate}</div>
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