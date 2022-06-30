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
  CButton,
  CLabel,
  CCardFooter,
  CSelect,
  CTextarea,
} from "@coreui/react";
import { AiFillSave, AiOutlineRedo } from "react-icons/ai";
import { CardBodyHeight } from "src/reusable/utils/helper";
import { GetLabelByName } from "src/reusable/configs/config";
import { CSDivider, CSLab, CSLineLabel } from "../../../reusable/components";
import "../../../scss/_custom_table.scss";

const EmployeeMovement = (props) => {
  const lan = useSelector((state) => state.language);

  const [show, setShow] = useState(true);
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
            <CSLab code="HCM-219IVWXVLBI_HRPR" />
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
              <CRow className={"bottom-spacing"}>
                <CCol md="6">
                  <CCol md="12">
                    <CSLineLabel name="HCM-I2TGMIC1TS-HRPR" />{" "}
                  </CCol>
                  <>
                    <CRow>
                      <CCol md="6">
                        <CLabel>
                          {" "}
                          <CSLab code="HCM-HMLNLPOEIXG" />{" "}
                        </CLabel>
                        <CSelect disabled>
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
                      <CCol md="6">
                        <CLabel>
                          {" "}
                          <CSLab code="HCM-N6I0LSIYJF" />{" "}
                        </CLabel>
                        <CSelect disabled>
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
                    </CRow>
                  </>
                  <>
                    <CRow>
                      <CCol md="6">
                        <CLabel>
                          {" "}
                          <CSLab code="HCM-4D1SZ24U9UO" />{" "}
                        </CLabel>
                        <CSelect disabled>
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
                      <CCol md="6">
                        <CLabel>
                          {" "}
                          <CSLab code="HCM-LAFPT6FJ57N" />{" "}
                        </CLabel>
                        <CSelect disabled>
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
                    </CRow>
                    <CRow>
                      <CCol md="6">
                        <CLabel>
                          {" "}
                          <CSLab code="HCM-ATGLL367GOQ" />{" "}
                        </CLabel>
                        <CSelect disabled>
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
                      <CCol md="6">
                        <CLabel>
                          {" "}
                          <CSLab code="HCM-DHV9W3RF11D" />{" "}
                        </CLabel>
                        <CSelect disabled>
                          {["Select Unit", "Unit 1", "Unit 2", "Unit 3"].map(
                            (x, i) => (
                              <option key={i} value={x}>
                                {x}
                              </option>
                            )
                          )}
                        </CSelect>
                      </CCol>
                    </CRow>
                  </>
                  <>
                    <CRow>
                      <CCol md="6">
                        <CLabel>
                          {" "}
                          <CSLab code="HCM-6XXECXM4Q5S" />{" "}
                        </CLabel>
                        <CSelect disabled>
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
                    </CRow>
                  </>
                </CCol>

                <CSDivider md="1" />

                <CCol md="5">
                  <CRow>
                    <CCol md="12">
                      <CSLineLabel name="HCM-EKUWHXBRW2O-LANG" />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md="6">
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
                    <CCol md="6">
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
                  </CRow>
                  <CRow>
                    <CCol md="6">
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
                    <CCol md="6">
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
                  </CRow>
                  <CRow>
                    <CCol md="6">
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
                    <CCol md="6">
                      <CLabel>
                        {" "}
                        <CSLab code="HCM-DHV9W3RF11D" />{" "}
                      </CLabel>
                      <CSelect>
                        {["Select Unit", "Unit 1", "Unit 2", "Unit 3"].map(
                          (x, i) => (
                            <option key={i} value={x}>
                              {x}
                            </option>
                          )
                        )}
                      </CSelect>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md="6">
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
                  </CRow>
                  <CRow>
                    <CCol md="12">
                      <CLabel>
                        {" "}
                        <CSLab code="HCM-1NNHRS3H3JT_LANG" />{" "}
                      </CLabel>
                      <CTextarea
                        style={{ height: "80px", resize: "none" }}
                      ></CTextarea>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md="6"></CCol>
                    <CCol md="6" style={{ float: "right" }}>
                      <CLabel>
                        {" "}
                        <CSLab code="HCM-Z9XSW3FPTIP_HRPR" />{" "}
                      </CLabel>
                      <CInput />
                    </CCol>
                  </CRow>
                </CCol>
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

export default EmployeeMovement;
