import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useAxios = (url, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios(url, options);
      setData(response.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
    console.log({data,error,loading})
  }, [fetchData]);
 
  return { data, error, loading };
};

export default useAxios;
