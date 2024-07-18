"use client";

import React, { useCallback, useEffect, useState } from "react";
import { CourtColumns, CourtGroup } from "../../../../type";
import { columns } from "./column";
import { DataTable } from "./data-table";
import { parseCookies } from "nookies";
import useCourtGroup from "@/hook/useCourtGroup";
import EditCourtForm from "@/components/Form/EditCourtForm";

const API_URL = "https://swdbbmsapi.azurewebsites.net/api/court";

const CourtClient = () => {
    const [data, setData] = useState<CourtColumns[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(5);
    const [isNextPageEmpty, setIsNextPageEmpty] = useState(false);
    const [isPageFull, setIsPageFull] = useState(true);
    const { courtGroups } = useCourtGroup();

    const checkPageFull = (dataLength: number) => {
        return dataLength === pageSize;
    };

    const checkNextPageEmpty = async (currentPageNumber: number) => {
        const cookies = parseCookies();
        const token = cookies.sessionToken;

        try {
            const response = await fetch(`${API_URL}?page-number=${currentPageNumber + 1}&page-size=${pageSize}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const nextPageData = await response.json();
            return nextPageData.length === 0;
        } catch (error) {
            console.error("Failed to check next page data:", error);
            return true;
        }
    };

    const fetchData = useCallback(async () => {
        const cookies = parseCookies();
        const token = cookies.sessionToken;

        try {
            const response = await fetch(`${API_URL}?page-number=${pageNumber}&page-size=${pageSize}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const responseData = await response.json();
            //console.log(responseData)

            const mappedData = responseData.map((court: CourtColumns) => {
                const courtGroup = courtGroups.find((group: CourtGroup) => group.id === court["court-group"].id);
                return {
                    ...court,
                    "court-group": courtGroup ? courtGroup.name : "Unknown",
                };
            });

            setData(mappedData);
            setIsPageFull(checkPageFull(responseData.length));
            setIsNextPageEmpty(await checkNextPageEmpty(pageNumber));
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    }, [pageNumber, pageSize]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleNextPage = () => {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
    };

    const handlePreviousPage = () => {
        setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
    };

    const handleUpdateCourt = () => {
        fetchData();
    };

    const [loading, setLoading] = useState(false);

    return (
        <div className="container mx-auto py-10">
            <DataTable
                columns={columns}
                data={data}
                onNextPage={handleNextPage}
                onPreviousPage={handlePreviousPage}
                isNextDisabled={isNextPageEmpty && !isPageFull}
                isPreviousDisabled={pageNumber <= 1}
                loading={loading}
            />
            <EditCourtForm onUpdate={handleUpdateCourt} />
        </div>
    );
};

export default CourtClient;
