import { CCol, CForm, CInput, CLabel, CRow, CSelect } from "@coreui/react";
import React, { useEffect, useState } from "react";
import 'react-phone-number-input/style.css'

import { CSLab, CSRequiredIndicator } from "src/reusable/components";
import { HttpAPIRequest } from "src/reusable/utils/helper";
import {
  GetRelationTypes,
  GetNationality,
  GetIdTypes,
} from "src/reusable/API/EmployeeRelationshipsEndPoint";
import { useSelector } from "react-redux";
import { GetLabelByName } from "src/reusable/configs/config";
import PhoneInput from "react-phone-number-input";

function NextOfKinForm({
 

  currentFormData,
  handleFormChange,
  setCurrentFormData,
  view,
  nationality,
  id,
  setPhone,
  phone,firstNameRef,lastNameRef,phoneRef,AddressRef,relationRef,nationalityRef,checkValue
}) {
  const lan = useSelector((state) => state.language);
  const [relationTypes, setRelationTypes] = useState([]);
  // const [nationality, setNationality] = useState([]);
  const [identityTypes, setIdentityTypes] = useState([]);

  // const MultipleGetRequests = async () => {
  //   try {
  //     let request = [
  //       HttpAPIRequest("GET", GetRelationTypes()),
  //       HttpAPIRequest("GET", GetNationality()),
  //     ];
  //     const multipleCall = await Promise.allSettled(request);

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

  console.log({ NextOfKin: view });
  return (
    <div>
      <CForm>
        <CRow>
          <CCol md="4">
            <CLabel htmlFor="firstName">
              <CSLab code="HCM-KPH53NF08RG" /> {""}
              <CSRequiredIndicator />
            </CLabel>
            <input
            className="form-control"
            ref={firstNameRef}
              name="firstName"
              type="text"
              placeholder={GetLabelByName("HCM-M45LNYXVT6_LASN",lan)}
              value={currentFormData?.firstName || ""}
              onChange={(e)=>{handleFormChange(e);checkValue(firstNameRef)}}
            />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="lastName">
              <CSLab code="HCM-6CU7NZJCKLF" /> {""}
              <CSRequiredIndicator />
            </CLabel>
            <input
            className="form-control"
            ref={lastNameRef}
              name="lastName"
              type="text"
              placeholder={GetLabelByName("HCM-B6FYFT3XE6S_HRPR",lan)}
              value={currentFormData?.lastName || ""}
              onChange={(e)=>{handleFormChange(e);checkValue(lastNameRef)}}
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
                 onChange={(e)=>{setPhone(e);checkValue(phoneRef)} }
        />
              </CCol>
        </CRow>
        <CRow>
          <CCol md="4">
            <CLabel htmlFor="otherPhone">
              <CSLab code="HCM-BIARUHXGKQ4-HRPR" /> {""}
      
            </CLabel>
            <input

              name="otherPhone"
              type="text"
              placeholder="Enter Phone Number"
              value={currentFormData?.otherPhone || ""}
              onChange={handleFormChange}
            />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="address">
              <CSLab code="HCM-7WIK8PDIQOV-LOLN" /> {""}
              <CSRequiredIndicator />
            </CLabel>
            <input
            ref={AddressRef}
            className="form-control"
              name="address"
              type="text"
              placeholder={GetLabelByName("HCM-AF2ZPOUARPA-PSLL",lan)}
              value={currentFormData?.address || ""}
              onChange={(e)=>{handleFormChange(e);checkValue(AddressRef)}}
            />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="email">
              <CSLab code="HCM-CXLK7IYZ9B9-KCMI" /> 
            </CLabel>
            <CInput
            
              name="email"
              type="text"
              placeholder={GetLabelByName("HCM-61522DCMNA-LANG",lan)}
              value={currentFormData?.email || ""}
              onChange={handleFormChange}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol md="4">
            <CLabel htmlFor="relationId">
              <CSLab code="HCM-RWMIP9K3NEH_HRPR" /> {""}
              <CSRequiredIndicator />
            </CLabel>
            <select
            ref={relationRef}
            className="form-control"
              name="relationId"
              value={currentFormData?.relationId || -1}
              onChange={(e)=>{handleFormChange(e);checkValue(relationRef)}}
            >
              <option value={-1}>Selection Relation</option>
              {view.map((x, i) => (
                <option key={i} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="nationalityId">
              <CSLab code="HCM-IM8I8SKJ1J9_KCMI" />
              {""}
              <CSRequiredIndicator />
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
      </CForm>
    </div>
  );
}

export default NextOfKinForm;
