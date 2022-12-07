// import React from "react";
// import { Redirect } from "react-router-dom";
// import useAuth from "./hooks/useAuth";


// export const ProtectedRoute = ({ children }) => {
//     const [auth] = useAuth({})

//     return (
//         <div>
//             {auth?.user ? (
//                 <>{children}</>
//             ) : (
//                 <Redirect to={"/login"} />
//             )}
//         </div>
//     );
// };
import React, { useCallback, useEffect } from "react";
import {  useHistory } from "react-router-dom";
import { userLogin } from "src/auth/config";
 import useAuth from "./hooks/useAuth";
import Loader from "./Loader/Loader";
 

export const ProtectedRoute = ({ children }) => {
     const {auth} = useAuth()
     const history = useHistory();
     const path = history.location.pathname.replace("/",'')
     const goTo = useCallback(() => {
        history.push(`/${path}`)
     },
     [history,path])

    useEffect(() => {
        if(!auth?.given_name){
            userLogin()
            console.log();
        }
    }, [])
    
    return (
        <div>
            {auth?.given_name? (
                <>{children}</>
            ) : <Loader/>}
        </div>
    );
};

