import { CCol, CForm, CInput, CLabel, CRow, CSelect } from "@coreui/react";
import React from "react";
import { CSLab, CSRequiredIndicator } from "src/reusable/components";
import moment from "moment";

function DependantForm() {
  return (
    <div>
      <CForm>
        <CRow>
          <CCol md="4">
            <CLabel htmlFor="firstName">
              <CSLab code="HCM-KPH53NF08RG" />{" "} <CSRequiredIndicator/>
            </CLabel>
            <CInput
              name="firstName"
              type="text"
              placeholder="Enter First Name"
            />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="lastName">
              <CSLab code="HCM-6CU7NZJCKLF" />{" "} <CSRequiredIndicator/>
            </CLabel>
            <CInput name="lastName" type="text" placeholder="Enter Last Name" />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="dateOfBirth">
              <CSLab code="HCM-XYNVK7A8USK_PSLL" />{" "} <CSRequiredIndicator/>
            </CLabel>
            <CInput
              name="dateOfBirth"
              type="date"
              max={moment().format("YYYY-MM-DD")}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol md="4">
            <CLabel htmlFor="address">
              <CSLab code="HCM-7WIK8PDIQOV-LOLN" />{" "} <CSRequiredIndicator/>
            </CLabel>
            <CInput name="address" type="text" placeholder="Enter Address" />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="relationTypeId">
              <CSLab code="HCM-RWMIP9K3NEH_HRPR" />{" "} <CSRequiredIndicator/>
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
              <CSLab code="HCM-IM8I8SKJ1J9_KCMI" />{" "} <CSRequiredIndicator/>
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
            <CLabel htmlFor="identityTypeId">
              <CSLab code="HCM-YIEJZNSN8L_PSLL" />{" "} <CSRequiredIndicator/>
            </CLabel>
            <CSelect name="identityTypeId">
              {["Select ID Type", "Voters Card", "Ghana Card"].map((x, i) => (
                <option key={i} value={x}>
                  {x}
                </option>
              ))}
            </CSelect>
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="identityNumber">
              <CSLab code="HCM-WJ7T6PUPMYD-LASN" />{" "} <CSRequiredIndicator/>
            </CLabel>
            <CInput
              name="identityNumber"
              type="text"
              placeholder="Enter ID Number"
            />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="dateOfExpiry">
              <CSLab code="HCM-JKZ3735Q4D-LOLN" />{" "} <CSRequiredIndicator/>
            </CLabel>
            <CInput name="dateOfExpiry" type="date" />
          </CCol>
        </CRow>
      </CForm>
    </div>
  );
}

export default DependantForm;
