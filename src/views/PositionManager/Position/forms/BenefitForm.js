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
import BenefitTable from "../table/BenefitTable";
import useFetch from "src/hooks/useFetch";
import { moneyInTxt } from "src/reusable/utils/helper";
// const COMPANY_REFRENCE = "00001_A01";

const basis = ['', 'Varying Amount', 'Flat Amount', 'Hourly', '% of Daily Rate', '% of Hourly Rate']

const init = {
  benefitId: "",
  unit: 1,
  probationEligible: false,
  status: 1,
  cycle: "Periodic"


}
const BenefitForm = ({ benefits: gridData, setBenefits: setGridData }) => {

  const { auth } = useAuth()
  const { companyReference: COMPANY_REFRENCE } = auth
  const lan = useSelector((state) => state.language);
  const [showModal, setshowModal] = useState(false)
  const [paymentInfoFormData, setPaymentInfoFormData] = useState(null);
  const [formData, setformData] = useState(init)
  const [benefitInfo, setBenefitInfo] = useState(null)
  const [canAdd, setCanAdd] = useState(false)

  const { data } = useFetch('/Earnings?results=1000')
  const { setUrl } = useFetch('', (data) => setBenefitInfo(data))

  console.log({ benefitInfo });

  const handleChangeEvent = (event) => {

    setformData((prev) => ({
      ...prev,
      benefitId: event.target?.value
    }))


    setUrl(`/Earnings/${event.target?.value}`)


  }

  const onChangeEvent = (event) => {
    setformData((prev) => ({
      ...prev,
      [event.target.name]: event.target?.value
    }))
  }

  const handleCheckEvent = (event) => {

    if (event.target.checked) {
      setformData((prev) => ({
        ...prev,
        probationEligible: true
      }))
    } else {
      setformData((prev) => ({
        ...prev,
        probationEligible: false
      }))
    }

  }

  const handleAddNewAccount = () => {
    setshowModal(true)
  };

  const addToGridBtn = () => {
    const obj = {}
    obj.probationEligible = formData?.probationEligible ? 'Yes' : 'No'
    obj.name = data[0]?.items.find(x => x?.id === formData?.benefitId)?.name
    obj.benefitId = formData?.benefitId
    obj.isprobationElegible = formData?.probationEligible
    obj.status = formData?.status
    obj.unit = formData?.unit
    obj.cycle = formData?.cycle
    obj.statusText = formData?.status == 1 ? "Active" : 'Inactive'
    obj.basis = benefitInfo?.basis ? basis[benefitInfo?.basis] : ''
    obj.valueAmt = benefitInfo?.amount || ''
    obj.maximumAmount = benefitInfo?.maximumAmount || ''
    obj.count = gridData.length + 1

    console.log({ formData, benefits: data[0]?.items, id: formData?.benefitId });
    setGridData(prev => ([
      ...prev,
      obj

    ]))
    setformData(init)
    setBenefitInfo(null)

  }

  useEffect(() => {

    if (formData?.benefitId) {
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
              <AiOutlinePlus /> Add Benefit
              {/* <CSLab code={"HCM-5W6FDEX4795-LASN"} />{" "} */}
            </CButton>
          </CFormGroup>
        </CCol>
        <CCol md="12">
          <BenefitTable setGridData={setGridData} data={gridData} lan={lan} />
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
            Add Benefit
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>

            <CCol md={12}>
              <CLabel>
                {/* <CSLab code="HCM-W7SKIIIFCKE_PSLL" /> */}
                Benefit
              </CLabel>
              <select className="form-control" value={formData?.benefitId} name="benefitId" onChange={handleChangeEvent}>
                <option>Select Benefit</option>
                {
                  data[0]?.items.map(x => <option key={x?.id} value={x?.id}>{x?.name}</option>)
                }
              </select>
              {/* <CInput
                placeholder="Enter Task Name"
                name="name"
              /> */}
            </CCol>

            <CCol md={8}>
              <CLabel className="mt-2">
                {/* <CSLab code="HCM-W7SKIIIFCKE_PSLL" /> */}
                Basis
              </CLabel>
              <input className="form-control" value={basis[benefitInfo?.basis || 0]} disabled />

            </CCol>
            <CCol md={4}>
              <CLabel className="mt-2">
                {/* <CSLab code="HCM-W7SKIIIFCKE_PSLL" /> */}
                Value
              </CLabel>
              <CInput
                placeholder=""
                value={benefitInfo?.amount || ''}
                disabled
              />
            </CCol>
            <CCol md={4}>
              <CLabel className="mt-2">
                {/* <CSLab code="HCM-W7SKIIIFCKE_PSLL" /> */}
                Maximum Amount
              </CLabel>
              <CInput

                placeholder="Enter Units "
                name="name"
                type="text"
                style={{ textAlign: "right" }}
                value={benefitInfo?.maximumAmount || 0}
                disabled
              />
            </CCol>
            <CCol md={4}>
              <CLabel className="mt-2">
                {/* <CSLab code="HCM-W7SKIIIFCKE_PSLL" /> */}
                Cycle
              </CLabel>
              <select className="form-control" name="cycle" value={formData?.cycle} onChange={onChangeEvent}>
                <option value={'Periodic'}>Periodic</option>
                <option value={'Annual'}>Annual</option>
              </select>
            </CCol>
            <CCol md={4}>
              <CLabel className="mt-2">
                {/* <CSLab code="HCM-W7SKIIIFCKE_PSLL" /> */}
                Units
              </CLabel>
              <input
                className="form-controm"
                placeholder="Enter Units "
                name="unit"
                type="number"
                onChange={onChangeEvent}
                value={formData?.unit}
              />
            </CCol>


            <CCol md={8}>
              <div className="mt-4">
                <CSCheckbox
                  label="Probation Eligible"
                  checked={formData?.probationEligible}
                  name="probationEligible"
                  onChange={handleCheckEvent}
                />
              </div>


            </CCol>

            <CCol md={4}>
              <CLabel className="mt-2">
                {/* <CSLab code="HCM-W7SKIIIFCKE_PSLL" /> */}
                Status
              </CLabel>
              <select className="form-control" value={formData?.status} name="status" onChange={onChangeEvent}>
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
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
      </CModal >
    </>
  );
};

export default BenefitForm;
