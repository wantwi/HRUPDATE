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
import ExperienceTable from "../table/ExperienceTable";
import useFetch from "src/hooks/useFetch";
// const COMPANY_REFRENCE = "00001_A01";

const init = { prevPositionId: "", roleLevelId: "", expMonth: "" }


const Experience = ({ setExperiences: setGridData, experiences: gridData, data = [], roleLevels = [] }) => {

  const { auth } = useAuth()
  const { companyReference: COMPANY_REFRENCE } = auth
  const lan = useSelector((state) => state.language);
  const [showModal, setshowModal] = useState(false)
  const [paymentInfoFormData, setPaymentInfoFormData] = useState(null);
  const [formData, setformData] = useState(init)
  const [canAdd, setCanAdd] = useState(false)
  // const [gridData, setGridData] = useState([]);



  const handleAddNewAccount = () => {
    setshowModal(true)
  };

  const handleChamgeEvent = (event) => {

    setformData((prev) => ({
      ...prev,
      [event.target.name]: event.target?.value
    }))

  }

  const getMonthRangeText = (month) => {
    switch (month) {
      case '12':
        return '0 - 12'
      case '24':
        return '13 - 24'
      case '36':
        return '25 - 36'
      case '37':
        return '37+'
    }
  }

  const addToGridBtn = () => {
    const obj = {}
    const pos = data[0]?.items.find(x => x?.id === formData?.prevPositionId)
    obj.expMonth = formData?.expMonth
    obj.id = formData?.prevPositionId
    obj.name = pos?.name
    obj.roleLevelId = formData?.roleLevelId
    obj.roleLevelName = roleLevels[0]?.items.find(x => x?.id === formData?.roleLevelId)?.name
    obj.expMonthText = getMonthRangeText(formData?.expMonth)
    obj.count = gridData.length + 1
    setGridData(prev => ([
      ...prev,
      obj

    ]))
    setformData(init)

  }

  useEffect(() => {

    if (formData?.prevPositionId && formData?.expMonth && formData?.roleLevelId) {
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
              <AiOutlinePlus /> Add Experience
              {/* <CSLab code={"HCM-5W6FDEX4795-LASN"} />{" "} */}
            </CButton>
          </CFormGroup>
        </CCol>
        <CCol md="12">
          <ExperienceTable data={gridData} setGridData={setGridData} lan={lan} />
        </CCol>
      </CRow>
      <CModal
        size={""}
        show={showModal}
        onClose={() => { setshowModal(!showModal) }}
        closeOnBackdrop={false}
      >
        <CModalHeader onClose={() => { }}>
          <CModalTitle>
            {" "}
            {/* <CSLab code="HCM-WM35S647NT_LOLN" />{" "} */}
            Add Required Experience
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>

            <CCol md={12}>
              <CLabel>
                {/* <CSLab code="HCM-W7SKIIIFCKE_PSLL" /> */}
                Position
              </CLabel>
              <select className="form-control" value={formData?.prevPositionId} name="prevPositionId" onChange={handleChamgeEvent}>
                <option value={""}>Select Position</option>
                {
                  data[0]?.items?.map(x => <option key={x?.id} value={x?.id} >{x?.name}</option>)
                }
              </select>
            </CCol>

            <CCol md={4}>
              <CLabel className="mt-2">
                {/* <CSLab code="HCM-W7SKIIIFCKE_PSLL" /> */}
                Experience (Month)
              </CLabel>
              <select className="form-control" name="expMonth" value={formData?.expMonth} onChange={handleChamgeEvent}>
                <option value={""}>Select Months of Experience </option>
                <option value={12}>0 - 12</option>
                <option value={24}>13 - 24</option>
                <option value={36}>25 - 36</option>
                <option value={37}> 37 +</option>
              </select>
            </CCol>

            <CCol md={8}>
              <CLabel className="mt-2">
                {/* <CSLab code="HCM-W7SKIIIFCKE_PSLL" /> */}
                Role Level
              </CLabel>
              <select className="form-control" value={formData?.roleLevelId} name="roleLevelId" onChange={handleChamgeEvent}>
                <option selected >Select Role Level</option>

                {
                  roleLevels[0]?.items?.map(x => <option key={x?.id} value={x?.id}>{x?.name}</option>)
                }
              </select>
            </CCol>

          </CRow>
        </CModalBody>
        <CModalFooter>
          {/*  */}
          <CButton color="secondary" size="sm" onClick={() => { setshowModal(!showModal) }}>
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

export default Experience;
