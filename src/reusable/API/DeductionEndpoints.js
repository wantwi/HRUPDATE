import { DeductionBaseAPIURL } from "./base";

/**
* To search for 
* @returns {string} urlpath
*/
export const GetDeductions = () => `${DeductionBaseAPIURL}Deductions`;

/**
* Endpoint to get details for deduction if it exist.
* @param deductionId [required]
* @returns urlpath
*/
export const GetDeductionDetailsByDeductionId = (deductionId) => `${DeductionBaseAPIURL}Deductions/${deductionId}`;


/**
* Endpoint to create a new deduction.
* @returns urlpath
*/
export const PostDeduction = () => `${DeductionBaseAPIURL}Deductions`;

/**
* Endpoint to update a deduction with salaryGradeId.
* @param deductionId [required]
* @returns urlpath
*/
export const PutDeduction = (deductionId) => `${DeductionBaseAPIURL}Deductions/${deductionId}`;
