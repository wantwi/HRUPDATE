import React, { useState } from "react";
import { useSelector } from "react-redux";

import CIcon from "@coreui/icons-react";
import {
  AiOutlinePlus,
  AiFillSave,
  AiOutlineRedo,
  AiOutlineClose,
} from "react-icons/ai";
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
  CSelect,
  CCardFooter,
} from "@coreui/react";

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

import "../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-react-grids/styles/material.css";

import { GetLabelByName } from "src/reusable/configs/config";
import { CSDivider, CSLab } from "../../../reusable/components";
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

const EmployeeAppraisal = () => {
  const lan = useSelector((state) => state.language);
  const [show, setShow] = useState(true);
  const [mode, setMode] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setsearchResult] = useState(null);
  const searchReset = () => {
    setShow(true);
    setSearchInput("");
  };

  //const [visible, setVisible]= useState(false);

  const TransLabelByCode = (name) => GetLabelByName(name, lan);
  return (
    <>
      <CRow>
        <CCol>
          <h5>
            <CSLab code="Employee Appraisal" />
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
                placeholder={TransLabelByCode("Search for appraisee by name")}
              />
              <CInputGroupAppend>
                <CButton
                  type="button"
                  className="border-right-curve"
                  color="primary"
                  onClick={() => setShow(!show)}
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
              <CRow>
                <CCol md="6">
                  <CRow>
                    <CCol md="8">
                      <CLabel>
                        <CSLab code="Appraisal Name" />
                      </CLabel>
                      <CSelect name="name">
                        {[
                          "Select Appraisal",
                          "Appraisal 1",
                          "Appraisal 2",
                          "Appraisal 3",
                        ].map((x, i) => (
                          <option key={i} value={x}>
                            {x}
                          </option>
                        ))}
                      </CSelect>
                    </CCol>
                    <CCol md="4">
                      <CLabel>
                        <CSLab code="Department" />
                      </CLabel>
                      <CSelect>
                        {[
                          "Select Department",
                          "Software Develeopment Dpt",
                          "Customer Support Dpt",
                          "Research and Development",
                        ].map((x, i) => (
                          <option key={i} value={x}>
                            {x}
                          </option>
                        ))}
                      </CSelect>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md="4">
                      <CLabel>
                        <CSLab code="Position" />
                      </CLabel>
                      <CSelect>
                        {[
                          "Select Position",
                          "Software Engineer",
                          "Customer Support",
                          "Project Manager",
                        ].map((x, i) => (
                          <option key={i} value={x}>
                            {x}
                          </option>
                        ))}
                      </CSelect>
                    </CCol>
                    <CCol md="4">
                      <CLabel>
                        <CSLab code="Start Date" />
                      </CLabel>
                      <CInput className="" name="startdate" type="date" />
                    </CCol>
                    <CCol md="4">
                      <CLabel>
                        <CSLab code="End Date" />
                      </CLabel>
                      <CInput className="" name="enddate" type="date" />
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
                  <CRow>
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
                  </CRow>
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

export default EmployeeAppraisal;
