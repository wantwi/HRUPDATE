import { DatausaAPI, OrgBaseAPIURL } from "./base";

export const GetPopulation = () => `${DatausaAPI}?drilldowns=Nation&measures=Population`;

/**
 * Endpoint to create/update orgs.
 * PS: You will have to add {[id]: [orgId]} to the data model when updating 
 * @returns urlpath
 */
export const PostOrganization = () => `${OrgBaseAPIURL}Organisation`;

/**
 * Endpoint to create/update orgs.
 * PS: You will have to add {[id]: [orgId]} to the url when updating 
 * @param orgId [required]
 * @returns urlpath
 */
export const PutOrganization = (orgId) => `${OrgBaseAPIURL}Organisation/${orgId}`;

/**
 * Endpoint to get orgs by the type.
 * @param type [required]
 * @param companyId [required]
 * @returns urlpath
 */
export const GetAllOrganizationByTypeAndCompany = (type, companyId) => `${OrgBaseAPIURL}Organisation/${companyId}/${type}`;

/**
 * Endpoint to get all salary grades added in it's setup.
 * @param companyId [required]
 * @returns urlpath
 */
export const GetAllSalaryGrades = companyId => `${OrgBaseAPIURL}SalaryGrades/${companyId}`

/**
 * Endpoint to get all general ledgers added in it's setup.
 * @param companyId [required]
 * @returns urlpath
 */
 export const GetAllGeneralLedgersByCompanyId = companyId => `${OrgBaseAPIURL}GeneralLegers/${companyId}`

/**
 * Endpoint to search for orgs by name or code.
 * @param companyId [required]
 * @param type [required]
 * @param query [required]
 * @returns urlpath
 */
export const SearchOrganizationByNameOrCodeUsingType = (companyId, type, query) => `${OrgBaseAPIURL}Organisation/${companyId}/${type}/filter?filter=${query}`;

/**
 * Endpoint to get orgs.
 * @param companyId [required]
 * @param type [required]
 * @param code [required]
 * @returns urlpath
 */
export const GetOrganizationByFullCodeUsingType = (companyId, type, code) => `${OrgBaseAPIURL}Organisation/${companyId}/${type}/${code}`;



/* ------------------------------------------  ENDPOINTS TO LOAD ORG DATA BY ORGID  ------------------------------------------ */

/**
* Endpoint to get Org details by orgId.
* @param orgId [required]
* @returns urlpath
*/
export const GetOrgDetailsByOrgId = (orgId) => `${OrgBaseAPIURL}Organisation/${orgId}`;

/**
 * Endpoint to get all locations added to orgs during creation or updates..
 * @param orgId [required]
 * @returns urlpath
 */
export const GetLocationsByOrgId = (orgId) => `${OrgBaseAPIURL}Organisation/${orgId}/locations`;

/**
* Endpoint to get GL Accounts by orgId.
* @param orgId [required]
* @returns urlpath
*/
export const GetGLAccountsByOrgId = (orgId) => `${OrgBaseAPIURL}Organisation/${orgId}/GLAccounts`;

/**
 * Endpoint to get all Earnings added to orgs during creation or updates..
 * @param orgId [required]
 * @returns urlpath
 */
export const GetEarningsByOrgId = (orgId) => `${OrgBaseAPIURL}Organisation/${orgId}/earnings`;

/**
* Endpoint to get all Deductions added to orgs during creation or updates..
* @param orgId [required]
* @returns urlpath
*/
export const GetDeductionsByOrgId = (orgId) => `${OrgBaseAPIURL}Organisation/${orgId}/deductions`;



/* ------------------------------------------  ENDPOINTS TO LOAD ORG HISTORY DATA BY ORGID  ------------------------------------------ */

/**
 * Endpoint to get all Org Details history by orgId.
 * @param orgId [required]
 * @returns urlpath
 */
export const GetOrgDetailsHistoryByOrgId = (orgId) => `${OrgBaseAPIURL}Logs/${orgId}/org-details`;

/**
 * Endpoint to get all Org GL Accounts history by orgId.
 * @param orgId [required]
 * @returns urlpath
 */
export const GetOrgGLAccountsHistoryByOrgId = (orgId) => `${OrgBaseAPIURL}Logs/${orgId}/orgGLAccounts`;

/**
 * Endpoint to get all Org earnings history by orgId.
 * @param orgId [required]
 * @returns urlpath
 */
export const GetOrgEarningsHistoryByOrgId = (orgId) => `${OrgBaseAPIURL}Logs/${orgId}/earnings`;

/**
* Endpoint to get all Org deductions history by orgId.
* @param orgId [required]
* @returns urlpath
*/
export const GetOrgDeductionsHistoryByOrgId = (orgId) => `${OrgBaseAPIURL}Logs/${orgId}/deductions`;


/* ------------------------------------------  ENDPOINTS TO LOAD ORG EARNINGS & DEDUCTIONS & BENEFITS DATA BY ORGID  ------------------------------------------ */

/**
* Endpoint to get all deductions by companyId.
* @param companyId [required]
* @returns urlpath
*/
export const GetAllDeductionsByCompanyId = (companyId) => `${OrgBaseAPIURL}Deductions/${companyId}`;

/**
* Endpoint to get all earnings by companyId.
* @param companyId [required]
* @returns urlpath
*/
export const GetAllEarningsByCompanyId = (companyId) => `${OrgBaseAPIURL}Earnings/${companyId}`;

/**
* Endpoint to get all earnings by companyId.
* @param companyId [required]
* @returns urlpath
*/
export const GetAllBenefitsByCompanyId = (companyId) => `${OrgBaseAPIURL}Benefits/${companyId}`;

/* ------------------------------------------  ENDPOINTS TO LOAD CURRENCY DATA BY ORGID  ------------------------------------------ */

/**
* Endpoint to get all currencies by companyId.
* @param companyId [required]
* @returns urlpath
*/
export const GetAllCurrenciesByCompanyId = (companyId) => `${OrgBaseAPIURL}Currencies/${companyId}`;