"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface FetchResult {
  data: Feedback[];
  loading: boolean;
  error: unknown;
}

const useFetch = (url: string): FetchResult => {
  const [data, setData] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
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
