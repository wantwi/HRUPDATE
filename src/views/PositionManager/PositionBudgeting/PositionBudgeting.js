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
            <CSLab code="HCM-MLMWRF2B3AM_PSLL" />
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
                <AiOutlinePlus /> <CSLab code="HCM-TAAFD4M071D-HRPR" />{" "}
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
                        <CSLab code="HCM-LAFPT6FJ57N" />
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
                        <CSLab code="HCM-N6I0LSIYJF" />
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
                        <CSLab code="HCM-4D1SZ24U9UO" />
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
                        <CSLab code="HCM-K85NF9HWVXC-LANG" />
                      </CLabel>
                      <CInput className="" name="startDate" type="date" />
                    </CCol>
                    <CCol md="6">
                      <CLabel>
                        <CSLab code="HCM-S4N9DCXVMJ" />
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
                            headerText={GetLabelByName(
                              "HCM-P82D0RPB0G-LOLN",
                              lan
                            )}
                            width="85"
                          />
                          <ColumnDirective
                            field={"actual"}
                            headerText={GetLabelByName(
                              "HCM-I92QHLUMN-KCMI",
                              lan
                            )}
                            width="85"
                          />
                          <ColumnDirective
                            field={"budgeted"}
                            headerText={GetLabelByName(
                              "HCM-VF3DCK9GX88_LASN",
                              lan
                            )}
                            width="100"
                          />
                          <ColumnDirective
                            field={"revisedBudget"}
                            headerText={GetLabelByName(
                              "HCM-EV3NKIK7IL_LASN",
                              lan
                            )}
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

                  <CSLab code="HCM-ZIRH5SVBDUF_LANG" />
                </CButton>
              ) : null}
              <CButton
                style={{ marginRight: 5, float: "right" }}
                type="button"
                size="sm"
                color="success"
              >
                <AiFillSave size={20} /> <CSLab code="HCM-HGUHIR0OK6T" />{" "}
              </CButton>
              <CButton
                style={{ marginRight: 5, float: "right" }}
                type="button"
                size="sm"
                color="warning"
              >
                <AiOutlineRedo size={20} /> <CSLab code="HCM-MELULU9B6R_KCMI" />{" "}
              </CButton>
              <CButton
                style={{ marginRight: 5, float: "right", color: "white" }}
                onClick={() => searchReset()}
                type="button"
                size="sm"
                color="danger"
              >
                <AiOutlineClose size={20} />
                <CSLab code="HCM-V3SL5X7PJ9C-LANG" />
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default PositionBudgeting;
