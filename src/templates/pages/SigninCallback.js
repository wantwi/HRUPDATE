import React, { useEffect, useState } from 'react'

import useAuth from '../../hooks/useAuth';
import { Redirect, useHistory } from "react-router-dom";
import "./signiCallback.css";
import useFetch from "src/hooks/useFetch";
import Loader from "src/Loader/Loader";
import useCustomApi from "src/api/useCustomApi";
import jwt from "jwt-decode";
import { signinCallback, userLogin, userLogout } from "src/auth/config";

const SigninCallback = () => {
  const { auth, setAuth } = useAuth();
  const [applications, setapplications] = useState([]);
  const [companies, setcompanies] = useState([]);
  const [selectedCompany, setselectedCompany] = useState("");
  const [width, setWidth] = useState("50%");
  const [isFetching, setIsFetching] = useState(true);
  const [showLogout, setshowLogout] = useState(false);
  const axios = useCustomApi();
  const history = useHistory();

  // const curentUser = async () => {
  //   try {
  //     const response = await signinCallback()
  //     console.log("show response")

  //     const { access_token, profile } = response
  //     const { family_name, given_name } = profile

  //     setAuth({ given_name, accessToken: response?.access_token })
  //     console.log(response)
  //     if (auth?.given_name) {

  //     }

  //   } catch (error) {
  //     setAuth(null)
  //     console.error({ signinCallbackErr: error })
  //     userLogin()
  //   }

  // };


  // useEffect(() => {

  //   curentUser();
  //   return () => {

  //   }
  // }, [])
  const {
    setUrl: setGetUserCompanyUrl,
    isLoading,
    isError,
  } = useFetch("", (response) => {
    if (response.length > 1) {
      setcompanies(response);
    } else {
      setAuth((prev) => ({
        ...prev,
        companyId: response[0]?.id,
        companyName: response[0]?.name,
        companyReference: response[0]?.reference,
      }));

      sessionStorage.setItem("companyReference", JSON.stringify(response[0]));
      axios.defaults.headers["Company-Reference"] = response[0]?.reference;
      history.push("/dashboard");
    }

    setIsFetching(false);
  });

  const { setUrl: setGetUserAppsUrl } = useFetch("", (response) => {
    if (response.length === 1) {
      setWidth("15%");
    } else if (response.length === 2) {
      setWidth("30%");
    } else {
      setWidth("50%");
    }
    setapplications(response);
  });

  const location = sessionStorage.getItem("previous");

  const curentUser = async () => {
    try {
      const response = await signinCallback();

      const { access_token, profile } = response;
      const { family_name, given_name, name, sub } = profile;

      const { acc_ref } = jwt(access_token);
      // console.log({ acc_ref, access_token });
      axios.defaults.headers["Company-Reference"] = acc_ref;
      // console.log({getNewToken: response, token: acc_ref, axios});

      setAuth({ given_name, name, sub, accessToken: response?.access_token });

      if (sessionStorage.getItem("query")) {
        const query = sessionStorage
          .getItem("query")
          .replace("?id=", "")
          .split("$");
        const companyInfo = {
          id: query[0],
          reference: query[1],
          name: query[2].replace(/%20/g, " "),
        };

        setAuth((prev) => ({
          ...prev,
          companyId: companyInfo?.id,
          companyName: companyInfo?.name,
          companyReference: companyInfo?.reference,
        }));

        sessionStorage.setItem("companyReference", JSON.stringify(companyInfo));
        history.push("/dashboard");
      }

      setGetUserCompanyUrl("Users/Companies");
    } catch (error) {
      setAuth(null);
      console.error({ signinCallbackErr: error });
      userLogin();
    }
  };

  const handleOnChange = (e) => {
    const currentCompany = companies.find(
      (x) => x?.reference === e.target.value
    );
    axios.defaults.headers["Company-Reference"] = currentCompany?.reference;

    setselectedCompany(e.target.value);
  };

  useEffect(() => {
    curentUser();
    return () => { };
  }, []);

  useEffect(() => {
    if (selectedCompany.length > 0) {
      setGetUserAppsUrl(`Applications/${selectedCompany}`);
      const currentCompany = companies.find(
        (x) => x?.reference === selectedCompany
      );

      setAuth((prev) => ({
        ...prev,
        companyId: currentCompany?.id,
        companyName: currentCompany?.name,
        companyReference: currentCompany?.reference,
      }));

      axios.defaults.headers["Company-Reference"] = currentCompany?.reference;

      sessionStorage.setItem(
        "companyReference",
        JSON.stringify(currentCompany)
      );
      history.push("/dashboard");
    }
    return () => {
      setGetUserAppsUrl("");
    };
  }, [selectedCompany]);

  if (isFetching) {
    return <Loader />;
  }

  if (isError) {
    userLogout();
  }


  return (
    <>
      <div className="nav-head">
        <h4>Payroll</h4>
        <div
          className="user-infob "
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: -10,
          }}
        >
          <h5>{auth?.given_name ? `${auth?.given_name}` : ""}</h5>
          <div className="cir" onClick={() => setshowLogout(!showLogout)}>
            {showLogout ? (
              <div className="logout" onClick={userLogout}>
                Logout
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="container-wrapper">
        {auth?.given_name ? (
          <>
            {companies.length > 1 ? (
              <div className="company-wrapper">
                <select className="form-control f-25" onChange={handleOnChange}>
                  <option>Select Company</option>
                  {companies.map((x) => (
                    <option key={x?.id} value={x?.reference}>
                      {x?.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <Redirect to="/dashboard" />
            )}
          </>
        ) : (
          <h1>Please wait.....</h1>
        )}
      </div>
    </>
  );
}

export default SigninCallback