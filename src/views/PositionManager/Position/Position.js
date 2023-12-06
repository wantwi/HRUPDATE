import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import _lodash from "lodash"
import CIcon from "@coreui/icons-react";
import {
  CCard,
  CCardBody,
  CFormGroup,
  CCol,
  CRow,
  CTabs,
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CLabel,
  CCardFooter,
  CModal,
  CModalBody,
  CCardHeader,
  CForm,
} from "@coreui/react";
import {
  AiOutlinePlus,
  AiOutlineClose,
  AiFillSave,
  AiOutlineRedo,
  AiFillCloseCircle,
  AiOutlineDelete,
} from "react-icons/ai";

import "react-phone-number-input/style.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import { getValue } from '@syncfusion/ej2-base';

import { CardBodyHeight, validateEmail } from "src/reusable/utils/helper";
//import { GetLabelByName } from 'src/reusable/configs/config';
import {
  CSAutoComplete,
  CSLab,
  CSRequiredIndicator,
} from "../../../reusable/components";
import "../../../scss/_custom_table.scss";
import {
  SearchEmployeeByNameOrCode,
  PostEmployee,
  GetEmployeeDetailsByEmployeeID,
  GetEmployeeSalaryInfoByEmployeeID,
  GetEmployeeAccounts,
  GetEmployeeOrganisation,
  GetEmployeeGeneralLedger,
} from "src/reusable/API/EmployeeDetailsEndpoints";
import { GetLabelByName } from "src/reusable/configs/config";
import SweetAlert from "react-bootstrap-sweetalert";
import { GetHistoryInfo } from "src/api/actions";
import useDelete from "src/hooks/useDelete";
import useFetch from "src/hooks/useFetch";
import usePost from "src/hooks/usePost";
import usePut from "src/hooks/usePut";
import JobDetailForm from "./forms/JobDetailForm";
import QualificationForm from "./forms/Qualification";
import ExperienceForm from "./forms/Experience";
import DescriptionForm from "./forms/Description";
import GLForm from "./forms/GLForm";
import useMultiFetchAllSettled from "src/hooks/useMultiFetchAllSettled";
import usePrompt from "src/hooks/usePrompt";
import useCustomApi from "src/hooks/useCustomApi";
import BenefitForm from "./forms/BenefitForm";

let companyReference = "00000002_01";
const COMPANY_REFRENCE = "00001_A01";
const DEFAULT_GUID = "00000000-0000-0000-0000-000000000000";

const requireObjLable = {
  code: "HCM-KPH53NF08RG",
  name: "HCM-ZYCFSGCKMC",
  gender: "HCM-7HTWFD0THEN-PSLL",
  salaryGradeId: "HCM-XYNVK7A8USK_PSLL",
  probationSalaryGradeId: "HCM-76DW66H8FM-LANG",
  salaryGradeStart: "HCM-CXLK7IYZ9B9-KCMI",
  salaryGradeEnd: "HCM-28JQRN57PA4-PSLL",
  status: "HCM-CSKVMLLGNW",
  staffId: "HCM-6ADWUXU89T8_LASN",
  hireDate: "HCM-HL6HU7PY50C_KCMI",
  departmentId: "HCM-N6I0LSIYJF",
  employeeTypeId: "HCM-HMLNLPOEIXG",
  employeeStatusId: "HCM-B4SZR3O5JPO-PSLL",
  salaryGradeId: "HCM-PZP4MEYWDGH",
  salaryRate: `HCM-PH98CHJVZO_KCMI`,
};

const init_GL = {
  salaryGLId: DEFAULT_GUID,
  incomeTaxGLId: DEFAULT_GUID,
  netSalaryPayableGLId: DEFAULT_GUID,
  shiftAllowanceGLId: DEFAULT_GUID,
  taxReliefGLId: DEFAULT_GUID,
  operatingOvertimeGLId: DEFAULT_GUID,
  mandatorySavingSchemeEmployeeContributionGLId: DEFAULT_GUID,
  mandatorySavingSchemeEmployerContributionGLId: DEFAULT_GUID,
  mandatorySavingSchemeEmployerTotalPayableGLId: DEFAULT_GUID,
  volontarySavingSchemeEmployeeContributionGLId: DEFAULT_GUID,
  volontarySavingSchemeEmployerContributionGLId: DEFAULT_GUID,
  volontarySavingSchemeEmployerTotalPayableGLId: DEFAULT_GUID,
};

const init_salIno = {
  payrollHourId: "",
  percentageOfBasic: "",
  paySlipNote: "",
};

const init_org = {
  staffId: "",
  hireDate: "",
  sectionId: DEFAULT_GUID,
  departmentId: DEFAULT_GUID,
  employeeTypeId: DEFAULT_GUID,
  positionId: DEFAULT_GUID,
  unitId: DEFAULT_GUID,
  locationId: DEFAULT_GUID,
  employeeStatusId: DEFAULT_GUID,
  isContract: false,
  isSecondaryEmployment: false,
  isProbation: false,
  isOvertimeExempt: false,
  isPayTax: false,
  salaryGradeId: DEFAULT_GUID,
  salaryRate: "",
  salaryType: DEFAULT_GUID,
  currency: "",
  notchId: "",
  probationMonth: "",
};

const init = {
  code: "",
  name: "",
  description: "",
  salaryGradeId: "",
  probationSalaryGradeId: "",
  salaryGradeStart: "",
  salaryGradeEnd: "",
  probationSalaryGradeStart: "",
  probationSalaryGradeEnd: "",
  status: ""
};

const postionDetail_init = {
  description: "",
  code: "",
  maxValue: "",
  minValue: "",
  name: "",
  parentPositionId: "",
  probationAmount: "400",
  probationSalaryGradeId: "",
  salaryGradeId: ""
}



const formatePaymentMode = (data) => {
  let arr = [];
  data.forEach((x) => {
    if (+x?.paymentOpt === 1) {
      let obj = {};
      obj.paymentMode = +x?.paymentOpt;
      obj.bankId = x?.serviceProviderId;
      obj.branchId = x?.branchId;
      obj.accountNumber = x?.accountNumber;
      obj.fixedAmountOrPercentageOfNet = +x?.amount.replace(/\,/g, "");
      obj.paymentBasis = +x?.paymentBasisId;
      obj.isDefault = x?.isDefault;
      obj.mobileNetworkId = DEFAULT_GUID;

      arr.push(obj);
    } else if (+x?.paymentOpt === 2) {
      let obj = {};
      obj.paymentMode = +x?.paymentOpt;
      obj.mobileNetworkId = x?.serviceProviderId;
      obj.accountNumber = x?.accountNumber;
      obj.fixedAmountOrPercentageOfNet = +x?.amount.replace(/\,/g, "");
      obj.paymentBasis = +x?.paymentBasisId;
      obj.isDefault = x?.isDefault;
      obj.bankId = DEFAULT_GUID;
      obj.branchId = DEFAULT_GUID;

      arr.push(obj);
    } else if (+x?.paymentOpt === 3) {
      let obj = {};
      obj.paymentMode = +x?.paymentOpt;
      obj.mobileNetworkId = DEFAULT_GUID;
      obj.accountNumber = x?.accountNumber;
      obj.fixedAmountOrPercentageOfNet = +x?.amount.replace(/\,/g, "");
      obj.paymentBasis = +x?.paymentBasisId;
      obj.isDefault = x?.isDefault;
      obj.bankId = DEFAULT_GUID;
      obj.branchId = DEFAULT_GUID;
      arr.push(obj);
    }
  });
  return arr;
};

const reFormatePaymentMode = (data) => {
  let arr = [];
  data.forEach((x) => {
    if (x?.paymentModeIndex === 1) {
      let obj = {
        paymentMode: x?.paymentMode,
        branch: x?.branchName || "",
        branchId: x?.branchId || DEFAULT_GUID,
        accountNumber: x?.accountNumber || "",
        paymentBasis: x?.paymentBasisName || "HCM-75HIH44NO3J_PSLL",
        paymentBasisId: `${x?.paymentBasis}`,
        amount: `${x?.fixedAmountOrPercentageOfNet}`,
        note: "",
        isDefault: x?.isDefault || false,
        paymentOpt: `${x.paymentModeIndex}`,
        mobileNetworkId: x?.mobileNetworkId || DEFAULT_GUID,
        serviceProvider: x?.bankName,
        serviceProviderId: x?.bankId || DEFAULT_GUID,
      };

      arr.push(obj);
    } else if (x?.paymentModeIndex === 2) {
      let obj = {
        paymentMode: x?.paymentMode,
        branch: x?.branchName || "",
        branchId: x?.branchId || DEFAULT_GUID,
        accountNumber: x?.accountNumber || "",
        paymentBasis: x?.paymentBasisName || "HCM-75HIH44NO3J_PSLL",
        paymentBasisId: `${x?.paymentBasis}`,
        amount: `${x?.fixedAmountOrPercentageOfNet}`,
        note: "",
        isDefault: x?.isDefault || false,
        paymentOpt: `${x.paymentModeIndex}`,
        mobileNetworkId: x?.mobileNetworkId || DEFAULT_GUID,
        serviceProvider: x?.mobileNetworkName || "",
        serviceProviderId: x?.mobileNetworkId || DEFAULT_GUID,
      };

      arr.push(obj);
    } else if (x?.paymentModeIndex === 3) {
      let obj = {
        paymentMode: x?.paymentMode,
        branch: x?.branchName || "",
        // branchId: x?.branchId ||DEFAULT_GUID,
        accountNumber: x?.accountNumber || "",
        paymentBasis: x?.paymentBasisName || "HCM-75HIH44NO3J_PSLL",
        paymentBasisId: `${x?.paymentBasis}`,
        amount: `${x?.fixedAmountOrPercentageOfNet}`,
        note: "",
        isDefault: x?.isDefault || false,
        paymentOpt: `${x.paymentModeIndex}`,
        // mobileNetworkId:x?.mobileNetworkId||DEFAULT_GUID,
        // serviceProvider:x?.mobileNetworkName ||"",
        //serviceProviderId:x?.mobileNetworkId || DEFAULT_GUID,
      };
      // obj.paymentMode = +x?.paymentOpt
      // obj.mobileNetworkId = "00000000-0000-0000-0000-000000000000"
      // obj.accountNumber = x?.accountNumber
      // obj.fixedAmountOrPercentageOfNet = +x?.amount.replace(/\,/g,'')
      // obj.paymentBasis = +x?.paymentBasisId
      // obj.isDefault = x?.isDefault
      // obj.bankId = "00000000-0000-0000-0000-000000000000"
      // obj.branchId = "00000000-0000-0000-0000-000000000000"
      arr.push(obj);
    }
  });
  return arr;
};

function EmployeeDetail() {
  const axios = useCustomApi();
  const { setIsOpen, isOpen, hasAccept, setHasAccept } = usePrompt();
  const [formData, setFormData] = useState({});
  const lan = useSelector((state) => state.language);
  const [show, setShow] = useState(true);
  const [activeKey, setActiveKey] = useState(1);
  const [visible, setVisible] = useState(false);
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfItems, setNumberOfItems] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [image, setImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [handleId, setHandleId] = useState("");
  const [duplicateFormData, setDuplicateFormData] = useState({});
  const [initSalRate, setInitSalRate] = useState(0);
  //form data states
  const [qualifications, setQualifications] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [benefits, setBenefits] = useState([]);

  const [positionDetail, setPositionDetail] = useState(null);
  const [otherInfoFormData, setOtherInfoFormData] = useState(init_salIno);
  const [glFormData, setGlFormData] = useState(null);
  const [paymentsInfo, setPaymentsInfo] = useState([]);
  const salaryRateRef = useRef(null);
  const tabOneRef = useRef(null);
  const tabTwoRef = useRef(null)

  const [isSubmitBtnClick, setIsSubmitBtnClick] = useState(false);
  const [orignalRecord, setOrignalRecord] = useState({})
  const [canUpdate, setCanUpdate] = useState(false)

  const [resetFormVal, setResetFormVal] = useState(false);
  const [enableScreen, setEnableScreen] = useState(false);


  const onConfirm = () => {
    handleDeleteItem();
  };

  const onCancel = () => {
    setIsActive(false);
  };

  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const diplayBase64Img = (photoData, photoName) => {
    const file = dataURLtoFile(photoData, `${photoName}.png`);
    setFile(file);
  };

  const { setData, setUrl: setDeletUrl } = useDelete("", (response) => {
    if (response) {
      searchReset();
      // toast.success("Division Deleted Successfully!");
      // toaster('', 'Enter code', 'success', 3000)
    }
    setIsActive(false);
  });

  const handleDelete = () => {
    // setIsActive(true)
  };

  const handleDeleteItem = async () => {
    const { id } = searchResult;
    setData({ data: { employeeId: id } });
    setDeletUrl(`/Employees`);
  };

  const handleHistory = async () => {
    //setShowHistory(true);
    // const { id } = searchResult;
    // let response = null;
    // if (activeKey === 1) {
    //   response = await GetHistoryInfo(
    //     `/Organisation/Departments/Logs?departmentId=${id}&companyReference=${companyReference}`
    //   );
    // } else {
    //   response = await GetHistoryInfo(
    //     `/Organisation/Departments/GL/Logs?departmentId=${id}&companyReference=${companyReference}`
    //   );
    // }
    // if (response) {
    //   setHistoryData(response);
    //   setShowHistory(true);
    // }
  };

  const responseFunc = (response) => {
    setMode("Update");
    setShow(false);
    let duplicate = {};
    const employeeProfile = response[0];
    const employeeAccount = response[1];
    const employeeOrganisation = response[2];
    const employeeGL = response[3];
    const employeeSalryInfo = response[4];

    if (employeeProfile?.status === "fulfilled") {
      const obj = employeeProfile?.value?.data;
      obj.salaryGradeId = obj.salaryGradeId.split("T")[0];
      obj.probationSalaryGradeEnd = obj?.probationSalaryGradeEnd || ""
      obj.probationSalaryGradeStart = obj?.probationSalaryGradeEnd || ""
      obj.gender = `${obj?.gender}`
      obj.probationSalaryGradeId = `${obj?.probationSalaryGradeId}`


      setOrignalRecord((prev) => ({ ...prev, ...obj }))
    }
    if (employeeOrganisation?.status === "fulfilled") {
      const obj = employeeOrganisation?.value?.data;
      obj.hireDate = obj.hireDate.split("T")[0];
      obj.id = employeeProfile?.value?.data?.id;
      obj.probationMonth = `${obj?.probationMonth}` || ""

      setOrignalRecord((prev) => ({ ...prev, ...obj }))
      setInitSalRate(obj?.salaryRate);
      // duplicate.organizationalForm = obj;

      setDuplicateFormData((prev) => ({ ...prev }));
    }

    if (employeeGL?.status === "fulfilled") {
      const obj = employeeGL?.value?.data;

      setGlFormData(obj);
      setOrignalRecord((prev) => ({ ...prev, ...obj }))

    }
    if (employeeSalryInfo?.status === "fulfilled") {
      const obj = employeeSalryInfo?.value?.data;

      setOtherInfoFormData(obj);
      setOrignalRecord((prev) => ({ ...prev, ...obj }))

    }

    if (employeeAccount?.status === "fulfilled") {
      const accountData = employeeAccount?.value?.data;
      const formattedPaymentInfo = reFormatePaymentMode(accountData);
      setOrignalRecord((prev) => ({ ...prev, paymentMeans: formattedPaymentInfo }))
      setPaymentsInfo(formattedPaymentInfo);
    }
  };



  const { setUrl: setGetUserImageUrl } = useFetch("", (res) => {
    if (res?.base6) {

    }

    setShowPreview(true);
  });

  const { setUrls: setUserInfoUrls } = useMultiFetchAllSettled(
    [],
    responseFunc
  );

  const handleSearchResultSelect = (results) => {
    setSearchResult(results);

    if (results?.id) {
      const { id } = results;
      setGetUserImageUrl(`download/${id}`);
      setUserInfoUrls([
        GetEmployeeDetailsByEmployeeID(results?.id),
        GetEmployeeAccounts(id),
        GetEmployeeOrganisation(id),
        GetEmployeeGeneralLedger(id),
        GetEmployeeSalaryInfoByEmployeeID(id),
      ]);
    }
  };

  const searchReset = () => {
    setShow(true);
    resetPage();
  };

  const handleReset = (type = 1) => {
    if (mode === "Add" && type === 1) {
      setSearchResult("");
      handleReset(2);
    }

    if (mode === "Update" && searchResult?.id && type === 1) {
    }

    if (type === 2) {
      setMode("Add");
    }
  };

  // useEffect(() => {
  //   const requiredObj = {
  //     code: jobFormDetails?.code,
  //     name: jobFormDetails?.name,
  //     gender: jobFormDetails?.gender,
  //     salaryGradeId: jobFormDetails?.salaryGradeId,
  //     probationSalaryGradeId: jobFormDetails?.probationSalaryGradeId,
  //     salaryGradeStart: jobFormDetails?.salaryGradeStart,
  //     salaryGradeEnd: jobFormDetails?.salaryGradeEnd,
  //     status: jobFormDetails?.status,
  //   };

  //   setCanSave(Object.values(requiredObj).every((field) => field?.length > 0));
  // }, [jobFormDetails]);

  const postReponse = (response) => {
    if (response?.status === 204) {
      alert("Post Done!!")
      // const userId = response?.headers["resource-id"];
    }
  };

  const resetForm = () => {

    setSearchInput("");
    setPositionDetail(null)
    setDescriptions([])
    setBenefits([])
    setQualifications([])
    setExperiences([])
    setResetFormVal(!resetFormVal);

    tabOneRef.current.lastChild.click()



    //form data states
  };
  const resetPage = () => {
    resetForm();
    setShow(true);

    setIsOpen(false);
    setHasAccept(null);
  };

  useEffect(() => {
    if (isOpen) {
      if (hasAccept === false) {
        resetPage();
      } else if (hasAccept === true) {
        setShow(false);

        setIsOpen(false);
        setHasAccept(null);
      }
    }

    return () => {
      //setHasAccept(null)
    };
  }, [hasAccept]);


  const { setUrl: setPostUrl, setData: setPostData } = usePost("", postReponse);
  const { setUrl: setPutUrl, setData: setPutData } = usePut("", postReponse);
  const handleOnSubmit = () => {
    setIsSubmitBtnClick(true);

    const requiredObj = {
      code: positionDetail?.code,
      name: positionDetail?.name,
      salaryGradeId: positionDetail?.salaryGradeId,
      probationSalaryGradeId: positionDetail?.probationSalaryGradeId,
      parentPositionId: positionDetail?.parentPositionId
    };


    const glAccounts = null
    const earnings = benefits.map(x => ({ earningId: x?.benefitId, unit: x?.unit }))
    const deductions = []
    const qualificationIds = qualifications.map(x => x?.id)
    const locationIds = []
    const jobDescriptions = descriptions.map(x => ({ name: x?.name, description: x?.description, reportingCycle: x?.reportingCycle, status: 1 }))
    const jobExpirences = experiences.map(x => ({ prevPositionId: x?.id, month: x?.expMonth, roleLevelId: x?.roleLevelId, status: 1 }))
    let postObj = {
      code: positionDetail?.code,
      name: positionDetail?.name,
      note: positionDetail?.description,
      salaryGradeId: positionDetail?.salaryGradeId,
      probationSalaryGradeId: positionDetail?.probationSalaryGradeId,
      companyReference: "",
      userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      status: positionDetail?.status === '1' ? true : false,
      glAccounts,
      deductions,
      locationIds,
      earnings,
      qualificationIds,
      jobDescriptions,
      jobExpirences
    }

    console.log({ postObj });

    setPostData(postObj)
    setPostUrl('/Organisation/Positions')
    return

    if (!canSave) {
      // toast.error(`${GetLabelByName(requireObjLable[missing[0]],lan)} is required`);
      //toast.error(`Please provide data for all required fields.`);
      toast.error(GetLabelByName(`HCM-WQ9J7737WDC_LASN`, lan));
      //


      return;
    }

  };



  const handleAddNewRecord = () => {
    setMode("Add");
    setShow(false);
  };

  useEffect(() => {
    if (mode === "Update") {
      setCanSave(true);
    }

    return () => { };
  }, [
    mode,
    otherInfoFormData,
    paymentsInfo,
    glFormData,
  ]);

  // useEffect(() => {
  //   if (mode === "Update") {
  //     const currentData = { ...glFormData, ...otherInfoFormData, paymentMeans: paymentsInfo }
  //     delete currentData["currency"]
  //     delete currentData["salaryType"]
  //     const isEqual = _lodash.isEqual(orignalRecord, currentData)
  //     setCanUpdate(isEqual)
  //   }

  //   return () => {

  //   }
  // }, [
  //   otherInfoFormData,
  //   paymentsInfo,
  //   glFormData])

  // useEffect(() => {
  //   if (mode === "Update") {
  //     if (!showPreview) {
  //       setCanUpdate(false)
  //     }
  //   }

  //   return () => {

  //   }
  // }, [showPreview])

  // const getFullName = () => {
  //   return jobFormDetails?.otherName
  //     ? `${jobFormDetails?.code} ${jobFormDetails?.otherName} ${jobFormDetails?.name}`
  //     : `${jobFormDetails?.code} ${jobFormDetails?.name}`;
  // };

  //

  return (
    <>
      <SweetAlert
        warning
        showCancel
        confirmBtnText={GetLabelByName("HCM-8A8GZ0N4334_LOLN", lan)} //</>"Yes, delete it!"
        confirmBtnBsStyle="danger"
        title={GetLabelByName("HCM-Z3GW6TG207", lan, "Are you sure you want to delete")} //HCM-Z3GW6TG207
        onConfirm={onConfirm}
        onCancel={onCancel}
        focusCancelBtn
        show={isActive}
      >
        <CSLab code="HCM-7KY656PSXDB-LASN" />
      </SweetAlert>
      <CRow hidden={!show ? true : false}>
        <CCol md="1"></CCol>
        <CCol xs="12">
          <h5>
            {/* <CSLab code={"HCM-2DVGKL0FBGW_HRPR"} lable="Employee Details" /> */}
            Position
          </h5>
        </CCol>
        <CCol md="4" xs="7">
          <CSAutoComplete
            filterUrl={SearchEmployeeByNameOrCode(
              companyReference,
              searchInput,
              pageNumber,
              numberOfItems,
              orderBy,
              sortOrder
            )}
            // placeholder={GetLabelByName("HCM-4NCKCPUZGF7_LASN", lan)}
            placeholder={"Search position"}
            handleSelect={handleSearchResultSelect}
            uniqueIdKey={"id"}
            displayTextKey={"code"}
            setInput={setSearchInput}
            emptySearchFieldMessage={GetLabelByName(
              "HCM-76PRNEXWQMS_LOLN",
              lan
            )}
            input={searchInput}
            isPaginated={false}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            numberOfItems={numberOfItems}
            setNumberOfItems={setNumberOfItems}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            handleId={setHandleId}
          />
        </CCol>
        <CCol md="8" xs="5" className="text-right">
          <CFormGroup>
            <CButton
              type="button"
              onClick={handleAddNewRecord}
              size="sm"
              color="primary"
            >
              {" "}
              <AiOutlinePlus />{" "}
              {show ? <CSLab lable="Add" code={"HCM-TAAFD4M071D-HRPR"} /> : null}{" "}
            </CButton>
          </CFormGroup>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" hidden={show}>
          <CCard>
            <CCardHeader>
              <CCol xs="12">
                <h5>
                  <CSLab
                    lable=""
                    code={
                      !show ? (
                        mode === "Add" ? (
                          GetLabelByName(
                            "HCM-ORVVKCDAB5_LASNx",
                            lan,
                            "Add Position"
                          )
                        ) : mode === "Update" ? (
                          <>
                            {GetLabelByName(
                              "HCM-M7JNZHXNTT-KCMIx",
                              lan,
                              "Update Position"
                            )}{" "}
                            :{" "}
                            <span
                              title={""}
                              style={{
                                padding: 5,
                                borderRadius: 5,
                                fontWeight: 900,
                                cursor: "pointer",
                                background: "#fff",
                                color: "#315a76",
                              }}
                            >
                              {""}
                            </span>
                          </>
                        ) : (
                          GetLabelByName("HCM-M7JNZHXNTT-KCMI", lan)
                        )
                      ) : (
                        "null"
                      )
                    }
                  />
                </h5>
              </CCol>
            </CCardHeader>
            <CCardBody style={{ height: CardBodyHeight, overflowY: "auto" }}>
              <CForm action="" method="post" autoComplete="off">
                <fieldset disabled={enableScreen}>
                  <CTabs>
                    <CNav variant="tabs">
                      <CNavItem>
                        <div ref={tabOneRef}>
                          <CNavLink
                            href="#"
                            active={activeKey === 1}
                            onClick={() => setActiveKey(1)}

                          >
                            {/* <CSLab code="HCM-HZU4WPFB1L9-LASN" /> */}
                            Position Detail
                          </CNavLink>
                        </div>

                      </CNavItem>
                      <CNavItem>

                        <CNavLink
                          href="#"
                          active={activeKey === 2}
                          onClick={() => setActiveKey(2)}
                          ref={tabTwoRef}
                        >
                          {/* <CSLab code="HCM-GQR50DATROE_PSLL" /> */}
                          Qualification
                        </CNavLink>
                      </CNavItem>

                      <CNavItem>
                        <CNavLink
                          href="#"
                          active={activeKey === 3}
                          onClick={() => setActiveKey(3)}
                        >
                          {/* <CSLab code="HCM-D9GDJ0ZHB7U_LOLN" /> */}
                          Experience
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink
                          href="#"
                          active={activeKey === 4}
                          onClick={() => setActiveKey(4)}
                        >
                          {/* <CSLab code="HCM-TNH48GNHQW-LANG" /> */}
                          Description
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink
                          href="#"
                          active={activeKey === 5}
                          onClick={() => setActiveKey(5)}
                        >
                          {/* <CSLab code="HCM-CB7ODJKF2IN-KCMI" /> */}
                          Benefit
                        </CNavLink>
                      </CNavItem>
                    </CNav>

                    <CTabContent>
                      <CTabPane
                        style={{ marginTop: "10px" }}
                        visible={activeKey === 1 ? true : false}
                      >
                        <JobDetailForm
                          positionDetail={positionDetail}
                          setPositionDetail={setPositionDetail}
                        />
                      </CTabPane>
                      <CTabPane
                        visible={activeKey === 2 ? true : false}
                        style={{ marginTop: "10px" }}
                      >
                        <QualificationForm
                          setQualifications={setQualifications}
                          qualifications={qualifications}
                        />
                      </CTabPane>

                      <CTabPane
                        visible={activeKey === 3 ? true : false}
                        style={{ marginTop: "10px" }}
                      >
                        <ExperienceForm
                          experiences={experiences}
                          setExperiences={setExperiences}
                        />
                      </CTabPane>

                      <CTabPane
                        visible={activeKey === 4 ? true : false}
                        style={{ marginTop: "10px" }}
                      >
                        <DescriptionForm
                          descriptions={descriptions}
                          setDescriptions={setDescriptions}

                        />
                      </CTabPane>
                      <CTabPane
                        visible={activeKey === 5 ? true : false}
                        style={{ marginTop: "10px" }}
                      >
                        <BenefitForm benefits={benefits}
                          setBenefits={setBenefits} />

                      </CTabPane>
                    </CTabContent>
                  </CTabs>
                </fieldset>
              </CForm>
            </CCardBody>
            <CCardFooter>

              <CButton
                style={{
                  marginRight: 5,
                  float: "right",
                  // cursor: canSave ? "pointer" : "not-allowed",
                }}
                type="button"
                size="sm"
                color="success"
                onClick={handleOnSubmit}
                disabled={mode === "Update" ? !canUpdate ? false : true : false}
              >
                <AiFillSave size={20} />
                {mode === "Add" ? (
                  <CSLab code="HCM-HGUHIR0OK6T" />
                ) : (
                  <CSLab code="HCM-5L07EAZ2A48" />
                )}
              </CButton>
              <CButton
                style={{ marginRight: 5, float: "right", color: "white" }}
                onClick={resetForm}
                type="button"
                size="sm"
                color={mode === "Add" ? "warning" : "warning"}
              >
                <AiOutlineRedo size={20} />{" "}
                {mode === "Add" ? (
                  <CSLab code="HCM-MELULU9B6R_KCMI" />
                ) : (
                  <CSLab code="HCM-5KVATR3LGG5" />
                )}
              </CButton>
              <CButton
                name="Cancel"
                style={{ marginRight: 5, float: "right", color: "white" }}
                onClick={resetPage}
                type="button"
                size="sm"
                color="secondary"
              >
                <AiOutlineClose size={20} />
                <CSLab code="HCM-V3SL5X7PJ9C-LANG" />
              </CButton>
              {mode === "Update" ? (
                <CButton
                  onClick={handleDelete}
                  style={{ marginRight: 5, float: "right", color: "white" }}
                  type="button"
                  size="sm"
                  color="danger"
                >
                  <AiOutlineDelete size={20} />
                  <CSLab lable="Delete" code="HCM-IIQS2WWFTPP_KCMI" />
                </CButton>
              ) : null}
              <p style={{ left: "20px" }}>
                <em style={{ fontSize: "12px" }}>
                  <CSLab code="HCM-S6DELVG0IQS-HRPR" /> (<CSRequiredIndicator />
                  ) <CSLab code="HCM-H72Q4EB363H_PSLL" />
                </em>
              </p>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      <CModal
        show={visible}
        size={"sm"}
        onClose={() => setVisible(false)}
        closeOnBackdrop={true}
      >
        <CModalBody>
          <CRow style={{ marginTop: "-17px", marginRight: "-25px" }}>
            <CCol md="12" className={"text-right"} style={{ fontSize: "19px" }}>
              <AiFillCloseCircle
                color="red"
                onClick={() => setVisible(false)}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="12">
              <img
                alt={file ? `Name: ${file.name}` : ""}
                style={{ width: "90%" }}
                src={file ? URL.createObjectURL(file) : null}
              />
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
      <ToastContainer />
    </>
  );
}
export default EmployeeDetail;
