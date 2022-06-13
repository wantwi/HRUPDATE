import React, { useState } from "react";
import { useSelector } from "react-redux";
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
  CTextarea,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AiFillSave, AiOutlineRedo, AiOutlineClose } from "react-icons/ai";
import { CardBodyHeight } from "src/reusable/utils/helper";

import { CSLab } from "src/reusable/components";
import { GetLabelByName } from "src/reusable/configs/config";

const ChangeEmployeeId = () => {
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
            <CSLab code="Change Employee ID " />{" "}
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
                  <CIcon name="cil-magnifying-glass" />
                </CButton>
              </CInputGroupAppend>
            </CInputGroup>
          </CFormGroup>
        </CCol>

        <CCol xs="12" hidden={show}>
          <CCard>
            <CCardBody style={{ height: CardBodyHeight, overflowY: "auto" }}>
              <CRow>
                <CCol md="5">
                  <CRow>
                    <CCol md="6">
                      <CLabel htmlFor="currentemployeeid">
                        <CSLab code={"Current Employee ID"} />
                      </CLabel>
                      <CInput className="" id="currentemployeeid" disabled />
                    </CCol>
                    <CCol md="6">
                      <CLabel htmlFor="newemployeeid">
                        <CSLab code={"New Employee ID"} />
                      </CLabel>
                      <CInput className="" id="newemployeeid" />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md="6">
                      <CLabel htmlFor="currentemployeeid">
                        <CSLab code={"Date"} />{" "}
                      </CLabel>
                      <CInput type="date" name="name" />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md="12">
                      <CLabel htmlFor="Reason">
                        <CSLab code="Reason" />
                      </CLabel>
                      <CTextarea
                        className=""
                        style={{ height: "80px", resize: "none" }}
                        id="reason"
                      ></CTextarea>
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

export default ChangeEmployeeId;
