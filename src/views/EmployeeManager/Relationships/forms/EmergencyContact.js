import { CCol, CForm, CInput, CLabel, CRow, CSelect } from "@coreui/react";
import React from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input";
import { useSelector } from "react-redux";
import { CSLab, CSRequiredIndicator } from "src/reusable/components";
import { GetLabelByName } from "src/reusable/configs/config";

function EmergencyContactForm({
  currentFormData,
  handleFormChange,
  setCurrentFormData,
  setPhone,
  phone,
  checkValue,
  firstNameref,
  lastNameref,
  phonref,
  addressref,
  emailRef
  
  

}) {
  
  const lan = useSelector((state) => state.language);

  return (
    <div>
      <CForm>
        <CRow>
          <CCol md="4">
            <CLabel htmlFor="firstName">
              <CSLab code="HCM-KPH53NF08RG" /> <CSRequiredIndicator />
            </CLabel>
            <input
              name="firstName"
              className="form-control"
              ref={firstNameref}
              type="text"
              placeholder={GetLabelByName("HCM-M45LNYXVT6_LASN",lan)}
              value={currentFormData?.firstName || ""}
              onChange={(e)=>{handleFormChange(e); checkValue(firstNameref)}}
            />
             
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="lastName">
              <CSLab code="HCM-6CU7NZJCKLF" /> <CSRequiredIndicator />
            </CLabel>
            <input
              className="form-control"
              name="lastName"
              ref={lastNameref}
              type="text"
              placeholder={GetLabelByName("HCM-B6FYFT3XE6S_HRPR",lan)}
              value={currentFormData?.lastName || ""}
              onChange={(e)=>{handleFormChange(e); checkValue(lastNameref)}}
            />
          </CCol>
          <CCol md="4" xs="6">
              <CLabel>
    <CSLab code="HCM-BOSPUEXHRP_PSLL" />
    </CLabel><CSRequiredIndicator />
          <PhoneInput
           ref={phonref}
                  name ='phone'
              placeholder="Phone"
             value={currentFormData?.phone || phone ||  ''}
             onChange={(e)=>{setPhone(e); checkValue(phonref)} }
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
              name="address"
              type="text"
              ref={addressref}
              placeholder={GetLabelByName("HCM-AF2ZPOUARPA-PSLL",lan)}
              value={currentFormData?.address || ""}
              onChange={(e)=>{handleFormChange(e); checkValue(addressref)}}
            />
          </CCol>
          
          <CCol md="4">
            <CLabel htmlFor="email">
              <CSLab code="HCM-CXLK7IYZ9B9-KCMI" /> <CSRequiredIndicator />
            </CLabel>
            <input
             className="form-control"
              name="email"
              ref={emailRef}
              type="text"
              placeholder={GetLabelByName("HCM-61522DCMNA-LANG",lan)}
              value={currentFormData?.email || ""}
              onChange={(e)=>{handleFormChange(e); checkValue(emailRef)}}
            />
          </CCol>
        </CRow>
      </CForm>
    </div>
  );
}

export default EmergencyContactForm;
