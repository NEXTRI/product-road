"use client";
import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import axiosInstance from "@/lib/api";

interface FetchResult<T> {
  data: T | [];
  loading: boolean;
  error: unknown;
}

const useFetch = <T>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axiosInstance.get(url);
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (error: unknown) {
        setError(error);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
