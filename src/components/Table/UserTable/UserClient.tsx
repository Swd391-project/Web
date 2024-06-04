'use client';

import React, { useEffect, useState } from 'react';
import { User } from '@/data/type';
import { columns } from './column';
import { DataTable } from './data-table';

const API_URL = 'http://localhost:5166/User';

const UserClient = () => {
    const [data, setData] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                //console.log(data);
                setData(data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
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
