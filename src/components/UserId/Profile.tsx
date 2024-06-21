"use client"
import { useAuth } from "@/context/authContext";
import React from "react";
import { User } from "../../../type";


const Profile = ({
    username,
    "full-name": fullName,
    role,
    imageUrl,
    "phone-number": phoneNumber,
}: {
    username: string;
    "full-name": string;
    role: string;
    imageUrl: string;
    "phone-number": string;
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
                            <div className="col-xl-4">
                                <div className="form-group row widget-3">

                                    <div className="w-[300px] h-[200px]">
                                        <img src={imageUrl ? imageUrl : "/assets/images/noimage.jpg"} alt="image" className="rounded-md " />
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-8 ">

                                <div className="flex justify-between mb-2.5;">
                                    <label className="basis-[30%]">User Name:</label>
                                    <div className="grow pl-2.5">{username}</div>
                                </div>

                                <div className="flex justify-between mb-2.5;">
                                    <label className="basis-[30%]">Full Name:</label>
                                    <div className="grow pl-2.5">{fullName}</div>
                                </div>

                                <div className="flex justify-between mb-2.5;">
                                    <label className="basis-[30%]">Role:</label>
                                    <div className="grow pl-2.5">{role}</div>
                                </div>

                                <div className="flex justify-between mb-2.5;">
                                    <label className="basis-[30%]">Phone number:</label>
                                    <div className="grow pl-2.5">{phoneNumber}</div>
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