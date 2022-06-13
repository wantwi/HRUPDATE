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
  CCardFooter,
  CSelect,
  CForm,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CLabel,
  CTextarea,
  CInputRadio,
} from "@coreui/react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { AiFillSave, AiOutlineRedo } from "react-icons/ai";
import { CardBodyHeight } from "src/reusable/utils/helper";
import { CSDivider } from "../../../reusable/components";
import "../../../scss/_custom_table.scss";

import { Divisions } from "../../../reusable/utils/GenericData";
import { GetLabelByName } from "src/reusable/configs/config";
import {
  CSCheckbox,
  CSLab,
  CSLineLabel,
  SingleSelectComponent,
} from "../../../reusable/components";
import { Checkbox } from "evergreen-ui";
import CheckBoxComponent from "src/reusable/components/CheckBoxComponent/CheckBoxComponent";
import { setChecked } from "@syncfusion/ej2-react-grids";
import { CFormCheck, CFormInput } from "@coreui/bootstrap-react";

const LeaveTypes = (props) => {
  const lan = useSelector((state) => state.language);

  const [show, setShow] = useState(true);
  const [activeKey, setActiveKey] = useState(1);
  const [, setSaveContinueLabel] = useState("Continue");
  const [searchInput, setSearchInput] = useState("");
  const [mode, setMode] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleAddNewRecord = () => {
    setMode("Add");
    setShow(false);
  };
  const TransLabelByCode = (name) => GetLabelByName(name, lan);
  const searchReset = () => {
    setShow(true);
    setSearchInput("");

    // const [grid,] = useState(null);

    const TransLabelByCode = (name) => GetLabelByName(name, lan);

    // const OnSaveContinueClick = () => {
    //     console.log(grid);
    // }
  };
  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="Leave Types" />
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

        <CCol md="8" xs="5" className="text-right">
          <CFormGroup>
            <CButton
              type="button"
              onClick={handleAddNewRecord}
              size="sm"
              color="primary"
            >
              {" "}
              <AiOutlinePlus /> {show ? <CSLab code={"Add "} /> : null}{" "}
            </CButton>
          </CFormGroup>
        </CCol>
      </CRow>
      <CRow>
        <CCol md="8" className="text-right"></CCol>
        <CCol xs="12" hidden={show}>
          <CCard>
            <CCardBody style={{ height: CardBodyHeight }}>
              <CRow className={"bottom-spacing"}>
                <CCol md="5">
                  <CCol md="12">
                    <CSLineLabel name="Leave Type" />{" "}
                  </CCol>
                  <>
                    <CRow>
                      <CCol md="4">
                        <CLabel>
                          {" "}
                          <CSLab code="Code" />{" "}
                        </CLabel>
                        <CInput />
                      </CCol>
                      <CCol md="8">
                        <CLabel>
                          {" "}
                          <CSLab code="Name" />{" "}
                        </CLabel>
                        <CInput />
                      </CCol>
                    </CRow>
                  </>
                  <>
                    <CRow style={{ marginTop: "10px" }}>
                      <CCol md="6">
                        <CLabel>
                          {" "}
                          <CSLab code="Available Days Basis" />{" "}
                        </CLabel>
                        <CSelect>
                          {["Select Days Basis", "Accrual", "Balance"].map(
                            (x, i) => (
                              <option key={i} value={x}>
                                {x}
                              </option>
                            )
                          )}
                        </CSelect>
                      </CCol>
                      <CCol md="6">
                        <CLabel>
                          {" "}
                          <CSLab code="Allowed Days Basis" />{" "}
                        </CLabel>
                        <CSelect>
                          {["Select", "Calender", "Working Days"].map(
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
                      <CCol md="12">
                        <CLabel>
                          {" "}
                          <CSLab code="Note" />{" "}
                        </CLabel>
                        <CTextarea
                          style={{ height: "80px", resize: "none" }}
                        ></CTextarea>
                      </CCol>
                    </CRow>
                    <CRow style={{ marginTop: "10px" }}>
                      <CCol md="4">
                        <CLabel>
                          {" "}
                          <CSLab code="Status" />{" "}
                        </CLabel>
                        <CSelect>
                          {["Select Status", "Active", "Inactive"].map(
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
                  <></>
                </CCol>

                <CSDivider style={{ height: "100%" }} md="1" />

                <CCol md="6">
                  <CCol md="12">
                    <CSLineLabel name="Year-End Rules" />{" "}
                    <CRow>
                      <CCol md="6">
                        <CLabel>
                          {" "}
                          <CSLab code="Year-End Basis" />{" "}
                        </CLabel>
                        <CSelect>
                          {[
                            "Select",
                            "Calender",
                            "Employee Anniversary",
                            "Corporate Calender",
                          ].map((x, i) => (
                            <option key={i} value={x}>
                              {x}
                            </option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CRow>
                    <CRow
                      style={{
                        border: "1px solid #e1e2e3",
                        // height: 85,
                        background: "#ebedef",
                        marginTop: "10px",
                        borderRadius: "8px",

                        // padding: "13px",
                        width: "100%",
                      }}
                    >
                      {/* <CCol
                        sm={2}
                        md="6"
                        style={{ marginTop: "10px" }}
                        class=" form-check-inline"
                      >
                        <CFormCheck
                          type="radio"
                          name="gridRadios"
                          id="gridRadios1"
                          value="option1"
                          label="Forfeit-Outstanding Days"
                          defaultChecked
                        />
                        <CFormCheck
                          type="radio"
                          name="gridRadios"
                          id="gridRadios2"
                          value="option2"
                          label="Carry-Forward Outstanding Days"
                        />
                      </CCol> */}
                      <CCol md="6" style={{ marginTop: "10px" }}>
                        <div class="form-check form-check-inline">
                          <CInput
                            class="form-check-input"
                            id="inlineRadio1"
                            type="radio"
                            name="inlineRadio"
                            value="option1"
                            style={{ width: "15px" }}
                          />
                          <label class="form-check-label" for="inlineRadio1">
                            Forfeit-Outstanding Days
                          </label>
                        </div>
                      </CCol>
                      <CCol md="6" style={{ marginTop: "10px" }}>
                        <div class="form-check form-check-inline">
                          <CInput
                            class="form-check-input"
                            id="inlineRadio2"
                            type="radio"
                            name="inlineRadio"
                            value="option2"
                            style={{ width: "18px" }}
                            checked
                          />
                          <label class="form-check-label" for="inlineRadio2">
                            Carry-Forward Outstanding Days
                          </label>
                        </div>
                      </CCol>
                    </CRow>
                    {/* style={{ background: "red", width: "100%" }} */}
                    <CRow>
                      <CCol md="6" style={{ marginTop: "15px" }}>
                        <CSCheckbox
                          label="Apply Maximum Outstanding Days "
                          name="ApplyMaximumOutstandingdays"
                          onClick={() => setIsChecked(!isChecked)}
                        />
                      </CCol>

                      {isChecked && (
                        <CCol md="6">
                          <CLabel>
                            {" "}
                            <CSLab code="Maximum Number of Days" />{" "}
                          </CLabel>
                          <CInput style={{ width: "91px" }} />
                        </CCol>
                      )}
                    </CRow>
                  </CCol>
                  <CRow></CRow>
                  <CRow></CRow>
                </CCol>
              </CRow>
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

export default LeaveTypes;
