"use client";

import React, { useCallback, useEffect, useState } from "react";
import { columns } from "./column";
import { DataTable } from "./data-table";
import { parseCookies } from "nookies";
import { CourtGroupColumns } from "../../../../type";
import EditCourtGroupForm from "@/components/Form/EditCourtGroupForm";

const API_URL = "https://swdbbmsapi.azurewebsites.net/api/court-group";
const CourtGroupClient = () => {
  const [data, setData] = useState<CourtGroupColumns[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);
  const [isNextPageEmpty, setIsNextPageEmpty] = useState(false);
  const [isPageFull, setIsPageFull] = useState(true);
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
          Authorization: `Bearer ${token}`, // Sử dụng token từ cookies
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      //console.log(data)
      setData(data);
      setIsPageFull(checkPageFull(data.length));
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

  const handleUpdateCourtGroup = () => {
    fetchData();
  };

  const [loading, setLoading] = useState(false);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns}
        data={data}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        isNextDisabled={isNextPageEmpty && !isPageFull}
        isPreviousDisabled={pageNumber <= 1}
        loading={loading} />
      <EditCourtGroupForm onUpdate={handleUpdateCourtGroup} />
    </div>
  );
};

export default CourtGroupClient;
