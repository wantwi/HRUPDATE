import { BaseURL } from "./base";

export const GetEmployeeHobbyTypes = ()=> `${BaseURL}EmployeeHobbies/Type/dropdown-types?companyReference=00001_a01`
export const GetEmployeeHobbies = () => `${BaseURL}EmployeeHobbies`
export const PostEmployeeHobbies = () => `${BaseURL}EmployeeHobbies`