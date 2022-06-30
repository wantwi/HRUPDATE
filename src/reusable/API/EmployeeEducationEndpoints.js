import { BaseURL } from "./base";

/**
 * GET Professional Titles
 * @param Company Reference [required]
 * @returns urlpath
 */
 export const GetProfessionalTitles = () =>`${BaseURL}Titles/dropdown?companyReference=00001_A01`;
 export const GetQualificationTypes = () => `${BaseURL}EmployeeEducation/QualificationTypes/dropdown-types?companyReference=00001_A01`
 export const GetEducationCoreArea =() =>`${BaseURL}EmployeeEducation/Type/dropdown-types?companyReference=00001_A01`
 export const GetEmployeeEducationInfo=(filter)=>`${BaseURL}EmployeeEducation${filter}`

 /**
 * POST Employee Education
 * @param Company Reference [required]
 * @returns urlpath
 */
 export const PostEmployeeEducationInfos =() =>`${BaseURL}EmployeeEducation`


 

 //http://192.168.0.48:5100/EmployeeBio?filter=mic