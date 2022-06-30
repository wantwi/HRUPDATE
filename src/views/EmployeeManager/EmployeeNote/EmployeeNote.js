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
import { AiOutlinePlus } from "react-icons/ai";

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
import { CSLab } from "../../../reusable/components";
import { CardBodyHeight } from "src/reusable/utils/helper";

const editOptions = {
  allowEditing: false,
  allowAdding: false,
  allowDeleting: false,
  allowEditOnDblClick: false,
};
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

const EmployeeNote = () => {
  const lan = useSelector((state) => state.language);
  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(false);

  const TransLabelByCode = (name) => GetLabelByName(name, lan);
  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-IAOIDXJO5C9_KCMI" />
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
                placeholder={TransLabelByCode("HCM-IAOIDXJO5C9_KCMI")}
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
        <CCol md="8" className="text-right"></CCol>
        <CCol xs="12" hidden={show}>
          <CCard>
            <CCardBody style={{ height: CardBodyHeight, overflowY: "auto" }}>
              <CRow>
                <CCol md="12" style={{ marginBottom: 5 }}>
                  <CButton
                    type="button"
                    onClick={() => {
                      setVisible(true);
                    }}
                    size="sm"
                    color="primary"
                  >
                    {" "}
                    <AiOutlinePlus /> <CSLab code="HCM-IAOIDXJO5C9_KCMI" />
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
                        field={""}
                        headerText={"ID"}
                        width="100"
                        visible={false}
                      />
                      <ColumnDirective
                        field={""}
                        headerText={"Date"}
                        width="100"
                      />
                      <ColumnDirective
                        field={""}
                        headerText={"Follow Up Date"}
                        width="100"
                      />
                      <ColumnDirective
                        field={""}
                        headerText={"Follow Up"}
                        width="100"
                      />
                      <ColumnDirective
                        field={""}
                        headerText={"Subject"}
                        width="100"
                      />
                      <ColumnDirective
                        commands={commandOptions}
                        headerText={GetLabelByName("HCM-F4IUJ9QVOM6", lan)}
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
                      ]}
                    />
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
            <CSLab code="HCM-IAOIDXJO5C9_KCMI" />{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <>
            <CRow>
              <CCol md="4">
                <CLabel>
                  <CSLab code="HCM-VZL7SHYF7OB_KCMI" />
                </CLabel>
                <CInput className="" name="date" type="date" />
              </CCol>
              <CCol md="4">
                <CLabel>
                  <CSLab code="HCM-84Y7SXTY7GN-KCMI" />
                </CLabel>
                <CInput className="" name="followupdate" type="date" />
              </CCol>
            </CRow>
          </>
          <>
            <CRow>
              <CCol md="9">
                <CLabel>
                  <CSLab code="HCM-ZFIVQD66M1L_KCMI" />
                </CLabel>
                <CTextarea
                  className=""
                  style={{ height: "60px", resize: "none" }}
                  id="followup"
                ></CTextarea>
              </CCol>
              <CCol md="9">
                <CLabel>
                  <CSLab code="HCM-1JQYEYIC22E-LASN" />
                </CLabel>
                <CTextarea
                  className=""
                  style={{ height: "60px", resize: "none" }}
                  name="subject"
                ></CTextarea>
              </CCol>
            </CRow>
          </>
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

export default EmployeeNote;
