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
import { GetEmployeeByID, SearchEmployees, GetEmployeeOrgDetails, PostEmployeeTransfer } from "src/reusable/API/EmployeeEndpoints";
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
import "../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-inputs/styles/bootstrap5.css";
import "../../../../node_modules/@syncfusion/ej2-popups/styles/bootstrap5.css";
import "../../../../node_modules/@syncfusion/ej2-lists/styles/bootstrap5.css";
import "../../../../node_modules/@syncfusion/ej2-react-calendars/styles/bootstrap5.css";
import { GetAllDepartsments, GetAllDivisions, GetAllLocations, GetAllPositions, GetAllSalaryGrades, GetAllSections, GetAllUnits, GetEmployeeTypes, GetAllStatus } from "src/reusable/API/OrganizationalEndPoints";
import { GetAllEmployees } from "src/reusable/API/EarningEndpoints";
import useLoader from "src/hooks/useLoader";
import { useRef } from "react";

const EmployeeMovement = (props) => {
  const lan = useSelector((state) => state.language);
  const [searchInput, setSearchInput] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfItems, setNumberOfItems] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [submitData, setSubmitData] = useState({});
  const [submitJobData, setSubmitJobData] = useState({});
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
  const { setIsLoading } = useLoader();
  const [empTyp, setEmployeeType] = useState([]);
  const [div, setDivision] = useState([]);
  const [cmdDep, setDepartment] = useState([]);
  const [cmdSec, setSection] = useState([]);
  const [cmdLoc, setLocation] = useState([]);
  const [cmbUnit, setUnit] = useState([]);
  const [cmbEmployees, setEmployees] = useState([]);
  const [cmbSalaryGrades, setSalaryGrades] = useState([]);
  const [cmbPos, setPosition] = useState([]);
  const [cmbStatus, setStatus] = useState([]);
  const [isProbation, setIsProbation] = useState(false)
  const [isRecurring, setIsRecurring] = useState(false)
  const [itemsError, SetItemError] = useState([])
  const [descData, setDescData] = useState([])
  const jobGrid = useRef(null)
  const [empID, setEmployeeID] = useState("");
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

  const companyRef = JSON.parse(
    sessionStorage.getItem("companyReference")
  )?.reference;


  useMultiFetch(
    [
      GetEmployeeTypes(),
      GetAllDivisions(),
      GetAllDepartsments(),
      GetAllSections(),
      GetAllLocations(),
      GetAllUnits(),
      GetAllEmployees(),
      GetAllPositions(),
      GetAllSalaryGrades(),
      GetAllStatus()
      // GetNotchSettings(),
    ],
    (results) => {
      console.log({ results })
      setIsLoading(true);
      setEmployeeType([
        {
          id: "00000000-0000-0000-0000-000000000000",
          name: `Select Employee Type`,
        },
        ...results[0].data,
      ]);
      setDivision([
        {
          id: "00000000-0000-0000-0000-000000000000",
          name: `Select Division Type`,
        },
        ...results[1].data,
      ]);
      setDepartment([
        {
          id: "00000000-0000-0000-0000-000000000000",
          name: `Select Department`,
        },
        ...results[2].data,
      ]);
      setSection([
        {
          id: "00000000-0000-0000-0000-000000000000",
          name: `Select Section`,
        },
        ...results[3].data,
      ]);
      setLocation([
        {
          id: "00000000-0000-0000-0000-000000000000",
          name: `Select Location`,
        },
        ...results[4].data,
      ]);
      setUnit([
        {
          id: "00000000-0000-0000-0000-000000000000",
          name: `Select Unit`,
        },
        ...results[5].data,
      ]);
      setIsLoading(false);
      setPosition([
        { id: "00000000-0000-0000-0000-000000000000", name: `Select Position` },
        ...results[7].data,
      ]);
      setSalaryGrades([
        {
          id: "00000000-0000-0000-0000-000000000000",
          name: `Select Salary Grade`,
        },
        ...results[8].data.items,
      ]);
      setStatus([
        { id: "00000000-0000-0000-0000-000000000000", name: `Select Status` },
        ...results[9].data,
      ]);
    }
  );

  // console.log({ cmbStatus })

  const { setUrl } = useFetch("", (response, results) => {
    if (response) {
      if (response && Object.keys(response).length > 0) {
        dispatch({ type: "set", data: { ...response } });
        // setSubmitData({ ...response });
        setViewInfo(response);
        setShow(false);

      } else {
        setMode("Add");
        setShow(false);

      }
    }
  });

  const searchReset = () => {
    setShow(true);
    setSearchInput("");

  };

  const { setData: setPostData, setUrl: setPostUrl } = usePost('', (response) => {
    console.log({ response })
    const { data } = response
    if ("" === data) {
      // toast.success(GetLabelByName("HCM-HAGGXNJQW2B_HRPR", lan));
      toast.success(GetLabelByName("HCM-HAGGXNJQW2B_HRPR", lan));
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
    setEmpDisplayName(`${results.firstName} ${results.lastName}`);
    setEmployeeID(results?.id)
    setMode("Add");
    setShow(false);
    setSubmitData({ ...results });
    if (results?.id) {
      setSearchResult(results);
      setUrl(GetEmployeeOrgDetails(results.id))
    }
  };

  const handleOnChange = (evnt) => {
    setSubmitData((data) => {
      return { ...data, [evnt?.target?.name]: evnt?.target?.value };
    });
    dispatch({
      type: "set",
      data: { ...data, [evnt?.target?.name]: evnt?.target?.value },
    });
  };


  //setSubmitJobData
  const handleJobChange = (evnt) => {
    setSubmitJobData((data) => {
      return { ...data, [evnt?.target?.name]: evnt?.target?.value };
    });
    dispatch({
      type: "set",
      data: { ...data, [evnt?.target?.name]: evnt?.target?.value },
    });
  };

  const handleSave = () => {
    console.log({ submitData })
    setDescData((prev) => [submitJobData, ...prev]);
    handleReset(1)
  }

  const handlePost = () => {

    let dataToSend = jobGrid?.current?.dataSource
    console.log(JSON.stringify(dataToSend));
    let employeeTransferActivities = []
    for (let i = 0; i < dataToSend.length; i++) {
      // const element = dataToSend[i];
      employeeTransferActivities.push({
        "activityName": dataToSend[i].activityName,
        "activityDescription": dataToSend[i].activityDescription,
        "targetType": dataToSend[i].targetType,
        "targetValue": dataToSend[i].targetValue,
        "isRecurring": dataToSend[i].isRecurring,
        "recurringCycle": dataToSend[i].recurringCycle,
        "frequency": dataToSend[i].weeklyCycle,
        "dueDate": dataToSend[i].dueDate,
        "scoreWeight": dataToSend[i].scoreWeight,
        "createdAt": "2023-12-14T09:35:43.911Z",
        "status": dataToSend[i].status
      })
    }
    let postData = {
      "employeeId": empID,
      "sectionId": submitData.sectionId,
      "departmentId": submitData.departmentId,
      "divisionId": submitData.divisionId,
      "employeeTypeId": submitData.employeeTypeId,
      "positionId": submitData.positionId,
      "unitId": submitData.unitId,
      "locationId": submitData.locationId,
      "employeeStatusId": submitData.employeeStatusId,
      "companyReference": companyRef,
      "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "authorizedBy": "string",
      employeeTransferActivities
      // "employeeTransferActivities": [
      //   {
      //     "activityName": "string",
      //     "activityDescription": "string",
      //     "targetType": 0,
      //     "targetValue": "string",
      //     "isRecurring": "string",
      //     "recurringCycle": 0,
      //     "frequency": "string",
      //     "dueDate": "2023-12-14T09:35:43.911Z",
      //     "scoreWeight": 0,
      //     "createdAt": "2023-12-14T09:35:43.911Z",
      //     "status": 0
      //   }
      // ]
    }
    // let postData = {
    //   ...submitData,
    //   dataToSend
    // }
    setPostUrl(PostEmployeeTransfer)
    setPostData(postData)
    console.log({ postData })
    handleReset()
  }

  console.log({ time })

  const handleProbation = (evnt) => {
    let hasProbation =
      evnt?.target?.name === "hasProbation"
        ? evnt?.target?.checked
        : data?.hasProbation;
    setSubmitData((data) => {
      return {
        ...data,
        [evnt?.target?.name]: evnt?.target?.value,
        hasProbation,
      };
    });
    dispatch({
      type: "set",
      data: {
        ...data,
        [evnt?.target?.name]: evnt?.target?.value,
        hasProbation,
      },
    });
  };

  const handleRecurring = (evnt) => {
    let isRecurring =
      evnt?.target?.name === "isRecurring"
        ? evnt?.target?.checked
        : data?.isRecurring;
    setSubmitJobData((data) => {
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

    setIsProbation(submitData.hasProbation)
  }, [submitData?.hasProbation])

  useEffect(() => {
    setIsRecurring(submitJobData.isRecurring)
  }, [submitJobData?.isRecurring])

  const onCommandClick = (args) => {
    console.log(args?.rowData);
  };

  const toolbarOptions = [
    "Add",
  ];

  const handleReset = (type) => {
    if (type === 1) {
      setSubmitJobData({})
    } else {
      setDescData([])
      setSubmitData({})
    }
  }

  useEffect(() => {
    if (submitJobData?.recurringCycle === "1") {
      setfrequency('daily')
    } else if (submitJobData?.recurringCycle === "2") {
      setfrequency('weekly')
    } else if (submitJobData?.recurringCycle === "3") {
      setfrequency('bi-Weekly')
    } else if (submitJobData?.recurringCycle === "4") {
      setfrequency('monthly')
    } else if (submitJobData?.recurringCycle === "5") {
      setfrequency('quarterly')
    } else if (submitJobData?.recurringCycle === "6") {
      setfrequency('semi-Annually')
    } else if (submitJobData?.recurringCycle === "7") {
      setfrequency('annually')
    } else {
      setfrequency('')
    }
  }, [submitJobData?.recurringCycle])


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
      <CRow >
        <CCol md="4" hidden={!show}>
          <CFormGroup>
            <CSAutoComplete
              filterUrl={SearchEmployees(searchInput)}
              placeholder={GetLabelByName("HCM-6FKJ6FEGW7A-HRPR", lan)}
              handleSelect={handleSearchResultSelect}
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
                              <CSelect value={viewinfo.employeeTypeId} disabled>
                                {empTyp.map((x, y) => (
                                  <option key={y} value={x.id}>
                                    {x.name}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="6">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-N6I0LSIYJF" />{" "}
                              </CLabel>
                              <CSelect value={viewinfo.departmentId} disabled>
                                {cmdDep.map((x, y) => (
                                  <option key={y} value={x.id}>
                                    {x.name}
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
                              <CSelect value={viewinfo.sectionId} disabled>
                                {cmdSec.map((x, y) => (
                                  <option key={y} value={x.id}>
                                    {x.name}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="6">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-LAFPT6FJ57N" />{" "}
                              </CLabel>
                              <CSelect value={viewinfo.divisionId} disabled>
                                {div.map((x, y) => (
                                  <option key={y} value={x.id}>
                                    {x.name}
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
                              <CSelect value={viewinfo.positionId} disabled>
                                {cmbPos.map((x, y) => (
                                  <option key={y} value={x.id}>
                                    {x.name}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="6">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-DHV9W3RF11D" />{" "}
                              </CLabel>
                              <CSelect value={viewinfo.unitId} disabled>
                                {cmbUnit.map((x, y) => (
                                  <option key={y} value={x.id}>
                                    {x.name}
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
                                <CSLab code="HCM-6XXECXM4Q5S" />{" "}
                              </CLabel>
                              <CSelect value={viewinfo.locationId} disabled>
                                {cmdLoc.map((x, y) => (
                                  <option key={y} value={x.id}>
                                    {x.name}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="6">
                              <CLabel>
                                {" "}
                                <CSLab code="Salary Grade" />{" "}
                              </CLabel>
                              <CSelect value={viewinfo.salaryGradeId} disabled>
                                {cmbSalaryGrades.map((x, y) => (
                                  <option key={y} value={x.id}>
                                    {x.name}
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
                            <CSelect name="employeeTypeId" value={submitData.employeeTypeId || -1} onChange={handleOnChange}>
                              {empTyp.map((x, y) => (
                                <option key={y} value={x.id}>
                                  {x.name}
                                </option>
                              ))}
                            </CSelect>
                          </CCol>
                          <CCol md="6">
                            <CLabel>
                              {" "}
                              <CSLab code="HCM-N6I0LSIYJF" />{" "}
                            </CLabel>
                            <CSelect name="departmentId" value={submitData.departmentId || -1} onChange={handleOnChange}>
                              {cmdDep.map((x, y) => (
                                <option key={y} value={x.id}>
                                  {x.name}
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
                            <CSelect name="sectionId" value={submitData.sectionId || -1} onChange={handleOnChange}>
                              {cmdSec.map((x, y) => (
                                <option key={y} value={x.id}>
                                  {x.name}
                                </option>
                              ))}
                            </CSelect>
                          </CCol>
                          <CCol md="6">
                            <CLabel>
                              {" "}
                              <CSLab code="HCM-LAFPT6FJ57N" />{" "}
                            </CLabel>
                            <CSelect name="divisionId" value={submitData.divisionId || -1} onChange={handleOnChange}>
                              {div.map((x, y) => (
                                <option key={y} value={x.id}>
                                  {x.name}
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
                            <CSelect name="positionId" value={submitData.positionId || -1} onChange={handleOnChange}>
                              {cmbPos.map((x, y) => (
                                <option key={y} value={x.id}>
                                  {x.name}
                                </option>
                              ))}
                            </CSelect>
                          </CCol>
                          <CCol md="6">
                            <CLabel>
                              {" "}
                              <CSLab code="HCM-DHV9W3RF11D" />{" "}
                            </CLabel>
                            <CSelect name="unitId" value={submitData.unitId || -1} onChange={handleOnChange}>
                              {cmbUnit.map((x, y) => (
                                <option key={y} value={x.id}>
                                  {x.name}
                                </option>
                              ))}
                            </CSelect>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol md="6">
                            <CLabel>
                              {" "}
                              <CSLab code="HCM-6XXECXM4Q5S" />{" "}
                            </CLabel>
                            <CSelect name="location" value={submitData.locationId || -1} onChange={handleOnChange}>
                              {cmdLoc.map((x, y) => (
                                <option key={y} value={x.id}>
                                  {x.name}
                                </option>
                              ))}
                            </CSelect>
                          </CCol>
                          <CCol md="6">
                            <CLabel>
                              {" "}
                              <CSLab code="Salary Grade" />{" "}
                            </CLabel>
                            <CSelect name="salaryGrade" value={submitData.salaryGrade || -1} onChange={handleOnChange}>
                              {cmbSalaryGrades.map((x, y) => (
                                <option key={y} value={x.id}>
                                  {x.name}
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
                            <CSelect name="notch" value={submitData.notch || -1} onChange={handleOnChange}>
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
                            <CSelect name="supervisior" value={submitData.supervisior || -1} onChange={handleOnChange}>
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
                          <CCol md="6">
                            <CLabel>
                              {" "}
                              <CSLab code="Employee Status" />{" "}
                            </CLabel>
                            <CSelect name="employeeStatusId" value={submitData.employeeStatusId || -1} onChange={handleOnChange}>
                              {cmbStatus.map((x, y) => (
                                <option key={y} value={x.id}>
                                  {x.name}
                                </option>
                              ))}
                            </CSelect>
                          </CCol>
                        </CRow>

                        <CRow>
                          <CCol md="3" style={{ marginTop: "15px" }}>
                            <CSCheckbox
                              // label={GetLabelByName("HCM-Y59W3YEAPKB-PSLL", lan)}
                              label={GetLabelByName("Probation", lan)}
                              checked={
                                submitData?.hasProbation || false
                              }
                              name="hasProbation"
                              onChange={handleProbation}
                            />
                          </CCol>
                          {isProbation ? <><CCol md="3" style={{ float: "right" }}>
                            <CLabel>
                              {" "}
                              <CSLab code="Probation Duration" />{" "}
                            </CLabel>
                            <CInput
                              name="probationDuration"
                              value={submitData?.probationDuration || ""}
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
                                name="probationEndDate"
                                value={submitData?.probationEndDate || ""}
                                onChange={handleOnChange}
                                autoComplete="off"
                              />
                            </CCol>
                            <CCol md="3" style={{ float: "right" }}>
                              <CLabel>
                                {" "}
                                <CSLab code="Probation Review Date" />{" "}
                              </CLabel>
                              <CInput
                                type="date"
                                name="probationRenewDate"
                                value={submitData?.probationRenewDate || ""}
                                onChange={handleOnChange}
                                autoComplete="off"

                              />
                            </CCol></> : null}
                        </CRow>
                        <CRow>
                          <CCol md="12">
                            <CLabel>
                              {" "}
                              <CSLab code="HCM-1NNHRS3H3JT_LANG" />{" "}
                            </CLabel>
                            <CTextarea name="reason" value={submitData.reason}
                              style={{ height: "80px", resize: "none" }}
                            ></CTextarea>
                          </CCol>
                        </CRow>
                      </CCol>
                    </CRow>
                  </CTabPane>
                  <CTabPane visible={activeKey === 2 ? "true" : "false"}>
                    <GridComponent
                      dataSource={descData}
                      height={380}
                      allowPaging={true}
                      pageSettings={{ pageSize: 8 }}
                      editSettings={editOptions}
                      ref={jobGrid}
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
                          field="activityName"
                          editType="text"
                          headerText={"Activity Name"}
                          width="100"
                        //edit={earnings}
                        />
                        <ColumnDirective
                          field="activityDescription"
                          editType="text"
                          headerText={"Activity Description"}
                          width="70"
                        //edit={earnings}
                        />
                        <ColumnDirective
                          field="targetType"
                          headerText={"Target Type"}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="targetValue"
                          headerText={"Target Value"}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="isRecurring"
                          headerText={"Recurring"}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="recurringCycle"
                          headerText={"Recurring Cycle"}
                          editType="numericedit"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="dueDate"
                          headerText={"Date"}
                          editType="date"
                          // editTemplate={editTemplate}
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="scoreWeight"
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
                color="warning"
                onClick={handleReset}
              >
                <AiOutlineRedo size={20} /> <CSLab code="HCM-MELULU9B6R_KCMI" />{" "}
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

      <CModal show={showModal} closeOnBackdrop={false} >
        <CModalHeader>Add Job Decription</CModalHeader>
        <CModalBody>
          <CRow className={"bottom-spacing"}>
            <CCol md="12">
              <>
                <CRow>
                  <CCol md="6">
                    <CLabel>
                      {" "}
                      <CSLab code="Activity Name" /><CSRequiredIndicator />{" "}
                    </CLabel>
                    <CInput name="activityName"
                      className="form-control"
                      value={submitJobData?.activityName || ""}
                      placeholder={GetLabelByName("HCM-W4TEXTQO7M9_LOLN", lan)} onChange={handleJobChange} />
                  </CCol>
                  <CCol md="6">
                    <CLabel>
                      {" "}
                      <CSLab code="Activity Description" /><CSRequiredIndicator />{" "}
                    </CLabel>
                    <CInput name="activityDescription"
                      className="form-control"
                      value={submitJobData?.activityDescription || ""}
                      placeholder="Enter Description"
                      onChange={handleJobChange}
                    />
                  </CCol>
                </CRow>
              </>
              <>
                <CRow>
                  <CCol md="6">
                    <CLabel>
                      {" "}
                      <CSLab code="Target Type" /><CSRequiredIndicator />{" "}
                    </CLabel>
                    <CSelect name="targetType" value={submitJobData.targetType || -1} onChange={handleJobChange}>
                      {[
                        "Select Target Type",
                        "Number",
                        "Currency",
                        "Percentage",
                        "Boolean",
                      ].map((x, i) => (
                        <option key={i} value={i}>
                          {x}
                        </option>
                      ))}
                    </CSelect>
                  </CCol>
                  <CCol md="6">
                    <CLabel>
                      {" "}
                      <CSLab code="Target Value" /><CSRequiredIndicator />{" "}
                    </CLabel>
                    <CInput name="targetValue"
                      className="form-control"
                      value={submitJobData?.targetValue || ""}
                      placeholder="Enter Target Value" onChange={handleJobChange} />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="6" style={{ marginTop: "15px" }}>
                    <CSCheckbox
                      // label={GetLabelByName("HCM-Y59W3YEAPKB-PSLL", lan)}
                      label={GetLabelByName("Recurring", lan)}
                      checked={
                        submitJobData?.isRecurring || false
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
                    <CSelect name="recurringCycle" value={submitJobData.recurringCycle} onChange={handleJobChange}>
                      {["Select Recurring Cycle", "Daily", "Weekly", "Bi-Weekly", "Monthly", "Quarterly", "Semi-Annually", "Annually"].map(
                        (x, i) => (
                          <option key={i} value={i}>
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
                        <CSelect name="frequency" value={submitJobData.frequency} onChange={handleJobChange}>
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
                        <CSelect name="frequency" value={submitJobData.frequency} onChange={handleJobChange}>
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
                        <CSelect name="frequencyCycle" value={submitJobData.frequencyCycle} onChange={handleJobChange}>
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
                    </> : frequency === 'monthly' || frequency === 'quarterly' || frequency === 'annually' || frequency === 'semi-Annually' ? <>
                      <CCol md='4'>
                        <CLabel>
                          {" "}
                          <CSLab code="Frequency" />{" "}
                        </CLabel>
                        <CSelect name="frequency" value={submitJobData.frequency} onChange={handleJobChange}>
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
                          <CSLab code="Cycle (Monthly)" />{" "}
                        </CLabel>
                        <CSelect name="frequencyCycle" value={submitJobData.frequencyCycle} onChange={handleJobChange}>
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
                      <CSLab code="Due Date" /><CSRequiredIndicator />{" "}
                    </CLabel>
                    <CInput name="dueDate"
                      type="date"
                      className="form-control"
                      value={submitJobData?.dueDate || ""}
                      onChange={handleJobChange}
                    />
                  </CCol>
                  <CCol md="6">
                    <CLabel>
                      {" "}
                      <CSLab code="Score weight" /><CSRequiredIndicator />{" "}
                    </CLabel>
                    <CInput name="scoreWeight"
                      className="form-control"
                      value={submitJobData?.scoreWeight || ""}
                      onChange={handleJobChange}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="6">
                    <CLabel>
                      {" "}
                      <CSLab code="Status" />{" "}
                    </CLabel>
                    <CSelect name="status" value={submitJobData.status || -1} onChange={handleJobChange}>
                      {["Select Status", "Active", "Inactive"].map(
                        (x, i) => (
                          <option key={i} value={i}>
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
              handleReset(1)
            }}
          >
            <CSLab code={"HCM-9E3ZC2E1S0N-LASN"} />
          </CButton>
          <CButton color="primary" onClick={handleSave}>
            <CSLab code={"HCM-TAAFD4M071D-HRPR"} />
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EmployeeMovement;
