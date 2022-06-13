import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  CInputGroupAppend,
  CSelect,
  CInputGroup,
  CInput,
  CTextarea,
  CCard,
  CCardBody,
  CFormGroup,
  CCol,
  CRow,
  CButton,
  CLabel,
  CCardFooter,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import {
  AiOutlinePlus,
  AiFillSave,
  AiOutlineRedo,
  AiOutlineClose,
} from "react-icons/ai";
import CIcon from "@coreui/icons-react";

import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  Sort,
  Edit,
  CommandColumn,
  Toolbar,
} from "@syncfusion/ej2-react-grids";

import { CSDivider, CSLab } from "src/reusable/components";
import { GetLabelByName } from "src/reusable/configs/config";
import { CardBodyHeight } from "src/reusable/utils/helper";

const editOptions = {
  allowEditing: true,
  allowAdding: true,
  allowDeleting: false,
  allowEditOnDblClick: true,
};
const toolbarOptions = ["Add", "Cancel"];

const commandOptions = [
  {
    type: "Edit",
    buttonOption: { iconCss: " e-icons e-edit", cssClass: "e-flat" },
  },
  {
    type: "Delete",
    buttonOption: { iconCss: "e-icons e-delete", cssClass: "e-flat" },
  },
  {
    type: "Save",
    buttonOption: { iconCss: "e-icons e-update", cssClass: "e-flat" },
  },
];

const SupervisorAppraisal = () => {
  const lan = useSelector((state) => state.language);
  const TransLabelByCode = (name) => GetLabelByName(name, lan);

  const [visible, setVisible] = useState(false);
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
            <CSLab code="Supervisor Appraisal" />{" "}
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
                placeholder={TransLabelByCode(
                  "Search for Supervisor Appraisal by name"
                )}
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
            <CCardBody style={{ height: CardBodyHeight, overflowY: "auto" }}>
              <CRow>
                <CCol md="6">
                  <CRow>
                    <CCol md="4">
                      <CLabel>
                        <CSLab code={"Code"} />
                      </CLabel>
                      <CInput className="" id="code" />
                    </CCol>
                    <CCol md="8">
                      <CLabel>
                        <CSLab code={"Name"} />
                      </CLabel>
                      <CInput className="" id="Name" />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md="6">
                      <CLabel>
                        <CSLab code={"Department"} />
                      </CLabel>
                      <CSelect>
                        {["Select Department", "Dept 1", "Dept 2"].map(
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
                        <CSLab code={"Position"} />
                      </CLabel>
                      <CSelect>
                        {["Select Position", "Position 1", "Position 2"].map(
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
                    <CCol md="4">
                      <CLabel htmlFor="startdate">
                        <CSLab code={"start Date"} />
                      </CLabel>
                      <CInput className="" type="date" id="startdate" />
                    </CCol>
                    <CCol md="4">
                      <CLabel htmlFor="enddate">
                        <CSLab code={"End Date"} />
                      </CLabel>
                      <CInput className="" type="date" id="enddate" />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md="12">
                      <CLabel>
                        {" "}
                        <CSLab code="Notes" />{" "}
                      </CLabel>
                      <CTextarea
                        type="text"
                        style={{ height: "80px", resize: "none" }}
                      />
                    </CCol>
                  </CRow>
                </CCol>

                <CSDivider style={{ height: "100%" }} md="1" />

                <CCol md="5">
                  <>
                    {/* <CCol md="12" className='text-right'>
                                            <CButton type="button" size="sm" color="primary" onClick={() => setVisible(true)}> <AiOutlinePlus />  <CSLab code="Add" /></CButton>
                                        </CCol> */}
                    <CCol md="12" style={{ marginTop: "8px" }}>
                      <GridComponent
                        allowPaging={true}
                        pageSettings={{ pageSize: 6 }}
                        editSettings={editOptions}
                        toolbar={toolbarOptions}
                      >
                        <ColumnsDirective>
                          <ColumnDirective
                            field={"id"}
                            headerText={"ID"}
                            width="100"
                            visible={false}
                          />
                          <ColumnDirective
                            field={"name"}
                            headerText="No."
                            width="100"
                          />
                          <ColumnDirective
                            field={"amount"}
                            headerText="Supervisor Response"
                            editType="numericedit"
                            format="C2"
                            width="100"
                          />
                          <ColumnDirective
                            commands={commandOptions}
                            headerText={"Action"}
                            width="100"
                            textAlign="Center"
                          />
                        </ColumnsDirective>
                        <Inject
                          services={[
                            Page,
                            Sort,
                            Filter,
                            Group,
                            Edit,
                            CommandColumn,
                            Toolbar,
                          ]}
                        />
                      </GridComponent>
                    </CCol>
                  </>
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

      <CModal
        show={visible}
        size={"lg"}
        onClose={() => setVisible(false)}
        closeOnBackdrop={false}
      >
        <CModalHeader>
          <CModalTitle>
            {" "}
            <CSLab code="Add GL Account" />{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <>
              <CCol md="6">
                <CLabel>
                  <CSLab code="Code" />
                </CLabel>
                <CInput className="" id="glCode" />
              </CCol>
              <CCol md="6">
                <CLabel>
                  <CSLab code="Name" />
                </CLabel>
                <CInput className="" id="glName" />
              </CCol>
            </>
            <>
              <CCol md="6">
                <CLabel>
                  <CSLab code="GL Account" />
                </CLabel>
                <CSelect>
                  {["Select GL Account", "GL 1", "GL 2"].map((x, i) => (
                    <option key={i} value={x}>
                      {x}
                    </option>
                  ))}
                </CSelect>
              </CCol>
            </>
          </CRow>
          <CRow>
            <></>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            {" "}
            <CSLab code="TL50" />{" "}
          </CButton>
          <CButton color="primary">
            <CSLab code="TL11" />
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default SupervisorAppraisal;
