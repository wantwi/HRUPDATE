

//http://192.168.0.48:5100/Organisation/Departments?companyReference=1&filter=1&page=1&results=1&orderBy=1&sortOrder=1

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
// export const SearchDepartmentByNameOrCode = (companyReference, query, pageNumber, numberOfItems, orderBy, sortOrder) => `${BaseAPIURL}Organisation/Departments?companyReference=${companyReference}&Filter=${query}&Page=${pageNumber}&Results=${numberOfItems}&OrderBy=${orderBy}&SortOrder=${sortOrder}`;

export const SearchDepartmentByNameOrCode = (companyReference, query, pageNumber, numberOfItems, orderBy, sortOrder) => `Organisation/Departments?companyReference=${companyReference}&Filter=${query}&Page=${pageNumber}&Results=${numberOfItems}&OrderBy=${orderBy}&SortOrder=${sortOrder}`;


/**
* Endpoint to get details for salary grade if it exist by salary grade ID.
* @param DepartmentId [required]
* @returns urlpath
//http://192.168.0.48:5100/Organisation/Departments/3fa85f64-5717-4562-b3fc-2c963f66afa6
*/
export const GetDepartmentDetailsByDepartmentId = (DepartmentId) => `Organisation/Departments/${DepartmentId}`;

/**
* Endpoint to get details for salary grade if it exist by salary grade ID.
* @param companyReference [required]
* @returns urlpath
//http://192.168.0.48:5100/Organisation/Departments/3fa85f64-5717-4562-b3fc-2c963f66afa6
*///http://192.168.0.48:5100/Organisation/3fa85f64-5717-4562-b3fc-2c963f66afa6/locations
//http://192.168.0.48:5100/Organisation/Divisions/all?companyReference=00001_A01

// export const GetAllDivisonsByCompanyReference= (companyReference) => `${BaseAPIURL}Organisation/Divisions/all?companyReference=${companyReference}`;
export const GetAllDivisonsByCompanyReference= (companyReference) => `Organisation/Divisions/all?companyReference=${companyReference}`;

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
*///http://192.168.0.48:5100/Organisation/Departments
// export const PostDepartment = () => `${BaseAPIURL}Organisation/Departments`;
export const PostDepartment =  `Organisation/Departments`;
/**

* @returns urlpath
*///http://192.168.0.48:5100/Organisation/Departments
export const PutDepartment = () => `Organisation/Departments`;

/**
 * Endpoint to search for orgs by name or code.
 * @param companyId [required]
 * @param type [required]
 * @param query [required]
 * @returns urlpath
 */
 //export const SearchDepartmentByNameOrCodeUsingType = (companyId, type, query) => `${BaseAPIURL}Organisation/${companyId}/${type}/filter?filter=${query}`;

/**
* Endpoint to search for company Salary Grade by name or code.
* @param companyReference [required]
* @param query [required]
* @param pageNumber [optional]
* @param numberOfItems [optional]
* @param orderBy [optional]
* @param sortOrder [optional]
* @returns urlpath
*///http://192.168.0.48:5100/Organisation/Locations?companyReference=00001_A01&filter=1&page=1&results=1&orderBy=1&sortOrder=1
//http://192.168.0.48:5100/Organisation/Departments?companyReference=00001_A01&filter=dep

//export const SearchDepartmentByNameOrCode = (companyReference, query, pageNumber, numberOfItems, orderBy, sortOrder) => `${BaseAPIURL}Organisation/Departments?companyReference=00001_A01&Filter=${query}`;
//export const SearchLocationByNameOrCode = (companyReference, query, pageNumber, numberOfItems, orderBy, sortOrder) => `${LocationBaseAPIURL}Organisation/Departments?companyReference=00001_A01&Filter=${query}&Page=${pageNumber}&Results=${numberOfItems}&OrderBy=${orderBy}&SortOrder=${sortOrder}`;