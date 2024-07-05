"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Customer } from "../../type";
import { parseCookies } from "nookies";

const useCustomers = () => {
    const [customers, setCustomers] = useState<Customer[] | []>([]);
    const [loading, setLoading] = useState(false);
    const cookies = parseCookies();
    const token = cookies.sessionToken;
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(
                    "https://swdbbmsapi20240605224753.azurewebsites.net/api/customer",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setCustomers(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        setLoading(true);
        fetchUsers();
    }, []);

    return { customers, loading };
};

export default useCustomers;
