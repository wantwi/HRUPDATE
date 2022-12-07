import { useEffect, useLayoutEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import { renewToken } from "src/auth/config";
import useAuth from "./hooks/useAuth";
import Loader from './Loader/Loader';

const menus = [];

const PersistLogin = ({ children }) => {
 // const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
 // const history = useHistory();

  //const path = history.location.pathname.replace("/",'')

  const { auth, setAuth } = useAuth();

  const getNewToken = () => {
  
    renewToken()
      .then((response) => {
        const { access_token, profile } = response;
        const { family_name, given_name } = profile;

        setAuth({ given_name, family_name, accessToken: access_token });
       
        setIsLoading(false);
      })
      .catch((err) => {
    
        setIsLoading(false);
        setAuth(null);
      });
  };

  useEffect(() => {

    auth?.accessToken ? setIsLoading(false) : getNewToken();
  }, [])





  useEffect(() => {
    //  console.log(`isLoading: ${isLoading}`);
    //  console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
  }, [isLoading]);

  return <> {isLoading ? <Loader/> : children}</>;
};

export default PersistLogin;
