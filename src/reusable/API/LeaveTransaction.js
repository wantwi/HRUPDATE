
export const PostLeaveTransaction = () => `EmployeeLeave/LeaveType`
export const GetLeaveTransactionById = (id) => `EmployeeLeave/LeaveType/${id}`
export const LeaveTypesDrop = (companyReference) => `EmployeeLeave/LeaveType/all?companyReference=${companyReference}`
export const AvailableDayBasis = (companyReference) => `EmployeeLeave/LeaveType/AvailableDayBasis?companyReference=${companyReference}`
export const AllowedDayBasis = (companyReference) => `EmployeeLeave/LeaveType/AllowedDayBasis?companyReference=${companyReference}`
export const YearEndBasis = (companyReference) => `EmployeeLeave/LeaveType/YearEndBasis?companyReference=${companyReference}`


/**
 * Get Leave Types.
 * @returns {string} urlpath
 */
export const getLeaveTypes = () => `EmployeeLeave/LeaveType/all`;