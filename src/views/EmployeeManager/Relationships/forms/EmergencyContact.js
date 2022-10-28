import { CCol, CForm, CInput, CLabel, CRow, CSelect } from "@coreui/react";
import React from "react";
import { CSLab, CSRequiredIndicator } from "src/reusable/components";

function EmergencyContactForm({
  currentFormData,
  handleFormChange,
  setCurrentFormData,
}) {
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
              value={currentFormData?.firstName || " "}
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
              placeholder="Enter Last Name"
              value={currentFormData?.lastName || " "}
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
              value={currentFormData?.phone || " "}
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
              value={currentFormData?.address || " "}
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
              placeholder="Enter Email"
              value={currentFormData?.email || " "}
              onChange={handleFormChange}
            />
          </CCol>
        </CRow>
      </CForm>
    </div>
  );
}

export default EmergencyContactForm;
