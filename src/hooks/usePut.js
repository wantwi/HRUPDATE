import { useState, useEffect, useCallback } from "react";
// import useCustomApi from "./useCustomApi";
import useCustomApi from "src/api/useCustomApi";
import useLoader from "./useLoader";


const usePut = (initialUrl, callback) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false)
  const { setIsLoading:setLoading } = useLoader()
  const api = useCustomApi()

  const executePost = useCallback(async () => {
    setLoading(true)
    try {
      const response = await api.put(url, data)

      if (!response) {
        throw "Data was not updated";
      }

      callback(response);

     
      setError(null);
      setLoading(false)
      setUrl("")
      setData(null)
      
    } catch (error) {
      setError(error);
      setLoading(false)
      setUrl("")
      setData(null)
    }
  });

  useEffect(() => {
    if(url && data){
      executePost();
    }
    
  }, [url, data]);

  return { setUrl, setData };
};

export default usePut;