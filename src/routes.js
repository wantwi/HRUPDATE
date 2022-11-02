/* eslint-disable no-sparse-arrays */
import React from "react";
import Login from './templates/pages/login/Login';

//import Dependant from "./views/EmployeeManager/Dependant/Dependant";
import AccidentTransaction from "./views/EmployeeManager/AccidentTransaction/AccidentTransaction";
//import MedicalTransaction from "./views/EmployeeManager/MedicalTransaction/MedicalTransaction";
import Beneficiaries from "./views/EmployeeManager/Beneficiary/Beneficiary";
//import EmergencyContact from "./views/EmployeeRelationships/EmergencyContact/EmergencyContact";
//import NextofKin from "./views/EmployeeManager/NextofKin/NextofKin";
//import {LeaveTransaction} from "./views/EmployeeManager/LeaveTransaction/LeaveTransaction";

const Dashboard = React.lazy(() => import("./templates/dashboard/Dashboard"));

// Authorization
const Configuration = React.lazy(() =>
  import("./views/Authorization/Configuration/Configuration")
);
const GroupManager = React.lazy(() =>
  import("./views/Authorization/GroupManager/GroupManager")
);
const UserManager = React.lazy(() =>
  import("./views/Authorization/UserManager/UserManager")
);

// Employee Manager
const EmployeeDetail = React.lazy(() =>
  import("./views/EmployeeManager/EmployeeDetail/EmployeeDetail")
);
const EmployeeAppraisal = React.lazy(() =>
  import("./views/EmployeeManager/EmployeeAppraisal/EmployeeAppraisal")
);
const EmployeeRequest = React.lazy(() =>
  import("./views/EmployeeManager/EmployeeRequest/EmployeeRequest")
);
const EmployeeCareerPlan = React.lazy(() =>
  import("./views/EmployeeManager/EmployeeCareerPlan/EmployeeCareerPlan")
);
const EmployeeCheckList = React.lazy(() =>
  import("./views/EmployeeManager/EmployeeCheckList/EmployeeCheckList")
);
const EmployeeDisciplinaryInformation = React.lazy(() =>
  import(
    "./views/EmployeeManager/EmployeeDisciplinaryInformation/EmployeeDisciplinaryInformation"
  )
);
const EmployeeEducationInformation = React.lazy(() =>
  import(
    "./views/EmployeeManager/EmployeeEducationInformation/EmployeeEducationInformation"
  )
);
const EmployeeHealthAndSafetyInfo = React.lazy(() =>
  import(
    "./views/EmployeeManager/EmployeeHealthAndSafetyInfo/EmployeeHealthAndSafetyInfo"
  )
);
const EmployeeJobHistory = React.lazy(() =>
  import("./views/EmployeeManager/EmployeeJobHistory/EmployeeJobHistory")
);
const EmployeeNote = React.lazy(() =>
  import("./views/EmployeeManager/EmployeeNote/EmployeeNote")
);
const EmployeePriorEmployment = React.lazy(() =>
  import(
    "./views/EmployeeManager/EmployeePriorEmployment/EmployeePriorEmployment"
  )
);
const EmployeeTrainingInformation = React.lazy(() =>
  import(
    "./views/EmployeeManager/EmployeeTrainingInformation/EmployeeTrainingInformation"
  )
);
const HireApplicant = React.lazy(() =>
  import("./views/EmployeeManager/HireApplicant/HireApplicant")
);
const SupervisorAppraisal = React.lazy(() =>
  import("./views/EmployeeManager/SupervisorAppraisal/SupervisorAppraisal")
);
const LeaveTypes = React.lazy(() =>
  import("./views/EmployeeManager/LeaveTypes/LeaveTypes")
);

const EmployeeHobby = React.lazy(() =>
  import("./views/EmployeeManager/EmployeeHobby/EmployeeHobby")
);
const EmployeeSkill = React.lazy(() =>
  import("./views/EmployeeManager/EmployeeSkill/EmployeeSkill")
);
const LeaveTransaction = React.lazy(() =>
  import("./views/EmployeeManager/LeaveTransaction/LeaveTransaction")
);
const EmployeeLanguage = React.lazy(() => import("./views/EmployeeManager/EmployeeLanguage/EmployeeLanguage"));
const EmployeeHomeTown = React.lazy(()=>import("./views/EmployeeManager/EmployeeHomeTown/EmployeeHomeTown"))
const EmployeeFamily = React.lazy(()=>import ("./views/EmployeeManager/EmployeeFamily/EmployeeFamily"))


// Position Manager
const EmployeeMovement = React.lazy(() =>
  import("./views/PositionManager/EmployeeMovement/EmployeeMovement")
);
const EmployeeRetirementInformation = React.lazy(() =>
  import(
    "./views/PositionManager/EmployeeRetirementInformation/EmployeeRetirementInformation"
  )
);
const EmployeeTerminationInformation = React.lazy(() =>
  import(
    "./views/PositionManager/EmployeeTerminationInformation/EmployeeTerminationInformation"
  )
);
const PositionBudgeting = React.lazy(() =>
  import("./views/PositionManager/PositionBudgeting/PositionBudgeting")
);

//Bank Information
const companyBanks = React.lazy(() =>
  import("./views/BankInformation/CompanyBanks/CompanyBanks")
);
const EmployeeBanks = React.lazy(() =>
  import("./views/BankInformation/EmployeeBanks/EmployeeBanks")
);
const Branch = React.lazy(() =>
  import("./views/BankInformation/Branch/Branch")
);

//General settings
const AuditTrail = React.lazy(() =>
  import("./views/GeneralSettings/AuditTrail/AuditTrail")
);
const ChangeEmployeeID = React.lazy(() =>
  import("./views/GeneralSettings/ChangeEmployeeId/ChangeEmployeeId")
);
const CurrentUser = React.lazy(() =>
  import("./views/GeneralSettings/CurrentUser/CurrentUser")
);
const Currency = React.lazy(() =>
  import("./views/GeneralSettings/Currency/Currency")
);
const Earning = React.lazy(() =>
  import("./views/GeneralSettings/Earning/Earning")
);
const EmployeeManager = React.lazy(() =>
  import("./views/GeneralSettings/EmployeeManager/EmployeeManager")
);
const Deduction = React.lazy(() =>
  import("./views/GeneralSettings/Deduction/Deduction")
);
const SavingScheme = React.lazy(() =>
  import("./views/GeneralSettings/SavingScheme/SavingScheme")
);
const Loan = React.lazy(() => import("./views/GeneralSettings/Loan/Loan"));
const SalaryGrade = React.lazy(() =>
  import("./views/GeneralSettings/SalaryGrade/SalaryGrade")
);
const UpdateEmployeeStatus = React.lazy(() =>
  import("./views/GeneralSettings/ChangeEmployeeStatus/ChangeEmployeeStatus")
);
const UpdateMasterData = React.lazy(() =>
  import("./views/GeneralSettings/UpdateMasterData/UpdateMasterData")
);
const PayPeriodSetup = React.lazy(() =>
  import("./views/GeneralSettings/PayPeriodSetup/PayPeriodSetup")
);
const LoginList = React.lazy(() =>
  import("./views/GeneralSettings/LoginList/LoginList")
);
const ExchangeRate = React.lazy(() =>
  import("./views/GeneralSettings/ExchangeRate/ExchangeRate")
);

const GlAccount = React.lazy(() =>
  import("./views/GeneralSettings/GlAccount/GlAccount")
);

// Generic Parameter
const GenericParameter = React.lazy(() =>
  import("./views/GenericParameters/GenericParam/GenericParameter")
);
//const EmployeeTypes = React.lazy(() => import('./views/GenericParameters/GenericParam/EmployeeType'))

// Tax Manager
const TaxTable = React.lazy(() =>
  import("./views/TaxManager/TaxTable/TaxTable")
);
const TaxRelief = React.lazy(() =>
  import("./views/TaxManager/TaxRelief/TaxRelief")
);
const MedicalTransactions = React.lazy(() =>
  import("./views/EmployeeManager/MedicalTransaction/MedicalTransaction")
);
const AccidentTransactions = React.lazy(() =>
  import("./views/EmployeeManager/AccidentTransaction/AccidentTransaction")
);

//Employee Relationships
const Beneficiary = React.lazy(() =>
  import("./views/EmployeeRelationships/Beneficiary/Beneficiary")
);
const Dependant = React.lazy(() =>
  import("./views/EmployeeRelationships/Dependant/Dependant")
);
const EmergencyContact = React.lazy(() =>
  import("./views/EmployeeRelationships/EmergencyContact/EmergencyContact")
);
const EmergencyContacts = React.lazy(() =>
  import("./views/EmployeeRelationships/EmergencyContact/EmergencyContact")
);
const Guarantor = React.lazy(() =>
  import("./views/EmployeeRelationships/Guarantor/Guarantor")
);
const NextofKin = React.lazy(() =>
  import("./views/EmployeeRelationships/NextofKin/NextofKin")
);
const Relationships = React.lazy(() =>
  import("./views/EmployeeManager/Relationships/Relationships")
);

const routes = [

  
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },

  {
    path: "/genericparameter/department",
    name: "Department",
    component: GenericParameter,
  },
  {
    path: "/genericparameter/division",
    name: "Division",
    component: GenericParameter,
  },
  {
    path: "/genericparameter/employeetype",
    name: "Employee Type",
    component: GenericParameter,
  },
  {
    path: "/genericparameter/location",
    name: "Location",
    component: GenericParameter,
  },
  {
    path: "/genericparameter/position",
    name: "Position",
    component: GenericParameter,
  },
  {
    path: "/genericparameter/section",
    name: "Section",
    component: GenericParameter,
  },
  { path: "/genericparameter/unit", name: "Unit", component: GenericParameter },

  // Authorization
  {
    path: "/authorization/configuration",
    name: "Configuration",
    component: Configuration,
  },
  {
    path: "/authorization/groupmanager",
    name: "Group Manager",
    component: GroupManager,
  },
  {
    path: "/authorization/usermanager",
    name: "User Manager",
    component: UserManager,
  },

  // Employee Manager
  {
    path: "/employeemanager/employeedetail",
    name: "Employee Detail",
    component: EmployeeDetail,
  },
  {
    path: "/employeemanager/employeerequest",
    name: "Employee Request ",
    component: EmployeeRequest,
  },
  {
    path: "/employeemanager/hireapplicant",
    name: "Hire Applicant",
    component: HireApplicant,
  },
  {
    path: "/employeemanager/employeechecklist",
    name: "Employee Check List",
    component: EmployeeCheckList,
  },
  {
    path: "/employeemanager/employeecareerplan",
    name: "Employee Job History",
    component: EmployeeCareerPlan,
  },
  {
    path: "/employeemanager/employeedisciplinaryinformation",
    name: "Employee Disciplinary Information",
    component: EmployeeDisciplinaryInformation,
  },
  {
    path: "/employeemanager/employeeeducationinformation",
    name: "Employee Education Information",
    component: EmployeeEducationInformation,
  },
  {
    path: "/employeemanager/employeehealthandsafetyinfo",
    name: "Employee Health And Safety Info.",
    component: EmployeeHealthAndSafetyInfo,
  },
  {
    path: "/employeemanager/employeeappraisal",
    name: "Employee Appraisal",
    component: EmployeeAppraisal,
  },
  {
    path: "/employeemanager/employeejobhistory",
    name: "Employee Job History",
    component: EmployeeJobHistory,
  },
  {
    path: "/employeemanager/employeenote",
    name: "Employee Note",
    component: EmployeeNote,
  },
  {
    path: "/employeemanager/employeeprioremployment",
    name: "Employee Prior Employment",
    component: EmployeePriorEmployment,
  },
  {
    path: "/employeemanager/employeetraininginformation",
    name: "Employee Training Information",
    component: EmployeeTrainingInformation,
  },
  {
    path: "/employeemanager/supervisorappraisal",
    name: "Supervisor Appraisal",
    component: SupervisorAppraisal,
  },
  {
    path: "/employeemanager/updateemployeestatus",
    name: "Update Employee Status",
    component: UpdateEmployeeStatus,
  },
  {
    path: "/employeemanager/changeemployeeid",
    name: "Change Employee ID",
    component: ChangeEmployeeID,
  },
  {
    path: "/employeemanager/leavetypes",
    name: "Leave Types",
    component: LeaveTypes,
  },
  ,
  {
    path: "/employeemanager/medicaltransaction",
    name: "Medical Transaction",
    component: MedicalTransactions,
  },
  ,
  {
    path: "/employeemanager/accidenttransaction",
    name: "Accident Transaction",
    component: AccidentTransaction,
  },

  {
    path: "/employeemanager/employeehobby",
    name: "Employee Hobby",
    component: EmployeeHobby,
  },
  {
    path: "/employeemanager/employeeskill",
    name: "Employee Skill",
    component: EmployeeSkill,
  },
  {
    path: "/employeemanager/leavetransaction",
    name: "Employee Transaction",
    component: LeaveTransaction,
  },
  {
    path: "/employeemanager/employeelanguage",
    name: "Employee Language",
    component: EmployeeLanguage,
  },
  {
    path: "/employeemanager/employeehometown",
    name: "Employee Hometown",
    component: EmployeeHomeTown,
  }, 
   {
    path: "/employeemanager/employeefamily",
    name: "Employee Family",
    component: EmployeeFamily,
  },

  // Bank Information
  {
    path: "/bankinformation/companybanks",
    name: "company Banks",
    component: companyBanks,
  },
  {
    path: "/bankinformation/employeebanks",
    name: "Employee Banks",
    component: EmployeeBanks,
  },
  { path: "/bankinformation/branch", name: "Branch", component: Branch },

  //Position Manager
  {
    path: "/positionmanager/employeemovement",
    name: "Employee Movement",
    component: EmployeeMovement,
  },
  {
    path: "/positionmanager/employeeretirementinformation",
    name: "Employee Retirement Information",
    component: EmployeeRetirementInformation,
  },
  {
    path: "/positionmanager/employeeterminationinformation",
    name: "Employee Termination Information",
    component: EmployeeTerminationInformation,
  },
  {
    path: "/positionmanager/positionbudgeting",
    name: "Position Budgeting",
    component: PositionBudgeting,
  },

  //General Settings
  {
    path: "/generalsettings/audittrail",
    name: "Audit Trail",
    component: AuditTrail,
  },
  { path: "/generalsettings/currency", name: "Currency", component: Currency },
  {
    path: "/generalsettings/currentuser",
    name: "Current User",
    component: CurrentUser,
  },

  {
    path: "/generalsettings/deduction",
    name: "Deduction",
    component: Deduction,
  },
  { path: "/generalsettings/earning", name: "Earning", component: Earning },
  {
    path: "/generalsettings/employeemanager",
    name: "Employee Manager",
    component: EmployeeManager,
  },
  {
    path: "/generalsettings/glaccount",
    name: "GL Account",
    component: GlAccount,
  },
  {
    path: "/generalsettings/savingscheme",
    name: "Saving Scheme",
    component: SavingScheme,
  },
  { path: "/generalsettings/loan", name: "Loan", component: Loan },
  {
    path: "/generalsettings/salarygrade",
    name: "Salary Grade",
    component: SalaryGrade,
  },
  {
    path: "/generalsettings/updatemasterdata",
    name: "Salary Grade",
    component: UpdateMasterData,
  },

  {
    path: "/generalsettings/payperiodsetup",
    name: "Pay Period Setup",
    component: PayPeriodSetup,
  },
  {
    path: "/generalsettings/loginlist",
    name: "Login List",
    component: LoginList,
  },
  {
    path: "/generalsettings/exchangerate",
    name: "Exchange Rate",
    component: ExchangeRate,
  },
  //Employee Relationships
  {
    path: "/employeerelationships/beneficiary",
    name: "Beneficiary",
    component: Beneficiary,
  },
  {
    path: "/employeerelationships/dependant",
    name: "Dependent",
    component: Dependant,
  },
  {
    path: "/employeerelationships/emergencycontact",
    name: "Emergency Contact",
    component: EmergencyContact,
  },
  {
    path: "/employeerelationships/nextofkin",
    name: "Next of Kin",
    component: NextofKin,
  },
  {
    path: "/employeerelationships/guarantor",
    name: "Guarantor",
    component: Guarantor,
  },
  {
    path: "/employeemanager/relationships",
    name: "Relationships",
    component: Relationships,
  },

  //Tax Manager
  { path: "/taxmanager/taxtable", name: "Tax Table", component: TaxTable },
  { path: "/taxmanager/taxrelief", name: "Tax Relief", component: TaxRelief },
];

export default routes;
