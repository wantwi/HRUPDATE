import React, { useState } from "react";
import { useSelector } from "react-redux";

import CIcon from "@coreui/icons-react";
import {
  CInputGroupAppend,
  CInputGroup,
  CInput,
  CCard,
  CCardBody,
  CFormGroup,
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
import { AiFillSave, AiOutlineRedo } from "react-icons/ai";
import { CardBodyHeight } from "src/reusable/utils/helper";
import { GetLabelByName } from "src/reusable/configs/config";
import { CSLab } from "../../../reusable/components";
import "../../../scss/_custom_table.scss";

const EmployeeRetirementInformation = (props) => {
  const lan = useSelector((state) => state.language);

  const [show, setShow] = useState(true);
  const [activeKey, setActiveKey] = useState(1);
  const [, setSaveContinueLabel] = useState("Terminate");
  // const [grid,] = useState(null);

  const TransLabelByCode = (name) => GetLabelByName(name, lan);

  // const OnSaveContinueClick = () => {
  //     console.log(grid);
  // }

  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-TKI66A490F-KCMI" />
          </h5>
        </CCol>
      </CRow>
      <CRow>
        <CCol md="4">
          <CFormGroup>
            <CInputGroup>
              <CInput
                className="border-left-curve"
                type="text"
                id="username3"
                name="username3"
                autoComplete="name"
                placeholder={TransLabelByCode("HCM-6FKJ6FEGW7A-HRPR")}
              />
              <CInputGroupAppend>
                <CButton
                  onClick={() => setShow(!show)}
                  className="border-right-curve"
                  color="primary"
                >
                  <CIcon name="cil-magnifying-glass" />
                </CButton>
              </CInputGroupAppend>
            </CInputGroup>
          </CFormGroup>
        </CCol>
        <CCol md="8" className="text-right"></CCol>
        <CCol xs="12" hidden={show}>
          <CCard>
            <CCardBody style={{ height: CardBodyHeight, overflowY: "auto" }}>
              <CRow>
                <CCol md="9">
                  <CTabs>
                    <CNav variant="tabs">
                      <CNavItem>
                        <CNavLink
                          href="#"
                          active={activeKey === 1}
                          onClick={() => {
                            setActiveKey(1);
                            setSaveContinueLabel("Terminate");
                          }}
                        >
                          <CSLab code="HCM-PVVKE98OPU-KCMI" />
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink
                          href="#"
                          active={activeKey === 2}
                          onClick={() => {
                            setActiveKey(2);
                            setSaveContinueLabel("Undo");
                          }}
                        >
                          <CSLab code="HCM-HJYLIJZ2N1_PSLL" />
                        </CNavLink>
                      </CNavItem>
                    </CNav>
                    <CTabContent>
                      <CTabPane
                        style={{ marginTop: "10px" }}
                        visible={activeKey === 1 ? "true" : "false"}
                      >
                        <CRow className={"bottom-spacing"}>
                          <CCol md="12">
                            <h6 className="ch-l-s">
                              <CSLab code="Current Status" />
                            </h6>
                          </CCol>
                          <>
                            <CCol md="4">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-HMLNLPOEIXG" />{" "}
                              </CLabel>
                              <CSelect>
                                {[
                                  "Select Employee Type",
                                  "Type 1",
                                  "Type 2",
                                  "Type 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-N6I0LSIYJF" />{" "}
                              </CLabel>
                              <CSelect>
                                {[
                                  "Select Department",
                                  "Department 1",
                                  "Department 2",
                                  "Department 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-4D1SZ24U9UO" />{" "}
                              </CLabel>
                              <CSelect>
                                {[
                                  "Select Section",
                                  "Section 1",
                                  "Section 2",
                                  "Section 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                          </>
                          <>
                            <CCol md="4">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-LAFPT6FJ57N" />{" "}
                              </CLabel>
                              <CSelect>
                                {[
                                  "Select Division",
                                  "Division 1",
                                  "Division 2",
                                  "Division 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-ATGLL367GOQ" />{" "}
                              </CLabel>
                              <CSelect>
                                {[
                                  "Select Position",
                                  "Position 1",
                                  "Position 2",
                                  "Position 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-DHV9W3RF11D" />{" "}
                              </CLabel>
                              <CSelect>
                                {[
                                  "Select Unit",
                                  "Unit 1",
                                  "Unit 2",
                                  "Unit 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                          </>
                          <>
                            <CCol md="4">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-6XXECXM4Q5S" />{" "}
                              </CLabel>
                              <CSelect>
                                {[
                                  "Select Location",
                                  "Location 1",
                                  "Location 2",
                                  "Location 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-OG9VAWH9DRO-KCMI" />{" "}
                              </CLabel>
                              <CInput type="date" />
                            </CCol>
                          </>
                          <>
                            <CCol md="12">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-1NNHRS3H3JT_LANG" />{" "}
                              </CLabel>
                              <CTextarea
                                style={{ height: "70px", resize: "none" }}
                              ></CTextarea>
                            </CCol>
                            <CCol md="8"></CCol>
                            <CCol md="4">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-Z9XSW3FPTIP_HRPR" />{" "}
                              </CLabel>
                              <CInput type="text" />
                            </CCol>
                          </>
                        </CRow>
                      </CTabPane>
                      <CTabPane
                        visible={activeKey === 2 ? "true" : "false"}
                        style={{ marginTop: "10px" }}
                      >
                        <CRow className={"bottom-spacing"}>
                          <CCol md="12">
                            <h6 className="ch-l-s">
                              <CSLab code="HCM-KT1THTBX68-LOLN" />
                            </h6>
                          </CCol>
                          <>
                            <CCol md="4">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-HMLNLPOEIXG" />{" "}
                              </CLabel>
                              <CSelect>
                                {[
                                  "Select Employee Type",
                                  "Type 1",
                                  "Type 2",
                                  "Type 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-N6I0LSIYJF" />{" "}
                              </CLabel>
                              <CSelect>
                                {[
                                  "Select Department",
                                  "Department 1",
                                  "Department 2",
                                  "Department 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-4D1SZ24U9UO" />{" "}
                              </CLabel>
                              <CSelect>
                                {[
                                  "Select Section",
                                  "Section 1",
                                  "Section 2",
                                  "Section 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                          </>
                          <>
                            <CCol md="4">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-LAFPT6FJ57N" />{" "}
                              </CLabel>
                              <CSelect>
                                {[
                                  "Select Division",
                                  "Division 1",
                                  "Division 2",
                                  "Division 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-ATGLL367GOQ" />{" "}
                              </CLabel>
                              <CSelect>
                                {[
                                  "Select Position",
                                  "Position 1",
                                  "Position 2",
                                  "Position 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-DHV9W3RF11D" />{" "}
                              </CLabel>
                              <CSelect>
                                {[
                                  "Select Unit",
                                  "Unit 1",
                                  "Unit 2",
                                  "Unit 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                          </>
                          <>
                            <CCol md="4">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-6XXECXM4Q5S" />{" "}
                              </CLabel>
                              <CSelect>
                                {[
                                  "Select Location",
                                  "Location 1",
                                  "Location 2",
                                  "Location 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-OG9VAWH9DRO-KCMI" />{" "}
                              </CLabel>
                              <CInput type="date" />
                            </CCol>
                          </>
                          <>
                            <CCol md="12">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-Z0FV0XJJ06" />{" "}
                              </CLabel>
                              <CTextarea style={{ height: "80px" }}></CTextarea>
                            </CCol>
                            <CCol md="6"></CCol>
                            <CCol md="6">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-Z9XSW3FPTIP_HRPR" />{" "}
                              </CLabel>
                              <CInput type="text" />
                            </CCol>
                          </>
                        </CRow>
                      </CTabPane>
                    </CTabContent>
                  </CTabs>
                </CCol>
                <CCol md="5"></CCol>
              </CRow>
            </CCardBody>
            <CCardFooter>
              <CButton
                style={{ marginRight: 5 }}
                type="button"
                size="sm"
                color="success"
              >
                <CIcon name="cil-scrubber" />{" "}
                <CSLab code="HCM-ZIRH5SVBDUF_LANG" />{" "}
              </CButton>
              <CButton
                style={{ marginRight: 5, float: "right" }}
                type="button"
                size="sm"
                color="success"
              >
                <AiFillSave size={20} /> <CSLab code="HCM-HGUHIR0OK6T" />{" "}
              </CButton>
              <CButton
                style={{ marginRight: 5, float: "right" }}
                type="button"
                size="sm"
                color="danger"
              >
                <AiOutlineRedo size={20} />{" "}
                <CSLab code="HCM-V3SL5X7PJ9C-LANG" />{" "}
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default EmployeeRetirementInformation;
