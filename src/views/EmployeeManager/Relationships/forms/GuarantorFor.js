import { CCol, CForm, CInput, CLabel, CRow, CSelect } from "@coreui/react";
import React from "react";
import { CSLab, CSRequiredIndicator } from "src/reusable/components";
import moment from "moment";

function GuarantorForm() {
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
            />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="lastName">
              <CSLab code="HCM-6CU7NZJCKLF" />
            </CLabel>
            <CInput name="lastName" type="text" placeholder="Enter Last Name" />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="phone">
              <CSLab code="HCM-28JQRN57PA4-PSLL" /> <CSRequiredIndicator />
            </CLabel>
            <CInput
              name="phone"
              type="number"
              placeholder="Enter Phone Number"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol md="4">
            <CLabel htmlFor="address">
              <CSLab code="HCM-7WIK8PDIQOV-LOLN" /> <CSRequiredIndicator />
            </CLabel>
            <CInput name="address" type="text" placeholder="Enter Address" />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="relationTypeId">
              <CSLab code="HCM-RWMIP9K3NEH_HRPR" /> <CSRequiredIndicator />
            </CLabel>
            <CSelect name="relationTypeId">
              {["Select Relation", "Father", "Mother"].map((x, i) => (
                <option key={i} value={x}>
                  {x}
                </option>
              ))}
            </CSelect>
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="nationalityId">
              <CSLab code="HCM-IM8I8SKJ1J9_KCMI" /> <CSRequiredIndicator />
            </CLabel>
            <CSelect name="nationalityId">
              {["Select Nationality", "Canadian", "South African"].map(
                (x, i) => (
                  <option key={i} value={x}>
                    {x}
                  </option>
                )
              )}
            </CSelect>
          </CCol>
        </CRow>
        <CRow>
          <CCol md="4">
            <CLabel htmlFor="email">
              <CSLab code="HCM-CXLK7IYZ9B9-KCMI" /> <CSRequiredIndicator />
            </CLabel>
            <CInput name="email" type="text" placeholder="Enter Email" />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="occupation">
              <CSLab code="HCM-RZ2I74RYDFN-KCMI" /> <CSRequiredIndicator />
            </CLabel>
            <CInput
              name="occupation"
              type="text"
              placeholder="Enter Occupation"
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
