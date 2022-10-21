import { BaseURL } from "./base";

/**
 * Get Employee Types.
 * @returns {string} urlpath
 */
//export const SearchEmployees = (filter) = `${BaseURL}EmployeeBio?filter=${filter}`;

  export const SearchEmployees = (filter) =>`EmployeeBio?filter=${filter}`;
  
export const SearchEmployeesByNameAndProgram = (filter) =>
  `${BaseURL}EmployeeTraining/Program?filter=${filter}`;

export const GetEmployee = (handleId) =>
  `${BaseURL}Employees/${handleId}/profile`;
   
  export const GetEmployeeByID=(handleId)=>`EmployeeLanguage/${handleId}`
