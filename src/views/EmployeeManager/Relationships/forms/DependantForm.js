import { CCol, CForm, CInput, CLabel, CRow, CSelect } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { CSLab, CSRequiredIndicator } from "src/reusable/components";
import moment from "moment";
import { useSelector } from "react-redux";
import { GetLabelByName } from "src/reusable/configs/config";
import {
  CardBodyHeight,
  GetRequest,
  HttpAPIRequest,
  PostRequest,
} from "src/reusable/utils/helper";
import {
  GetRelationTypes,
  GetNationality,
  GetIdTypes,
} from "src/reusable/API/EmployeeRelationshipsEndPoint";
import useMultiFetch from "src/hooks/useMultiFetch";

function DependantForm({
  currentFormData,
  handleFormChange,
  setCurrentFormData,
  view,
  id,
  nationality
}) {
  const lan = useSelector((state) => state.language);
  const [relationTypes, setRelationTypes] = useState([]);
  //const [nationality, setNationality] = useState([]);
  const [identityTypes, setIdentityTypes] = useState([]);
  const [checkedTypes, setCheckedTypes] = useState([]);

  // const MultipleGetRequests = async () => {
  //   try {
  //     let request = [
  //       HttpAPIRequest("GET", GetRelationTypes()),
  //       HttpAPIRequest("GET", GetNationality()),
  //       HttpAPIRequest("GET", GetIdTypes()),
  //     ];
  //     const multipleCall = await Promise.allSettled(request);
  //     console.log(multipleCall[0].value);

  //     setRelationTypes([...multipleCall[0].value]);
  //     setNationality([
  //       { id: "-1", name: `Select Nationality` },
  //       ...multipleCall[1].value,
  //     ]);
  //     setIdentityTypes([
  //       { id: "-1", name: `Select ID Type` },
  //       ...multipleCall[2].value,
  //     ]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };



  // const  {data:multicallData} =  useMultiFetch([ GetRelationTypes, 
  //   GetNationality(),GetIdTypes()], (results) => {


  //   console.log(results);

  //     setRelationTypes([...results[0].data]);
  //     setNationality([
  //       { id: "-1", name: `Select Nationality` },
  //       ...results[1].data,
  //     ]);
  //     setIdentityTypes([
  //       { id: "-1", name: `Select ID Type` },
  //       ...results[2].data,
  //     ]);


        
  
  // })


   console.log(relationTypes);
  // // console.log({ Checked: checkedTypes });

  // useEffect(() => {
  //   MultipleGetRequests();
  // }, []);

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
              value={currentFormData?.firstName || ""}
              placeholder={GetLabelByName("HCM-M45LNYXVT6_LASN",lan)}
              onChange={handleFormChange}
              // placeholder="First Name"
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
            <CLabel htmlFor="dateOfBirth">
              <CSLab code="HCM-XYNVK7A8USK_PSLL" /> <CSRequiredIndicator />
            </CLabel>
            <CInput
              name="dateOfBirth"
              type="date"
              value={currentFormData?.dateOfBirth || ""}
              onChange={handleFormChange}
              max={moment().format("YYYY-MM-DD")}
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
            <CLabel htmlFor="relationTypeId">
              <CSLab code="HCM-RWMIP9K3NEH_HRPR" /> <CSRequiredIndicator />
            </CLabel>
            <CSelect
              name="relationTypeId"
              value={currentFormData?.relationTypeId || -1}
              onChange={handleFormChange}
            >
              <option value={-1} selected>
                {" "}
                Select Relation
              </option>
              {view.map((x, i) => (
                <option key={i} value={x.id}>
                  {x.name}
                </option>
              ))}
            </CSelect>
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="nationalityId">
              <CSLab code="HCM-IM8I8SKJ1J9_KCMI" /> <CSRequiredIndicator />
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
        <CRow>
          <CCol md="4">
            <CLabel htmlFor="identityTypeId">
              <CSLab code="HCM-YIEJZNSN8L_PSLL" /> <CSRequiredIndicator />
            </CLabel>
            <CSelect
              name="identityTypeId"
              value={currentFormData?.identityTypeId || -1}
              onChange={handleFormChange}
            >
              {id.map((x, i) => (
                <option key={i} value={x.id}>
                  {x.name}
                </option>
              ))}
            </CSelect>
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="identityNumber">
              <CSLab code="HCM-WJ7T6PUPMYD-LASN" /> <CSRequiredIndicator />
            </CLabel>
            <CInput
              name="identityNumber"
              type="text"
              placeholder={GetLabelByName("HCM-WJ7T6PUPMYD-LASN",lan)}
              value={currentFormData?.identityNumber || ""}
              onChange={handleFormChange}
            />
          </CCol>
          <CCol md="4">
            <CLabel htmlFor="dateOfExpiry">
              <CSLab code="HCM-JKZ3735Q4D-LOLN" /> <CSRequiredIndicator />
            </CLabel>
            <CInput
              name="dateOfExpiry"
              type="date"
              value={currentFormData?.dateOfExpiry || ""}
              onChange={handleFormChange}
            />
          </CCol>
        </CRow>
      </CForm>
    </div>
  );
}

export default DependantForm;
