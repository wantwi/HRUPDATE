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
import useMultiFetch from "src/hooks/useMultiFetch";
import { GetLabelByName } from "src/reusable/configs/config";
import { useSelector } from "react-redux";
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input";


function BeneficiaryForm({
  currentFormData,
  handleFormChange,
  setCurrentFormData,
  view,
  setPhone,
  phone
}) {
  const lan = useSelector((state) => state.language);


  const [relationTypes, setRelationTypes] = useState([]);
  useEffect(() => {
    setCurrentFormData("");
  }, []);

  const MultipleGetRequests = async () => {
    try {
      let request = [HttpAPIRequest("GET", GetRelationTypes())];
      const multipleCall = await Promise.allSettled(request);

      setRelationTypes([...multipleCall[0].value]);
    } catch (error) {
      console.log(error);
    }
  };
  // var beneficiaryArr = [];
  // const DropDown = () => {
  //   if (view.length > 0) {
  //     for (let i = 0; i < view.length; i++) {
  //       var obj = {};
  //       obj = view[i].relation;
  //       beneficiaryArr.push(obj);
  //     }

  //     const newdata = relationTypes.filter((val) => {
  //       return !beneficiaryArr.find((arr) => {
  //         console.log({ valueID: val.id + ": " + arr.id });
  //         return (
  //           (val.name === "Mother" && arr.name === "Mother") ||
  //           (val.name === "Father" && arr.name === "Father")
  //         );
  //       });
  //     });
  //     setCheckedBeneficiaryTypes(newdata);
  //     console.log(newdata);
  //   } else {
  //     setCheckedBeneficiaryTypes(relationTypes);
  //   }
  // };

  useEffect(() => {
    MultipleGetRequests();
  }, []);
  const  {data:multicallData} =  useMultiFetch([ GetRelationTypes(), ], (results) => {
    setRelationTypes([ ...results[0].data]);
       
  
  })

  // console.log({ relationTypes });
  // console.log({ checkedBeneficiaryTypes });

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
              placeholder={GetLabelByName("HCM-M45LNYXVT6_LASN",lan)}
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
              <CSLab code="HCM-7WIK8PDIQOV-LOLN" />
              {""} <CSRequiredIndicator />
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
            <CLabel htmlFor="relationId">
              <CSLab code="HCM-RWMIP9K3NEH_HRPR" />
              {""} <CSRequiredIndicator />
            </CLabel>
            <CSelect
              name="relationId"
              value={currentFormData?.relationId || -1}
              onChange={handleFormChange}
            >
              {" "}
              <option value={-1} selected>
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
            <CLabel htmlFor="percentage">
              <CSLab code="HCM-HB5MNHJGQE5-HRPR" />
              {""} <CSRequiredIndicator />
            </CLabel>
            <CInput
              name="percentage"
              type="text"   
              placeholder={GetLabelByName("HCM-L61W6YKKCF-HRPR",lan)}
              onChange={handleFormChange}
              value={currentFormData?.percentage || ""}
              autoComplete={"off"}
            />
          </CCol>
        </CRow>
      </CForm>
    </div>
  );
}

export default BeneficiaryForm;
