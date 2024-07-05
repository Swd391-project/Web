"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../../type";
import { parseCookies } from "nookies";

const useUsers = () => {
    const [users, setUsers] = useState<User[] | []>([]);
    const [loading, setLoading] = useState(false);
    const cookies = parseCookies();
    const token = cookies.sessionToken;
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(
                    "https://swdbbmsapi20240605224753.azurewebsites.net/api/user",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUsers(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        setLoading(true);
        fetchUsers();
    }, []);

    return { users, loading };
};

export default useUsers;
