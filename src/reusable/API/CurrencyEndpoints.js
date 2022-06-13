import { CurrencyBaseAPIURL } from "./base";

/**
 * Endpoint to search for currency by name or code.
 * @param {string} query [required]
 * @returns {string} urlpath
 */
export const SearchCurrenciesByNameOrCode = (query) => `${CurrencyBaseAPIURL}Currencies/internal?filter=${query}`;


/**
* Endpoint to get details for currency if it exist.
* @param {string} currencyId [required]
* @returns {string} urlpath
*/
export const GetCurrencyDetailsByCurrencyId = (currencyId) => `${CurrencyBaseAPIURL}Currencies/${currencyId}`;

/**
* Endpoint to create a new currency for a company.
* @returns {string} urlpath
*/
export const PostCurrency = () => `${CurrencyBaseAPIURL}Currencies`;

/**
* Endpoint to update a company currency by companyCurrencyId.
* @param {string} companyCurrencyId [required]
* @returns {string} urlpath
*/
export const PutCurrency = (companyCurrencyId) => `${CurrencyBaseAPIURL}Currencies/${companyCurrencyId}`;

/**
* Endpoint to search for company currencies by name or code.
* @param {string} companyId [required]
* @param {string} query [required]
* @param {number} pageNumber [optional]
* @param {number} numberOfItems [optional]
* @param {string} orderBy [optional]
* @param {string} sortOrder [optional]
* @returns {string} urlpath
*/
export const SearchCompanyCurrenciesByName = (companyId, query, pageNumber, numberOfItems, orderBy, sortOrder) => `${CurrencyBaseAPIURL}Currencies/company/filter?CompanyId=${companyId}&Filter=${query}&Page=${pageNumber}&Results=${numberOfItems}&OrderBy=${orderBy}&SortOrder=${sortOrder}`;

/**
 * Endpoint to search for currency by name or code.
 * @param {string} query [required]
 * @param {number} pageNumber [optional]
 * @param {number} numberOfItems [optional]
 * @param {string} orderBy [optional]
 * @param {string} sortOrder [optional]
 * @returns {string}  urlpath
 */
export const SearchInternalCurrencies = (query, pageNumber, numberOfItems, orderBy, sortOrder) => `${CurrencyBaseAPIURL}Currencies/internal?Filter=${query}&Page=${pageNumber}&Results=${numberOfItems}&OrderBy=${orderBy}&SortOrder=${sortOrder}`;


/**
 * Endpoint to get the current payperiod for the ex.
 * @param {string} companyId [required]
 * @returns {string} urlpath
 */
 export const GetPayPeriod = (companyId) => `${CurrencyBaseAPIURL}Currencies/pay-period?CompanyId=${companyId}`;

 /**
* Endpoint to create a new exchange rate for a company currency.
* @returns {string} urlpath
*/
export const PostExchangeRate = () => `${CurrencyBaseAPIURL}Currencies/exchange-rate`;

/**
 * Endpoint to search for Exchange Rate by company currency id.
 * @param {string} companyCurrencyId [required]
 * @param {number}pageNumber [optional]
 * @param {number}numberOfItems [optional]
 * @param {string} orderBy [optional]
 * @param {string} sortOrder [optional]
 * @returns {string} urlpath
 */
 export const SearchExchangeRateByCompCurrencyId = (companyCurrencyId, pageNumber, numberOfItems, orderBy, sortOrder) => `${CurrencyBaseAPIURL}Currencies/exchange-rates?CompanyCurrencyId=${companyCurrencyId}&Page=${pageNumber}&Results=${numberOfItems}&OrderBy=${orderBy}&SortOrder=${sortOrder}`;


 /**
 * Endpoint to get currency history 
 * @param {string} companyId [required]
 * @returns {string} urlpath
 */
export const GetCurrencyLogsByCompanyId = (companyId) => `${CurrencyBaseAPIURL}Currencies/company/logs?CompanyId=${companyId}`;

