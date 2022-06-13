import { LoanBaseAPIURL } from "./base";

/**
* Endpoint to get Currencies 
* @returns {string} urlpath
*/
export const GetAllCurrencies = () => `${LoanBaseAPIURL}Currencies`;


/**
* Endpoint to get  GL Accounts.
* @returns {string} urlpath
*/
export const GetGLAccounts = () => `${LoanBaseAPIURL}GLAccounts`;

/**
* Endpoint to get  GL Accounts.
 * @param {string} query [required]
* @returns {string} urlpath
*/
export const GetAllLoans = (query) => `${LoanBaseAPIURL}Loans/filter?Filter=${query}`;

/**
* Endpoint to get details for currency if it exist.
* @param loanId [required]
* @returns urlpath
*/
export const GetLoanDetailsByLoanId = (loanId) => `${LoanBaseAPIURL}Loans/${loanId}`;


/**
* Endpoint to create a new loan.
* @returns {string} urlpath
*/
export const PostLoan = () => `${LoanBaseAPIURL}Loans`



/**
* Endpoint to update a company currency by companyCurrencyId.
* @param {string} loanId [required]
* @returns {string} urlpath
*/
export const PutLoans = (loanId) => `${LoanBaseAPIURL}Loans/${loanId}`;


/**
* Endpoint to search for Loans by name or code.
* @param {string} query [required]
* @param {number} pageNumber [optional]
* @param {number} numberOfItems [optional]
* @param {string} orderBy [optional]
* @param {string} sortOrder [optional]
* @returns {string} urlpath
*/
export const SearchLoanByNameOrCode = (query, pageNumber, numberOfItems, orderBy, sortOrder) => `${LoanBaseAPIURL}Loans?Filter=${query}&Page=${pageNumber}&Results=${numberOfItems}&OrderBy=${orderBy}&SortOrder=${sortOrder}`;
