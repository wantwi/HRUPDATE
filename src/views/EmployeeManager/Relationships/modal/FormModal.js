import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import BeneficiaryForm from "../forms/BeneficiaryForm";
import DependantForm from "../forms/DependantForm";
import EmergencyContactForm from "../forms/EmergencyContact";
import GuarantorForm from "../forms/GuarantorFor";
import NextOfKinForm from "../forms/NextOfKinForm";
import { CSLab, CSRequiredIndicator } from "src/reusable/components";

const FormModal = (props) => {
  const { show, setShow, activeKey, submitBtn, setCurrentFormData } = props;
  const [formTitle, setFormTitle] = useState("");

  useEffect(() => {
    setCurrentFormData({});
    if (activeKey === 1) {
      setFormTitle("Beneficiary");
    }
    if (activeKey === 2) {
      setFormTitle("Dependant");
    }
    if (activeKey === 6) {
      setFormTitle("Emergency Contact");
    }
    if (activeKey === 3) {
      setFormTitle("Guarantor");
    }
    if (activeKey === 4) {
      setFormTitle("Next Of Kin");
    }
  }, [activeKey]);

  // let conten= null
  // if(activeKey === 1){
  //   conten = <BeneficiaryForm />
  // }
  // if(activeKey === 2){
  //   conten = <DependantForm />
  // }
  // if(activeKey === 6){
  //   conten = <EmergencyContactForm />
  // }
  // if(activeKey === 3){
  //   conten = <GuarantorForm />
  // }
  // if(activeKey === 4){
  //   conten = <NextOfKinForm />
  // }

  return (
    <CModal show={show} onClose={() => setShow(!show)} size={"lg"}>
      <CModalHeader closeButton>
        <CModalTitle>Add {formTitle}</CModalTitle>
      </CModalHeader>
      <CModalBody>{props.children}</CModalBody>
      <CModalFooter>
        <div style={{ fontSize: "10px", marginRight: "435px" }}>
          <p>
            <em>
              <CSLab code="HCM-WKZ2Y0KPTT9-PSLL" /> (<CSRequiredIndicator />)
            </em>
          </p>
        </div>
        <CButton
          color="secondary"
          onClick={() => {
            setShow(false);
            setCurrentFormData(" ");
          }}
        >
          Close
        </CButton>
        <CButton color="primary" onClick={submitBtn}>
          Save
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default FormModal;
