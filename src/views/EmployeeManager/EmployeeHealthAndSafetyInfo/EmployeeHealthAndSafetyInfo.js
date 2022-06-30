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

const EmployeeHealthAndSafetyInfo = (props) => {
  const lan = useSelector((state) => state.language);

  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(false);
  const TransLabelByCode = (name) => GetLabelByName(name, lan);

  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-S42LK42CP1-LANG" />
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
                    <CSLab code="HCM-RK9RB2N1DAO-KCMI" />{" "}
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
                        headerText="Date"
                        width="100"
                      />
                      <ColumnDirective
                        field={"accidentType"}
                        headerText="Accident Type"
                        width="100"
                      />
                      <ColumnDirective
                        field={"cost"}
                        headerText="Cost"
                        width="100"
                      />
                      <ColumnDirective
                        field={"Currency"}
                        headerText="Currency"
                        width="100"
                      />
                      <ColumnDirective
                        field={"Description"}
                        headerText="Description"
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
            <CSLab code="HCM-RK9RB2N1DAO-KCMI" />{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="3">
              <CLabel htmlFor="date">
                <CSLab code="HCM-VZL7SHYF7OB_KCMI" />
              </CLabel>
              <CInput className="" id="date" type="date" />
            </CCol>
            <CCol md="4">
              <CLabel htmlFor="accidentType">
                <CSLab code="HCM-LPG0UTX0P7H-HRPR" />
              </CLabel>
              <CSelect>
                {["Select Accident Type", "Type 1", "Type 2"].map((x, i) => (
                  <option value={x} key={1}>
                    {x}
                  </option>
                ))}
              </CSelect>
            </CCol>
            <CCol md="2">
              <CLabel htmlFor="cost">
                <CSLab code="HCM-3OZ72JARXE-KCMI" />
              </CLabel>
              <CInput
                className=""
                style={{ textAlign: "right" }}
                placeholder="0.00"
                id="cost"
                type="text"
              />
            </CCol>
            <CCol md="3">
              <CLabel htmlFor="currency">
                <CSLab code="HCM-CVBN0JP6CNQ_PSLL" />
              </CLabel>
              <CInput className="" id="currency" type="text" />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="12">
              <CLabel htmlFor="description">
                <CSLab code="HCM-9FY7YTVZ1I4" />
              </CLabel>
              <CTextarea
                id="description"
                style={{ height: "80px", resize: "none" }}
              ></CTextarea>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            <CSLab code="HCM-9E3ZC2E1S0N-LASN" />
          </CButton>
          <CButton color="primary">
            <CSLab code="HCM-HGUHIR0OK6T" />
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EmployeeHealthAndSafetyInfo;
