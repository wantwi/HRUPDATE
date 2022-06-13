import { OrgBaseAPIURL } from "./base";

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
