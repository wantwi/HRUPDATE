
/**
 * Get Employee Types.
 * @returns {string} urlpath
 */
//export const SearchEmployees = (filter) = `${BaseURL}EmployeeBio?filter=${filter}`;

export const SearchEmployees = (filter) => `Employees?filter=${filter === "*" ? "" : filter}`;

export const SearchEmployeesByNameAndProgram = (filter) =>
  `EmployeeTraining/Program?filter=${filter}`;

export const GetEmployee = (empID) =>
  `Employees/${empID}/profile`;

export const GetEmployeeByID = (empID) => `EmployeeLanguage/${empID}`


export const GetEmployeeOrgDetails = (empID) => `Employees/${empID}/organisation`
