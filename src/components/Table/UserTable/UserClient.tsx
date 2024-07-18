"use client";

import React, { useCallback, useEffect, useState } from "react";
import { User, UserColumn } from "../../../../type";
import { columns } from "./column";
import { DataTable } from "./data-table";
import { parseCookies } from "nookies";
import EditUserForm from "@/components/Form/EditUserForm";


const API_URL = "https://swdbbmsapi.azurewebsites.net/api/user";

const UserClient = () => {
  const [data, setData] = useState<UserColumn[]>([]);
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
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      setData(responseData);
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

  const handleUpdateUser = () => {
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
      <EditUserForm onUpdate={handleUpdateUser} />
    </div>
  );
};

export default UserClient;