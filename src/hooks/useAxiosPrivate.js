import { useEffect } from "react/cjs/react.production.min"
import { axiosPrivate } from "../api/axios"
import useAuth from "./useAuth"
import useRefreshtoken from "./useRefreshtoken"



const useAxiosPrivate = () => {
    const refresh = useRefreshtoken()
    const {auth} = useAuth()

    useEffect(() => {

        const requestintercept =  axiosPrivate.interceptors.request.use(
            config =>{
                if(!config.headers.Authorization){
                    config.headers.Authorization = `Bearer ${auth?.accessToken}`
                }
                return config
            },(error)=> Promise.reject(error)
        )
        
        const responseintercept =  axiosPrivate.interceptors.response.use(
            response =>response,
            async (error)=>{
                const prevRequest = error?.config
                if(error?.response?.status === 401 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    const newAccesstoken = await refresh();
                    prevRequest.headers.Authorization = `Bearer ${newAccesstoken}`
                    return axiosPrivate(prevRequest)

                }
                return  Promise.reject(error)
            }
        )
      
    
      return () => {
        axiosPrivate.interceptors.request.eject(requestintercept)
        axiosPrivate.interceptors.response.eject(responseintercept)
      }
    }, [auth, refresh])
    

   return axiosPrivate
      
 
}

export default useAxiosPrivate