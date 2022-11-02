import { CCol, CForm, CInput, CLabel, CRow, CSelect } from "@coreui/react";
import React from "react";
import { useSelector } from "react-redux";
import { CSLab, CSRequiredIndicator } from "src/reusable/components";
import { GetLabelByName } from "src/reusable/configs/config";

function EmergencyContactForm({
  currentFormData,
  handleFormChange,
  setCurrentFormData,
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
          <CCol md="4">
            <CLabel htmlFor="phone">
              <CSLab code="HCM-28JQRN57PA4-PSLL" /> <CSRequiredIndicator />
            </CLabel>
            <CInput
              name="phone"
              type="text"
              placeholder={GetLabelByName("HCM-4WKQXVS3API_LOLN",lan)}
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
