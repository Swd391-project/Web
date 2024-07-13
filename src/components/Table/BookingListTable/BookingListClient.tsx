"use client";

import React, { useEffect, useState, useCallback } from "react";
import { columns } from "./column";
import { DataTable } from "./data-table";
import { parseCookies } from "nookies";
import { BookingListColumns, Customer } from "../../../../type";
import useCustomers from "@/hook/useCustomer";
import { format, parse } from "date-fns";
import DeleteBookingForm from "@/components/Form/DeleteBookingForm";

const API_URL = "https://swdbbmsapi.azurewebsites.net/api/booking";
const BookingListClient = () => {
    const [data, setData] = useState<BookingListColumns[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(5);
    const [isNextPageEmpty, setIsNextPageEmpty] = useState(false);
    const [isPageFull, setIsPageFull] = useState(true);

    const { customers } = useCustomers();

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
            console.log(responseData)
            const mappedData = responseData.map((booking: BookingListColumns) => {
                const customer = customers.find((customer: Customer) => customer.id === booking.customer.id);
                //console.log(customer?.["full-name"])
                return {
                    ...booking,
                    "customer-id": customer ? customer["full-name"] : "Unknown",
                    "created-date": format(new Date(booking["created-date"]), 'dd/MM/yyyy'),
                    "date": format(parse(booking["date"], 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy'),
                };

            });

            setData(mappedData);
            setIsPageFull(checkPageFull(responseData.length));
            setIsNextPageEmpty(await checkNextPageEmpty(pageNumber));
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    }, [pageNumber, pageSize, customers]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleNextPage = () => {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
    };

    const handlePreviousPage = () => {
        setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
    };

    const handleDeleteSuccess = () => {
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
            <DeleteBookingForm onDeleteSuccess={handleDeleteSuccess} />
        </div>
    );
};

export default BookingListClient;
