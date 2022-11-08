// import { BaseAPIURL } from "./base";

/**
* Endpoint to search for employee by name or code.
* @param query [required]
* @param pageNumber [optional]
* @param numberOfItems [optional]
* @param orderBy [optional]
* @param sortOrder [optional]
* @returns urlpath
*///http://192.168.0.48:5100/Employees?companyReference=00001_A01&filter=1&page=1&results=1&orderBy=1&sortOrder=1


// export const SearchEmployeeByNameOrCode = (companyReference, query, pageNumber, numberOfItems, orderBy, sortOrder) => `${BaseAPIURL}Employees?companyReference=${companyReference}&Filter=${query}&Page=${pageNumber}&Results=${numberOfItems}&OrderBy=${orderBy}&SortOrder=${sortOrder}`;
export const SearchEmployeeByNameOrCode = (companyReference, query, pageNumber, numberOfItems, orderBy, sortOrder) => `Employees?companyReference=${companyReference}&Filter=${query}&Page=${pageNumber}&Results=${numberOfItems}&OrderBy=${orderBy}&SortOrder=${sortOrder}`;
  
/**
 * Endpoint to get currencies
 * @returns urlpath
 * http://192.168.0.48:5100/Employees/00001_A01/Currencies
 */
   //   export const GetCurrencies = (companyReference) => `${BaseAPIURL}Employees/${companyReference}/Currencies`;     
     export const GetCurrencies = (companyReference) => `Employees/${companyReference}/Currencies`;     

/**
* Endpoint to get  GL Accounts.
 * @param {string} query [required]
* @returns {string} urlpath
*/
// export const GetAllEmployee = (query) => `${BaseAPIURL}Employees/filter?Filter=${query}`;
export const GetAllEmployee = (query) => `Employees/filter?Filter=${query}`;

   /**
 * Endpoint to get salary grade
 * 
 * @returns urlpath
 * http://192.168.0.48:5100/Employees/00001_A01/SalaryGrades
//  */
   //  export const GetsalaryGrade = (companyReference) => `${BaseAPIURL}Employees/${companyReference}/SalaryGrades`;
    export const GetsalaryGrade = (companyReference) => `Employees/${companyReference}/SalaryGrades`;

    //http://192.168.0.48:5100/Employees/GenericTypes/GND 
  
 /**
 * Endpoint to get notches by salaryGradeId
 * @param salaryGradeId [required]
 * @returns urlpath
 *///http://192.168.0.48:5100/Employees/SalaryGrades/b0c99b5b-ee45-4667-24d2-08da59d21af8/notches
  export const GetsalaryGradeNotch = (salaryGradeId) => `Employees/SalaryGrades/${salaryGradeId}/notches`;
//   export const GetsalaryGradeNotch = (salaryGradeId) => `${BaseAPIURL}Employees/SalaryGrades/${salaryGradeId}/notches`;

//http://192.168.0.48:5100/Employees/SalaryGrades/31d607e9-3ebf-457d-b250-08da89ba325d/details
export const GetsalaryGradeDetails= (salaryGradeId) => `Employees/SalaryGrades/${salaryGradeId}/details`;
// export const GetsalaryGradeDetails= (salaryGradeId) => `${BaseAPIURL}Employees/SalaryGrades/${salaryGradeId}/details`;



/**
 * Endpoint to get orgs by type
 * @param type [required]
 * @returns urlpath
 * http://192.168.0.48:5100/Employees/SalaryGrades/3fa85f64-5717-4562-b3fc-2c963f66afa6/notches
 */
//  export const GetOrgSegmentByType = (salaryGradeId ) => `${BaseAPIURL}Employees/SalaryGrades/${salaryGradeId }/notches`;
 export const GetOrgSegmentByType = (salaryGradeId ) => `Employees/SalaryGrades/${salaryGradeId }/notches`;

   /**
 * Endpoint to get banks
 * 
 * @returns urlpath
 * http://192.168.0.48:5100/Employees/00001_A01/Banks

 *///http://192.168.0.48:5100/Banks/GH
    export const GetBanks = (countryCode) => `Banks/${countryCode}`;
   //  export const GetBanks = (countryCode) => `${BaseAPIURL}Banks/${countryCode}`;

 /**
 
 * Endpoint to get notches by salaryGradeId
 * @param bankId [required]
 * @returns urlpath
 * http://192.168.0.48:5100/Employees/Banks/3fa85f64-5717-4562-b3fc-2c963f66afa6/branches
http://192.168.0.48:5100/Banks/33dd1a64-d3cf-4f35-6aa5-08da8750b8d2/branches
 */
  export const GetBankBranchesByBandId = (bankId) => `Banks/${bankId}/branches`;
//   export const GetBankBranchesByBandId = (bankId) => `${BaseAPIURL}Banks/${bankId}/branches`;


      /**
 * Endpoint to get Supervisor Group
 * http://192.168.0.48:5100/Employees/00001_A01/SupervisorGroups
 */
   //  export const GetSupervisorGroup = (companyReference) => `${BaseAPIURL}Employees/${companyReference}/SupervisorGroups`;
    export const GetSupervisorGroup = (companyReference) => `Employees/${companyReference}/SupervisorGroups`;

          /**
 * Endpoint to get GL Accounts
 * http://192.168.0.48:5100/Employees/00001_A01/GLAccounts
 */
 export const GetGLAccounts = (companyReference) => `Employees/${companyReference}/GLAccounts`;
 //http://192.168.0.48:5100/Employees/3fa85f64-5717-4562-b3fc-2c963f66afa6/profile
export const GetEmployeeProfile = (employeeId) => `Employees/${employeeId}/profile`;

// export const GetGLAccounts = (companyReference) => `${BaseAPIURL}Employees/${companyReference}/GLAccounts`;
// //http://192.168.0.48:5100/Employees/3fa85f64-5717-4562-b3fc-2c963f66afa6/profile
// export const GetEmployeeProfile = (employeeId) => `${BaseAPIURL}Employees/${employeeId}/profile`;

 //http://192.168.0.48:5100/Employees/3fa85f64-5717-4562-b3fc-2c963f66afa6/glaccounts
 export const GetEmployeeGeneralLedger = (employeeId ) => `Employees/${employeeId }/GeneralLedgers`;

 //http://192.168.0.48:5100/Employees/3fa85f64-5717-4562-b3fc-2c963f66afa6/organisation
 //http://192.168.0.48:5100/Employees/f7b52c2d-7b49-44cc-768d-08da7fa9f069/organisation

 export const GetEmployeeOrganisation = (employeeId ) => `Employees/${employeeId}/organisation`;
//  export const GetEmployeeOrganisation = (employeeId ) => `${BaseAPIURL}Employees/${employeeId}/organisation`;
//  

 //http://192.168.0.48:5100/Employees/3fa85f64-5717-4562-b3fc-2c963f66afa6/banks
//  export const GetEmployeeBanks = (employeeId ) => `${BaseAPIURL}Employees/${employeeId }/banks`;
 export const GetEmployeeBanks = (employeeId ) => `Employees/${employeeId }/banks`;

 ///http://192.168.0.48:5100/Employees/f7b52c2d-7b49-44cc-768d-08da7fa9f069/accounts
 export const GetEmployeeAccounts = (employeeId ) => `Employees/${employeeId }/accounts`;
//  export const GetEmployeeAccounts = (employeeId ) => `${BaseAPIURL}Employees/${employeeId }/accounts`;

 //http://192.168.0.48:5100/Employees/3fa85f64-5717-4562-b3fc-2c963f66afa6/banks
//  export const GetTitles = (companyReference ) => `${BaseAPIURL}Employees/${companyReference }/Titles`;
 export const GetTitles = (companyReference ) => `Employees/${companyReference }/Titles`;

 //http://192.168.0.48:5100/Employees/Countries
 export const GetCountry = () => `Employees/Countries`;

 export const GetNationality = () => `Employees/Countries`;
//  export const GetCountry = () => `${BaseAPIURL}Employees/Countries`;

 ///http://192.168.0.48:5100/Employees/00001_A01/Organysations/POS
//   export const GetOrganisationsByCompanyReferenceAndType = (companyReference,type ) => `${BaseAPIURL}Employees/${companyReference }/Organysations/${type}`;

  ////http://192.168.0.48:5100/Employees/00001_A01/PayrollHours
  export const GetPayrollHours = (companyReference) => `Employees/${companyReference }/PayrollHours`;
//   export const GetPayrollHours = (companyReference) => `${BaseAPIURL}Employees/${companyReference }/PayrollHours`;
// 

  ///http://192.168.0.48:5100/Employees/081e2876-2033-46aa-0cee-08da5a9e1ad7/profile
  export const GetEmployeeDetailsByEmployeeID = (employeeId) => `Employees/${employeeId}/profile`;
  ///http://192.168.0.48:5100/Employees/cea7ce7d-52c1-4b24-9ba6-08da81d7b917/salaryInfo
  export const GetEmployeeSalaryInfoByEmployeeID = (employeeId) => `Employees/${employeeId}/salaryInfo`;

//   export const GetEmployeeDetailsByEmployeeID = (employeeId) => `${BaseAPIURL}Employees/${employeeId}/profile`;
//   ///http://192.168.0.48:5100/Employees/cea7ce7d-52c1-4b24-9ba6-08da81d7b917/salaryInfo
//   export const GetEmployeeSalaryInfoByEmployeeID = (employeeId) => `${BaseAPIURL}Employees/${employeeId}/salaryInfo`;


 // http://192.168.0.48:5100/Employees
 export const PostEmployee = () => `Employees`;
 //http://192.168.0.48:5100/Employees/
 export const PutEmployee = () => `Employees`;

  // http://192.168.0.48:5100/Employees
//   export const PostEmployee = () => `${BaseAPIURL}Employees`;
//   //http://192.168.0.48:5100/Employees/
//   export const PutEmployee = () => `${BaseAPIURL}Employees`;

/// http://192.168.0.48:5100/Employees/GenericTypes/GND

export const GetAllGender = (type) => `Employees/GenericTypes/${type}`;
export const GetAllMarital = (type) => `Employees/GenericTypes/${type}`;

// export const GetAllGender = (type) => `${BaseAPIURL}Employees/GenericTypes/${type}`;
// export const GetAllMarital = (type) => `${BaseAPIURL}Employees/GenericTypes/${type}`;

///http://192.168.0.48:5100/Employees/00001_A01/EmployeeStatus
// export const GetEmployeeStatus = (companyReference ) => `${BaseAPIURL}Employees/${companyReference }/EmployeeStatus`;
export const GetEmployeeStatus = (companyReference ) => `Employees/${companyReference }/EmployeeStatus`;


//http://192.168.0.48:5100/Banks/MobileNetworks
// export const GetAllNetworks = ( ) => `${BaseAPIURL}Banks/MobileNetworks`;
export const GetAllNetworks = ( ) => `Banks/MobileNetworks`;

//htp://192.168.0.48:5100/Organisation/EmployeeTypes/all?companyReference=00001_A01
// export const GetAllEmployeeTypesByCompanyRefernece = (companyReference ) => `${BaseAPIURL}Organisation/EmployeeTypes/all?companyReference=${companyReference }`;
export const GetAllEmployeeTypesByCompanyRefernece = (companyReference ) => `Organisation/EmployeeTypes/all?companyReference=${companyReference }`;

//http://192.168.0.48:5100/Organisation/Positions/all?companyReference=00001_A01
// export const GetAllPositionsByCompanyReference = (companyReference ) => `${BaseAPIURL}Organisation/Positions/all?companyReference=${companyReference }`;
export const GetAllPositionsByCompanyReference = (companyReference ) => `Organisation/Positions/all?companyReference=${companyReference }`;


///http://192.168.0.48:5100/Organisation/Units/all?companyReference=00001_A01
// export const GetAllUnitsByCompanyReference = (companyReference ) => `${BaseAPIURL}Organisation/Units/all?companyReference=${companyReference }`;
export const GetAllUnitsByCompanyReference = (companyReference ) => `Organisation/Units/all?companyReference=${companyReference }`;
