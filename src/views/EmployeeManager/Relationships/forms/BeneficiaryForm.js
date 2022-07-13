import { CCol, CForm, CInput, CLabel, CRow, CSelect } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { CSLab, CSRequiredIndicator } from "src/reusable/components";
import {
  CardBodyHeight,
  GetRequest,
  HttpAPIRequest,
  PostRequest,
} from "src/reusable/utils/helper";
import { GetRelationTypes } from "src/reusable/API/EmployeeRelationshipsEndPoint";

function BeneficiaryForm({
  currentFormData,
  handleFormChange,
  setCurrentFormData,
}) {
  const [relationTypes, setRelationTypes] = useState([]);
  useEffect(() => {
    setCurrentFormData({});
  }, []);

  const MultipleGetRequests = async () => {
    try {
      let request = [HttpAPIRequest("GET", GetRelationTypes())];
      const multipleCall = await Promise.allSettled(request);
      console.log(multipleCall[0].value);

      setRelationTypes([
        { id: "-1", name: `Select Relation` },
        ...multipleCall[0].value,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    MultipleGetRequests();
  }, []);

  return (
    <div>
      <CForm>
        <CRow>
          <CCol md="4">
            <CLabel htmlFor="firstName">
              <CSLab code="HCM-KPH53NF08RG" />
              {""} <CSRequiredIndicator />
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
              {""} <CSRequiredIndicator />
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
              <CSLab code="HCM-28JQRN57PA4-PSLL" />
              {""} <CSRequiredIndicator />
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
              <CSLab code="HCM-7WIK8PDIQOV-LOLN" />
              {""} <CSRequiredIndicator />
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
              <CSLab code="HCM-RWMIP9K3NEH_HRPR" />
              {""} <CSRequiredIndicator />
            </CLabel>
            <CSelect
              name="relationId"
              value={currentFormData?.relationId || -1}
              onChange={handleFormChange}
            >
              {relationTypes.map((x, i) => (
                <option key={i} value={x.id}>
                  {x.name}
                </option>
              ))}
            </CSelect>
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="percentage">
              <CSLab code="HCM-HB5MNHJGQE5-HRPR" />
              {""} <CSRequiredIndicator />
            </CLabel>
            <CInput
              name="percentage"
              type="number"
              placeholder="Enter Percentage"
              onChange={handleFormChange}
              value={currentFormData?.percentage || ""}
            />
          </CCol>
        </CRow>
      </CForm>
    </div>
  );
}

export default BeneficiaryForm;
