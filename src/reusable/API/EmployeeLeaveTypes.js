import { ExportIcon } from "evergreen-ui";
import { BaseURL } from "./base";

export const GetYearBasis = () =>
  `${BaseURL}EmployeeLeave/YearEndBasis/dropdown-types?companyReference=00001_A01`;

export const GetAllowedDayBasis = () =>
  `${BaseURL}EmployeeLeave/AllowedDayBasis/dropdown-types?companyReference=00001_a01`;

export const GetAvailableDayBasis = () =>
  `${BaseURL}EmployeeLeave/AvailableDayBasis/dropdown-types?companyReference=00001_a01`;

export const GetLeaveTypes = () =>
  `${BaseURL}EmployeeLeave/LeaveType/dropdown-types?companyReference=00001_a01`;

export const PostEmployeeLeave = () => `${BaseURL}EmployeeLeave/LeaveType`;

export const SearchLeaveTypes = (filter) => `${BaseURL}EmployeeLeave/LeaveType?filter=${filter}`;
