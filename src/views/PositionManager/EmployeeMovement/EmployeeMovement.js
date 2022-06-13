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
            <CSLab code="Employee Movement" />
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
                placeholder={TransLabelByCode("TL48")}
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
                    <CSLineLabel name="Transfer From" />{" "}
                  </CCol>
                  <>
                    <CRow>
                      <CCol md="6">
                        <CLabel>
                          {" "}
                          <CSLab code="Employee Type" />{" "}
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
                          <CSLab code="Department" />{" "}
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
                          <CSLab code="Section" />{" "}
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
                          <CSLab code="Division" />{" "}
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
                          <CSLab code="Position" />{" "}
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
                          <CSLab code="Unit" />{" "}
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
                          <CSLab code="Location" />{" "}
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
                      <CSLineLabel name="Transfer To" />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md="6">
                      <CLabel>
                        {" "}
                        <CSLab code="Employee Type" />{" "}
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
                        <CSLab code="Department" />{" "}
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
                        <CSLab code="Section" />{" "}
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
                        <CSLab code="Division" />{" "}
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
                        <CSLab code="Position" />{" "}
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
                        <CSLab code="Unit" />{" "}
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
                        <CSLab code="Location" />{" "}
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
                        <CSLab code="Reason" />{" "}
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
                        <CSLab code="Authorised By" />{" "}
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
                <CIcon name="cil-scrubber" /> <CSLab code="View History" />{" "}
              </CButton>
              <CButton
                style={{ marginRight: 5, float: "right" }}
                type="button"
                size="sm"
                color="success"
              >
                <AiFillSave size={20} /> <CSLab code="TL11" />{" "}
              </CButton>
              <CButton
                style={{ marginRight: 5, float: "right" }}
                type="button"
                size="sm"
                color="danger"
              >
                <AiOutlineRedo size={20} /> <CSLab code="TL12" />{" "}
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default EmployeeMovement;
