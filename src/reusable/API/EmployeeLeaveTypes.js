import { ExportIcon } from "evergreen-ui";
import { BaseURL } from "./base";

export const GetYearBasis = () =>
  `${BaseURL}EmployeeLeave/YearEndBasis/dropdown-types?companyReference=00001_A01`;

export const GetAllowedDayBasis = () =>
  `EmployeeLeave/AllowedDayBasis/dropdown-types?companyReference=00001_a01`;

export const GetAvailableDayBasis = () =>
  `$EmployeeLeave/AvailableDayBasis/dropdown-types?companyReference=00001_a01`;

export const GetLeaveTypes = () =>
  `EmployeeLeave/LeaveType/dropdown-types?companyReference=00001_a01`;

export const PostEmployeeLeave = () => `${BaseURL}EmployeeLeave/LeaveType`;

export const SearchLeaveTypes = (filter) => `${BaseURL}EmployeeLeave/LeaveType?filter=${filter}`;
