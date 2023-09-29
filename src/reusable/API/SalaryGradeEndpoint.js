import { SalaryGradeBaseAPIURL } from "./base";


/**
* Endpoint to get details for salary grade if it exist by salary grade ID.
* @param salaryGradeId [required]
* @returns urlpath
*/
export const GetSalaryGradeDetailsBySalaryGradeId = (salaryGradeId) => `${SalaryGradeBaseAPIURL}SalaryGrades/${salaryGradeId}`;


/**
* Endpoint to get all currencies for a company
* @param companyId [required]
* @returns urlpath
*/
export const GetAllCurrencies = (companyId) => `${SalaryGradeBaseAPIURL}Currencies?CompanyId=${companyId}`;

/**
* Endpoint to get all employee types for a company
* @param companyId [required]
* @returns urlpath
*/
export const GetAllEmployeeTypes = (companyId) => `${SalaryGradeBaseAPIURL}EmployeeTypes?CompanyId=${companyId}`;

/**
* Endpoint to get all employee types for a company
* @returns urlpath
*/
export const GetNotchSize = (companyId) => `SalaryGrades/${companyId}/notchSize`;

/**
* Endpoint to search for company Salary Grade by name or code.
* @param companyId [required]
* @param query [required]
* @param pageNumber [optional]
* @param numberOfItems [optional]
* @param orderBy [optional]
* @param sortOrder [optional]
* @returns urlpath
*/
export const SearchSalaryGradesByNameOrCode = (companyId, query, pageNumber, numberOfItems, orderBy, sortOrder) => `${SalaryGradeBaseAPIURL}SalaryGrades/filter?CompanyId=${companyId}&Filter=${query}&Page=${pageNumber}&Results=${numberOfItems}&OrderBy=${orderBy}&SortOrder=${sortOrder}`;


/**
* Endpoint to create a new Salary Grade.
* @returns urlpath
*/
export const PostSalaryGrade = () => `${SalaryGradeBaseAPIURL}SalaryGrades`;

/**
* Endpoint to update a salary grade with salaryGradeId.
* @param salaryGradeId [required]
* @returns urlpath
*/
export const PutSalaryGrade = (salaryGradeId) => `${SalaryGradeBaseAPIURL}SalaryGrades/${salaryGradeId}`;
