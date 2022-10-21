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

console.log(REACT_APP_BASE_URL);
const CustomAxios = axios.create({
    baseURL: "http://psl-linux:5100/",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
}); 

export default CustomAxios;




