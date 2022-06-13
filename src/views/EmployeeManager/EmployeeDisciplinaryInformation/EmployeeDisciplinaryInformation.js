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

const EmployeeDisciplinaryInformation = (props) => {
  const lan = useSelector((state) => state.language);

  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(false);
  const TransLabelByCode = (name) => GetLabelByName(name, lan);

  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="Employee Disciplinary Information" />
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
                placeholder={TransLabelByCode("Search for Employee name")}
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
                    <CSLab code="Add Employee Disciplinary Information" />{" "}
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
                        field={"date"}
                        headerText={"Date"}
                        width="100"
                        visible={false}
                      />
                      <ColumnDirective
                        field={"releaseDate"}
                        headerText="Release Date"
                        width="100"
                      />
                      <ColumnDirective
                        field={"followUpDate"}
                        headerText="Follow Up Date"
                        width="100"
                      />
                      <ColumnDirective
                        field={"offence"}
                        headerText="Offence"
                        width="100"
                      />
                      <ColumnDirective
                        field={"actionTaken"}
                        headerText="Action Taken"
                        width="100"
                      />
                      <ColumnDirective
                        field={"byWhom"}
                        headerText="By Whom"
                        width="100"
                      />
                      <ColumnDirective
                        field={"sendNote"}
                        headerText="Send Note"
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
            <CSLab code="Add Employee Disciplinary Information" />{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="4">
              <CLabel htmlFor="date">
                <CSLab code="Date" />
              </CLabel>
              <CInput className="" id="date" type="date" />
            </CCol>
            <CCol md="4">
              <CLabel htmlFor="releaseDate">
                <CSLab code="Release Date" />
              </CLabel>
              <CInput className="" id="releaseDate" type="date" />
            </CCol>
            <CCol md="4">
              <CLabel htmlFor="followUpDate">
                <CSLab code="Follow Up Date" />
              </CLabel>
              <CInput className="" id="followUpDate" type="date" />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="4">
              <CLabel htmlFor="offence">
                <CSLab code="Offence" />
              </CLabel>
              <CInput className="" id="offence" type="text" />
            </CCol>

            <CCol md="4">
              <CLabel htmlFor="actionTaken">
                <CSLab code="Action Taken" />
              </CLabel>
              <CInput className="" id="actionTaken" type="text" />
            </CCol>
            <CCol md="4">
              <CLabel htmlFor="byWhom">
                <CSLab code="By Whom" />
              </CLabel>
              <CInput className="" id="byWhom" type="text" />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="12">
              <CLabel htmlFor="sendNote">
                <CSLab code="Send note" />
              </CLabel>
              <CTextarea
                id="sendNote"
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

export default EmployeeDisciplinaryInformation;
