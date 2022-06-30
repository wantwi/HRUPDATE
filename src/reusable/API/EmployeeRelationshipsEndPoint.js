import { BaseURL } from "./base";

export const GetEmployeeDependant = () =>`${BaseURL}EmployeeDependant`
export const GetDependantNationality = ()=>`${BaseURL}EmployeeDependant/Nationalities/dropdown-types?companyReference=00001_A01`
export const PostDependantDetails = ()=> `${BaseURL}/EmployeeDependant`



export const GetEmployeeGuarantor = ()=> `${BaseURL}EmployeeGuarantor`
export const PostEmployeeGuarantor = ()=> `${BaseURL}EmployeeGuarantor
`


export const GetEmployeeNextOfKin = ()=> `${BaseURL}EmployeeNextofKin`
export const PostEmployeeNextOfKin = ()=> `${BaseURL}EmployeeNextofKin`