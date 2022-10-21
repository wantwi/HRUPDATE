// import useAuth from "../hooks/useAuth";
// import { CustomAxios } from "./CustomAxios";
// import {useEffect} from "react"
// import useRefreshtoken from "../hooks/useRefreshtoken";



// const useCustomApi = ()=>{
//     const {auth} = useAuth()
//     const refresh = useRefreshtoken();
//     console.log({CustomAxios:auth});

   

//     useEffect(() => {

     

//         const requestintercept =  CustomAxios.interceptors.request.use(
//             config =>{
//                 if(!config.headers.Authorization){
//                     config.headers.Authorization = `Bearer ${auth?.accessToken}`
//                 }
//                 return config
//             },(error)=> Promise.reject(error)
//         )
        
//         const responseintercept =  CustomAxios.interceptors.response.use(
//             response =>response,
//             async (error)=>{
//                 const prevRequest = error?.config
//                 if(error?.response?.status === 401 && !prevRequest?.sent){
//                     prevRequest.sent = true;
//                     const newAccesstoken = await refresh();
//                     prevRequest.headers.Authorization = `Bearer ${newAccesstoken}`
//                     return CustomAxios(prevRequest)

//                 }
//                 return  Promise.reject(error)
//             }
//         )
      
    
//       return () => {
//         CustomAxios.interceptors.request.eject(requestintercept)
//         CustomAxios.interceptors.response.eject(responseintercept)
//       }
//     }, [auth, refresh])
    
   
//    return CustomAxios

// }

// export default useCustomApi

//import useAuth from "./useAuth"
import useAuth from "src/hooks/useAuth"
import {useEffect} from "react"
import CustomAxios from "../api/axios"
// import useRefreshtoken from "hooks/useRefreshtoken"

const useCustomApi = () => {
    const {auth} = useAuth()
    // const refresh = useRefreshtoken()
   
    useEffect(() => {

        const requestintercept =  CustomAxios.interceptors.request.use(
            config => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${auth?.accessToken}`
                }
                return config
            }, (error) => Promise.reject(error)
        )
        
        const responseintercept =  CustomAxios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true
                     const newAccesstoken = null  //await refresh()
                    prevRequest.headers.Authorization = `Bearer ${newAccesstoken}`
                    return CustomAxios(prevRequest)

                }
                return  Promise.reject(error)
            }
        )
      
    
      return () => {
       CustomAxios.interceptors.request.eject(requestintercept)
        CustomAxios.interceptors.response.eject(responseintercept)
      }
    }, [auth])
    
   
   return CustomAxios

}

export default useCustomApi

