import { CCol, CForm, CInput, CLabel, CRow, CSelect } from "@coreui/react";
import React from "react";
import { CSLab, CSRequiredIndicator } from "src/reusable/components";


function NextOfKinForm() {




  return (
    <div>
      <CForm>
        <CRow>
          <CCol md="4">
            <CLabel htmlFor="firstName">
              <CSLab code="HCM-KPH53NF08RG" /> {""}
             <CSRequiredIndicator/>
            </CLabel>
            <CInput
              name="firstName"
              type="text"
              placeholder="Enter First Name"
            />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="lastName">
              <CSLab code="HCM-6CU7NZJCKLF" /> {""}
             <CSRequiredIndicator/>
            </CLabel>
            <CInput name="lastName" type="text" placeholder="Enter Last Name" />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="phone">
              <CSLab code="HCM-28JQRN57PA4-PSLL" /> {""}
             <CSRequiredIndicator/>
            </CLabel>
            <CInput name="phone" type="text" placeholder="Enter Phone Number" />
          </CCol>
        </CRow>
        <CRow>
          <CCol md="4">
            <CLabel htmlFor="otherPhone">
              <CSLab code="HCM-BIARUHXGKQ4-HRPR" /> {""}
             <CSRequiredIndicator/>
            </CLabel>
            <CInput
              name="otherPhone"
              type="text"
              placeholder="Enter Phone Number"
            />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="address">
              <CSLab code="HCM-7WIK8PDIQOV-LOLN" /> {""}
             <CSRequiredIndicator/>
            </CLabel>
            <CInput name="address" type="text" placeholder="Enter Address" />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="email">
              <CSLab code="HCM-CXLK7IYZ9B9-KCMI" />{" "} <CSRequiredIndicator/>
            </CLabel>
            <CInput name="email" type="text" placeholder="Enter Email" />
          </CCol>
        </CRow>
        <CRow>
          <CCol md="4">
            <CLabel htmlFor="relationId">
              <CSLab code="HCM-RWMIP9K3NEH_HRPR" /> {""}
             <CSRequiredIndicator/>
            </CLabel>
            <CSelect name="relationId">
              {["Select Relation", "Male", "Female"].map((x, i) => (
                <option key={i} value={x}>
                  {x}
                </option>
              ))}
            </CSelect>
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="nationalId">
              <CSLab code="HCM-IM8I8SKJ1J9_KCMI" />{""}
              <CSRequiredIndicator/>
            </CLabel>
            <CSelect name="nationalId">
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
      </CForm>
    </div>
  );
}

export default NextOfKinForm;
