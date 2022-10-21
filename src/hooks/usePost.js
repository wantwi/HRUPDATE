import { useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import { toastWarning } from "src/reusable/components/ToastStylesComponent/ToastStyles";
// import useCustomApi from "./useCustomApi";
import useCustomApi from "src/api/useCustomApi";
import useLoader from "./useLoader";


const usePost = (initialUrl, callback) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false)
  const { setIsLoading: setLoading } = useLoader()
  const api = useCustomApi()

  const executePost = useCallback(async () => {
    setLoading(true)
    try {
      const response = await api.post(url, data)

      if (!response) {
        throw "Data was not saved";
      }

      callback(response);


      setError(null);
      setLoading(false)
      setUrl("")
      setData(null)

    } catch (error) {
      console.log({ error });
      toast.error("Something went wrong, Please try again later!");
      setError(error);
      setLoading(false)
      setUrl("")
      setData(null)
    }
  });

  useEffect(() => {
    if (url && data) {
      executePost();
    }

  }, [url, data]);

  return { setUrl, setData };
};

export default usePost;