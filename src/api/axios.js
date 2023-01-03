// import axios from "axios";


//  const CustomAxios = axios.create({

//   baseURL: process.env.REACT_APP_BASE_URL,
//   headers: {
//     Accept: "application/json",
//         "Content-Type": "application/json",
//   },

// });
// export default CustomAxios



import axios from "axios";
import { BaseAPIURL } from "src/reusable/API/base";

const {REACT_APP_BASE_URL} = process.env

const CustomAxios = axios.create({
    baseURL: REACT_APP_BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Application-ID": process.env.REACT_APP_ID,
         "Company-Reference": JSON.parse(sessionStorage.getItem("companyReference"))?.reference || ""
    },
    withCredentials: true
}); 

export default CustomAxios;




