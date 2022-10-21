import React from 'react'
import axios from '../api/axios'
import { renewToken } from '../auth/config'
import useAuth from './useAuth'
import jwt_decode from "jwt-decode";
const useRefreshtoken = () => {
    const {setAuth} = useAuth()

    const refresh = async ()=>{
        const  refresh = await renewToken();

        const {access_token,id_token} =refresh

        const {name} = jwt_decode(id_token)

        const {role} = jwt_decode(access_token)

        setAuth({ user:name,  roles:[role], accessToken:access_token });

        // const response  =  await axios.get('/refresh',{
        //     withCredentials:true
        // })

        // setAuth(prev =>{

        //     // console.log({prev});
        //     // console.log(response.data.accessToken);
        //     return {...prev, accessToken:response.accessToken}
        // })

        return access_token
    }
 return refresh
}

export default useRefreshtoken 