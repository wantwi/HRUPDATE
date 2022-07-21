import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  CSDivider,
  CSLineLabel,
  CSRequiredIndicator,
} from "src/reusable/components";
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
  CTextarea,
  CCardFooter,
  CSelect,
  CCardHeader,
} from "@coreui/react";
import {
  AiOutlinePlus,
  AiFillSave,
  AiOutlineRedo,
  AiOutlineClose,
} from "react-icons/ai";
import { CardBodyHeight } from "src/reusable/utils/helper";
import CIcon from "@coreui/icons-react";

import { CSLab } from "src/reusable/components";
import { GetLabelByName } from "src/reusable/configs/config";

const EmployeeCheckList = () => {
  const lan = useSelector((state) => state.language);
  const TransLabelByCode = (name) => GetLabelByName(name, lan);
  const searchReset = () => {
    setShow(true);
    setSearchInput("");
  };
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(true);
  const [mode, setMode] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setsearchResult] = useState(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const canSave = [name, status].every(Boolean);

  return (
    <>
      <CRow>
        <CCol hidden={!show}>
          <h5>
            <CSLab code="HCM-ZN0HQXYQ7E9_HRPR" />{" "}
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
                placeholder={TransLabelByCode("Search for check list by name")}
              />
              <CInputGroupAppend>
                <CButton className="border-right-curve" color="primary">
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
            <CCardHeader>
              <CRow>
                <CCol>
                  <h5>
                    <CSLab code="HCM-ZN0HQXYQ7E9_HRPR" />{" "}
                  </h5>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody style={{ height: CardBodyHeight, overflowY: "auto" }}>
              <CRow>
                <CCol md="6">
                  <CRow>
                    <CCol md="4">
                      <CLabel htmlFor="code">
                        <CSLab code="HCM-7I262DWOU2R-LOLN" />
                      </CLabel>
                      <CInput className="" id="code" />
                    </CCol>
                    <CCol md="8">
                      <CLabel htmlFor="name">
                        <CSLab code="HCM-VD1B12NKKJ_LANG" />
                        <CSRequiredIndicator />
                      </CLabel>
                      <CInput
                        className=""
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md="4">
                      <CLabel htmlFor="status">
                        <CSLab code="HCM-RQB38Y1ZFPO-LANG" />
                        <CSRequiredIndicator />
                      </CLabel>
                      <CSelect
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        {["Select Status", "Active", "Inactive"].map((x, i) => (
                          <option value={x} key={i}>
                            {x}
                          </option>
                        ))}
                      </CSelect>
                    </CCol>
                  </CRow>
                  <CRow className={"bottom-spacing"}>
                    <CCol md="12">
                      <CLabel htmlFor="name">
                        <CSLab code="HCM-Z0FV0XJJ06" />
                      </CLabel>
                      <CTextarea
                        className=""
                        style={{ height: "80px", resize: "none" }}
                        id="note"
                      ></CTextarea>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol md="6"></CCol>
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
                style={{
                  marginRight: 5,
                  float: "right",
                  cursor: !canSave ? "not-allowed" : "pointer",
                }}
                disabled={!canSave}
                onClick={() => setVisible(false)}
                color="primary"
              >
                <AiFillSave size={20} /> <CSLab code="HCM-HGUHIR0OK6T" />{" "}
              </CButton>
              <CButton
                style={{ marginRight: 5, float: "right" }}
                type="button"
                size="sm"
                color="warning"
              >
                <AiOutlineRedo size={20} />{" "}
                <CSLab code="HCM-9E3ZC2E1S0N-LASN" />{" "}
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

export default EmployeeCheckList;
