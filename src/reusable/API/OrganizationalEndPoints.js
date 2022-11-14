const { BaseAPIURL } = require("./base");

/**
* Get Employee Types.
* @returns {string} urlpath
*/
export const GetEmployeeTypes = () => `Organisation/EmployeeTypes/all?companyReference=00001_A01`;
//export const GetEmployeeTypes = () => `${BaseAPIURL}Organisation/EmployeeTypes/all?companyReference=00001_A01`;

/**
* Get All Divisions.
* @returns {string} urlpath
*/
export const GetAllDivisions = () => `Organisation/Divisions/all?companyReference=00001_A01`;
//export const GetAllDivisions = () => `${BaseAPIURL}Organisation/Divisions/all?companyReference=00001_A01`;

/**
* Get All Departments.
* @returns {string} urlpath
*/
//export const GetAllDepartsments = () => `${BaseAPIURL}Organisation/Departments/all?companyReference=00001_A01`;
export const GetAllDepartsments = () => `Organisation/Departments/all?companyReference=00001_A01`;

/**
* Get All Sections.
* @returns {string} urlpath
*/
//export const GetAllSections = () => `${BaseAPIURL}Organisation/Sections/all?companyReference=00001_A01`;
export const GetAllSections = () => `Organisation/Sections/all?companyReference=00001_A01`;

/**
* Get All Locations.
* @returns {string} urlpath
*/
export const GetAllLocations = () => `Organisation/Locations/all?companyReference=00001_A01`;
//export const GetAllLocations = () => `${BaseAPIURL}Organisation/Locations/all?companyReference=00001_A01`;

/**
* Get All Units.
* @returns {string} urlpath
*/
export const GetAllUnits = () => `Organisation/Units/all?companyReference=00001_A01`;
//export const GetAllUnits = () => `${BaseAPIURL}Organisation/Units/all?companyReference=00001_A01`;

/**
* Get All Units.
* @returns {string} urlpath
*/
export const GetAllPositions = () => `${BaseAPIURL}Organisation/Positions/all?companyReference=00001_A01`;


/**
* Get All Units.
* @returns {string} urlpath
*/
export const GetAllSalaryGrades = () => `SalaryGrades?companyReference=00001_a01`;
// const GetAllSalaryGrades = () => `${BaseAPIURL}SalaryGrades?companyReference=00001_a01`;


/**
* Get All Units.
* @returns {string} urlpath
*/
export const GetAllSegments = () => `Pays/GenericTypes/ORG`;

/**
* Post Recurring Earning.
* @returns {string} urlpath
*/
export const CreateGLMassUpdate = () => `Employees/GeneralLedgers`;