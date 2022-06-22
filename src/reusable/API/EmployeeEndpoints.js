import { BaseURL } from "./base";

/**
 * Get Employee Types.
 * @returns {string} urlpath
 */
export const SearchEmployees = (filter) =>`${BaseURL}EmployeeBio?filter=${filter}`;



export const GetEmployee = (handleId) => `${BaseURL}Employees/${handleId}/profile`;
