import { useEffect, useLayoutEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import { renewToken } from "src/auth/config";
import useAuth from "./hooks/useAuth";
import Loader from './Loader/Loader';
import useFetch from "./hooks/useFetch";
import useAppGlobals from "./hooks/useAppGlobals";

const menus = [];

const PersistLogin = ({ children }) => {
  // const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { setAppGlobals } = useAppGlobals();
  // const history = useHistory();

  //const path = history.location.pathname.replace("/",'')

  const { auth, setAuth } = useAuth();
  const { setUrl: companySetttingUrl } = useFetch("", (response) => {
    // //console.log({companySetttingUrl: response});
    ///paysSettings
    setAppGlobals((prev) => ({ ...prev, paysSettings: response }));
  });

  const getNewToken = () => {

    renewToken()
      .then((response) => {
        const { access_token, profile } = response;
        const { family_name, given_name, name, sub } = profile;

        setAuth({
          given_name,
          name,
          sub,
          family_name,
          accessToken: access_token,
        });
        // setUrl(`/Users/${auth?.companyReference}/menus/${process.env.REACT_APP_ID}`);
        // setAppsUrl(`/Menus/app/${process.env.REACT_APP_ID}`);
        companySetttingUrl("Pays/Settings");
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

  return <> {isLoading ? <Loader /> : children}</>;
};

export default PersistLogin;
