import {
  CButton,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSelect,
  CTextarea,
} from "@coreui/react";

import React, { useState, useEffect } from "react";
import { AiFillSave, AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import useAuth from "src/hooks/useAuth";
import {
  CSCheckbox,
  CSLab,
  CSRequiredIndicator,
} from "src/reusable/components";
import { GetLabelByName } from "src/reusable/configs/config";
import DescriptionTable from "../table/DescriptionTable";
// const COMPANY_REFRENCE = "00001_A01";

const init = {
  name: "",
  description: "",
  reportingCycle: -1
}
const rpClcle = ['Daily', 'Weekly', 'Monthly', 'Bi-Monthly', 'Quarterly']

const Description = ({ descriptions: gridData, setDescriptions: setGridData }) => {

  const { auth } = useAuth()
  const { companyReference: COMPANY_REFRENCE } = auth
  const lan = useSelector((state) => state.language);
  const [showModal, setshowModal] = useState(false)
  const [paymentInfoFormData, setPaymentInfoFormData] = useState(null);
  const [formData, setformData] = useState(init)
  const [canAdd, setCanAdd] = useState(false)

  const handleAddNewAccount = () => {
    setshowModal(true)
  };

  const handleChamgeEvent = (event) => {

    setformData((prev) => ({
      ...prev,
      [event.target.name]: event.target?.value
    }))

  }

  const addToGridBtn = () => {
    const obj = {}

    obj.name = formData?.name
    obj.description = formData?.description
    obj.reportingCycle = formData?.reportingCycle
    obj.reportingCycleText = rpClcle[Number(formData?.reportingCycle)]
    obj.count = gridData.length + 1

    console.log({ obj });

    setGridData(prev => ([
      ...prev,
      obj

    ]))
    setformData(init)

  }

  useEffect(() => {

    if (formData?.name && formData?.reportingCycle && formData?.description) {
      setCanAdd(true)
    } else {
      setCanAdd(false)
    }

    return () => {

    }
  }, [formData])


  return (
    <>
      <CRow>
        <CCol md="12" className="text-right">
          <CFormGroup>
            <CButton
              type="button"
              onClick={handleAddNewAccount}
              size="sm"
              color="primary"
            >
              {" "}
              <AiOutlinePlus />
              Add Description
              {/* <CSLab code={"HCM-5W6FDEX4795-LASN"} />{" "} */}
            </CButton>
          </CFormGroup>
        </CCol>
        <CCol md="12">
          <DescriptionTable setGridData={setGridData} data={gridData} lan={lan} />
        </CCol>
      </CRow>
      <CModal
        size={""}
        show={showModal}
        onClose={() => { setshowModal(!showModal); setPaymentInfoFormData(null) }}
        closeOnBackdrop={false}
      >
        <CModalHeader onClose={() => { }}>
          <CModalTitle>
            {" "}
            {/* <CSLab code="HCM-WM35S647NT_LOLN" />{" "} */}
            Add Job Description
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>

            <CCol md={12}>
              <CLabel>
                {/* <CSLab code="HCM-W7SKIIIFCKE_PSLL" /> */}
                Activity
              </CLabel>
              <CInput
                placeholder="Enter Task Name"
                name="name"
                onChange={handleChamgeEvent}
                value={formData?.name}
              />
            </CCol>
            <CCol md={12}>
              <CLabel className="mt-2">
                {/* <CSLab code="HCM-ZSJMVZ6F8MR-LOLN" />pppp */}
                Description
              </CLabel>
              <CTextarea
                placeholder="Brife description" //{GetLabelByName("HCM-AF2ZPOUARPA-PSLL", lan)}
                name="description"
                onChange={handleChamgeEvent}
                value={formData?.description}
                style={{ height: "60px", resize: "none" }}
              ></CTextarea>

            </CCol>
            <CCol md={4}>
              <CLabel className="mt-2">
                {/* <CSLab code="HCM-W7SKIIIFCKE_PSLL" /> */}
                Reporting cycle
              </CLabel>
              <select className="form-control" name="reportingCycle" value={formData?.reportingCycle} onChange={handleChamgeEvent}>
                <option value={-1}>Select cycle </option>
                <option value={0}>Daily</option>
                <option value={1}>Weekly</option>
                <option value={2}>Monthly</option>
                <option value={3}>Bi-Monthly</option>
                <option value={4}>Quarterly</option>
              </select>
            </CCol>

            <CCol md={8} hidden>
              <CLabel className="mt-2">
                {/* <CSLab code="HCM-W7SKIIIFCKE_PSLL" /> */}
                Remarks
              </CLabel>
              <CInput
                placeholder="Enter Remarks"
                name="name"
              />
            </CCol>

          </CRow>
        </CModalBody>
        <CModalFooter>
          {/*  */}
          <CButton color="secondary" size="sm" onClick={() => { setshowModal(!showModal); setPaymentInfoFormData(null) }}>
            <AiOutlineClose size={20} />
            {GetLabelByName("HCM-9E3ZC2E1S0N-LASN", lan, "Close")}
          </CButton>
          <CButton
            onClick={addToGridBtn}
            // style={{ marginRight: 5, float: "right", cursor: paymentInfoFormData?.isDefault ? "pointer" : canAdd ? "pointer" : "not-allowed" }}
            type="button"
            size="sm"
            color="success"
            disabled={!canAdd}
          >
            <AiFillSave size={20} />

            {GetLabelByName("HCM-TAAFD4M071D-HRPR", lan, "Add")}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Description;
