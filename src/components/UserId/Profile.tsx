"use client"
import { useAuth } from "@/context/authContext";
import React from "react";
import { User } from "../../../type";

const Profile = ({
    username,
    "full-name": fullName,
    role,
    image,
    "phone-number": phoneNumber,
}: {
    username: string;
    "full-name": string;
    role: string;
    image: string;
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
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-1/2 p-2">
                                <div className="form-group">
                                    <div className="w-full h-full flex justify-center items-center">
                                        <img src={image ? image : "/assets/images/noimage.jpg"} alt="Profile" className="rounded-md object-contain max-h-[500px] max-w-full" />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2 p-2">
                                <div className="mb-4 flex justify-between">
                                    <label className="w-1/3">User Name:</label>
                                    <div className="w-2/3">{username}</div>
                                </div>

                                <div className="mb-4 flex justify-between">
                                    <label className="w-1/3">Full Name:</label>
                                    <div className="w-2/3">{fullName}</div>
                                </div>

                                <div className="mb-4 flex justify-between">
                                    <label className="w-1/3">Role:</label>
                                    <div className="w-2/3">{role}</div>
                                </div>

                                <div className="mb-4 flex justify-between">
                                    <label className="w-1/3">Phone number:</label>
                                    <div className="w-2/3">{phoneNumber}</div>
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
