import { useState, useEffect, useCallback } from "react";
import useCustomApi from "src/api/useCustomApi";
import useLoader from "./useLoader";


const useFetch = (initialUrl, callback) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl);
  const [optData, setOptData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const api = useCustomApi()
  const { setIsLoading:setLoading } = useLoader()
  const executeFetch = useCallback(async () => {
    
    setIsLoading(true)
    setLoading(true)
    try {
      const response = await api.get(url)

      if (!response) {
        throw "Data was not fetched";
      }

      Array.isArray(response?.data) ? setData(response?.data) : setData([response?.data]);

      if(optData){
        callback(response?.data, optData);
      }else{
        callback(response?.data);
      }
    

     
      setError(null);
      setIsLoading(false)
      setUrl("")
      setLoading(false)
      
    } catch (error) {
      setError(error);
      setIsLoading(false)
      setUrl("")
      setLoading(false)
    }

  });

  useEffect(() => {
    if(url){
      executeFetch();
    }
    
  }, [url]);

  return { data, error,isLoading, setUrl, setOptData };
};

export default useFetch;