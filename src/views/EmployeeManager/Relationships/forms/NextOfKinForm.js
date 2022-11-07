import { CCol, CForm, CInput, CLabel, CRow, CSelect } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { CSLab, CSRequiredIndicator } from "src/reusable/components";
import { HttpAPIRequest } from "src/reusable/utils/helper";
import {
  GetRelationTypes,
  GetNationality,
  GetIdTypes,
} from "src/reusable/API/EmployeeRelationshipsEndPoint";
import { useSelector } from "react-redux";
import { GetLabelByName } from "src/reusable/configs/config";

function NextOfKinForm({
 

  currentFormData,
  handleFormChange,
  setCurrentFormData,
  view,
  nationality,
  id
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
              <CSLab code="HCM-6CU7NZJCKLF" /> {""}
              <CSRequiredIndicator />
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
              <CSLab code="HCM-28JQRN57PA4-PSLL" /> {""}
              <CSRequiredIndicator />
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
            <CLabel htmlFor="otherPhone">
              <CSLab code="HCM-BIARUHXGKQ4-HRPR" /> {""}
      
            </CLabel>
            <CInput
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
            <CSelect
              name="relationId"
              value={currentFormData?.relationId || -1}
              onChange={handleFormChange}
            >
              <option value={-1}>Selection Relation</option>
              {view.map((x, i) => (
                <option key={i} value={x.id}>
                  {x.name}
                </option>
              ))}
            </CSelect>
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="nationalityId">
              <CSLab code="HCM-IM8I8SKJ1J9_KCMI" />
              {""}
              <CSRequiredIndicator />
            </CLabel>
            <CSelect
              name="nationalityId"
              value={currentFormData?.nationalityId || -1}
              onChange={handleFormChange}
            >
              {nationality.map((x, i) => (
                <option key={i} value={x.id}>
                  {x.name}
                </option>
              ))}
            </CSelect>
          </CCol>
        </CRow>
      </CForm>
    </div>
  );
}

export default NextOfKinForm;
