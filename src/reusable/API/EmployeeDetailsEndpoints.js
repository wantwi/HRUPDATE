import { EmployeeDetailsBaseAPIURL } from "./base";

/**
* Endpoint to search for employee by name or code.
* @param query [required]
* @param pageNumber [optional]
* @param numberOfItems [optional]
* @param orderBy [optional]
* @param sortOrder [optional]
* @returns urlpath
*/
export const SearchEmployeeByNameOrCode = (query, pageNumber, numberOfItems, orderBy, sortOrder) => `${EmployeeDetailsBaseAPIURL}Employees/filter?Filter=${query}&Page=${pageNumber}&Results=${numberOfItems}&OrderBy=${orderBy}&SortOrder=${sortOrder}`;
  
/**
 * Endpoint to get currencies
 * @returns urlpath
 */
     export const GetCurrencies = () => `${EmployeeDetailsBaseAPIURL}Currencies`;

     
/**
* Endpoint to get  GL Accounts.
 * @param {string} query [required]
* @returns {string} urlpath
*/
export const GetAllEmployee = (query) => `${EmployeeDetailsBaseAPIURL}Employees/filter?Filter=${query}`;


   /**
 * Endpoint to get salary grade
 * 
 * @returns urlpath
 */
    export const GetsalaryGrade = () => `${EmployeeDetailsBaseAPIURL}SalaryGrades`;

  
 /**
 * Endpoint to get notches by salaryGradeId
 * @param salaryGradeId [required]
 * @returns urlpath
 */
  export const GetsalaryGradeNotch = (salaryGradeId) => `${EmployeeDetailsBaseAPIURL}SalaryGrades/${salaryGradeId}/notches`;

/**
 * Endpoint to get orgs by type
 * @param type [required]
 * @returns urlpath
 */
 export const GetOrgsByType = (type) => `${EmployeeDetailsBaseAPIURL}Orgs/${type}`;


   /**
 * Endpoint to get banks
 * 
 * @returns urlpath
 */
    export const GetBanks = () => `${EmployeeDetailsBaseAPIURL}Banks`;

 /**
 * Endpoint to get notches by salaryGradeId
 * @param bankId [required]
 * @returns urlpath
 */
  export const GetBankBranchesByBandId = (bankId) => `${EmployeeDetailsBaseAPIURL}Banks/${bankId}/branches`;


      /**
 * Endpoint to get Supervisor Group
 */
    export const GetSupervisorGroup = () => `${EmployeeDetailsBaseAPIURL}Users/SupervisorGroups`;

          /**
 * Endpoint to get GL Accounts
 */
 export const GetGLAccounts = () => `${EmployeeDetailsBaseAPIURL}GLAccounts`;
