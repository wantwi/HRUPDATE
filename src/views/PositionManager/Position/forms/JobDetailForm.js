import { CCol, CInput, CLabel, CRow, CTextarea } from "@coreui/react";
import React, { useRef, useState } from "react";
// import PhoneInput from "react-phone-number-input";
// import { useSelector } from "react-redux";
import useMultiFetch from "src/hooks/useMultiFetch";
import {
  GetAllGender,
  GetAllMarital,
  GetCountry,
  GetNationality,
  GetTitles,
} from "src/reusable/API/EmployeeDetailsEndpoints";
import {
  CSLab,
  CSLineLabel,
  CSRequiredIndicator,
} from "src/reusable/components";
// import { GetLabelByName } from "src/reusable/configs/config";
// import { validateEmail } from "src/reusable/utils/helper";
// import DefaultProfile from "../../../../assets/profile.png";
// import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
import useAuth from "src/hooks/useAuth";
import CurrencyInput from 'react-currency-input-field'
import useFetch from "src/hooks/useFetch";
import { moneyInTxt } from "src/reusable/utils/helper";

const JobDetailForm = ({ positionDetail: formData, setPositionDetail: setformData }) => {
  // const lan = useSelector((state) => state.language);
  const [genericData, setGenericData] = useState({});
  const codeRef = useRef(null);
  const nameRef = useRef(null);



  const { auth } = useAuth()
  const { companyReference: CompanyReference } = auth

  //  / refs ={{}}

  const multiFetchResponse = (response) => {
    let resObj = {};
    resObj.salaryGaradeList = response[0].data;
    resObj.paySettings = response[1].data;
    resObj.allPositions = response[2].data;

    console.log({ resObj });

    setGenericData(resObj);
  };

  useMultiFetch(
    [
      `/Employees/${CompanyReference}/SalaryGrades`,
      `/Pays/Settings`,
      `/Organisation/Positions/all`,

    ],
    multiFetchResponse
  );

  const { data, setUrl } = useFetch('')
  const { data: probationSG, setUrl: setUrlP_SG, isLoading } = useFetch('')
  //
  const handleSalaryGradeChangeEvent = (event) => {
    setUrl(`/Employees/SalaryGrades/${event?.target.value}/details`)

    setformData(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }
  const handleSalaryGradeChangeEvent2 = (event) => {
    setUrlP_SG(`/Employees/SalaryGrades/${event?.target.value}/details`)

    setformData(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }
  console.log({ handleSalaryGradeChangeEvent: data });

  const handleOnchangeEvent = (event) => {
    setformData(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))

  }



  return (
    <>
      <CRow className={"bottom-spacing"}>
        {/* Details */}
        <CCol md="5">

          <CRow>
            <CCol md="12" style={{ marginTop: "5px" }}>
              <CSLineLabel style={{ display: "none" }} name={"HCM-YD305CBYLEE_LOLN"} />
            </CCol>
            <CCol md="4">
              <CLabel>
                <CSLab code="HCM-7I262DWOU2R-LOLN" />
              </CLabel>
              <CSRequiredIndicator />
              <input
                type="text"
                className="form-control"
                placeholder="Enter code"
                name="code"
                onChange={handleOnchangeEvent}
                value={formData?.code || ""}
              />
            </CCol>

            <CCol md="8" xs="6">
              <CLabel>
                {/* <CSLab code="HCM-W7SKIIIFCKE_PSLL" /> */}
                Name
              </CLabel>
              <CSRequiredIndicator />
              <CInput
                placeholder="Enter Name"
                name="name"
                onChange={handleOnchangeEvent}
                value={formData?.name || ""}
              />
            </CCol>
          </CRow>
          <CRow className="mt-2">
            <CCol md="12">
              <CLabel>
                {/* <CSLab code="HCM-ZSJMVZ6F8MR-LOLN" />pppp */}
                Description
              </CLabel>
              <CTextarea
                placeholder="Brife description" //{GetLabelByName("HCM-AF2ZPOUARPA-PSLL", lan)}
                name="description"
                style={{ height: "60px", resize: "none" }}
                onChange={handleOnchangeEvent}
                value={formData?.description || ""}
              ></CTextarea>
            </CCol>
          </CRow>
          {/* new Row */}
          <CRow>
            <CCol md={4}>
              <CLabel className="mt-2">
                {/* <CSLab code="HCM-W7SKIIIFCKE_PSLL" /> */}
                Status
              </CLabel>
              <select className="form-control" name="status" onChange={handleOnchangeEvent} value={formData?.status || 0}>

                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </CCol>
          </CRow>


        </CCol>
        <CCol md="1">
          <div className="vl" style={{ height: "45vh" }}></div>
        </CCol>
        <CCol md="6">
          <CRow className="mt-2">
            <CCol md="4" xs="12">
              <CLabel>
                {/* <CSLab code="HCM-CSKVMLLGNW" /> */}
                Salary Grade
              </CLabel>
              <CSRequiredIndicator />
              <select
                name="salaryGradeId"
                className="form-control"
                onChange={handleSalaryGradeChangeEvent}
                value={formData?.salaryGradeId || ""}
              >

                <option value="">Select Salary Grade</option>
                {
                  genericData?.salaryGaradeList?.map(x => <option key={x?.id} value={x?.id}>{x?.name}</option>)
                }

              </select>
              <p hidden={isLoading} style={{ fontSize: 11, fontWeight: "bold" }}>
                {
                  `${data.length > 0 ? `(Min. ${moneyInTxt(data[0]?.maximumSalary, "en", 2)} - Max. ${moneyInTxt(data[0]?.maximumSalary, "en", 2)})` : ''}`
                }
              </p>
            </CCol>
            <CCol md="4" xs="12">
              <CLabel>
                {/* <CSLab code="HCM-CSKVMLLGNW" /> */}
                Probation Salary Grade
              </CLabel>
              <CSRequiredIndicator />
              <select
                name="probationSalaryGradeId"
                className="form-control"
                onChange={handleSalaryGradeChangeEvent2}
                value={formData?.probationSalaryGradeId || ""}
              >
                {/* <option value="">{GetLabelByName("HCM-SU6R69R7V1B-HRPR", lan, "Select country")}</option> */}
                <option value="" disabled selected>Select Probation Salary Grade</option>
                {
                  genericData?.salaryGaradeList?.map(x => <option key={x?.id} value={x?.id}>{x?.name}</option>)
                }
              </select>
              <p hidden={isLoading} style={{ fontSize: 11, fontWeight: "bold" }}>
                {
                  `${probationSG.length > 0 ? `(Min. ${moneyInTxt(probationSG[0]?.maximumSalary, "en", 2)} - Max. ${moneyInTxt(probationSG[0]?.maximumSalary, "en", 2)})` : ''}`
                }
              </p>
            </CCol>

            <CCol md="4" xs="12">
              <CLabel>
                {/* <CSLab code="HCM-IM8I8SKJ1J9_KCMI" /> */}
                Parent Position
              </CLabel>
              <CSRequiredIndicator />
              <select
                className="form-control"
                name="parentPositionId"
                onChange={handleOnchangeEvent}
                value={formData?.parentPositionId || ''}
              >
                {/* <option value="">{GetLabelByName("HCM-QBIJLIRXEVB-LASN", lan, "Select nationality")}</option> */}
                <option value="">Select Parent Position</option>
                {
                  genericData?.allPositions?.map(x => <option key={x?.id} value={x?.id}>{x?.name}</option>)
                }
              </select>
            </CCol>


          </CRow>
          {/* probation salary row */}

        </CCol>

        {/* <button onClick={(e) => { e.preventDefault(); console.log({ formData }) }} >Click</button> */}

      </CRow>
    </>
  );
};
export default JobDetailForm;
