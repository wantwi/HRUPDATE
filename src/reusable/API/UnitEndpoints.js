// import { BaseAPIURL } from "./base";

//http://192.168.0.48:5100/Organisation/Units?companyReference=1&filter=1&page=1&results=1&orderBy=1&sortOrder=1

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
export const SearchUnitByNameOrCode = (companyReference, query, pageNumber, numberOfItems, orderBy, sortOrder) => `Organisation/Units?companyReference=${companyReference}&Filter=${query}&Page=${pageNumber}&Results=${numberOfItems}&OrderBy=${orderBy}&SortOrder=${sortOrder}`;
// export const SearchUnitByNameOrCode = (companyReference, query, pageNumber, numberOfItems, orderBy, sortOrder) => `${BaseAPIURL}Organisation/Units?companyReference=${companyReference}&Filter=${query}&Page=${pageNumber}&Results=${numberOfItems}&OrderBy=${orderBy}&SortOrder=${sortOrder}`;




/**
* Endpoint to get details for salary grade if it exist by salary grade ID.
* @param UnitId [required]
* @returns urlpath
//http://192.168.0.48:5100/Organisation/Units/3fa85f64-5717-4562-b3fc-2c963f66afa6
*/
export const GetUnitDetailsByUnitId = (unitId) => `Organisation/Units/${unitId}`;
// export const GetUnitDetailsByUnitId = (unitId) => `${BaseAPIURL}Organisation/Units/${unitId}`;

/**
* Endpoint to get details for salary grade if it exist by salary grade ID.
* @param companyReference [required]
* @returns urlpath
//http://192.168.0.48:5100/Organisation/Divisions/3fa85f64-5717-4562-b3fc-2c963f66afa6
*///http://192.168.0.48:5100/Organisation/Locations/all?companyReference=00001_A01

export const GetAllSectionsByCompanyReference = (companyReference) => `Organisation/Sections/all?companyReference=${companyReference}`;
// export const GetAllSectionsByCompanyReference = (companyReference) => `${BaseAPIURL}Organisation/Sections/all?companyReference=${companyReference}`;



//http://192.168.0.48:5100/Organisation/GLAccounts/F9475BB6-D10F-4161-9268-B6DD827A3CDF 
/**
 * Endpoint to get all general ledgers added in it's setup.
 * @param companyReference [required]
 * @returns urlpath
 */
//  export const GetAllGeneralLedgersBycompanyReference = (companyReference) => `${BaseAPIURL}Organisation/GLAccounts/${companyReference}`
 export const GetAllGeneralLedgersBycompanyReference = (companyReference) => `Organisation/GLAccounts/${companyReference}`

/**
* Endpoint to get details for salary grade if it exist by salary grade ID.
* @param unitId [required]
* @returns urlpath
//http://192.168.0.48:5100/Organisation/Sections/3fa85f64-5717-4562-b3fc-2c963f66afa6
//http://192.168.0.48:5100/Organisation/Units/b0472bb7-dd60-4c20-98f9-f46c0b59de7b
*/
export const GetSectionDetailsBySectionId = (unitId) => `Organisation/Units/${unitId}`;



/**
* Endpoint to create a new Salary Grade.
* @returns urlpath
*///http://192.168.0.48:5100/Organisation/Units
export const PostUnit = () => `Organisation/Units`;
// export const PostUnit = () => `${BaseAPIURL}Organisation/Units`;

/**
* Endpoint to update a salary grade with salaryGradeId.
* @param UnitId [required]
* @returns urlpath
*///http://192.168.0.48:5100/Organisation/Units
export const PutUnit = () => `Organisation/Units`;
// export const PutUnit = () => `${BaseAPIURL}Organisation/Units`;

/**
 * Endpoint to search for orgs by name or code.
 * @param companyId [required]
 * @param type [required]
 * @param query [required]
 * @returns urlpath
 */
 export const SearchUnitByNameOrCodeUsingType = (companyId, type, query) => `Organisation/${companyId}/${type}/filter?filter=${query}`;

