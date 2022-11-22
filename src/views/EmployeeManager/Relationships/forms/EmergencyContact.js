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
  phone

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
            <CInput
              name="firstName"
              type="text"
              placeholder={GetLabelByName("HCM-M45LNYXVT6_LASN",lan)}
              value={currentFormData?.firstName || ""}
              onChange={handleFormChange}
            />
             
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="lastName">
              <CSLab code="HCM-6CU7NZJCKLF" /> <CSRequiredIndicator />
            </CLabel>
            <CInput
              name="lastName"
              type="text"
              placeholder={GetLabelByName("HCM-B6FYFT3XE6S_HRPR",lan)}
              value={currentFormData?.lastName || ""}
              onChange={handleFormChange}
            />
          </CCol>
          <CCol md="4" xs="6">
              <CLabel>
    <CSLab code="HCM-BOSPUEXHRP_PSLL" />
    </CLabel><CSRequiredIndicator />
          <PhoneInput
                  name ='phone'
              placeholder="Phone"
             value={currentFormData?.phone || phone ||  ''}
                 onChange={setPhone} 
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
              placeholder={GetLabelByName("HCM-AF2ZPOUARPA-PSLL",lan)}
              value={currentFormData?.address || ""}
              onChange={handleFormChange}
            />
          </CCol>
          
          <CCol md="4">
            <CLabel htmlFor="email">
              <CSLab code="HCM-CXLK7IYZ9B9-KCMI" /> <CSRequiredIndicator />
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
      </CForm>
    </div>
  );
}

export default EmergencyContactForm;
