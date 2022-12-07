import { CCol, CLabel, CRow, CSelect, CTextarea } from "@coreui/react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useAuth from "src/hooks/useAuth";
import useMultiFetch from "src/hooks/useMultiFetch";
import { GetPayrollHours } from "src/reusable/API/EmployeeDetailsEndpoints";
import { CSLab, CSLineLabel } from "src/reusable/components";
import { GetLabelByName } from "src/reusable/configs/config";
import { isValidNumber } from "src/reusable/utils/helper";
const COMPANY_REFRENCE = "00001_A01";


const OtherInfoForm = ({ otherInfoFormData, setOtherInfoFormData }) => {
  const lan = useSelector((state) => state.language);
  const percentageRef = useRef(null)

  const [genericData, setGenericData] = useState({});
  const handleOnChange = (event) => {
    setOtherInfoFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const {auth}= useAuth()
  const {companyReference: CompanyReference } = auth

  const multiFetchResponse = (response) => {
    let resObj = {};
    resObj.payrollHoursList = response[0].data;

    setGenericData(resObj);
  };

  const { payrollHoursList = [] } = genericData;

  useMultiFetch([GetPayrollHours(CompanyReference)], multiFetchResponse);
  const handleOnFocusout = () => {
    if (!isValidNumber(otherInfoFormData?.percentageOfBasic)) {
      percentageRef.current.focus()
      percentageRef.current.style.border = "1px solid red"
      setOtherInfoFormData(prev =>({...prev,percentageOfBasic:""}))
    }else{
      percentageRef.current.style.border = "1px solid #e1e2e3"
    }
  }

  useEffect(() => {
    if (otherInfoFormData?.percentageOfBasic.length > 0) {
      if (!isValidNumber(otherInfoFormData?.percentageOfBasic)) {
        percentageRef.current.focus()
        percentageRef.current.style.border = "1px solid red"
      }else{
        percentageRef.current.style.border = "1px solid #e1e2e3"
      }
    }

    return () => {};
  }, [otherInfoFormData.percentageOfBasic]);

  return (
    <>
      <CRow>
        <CCol md="6">
          <CRow>
            <CCol md="12">
              <CSLineLabel name="HCM-E6FV7KUTAIJ-PSLL" />{" "}
            </CCol>
          </CRow>
          <CRow>
            <CCol md="6">
              <CLabel>
                <CSLab code="HCM-9LAWIPOM3V" />
              </CLabel>
              <CSelect
                name="payrollHourId"
                value={otherInfoFormData?.payrollHourId || -1}
                onChange={handleOnChange}
              >
              
                <option value="">{GetLabelByName("HCM-ZYB0UGLFZT9_HRPR", lan,"Select payroll hour")}</option>
                {payrollHoursList.map((x, i) => (
                  <option key={x.id} value={x.id}>
                   {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                  </option>
                ))}
              </CSelect>
            </CCol>
            <CCol md="6" style={{ textAlign: "right" }}>
              <CLabel>
                <CSLab code="HCM-6QY4DPP3GS_LANG" />
              </CLabel>
              <input 
              className="form-control"
                placeholder={"0.00"}
                style={{ textAlign: "right" }}
                name="percentageOfBasic"
                value={otherInfoFormData?.percentageOfBasic || ""}
                onChange={handleOnChange}
                ref={percentageRef}
                onBlur={handleOnFocusout}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="12">
              <CLabel>
                <CSLab code="HCM-4OJ0M8OPPGO-PSLL" />
              </CLabel>
              <CTextarea
                placeholder={GetLabelByName("HCM-Z0FV0XJJ06", lan)}
                name="paySlipNote"
                value={otherInfoFormData?.paySlipNote}
                onChange={handleOnChange}
                style={{ height: "60px", resize: "none" }}
              ></CTextarea>
            </CCol>
          </CRow>
        </CCol>

        <CCol md="1">
          <div className="vl" style={{ height: "45vh" }}></div>
        </CCol>
      </CRow>
    </>
  );
};

export default OtherInfoForm;
