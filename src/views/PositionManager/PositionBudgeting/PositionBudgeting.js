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
  CLabel,
  CCardFooter,
  CSelect,
} from "@coreui/react";
import {
  AiOutlinePlus,
  AiFillSave,
  AiOutlineRedo,
  AiOutlineClose,
} from "react-icons/ai";
import { CardBodyHeight } from "src/reusable/utils/helper";

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

import { GetLabelByName } from "src/reusable/configs/config";
import { CSDivider, CSLab } from "src/reusable/components";

const editOptions = {
  allowEditing: true,
  allowAdding: true,
  allowDeleting: false,
  allowEditOnDblClick: true,
};

const PositionBudgeting = () => {
  const lan = useSelector((state) => state.language);

  const [show, setShow] = useState(true);
  const [mode, setMode] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setsearchResult] = useState(null);

  const TransLabelByCode = (name) => GetLabelByName(name, lan);
  const searchReset = () => {
    setShow(true);
    setSearchInput("");
  };

  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="Position Budgeting" />
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
                id="search"
                name="search"
                autoComplete="off"
                placeholder={TransLabelByCode("Search for budget by name")}
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
                <AiOutlinePlus /> <CSLab code={"Add"} />{" "}
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
                <CCol md="5">
                  <CRow>
                    <CCol md="6">
                      <CLabel>
                        <CSLab code={"Division"} />
                      </CLabel>
                      <CSelect name="division">
                        {["Select Division", "Division 1", "Division 2"].map(
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
                        <CSLab code={"Department"} />
                      </CLabel>
                      <CSelect name="depatment">
                        {[
                          "Select Department",
                          "Department 1",
                          "Department 2",
                        ].map((x, i) => (
                          <option key={i} value={x}>
                            {x}
                          </option>
                        ))}
                      </CSelect>
                    </CCol>
                    <CCol md="6">
                      <CLabel>
                        <CSLab code={"Section"} />
                      </CLabel>
                      <CSelect name="section">
                        {["Select Section", "Section 1", "Section 2"].map(
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
                        <CSLab code={"Start Date"} />
                      </CLabel>
                      <CInput className="" name="startDate" type="date" />
                    </CCol>
                    <CCol md="6">
                      <CLabel>
                        <CSLab code={"End Date"} />
                      </CLabel>
                      <CInput className="" name="endDate" type="date" />
                    </CCol>
                  </CRow>
                </CCol>
                <CSDivider style={{ height: "100%" }} md="1" />
                <CCol md="6">
                  <CRow>
                    <CCol md="12" style={{ marginBottom: "15px" }}>
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
                            field={"grade"}
                            headerText="Grade"
                            width="85"
                          />
                          <ColumnDirective
                            field={"actual"}
                            headerText="Actual"
                            width="85"
                          />
                          <ColumnDirective
                            field={"budgeted"}
                            headerText="Budgeted"
                            width="100"
                          />
                          <ColumnDirective
                            field={"revisedBudget"}
                            headerText="Revised Budget"
                            width="100"
                          />
                          {/* <ColumnDirective commands={commandOptions} headerText={"Action"} width='100' textAlign="Center" /> */}
                        </ColumnsDirective>
                        <Inject services={[Page, Sort, Filter, Group, Edit]} />
                      </GridComponent>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md="3" xs="6">
                      <CInput className="" type="number" />
                    </CCol>
                    <CCol md="3" xs="6">
                      <CInput className="" type="number" />
                    </CCol>
                    <CCol md="3" xs="6">
                      <CInput className="" type="number" />
                    </CCol>
                    <CCol md="3" xs="6">
                      <CInput className="" type="number" />
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

export default PositionBudgeting;
