"use client";
import { useState, useEffect } from "react";
import { Axios, isAxiosError, type AxiosError } from "axios";
import api from "@/lib/api";

interface FetchResult<T> {
  data: T[] | [];
  loading: boolean;
  error: AxiosError | null;
}

const useFetch = <T>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<T[]>(url);
        setData(response.data);
      } catch (error) {
        if (isAxiosError(error)) {
          setError(error);
          if (error.code == "ERR_NETWORK") {
            console.log("Network Error: ", error);
          } else if (error.code == "ERR_BAD_REQUEST") {
            console.log("Bad Request Error: ", error);
          } else {
            console.log("Unexpected Error: ", error);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
