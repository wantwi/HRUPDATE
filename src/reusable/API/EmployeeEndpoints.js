import { BaseURL } from "./base";

/**
* Get Employee Types.
* @returns {string} urlpath
*/
export const SearchEmployees = () => `${BaseURL}Employees?companyReference=00001_A01`;
