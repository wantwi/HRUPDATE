import {
  CSDivider,
  CSLineLabel,
  CSRequiredIndicator,
} from "src/reusable/components";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
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
  CCardHeader,
  CTooltip,
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
  setReorderDestinationElement,
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
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(false);
  const TransLabelByCode = (name) => GetLabelByName(name, lan);
  const [effectivedate, setEffectivedate] = useState("");
  const [expirationdate, setExpirationdate] = useState("");
  const [type, setType] = useState("");
  const [reqForm, setReqForm] = useState(0);
  const canSave = [effectivedate, expirationdate, type].every(Boolean);
  const [submitData, setSubmitData] = useState({});

  console.log({ type })
  useEffect(() => {
    if (type === "1") {
      setReqForm(1)
    } else {
      setReqForm(0)
    }

    // return () => {
    //   second
    // }
  }, [type])

  const handleOnChange = (evnt) => {
    setSubmitData((data) => {
      return { ...data, [evnt?.target?.name]: evnt?.target?.value };
    });
    dispatch({
      type: "set",
      data: { ...data, [evnt?.target?.name]: evnt?.target?.value },
    });
  };

  const handleReset = () => {
    setSubmitData({})
    setType("")
    setReqForm(0)
  }

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
            <CCardHeader>
              <CFormGroup row>
                <CCol md="8">
                  <b>Employee:</b>{" "}
                  {/* <span
                    title={empDisplayName}
                    style={{
                      padding: 5,
                      borderRadius: 5,
                      fontWeight: 900,
                      cursor: "pointer",
                      background: "#fff",
                      color: "#315a76",
                    }}
                    type="button"
                    onClick={() => setLarge(!large)}
                    size="md"
                    color="primary"
                  >
                    {empDisplayName}
                  </span> */}
                </CCol>
                {/* <CCol md="4">
                  <CTooltip content={`Click here to view Employees`} >
                    <CButton color="outline-primary">120 </CButton>
                  </CTooltip>
                </CCol> */}

                <CCol md="4" style={{ marginBottom: "5px" }}>
                  <CButton
                    style={{ marginRight: 5, float: "right" }}
                    type="button"
                    size="sm"
                    color="primary"
                    onClick={() => setVisible(true)}
                  >
                    <AiOutlinePlus /> <CSLab code="Add Employee Request" />
                  </CButton>
                </CCol>
              </CFormGroup>
            </CCardHeader>
            <CCardBody style={{ height: CardBodyHeight, overflowY: "auto" }}>
              <CRow>

                <CCol md="12">
                  <GridComponent
                    height={400}
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
            <CCol md="6">
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
                {["Select Type", "Leave Request", "Material Request", "Travel Expense Request"].map((x, i) => (
                  <option key={i} value={i}>
                    {x}
                  </option>
                ))}
              </CSelect>
            </CCol>
            {reqForm === 1 ? <>
              <CCol md="6"><CLabel> <CSLab code="HCM-5S2JSN34J47_LANG" />{" "}</CLabel> <CSRequiredIndicator />
                <CSelect name="leaveType" value={submitData.leaveType || -1} onChange={handleOnChange}>
                  {/* {leaveTypes.map((x, y) => (
                          <option key={y} value={x.id}>
                            {x.name}
                          </option>
                        ))} */}
                  <option value={-1}>
                    Select Leave Type
                  </option>
                  {[
                    "Paternity Leave",
                    "Study2 Leave",

                  ].map((x, i) => (
                    <option key={i} value={i + 1}>
                      {x}
                    </option>
                  ))}
                </CSelect>
              </CCol>
            </> : null}
            {/* <CCol md="4">
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
            */}
          </CRow>
          {reqForm === 1 ? <>
            <CRow>
              <CCol md="12">
                {/* <CRow >
                  <CCol md="6"><CLabel> <CSLab code="HCM-5S2JSN34J47_LANG" />{" "}</CLabel> <CSRequiredIndicator />
                    <CSelect name="leaveType" value={submitData.leaveType || -1} onChange={handleOnChange}>
                      
                      <option value={-1}>
                        Select Leave Type
                      </option>
                      {[
                        "Paternity Leave",
                        "Study2 Leave",

                      ].map((x, i) => (
                        <option key={i} value={i + 1}>
                          {x}
                        </option>
                      ))}
                    </CSelect>
                  </CCol>
                </CRow> */}
                <CRow>
                  <CCol md="3">
                    <CLabel>
                      {" "}
                      <CSLab code="Allowed" />{" "}</CLabel> <CSRequiredIndicator />
                    <CInput
                      name="allowedDays"
                      value={submitData?.allowedDays || 0}
                      onChange={handleOnChange}
                      disabled
                    />
                  </CCol>
                  <CCol md="3">
                    <CLabel>
                      {" "}
                      <CSLab code="Scheduled" />{" "}</CLabel> <CSRequiredIndicator />
                    <CInput
                      name="leaveScheduled"
                      value={submitData?.leaveScheduled || 0}
                      onChange={handleOnChange}
                      disabled
                    />
                  </CCol>
                  <CCol md="3">
                    <CLabel>
                      {" "}
                      <CSLab code="Taken" />{" "}</CLabel> <CSRequiredIndicator />
                    <CInput
                      name="leaveTaken"
                      value={submitData?.leaveTaken || 0}
                      onChange={handleOnChange}
                      disabled
                    />
                  </CCol>
                  <CCol md="3">
                    <CLabel>
                      {" "}
                      <CSLab code="HCM-KK6462TLSXH-LOLN" />{" "}</CLabel> <CSRequiredIndicator />
                    <CInput
                      name="leaveRemaining"
                      value={submitData?.leaveRemaining || 0}
                      onChange={handleOnChange}
                      disabled
                    />
                  </CCol>
                </CRow>
                <CRow className={'bottom-spacing'}>
                  <CCol md="5">
                    <CLabel> <CSLab code="HCM-K85NF9HWVXC-LANG" />{" "}</CLabel> <CSRequiredIndicator />
                    <CInput type="date" name="leaveStartDate" value={submitData?.leaveStartDate || ""} onChange={handleOnChange} />
                  </CCol>
                  <CCol md="4">
                    <CLabel> <CSLab code="HCM-S4N9DCXVMJ" />{" "}</CLabel> <CSRequiredIndicator />
                    <CInput type="date" name="leaveEndDate" value={submitData?.leaveEndDate || ""} onChange={handleOnChange} />
                  </CCol>
                  <CCol md="3">
                    <CLabel>
                      {" "}
                      <CSLab code="Number Of Days" />{" "}</CLabel> <CSRequiredIndicator />
                    <CInput
                      name="daysNumber"
                      value={submitData?.daysNumber || ""}
                      onChange={handleOnChange}
                      disabled
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="12">
                    <CLabel>
                      {" "}
                      <CSLab code="Reason" />{" "}
                    </CLabel>
                    <CTextarea
                      name="description"
                      value={submitData?.description || ""}
                      onChange={handleOnChange}
                      style={{ height: "80px", resize: "none" }}
                    ></CTextarea>
                  </CCol>
                </CRow>
              </CCol>

            </CRow>
          </> : null}

          {/* <CRow className={"bottom-spacing"}>
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
          </CRow> */}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => { setVisible(false); handleReset() }}>
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
