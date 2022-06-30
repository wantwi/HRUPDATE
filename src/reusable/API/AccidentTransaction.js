import { BaseURL } from "./base";

export const PostAccidentTransaction =()=> `${BaseURL}EmployeeAccident`
export const GetAccidentTypes =()=> `${BaseURL}EmployeeAccident/AccidentType/dropdown-types?companyReference=00001_a01`
export const GetEmployeeAccidentByEmployeeId =()=> `${BaseURL}EmployeeAccident`