import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  CInputGroupAppend,
  CInputGroup,
  CInput,
  CCard,
  CSelect,
  CCardBody,
  CFormGroup,
  CCol,
  CRow,
  CButton,
  CLabel,
  CCardFooter,
  CTextarea,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { AiFillSave, AiOutlineRedo, AiOutlineClose } from "react-icons/ai";
import { BoolStatus, CardBodyHeight } from "src/reusable/utils/helper";
import { CSLab } from "src/reusable/components";
import { GetLabelByName } from "src/reusable/configs/config";

const ChangeEmployeeStatus = () => {
  const lan = useSelector((state) => state.language);
  const TransLabelByCode = (name) => GetLabelByName(name, lan);

  const [show, setShow] = useState(true);
  const [mode, setMode] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setsearchResult] = useState(null);

  const searchReset = () => {
    setShow(true);
    setSearchInput("");
  };

  return (
    <>
      <CRow>
        <CCol>
          <h5>
            <CSLab code="HCM-RH57N1T1EBH-KCMI" />{" "}
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
                placeholder={TransLabelByCode("Search for employee by name")}
              />
              <CInputGroupAppend>
                <CButton
                  onClick={() => setShow(!show)}
                  className="border-right-curve"
                  color="primary"
                >
                  {" "}
                  <CIcon name="cil-magnifying-glass" />
                </CButton>
              </CInputGroupAppend>
            </CInputGroup>
          </CFormGroup>
        </CCol>
        <CCol xs="12" hidden={show}>
          <CCard>
            <CCardBody style={{ height: CardBodyHeight, overflowY: "auto" }}>
              <CRow className={"bottom-spacing"}>
                <CCol md="5">
                  <CRow>
                    <CCol md="6">
                      <CLabel>
                        <CSLab code="HCM-B0VG88EHYDM_KCMI" />
                      </CLabel>
                      <CInput className="" name="currentemployeeid" disabled />
                    </CCol>
                    <CCol md="6">
                      <CLabel>
                        <CSLab code="HCM-FQYC4N0VN1W-HRPR" />
                      </CLabel>
                      <CInput className="" name="employeeName" />
                    </CCol>
                    <CCol md="6">
                      <CLabel>
                        <CSLab code="HCM-VZL7SHYF7OB_KCMI" />
                      </CLabel>
                      <CInput type="date" className="" name="date" />
                    </CCol>
                    <CCol md="6">
                      <CLabel>
                        <CSLab code="HCM-B4SZR3O5JPO-PSLL" />
                      </CLabel>
                      <CSelect>
                        {BoolStatus.map((x, i) => (
                          <option key={i} value={x.id}>
                            {" "}
                            {x.name}
                          </option>
                        ))}
                      </CSelect>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md="12">
                      <CLabel>
                        {" "}
                        <CSLab code="HCM-1NNHRS3H3JT_LANG" />
                      </CLabel>
                      <CTextarea
                        name="reason"
                        style={{ height: "80px", resize: "none" }}
                        id="reason"
                      />
                    </CCol>
                  </CRow>
                </CCol>
                <CCol md="7"></CCol>
              </CRow>
            </CCardBody>
            <CCardFooter>
              <CButton
                style={{ marginRight: 5 }}
                type="button"
                size="sm"
                color="success"
              >
                {" "}
                <CIcon name="cil-scrubber" />{" "}
                <CSLab code="HCM-ZIRH5SVBDUF_LANG" />{" "}
              </CButton>
              <CButton
                style={{ marginRight: 5, float: "right" }}
                type="button"
                size="sm"
                color="success"
              >
                {" "}
                <AiFillSave size={20} /> <CSLab code="HCM-HGUHIR0OK6T" />{" "}
              </CButton>
              <CButton
                style={{ marginRight: 5, float: "right" }}
                type="button"
                size="sm"
                color="warning"
              >
                {" "}
                <AiOutlineRedo
                  size={20}
                /> <CSLab code="HCM-MELULU9B6R_KCMI" />{" "}
              </CButton>
              <CButton
                style={{ marginRight: 5, float: "right", color: "white" }}
                onClick={() => searchReset()}
                type="button"
                size="sm"
                color="danger"
              >
                <AiOutlineClose size={20} />
                <CSLab code="HCM-V3SL5X7PJ9C-LANG" />
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default ChangeEmployeeStatus;
