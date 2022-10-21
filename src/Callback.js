import React, { useEffect } from "react";
import { config, } from "./auth/config";
import { UserManager } from "oidc-client";
import jwt_decode from "jwt-decode";
import useAuth from "./hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useRefreshtoken from "../hooks/useRefreshtoken";


const userManager = new UserManager(config);

const Callback = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {auth,setAuth} = useAuth()

    const refresh = useRefreshtoken();

    console.log(auth)

    const from = location.state?.from?.pathname || "/";

  const getLoginUser = async () => {
      try {
        const {access_token,id_token} = await userManager.signinRedirectCallback();

        const {name} = jwt_decode(id_token)

        const {role} = jwt_decode(access_token)

        setAuth({ user:name,  roles:[role], accessToken:access_token });
       return;
        navigate(from, { replace: true });

    
       
          
      } catch (error) {
          
      }
   
  };

  const refreshToken =async()=>{

    const response = await refresh()

    console.log({refRer:response});
     
    //   try {
    //       const {access_token,id_token} = await userManager.signinSilent()

    //       const {role} = jwt_decode(access_token)
    //       const {name} = jwt_decode(id_token)

    //     setAuth(access_token)

        

          
    //   } catch (error) {
          
    //   }
  }




  useEffect(() => {
    getLoginUser();
  }, []);

  return <div>
      {/* {
          auth?
          <Navigate to="/home" state={{ from: location }} replace />
          :null
      } */}

      <button onClick={refreshToken}>Refresh token</button>
  </div>;
};

export default Callback;
