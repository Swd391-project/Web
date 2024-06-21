"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CourtGroup } from "../../type";

const useCourtGroup = () => {
    const [courtGroups, setCourtGroups] = useState<CourtGroup[] | []>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCourtGroups = async () => {
            try {
                const res = await axios.get(
                    "https://swdbbmsapi20240605224753.azurewebsites.net/api/court-group"
                );
                setCourtGroups(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        setLoading(true);
        fetchCourtGroups();
    }, []);

    return { courtGroups, loading };
};

export default useCourtGroup;
