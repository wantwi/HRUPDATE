import { BaseURL } from "./base";

/**
 * GET Professional Titles
 * @param Company Reference [required]
 * @returns urlpath
 */
 export const GetProfessionalTitles = () =>`Titles/dropdown?companyReference=00001_A01`;
 export const GetQualificationTypes = () => `EmployeeEducation/QualificationTypes/dropdown-types?companyReference=00001_A01`
 export const GetEducationCoreArea =() =>`EmployeeEducation/Type/dropdown-types?companyReference=00001_A01`
 export const GetEmployeeEducationInfo=(filter)=>`EmployeeEducation${filter}`
 export const GetEmployeeById=(handleId)=>`EmployeeEducation/${handleId}`

 /**
 * POST Employee Education
 * @param Company Reference [required]
 * @returns urlpath
 */
 export const PostEmployeeEducationInfos =() =>`EmployeeEducation`


 

 //http://192.168.0.48:5100/EmployeeBio?filter=mic