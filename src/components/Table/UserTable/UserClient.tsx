'use client';

import React, { useEffect, useState } from 'react';
import { User } from '@/data/type';
import { columns } from './column';
import { DataTable } from './data-table';
import { parseCookies } from 'nookies';

const API_URL = 'https://swdbbmsapi20240605224753.azurewebsites.net/api/user';
const UserClient = () => {
    const [data, setData] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const cookies = parseCookies();
            const token = cookies.sessionToken;

            try {
                const response = await fetch(API_URL, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Sử dụng token từ cookies
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchData();
    }, []);


    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default UserClient;
