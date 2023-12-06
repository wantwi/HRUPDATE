import { BaseAPIURL } from "./base";

//http://192.168.0.48:5100/Organisation/Positions?companyReference=1&filter=1&page=1&results=1&orderBy=1&sortOrder=1

/**
* Endpoint to search for company Salary Grade by name or code.
* @param companyReference [required]
* @param query [required]
* @param pageNumber [optional]
* @param numberOfItems [optional]
* @param orderBy [optional]
* @param sortOrder [optional]
* @returns urlpath
*/
// export const SearchPositionByNameOrCode = (companyReference, query, pageNumber, numberOfItems, orderBy, sortOrder) => `${BaseAPIURL}Position?companyReference=${companyReference}&Filter=${query==="*"? "" : query}&Page=${pageNumber}&Results=${numberOfItems}&OrderBy=${orderBy}&SortOrder=${sortOrder}`;
export const SearchPositionByNameOrCode = (companyReference, query, pageNumber, numberOfItems, orderBy, sortOrder) => `Position?companyReference=${companyReference}&Filter=${query==="*"? "" : query}&Page=${pageNumber}&Results=${numberOfItems}&OrderBy=${orderBy}&SortOrder=${sortOrder}`;

/**
* Endpoint to get details for salary grade if it exist by salary grade ID.
* @param PositionId [required]
* @returns urlpath
//http://192.168.0.48:5100/Organisation/Positions/00000000-0000-0000-0000-000000000000
*/
// export const GetPositionDetailsByPositionId = (PositionId) => `${BaseAPIURL}Organisation/Positions/${PositionId}`;
export const GetPositionDetailsByPositionId = (PositionId) => `Organisation/Positions/${PositionId}`;
// export const GetPositionDetailsByPositionId = (PositionId) => `${BaseAPIURL}Organisation/Positions/${PositionId}`;


/**
* Endpoint to get details for salary grade if it exist by salary grade ID.
* @param orgId [required]
* @returns urlpath
//http://192.168.0.48:5100/Organisation/Positions/3fa85f64-5717-4562-b3fc-2c963f66afa6
*///http://192.168.0.48:5100/Organisation/3fa85f64-5717-4562-b3fc-2c963f66afa6/locations
// export const GetLocationDetailsByOrgId = (orgId) => `${BaseAPIURL}Organisation/${orgId}/locations`;
export const GetLocationDetailsByOrgId = (orgId) => `Organisation/${orgId}/locations`;

// export const GetLocationDetailsByOrgId = (orgId) => `${BaseAPIURL}Organisation/${orgId}/locations`;


//http://192.168.0.48:5100/Organisation/GLAccounts/F9475BB6-D10F-4161-9268-B6DD827A3CDF 
/**
 * Endpoint to get all general ledgers added in it's setup.
 * @param companyReference [required]
 * @returns urlpath
 */
 export const GetAllGeneralLedgersBycompanyReference = (companyReference) => `Organisation/GLAccounts/${companyReference}`
//  export const GetAllGeneralLedgersBycompanyReference = (companyReference) => `${BaseAPIURL}Organisation/GLAccounts/${companyReference}`

/**
* Endpoint to create a new Salary Grade.
* @returns urlpath
*///http://192.168.0.48:5100/Organisation/Positions
// export const PostPosition = () => `${BaseAPIURL}Organisation/Positions`;
export const PostPosition = () => `Organisation/Positions`;


/**
* Endpoint to update a salary grade with salaryGradeId.
* @param PositionId [required]
* @returns urlpath
*///http://192.168.0.48:5100/Organisation/Positions
// export const PutPosition = () => `${BaseAPIURL}Organisation/Positions`;
export const PutPosition = () => `Organisation/Positions`;



/**
 * Endpoint to search for orgs by name or code.
 * @param companyId [required]
 * @param type [required]
 * @param query [required]
 * @returns urlpath
 *///http://192.168.0.48:5100/Organisation/Positions?companyReference=00001_A01&filter=pos&page=1&results=5&orderBy=1&sortOrder=1
 export const SearchPositionByNameOrCodeUsingType = (companyReference, query, pageNumber, numberOfItems, orderBy, sortOrder) => `Organisation/Positions?companyReference=${companyReference}&Filter=${query==="*"? "" : query}&Page=${pageNumber}&Results=${numberOfItems}&OrderBy=${orderBy}&SortOrder=${sortOrder}`;
//  export const SearchPositionByNameOrCodeUsingType = (companyReference, query, pageNumber, numberOfItems, orderBy, sortOrder) => `${BaseAPIURL}Organisation/Positions?companyReference=${companyReference}&Filter=${query==="*"? "" : query}&Page=${pageNumber}&Results=${numberOfItems}&OrderBy=${orderBy}&SortOrder=${sortOrder}`;

 /**
* Endpoint to get details for salary grade if it exist by salary grade ID.
* @param companyReference [required]
* @returns urlpath
//http://192.168.0.48:5100/Organisation/Divisions/3fa85f64-5717-4562-b3fc-2c963f66afa6
*///http://192.168.0.48:5100/Organisation/Locations/all?companyReference=00001_A01

// export const GetAllLocationsByCompanyReference = (companyReference) => `${BaseAPIURL}Organisation/Locations/all?companyReference=${companyReference}`;

export const GetAllLocationsByCompanyReference = (companyReference) => `Organisation/Locations/all?companyReference=${companyReference}`;


//http://192.168.0.48:5100/Organisation/Currencies/00001_A01

 /**
* Endpoint to get details for salary grade if it exist by salary grade ID.
* @param companyReference [required]
* @returns urlpath
//http://192.168.0.48:5100/Organisation/Divisions/3fa85f64-5717-4562-b3fc-2c963f66afa6
*///http://192.168.0.48:5100/Organisation/Currencies/00001_A01


// export const GetCurrencyByCompanyReference = (companyReference) => `${BaseAPIURL}Organisation/Currencies/${companyReference}`;
export const GetCurrencyByCompanyReference = (companyReference) => `Organisation/Currencies/${companyReference}`;

//http://192.168.0.48:5100/Organisation/Earnings/00001_A01

 /**
* Endpoint to get details for salary grade if it exist by salary grade ID.
* @param companyReference [required]
* @returns urlpath
//http://192.168.0.48:5100/Organisation/Divisions/3fa85f64-5717-4562-b3fc-2c963f66afa6
*///http://192.168.0.48:5100/Organisation/Locations/all?companyReference=00001_A01

// export const GetAllEarningsByCompanyReference = (companyReference) => `${BaseAPIURL}Organisation/Earnings/${companyReference}`;
export const GetAllEarningsByCompanyReference = (companyReference) => `Organisation/Earnings/${companyReference}`;

// http://192.168.0.48:5100/Organisation/SalaryGrades/00001_A01
// export const GetAllSalaryGradeByCompanyReference = (companyReference) => `${BaseAPIURL}Organisation/SalaryGrades/${companyReference}`;
export const GetAllSalaryGradeByCompanyReference = (companyReference) => `Organisation/SalaryGrades/${companyReference}`;