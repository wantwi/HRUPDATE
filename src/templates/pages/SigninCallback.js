import React, { useEffect } from 'react'

import { getUser, signinCallback, userLogin } from 'src/auth/config';
import useAuth from '../../hooks/useAuth';
import {Redirect} from "react-router-dom"


const SigninCallback = () => {
    const { auth, setAuth} = useAuth();
  

    const curentUser = async() => {
            try {
                const response  = await signinCallback()
                console.log("show response")
          
                 const {access_token, profile} = response
                const {family_name,given_name} = profile

                setAuth({ given_name, accessToken:response?.access_token })
    console.log(response)
                if(auth?.given_name){

                }

            } catch (error) {
                setAuth(null)
                console.error({signinCallbackErr: error})
                userLogin()
            }
       
      };


    useEffect(() => {
      
        curentUser();
      return () => {
        
      }
    }, [])
    
  return (
    <div>
        <h1>Please wait..... {auth?.given_name}</h1>
       {
         auth?.given_name?  <Redirect to="/dashboard" /> : null
        } 
             
        
    </div>
  )
}

export default SigninCallback