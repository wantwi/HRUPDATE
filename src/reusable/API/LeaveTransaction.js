
export const PostLeaveTransaction=()=>`EmployeeLeave/LeaveType`
export const GetLeaveTransactionById=(id)=>`EmployeeLeave/LeaveType/${id}`
export const LeaveTypes=(companyReference)=>`EmployeeLeave/LeaveType/dropdown-types?companyReference=${companyReference}`
export const AvailableDayBasis=(companyReference)=>`EmployeeLeave/AvailableDayBasis/dropdown-types?companyReference=${companyReference}`
export const AllowedDayBasis=(companyReference)=>`EmployeeLeave/AllowedDayBasis/dropdown-types?companyReference=${companyReference}`
export const YearEndBasis=(companyReference)=>`EmployeeLeave/YearEndBasis/dropdown-types?companyReference=${companyReference}`
