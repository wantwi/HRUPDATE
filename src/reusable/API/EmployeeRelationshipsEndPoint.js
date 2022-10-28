import { BaseURL } from "./base";

export const GetEmployeeDependant = (filter) =>
  `EmployeeDependant/${filter}`;


  // export const GetEmployeeDependant = (filter) =>
  // `${BaseURL}EmployeeDependant/${filter}`;


export const GetDependantNationality = () =>
  `EmployeeDependant/Nationalities/dropdown-types?companyReference=00001_A01`;

  // export const GetDependantNationality = () =>
  // `${BaseURL}EmployeeDependant/Nationalities/dropdown-types?companyReference=00001_A01`;



export const PostDependantDetails = () => `EmployeeDependant`;

export const GetEmployeeGuarantor = (filter) =>
  `EmployeeGuarantor/${filter}`;


  // export const GetEmployeeGuarantor = (filter) =>
  // `${BaseURL}EmployeeGuarantor/${filter}`;

export const PostEmployeeGuarantor = () => `EmployeeGuarantor`;
//export const PostEmployeeGuarantor = () => `${BaseURL}EmployeeGuarantor`;


//export const GetEmployeeNextOfKin = () => `${BaseURL}EmployeeNextofKin`;
export const GetEmployeeNextOfKin = (id) => `EmployeeNextofKin/${id}`;


//export const PostEmployeeNextOfKin = () => `${BaseURL}EmployeeNextofKin`;
export const PostEmployeeNextOfKin = () => `EmployeeNextofKin`;

// export const GetEmployeeNextOfKin



export const GetEmployeeEmergencyContact = (filter) =>`EmployeeEmergencyContact/${filter}`;

  // export const GetEmployeeEmergencyContact = (filter) =>
  // `${BaseURL}EmployeeEmergencyContact/${filter}`;



//export const PostEmployeeEmergencyContact = () =>
//  `${BaseURL}EmployeeEmergencyContact`;

export const PostEmployeeEmergencyContact = () =>
  `EmployeeEmergencyContact`;

export const GetBeneficiary = (filter) =>
  `EmployeeBeneficiary/${filter}`;

  // export const GetBeneficiary = (filter) =>
  // `${BaseURL}EmployeeBeneficiary/${filter}`;


export const PostBeneficiary = () => `EmployeeBeneficiary`;
//export const PostBeneficiary = () => `${BaseURL}EmployeeBeneficiary`;



//Dropdown
export const GetRelationTypes = () =>
  `EmployeeFamily/RelationTypes/dropdown-types?companyReference=00001_A01`;

  // export const GetRelationTypes = () =>
  // `${BaseURL}EmployeeFamily/RelationTypes/dropdown-types?companyReference=00001_A01`;


export const GetNationality = () =>`EmployeeDependant/Nationalities/dropdown-types?companyReference=00001_a01`;

  // export const GetNationality = () =>
  // `${BaseURL}EmployeeDependant/Nationalities/dropdown-types?companyReference=00001_A01`;

export const GetIdTypes = () =>
  `EmployeeDependant/IdentityTypes/dropdown-types?companyReference=00001_A01`;

  // export const GetIdTypes = () =>
  // `${BaseURL}EmployeeDependant/IdentityTypes/dropdown-types?companyReference=00001_A01`;