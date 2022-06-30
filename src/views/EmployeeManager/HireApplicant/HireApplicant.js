import React, { useState } from "react";
import { useSelector } from "react-redux";

import CIcon from "@coreui/icons-react";
import { CSDivider, CSRequiredIndicator } from "src/reusable/components";

import {
  CInputGroupAppend,
  CInputGroup,
  CInput,
  CCard,
  CCardBody,
  CFormGroup,
  CForm,
  CCol,
  CRow,
  CTabs,
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CLabel,
  CCardFooter,
  CSelect,
  CTextarea,
} from "@coreui/react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import {
  AiOutlinePlus,
  AiFillSave,
  AiOutlineRedo,
  AiOutlineClose,
} from "react-icons/ai";
import { CardBodyHeight } from "src/reusable/utils/helper";

import { Divisions } from "../../../reusable/utils/GenericData";
import { GetLabelByName } from "src/reusable/configs/config";
import {
  CSCheckbox,
  CSLab,
  CSLineLabel,
  SingleSelectComponent,
} from "../../../reusable/components";

const HireApplicant = (props) => {
  const lan = useSelector((state) => state.language);
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(true);
  const [activeKey, setActiveKey] = useState(1);
  const [, setSaveContinueLabel] = useState("Continue");
  const [searchInput, setSearchInput] = useState("");
  const [mode, setMode] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [email, setEmail] = useState("");
  const [digitalAddress, setDigitalAddress] = useState("");
  const [homeAddress, setHomeAddress] = useState("");

  const [ssfnumber, setSsfnumber] = useState("");
  const [status, setStatus] = useState("");
  const [phone, setPhone] = useState("");

  const canSave = [
    firstname,
    lastname,
    dateofbirth,
    email,
    digitalAddress,
    homeAddress,

    ssfnumber,
    status,
    phone,
  ].every(Boolean);

  const TransLabelByCode = (name) => GetLabelByName(name, lan);
  const searchReset = () => {
    setShow(true);
    setSearchInput("");
  };

  return (
    <>
      <CRow>
        <CCol xs="9">
          <h5>
            <CSLab code="HCM-5WQ909A7QKQ-HRPR" />
          </h5>
        </CCol>
      </CRow>
      <CRow hidden={!show ? true : false}>
        <CCol md="4">
          <CFormGroup>
            <CInputGroup>
              <CInput
                className="border-left-curve"
                type="text"
                id="username3"
                name="username3"
                autoComplete="name"
                placeholder={TransLabelByCode("HCM-VVEV603YRWG_LASN")}
              />
              <CInputGroupAppend>
                <CButton
                  className="border-right-curve"
                  onClick={() => setShow(!show)}
                  color="primary"
                >
                  <CIcon name="cil-magnifying-glass" />
                </CButton>
              </CInputGroupAppend>
            </CInputGroup>
          </CFormGroup>
        </CCol>
        <CCol md="8" className="text-right">
          <CFormGroup>
            {show ? (
              <CButton
                type="button"
                onClick={() => setShow(!show)}
                size="sm"
                color="primary"
              >
                {" "}
                <AiOutlinePlus /> <CSLab code="HCM-TAAFD4M071D-HRPR" />
              </CButton>
            ) : null}
          </CFormGroup>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" hidden={show}>
          <CCard>
            <CCardBody style={{ height: CardBodyHeight, overflowY: "auto" }}>
              <CForm action="" method="post">
                <CTabs>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink
                        href="#"
                        active={activeKey === 1}
                        onClick={() => {
                          setActiveKey(1);
                          setSaveContinueLabel("Continue");
                        }}
                      >
                        <CSLab code="HCM-HZU4WPFB1L9-LASN" />
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink
                        href="#"
                        active={activeKey === 2}
                        onClick={() => {
                          setActiveKey(2);
                          setSaveContinueLabel("Continue");
                        }}
                      >
                        <CSLab code="HCM-GQR50DATROE_PSLL" />
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink
                        href="#"
                        active={activeKey === 3}
                        onClick={() => {
                          setActiveKey(3);
                          setSaveContinueLabel("Continue");
                        }}
                      >
                        <CSLab code="HCM-4P1J65YI877_HRPR" />
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink
                        href="#"
                        active={activeKey === 4}
                        onClick={() => {
                          setActiveKey(4);
                          setSaveContinueLabel("Save");
                        }}
                      >
                        <CSLab code="HCM-ZMHTBQ5FOJ_LOLN" />
                      </CNavLink>
                    </CNavItem>
                  </CNav>

                  <CTabContent>
                    <CTabPane
                      style={{ marginTop: "10px" }}
                      visible={activeKey === 1 ? "true" : "false"}
                    >
                      <CRow>
                        {/* Details */}
                        <CCol md="6">
                          <CRow>
                            <CCol md="4">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-KZPKH8ICPD-PSLL" />{" "}
                              </CLabel>
                              <CInput name="title" id="title" />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="firstname">
                                {" "}
                                <CSLab code="HCM-KPH53NF08RG" />{" "}
                                <CSRequiredIndicator />
                              </CLabel>
                              <CInput
                                className=""
                                id="firstname"
                                name="firstname"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="lastname">
                                {" "}
                                <CSLab code="HCM-ZYCFSGCKMC" />{" "}
                                <CSRequiredIndicator />
                              </CLabel>
                              <CInput
                                className=""
                                id="lastname"
                                name="lastname"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                              />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="3">
                              <CLabel htmlFor="Nationality">
                                <CSLab code="HCM-IM8I8SKJ1J9_KCMI" />
                                <CSRequiredIndicator />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Divisions }}
                              />
                            </CCol>
                            <CCol md="3">
                              <CLabel>
                                <CSLab code="HCM-7HTWFD0THEN-PSLL" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Divisions }}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                <CSLab code="HCM-XYNVK7A8USK_PSLL" />
                                <CSRequiredIndicator />
                              </CLabel>
                              <CInput
                                className=""
                                id="dateofbirth"
                                name="dateofbirth"
                                value={dateofbirth}
                                onChange={(e) => setDateofbirth(e.target.value)}
                                type="date"
                              />
                            </CCol>
                            <CCol md="2">
                              <CLabel>
                                <CSLab code="HCM-QG3L0L7K3A-KCMI" />
                              </CLabel>
                              <CInput className="" id="age" disabled />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="3">
                              <CLabel htmlFor="code">
                                <CSLab code="HCM-76DW66H8FM-LANG" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Divisions }}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="spousename">
                                <CSLab code="HCM-64Z5DVG1Z8V_HRPR" />
                              </CLabel>
                              <CInput className="" id="spousename" />
                            </CCol>
                            <CCol md="3">
                              <CLabel htmlFor="spouselifestatus">
                                <CSLab code="HCM-6US6BE1HXYH-HRPR" />
                              </CLabel>
                              <CInput className="" id="spouselifestatus" />
                            </CCol>
                            <CCol md="2">
                              <CLabel htmlFor="children">
                                <CSLab code="HCM-WAIXXF9Q3S-LANG" />
                              </CLabel>
                              <CInput
                                className=""
                                id="children"
                                type="number"
                              />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="12" style={{ marginTop: "5px" }}>
                              <CSLineLabel name={"HCM-YD305CBYLEE_LOLN"} />
                            </CCol>
                            <CCol md="5">
                              <CLabel htmlFor="email">
                                <CSLab code="HCM-L8D4N8LGAS_PSLL" />
                                <CSRequiredIndicator />
                              </CLabel>
                              <CInput
                                className=""
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                <CSLab code="HCM-BOSPUEXHRP_PSLL" />
                                <CSRequiredIndicator />
                              </CLabel>
                              <PhoneInput
                                value={phone}
                                name="phone"
                                onChange={(e) => setPhone(e.target.value)}
                              />
                            </CCol>
                            <CCol md="3">
                              <CLabel htmlFor="code">
                                <CSLab code="HCM-W7SKIIIFCKE_PSLL" />
                                <CSRequiredIndicator />
                              </CLabel>
                              <CInput
                                className=""
                                id="digital-address"
                                name="digitalAddress"
                                value={digitalAddress}
                                onChange={(e) =>
                                  setDigitalAddress(e.target.value)
                                }
                              />
                            </CCol>
                            <CCol md="12">
                              <CLabel>
                                <CSLab code="HCM-ZSJMVZ6F8MR-LOLN" />
                              </CLabel>
                              <CTextarea
                                name="homeAddress"
                                style={{ height: "60px", resize: "none" }}
                              ></CTextarea>
                            </CCol>
                          </CRow>
                        </CCol>
                        <CCol md="1">
                          <div className="vl"></div>
                        </CCol>
                        <CCol md="5">
                          <CRow>
                            <CCol md="3">
                              <CLabel htmlFor="mortgageac">
                                <CSLab
                                  code="HCM-H3MIVJ211TC_PSLL"
                                  // code={"HCM-H3MIVJ211TC_PSLL" + "A/C #"}
                                />
                              </CLabel>
                              <CInput className="" id="mortgageac" />
                            </CCol>
                            <CCol md="3">
                              <CLabel htmlFor="ssfnumber">
                                <CSLab code="HCM-WTRS6A0F4FD_HRPR" />
                              </CLabel>
                              <CInput className="" id="ssfnumber" />
                            </CCol>
                            <CCol md="3">
                              <CLabel htmlFor="region">
                                <CSLab code="HCM-PWGBUHFT4T-HRPR" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Region: Divisions }}
                              />
                            </CCol>
                            <CCol md="3">
                              <CLabel htmlFor="district">
                                <CSLab code="HCM-RTDGIX8IJ1K-HRPR" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ district: Divisions }}
                              />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="3" xs="6">
                              <CLabel htmlFor="tribe">
                                <CSLab code="HCM-S4203LTC03-LOLN" />
                              </CLabel>
                              <CInput className="" id="tribe" />
                            </CCol>
                            <CCol md="3" xs="6" style={{ marginTop: "17px" }}>
                              <CSCheckbox label="HCM-QVR23KNDEE-KCMI" name="disablity" />
                            </CCol>
                            <CCol md="3" xs="6" style={{ marginTop: "17px" }}>
                              <CSCheckbox label="HCM-PFORQTMPOWG_PSLL" name="paysssf" />
                            </CCol>
                            <CCol md="3" xs="6" style={{ marginTop: "17px" }}>
                              <CSCheckbox label="HCM-2EZGT9Q3QNH_PSLL" name="paystax" />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="3" xs="6" style={{ marginTop: "17px" }}>
                              <CSCheckbox
                                label="HCM-VFWM9IW17RD_LASN"
                                name="unionmemeber"
                              />
                            </CCol>
                            <CCol xs="12" md="3">
                              <CLabel htmlFor="unionname">
                                <CSLab code="HCM-468YTA38UZU-PSLL" />
                              </CLabel>
                              <CSelect id="unionname" disabled={true}>
                                {["Union One", "Union Two", "Union Three"].map(
                                  (x, i) => (
                                    <option key={i}>{x}</option>
                                  )
                                )}
                              </CSelect>
                            </CCol>
                            <CCol md="3">
                              <CLabel htmlFor="passportnumber">
                                <CSLab code="HCM-Z6WAZEQHO3_LASN" />

                                {/* <CSLab  code="Passport #" /> */}
                              </CLabel>
                              <CInput className="" id="passportnumber" />
                            </CCol>
                            <CCol md="3">
                              <CLabel htmlFor="passporttype">
                                <CSLab code="HCM-BKN8CI9KISJ-HRPR" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ PassportType: Divisions }}
                              />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="3">
                              <CLabel htmlFor="status">
                                <CSLab code="HCM-RQB38Y1ZFPO-LANG" />
                                <CSRequiredIndicator />
                              </CLabel>
                              <CSelect
                                name="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                              >
                                {["Select Status", "Active", "Inactive"].map(
                                  (x, i) => (
                                    <option value={x} key={i}>
                                      {x}
                                    </option>
                                  )
                                )}
                              </CSelect>
                            </CCol>
                          </CRow>
                        </CCol>
                      </CRow>
                    </CTabPane>

                    <CTabPane
                      visible={activeKey === 2 ? "true" : "false"}
                      style={{ marginTop: "10px" }}
                    >
                      <CRow>
                        <CCol md="6">
                          <CRow>
                            <CCol md="4">
                              <CLabel htmlFor="employeeid">
                                <CSLab code="HCM-B0VG88EHYDM_KCMI" />
                              </CLabel>
                              <CInput className="" id="employeeid" />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="hiredate">
                                <CSLab code="HCM-HL6HU7PY50C_KCMI" />
                              </CLabel>
                              <CInput type="date" className="" id="hiredate" />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="employeetype">
                                <CSLab code="HCM-HMLNLPOEIXG" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ EmployeeType: Divisions }}
                              />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="4">
                              <CLabel htmlFor="tin">
                                <CSLab code="HCM-BLHMNDJYW5O-HRPR" />
                              </CLabel>
                              <CInput className="" id="tin" />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="12" style={{ marginTop: "5px" }}>
                              <CSLineLabel name="HCM-CRJS7POQ6S-LASN" />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="name">
                                <CSLab code="HCM-ATGLL367GOQ" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Position: Divisions }}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="code">
                                <CSLab code="HCM-6XXECXM4Q5S" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Locations: Divisions }}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="name">
                                <CSLab code="HCM-LAFPT6FJ57N" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Divisions }}
                              />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="4">
                              <CLabel htmlFor="name">
                                <CSLab code="HCM-N6I0LSIYJF" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Departments: Divisions }}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="name">
                                <CSLab code="HCM-4D1SZ24U9UO" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Section: Divisions }}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="code">
                                <CSLab code="HCM-DHV9W3RF11D" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Divisions }}
                              />
                            </CCol>
                          </CRow>
                          <CRow></CRow>
                        </CCol>
                        <CCol md="1">
                          <div className="vl"></div>
                        </CCol>
                        <CCol md="5">
                          <CRow>
                            <CCol md="12">
                              <h6 htmlFor="name" className="ch-l-s">
                                <CSLab code="HCM-E6FV7KUTAIJ-PSLL" />
                              </h6>
                            </CCol>

                            <CCol md="4">
                              <CLabel htmlFor="grade">
                                <CSLab code="HCM-P82D0RPB0G-LOLN" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Grade: Divisions }}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="type">
                                <CSLab code="HCM-M3AIH0GJVU-LANG" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Type: Divisions }}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="rate">
                                <CSLab code="HCM-PH98CHJVZO_KCMI" />
                              </CLabel>
                              <CInput className="" id="rate" />
                            </CCol>
                          </CRow>
                        </CCol>
                      </CRow>
                    </CTabPane>

                    <CTabPane
                      visible={activeKey === 3 ? "true" : "false"}
                      style={{ marginTop: "10px" }}
                    >
                      <CRow>
                        <CCol md="12" style={{ marginBottom: "5px" }}>
                          <CButton
                            style={{ marginRight: 5, float: "right" }}
                            type="button"
                            size="sm"
                            color="primary"
                          >
                            <CIcon name="cil-scrubber" /> Add Payment Method
                          </CButton>
                        </CCol>
                        <CCol md="12">
                          {/* <TableComponent dataSource={UserGroup} OnCommandClick={OnCommandClick} setGrid={setGrid} fields={paymentOptionTableOptions} /> */}
                        </CCol>
                      </CRow>
                    </CTabPane>

                    <CTabPane
                      visible={activeKey === 4 ? "true" : "false"}
                      style={{ marginTop: "10px" }}
                    >
                      <CRow>
                        <CCol md="6">
                          <CCard>
                            <CCardBody>
                              <CSLab code="Picture" />
                            </CCardBody>
                          </CCard>
                        </CCol>
                        <CCol md="6">
                          <CCard>
                            <CCardBody>
                              <CSLab code="CV" />
                            </CCardBody>
                          </CCard>
                        </CCol>
                      </CRow>
                    </CTabPane>
                  </CTabContent>
                </CTabs>
              </CForm>
            </CCardBody>
            <CCardFooter>
              {"Update" === mode ? (
                <CButton
                  style={{ marginRight: 5 }}
                  type="button"
                  size="sm"
                  color="success"
                >
                  <CIcon name="cil-scrubber" />

                  <CSLab code="View History" />
                </CButton>
              ) : null}
              <CButton
                style={{
                  marginRight: 5,
                  float: "right",
                  cursor: !canSave ? "not-allowed" : "pointer",
                }}
                // type="button"
                // size="sm"
                // color="success"
                // style={{ cursor: !canSave ? "not-allowed" : "pointer" }}
                disabled={!canSave}
                onClick={() => setVisible(false)}
                color="primary"
              >
                <AiFillSave size={20} /> <CSLab code="TL11" />{" "}
              </CButton>
              <CButton
                style={{ marginRight: 5, float: "right" }}
                type="button"
                size="sm"
                color="warning"
              >
                <AiOutlineRedo size={20} /> <CSLab code="TL12" />{" "}
              </CButton>
              <CButton
                style={{ marginRight: 5, float: "right", color: "white" }}
                onClick={() => searchReset()}
                type="button"
                size="sm"
                color="danger"
              >
                <AiOutlineClose size={20} />
                <CSLab code="Cancel" />
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default HireApplicant;
