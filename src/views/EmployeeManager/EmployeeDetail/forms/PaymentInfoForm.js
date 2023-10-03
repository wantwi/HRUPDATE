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
import CurrencyFormat from "react-currency-format";
import { AiFillSave, AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import useAuth from "src/hooks/useAuth";
import useFetch from "src/hooks/useFetch";
import useMultiFetch from "src/hooks/useMultiFetch";
import {
  GetAllNetworks,
  GetBankBranchesByBandId,
  GetBanks,
} from "src/reusable/API/EmployeeDetailsEndpoints";
import {
  CSCheckbox,
  CSLab,
  CSRequiredIndicator,
} from "src/reusable/components";
import { GetLabelByName } from "src/reusable/configs/config";
import { accountType, payBasis } from "src/reusable/utils/data/GenericData";
import PaymentTable from "../table/PaymentTable";
// const COMPANY_REFRENCE = "00001_A01";
let countryCode = "GH";

const init = {
  paymentMode: "",
  branch: "",
  branchId: "",
  accountNumber: "",
  paymentBasis: "NA",
  paymentBasisId: "",
  amount: "",
  note: "",
  isDefault: false,
  paymentOpt: "",
  mobileNetworkId: "",
  serviceProvider: "",
  serviceProviderId: "",


};

const renderBranchName = (bank, branch) => {
  console.log({ bank, branch });

  return branch.split("-").pop()

}

const PaymentInfoForm = ({ paymentsInfo, setPaymentsInfo }) => {

  const { auth } = useAuth()
  const { companyReference: COMPANY_REFRENCE } = auth
  const lan = useSelector((state) => state.language);
  const [showModal, setshowModal] = useState(false);
  const [payOpt, setpayOpt] = useState(0);
  const [paymentInfoFormData, setPaymentInfoFormData] = useState(null);

  const [genericData, setGenericData] = useState({});
  const [paymentBasis, setPaymentBasis] = useState(0);
  const [branches, setBranches] = useState([]);
  const [textLable, setTextLable] = useState("NA");
  const [canAdd, setCanAdd] = useState(false)
  const [bankName, setBankName] = useState("")

  const [isDefaultSet, setIsDefaultSet] = useState(false)




  const multiFetchResponse = (response) => {
    let resObj = {};
    resObj.bankList = response[0].data;
    resObj.networkProviderList = response[1].data;

    setGenericData(resObj);
  };

  const { bankList = [], networkProviderList = [] } = genericData;

  useMultiFetch(
    [GetBanks(countryCode), GetAllNetworks(COMPANY_REFRENCE)],
    multiFetchResponse
  );

  const paymentOnChange = (e) => {
    setPaymentInfoFormData(init)
    setpayOpt(+e.target.value);
    setPaymentBasis(+e.target.value)
    setPaymentInfoFormData((prev) => ({
      ...prev,
      paymentOpt: e.target.value,
      paymentMode: accountType.find((x) => x.id === +e.target.value)?.name,
    }));
  };

  const handleOnChnage = (event) => {
    setPaymentInfoFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleBranchChange = (event) => {
    const branchName = branches.find(x => x.id === event.target.value)?.name

    setPaymentInfoFormData(prev => ({ ...prev, branchId: event.target.value, branch: branchName }))

  }

  const handleOnPaymentBasisChnage = (e) => {
    setPaymentInfoFormData((prev) => ({
      ...prev,
      paymentBasisId: e.target.value,
      paymentBasis: e.target.value === "-1" ? "NA" : payBasis.find((x) => x.id === +e.target.value)?.name,
    }));
  };

  const handleMobileServiceProviderChnage = (event) => {
    const serviceName = networkProviderList.find(x => x.id === event.target.value)?.name

    setPaymentInfoFormData(prev => ({ ...prev, mobileNetworkId: event.target.value, serviceProviderId: event.target.value, serviceProvider: serviceName }))
  }

  const getBranchResponse = (response) => {

    setBranches(response)

  }

  const { setUrl: setGetBranchUrl } = useFetch("", getBranchResponse)
  const handleBankChange = (event) => {
    // const bankName =  bankList.find(x => x.id === event.target.value)?.name

    setBankName(bankList.find(x => x.id === event.target.value)?.name)

    setPaymentInfoFormData(prev => ({ ...prev, serviceProviderId: event.target.value, serviceProvider: bankName }))

    //serviceProvider
    setGetBranchUrl(GetBankBranchesByBandId(event.target.value))

  }

  const handleAddNewAccount = () => {
    setshowModal(!showModal);
    setpayOpt(0);
  };

  const addToGridBtn = () => {

    if (paymentInfoFormData?.isDefault) {
      if (payOpt === 1) {
        const requiredObj = {
          serviceProviderId: paymentInfoFormData?.serviceProviderId || "",
          branchId: paymentInfoFormData?.branchId || "",
          accountNumber: paymentInfoFormData?.accountNumber || "",
          paymentBasisId: "NA"
        }
        if (!Object.values(requiredObj).every((field) => field?.length > 0)) return
      }
      if (payOpt === 2) {
        const requiredObj = {
          serviceProviderId: paymentInfoFormData?.serviceProviderId || "",
          accountNumber: paymentInfoFormData?.accountNumber || "",

          paymentBasisId: "NA"
        }


        if (!Object.values(requiredObj).every((field) => field?.length > 0)) return
      }
      if (payOpt === 3) {
        const requiredObj = {
          paymentBasisId: "NA"
        }
        if (!Object.values(requiredObj).every((field) => field?.length > 0)) return
      }
    }





    const obj = paymentInfoFormData?.isDefault ? { ...paymentInfoFormData, paymentBasis: "NA", amount: 0 } : paymentInfoFormData


    console.log({ obj, paymentInfoFormData });

    setPaymentsInfo((prev => ([...prev, obj])))
    // setshowModal(!showModal);
    setPaymentInfoFormData(null)
    setpayOpt(0);

  }


  useEffect(() => {
    if (paymentsInfo.length > 0) {
      const hasDefault = paymentsInfo.some(x => x?.isDefault === true)
      setIsDefaultSet(hasDefault)
    }
    return () => {
      setIsDefaultSet(false)
    };
  }, [paymentInfoFormData?.paymentMode]);

  useEffect(() => {


    if (payOpt === 1) {
      const requiredObj = {
        serviceProviderId: paymentInfoFormData?.serviceProviderId || "",
        branchId: paymentInfoFormData?.branchId || "",
        accountNumber: paymentInfoFormData?.accountNumber || "",
        amount: paymentInfoFormData?.isDefault ? 0 : paymentInfoFormData?.amount || "",
        paymentBasisId: paymentInfoFormData?.paymentBasisId || ""
      }


      console.log({ requiredObj });

      if (Object.values(requiredObj).every((field) => field?.length > 0)) {
        setCanAdd(true)
      }
      else {
        setCanAdd(false)
      }
    }
    if (payOpt === 2) {
      const requiredObj = {
        serviceProviderId: paymentInfoFormData?.serviceProviderId || "",
        accountNumber: paymentInfoFormData?.accountNumber || "",
        amount: paymentInfoFormData?.isDefault ? 0 : paymentInfoFormData?.amount || "",
        paymentBasisId: paymentInfoFormData?.paymentBasisId || ""
      }


      if (Object.values(requiredObj).every((field) => field?.length > 0)) {
        setCanAdd(true)
      }
      else {
        setCanAdd(false)
      }
    }
    if (payOpt === 3) {
      const requiredObj = {

        amount: paymentInfoFormData?.isDefault ? 0 : paymentInfoFormData?.amount || "",
        paymentBasisId: paymentInfoFormData?.paymentBasisId || ""
      }



      if (Object.values(requiredObj).every((field) => field?.length > 0)) {
        setCanAdd(true)
      }
      else {
        setCanAdd(false)
      }
    }






    return () => {

    }
  }, [payOpt, paymentInfoFormData])






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
              <AiOutlinePlus /> <CSLab code={"HCM-5W6FDEX4795-LASN"} />{" "}
            </CButton>
          </CFormGroup>
        </CCol>
        <CCol md="12">
          <PaymentTable setPaymentsInfo={setPaymentsInfo} paymentsInfo={paymentsInfo} lan={lan} />
        </CCol>
      </CRow>
      <CModal
        size={"lg"}
        show={showModal}
        onClose={() => { setshowModal(!showModal); setPaymentInfoFormData(null) }}
        closeOnBackdrop={false}
      >
        <CModalHeader onClose={() => { }}>
          <CModalTitle>
            {" "}
            <CSLab code="HCM-WM35S647NT_LOLN" />{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {payOpt == 0 ? (
            <CRow>
              <CCol md="8">
                <CLabel htmlFor="">
                  <CSLab code=" Payment Option" label="Payment Option" />
                </CLabel>
                <CSelect
                  name="paymentOpt"
                  value={paymentInfoFormData?.paymentOpt || ""}
                  onChange={paymentOnChange}
                >

                  <option value="">{GetLabelByName("HCM-2ZIYZPSE9FU_LANG", lan, "Select Payment Option")}</option>
                  {accountType.map((x, i) => (
                    <option value={x.id} key={x.id}>

                      {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                    </option>
                  ))}
                </CSelect>
              </CCol>
            </CRow>
          ) : null}
          {payOpt === 3 ? (
            <div>

              <CRow>
                <CCol md="8">
                  <CLabel htmlFor="">
                    <CSLab code="HCM-GKPKF3QGKHJ-LASN" />
                  </CLabel>
                  <CSelect
                    name="paymentOpt"
                    value={paymentInfoFormData?.paymentOpt || ""}
                    onChange={paymentOnChange}
                  >

                    <option value="">{GetLabelByName("HCM-2ZIYZPSE9FU_LANG", lan, "Select Payment Option")}</option>
                    {accountType.map((x, i) => (
                      <option value={x.id} key={i}>
                        {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                      </option>
                    ))}
                  </CSelect>
                </CCol>
                <CCol md="4" xs="6">
                  <CLabel style={{ color: "#FFF" }}>
                    <CSLab code="." />
                  </CLabel>
                  <br />
                  <CSCheckbox
                    label="HCM-BL95JD6K2W9-LOLN"
                    // checked={paymentInfoFormData?.isDefault || false}
                    name="isDefault"
                    onChange={(e) => setPaymentInfoFormData(prev => ({ ...prev, isDefault: e.target.checked }))}
                    disabled={isDefaultSet}

                  />
                </CCol>
                <CCol md="6">
                  <CLabel>
                    <CSLab code="HCM-C1JUXJYA3B7-LASN" />
                  </CLabel>
                  <CSRequiredIndicator />
                  <CSelect
                    name="paymentBasisId"
                    value={paymentInfoFormData?.paymentBasisId || ""}
                    onChange={handleOnPaymentBasisChnage}
                    disabled={paymentInfoFormData?.isDefault ? true : false}
                  >
                    {payBasis.map((x, i) => (
                      <option value={x.id} key={i}>
                        {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                      </option>
                    ))}
                  </CSelect>
                </CCol>
                <CCol md="6" style={{ textAlign: "right" }}>
                  <CLabel>
                    <CSLab code={paymentInfoFormData?.paymentBasis} />
                  </CLabel>
                  <CSRequiredIndicator />
                  {
                    (paymentInfoFormData?.paymentBasisId === "-1" || paymentInfoFormData?.paymentBasisId === "") ? <input disabled className="form-control" /> :
                      <CurrencyFormat
                        thousandSeparator={true}
                        style={{ textAlign: "right" }}
                        name="amount"
                        value={
                          paymentInfoFormData?.amount || ""
                        }
                        onChange={(e) => setPaymentInfoFormData((prev) => ({ ...prev, amount: e.target.value }))}
                        placeholder={"0.00"}
                        disabled={paymentInfoFormData?.isDefault ? true : false}
                      />
                  }
                </CCol>

                <CCol md="12">
                  <CLabel>
                    <CSLab code="HCM-Z0FV0XJJ06" />
                  </CLabel>
                  <CTextarea
                    placeholder={GetLabelByName("HCM-Z0FV0XJJ06", lan)}
                    onChange={handleOnChnage}
                    value={paymentInfoFormData?.note || ""}
                    name="note"
                    style={{ height: "80px", resize: "none" }}
                  ></CTextarea>
                </CCol>
              </CRow>
            </div>
          ) : null}
          {payOpt === 2 ? (
            <CRow>
              <CCol md="8">
                <CLabel htmlFor="">
                  <CSLab code="HCM-GKPKF3QGKHJ-LASN" />
                </CLabel>
                <CSelect
                  name="paymentOpt"
                  value={paymentInfoFormData?.paymentOpt || ""}
                  onChange={paymentOnChange}
                >
                  <option value="">{GetLabelByName("HCM-2ZIYZPSE9FU_LANG", lan, "Select Payment Option")}</option>
                  {accountType.map((x, i) => (
                    <option value={x.id} key={i}>
                      {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                    </option>
                  ))}
                </CSelect>
              </CCol>
              <CCol md="4" xs="6">
                <CLabel style={{ color: "#FFF" }}>
                  <CSLab code="." />
                </CLabel>
                <br />
                <CSCheckbox
                  label="HCM-BL95JD6K2W9-LOLN"
                  // checked={paymentInfoFormData?.isDefault || false}
                  name="isDefault"
                  onChange={(e) => setPaymentInfoFormData(prev => ({ ...prev, isDefault: e.target.checked }))}
                  disabled={isDefaultSet}
                //   onChange={handleCheckboxChange1}
                //   disabled={checkDefault}
                />
              </CCol>
              <CCol md="4">
                <CLabel htmlFor="">
                  <CSLab code="HCM-8HQGFGIAVIC_LANG" />
                </CLabel>
                <CSRequiredIndicator />
                <CSelect
                  name="serviceProviderId"
                  value={paymentInfoFormData?.serviceProviderId || ""}
                  onChange={handleMobileServiceProviderChnage}

                >
                  <option value="">Select service provider</option>
                  {networkProviderList.map((x, i) => (
                    <option value={x.id} key={i}>
                      {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                    </option>
                  ))}
                </CSelect>
              </CCol>
              <CCol md="4">
                <CLabel>
                  <CSLab code="HCM-28JQRN57PA4-PSLL" />
                </CLabel>
                <CSRequiredIndicator />
                <CInput
                  placeholder={GetLabelByName("HCM-CEY6712B3G-LANG", lan)}
                  // onKeyPress={(e) => handleNumberOnly(e)}
                  name="accountNumber"
                  value={paymentInfoFormData?.accountNumber || ""}
                  onChange={handleOnChnage}
                />
              </CCol>
              <CCol md="4">
                <CLabel>
                  <CSLab code="HCM-C1JUXJYA3B7-LASN" />
                </CLabel>
                <CSRequiredIndicator />
                <CSelect
                  name="paymentBasisId"
                  value={paymentInfoFormData?.paymentBasisId || ""}
                  onChange={handleOnPaymentBasisChnage}
                  disabled={paymentInfoFormData?.isDefault ? true : false}
                >
                  {payBasis.map((x, i) => (
                    <option value={x.id} key={i}>
                      {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                    </option>
                  ))}
                </CSelect>
              </CCol>

              <CCol md="4" style={{ textAlign: "right" }}>
                <CLabel>
                  <CSLab code={paymentInfoFormData?.paymentBasis} />
                </CLabel>
                <CSRequiredIndicator />
                {
                  (paymentInfoFormData?.paymentBasisId === "-1" || paymentInfoFormData?.paymentBasisId === "") ? <input disabled className="form-control" /> :
                    <CurrencyFormat
                      thousandSeparator={true}
                      style={{ textAlign: "right" }}
                      name="amount"
                      value={
                        paymentInfoFormData?.amount || ""
                      }
                      onChange={(e) => setPaymentInfoFormData((prev) => ({ ...prev, amount: e.target.value }))}
                      placeholder={"0.00"}

                    />
                }

              </CCol>

              {/* {paymentBasis === "2" ? (
                <CCol md="4">
                  <CLabel>
                    <CSLab code={paymentInfoFormData?.paymentBasis} />
                  </CLabel>
                  <CSRequiredIndicator />
                  <CInput
                    placeholder={"0.00"}
                    style={{ textAlign: "right" }}
                    name="amount"
                    value={
                      paymentInfoFormData?.amount || ""
                    }
                    onChange={(e)=> setPaymentInfoFormData((prev) =>({...prev, amount:e.target.value}))}
                  />
                </CCol>
              ) : null} */}

              <CCol md="12">
                <CLabel htmlFor="name">
                  <CSLab code="HCM-Z0FV0XJJ06" />
                </CLabel>
                <CTextarea
                  placeholder={GetLabelByName("HCM-Z0FV0XJJ06", lan)}
                  onChange={handleOnChnage}
                  value={paymentInfoFormData?.note || ""}
                  name="note"
                  style={{ height: "80px", resize: "none" }}
                ></CTextarea>
              </CCol>
            </CRow>
          ) : null}

          {payOpt === 1 ? (
            <CRow>
              <CCol md="8">
                <CLabel htmlFor="">
                  <CSLab code="HCM-GKPKF3QGKHJ-LASN" />
                </CLabel>
                <CSelect
                  name="paymentOpt"
                  value={paymentInfoFormData?.paymentOpt || ""}
                  onChange={paymentOnChange}
                >
                  {accountType.map((x, i) => (
                    <option value={x.id} key={i}>
                      {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                    </option>
                  ))}
                </CSelect>
              </CCol>
              <CCol md="4" xs="6">
                <CLabel style={{ color: "#FFF" }}>
                  <CSLab code="." />
                </CLabel>
                <br />
                <CSCheckbox
                  label="HCM-BL95JD6K2W9-LOLN"
                  checked={paymentInfoFormData?.isDefault || false}
                  onChange={(e) => setPaymentInfoFormData(prev => ({ ...prev, isDefault: e.target.checked }))}
                  name="isDefault"
                  disabled={isDefaultSet}

                //onChange={handleCheckboxChange1}

                //disabled={checkDefault}
                />
              </CCol>
              <CCol md="4">
                <CLabel htmlFor="">
                  <CSLab code="HCM-9C7OD5FHV7Q_PSLL" />
                </CLabel>
                <CSRequiredIndicator />
                <CSelect
                  name="serviceProviderId"
                  value={paymentInfoFormData?.serviceProviderId || ""}
                  onChange={handleBankChange}
                >

                  <option value="">{GetLabelByName("HCM-6QJSQF0FSSR_HRPR", lan, "Select bank")}</option>
                  {bankList.map((x, i) => (
                    <option value={x.id} key={i}>
                      {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                    </option>
                  ))}
                </CSelect>
              </CCol>
              <CCol md="4">
                <CLabel htmlFor="">
                  <CSLab code="HCM-5JJIZBZLYWP_LANG" />
                </CLabel>
                <CSRequiredIndicator />
                <CSelect
                  name="branchId"
                  value={paymentInfoFormData?.branchId || ""}
                  onChange={handleBranchChange}
                >

                  <option value="">{GetLabelByName("HCM-NETBY4YFSN-LASN", lan, "Select Branch")}</option>
                  {branches.map((x, i) => (
                    <option value={x.id} key={i}>
                      {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                      {/* {renderBranchName(bankName,x?.name)} */}
                    </option>
                  ))}
                </CSelect>
              </CCol>
              <CCol md="4">
                <CLabel>
                  <CSLab code="HCM-HVW65C2S13E_LANG" />
                </CLabel>
                <CSRequiredIndicator />
                <CInput
                  placeholder={GetLabelByName("HCM-CEY6712B3G-LANG", lan)}
                  name="accountNumber"
                  // onKeyPress={(e) => handleNumberOnly(e)}
                  value={paymentInfoFormData?.accountNumber || ""}
                  onChange={handleOnChnage}
                />
              </CCol>
              <CCol md="4">
                <CLabel>
                  <CSLab code="HCM-C1JUXJYA3B7-LASN" />
                </CLabel>
                <CSRequiredIndicator />
                <CSelect
                  name="paymentBasisId"
                  value={paymentInfoFormData?.paymentBasisId || ""}
                  onChange={handleOnPaymentBasisChnage}
                  disabled={paymentInfoFormData?.isDefault ? true : false}
                //   onChange={(evnt) => {
                //     //  paymentOnChange(evnt);
                //     //handleLabelChange(evnt);
                //   }}
                >
                  {payBasis.map((x, i) => (
                    <option value={x.id} key={i}>
                      {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                    </option>
                  ))}
                </CSelect>
              </CCol>
              <CCol md="4" style={{ textAlign: "right" }}>
                <CLabel>
                  <CSLab code={paymentInfoFormData?.paymentBasis} />
                </CLabel>
                <CSRequiredIndicator />
                {
                  (paymentInfoFormData?.paymentBasisId === "-1" || paymentInfoFormData?.paymentBasisId === "") ? <input disabled className="form-control" /> :
                    <CurrencyFormat
                      thousandSeparator={true}
                      style={{ textAlign: "right" }}
                      name="amount"
                      value={
                        paymentInfoFormData?.amount || ""
                      }
                      onChange={(e) => setPaymentInfoFormData((prev) => ({ ...prev, amount: e.target.value }))}
                      placeholder={"0.00"}
                      disabled={paymentInfoFormData?.isDefault ? true : false}

                    />
                }
              </CCol>
              <CCol md="12">
                <CLabel htmlFor="name">
                  <CSLab code="HCM-Z0FV0XJJ06" />
                </CLabel>
                <CTextarea
                  placeholder={GetLabelByName("HCM-Z0FV0XJJ06", lan)}
                  onChange={handleOnChnage}
                  value={paymentInfoFormData?.note || ""}
                  name="note"
                  style={{ height: "80px", resize: "none" }}
                ></CTextarea>
              </CCol>
            </CRow>
          ) : null}
        </CModalBody>
        <CModalFooter>
          {/*  */}
          <CButton color="secondary" size="sm" onClick={() => { setshowModal(!showModal); setPaymentInfoFormData(null) }}>
            <AiOutlineClose size={20} />
            {GetLabelByName("HCM-9E3ZC2E1S0N-LASN", lan, "Close")}
          </CButton>
          <CButton
            onClick={addToGridBtn}
            style={{ marginRight: 5, float: "right", cursor: paymentInfoFormData?.isDefault ? "pointer" : canAdd ? "pointer" : "not-allowed" }}
            type="button"
            size="sm"
            color="success"
            disabled={paymentInfoFormData?.isDefault ? false : canAdd ? false : true}
          >
            <AiFillSave size={20} />

            {GetLabelByName("HCM-TAAFD4M071D-HRPR", lan, "Add")}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default PaymentInfoForm;
