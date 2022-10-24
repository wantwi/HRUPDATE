import { BaseURL } from "./base";

export const GetEmployeeMedical = (id)=>`EmployeeMedical/${id}`
export const GetProviderTypes = ()=>`EmployeeMedical/ProvidorType/dropdown-types?companyReference=00001_a01`
export const GetAilmentType = ()=> `EmployeeMedical/AilmentType/dropdown-types?companyReference=00001_A01`
export const PostEmployeeMedical = ()=> `EmployeeMedical`