import {
  CSDivider,
  CSLineLabel,
  CSRequiredIndicator,
} from "src/reusable/components";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
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

// const commandOptions = [
//     { type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
//     { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
//     { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
//     { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }
// ];

const editOptions = {
  allowEditing: true,
  allowAdding: true,
  allowDeleting: false,
  allowEditOnDblClick: true,
};

const EmployeeRequest = (props) => {
  const lan = useSelector((state) => state.language);

  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(false);
  const TransLabelByCode = (name) => GetLabelByName(name, lan);
  const [effectivedate, setEffectivedate] = useState("");
  const [expirationdate, setExpirationdate] = useState("");
  const [type, setType] = useState("");
  const canSave = [effectivedate, expirationdate, type].every(Boolean);

  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-RMSWVES71HF-PSLL" />
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
                placeholder={TransLabelByCode("search for employee")}
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
                    style={{ marginRight: 5, float: "left" }}
                    type="button"
                    size="sm"
                    color="primary"
                    onClick={() => setVisible(true)}
                  >
                    <AiOutlinePlus /> <CSLab code="Add Employee Request" />
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
                        field={"employeeName"}
                        headerText="Employee Name"
                        width="100"
                      />
                      <ColumnDirective
                        field={"employeeId"}
                        headerText="Employee ID"
                        width="100"
                      />
                      <ColumnDirective
                        field={"date"}
                        headerText="Date"
                        width="100"
                      />
                      <ColumnDirective
                        field={"employeeRequestType"}
                        headerText="Employee Request Type"
                        width="100"
                      />
                      {/* <ColumnDirective commands={commandOptions} headerText={"Action"} width='100' textAlign="Center" /> */}
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
            <CSLab code="HCM-3BQS3NBAJD7_LANG" />{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className={"bottom-spacing"}>
            <>
              <CCol md="4">
                <CLabel htmlFor="type">
                  <CSLab code="HCM-SU3UY023WZH-PSLL" />
                  <CSRequiredIndicator />
                </CLabel>
                <CSelect
                  id="type"
                  name="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {["Select Type", "Type 1", "Type 2", "Type 3"].map((x, i) => (
                    <option key={i} value={x}>
                      {x}
                    </option>
                  ))}
                </CSelect>
              </CCol>
              <CCol md="4">
                <CLabel htmlFor="effectivedate">
                  <CSLab code="Effective Date" />
                  <CSRequiredIndicator />
                </CLabel>
                <CInput
                  className=""
                  id="effectivedate"
                  type="date"
                  name="effectivedate"
                  value={effectivedate}
                  onChange={(e) => setEffectivedate(e.target.value)}
                />
              </CCol>
              <CCol md="4">
                <CLabel htmlFor="expirationdate">
                  <CSLab code="Expiration Date" />
                  <CSRequiredIndicator />
                </CLabel>
                <CInput
                  className=""
                  id="expirationdate"
                  type="date"
                  name="expirationdate"
                  value={expirationdate}
                  onChange={(e) => setExpirationdate(e.target.value)}
                />
              </CCol>
            </>
          </CRow>

          <CRow className={"bottom-spacing"}>
            <>
              <CCol md="12">
                <CLabel htmlFor="description">
                  <CSLab code="HCM-9FY7YTVZ1I4" />
                </CLabel>
                <CTextarea
                  id="description"
                  style={{ height: "80px", resize: "none" }}
                ></CTextarea>
              </CCol>
            </>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            <CSLab code="HCM-9E3ZC2E1S0N-LASN" />
          </CButton>
          <CButton
            style={{ cursor: !canSave ? "not-allowed" : "pointer" }}
            disabled={!canSave}
            onClick={() => setVisible(false)}
            color="primary"
          >
            <CSLab code="HCM-HGUHIR0OK6T" />
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EmployeeRequest;
