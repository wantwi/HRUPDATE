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
  CForm,
  CCol,
  CRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CLabel,
  CSelect,
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
import { CSCheckbox, CSLineLabel } from "../../../reusable/components";

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

const EmergencyContact = (props) => {
  const lan = useSelector((state) => state.language);
  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const canSave = [name, email, phone, address].every(Boolean);

  const TransLabelByCode = (name) => GetLabelByName(name, lan);
  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="Emergency Contact" />
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
                placeholder={TransLabelByCode("TL48")}
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
              <CButton
                type="button"
                style={{ marginBottom: 5 }}
                onClick={() => {
                  setVisible(true);
                }}
                size="sm"
                color="primary"
              >
                {" "}
                <AiOutlinePlus /> <CSLab code="EmergencyContact" />
              </CButton>
              <CForm action="" method="post">
                <>
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
                        headerText={"Name"}
                        width="100"
                      />
                      <ColumnDirective
                        field={""}
                        headerText={"Relation"}
                        width="100"
                      />
                      <ColumnDirective
                        field={""}
                        headerText={"Phone Number"}
                        width="100"
                      />
                      <ColumnDirective
                        field={""}
                        headerText={"Email"}
                        width="100"
                      />
                      <ColumnDirective
                        field={""}
                        headerText={"Address"}
                        width="100"
                      />
                      <ColumnDirective
                        commands={commandOptions}
                        headerText={GetLabelByName("TL51", lan)}
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
                </>
              </CForm>
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
        <CModalHeader style={{ position: "right" }}>
          <CModalTitle>
            {" "}
            <CSLab code="Add Emergency Contact" />{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className={"bottom-spacing"}>
            <>
              <CCol md="4">
                <CLabel htmlFor="Name">
                  <CSLab code="Name" />
                </CLabel>
                <CInput
                  type="text"
                  id="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </CCol>
              {/* <CCol md="4">
                <CLabel htmlFor="relation">
                  <CSLab code="Relation" />
                </CLabel>
                <CSelect name="relation" >
                  {[
                    "Select Relation",
                    "Father",
                    "Mother",
                    "Sister",
                    "Brother",
                    "Aunty",
                    "Cousin",
                    "Uncle",
                    "Nephew",
                    "Niece",
                  ].map((x, i) => (
                    <option key={i} value={x}>
                      {x}
                    </option>
                  ))}
                </CSelect>
              </CCol> */}
              <CCol md="4">
                <CLabel htmlFor="email">
                  <CSLab code="Email" />
                </CLabel>
                <CInput
                  id="email"
                  input="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </CCol>
              <CCol md="4">
                <CLabel htmlFor="phonenumber">
                  <CSLab code="Phone Number" />
                </CLabel>
                <CInput
                  id="phonenumber"
                  input="text"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </CCol>
            </>
          </CRow>

          {/* <CRow className={"bottom-spacing"}>
            <>
              <CCol md="4">
                <CLabel htmlFor="Nationality">
                  <CSLab code="Nationality" />
                </CLabel>
                <CSelect>
                  {[
                    "Select Nationality",
                    "Afghan",
                    "British",
                    "Canadian",
                    "Danish",
                    "Ghanaian",
                  ].map((x, i) => (
                    <option key={i} value={x}>
                      {x}
                    </option>
                  ))}
                </CSelect>
              </CCol>
            </>
          </CRow> */}
          <CRow className={"bottom-spacing"}>
            <CCol md="8">
              <CLabel>
                <CSLab code="Address" />
              </CLabel>
              <CTextarea
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ height: "60px", resize: "none" }}
              ></CTextarea>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            <CSLab code="TL50" />
          </CButton>
          <CButton
            style={{ cursor: !canSave ? "not-allowed" : "pointer" }}
            disabled={!canSave}
            onClick={() => setVisible(false)}
            color="primary"
          >
            <CSLab code="TL11" />
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EmergencyContact;
