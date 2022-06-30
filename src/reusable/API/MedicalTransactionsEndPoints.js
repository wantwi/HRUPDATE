import { BaseURL } from "./base";

export const GetEmployeeMedical = ()=> `${BaseURL}EmployeeMedical`
export const GetProviderTypes = ()=>`${BaseURL}EmployeeMedical/ProvidorType/dropdown-types?companyReference=00001_a01`
export const GetAilmentType = ()=> `${BaseURL}EmployeeMedical/AilmentType/dropdown-types?companyReference=00001_A01`
export const PostEmployeeMedical = ()=> `${BaseURL}EmployeeMedical`