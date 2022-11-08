// import { BaseAPIURL } from "./base";

//http://192.168.0.48:5100/Organisation/Sections?companyReference=1&filter=1&page=1&results=1&orderBy=1&sortOrder=1

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
export const SearchSectionByNameOrCode = (companyReference, query, pageNumber, numberOfItems, orderBy, sortOrder) => `Organisation/Sections?companyReference=${companyReference}&Filter=${query}&Page=${pageNumber}&Results=${numberOfItems}&OrderBy=${orderBy}&SortOrder=${sortOrder}`;
// export const SearchSectionByNameOrCode = (companyReference, query, pageNumber, numberOfItems, orderBy, sortOrder) => `${BaseAPIURL}Organisation/Sections?companyReference=${companyReference}&Filter=${query}&Page=${pageNumber}&Results=${numberOfItems}&OrderBy=${orderBy}&SortOrder=${sortOrder}`;


/**
* Endpoint to get details for salary grade if it exist by salary grade ID.
* @param SectionId [required]
* @returns urlpath
//http://192.168.0.48:5100/Organisation/Sections/3fa85f64-5717-4562-b3fc-2c963f66afa6
*/
// export const GetSectionDetailsBySectionId = (SectionId) => `${BaseAPIURL}Organisation/Sections/${SectionId}`;

export const GetSectionDetailsBySectionId = (SectionId) => `Organisation/Sections/${SectionId}`;

/**
* Endpoint to get details for salary grade if it exist by salary grade ID.
* @param orgId [required]
* @returns urlpath
//http://192.168.0.48:5100/Organisation/Sections/3fa85f64-5717-4562-b3fc-2c963f66afa6
*///http://192.168.0.48:5100/Organisation/3fa85f64-5717-4562-b3fc-2c963f66afa6/locations
export const GetLocationDetailsByOrgId = (orgId) => `Organisation/${orgId}/locations`;


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
*///http://192.168.0.48:5100/Organisation/Sections
export const PostSection = () => `Organisation/Sections`;
// export const PostSection = () => `${BaseAPIURL}Organisation/Sections`;
/**
* Endpoint to update a salary grade with salaryGradeId.
* @param SectionId [required]
* @returns urlpath
*///http://192.168.0.48:5100/Organisation/Sections
export const PutSection = () => `Organisation/Sections`;
// export const PutSection = () => `${BaseAPIURL}Organisation/Sections`;

/**
 * Endpoint to search for orgs by name or code.
 * @param companyId [required]
 * @param type [required]
 * @param query [required]
 * @returns urlpath
 */
 export const SearchSectionByNameOrCodeUsingType = (companyId, type, query) => `Organisation/${companyId}/${type}/filter?filter=${query}`;

//http://192.168.0.48:5100/Organisation/Departments/all?companyReference=1241234235
/**
* Endpoint to get details for salary grade if it exist by salary grade ID.
* @param companyReference [required]
* @returns urlpath
//http://192.168.0.48:5100/Organisation/Divisions/3fa85f64-5717-4562-b3fc-2c963f66afa6
*///http://192.168.0.48:5100/Organisation/Locations/all?companyReference=00001_A01

export const GetAllDepartmentsByCompanyReference = (companyReference) => `Organisation/Departments/all?companyReference=${companyReference}`;
