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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CLabel,
  CTextarea,
  CSelect,
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
  //CommandColumn
} from "@syncfusion/ej2-react-grids";
import { CardBodyHeight } from "src/reusable/utils/helper";
import { GetLabelByName } from "src/reusable/configs/config";
import { CSLab } from "../../../reusable/components";
import { AiOutlinePlus } from "react-icons/ai";

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
  {
    type: "Cancel",
    buttonOption: { iconCss: "e-icons e-cancel-icon", cssClass: "e-flat" },
  },
];

const editOptions = {
  allowEditing: true,
  allowAdding: true,
  allowDeleting: false,
  allowEditOnDblClick: true,
};

const EmployeeEducationInformation = (props) => {
  const lan = useSelector((state) => state.language);

  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(false);
  const TransLabelByCode = (name) => GetLabelByName(name, lan);

  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="Employee Education Information" />
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
                placeholder={TransLabelByCode("Search for Employee by name")}
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
        <CCol md="8" className="text-right"></CCol>
        <CCol xs="12" hidden={show}>
          <CCard>
            <CCardBody style={{ height: CardBodyHeight, overflowY: "auto" }}>
              <CRow>
                <CCol md="12" style={{ marginBottom: "5px" }}>
                  <CButton
                    type="button"
                    size="sm"
                    color="primary"
                    onClick={() => setVisible(true)}
                  >
                    <AiOutlinePlus />
                    <CSLab code="Add Employee Education Information" />{" "}
                  </CButton>
                </CCol>
                <CCol md="12">
                  <GridComponent
                    dataSource={{}}
                    allowPaging={true}
                    pageSettings={{ pageSize: 6 }}
                    editSettings={editOptions}
                  >
                    <ColumnsDirective>
                      <ColumnDirective
                        field={"id"}
                        headerText={"ID"}
                        width="100"
                        visible={false}
                      />
                      <ColumnDirective
                        field={"startDate"}
                        headerText="Start Date"
                        width="100"
                      />
                      <ColumnDirective
                        field={"endDate"}
                        headerText="End Date"
                        width="100"
                      />
                      <ColumnDirective
                        field={"qualification"}
                        headerText="Qualification"
                        width="100"
                      />
                      <ColumnDirective
                        field={"coreArea"}
                        headerText="Core Area"
                        width="100"
                      />
                      <ColumnDirective
                        field={"professionalTitle"}
                        headerText="Professional Title"
                        width="100"
                      />
                      <ColumnDirective
                        field={"grade"}
                        headerText="Grade"
                        width="100"
                      />
                      <ColumnDirective
                        field={"comment"}
                        headerText="Comment"
                        width="100"
                      />
                      <ColumnDirective
                        commands={commandOptions}
                        headerText={"Action"}
                        width="100"
                        textAlign="Center"
                      />
                    </ColumnsDirective>
                    <Inject services={[Page, Sort, Filter, Group, Edit]} />
                  </GridComponent>
                </CCol>
              </CRow>
            </CCardBody>
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
            <CSLab code="Add Employee Education Information" />{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="3">
              <CLabel htmlFor="date">
                <CSLab code="Start Date" />
              </CLabel>
              <CInput className="" id="StartDate" type="date" />
            </CCol>
            <CCol md="3">
              <CLabel htmlFor="endDate">
                <CSLab code="End Date" />
              </CLabel>
              <CInput className="" id="endDate" type="date" />
            </CCol>
            <CCol md="6">
              <CLabel htmlFor="qualification">
                <CSLab code="Qualification" />
              </CLabel>
              <CSelect>
                {[
                  "Select Qualification",
                  "Qualification 1",
                  "Qualification 2",
                ].map((x, i) => (
                  <option value={x} key={1}>
                    {x}
                  </option>
                ))}
              </CSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="4">
              <CLabel htmlFor="coreArea">
                <CSLab code="Core Area " />
              </CLabel>
              <CSelect>
                {["Select Core Area", "Core Area 1", "Core Area 2"].map(
                  (x, i) => (
                    <option value={x} key={1}>
                      {x}
                    </option>
                  )
                )}
              </CSelect>
            </CCol>
            <CCol md="4">
              <CLabel htmlFor="professionalTitle">
                <CSLab code="Professional Title" />
              </CLabel>
              <CSelect>
                {[
                  "Select Professional Title",
                  "Professional Title 1",
                  "Professional Title 2",
                ].map((x, i) => (
                  <option value={x} key={1}>
                    {x}
                  </option>
                ))}
              </CSelect>
            </CCol>
            <CCol md="4">
              <CLabel htmlFor="grade">
                <CSLab code="Grade" />
              </CLabel>
              <CInput className="" id="grade" type="text" />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="12">
              <CLabel htmlFor="comment">
                <CSLab code="Comment" />
              </CLabel>
              <CTextarea
                id="comment"
                style={{ height: "80px", resize: "none" }}
              ></CTextarea>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            <CSLab code="TL50" />
          </CButton>
          <CButton color="primary">
            <CSLab code="TL11" />
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EmployeeEducationInformation;
