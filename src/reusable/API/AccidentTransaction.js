import { BaseURL } from "./base";

export const PostAccidentTransaction =()=> `EmployeeAccident`
export const GetAccidentTypes =()=> `EmployeeAccident/AccidentType/dropdown-types?companyReference=00001_a01`
export const GetEmployeeAccidentByEmployeeId =(handleId)=> `EmployeeAccident/${handleId}`
