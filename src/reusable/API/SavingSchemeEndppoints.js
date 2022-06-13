import {SavingSchemeBaseAPIURL } from "./base";

/**
* Endpoint to get Currencies 
* @returns {string} urlpath
*/
export const GetAllCurrencies = () => `${SavingSchemeBaseAPIURL}Currencies`;

/**
* Endpoint to get  GL Accounts.
* @returns {string} urlpath
*/
export const GetGLAccounts = () => `${SavingSchemeBaseAPIURL}GeneralLedgers`;

/**
 * Endpoint to create a new saving scheme.
 * @returns {string} urlpath
 */
 export const PostSavingScheme = () => `${SavingSchemeBaseAPIURL}SavingSchemes`;

 //http://192.168.0.48:5100/SavingSchemes/949e47f9-1d64-4e4f-84b5-8417a235e273
 
 /**
 * Endpoint to update a saving scheme by saving SchemeId.
 * @param {string} {savingSchemeId} [required]
 * @returns {string} urlpath
 */
  export const PutSavingScheme = (savingSchemeId) => `${SavingSchemeBaseAPIURL}SavingSchemes/${savingSchemeId}`;


  /**
* Endpoint to search for saving Scheme by name or code.
* @param query [required]
* @param pageNumber [optional]
* @param numberOfItems [optional]
* @param orderBy [optional]
* @param sortOrder [optional]
* @returns urlpath
*/

//http://192.168.0.48:5100/SavingSchemes/filter?Filter=1&Page=2&Results=2&OrderBy=1&SortOrder=3  
export const SearchSavingSchemeByNameOrCode = (query, pageNumber, numberOfItems, orderBy, sortOrder) => `${SavingSchemeBaseAPIURL}SavingSchemes/filter?Filter=${query}&Page=${pageNumber}&Results=${numberOfItems}&OrderBy=${orderBy}&SortOrder=${sortOrder}`;


/**
 * http://192.168.0.48:5100/SavingSchemes/949e47f9-1d64-4e4f-84b5-8417a235e273
 * 
* Endpoint to get details for saving scheme if it exist by saving scheme ID.
* @param savingSchemeId  [required]
* @returns urlpath
*/
export const GetSavingSchemeDetailsBySavingSchemeId = (savingSchemeId ) => `${SavingSchemeBaseAPIURL}SavingSchemes/${savingSchemeId}`;
