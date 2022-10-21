import { BaseURL } from "./base";

export const GetEmployeeSkills =()=>`${BaseURL}EmployeeSkills`
export const GetEmployeeSkillsTypes =() =>`${BaseURL}EmployeeSkills/Type/dropdown-types?companyReference=00001_A01`
export const PostEmployeeSkill =() =>`${BaseURL}EmployeeSkills`
export const  GetEmployeeById =(id)=>`${BaseURL}EmployeeSkills/${id}`