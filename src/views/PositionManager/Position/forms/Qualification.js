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
import QualificationTable from "../table/QualificationTable";
import useMultiFetch from "src/hooks/useMultiFetch";
import useFetch from "src/hooks/useFetch";
// const COMPANY_REFRENCE = "00001_A01";



const Qualification = ({ qualifications: gridData, setQualifications: setGridData }) => {

  const { auth } = useAuth()
  const { companyReference: COMPANY_REFRENCE } = auth
  const lan = useSelector((state) => state.language);
  const [showModal, setshowModal] = useState(false)
  const [genericData, setGenericData] = useState({});
  const [formData, setformData] = useState({ qualificationId: "", coreArea: "", expMonth: "" })
  const [canAdd, setCanAdd] = useState(false)
  const [coreAreaName, setCoreAreaName] = useState("")

  const { setUrl } = useFetch('', (response) => setCoreAreaName(response?.name))


  const multiFetchResponse = (response) => {
    let resObj = {};
    resObj.allQualifications = response[0].data;

    console.log({ resObj });

    setGenericData(resObj);
  };

  useMultiFetch(
    [`/Organisation/Qualifications`],
    multiFetchResponse
  );

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
    const quali = genericData?.allQualifications.find(x => x?.id === formData?.qualificationId)
    console.log({ quali, formData });
    obj.expMonth = formData?.expMonth
    obj.coreArea = coreAreaName
    obj.id = formData?.qualificationId
    obj.name = quali?.name
    obj.count = gridData.length + 1
    setGridData(prev => ([
      ...prev,
      obj

    ]))
    setformData({ qualificationId: "", coreArea: "", expMonth: "" })
  }

  useEffect(() => {

    if (formData?.qualificationId && formData?.expMonth) {
      setCanAdd(true)
    } else {
      setCanAdd(false)
    }

    return () => {

    }
  }, [formData])

  const closeModal = () => {
    setshowModal(false)
    setformData({ qualificationId: "", coreArea: "", expMonth: "" })
  }

  useEffect(() => {

    if (formData?.qualificationId) {
      const findQualification = genericData?.allQualifications.find(x => x?.id === formData?.qualificationId)
      setUrl(`/CustomTypes/${findQualification?.coreAreaId}`)
    }


  }, [formData?.qualificationId])



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
              <AiOutlinePlus /> Add Qualification
              {/* <CSLab code={"HCM-5W6FDEX4795-LASN"} />{" "} */}
            </CButton>
          </CFormGroup>
        </CCol>
        <CCol md="12">
          <QualificationTable data={gridData} setGridData={setGridData} lan={lan} />
        </CCol>
      </CRow>
      <CModal
        size={""}
        show={showModal}
        onClose={closeModal}
        closeOnBackdrop={false}
      >
        <CModalHeader onClose={() => { }}>
          <CModalTitle>
            {" "}
            {/* <CSLab code="HCM-WM35S647NT_LOLN" />{" "} */}
            Add Qualification
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>

            <CCol md={12}>
              <CLabel>
                {/* <CSLab code="HCM-W7SKIIIFCKE_PSLL" /> */}
                Qualification
              </CLabel>
              <select
                name="qualificationId"
                className="form-control"
                onChange={handleChamgeEvent}
                value={formData?.qualificationId || ""}
              >

                <option value="">Select Qualification</option>
                {
                  genericData?.allQualifications?.map(x => <option key={x?.id} value={x?.id}>{x?.name}</option>)
                }

              </select>
            </CCol>
            <CCol md={8}>
              <CLabel className="mt-2">
                {/* <CSLab code="HCM-W7SKIIIFCKE_PSLL" /> */}
                Core Area
              </CLabel>
              <input className="form-control" value={coreAreaName} disabled />
              {/* <select className="form-control">
                <option selected disabled>Select Core Area </option>
                <option>HR</option>
                <option>Finance</option>
                <option>IT</option>
                <option>Engineering</option>
              </select> */}
            </CCol>

            <CCol md={4}>
              <CLabel className="mt-2">
                {/* <CSLab code="HCM-W7SKIIIFCKE_PSLL" /> */}
                Experience (Month)
              </CLabel>

              <select className="form-control" value={formData?.expMonth || ""} name="expMonth" onChange={handleChamgeEvent}>
                <option selected value={""}>Select Months</option>
                <option value={12}>0 - 12</option>
                <option value={24}>13 - 24</option>
                <option value={36}>25 - 36</option>
                <option value={37}> 37 +</option>
              </select>
            </CCol>


          </CRow>
        </CModalBody>
        <CModalFooter>
          {/*  */}
          <CButton color="secondary" size="sm" onClick={closeModal}>
            <AiOutlineClose size={20} />
            {GetLabelByName("HCM-9E3ZC2E1S0N-LASN", lan, "Close")}
          </CButton>
          <CButton
            onClick={addToGridBtn}
            // style={{ marginRight: 5, float: "right", cursor: gridData?.isDefault ? "pointer" : canAdd ? "pointer" : "not-allowed" }}
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

export default Qualification;
