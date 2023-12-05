import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  CTextarea,
  CCardHeader,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import { AiFillSave, AiOutlineClose, AiOutlineRedo } from "react-icons/ai";
import { CardBodyHeight } from "src/reusable/utils/helper";
import { GetLabelByName } from "src/reusable/configs/config";
import { CSAutoComplete, CSCheckbox, CSDivider, CSLab, CSLineLabel, CSRequiredIndicator } from "../../../reusable/components";
import "../../../scss/_custom_table.scss";
import { GetEmployeeByID, SearchEmployees } from "src/reusable/API/EmployeeEndpoints";
import useFetch from "src/hooks/useFetch";
import useMultiFetch from "src/hooks/useMultiFetch";
import usePost from "src/hooks/usePost";
import { toast } from "react-toastify";
import { toastWarning } from "src/toasters/Toaster";
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
import DatePicker from "react-datepicker";
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import "../../../../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css";
import "../../../../node_modules/@syncfusion/ej2-inputs/styles/bootstrap5.css";
import "../../../../node_modules/@syncfusion/ej2-popups/styles/bootstrap5.css";
import "../../../../node_modules/@syncfusion/ej2-lists/styles/bootstrap5.css";
import "../../../../node_modules/@syncfusion/ej2-react-calendars/styles/bootstrap5.css";

const EmployeeMovement = (props) => {
  const lan = useSelector((state) => state.language);
  const [searchInput, setSearchInput] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfItems, setNumberOfItems] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [submitData, setSubmitData] = useState({});
  const [sortOrder, setSortOrder] = useState("");
  const [large, setLarge] = useState(false);
  const [mode, setMode] = useState("");
  const [show, setShow] = useState(true);
  // const [grid,] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [empDisplayName, setEmpDisplayName] = useState("");
  const dispatch = useDispatch();
  const [viewinfo, setViewInfo] = useState([]);
  const [handleId, setHandleId] = useState("");
  const data = useSelector((state) => state.data);
  const [activeKey, setActiveKey] = useState(1);
  const time = (new Date());
  const minTime = (new Date('8/3/2017 8:00 AM'));
  const maxTime = (new Date('8/3/2017 5:00 PM'));
  const [showModal, setShowModal] = useState(false);
  const [frequency, setfrequency] = useState("");
  // const OnSaveContinueClick = () => {
  //     console.log(grid);
  // }
  const [editOptions] = useState({
    allowEditing: false,
    allowAdding: true,
    allowDeleting: true,
    allowEditOnDblClick: false,
  });
  const [startDate, setStartDate] = useState(new Date());
  const commandOptions = [
    // {
    //   type: "Edit",
    //   buttonOption: { iconCss: " e-icons e-edit", cssClass: "e-flat" },
    // },
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

  const { setOptData, setUrl } = useFetch("", (response, results) => {
    if (response) {
      if (response && Object.keys(response).length > 0) {
        dispatch({ type: "set", data: { ...response } });
        setSubmitData({ ...response });
        setViewInfo(response);
        // setDuplicateData({ ...response })
        console.log({ response });

        //let rates = response?.rates;

        // setExchangeRate(rates);
        setShow(false);

      } else {
        setMode("Add");
        setShow(false);
        // dispatch({ type: 'set', data: { ...results, isHomeCurrency } });
        // setSubmitData({ ...results, isHomeCurrency });
      }
    }
  });
  const searchReset = () => {
    setShow(true);
    setSearchInput("");

  };
  const { data: multicallData } = useMultiFetch([], (results) => {
    console.log(results[0].data);
    // setSkillType([...results[0].data]);


  })
  const { setData: setPostData, setUrl: setPostUrl } = usePost('', (response) => {
    // console.log({location:response });
    const { data } = response
    if ("" === data) {
      toast.success(GetLabelByName("HCM-HAGGXNJQW2B_HRPR", lan));
      //  showToasts();
      searchReset(2);
    } else {
      try {
        data = JSON.parse(response);
        let mdata = data.errors[0].message;
        toast.error(`${mdata}`, toastWarning);
      } catch (error) {
        console.log(error);
      }
    }

  })
  const handleSearchResultSelect = (results) => {
    console.log("show results", results);

    //setting employee display name on select of suggested item
    setEmpDisplayName(
      (prevState) => `${results.firstName} ${results.lastName}`
    );
    // testApi();
    // return;
    setMode("Add");
    setShow(false);
    //  dispatch({ type: "set", data: { ...results } });
    setSubmitData({ ...results });

    if (results?.id) {
      setSearchResult(results);
      setUrl(GetEmployeeByID(results.id))
    }
  };
  const handleOnChange = (evnt) => {
    //console.log(evnt)
    console.log(evnt?.target?.value)
    setSubmitData((data) => {
      return { ...data, [evnt?.target?.name]: evnt?.target?.value };
    });
    dispatch({
      type: "set",
      data: { ...data, [evnt?.target?.name]: evnt?.target?.value },
    });
  };
  const handlePost = () => {

    setPostUrl()
    setPostData()
  }
  const handleProbation = (evnt) => {
    let isProbation =
      evnt?.target?.name === "isProbation"
        ? evnt?.target?.checked
        : data?.isProbation;
    setSubmitData((data) => {
      return {
        ...data,
        [evnt?.target?.name]: evnt?.target?.value,
        isProbation,
      };
    });
    dispatch({
      type: "set",
      data: {
        ...data,
        [evnt?.target?.name]: evnt?.target?.value,
        isProbation,
      },
    });
  };
  const [isProbation, setIsProbation] = useState(false)
  const [isRecurring, setIsRecurring] = useState(false)

  const handleRecurring = (evnt) => {
    let isRecurring =
      evnt?.target?.name === "isRecurring"
        ? evnt?.target?.checked
        : data?.isRecurring;
    setSubmitData((data) => {
      return {
        ...data,
        [evnt?.target?.name]: evnt?.target?.value,
        isRecurring,
      };
    });
    dispatch({
      type: "set",
      data: {
        ...data,
        [evnt?.target?.name]: evnt?.target?.value,
        isRecurring,
      },
    });
  };
  useEffect(() => {

    setIsProbation(submitData.isProbation)
  }, [submitData?.isProbation])

  useEffect(() => {

    setIsRecurring(submitData.isRecurring)
  }, [submitData?.isRecurring])

  const onCommandClick = (args) => {
    console.log(args?.rowData);
  };

  const toolbarOptions = [
    "Add",
    {
      text: "Save",
      tooltipText: "Save",
      prefixIcon: "e-save",
      id: "saveItems",
      align: "Right",
    },
  ];

  useEffect(() => {
    console.log(submitData?.recurringCycle)
    if (submitData?.recurringCycle === "Daily") {
      setfrequency('daily')
    } else if (submitData?.recurringCycle === "Weekly") {
      setfrequency('weekly')
    } else if (submitData?.recurringCycle === "Bi-Weekly") {
      setfrequency('bi-Weekly')
    } else if (submitData?.recurringCycle === "Monthly") {
      setfrequency('monthly')
    } else if (submitData?.recurringCycle === "Quarterly") {
      setfrequency('quarterly')
    } else if (submitData?.recurringCycle === "Semi-Annually") {
      setfrequency('semi-Annually')
    } else if (submitData?.recurringCycle === "Annually") {
      setfrequency('annually')
    } else {
      setfrequency('')
    }

  }, [submitData?.recurringCycle])


  const submitRequest = (args) => {
    if (args.item.id === "saveItems") {

    } else {
      console.log("ELSE");
    }

  };


  const ben_actionBegin = (args) => {

    if (args.requestType === "add") {
      args.cancel = true;
      setShowModal(!showModal);
    }
  };

  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-219IVWXVLBI_HRPR" />
          </h5>
        </CCol>
      </CRow>
      <CRow>
        <CCol md="4">
          <CFormGroup>
            <CSAutoComplete
              filterUrl={SearchEmployees(searchInput)}
              //filterUrl=''            //filterUrl={SearchInternalCurrencies(searchInput)}
              placeholder={GetLabelByName("HCM-6FKJ6FEGW7A-HRPR", lan)}
              handleSelect={handleSearchResultSelect}
              //onChange={()=>handleSearchResultSelect}
              displayTextKey={"firstName"}
              setInput={setSearchInput}
              input={searchInput}
              emptySearchFieldMessage={`Please input 3 or more characters to search`}
              searchName={"Employee"}
              isPaginated={true}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              numberOfItems={numberOfItems}
              setNumberOfItems={setNumberOfItems}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              mode={mode}
              setMode={setMode}
              handleId={setHandleId}
            // reset={handleReset}
            />
          </CFormGroup>
        </CCol>
        <CCol md="8" className="text-right"></CCol>
        <CCol xs="12" hidden={show}>
          <CCard>
            <CCardHeader>
              <CFormGroup row>
                <CCol md="4">
                  <b>Employee:</b>{" "}
                  <span
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
                  </span>
                </CCol>
                <CCol md="4">
                  {/* <CTooltip content={`Click here to view Employees`} >
                <CButton color="outline-primary"> <MdPeople /> 120 </CButton>
                </CTooltip> */}
                </CCol>

              </CFormGroup>
            </CCardHeader>
            <CCardBody style={{ height: CardBodyHeight, overflowY: "auto" }}>
              <CTabs>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink
                      href="#"
                      active={activeKey === 1}
                      onClick={() => setActiveKey(1)}
                    >
                      <CSLab code="Employee Movement" />
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      href="#"
                      active={activeKey === 2}
                      onClick={() => setActiveKey(2)}
                    >
                      <CSLab code="Job Description" />
                    </CNavLink>
                  </CNavItem>

                </CNav>
                <CTabContent>
                  <CTabPane visible={activeKey === 1 ? "true" : "false"}>
                    <CRow className={"bottom-spacing"}>
                      <CCol md="6">
                        <CCol md="12">
                          <CSLineLabel name="HCM-I2TGMIC1TS-HRPR" />{" "}
                        </CCol>
                        <>
                          <CRow>
                            <CCol md="6">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-HMLNLPOEIXG" />{" "}
                              </CLabel>
                              <CSelect disabled>
                                {[
                                  "Select Employee Type",
                                  "Type 1",
                                  "Type 2",
                                  "Type 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="6">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-N6I0LSIYJF" />{" "}
                              </CLabel>
                              <CSelect disabled>
                                {[
                                  "Select Department",
                                  "Department 1",
                                  "Department 2",
                                  "Department 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                          </CRow>
                        </>
                        <>
                          <CRow>
                            <CCol md="6">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-4D1SZ24U9UO" />{" "}
                              </CLabel>
                              <CSelect disabled>
                                {[
                                  "Select Section",
                                  "Section 1",
                                  "Section 2",
                                  "Section 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="6">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-LAFPT6FJ57N" />{" "}
                              </CLabel>
                              <CSelect disabled>
                                {[
                                  "Select Division",
                                  "Division 1",
                                  "Division 2",
                                  "Division 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="6">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-ATGLL367GOQ" />{" "}
                              </CLabel>
                              <CSelect disabled>
                                {[
                                  "Select Position",
                                  "Position 1",
                                  "Position 2",
                                  "Position 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="6">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-DHV9W3RF11D" />{" "}
                              </CLabel>
                              <CSelect disabled>
                                {["Select Unit", "Unit 1", "Unit 2", "Unit 3"].map(
                                  (x, i) => (
                                    <option key={i} value={x}>
                                      {x}
                                    </option>
                                  )
                                )}
                              </CSelect>
                            </CCol>
                          </CRow>
                        </>
                        <>
                          <CRow>
                            <CCol md="6">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-6XXECXM4Q5S" />{" "}
                              </CLabel>
                              <CSelect disabled>
                                {[
                                  "Select Location",
                                  "Location 1",
                                  "Location 2",
                                  "Location 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="6">
                              <CLabel>
                                {" "}
                                <CSLab code="Salary Grade" />{" "}
                              </CLabel>
                              <CSelect disabled>
                                {[
                                  "Select Salary Grade",
                                  "Salary Grade 1",
                                  "Salary Grade 2",
                                  "Salary Grade 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="6">
                              <CLabel>
                                {" "}
                                <CSLab code="Notch" />{" "}
                              </CLabel>
                              <CSelect disabled>
                                {[
                                  "Select Notch",
                                  "Notch 1",
                                  "Notch 2",
                                  "Notch 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                          </CRow>
                        </>
                      </CCol>

                      <CSDivider md="1" />

                      <CCol md="5">
                        <CRow>
                          <CCol md="12">
                            <CSLineLabel name="HCM-EKUWHXBRW2O-LANG" />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol md="6">
                            <CLabel>
                              {" "}
                              <CSLab code="HCM-HMLNLPOEIXG" />{" "}
                            </CLabel>
                            <CSelect>
                              {[
                                "Select Employee Type",
                                "Type 1",
                                "Type 2",
                                "Type 3",
                              ].map((x, i) => (
                                <option key={i} value={x}>
                                  {x}
                                </option>
                              ))}
                            </CSelect>
                          </CCol>
                          <CCol md="6">
                            <CLabel>
                              {" "}
                              <CSLab code="HCM-N6I0LSIYJF" />{" "}
                            </CLabel>
                            <CSelect>
                              {[
                                "Select Department",
                                "Department 1",
                                "Department 2",
                                "Department 3",
                              ].map((x, i) => (
                                <option key={i} value={x}>
                                  {x}
                                </option>
                              ))}
                            </CSelect>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol md="6">
                            <CLabel>
                              {" "}
                              <CSLab code="HCM-4D1SZ24U9UO" />{" "}
                            </CLabel>
                            <CSelect>
                              {[
                                "Select Section",
                                "Section 1",
                                "Section 2",
                                "Section 3",
                              ].map((x, i) => (
                                <option key={i} value={x}>
                                  {x}
                                </option>
                              ))}
                            </CSelect>
                          </CCol>
                          <CCol md="6">
                            <CLabel>
                              {" "}
                              <CSLab code="HCM-LAFPT6FJ57N" />{" "}
                            </CLabel>
                            <CSelect>
                              {[
                                "Select Division",
                                "Division 1",
                                "Division 2",
                                "Division 3",
                              ].map((x, i) => (
                                <option key={i} value={x}>
                                  {x}
                                </option>
                              ))}
                            </CSelect>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol md="6">
                            <CLabel>
                              {" "}
                              <CSLab code="HCM-ATGLL367GOQ" />{" "}
                            </CLabel>
                            <CSelect>
                              {[
                                "Select Position",
                                "Position 1",
                                "Position 2",
                                "Position 3",
                              ].map((x, i) => (
                                <option key={i} value={x}>
                                  {x}
                                </option>
                              ))}
                            </CSelect>
                          </CCol>
                          <CCol md="6">
                            <CLabel>
                              {" "}
                              <CSLab code="HCM-DHV9W3RF11D" />{" "}
                            </CLabel>
                            <CSelect>
                              {["Select Unit", "Unit 1", "Unit 2", "Unit 3"].map(
                                (x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                )
                              )}
                            </CSelect>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol md="6">
                            <CLabel>
                              {" "}
                              <CSLab code="HCM-6XXECXM4Q5S" />{" "}
                            </CLabel>
                            <CSelect>
                              {[
                                "Select Location",
                                "Location 1",
                                "Location 2",
                                "Location 3",
                              ].map((x, i) => (
                                <option key={i} value={x}>
                                  {x}
                                </option>
                              ))}
                            </CSelect>
                          </CCol>
                          <CCol md="6">
                            <CLabel>
                              {" "}
                              <CSLab code="Salary Grade" />{" "}
                            </CLabel>
                            <CSelect>
                              {[
                                "Select Salary Grade",
                                "Notch 1",
                                "Salary Grade 2",
                                "Salary Grade 3",
                              ].map((x, i) => (
                                <option key={i} value={x}>
                                  {x}
                                </option>
                              ))}
                            </CSelect>
                          </CCol>

                        </CRow>
                        <CRow>
                          <CCol md="6">
                            <CLabel>
                              {" "}
                              <CSLab code="Salary Notch" />{" "}
                            </CLabel>
                            <CSelect>
                              {[
                                "Select Notch",
                                "Notch 1",
                                "Notch 2",
                                "Notch 3",
                              ].map((x, i) => (
                                <option key={i} value={x}>
                                  {x}
                                </option>
                              ))}
                            </CSelect>
                          </CCol>
                          <CCol md="6">
                            <CLabel>
                              {" "}
                              <CSLab code="Supervisor" />{" "}
                            </CLabel>
                            <CSelect>
                              {[
                                "Select Supervisor",
                                "Supervisor 1",
                                "Supervisor 2",
                                "Supervisor 3",
                              ].map((x, i) => (
                                <option key={i} value={x}>
                                  {x}
                                </option>
                              ))}
                            </CSelect>
                          </CCol>

                        </CRow>

                        <CRow>
                          <CCol md="2" style={{ marginTop: "15px" }}>
                            <CSCheckbox
                              // label={GetLabelByName("HCM-Y59W3YEAPKB-PSLL", lan)}
                              label={GetLabelByName("Probation", lan)}
                              checked={
                                submitData?.isProbation || false
                              }
                              name="isProbation"
                              onChange={handleProbation}
                            />
                          </CCol>
                          {isProbation ? <><CCol md="3" style={{ float: "right" }}>
                            <CLabel>
                              {" "}
                              <CSLab code="Probation Duration" />{" "}
                            </CLabel>
                            <CInput
                              name="probationCode"
                              value={submitData?.probationCode || ""}
                              onChange={handleOnChange}
                              autoComplete="off"
                            />
                          </CCol>
                            <CCol md="3" style={{ float: "right" }}>
                              <CLabel>
                                {" "}
                                <CSLab code="Probation End Date" />{" "}
                              </CLabel>
                              <CInput
                                type="date"
                                name="probationDate"
                                value={submitData?.probationDate || ""}
                                onChange={handleOnChange}
                                autoComplete="off"
                              />
                            </CCol>
                            <CCol md="4" style={{ float: "right" }}>
                              <CLabel>
                                {" "}
                                <CSLab code="Probation Review Date" />{" "}
                              </CLabel>
                              <CInput
                                type="date"
                                name="probationDate"
                                value={submitData?.probationDate || ""}
                                onChange={handleOnChange}
                                autoComplete="off"
                              />
                            </CCol></> : null}
                        </CRow>
                        {/* {isProbation ? <CRow>
                          
                        </CRow> : null} */}

                        <CRow>
                          <CCol md="12">
                            <CLabel>
                              {" "}
                              <CSLab code="HCM-1NNHRS3H3JT_LANG" />{" "}
                            </CLabel>
                            <CTextarea
                              style={{ height: "80px", resize: "none" }}
                            ></CTextarea>
                          </CCol>
                        </CRow>

                      </CCol>
                    </CRow>
                  </CTabPane>
                  <CTabPane visible={activeKey === 2 ? "true" : "false"}>
                    <GridComponent

                      height={380}
                      allowPaging={true}
                      pageSettings={{ pageSize: 8 }}
                      editSettings={editOptions}
                      // ref={thirdGrid}
                      commandClick={onCommandClick}
                      toolbar={toolbarOptions}
                      toolbarClick={submitRequest}
                      actionBegin={ben_actionBegin}
                    >
                      <ColumnsDirective>
                        <ColumnDirective
                          field="id"
                          headerText="ID"
                          width="100"
                          visible={false}
                          isPrimaryKey={true}
                        />
                        <ColumnDirective
                          field="employee.firstName"
                          editType="text"
                          headerText={"Activity Name"}
                          width="100"
                        //edit={earnings}
                        />
                        <ColumnDirective
                          field="employee.lastName"
                          editType="text"
                          headerText={"Activity Description"}
                          width="70"
                        //edit={earnings}
                        />
                        <ColumnDirective
                          field="email"
                          headerText={"Target Type"}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="phone"
                          headerText={"Target Value"}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="phone"
                          headerText={"Recurring"}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="phone"
                          headerText={"Recurring Cycle"}
                          editType="numericedit"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="address"
                          headerText={"Date"}
                          editType="text"
                          // editTemplate={editTemplate}
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="address"
                          headerText={"Score Weight"}
                          editType="text"
                          // editTemplate={editTemplate}
                          width="100"
                          textAlign="Center"
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
                          Toolbar,
                        ]}
                      />
                    </GridComponent>
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
            <CCardFooter>
              <CButton
                style={{ marginRight: 5, float: "right" }}
                type="button"
                size="sm"
                color="success"
                onClick={() => handlePost()}
              >
                <AiFillSave size={20} /> <CSLab code="HCM-HGUHIR0OK6T" />{" "}
              </CButton>
              <CButton
                style={{ marginRight: 5, float: "right" }}
                type="button"
                size="sm"
                color="danger"
                onClick={() => searchReset()}
              >
                <AiOutlineClose size={20} />{" "}
                <CSLab code="HCM-V3SL5X7PJ9C-LANG" />{" "}
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>

      <CModal show={showModal}>
        <CModalHeader>Add Job Decription</CModalHeader>
        <CModalBody>
          <CRow className={"bottom-spacing"}>
            <CCol md="12">
              {/* <CCol md="12">
                          <CSLineLabel name="HCM-I2TGMIC1TS-HRPR" />{" "}
                        </CCol> */}
              <>
                <CRow>
                  <CCol md="6">
                    <CLabel>
                      {" "}
                      <CSLab code="Activity Name" />{" "}
                    </CLabel>
                    <CInput name="name"
                      className="form-control"
                      value={data?.name || ""}
                      placeholder={GetLabelByName("HCM-W4TEXTQO7M9_LOLN", lan)} />
                  </CCol>
                  <CCol md="6">
                    <CLabel>
                      {" "}
                      <CSLab code="Activity Description" />{" "}
                    </CLabel>
                    <CInput name="name"
                      className="form-control"
                      value={data?.name || ""}
                      placeholder="Enter Description" />
                  </CCol>
                </CRow>
              </>
              <>
                <CRow>
                  <CCol md="6">
                    <CLabel>
                      {" "}
                      <CSLab code="Target Type" />{" "}
                    </CLabel>
                    <CSelect>
                      {[
                        "Select Target Type",
                        "Number",
                        "Currency",
                        "Percentage",
                        "Boolean",
                      ].map((x, i) => (
                        <option key={i} value={x}>
                          {x}
                        </option>
                      ))}
                    </CSelect>
                  </CCol>
                  <CCol md="6">
                    <CLabel>
                      {" "}
                      <CSLab code="Target Value" />{" "}
                    </CLabel>
                    <CInput name="name"
                      className="form-control"
                      value={data?.name || ""}
                      placeholder="Enter Target Value" />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="6" style={{ marginTop: "15px" }}>
                    <CSCheckbox
                      // label={GetLabelByName("HCM-Y59W3YEAPKB-PSLL", lan)}
                      label={GetLabelByName("Recurring", lan)}
                      checked={
                        submitData?.isRecurring || false
                      }
                      name="isRecurring"
                      onChange={handleRecurring}
                    />
                  </CCol>
                  {isRecurring ? <CCol md="6">
                    <CLabel>
                      {" "}
                      <CSLab code="Recurring Cycle" />{" "}
                    </CLabel>
                    <CSelect name="recurringCycle" value={submitData.recurringCycle} onChange={handleOnChange}>
                      {["Select Recurring Cycle", "Daily", "Weekly", "Bi-Weekly", "Monthly", "Quarterly", "Semi-Annually", "Annually"].map(
                        (x, i) => (
                          <option key={i} value={x}>
                            {x}
                          </option>
                        )
                      )}
                    </CSelect>
                  </CCol> : null}
                </CRow>
                <CRow>
                  {
                    frequency === 'daily' ? <CCol md='6'>
                      <CLabel>
                        {" "}
                        <CSLab code="Frequency" />{" "}
                      </CLabel>
                      <TimePickerComponent id="time" placeholder="Select a Time" value={time} min={minTime} max={maxTime} />
                    </CCol> : frequency === 'weekly' ? <>
                      <CCol md='6'>
                        <CLabel>
                          {" "}
                          <CSLab code="Frequency (Weekly)" />{" "}
                        </CLabel>
                        <CSelect name="weeklyCycle" value={submitData.recurringCycle} onChange={handleOnChange}>
                          {["Select Weekly Cycle", "Every Monday", "Every Tuesday", "Every Wednesday", "Every Thursday", "Every Friday"].map(
                            (x, i) => (
                              <option key={i} value={x}>
                                {x}
                              </option>
                            )
                          )}
                        </CSelect></CCol>
                      <CCol md='6'>
                        <CLabel>
                          {" "}
                          <CSLab code="Time" />{" "}
                        </CLabel>
                        <TimePickerComponent id="time" placeholder="Select a Time" value={time} min={minTime} max={maxTime} />
                      </CCol>
                    </> : frequency === 'bi-Weekly' ? <>
                      <CCol md='4'>
                        <CLabel>
                          {" "}
                          <CSLab code="Frequency" />{" "}
                        </CLabel>
                        <CSelect name="weeklyCycle" value={submitData.recurringCycle} onChange={handleOnChange}>
                          {["Select Bi-Weekly Sequence", "Every First", "Every Second"].map(
                            (x, i) => (
                              <option key={i} value={x}>
                                {x}
                              </option>
                            )
                          )}
                        </CSelect>
                      </CCol>
                      <CCol md='4'>
                        <CLabel>
                          {" "}
                          <CSLab code="Cycle (Bi-Weekly)" />{" "}
                        </CLabel>
                        <CSelect name="weeklyCycle" value={submitData.recurringCycle} onChange={handleOnChange}>
                          {["Select Weekly Cycle", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                            (x, i) => (
                              <option key={i} value={x}>
                                {x}
                              </option>
                            )
                          )}
                        </CSelect>
                      </CCol>
                      <CCol md='4'>
                        <CLabel>
                          {" "}
                          <CSLab code="Time" />{" "}
                        </CLabel>
                        <TimePickerComponent id="time" placeholder="Select a Time" value={time} min={minTime} max={maxTime} />
                      </CCol>
                    </> : frequency === 'monthly' || frequency === 'quarterly' ? <>
                      <CCol md='4'>
                        <CLabel>
                          {" "}
                          <CSLab code="Frequency" />{" "}
                        </CLabel>
                        <CSelect name="monthlyCycle" value={submitData.monthlyCycle} onChange={handleOnChange}>
                          {["Select Monthly Sequence", "Every First", "Every Second", "Every Third", "Every Fourth", "Every Last"].map(
                            (x, i) => (
                              <option key={i} value={x}>
                                {x}
                              </option>
                            )
                          )}
                        </CSelect>
                      </CCol>
                      <CCol md='4'>
                        <CLabel>
                          {" "}
                          <CSLab code="Cycle (Monthly)" />{" "}
                        </CLabel>
                        <CSelect name="weeklyCycle" value={submitData.recurringCycle} onChange={handleOnChange}>
                          {["Select Monthly Cycle", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                            (x, i) => (
                              <option key={i} value={x}>
                                {x}
                              </option>
                            )
                          )}
                        </CSelect>
                      </CCol>
                      <CCol md='4'>
                        <CLabel>
                          {" "}
                          <CSLab code="Time" />{" "}
                        </CLabel>
                        <TimePickerComponent id="time" placeholder="Select a Time" value={time} min={minTime} max={maxTime} />
                      </CCol>
                    </> : frequency === 'semi-Annually' ? <>
                      <CCol md='4'>
                        <CLabel>
                          {" "}
                          <CSLab code="Frequency" />{" "}
                        </CLabel>
                        <CSelect name="monthlyCycle" value={submitData.monthlyCycle} onChange={handleOnChange}>
                          {["Select Sequence", "Every First", "Every Second", "Every Third", "Every Fourth", "Every Last"].map(
                            (x, i) => (
                              <option key={i} value={x}>
                                {x}
                              </option>
                            )
                          )}
                        </CSelect>
                      </CCol>
                      <CCol md='4'>
                        <CLabel>
                          {" "}
                          <CSLab code="Cycle (Semi-Annually)" />{" "}
                        </CLabel>
                        <CSelect name="weeklyCycle" value={submitData.recurringCycle} onChange={handleOnChange}>
                          {["Select Cycle", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                            (x, i) => (
                              <option key={i} value={x}>
                                {x}
                              </option>
                            )
                          )}
                        </CSelect>
                      </CCol>
                      <CCol md='4'>
                        <CLabel>
                          {" "}
                          <CSLab code="Time" />{" "}
                        </CLabel>
                        <TimePickerComponent id="time" placeholder="Select a Time" value={time} min={minTime} max={maxTime} />
                      </CCol>
                    </> : frequency === 'annually' ? <>
                      <CCol md='4'>
                        <CLabel>
                          {" "}
                          <CSLab code="Frequency" />{" "}
                        </CLabel>
                        <CSelect name="monthlyCycle" value={submitData.monthlyCycle} onChange={handleOnChange}>
                          {["Select Sequence", "Every First", "Every Second", "Every Third", "Every Fourth", "Every Last"].map(
                            (x, i) => (
                              <option key={i} value={x}>
                                {x}
                              </option>
                            )
                          )}
                        </CSelect>
                      </CCol>
                      <CCol md='4'>
                        <CLabel>
                          {" "}
                          <CSLab code="Cycle (Annually)" />{" "}
                        </CLabel>
                        <CSelect name="weeklyCycle" value={submitData.recurringCycle} onChange={handleOnChange}>
                          {["Select Cycle", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                            (x, i) => (
                              <option key={i} value={x}>
                                {x}
                              </option>
                            )
                          )}
                        </CSelect>
                      </CCol>
                      <CCol md='4'>
                        <CLabel>
                          {" "}
                          <CSLab code="Time" />{" "}
                        </CLabel>
                        <TimePickerComponent id="time" placeholder="Select a Time" value={time} min={minTime} max={maxTime} />
                      </CCol>
                    </> : null
                  }

                </CRow>
              </>
              <>
                <CRow>
                  <CCol md="6">
                    <CLabel>
                      {" "}
                      <CSLab code="Due Date" />{" "}
                    </CLabel>
                    <CInput name="name"
                      type="date"
                      className="form-control"
                      value={data?.name || ""}
                    />
                  </CCol>
                  <CCol md="6">
                    <CLabel>
                      {" "}
                      <CSLab code="Score weight" />{" "}
                    </CLabel>
                    <CInput name="name"
                      className="form-control"
                      value={data?.name || ""}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="6">
                    <CLabel>
                      {" "}
                      <CSLab code="Status" />{" "}
                    </CLabel>
                    <CSelect >
                      {["Select Status", "Active", "Inactive"].map(
                        (x, i) => (
                          <option key={i} value={x}>
                            {x}
                          </option>
                        )
                      )}
                    </CSelect>
                  </CCol>
                </CRow>
              </>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>

          <CButton
            color="secondary"
            onClick={() => {
              setShowModal(false);
              // handleReset()
            }}
          >
            <CSLab code={"HCM-9E3ZC2E1S0N-LASN"} />
          </CButton>
          <CButton color="primary" >
            <CSLab code={"HCM-TAAFD4M071D-HRPR"} />
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EmployeeMovement;
