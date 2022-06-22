import { BaseURL } from "./base";

/**
 * Get Employee Types.
 * @returns {string} urlpath
 */
export const SearchEmployees = (filter) =>
  `${BaseURL}Employees?companyReference=00001_A01&filter=${filter}&results=1000`;

export const GetEmployee = (handleId)=> `${BaseURL}Employees/${handleId}/profile`;