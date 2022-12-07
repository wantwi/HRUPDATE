import { CCol, CInput, CLabel, CRow, CSelect } from "@coreui/react";
import React, { useEffect, useRef, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useSelector } from "react-redux";
import useFetch from "src/hooks/useFetch";
import useMultiFetch from "src/hooks/useMultiFetch";
import { GetAllDivisonsByCompanyReference } from "src/reusable/API/DepartmentEndpoints";
import { GetAllLocationsByCompanyReference } from "src/reusable/API/DivisionEndpoints";
import {
  GetAllEmployeeTypesByCompanyRefernece,
  GetAllPositionsByCompanyReference,
  GetAllUnitsByCompanyReference,
  GetEmployeeStatus,
  GetsalaryGrade,
  GetsalaryGradeDetails,
  GetsalaryGradeNotch,
} from "src/reusable/API/EmployeeDetailsEndpoints";
import { GetNotchSize } from "src/reusable/API/SalaryGradeEndpoint";
import { GetAllDepartmentsByCompanyReference } from "src/reusable/API/SectionEndpoints";
import { GetAllSectionsByCompanyReference } from "src/reusable/API/UnitEndpoints";
import {
  CSCheckbox,
  CSLab,
  CSRequiredIndicator,
} from "src/reusable/components";
import { GetLabelByName } from "src/reusable/configs/config";
const COMPANY_REFRENCE = "00000002_01";

const OrganizationalForm = ({
  organizationalForm,
  setOrganizationalForm,
  salaryRateRef,
  setIsSubmitBtnClick,
  isSubmitBtnClick,
  resetFormVal,
}) => {
  const lan = useSelector((state) => state.language);

  const [genericData, setGenericData] = useState({});
  const [notches, setNotches] = useState([]);
  const probationMonthRef = useRef(null);
  const notchRef = useRef(null);
  const hireDateRef = useRef(null);
  const departmentIdRef = useRef(null);
  const staffIdRef = useRef(null);
  const employeeTypeIdRef = useRef(null);
  const employeeStatusIdRef = useRef(null);
  const salaryGradeIdRef = useRef(null);
  const [border, setBorder] = useState(false);

  const refs = [
    hireDateRef,
    departmentIdRef,
    staffIdRef,
    employeeTypeIdRef,
    employeeStatusIdRef,
    salaryGradeIdRef,
  ];

  const multiFetchResponse = (response) => {
    let resObj = {};
    resObj.sectionList = response[0].data;
    resObj.departmentList = response[1].data;
    resObj.divisionList = response[2].data;
    resObj.employeeTypeList = response[3].data;
    resObj.positionList = response[4].data;
    resObj.unitList = response[5].data;
    resObj.locationList = response[6].data;
    resObj.employeeStatusList = response[7].data;
    resObj.salaryGradeList = response[8].data;
    resObj.notcheSize = response[9].data?.size;
console.log(resObj);
    setGenericData(resObj);
    setBorder(false);
  };

  const {
    sectionList = [],
    departmentList = [],
    divisionList = [],
    employeeTypeList = [],
    positionList = [],
    unitList = [],
    locationList = [],
    employeeStatusList = [],
    salaryGradeList = [],
    notcheSize = 0
  } = genericData;

  useMultiFetch(
    [
      GetAllSectionsByCompanyReference(COMPANY_REFRENCE),
      GetAllDepartmentsByCompanyReference(COMPANY_REFRENCE),
      GetAllDivisonsByCompanyReference(COMPANY_REFRENCE),
      GetAllEmployeeTypesByCompanyRefernece(COMPANY_REFRENCE),
      GetAllPositionsByCompanyReference(COMPANY_REFRENCE),
      GetAllUnitsByCompanyReference(COMPANY_REFRENCE),
      GetAllLocationsByCompanyReference(COMPANY_REFRENCE),
      GetEmployeeStatus(COMPANY_REFRENCE),
      GetsalaryGrade(COMPANY_REFRENCE),
      GetNotchSize(COMPANY_REFRENCE)
    ]
  
  );

  const { setUrl: setNotchUrl } = useFetch("", (result) => {
    setNotches(result);
  });

  const { setUrl: setGLDetailUrl } = useFetch("", (result) => {
    setNotches([]);
    setNotchUrl(GetsalaryGradeNotch(result?.id));

    setOrganizationalForm((prev) => ({
      ...prev,
      currency: result?.currency,
      salaryType: result?.salaryType,
      salaryGradeId: result?.id,
    }));

    notchRef.current.value = organizationalForm?.notchId;
  });

  useEffect(() => {
    const DEFAULT_GUID = "00000000-0000-0000-0000-000000000000";
    
    if(organizationalForm?.salaryGradeId === "undefined" || organizationalForm?.salaryGradeId === DEFAULT_GUID || organizationalForm?.salaryGradeId.length === 0)
    {
      setGLDetailUrl("")
      setOrganizationalForm((prev) => ({
        ...prev,
        salaryRate: "",
        currency: "",
        salaryType: "",
      }));
      return
    } 

    
      setGLDetailUrl(GetsalaryGradeDetails(organizationalForm?.salaryGradeId));
      setOrganizationalForm((prev) => ({
        ...prev,
        salaryRate: "",
        currency: "",
        salaryType: "",
      }));
    
    return () => {
      setGLDetailUrl("");
      setNotches([]);
    };
  }, [organizationalForm.salaryGradeId]);

  useEffect(() => {
    if (
      organizationalForm?.notchId !== "0" ||
      organizationalForm?.notchId !== undefined
    ) {
      const rate = notches.find((x) => x.id === organizationalForm?.notchId);
      setOrganizationalForm((prev) => ({
        ...prev,
        salaryRate: rate?.amount || organizationalForm?.salaryRate || "",
      }));
    }
    return () => {
      setOrganizationalForm((prev) => ({ ...prev, salaryRate: "" }));
    };
  }, [organizationalForm?.notchId]);

  useEffect(() => {
    if (organizationalForm?.isProbation) {
      probationMonthRef.current?.focus();
      probationMonthRef.current.style.border = "2px solid red";
    } else {
      probationMonthRef.current.value = "";
      setOrganizationalForm((prev) => ({ ...prev, probationMonth: "" }));
      probationMonthRef.current.style.border = "1px solid #e1e2e3";
    }
    return () => {
      // setOrganizationalForm((prev) => ({ ...prev, probationMonth: "" }));
    };
  }, [organizationalForm?.isProbation]);

  const handleProbationMonthFocusOut = () => {
    if ( +organizationalForm?.probationMonth <=0
    ) {
      probationMonthRef.current.style.border = "2px solid red";
      probationMonthRef.current.focus();
      return;
    } else {
      probationMonthRef.current.style.border = "1px solid green";
    }
  };

  const handleOnChange = (event) => {
    setOrganizationalForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const checkSalaryRate =()=>{}
  useEffect(() => {
    if (organizationalForm?.salaryRate === "") {
      setBorder(true);
    } else {
      setBorder(false);
    }



    return () => {};
  }, [organizationalForm?.salaryRate]);

  useEffect(() => {
    if (isSubmitBtnClick) {
      refs.forEach((ref) => {
        // if(ref.current !==null){
        //   console.log({organization: ref});
        // }
        if (ref.current.value.length > 0) {
          ref.current.style.border = "1px solid green";
        } else if (ref.current.value === "") {
          ref.current.style.border = "2px solid red";
        } else {
          ref.current.style.border = "2px solid red";
        }
      });

      if (organizationalForm?.salaryRate === "") {
        setBorder(true);
      }
      setIsSubmitBtnClick(false);
    }

    return () => {};
  }, [isSubmitBtnClick]);

 

  const checkForValue = (ref) => {
    if (ref.current.value.length > 0) {
      ref.current.style.border = "1px solid green";
    }
  };

  useEffect(() => {
    refs.forEach((ref) => {
      ref.current.style.border = "1px solid #e1e2e3";
    });

    setBorder(false);

    return () => {};
  }, [resetFormVal]);
  console.log(employeeStatusList);

  return (
    <>
      <CRow className={"bottom-spacing"}>
        <CCol md="6">
          <CRow>
            <CCol md="4">
              <CLabel>
                <CSLab code="HCM-6ADWUXU89T8_LASN" />
              </CLabel>
              <CSRequiredIndicator />
              <input
                className="form-control"
                placeholder={GetLabelByName("HCM-KVU6ZZOI9TR_LASN", lan)}
                name="staffId"
                value={organizationalForm?.staffId || ""}
                onChange={(e) => {
                  handleOnChange(e);
                  checkForValue(staffIdRef);
                }}
                ref={staffIdRef}
              />
            </CCol>
            <CCol md="5">
              <CLabel>
                <CSLab code="HCM-HL6HU7PY50C_KCMI" />
              </CLabel>
              <CSRequiredIndicator />
              <input
                className="form-control"
                name="hireDate"
                max={new Date().toISOString().slice(0, -14)}
                onKeyDown={(e) => e.preventDefault()}
                value={organizationalForm?.hireDate || ""}
                type="date"
                onChange={(e) => {
                  handleOnChange(e);
                  checkForValue(hireDateRef);
                }}
                ref={hireDateRef}
              />
              {/* <CInput name="hireDate" value={new Date()} onChange={handleOnChange} type="date" /> */}
            </CCol>
          </CRow>

          <CRow>
            <CCol md="12" style={{ marginTop: "2px" }}>
              <h6 className="ch-l-s">
                <CSLab code="HCM-5FP2JTH13DT-HRPR" />{" "}
              </h6>
            </CCol>
            <CCol md="4">
              <CLabel>
                <CSLab code="HCM-4D1SZ24U9UO" />
              </CLabel>
              <CSelect
                name="sectionId"
                value={organizationalForm?.sectionId || -1}
                onChange={handleOnChange}
              >
                <option value="">{GetLabelByName("HCM-2S3TJ25P51U_LASN", lan, "Select section")} </option>
                {sectionList.map((x, i) => (
                  <option key={x.id} value={x.id}>
                    {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                  </option>
                ))}
              </CSelect>
            </CCol>
            <CCol md="4">
              <CLabel>
                <CSLab code="HCM-N6I0LSIYJF" />
              </CLabel>
              <CSRequiredIndicator />
              <select
                className="form-control"
                name="departmentId"
                value={organizationalForm?.departmentId || ""}
                onChange={(e) => {
                  handleOnChange(e);
                  checkForValue(departmentIdRef);
                }}
                ref={departmentIdRef}
              >
               
                <option value="">{GetLabelByName("HCM-0APETFHDKISK-LASN", lan, "Select department")} </option>
                {departmentList.map((x, i) => (
                  <option key={x.id} value={x.id}>
                    {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                  </option>
                ))}
              </select>
            </CCol>
            <CCol md="4">
              <CLabel>
                <CSLab code="HCM-LAFPT6FJ57N" />
              </CLabel>
              <CSelect
                name="divisionId"
                value={organizationalForm?.divisionId || ""}
                onChange={handleOnChange}
              >
                
                <option value="">{GetLabelByName("HCM-N03SHYQ1ECP-KCMI", lan, "Select division")} </option>
                {divisionList.map((x, i) => (
                  <option key={x.id} value={x.id}>
                    {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                  </option>
                ))}
              </CSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="12"></CCol>
            <CCol md="4">
              <CLabel>
                <CSLab code="HCM-HMLNLPOEIXG" />
              </CLabel>
              <CSRequiredIndicator />
              <select
                className="form-control"
                name="employeeTypeId"
                value={organizationalForm?.employeeTypeId || ""}
                onChange={(e) => {
                  handleOnChange(e);
                  checkForValue(employeeTypeIdRef);
                }}
                ref={employeeTypeIdRef}
              >
                
                <option value="">{GetLabelByName("HCM-39I2LKM186T", lan, "Select Employee Type")} </option>
                {employeeTypeList.map((x, i) => (
                  <option key={x.id} value={x.id}>
                    {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                  </option>
                ))}
              </select>
            </CCol>
            <CCol md="4">
              <CLabel>
                <CSLab code="HCM-ATGLL367GOQ" />
              </CLabel>
              <CSelect
                name="positionId"
                value={organizationalForm?.positionId || ""}
                onChange={handleOnChange}
              >
               
                <option value="">{GetLabelByName("HCM-JPS5AVZ3EU-KCMI", lan, "Select position")} </option>
                {positionList.map((x, i) => (
                  <option key={x.id} value={x.id}>
                    {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                  </option>
                ))}
              </CSelect>
            </CCol>
            <CCol md="4">
              <CLabel>
                <CSLab code="HCM-DHV9W3RF11D" />
              </CLabel>
              <CSelect
                name="unitId"
                value={organizationalForm?.unitId || ""}
                onChange={handleOnChange}
              >
                
                <option value="">{GetLabelByName("HCM-12HRKJ3VLGIH_HRPR", lan, "Select unit")} </option>
                {unitList.map((x, i) => (
                  <option key={x.id} value={x.id}>
                    {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                  </option>
                ))}
              </CSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="4">
              <CLabel>
                <CSLab code="HCM-6XXECXM4Q5S" />
              </CLabel>
              <CSelect
                name="locationId"
                value={organizationalForm?.locationId || ""}
                onChange={handleOnChange}
              >
                <option value="00000000-0000-0000-0000-000000000000">
                {GetLabelByName("HCM-I77U99FH77D-LANG", lan, "Select location")}  
                </option>
               
                {locationList.map((x, i) => (
                  <option key={x.id} value={x.id}>
                    {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                  </option>
                ))}
              </CSelect>
            </CCol>
            <CCol md="4">
              <CLabel>
                <CSLab code="HCM-B4SZR3O5JPO-PSLL" />
              </CLabel>
              <CSRequiredIndicator />
              <select
                className="form-control"
                name="employeeStatusId"
                value={organizationalForm?.employeeStatusId || ""}
                onChange={(e) => {
                  handleOnChange(e);
                  checkForValue(employeeStatusIdRef);
                }}
                ref={employeeStatusIdRef}
              >
                <option value="00000000-0000-0000-0000-000000000000">  {GetLabelByName("HCM-7VR8XXS1YVK-LANG", lan, "Select status")}</option>

                {employeeStatusList.map((x, i) => (
                  <option key={i} value={x.id}>
                    {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                    {/* {x?.name} */}
                  </option>
                ))}
              </select>
            </CCol>
          </CRow>
        </CCol>

        <CCol md="1">
          <div className="vl" style={{ height: "45vh" }}></div>
        </CCol>

        <CCol md="5">
          <CRow>
            <CCol md="4" xs="4">
              <CSCheckbox
                label="HCM-MBLDMC4EA0H-HRPR"
                checked={organizationalForm?.isContract || false}
                name="isContract"
                onChange={(e) =>
                  setOrganizationalForm((prev) => ({
                    ...prev,
                    isContract: e.target.checked,
                  }))
                }
              />
            </CCol>

            <CCol md="8" xs="8">
              <CSCheckbox
                label="HCM-Y1ZMCB4FV0A-PSLL"
                checked={organizationalForm?.isSecondaryEmployment || false}
                name="isSecondaryEmployment"
                onChange={(e) =>
                  setOrganizationalForm((prev) => ({
                    ...prev,
                    isSecondaryEmployment: e.target.checked,
                  }))
                }
              />
            </CCol>
            </CRow>
            <CRow>
            <CCol md="4" xs="6">
              <CSCheckbox
                label="HCM-NJWYDCN6AFH-KCMI"
                checked={organizationalForm?.isOvertimeExempt || false}
                name="isOvertimeExempt"
                onChange={(e) =>
                  setOrganizationalForm((prev) => ({
                    ...prev,
                    isOvertimeExempt: e.target.checked,
                  }))
                }
              />
            </CCol>
            <CCol md="6" xs="6">
              <CSCheckbox
                label="HCM-MCMD5AEF1QJ-KCMI"//Pay Tax
                checked={organizationalForm?.isPayTax || false}
                name="isPayTax"
                onChange={(e) =>
                  setOrganizationalForm((prev) => ({
                    ...prev,
                    isPayTax: e.target.checked,
                  }))
                }
              />
            </CCol>
            
            </CRow>
            <CRow>
            <CCol md="4" xs="6" style={{ marginTop: "15px" }}>
              <CSCheckbox
                label="HCM-1PE5XKQHUDH-LANG"
                checked={organizationalForm?.isProbation || false}
                name="isProbation"
                onChange={(e) =>
                  setOrganizationalForm((prev) => ({
                    ...prev,
                    isProbation: e.target.checked,
                  }))
                }
              />
            </CCol>
            <CCol md="8" xs="6">
              <CLabel>
                <CSLab code="HCM-37G0RI11N7-LOLN" />
              </CLabel>
              <input
                className="form-control"
                ref={probationMonthRef}
                name="probationMonth"
                placeholder={GetLabelByName("HCM-4E1JWW6GREC_KCMI", lan)}
                value={organizationalForm?.probationMonth || ""}
                onChange={handleOnChange}
                disabled={organizationalForm?.isProbation ? false : true}
                onBlur={handleProbationMonthFocusOut}
              />
            </CCol>
          </CRow>

          <CRow>
            <CCol md="12" style={{ marginTop: "5px" }}>
              <h6 htmlFor="name" className="ch-l-s">
                <CSLab code="HCM-E6FV7KUTAIJ-PSLL" />
              </h6>
            </CCol>
            <CCol md="6">
              <CLabel>
                <CSLab code="HCM-PZP4MEYWDGH" />
              </CLabel>
              <CSRequiredIndicator />
              <select
                className="form-control"
                name="salaryGradeId"
                value={organizationalForm?.salaryGradeId || ""}
                onChange={(e) => {
                  handleOnChange(e);
                  checkForValue(salaryGradeIdRef);
                }}
                ref={salaryGradeIdRef}
              >
              
                <option value="">{GetLabelByName("HCM-S21O1901NO-LANG", lan, "Select Salary Grade")}</option>
                {salaryGradeList.map((x, i) => (
                  <option key={i} value={x.id}>
                    {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                  </option>
                ))}
              </select>
            </CCol>
            <CCol md="6">
              <CLabel>
                <CSLab code="HCM-EMJ8YGMQGH9_KCMI" />
              </CLabel>
              <CSelect
                name="notchId"
                value={
                  organizationalForm?.notchId || notchRef.current?.value ||""
                }
                onChange={handleOnChange}
                ref={notchRef}
                disabled={notcheSize > 0 ? false: true}
              >
                <option key={0} value={0}>{ GetLabelByName("HCM-WGN2SQIGAC_LOLN",lan,`Select Notch`)}</option>
                {notches.map((x, i) => (
                  <option key={i + 1} value={x.id} id={x.id}>{`Notch ${
                    i + 1
                  }`}</option>
                ))}
              </CSelect>
            </CCol>
            <CCol md="4">
              <CLabel>
                <CSLab code="HCM-CVBN0JP6CNQ_PSLL" />
              </CLabel>
              <CInput
                name="currency"
                value={organizationalForm?.currency || ""}
                onChange={handleOnChange}
                disabled
              />
            </CCol>
            <CCol md="4">
              <CLabel>
                <CSLab code="HCM-8SV0WSF3M27-KCMI" />
              </CLabel>
              <CInput
                name="salaryType"
                value={organizationalForm?.salaryType || ""}
                onChange={() => {}}
                disabled
              />
            </CCol>
            <CCol md="4" >
              <CLabel htmlFor="salaryRate">
                <CSLab code="HCM-PH98CHJVZO_KCMI" />
              </CLabel>
              <CSRequiredIndicator />

              <CurrencyFormat
                thousandSeparator={true}
                style={{
                  textAlign: "right",
                  border: border ? "2px solid red" : "1px solid #d8dbe0",
                }}
                name="salaryRate"
                value={organizationalForm?.salaryRate}
                disabled={notcheSize > 0 ? notches.length > 0 ? true : false : false}
                onChange={(e) =>{
                  setOrganizationalForm((prev) => ({
                    ...prev,
                    salaryRate: e.target.value,
                  }));

                  checkSalaryRate(e.target.value)

                }}
                placeholder={"0.00"}
                ref={salaryRateRef}
              />
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  );
};

export default OrganizationalForm;
