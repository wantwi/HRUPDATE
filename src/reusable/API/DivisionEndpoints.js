// import { BaseAPIURL } from "./base";

//http://192.168.0.48:5100/Organisation/Divisions?companyReference=1&filter=1&page=1&results=1&orderBy=1&sortOrder=1

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
export const SearchDivisionByNameOrCode = (companyReference, query, pageNumber, numberOfItems, orderBy, sortOrder) => `Organisation/Divisions?companyReference=${companyReference}&Filter=${query}&Page=${pageNumber}&Results=${numberOfItems}&OrderBy=${orderBy}&SortOrder=${sortOrder}`;




/**
* Endpoint to get details for salary grade if it exist by salary grade ID.
* @param DivisionId [required]
* @returns urlpath
//http://192.168.0.48:5100/Organisation/Divisions/3fa85f64-5717-4562-b3fc-2c963f66afa6
*/
export const GetDivisionDetailsByDivisionId = (DivisionId) => `Organisation/Divisions/${DivisionId}`;
// export const GetDivisionDetailsByDivisionId = (DivisionId) => `${BaseAPIURL}Organisation/Divisions/${DivisionId}`;
/**
* Endpoint to get details for salary grade if it exist by salary grade ID.
* @param companyReference [required]
* @returns urlpath
//http://192.168.0.48:5100/Organisation/Divisions/3fa85f64-5717-4562-b3fc-2c963f66afa6
*///http://192.168.0.48:5100/Organisation/Locations/all?companyReference=00001_A01

// export const GetAllLocationsByCompanyReference = (companyReference) => `${BaseAPIURL}Organisation/Locations/all?companyReference=${companyReference}`;
export const GetAllLocationsByCompanyReference = (companyReference) => `Organisation/Locations/all?companyReference=${companyReference}`;

//http://192.168.0.48:5100/Organisation/GLAccounts/F9475BB6-D10F-4161-9268-B6DD827A3CDF 
/**
 * Endpoint to get all general ledgers added in it's setup.
 * @param companyReference [required]
 * @returns urlpath
 */
//  export const GetAllGeneralLedgersBycompanyReference = (companyReference) => `${BaseAPIURL}Organisation/GLAccounts/${companyReference}`
export const GetAllGeneralLedgersBycompanyReference = (companyReference) => `Organisation/GLAccounts/${companyReference}`

/**
* Endpoint to create a new Salary Grade.
* @returns urlpath
*///http://192.168.0.48:5100/Organisation/Divisions
export const PostDivision = () => `Organisation/Divisions`;
// export const PostDivision = () => `${BaseAPIURL}Organisation/Divisions`;
/**
* Endpoint to update a salary grade with salaryGradeId.
* @param DivisionId [required]
* @returns urlpath
*///http://192.168.0.48:5100/Organisation/Divisions
export const PutDivision = () => `Organisation/Divisions`;
// export const PutDivision = () => `${BaseAPIURL}Organisation/Divisions`;

/**
 * Endpoint to search for orgs by name or code.
 * @param companyId [required]
 * @param type [required]
 * @param query [required]
 * @returns urlpath
 */
 export const SearchDivisionByNameOrCodeUsingType = (companyId, type, query) => `Organisation/${companyId}/${type}/filter?filter=${query}`;

