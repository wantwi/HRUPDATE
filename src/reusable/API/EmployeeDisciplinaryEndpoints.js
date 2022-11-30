import { BaseURL } from "./base";


//OFFENCE CATEGORY TAKES A COMPANY REFFERENCE
export const GetOffenceCategory = () =>
  `EmployeeOffence/OffenceCategory/dropdown?companyReference=00001_a01`;
  

  //OFFENCE CATEGORY RULE TAKES A COMPANY REFFERENCE
  export const GetOffenceCategoryRule = () => `EmployeeOffence/OffenceCategoryRule/dropdown?companyReference=00001_a01`

//export const GetEmployeeHobbyTypes = ()=> `${BaseURL}EmployeeHobbies/Type/dropdown-types?companyReference=00001_a01`
export const PostEmployeeDisciplinaryInfo = () => `EmployeeOffence`;
export const GetEmployeeOffenceById =(handleId)=>`EmployeeOffence/${handleId}`