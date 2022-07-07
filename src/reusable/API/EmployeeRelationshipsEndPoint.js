import { BaseURL } from "./base";

export const GetEmployeeDependant = (filter) =>`${BaseURL}EmployeeDependant/${filter}`
export const GetDependantNationality = ()=>`${BaseURL}EmployeeDependant/Nationalities/dropdown-types?companyReference=00001_A01`
export const PostDependantDetails = ()=> `${BaseURL}/EmployeeDependant`



export const GetEmployeeGuarantor = (filter)=> `${BaseURL}EmployeeGuarantor/${filter}`
export const PostEmployeeGuarantor = ()=> `${BaseURL}EmployeeGuarantor
`


export const GetEmployeeNextOfKin = ()=> `${BaseURL}EmployeeNextofKin`
export const PostEmployeeNextOfKin = ()=> `${BaseURL}EmployeeNextofKin`


export const GetEmployeeEmergencyContact =(filter)=>`${BaseURL}EmployeeEmergencyContact/${filter}`
export const PostEmployeeEmergencyContact =()=>`${BaseURL}EmployeeEmergencyContact`


export const GetBeneficiary  =(filter)=>`${BaseURL}EmployeeBeneficiary/${filter}`
export const PostBeneficiary =()=>`${BaseURL}EmployeeBeneficiary`