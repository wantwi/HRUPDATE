const { BaseAPIURL } = require("./base");
const companyRef = JSON.parse(
    sessionStorage.getItem("companyReference")
)?.reference;

console.log(companyRef)
/**
* Get Employee Types.
* @returns {string} urlpath
*/
export const GetEmployeeTypes = () => `Organisation/EmployeeTypes/all?companyReference=${companyRef}`;
//export const GetEmployeeTypes = () => `${BaseAPIURL}Organisation/EmployeeTypes/all?companyReference=${companyRef}`;

/**
* Get All Divisions.
* @returns {string} urlpath
*/
export const GetAllDivisions = () => `Organisation/Divisions/all?companyReference=${companyRef}`;
//export const GetAllDivisions = () => `${BaseAPIURL}Organisation/Divisions/all?companyReference=${companyRef}`;

/**
* Get All Departments.
* @returns {string} urlpath
*/
//export const GetAllDepartsments = () => `${BaseAPIURL}Organisation/Departments/all?companyReference=${companyRef}`;
export const GetAllDepartsments = () => `Organisation/Departments/all?companyReference=${companyRef}`;

/**
* Get All Sections.
* @returns {string} urlpath
*/
//export const GetAllSections = () => `${BaseAPIURL}Organisation/Sections/all?companyReference=${companyRef}`;
export const GetAllSections = () => `Organisation/Sections/all?companyReference=${companyRef}`;

/**
* Get All Locations.
* @returns {string} urlpath
*/
export const GetAllLocations = () => `Organisation/Locations/all?companyReference=${companyRef}`;
//export const GetAllLocations = () => `${BaseAPIURL}Organisation/Locations/all?companyReference=${companyRef}`;

/**
* Get All Units.
* @returns {string} urlpath
*/
export const GetAllUnits = () => `Organisation/Units/all?companyReference=${companyRef}`;
//export const GetAllUnits = () => `${BaseAPIURL}Organisation/Units/all?companyReference=${companyRef}`;

/**
* Get All Units.
* @returns {string} urlpath
*/
export const GetAllPositions = () => `${BaseAPIURL}Organisation/Positions/all?companyReference=${companyRef}`;


/**
* Get All Units.
* @returns {string} urlpath
*/
export const GetAllSalaryGrades = () => `SalaryGrades?companyReference=${companyRef}`;
// const GetAllSalaryGrades = () => `${BaseAPIURL}SalaryGrades?companyReference=${companyRef}`;


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