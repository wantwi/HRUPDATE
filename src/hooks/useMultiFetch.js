import { useState, useEffect, useCallback } from "react";
//import useCustomApi from "./useCustomApi";
import useCustomApi from "src/api/useCustomApi";
import useLoader from "./useLoader";


const useMultiFetch = (initialUrl, callback) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [urls, setUrls] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false)
  const { setIsLoading:setLoading } = useLoader()
  const api = useCustomApi()

 

  const executeFetch = useCallback(async () => {
    setLoading(true)

    
    try {
        let requests = []
        urls.forEach(link => {
            
            requests.push(api.get(link))
        });
        
      const response = await Promise.all(requests)

      if (!response) {
        throw "Data was not fetched";
      }

     setData(response)

      callback(response);

     
      setError(null);
      setLoading(false)
      setUrls([])
    } catch (error) {
      setError(error);
      setLoading(false)
      setUrls([])
    }
  });

  useEffect(() => {
    if(urls.length > 0){
      executeFetch();
    }
  }, [urls]);

  return { data, error, isLoading, setUrls };
};

export default useMultiFetch;