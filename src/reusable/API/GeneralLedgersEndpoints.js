import {GeneralLedgersBaseAPIURL} from './base';


/**
 * Endpoint to search for general ledgers by name or code.
 * @param {string} query [required]
 * @param {string} companyId [required]
 * @returns {string} urlpath
 */
 export const SearchGeneralLedgersByNameOrCode = (companyId, query) => `${GeneralLedgersBaseAPIURL}GeneralLedgers/${companyId}/filter?filter=${query}`;


/**
 * Endpoint to create a new general ledgers.
 * @returns {string} urlpath
 */
 export const PostGeneralLedger = () => `${GeneralLedgersBaseAPIURL}GeneralLedgers`;

 /**
 * Endpoint to update a general ledger by glAccountId.
 * @param {string} glAccountId [required]
 * @returns {string} urlpath
 */
  export const PutGeneralLedger = (glAccountId) => `${GeneralLedgersBaseAPIURL}GeneralLedgers/${glAccountId}`;

