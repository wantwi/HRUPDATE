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
import { GetLabelByName } from "src/reusable/configs/config";
import { useSelector } from "react-redux";
import 'react-phone-number-input/style.css'

import PhoneInput from "react-phone-number-input";

function GuarantorForm({
  currentFormData,
  handleFormChange,
  setCurrentFormData,
  view,
  nationality,
  id,
  setPhone,
  phone,
  firstName,
  lastName,
  phoneRef,
  address,
  email,
  occupation,
  relation,
  nationalityRef,
  checkValue

}) {
  const lan = useSelector((state) => state.language);

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
            <input
            className="form-control"
            ref={firstName}
              name="firstName"
              type="text"
              placeholder={GetLabelByName("HCM-M45LNYXVT6_LASN",lan)}
              value={currentFormData?.firstName || ""}
              onChange={(e)=>{handleFormChange(e);checkValue(firstName)}}
            />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="lastName">
              <CSLab code="HCM-6CU7NZJCKLF" />
              <CSRequiredIndicator />
            </CLabel>
            <input
            className="form-control"
            ref={lastName}
              name="lastName"
              type="text"
              placeholder={GetLabelByName("HCM-B6FYFT3XE6S_HRPR",lan)}
              value={currentFormData?.lastName || ""}
              onChange={(e)=>{handleFormChange(e);checkValue(lastName)}}
            />
          </CCol>
          <CCol md="4" xs="6">
              <CLabel>
    <CSLab code="HCM-BOSPUEXHRP_PSLL" />
    </CLabel><CSRequiredIndicator />
          <PhoneInput
          ref={phoneRef}
                  name ='phone'
              placeholder="Phone"
             value={currentFormData?.phone || phone ||  ''}
                 onChange={(e)=>{setPhone(e);checkValue(phoneRef)}} 
        />
              </CCol>
        </CRow>
        <CRow>
          <CCol md="4">
            <CLabel htmlFor="address">
              <CSLab code="HCM-7WIK8PDIQOV-LOLN" /> <CSRequiredIndicator />
            </CLabel>
            <input
             className="form-control"
             ref={address}
              name="address"
              type="text"
              placeholder={GetLabelByName("HCM-AF2ZPOUARPA-PSLL",lan)}
              value={currentFormData?.address || ""}
              onChange={(e)=>{handleFormChange(e);checkValue(address)}}
            />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="relationId">
              <CSLab code="HCM-RWMIP9K3NEH_HRPR" /> <CSRequiredIndicator />
            </CLabel>
            <select
             className="form-control"
             ref={relation}
              name="relationId"
              value={currentFormData?.relationId || -1}
              onChange={(e)=>{handleFormChange(e);checkValue(relation)}}
            >
              <option value={-1}> Select Relation</option>
              {view.map((x, i) => (
                <option key={i} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="nationalityId">
              <CSLab code="HCM-IM8I8SKJ1J9_KCMI" /> <CSRequiredIndicator />
            </CLabel>
            <select
             className="form-control"
             ref={nationalityRef}
              name="nationalityId"
              value={currentFormData?.nationalityId || -1}
              onChange={(e)=>{handleFormChange(e);checkValue(nationalityRef)}}
            >
              {nationality.map((x, i) => (
                <option key={i} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>
          </CCol>
        </CRow>
        <CRow>
          <CCol md="4">
            <CLabel htmlFor="email">
              <CSLab code="HCM-CXLK7IYZ9B9-KCMI" /> <CSRequiredIndicator />
            </CLabel>
            <input
            className="form-control"
            ref={email}
              name="email"
              type="text"
              placeholder={GetLabelByName("HCM-61522DCMNA-LANG",lan)}
              value={currentFormData?.email || ""}
              onChange={(e)=>{handleFormChange(e);checkValue(email)}}
            />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="occupation">
              <CSLab code="HCM-RZ2I74RYDFN-KCMI" /> <CSRequiredIndicator />
            </CLabel>
            <input
            className="form-control"
            ref={occupation}
              name="occupation"
              type="text"
              placeholder={GetLabelByName("HCM-4NXC09IAZ2V-HRPR",lan)}
              value={currentFormData?.occupation || ""}
              onChange={(e)=>{handleFormChange(e);checkValue(occupation)}}
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
