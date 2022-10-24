import { BaseURL } from "./base";

export const GetOffenceCategory = () =>
  `${BaseURL}EmployeeOffence/OffenceCategory/dropdown?companyReference=00001_a01`;
  
  export const GetOffenceCategoryRule = (filter) => `${BaseURL}EmployeeOffence/OffenceCategoryRuleByCatId/${filter}`

//export const GetEmployeeHobbyTypes = ()=> `${BaseURL}EmployeeHobbies/Type/dropdown-types?companyReference=00001_a01`
export const PostEmployeeDisciplinaryInfo = () => `EmployeeOffence`;
export const GetEmployeeOffenceById =(handleId)=>`EmployeeOffence/${handleId}`