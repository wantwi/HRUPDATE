import { CCol, CForm, CInput, CLabel, CRow, CSelect } from "@coreui/react";
import React, { useState, useEffect } from "react";
import { CSLab, CSRequiredIndicator } from "src/reusable/components";
import moment from "moment";
import {
  GetRelationTypes,
  GetNationality,
} from "src/reusable/API/EmployeeRelationshipsEndPoint";
import { HttpAPIRequest } from "src/reusable/utils/helper";
import useMultiFetch from "src/hooks/useMultiFetch";

function GuarantorForm({
  currentFormData,
  handleFormChange,
  setCurrentFormData,
  view,
  nationality,
  id
}) {
  const [relationTypes, setRelationTypes] = useState([]);
  //const [nationality, setNationality] = useState([]);
  const [checkedTypes, setCheckedTypes] = useState([]);

  // useEffect(() => {
  //   setCurrentFormData("");
  // }, []);

  // const MultipleGetRequests = async () => {
  //   try {
  //     let request = [
  //       //HttpAPIRequest("GET", GetRelationTypes()),
  //       HttpAPIRequest("GET", GetNationality()),
  //     ];
  //     const multipleCall = await Promise.allSettled(request);
  //     console.log(multipleCall[0].value);

  //     setRelationTypes([...multipleCall[0].value]);
  //     setNationality([
  //       { id: "-1", name: `Select Nationality` },
  //       ...multipleCall[1].value,
  //     ]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  // useEffect(() => {
  //   MultipleGetRequests();
  // }, []);



  // const  {data:multicallData} =  useMultiFetch([GetNationality()], (results) => {
  //   setNationality([
  //     { id: "-1", name: `Select Nationality` },
  //     ...results[1].data,
  //   ]);
  
  // })

  // useEffect(() => {
  //   if (view.length >= 0) {
  //     DropDown();
  //   }
  // }, [view]);
  console.log({ Guaranto: view });

  return (
    <div>
      <CForm>
        <CRow>
          <CCol md="4">
            <CLabel htmlFor="firstName">
              <CSLab code="HCM-KPH53NF08RG" /> <CSRequiredIndicator />
            </CLabel>
            <CInput
              name="firstName"
              type="text"
              placeholder="Enter First Name"
              value={currentFormData?.firstName || ""}
              onChange={handleFormChange}
            />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="lastName">
              <CSLab code="HCM-6CU7NZJCKLF" />
              <CSRequiredIndicator />
            </CLabel>
            <CInput
              name="lastName"
              type="text"
              placeholder="Enter Last Name"
              value={currentFormData?.lastName || ""}
              onChange={handleFormChange}
            />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="phone">
              <CSLab code="HCM-28JQRN57PA4-PSLL" /> <CSRequiredIndicator />
            </CLabel>
            <CInput
              name="phone"
              type="text"
              placeholder="Enter Phone Number"
              value={currentFormData?.phone || ""}
              onChange={handleFormChange}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol md="4">
            <CLabel htmlFor="address">
              <CSLab code="HCM-7WIK8PDIQOV-LOLN" /> <CSRequiredIndicator />
            </CLabel>
            <CInput
              name="address"
              type="text"
              placeholder="Enter Address"
              value={currentFormData?.address || ""}
              onChange={handleFormChange}
            />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="relationId">
              <CSLab code="HCM-RWMIP9K3NEH_HRPR" /> <CSRequiredIndicator />
            </CLabel>
            <CSelect
              name="relationId"
              value={currentFormData?.relationId || -1}
              onChange={handleFormChange}
            >
              <option value={-1}> Select Relation</option>
              {view.map((x, i) => (
                <option key={i} value={x.id}>
                  {x.name}
                </option>
              ))}
            </CSelect>
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="nationalityId">
              <CSLab code="HCM-IM8I8SKJ1J9_KCMI" /> <CSRequiredIndicator />
            </CLabel>
            <CSelect
              name="nationalityId"
              value={currentFormData?.nationalityId || -1}
              onChange={handleFormChange}
            >
              {nationality.map((x, i) => (
                <option key={i} value={x.id}>
                  {x.name}
                </option>
              ))}
            </CSelect>
          </CCol>
        </CRow>
        <CRow>
          <CCol md="4">
            <CLabel htmlFor="email">
              <CSLab code="HCM-CXLK7IYZ9B9-KCMI" /> <CSRequiredIndicator />
            </CLabel>
            <CInput
              name="email"
              type="text"
              placeholder="Enter Email"
              value={currentFormData?.email || ""}
              onChange={handleFormChange}
            />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="occupation">
              <CSLab code="HCM-RZ2I74RYDFN-KCMI" /> <CSRequiredIndicator />
            </CLabel>
            <CInput
              name="occupation"
              type="text"
              placeholder="Enter Occupation"
              value={currentFormData?.occupation || ""}
              onChange={handleFormChange}
            />
          </CCol>
          {/* <CCol md="4">
            <CLabel htmlFor="dateOfExpiry">
              <CSLab code="HCM-JKZ3735Q4D-LOLN" />
            </CLabel>
            <CInput name="dateOfExpiry" type="date" />
          </CCol>  */}
        </CRow>
      </CForm>
    </div>
  );
}

export default GuarantorForm;
