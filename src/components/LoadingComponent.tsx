"use client";
import React from "react";
import Loader from "./ui/loader";

const Loading = () => {
    return (
        <div className="flex h-full items-center justify-center inset-0 w-full">
            <Loader />
        </div>
    );
};

export default Loading;