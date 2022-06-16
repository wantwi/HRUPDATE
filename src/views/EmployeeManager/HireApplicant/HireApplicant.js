import React, { useState } from "react";
import { useSelector } from "react-redux";

import CIcon from "@coreui/icons-react";
import {
  CSDivider,
  CSRequiredIndicator,
} from "src/reusable/components";

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
            <CSLab code="Hire Applicant" />
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
                placeholder={TransLabelByCode("Search for applicant by name")}
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
                <AiOutlinePlus /> <CSLab code="Add" />
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
                        <CSLab code="TL63" />
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
                        <CSLab code="TL64" />
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
                        <CSLab code="TL65" />
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
                        <CSLab code="TL66" />
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
                                <CSLab code="Title" />{" "}
                              </CLabel>
                              <CInput name="title" id="title" />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="firstname">
                                {" "}
                                <CSLab code="TL15" />{" "}
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
                                <CSLab code="TL17" />{" "}
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
                                <CSLab code="TL69" />
                                <CSRequiredIndicator />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Divisions }}
                              />
                            </CCol>
                            <CCol md="3">
                              <CLabel>
                                <CSLab code="TL70" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Divisions }}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                <CSLab code="TL71" />
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
                                <CSLab code="TL72" />
                              </CLabel>
                              <CInput className="" id="age" disabled />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="3">
                              <CLabel htmlFor="code">
                                <CSLab code="TL73" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Divisions }}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="spousename">
                                <CSLab code="Spouse's Name" />
                              </CLabel>
                              <CInput className="" id="spousename" />
                            </CCol>
                            <CCol md="3">
                              <CLabel htmlFor="spouselifestatus">
                                <CSLab code="Spouse Life Status" />
                              </CLabel>
                              <CInput className="" id="spouselifestatus" />
                            </CCol>
                            <CCol md="2">
                              <CLabel htmlFor="children">
                                <CSLab code="Children" />
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
                              <CSLineLabel name={"Contact Info"} />
                            </CCol>
                            <CCol md="5">
                              <CLabel htmlFor="email">
                                <CSLab code="TL18" />
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
                                <CSLab code="TL19" />
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
                                <CSLab code="TL74" />
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
                                <CSLab code="Street Address" />
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
                                <CSLab code="Mortgage A/C #" />
                              </CLabel>
                              <CInput className="" id="mortgageac" />
                            </CCol>
                            <CCol md="3">
                              <CLabel htmlFor="ssfnumber">
                                <CSLab code="SSF Number" />
                              </CLabel>
                              <CInput className="" id="ssfnumber" />
                            </CCol>
                            <CCol md="3">
                              <CLabel htmlFor="region">
                                <CSLab code="Region" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Region: Divisions }}
                              />
                            </CCol>
                            <CCol md="3">
                              <CLabel htmlFor="district">
                                <CSLab code="District" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ district: Divisions }}
                              />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="3" xs="6">
                              <CLabel htmlFor="tribe">
                                <CSLab code="Tribe" />
                              </CLabel>
                              <CInput className="" id="tribe" />
                            </CCol>
                            <CCol md="3" xs="6" style={{ marginTop: "17px" }}>
                              <CSCheckbox label="Disablity" name="disablity" />
                            </CCol>
                            <CCol md="3" xs="6" style={{ marginTop: "17px" }}>
                              <CSCheckbox label="Pays S.S.F" name="paysssf" />
                            </CCol>
                            <CCol md="3" xs="6" style={{ marginTop: "17px" }}>
                              <CSCheckbox label="Pays Tax" name="paystax" />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="3" xs="6" style={{ marginTop: "17px" }}>
                              <CSCheckbox
                                label="Union Memeber"
                                name="unionmemeber"
                              />
                            </CCol>
                            <CCol xs="12" md="3">
                              <CLabel htmlFor="unionname">
                                <CSLab code="Union Name" />
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
                                <CSLab code="Passport #" />
                              </CLabel>
                              <CInput className="" id="passportnumber" />
                            </CCol>
                            <CCol md="3">
                              <CLabel htmlFor="passporttype">
                                <CSLab code="Passport Type" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ PassportType: Divisions }}
                              />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="3">
                              <CLabel htmlFor="status">
                                <CSLab code="Status" />
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
                                <CSLab code="TL75" />
                              </CLabel>
                              <CInput className="" id="employeeid" />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="hiredate">
                                <CSLab code="TL76" />
                              </CLabel>
                              <CInput type="date" className="" id="hiredate" />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="employeetype">
                                <CSLab code="TL77" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ EmployeeType: Divisions }}
                              />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="4">
                              <CLabel htmlFor="tin">
                                <CSLab code="TL82" />
                              </CLabel>
                              <CInput className="" id="tin" />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="12" style={{ marginTop: "5px" }}>
                              <CSLineLabel name={"Segments"} />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="name">
                                <CSLab code="TL78" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Position: Divisions }}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="code">
                                <CSLab code="TL07" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Locations: Divisions }}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="name">
                                <CSLab code="TL05" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Divisions }}
                              />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="4">
                              <CLabel htmlFor="name">
                                <CSLab code="TL79" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Departments: Divisions }}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="name">
                                <CSLab code="TL80" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Section: Divisions }}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="code">
                                <CSLab code="TL81" />
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
                                <CSLab code="TL83" />
                              </h6>
                            </CCol>

                            <CCol md="4">
                              <CLabel htmlFor="grade">
                                <CSLab code="TL84" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Grade: Divisions }}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="type">
                                <CSLab code="TL85" />
                              </CLabel>
                              <SingleSelectComponent
                                multiData={{ Type: Divisions }}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel htmlFor="rate">
                                <CSLab code="TL86" />
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
