import { BaseURL } from "./base";

export const GetEmployeeHobbyTypes = ()=> `EmployeeHobbies/Type/dropdown-types?companyReference=00001_a01`
export const GetEmployeeHobbies = () => `EmployeeHobbies`
export const PostEmployeeHobbies = () => `EmployeeHobbies`
export const DeleteEmployeeHobbies = () => `EmployeeHobbies`

export const GetEmployeeByid =(id)=>`EmployeeHobbies/${id}`