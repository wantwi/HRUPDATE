import React, { useRef, useState } from "react";
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
  CLabel,
  CCardFooter,
  CCardHeader,
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
// import {
//   Locations,
//   Divisions,
//   Departments,
// } from "../../reusable/utils/GenericData";

import { GetLabelByName } from "src/reusable/configs/config";
import { useSelector } from "react-redux";
// import {
//   MultiSelectComponent,
//   CheckBoxSelection,
//   Inject,
// } from "@syncfusion/ej2-react-dropdowns";

// import {
//   // MultiSelectComponent,
//   SingleSelectComponent,
// } from "../ReusableComponents";
import MultipleSection from "./MultipleSection";
import {
  GetEmployeeTypes,
  GetAllDivisions,
  GetAllDepartsments,
  GetAllSections,
  GetAllLocations,
  GetAllUnits,
  GetAllPositions,
  GetAllSalaryGrades,
} from "src/reusable/API/OrganizationalEndPoints";
import { GetAllEmployees } from "src/reusable/API/EarningEndpoints";
import useMultiFetch from "src/hooks/useMultiFetch";
import { reportTypes, sortTypes, Reports } from "./data";
import { PAY_PERIOD_YEAR, PAY_PERIODS } from "src/reusable/API/ReportsEndPoint";
import useFetch from "src/hooks/useFetch";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "src/hooks/useAuth";
import { Button } from "@coreui/coreui";

const renderEmployees = (data) => {
  if (!data) return [];
  return data.map((x) => ({
    id: x?.id,
    name: `${x?.firstName} ${x?.lastName} - (${x?.staffId})`,
  }));
};

const Report = (props) => {
  const {auth} = useAuth()
  
  const lan = useSelector((state) => state.language);
  //array index of each data 0- GetEmployeeTypes, 1 - GetAllDivisions, 2 - GetAllDepartsments, 3 - GetAllSections 4-GetAllLocations, 5- GetAllUnits, 6 - GetAllEmployees , 7 - GetAllPositions, 8- GetAllSalaryGrades
  const [filterData, setFilterData] = useState([]);
  const TransLabelByName = (name) => GetLabelByName(name, lan);
  const [employeeNames, setEmployeeNames] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [salaryGrades, setSalaryGrades] = useState([]);
  const [divistions, setDivision] = useState([]);
  const [positions, setPositions] = useState([]);
  const [location, setLoacation] = useState([]);
  const [department, setDepartment] = useState([]);
  const [unit, setUnit] = useState([]);
  const [sections, setSections] = useState([]);
  const [reportNames, setReportNames] = useState([]);
  const [sortBy, setSortBy] = useState(1);
  const [reportName, setReportName] = useState("");
  const [selecteReportType, setselecteReportType] = useState(0);
  const [isFilterChecked, setIsFilterChecked] = useState(true);
  const [payPeriodYears, setPayPeriodYears] = useState([])
  const [selectedYear, setSelectedYear]= useState("")
  const [payPeriods, setPayPeriods] = useState([])
  const [selectedPeriod, setSelectedPeriod]= useState("")
  const [selectedReport, setSelectedReport] =useState("-1")
  const [sortByName, setSortByName] = useState(sortTypes.find(x => x.id === +sortBy)?.name);
  
  const viewReportLinkRef = useRef(null)
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
      PAY_PERIOD_YEAR
    ],
    (response) => {
    
      setPayPeriodYears(response[9].data)
      setFilterData(response.map((x) => x.data));
    }
  );

  //console.log({ filterData });

  const handleClickEvent = () => {
    let parameters;

    if(selecteReportType === 1){
        parameters = [{
          name: 'uUserId',
          labels: ['u User Id'],
          values: ["557B5912-62FD-4A91-BEA3-08D875A1DD51"],
          nullable: false
          },
          {
            name: 'uCompanyId',
            labels: ['u Company Id'],
            values: ["00001_A01"],
            nullable: false
            }
        ]
    }else{
      parameters = [
        {
          name: 'iSortBy',
          labels: ['iSortBy'],
          values: [Number(sortBy)],
          nullable: true
        },
        {
          name: 'szSortBy',
          labels: ['szSortBy'],
          values: [" "],
          nullable: true
        },
        {
          name: 'szQueryFilter',
          labels: ['szQuery Filter'],
          values: [" "],
          nullable: true
        },
        {
          name: 'szLanguage',
          labels: ['sz Language'],
          values: ["en"],
          nullable: true
        },
        {
          name: 'ReportQuerySelection',
          labels: ['Report Query Selection'],
          values: [" "],
          nullable: true
        },
        {
          name: 'uPeriodId',
          labels: ['uPeriodId'],
          values: [`${selectedPeriod}`],
          nullable: false
        },
        {
          name: 'uBeginPeriodId',
          labels: ['uPeriodId'],
          values: [`${selectedPeriod}`],
          nullable: false
        },
        {
          name: 'uEndPeriodId',
          labels: ['uPeriodId'],
          values: [`${selectedPeriod}`],
          nullable: false
        },
        {
          name: 'iGroupBy',
          labels: ['i GroupBy'],
          values: [Number(sortBy)],
          nullable: false
        },
        {
          name: 'szGroupBy',
          labels: ['sz GroupBy'],
          values: [`${sortByName}`],
          nullable: false
        },
        {
          name: 'uUserId',
          labels: ['u User Id'],
          values: ["557B5912-62FD-4A91-BEA3-08D875A1DD51"],
          nullable: false
          },
          {
            name: 'uCompanyId',
            labels: ['u Company Id'],
            values: ["00001_A01"],
            nullable: false
          }
      ]
    }
    
    
   
    
    localStorage.removeItem(`${reportName}`)
    const requestParams = {parameters,token: auth?.accessToken}
    localStorage.setItem(`${reportName}`, JSON.stringify(requestParams))

    viewReportLinkRef.current.click()
  };

  const handleFilterCheck = () => {
    setIsFilterChecked(!isFilterChecked);
  };

  const getReportList =(type) => {

    const reportList =  Reports.filter(x => x?.type === type)

    //console.log({reportList});

    setReportNames(reportList)
    

  }

  const handleReportTypeChange = (e) =>{
    setselecteReportType(+e.target.value)
    getReportList(e.target.value)

    setSortBy("")
    setSelectedPeriod("")
    setSelectedYear("")
  }

  const {setUrl:setGetPeriodUrl} = useFetch("", (response) => {
    //console.log({getPeriod:response});
    setPayPeriods(response)

  })

  const handleChange = (e) => {
    if(e.target.name ==="periodYear"){
      setSelectedYear(e.target.value)
    }
  }

  const getReportName = (id) => {
    setSelectedReport(id)
    const reportActionName =  reportNames.find(x =>x.id === +id)?.action
   setReportName(reportActionName)

  }

  useEffect(() => {
    if(selectedYear){
      setGetPeriodUrl(PAY_PERIODS(selectedYear))
    }
    return () => {
      setGetPeriodUrl("")
    }
  }, [selectedYear])
  
// console.log({sortBy: sortTypes.find(x => x.id === +sortBy)?.name });

  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>{"Report"}</h5>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader className="header">Report Dialogue</CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <CRow>
                  {/* Details */}

                  <CCol md="5">
                    {/* <h6 htmlFor="name" className="ch-l-s">
                          <small>{TransLabelByName("Report Structure")}</small>
                      </h6> */}
                    <CFormGroup>
                      <CCol md="12">
                        <CLabel htmlFor="code">
                          {TransLabelByName("Report Group")}
                        </CLabel>
                        <select
                          onChange={handleReportTypeChange}
                          value={selecteReportType}
                          className="form-control"
                         
                        >
                          <option selected disabled value={0}>Selecte report type</option>
                          {reportTypes.map((x) => (
                            <option key={`${x.id}_type`} value={x.id}>
                              {x?.name}
                            </option>
                          ))}
                        </select>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup>
                      <CCol md="12">
                        <CLabel htmlFor="Report Name">
                          {TransLabelByName("Report Name")}
                        </CLabel>
                        <select value={selectedReport} onChange={(e)=> getReportName(e.target.value)} className="form-control">
                          <option value="-1">Selecte report name</option>
                          {reportNames.map((x) => (
                            <option key={`${x.id}_type`} value={x.id}>
                              {x?.name}
                            </option>
                          ))}
                        </select>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup>
                      <CCol md="12">
                        <CLabel htmlFor="Sort By">
                          {TransLabelByName("Sort By")}
                        </CLabel>
                        <select onChange={(e)=> {setSortBy(e.target.value); setSortByName(sortTypes.find(x => x.id === +e.target.value)?.name )}} value={sortBy} className="form-control">
                          {sortTypes.map((x) => (
                            <option key={`${x.id}_type`} value={x.id}>
                              {x?.name}
                            </option>
                          ))}
                        </select>
                      </CCol>
                    </CFormGroup>
                    {/* {selecteReportType <= 1 ? null : (
                      <>
                        <CFormGroup>
                          <CCol md="12">
                            <CLabel htmlFor="code">
                              {TransLabelByName("Year")}
                            </CLabel>
                           
                            <CInputGroup  className="input-prepend">

                            <select onChange={handleChange} value={selectedYear} name="periodYear" className="form-control">
                              <option selected value={0}>Selecte year</option>
                              {payPeriodYears.map((x) => (
                                <option key={`${x}`} value={x}>
                                  {x}
                                </option>
                              ))}
                            </select>
                              <CInputGroupAppend>
                              
                                <CInputGroupText className="form-control">
                                  to
                                </CInputGroupText>
                              </CInputGroupAppend>
                              <select disabled onChange={handleChange} value={selectedYear} name="periodYear" className="form-control">
                              <option selected value={0}>Selecte year</option>
                              {payPeriodYears.map((x) => (
                                <option key={`${x}`} value={x}>
                                  {x}
                                </option>
                              ))}
                            </select>
                            </CInputGroup>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup>
                          <CCol md="12">
                            <CLabel htmlFor="code">
                              {TransLabelByName("Period")}
                            </CLabel>
                            <CInputGroup className="input-prepend">
                            <select onChange={(e)=> setSelectedPeriod(e.target.value)} value={selectedPeriod} name="periodYear" className="form-control">
                              <option selected value="">Selecte year</option>
                              {payPeriods.map((x) => (
                                <option key={`${x?.id}`} value={x?.id}>
                                  {`${x?.name} - ${x?.year}`}
                                </option>
                              ))}
                            </select>
                             
                              <CInputGroupAppend>
                                <CInputGroupText className="form-control">
                                  to
                                </CInputGroupText>
                              </CInputGroupAppend>
                              <select disabled onChange={(e)=> setSelectedPeriod(e.target.value)} value={selectedPeriod} name="periodYear" className="form-control">
                              <option selected value="">Selecte year</option>
                              {payPeriods.map((x) => (
                                <option key={`${x?.id}`} value={x?.id}>
                                  {`${x?.name} - ${x?.year}`}
                                </option>
                              ))}
                            </select>
                            </CInputGroup>
                          </CCol>
                        </CFormGroup>
                      </>
                    )} */}
                  </CCol>

                  {/* Applicables */}
                  <CCol md="7" className={"bg-silver-lighter well"}>
                    {/* <CFormGroup>
                      <CCol md="12">
                        <h6 htmlFor="name" className="ch-l-s">
                          <small>{TransLabelByName("Filter")}</small>
                        </h6>
                      </CCol>
                    </CFormGroup> */}
                    <CFormGroup row className="mb-3">
                      <CCol md="6" style={{ position: "relative" }}>
                        <div
                          style={{ position: "absolute", left: 15, top: -15 }}
                        >
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div>
                              <input
                                checked={isFilterChecked}
                                onChange={handleFilterCheck}
                                style={{ float: "left" }}
                                type="checkbox"
                              />
                            </div>

                            <div
                              style={{
                                marginLeft: 8,
                                marginTop: 2,
                                fontWeight: 500,
                              }}
                            >
                              <label>Filter</label>{" "}
                            </div>
                          </div>
                        </div>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row hidden>
                      <CCol md="3">
                        {/* <CLabel htmlFor="name">
                          {TransLabelByName("Employee Name")}
                        </CLabel> */}
                      </CCol>
                      <CCol xs="12" md="9">
                        <div style={{float:"right"}}>
                          <button>Add Employee</button>
                        </div>
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="name">
                          {TransLabelByName("Employee Name")}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <MultipleSection
                          data={renderEmployees(filterData[6])}
                          isFilterChecked={isFilterChecked}
                          placeholder="Employee Name"
                          state={setEmployeeNames}
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="name">
                          {TransLabelByName("Employee Type")}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <MultipleSection
                          data={filterData[0]}
                          isFilterChecked={isFilterChecked}
                          placeholder="Employee Type"
                          state={setEmployeeTypes}
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="name">
                          {TransLabelByName("Salary Grade")}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <MultipleSection
                          data={filterData[8]?.items ||[]}
                          isFilterChecked={isFilterChecked}
                          placeholder="Salary Grade"
                          state={setSalaryGrades}
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="name">
                          {TransLabelByName("Position")}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <MultipleSection
                          data={filterData[7]}
                          isFilterChecked={isFilterChecked}
                          placeholder="Position"
                          state={setPositions}
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="name">
                          {TransLabelByName("Location")}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <MultipleSection
                          data={filterData[4]}
                          isFilterChecked={isFilterChecked}
                          placeholder="Location"
                          state={setLoacation}
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="name">
                          {TransLabelByName("Division")}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <MultipleSection
                          data={filterData[1]}
                          isFilterChecked={isFilterChecked}
                          placeholder="Division"
                          state={setDivision}
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="name">
                          {TransLabelByName("Department")}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <MultipleSection
                          data={filterData[2]}
                          isFilterChecked={isFilterChecked}
                          placeholder="Department"
                          state={setDepartment}
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="name">
                          {TransLabelByName("Section")}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <MultipleSection
                          data={filterData[3]}
                          isFilterChecked={isFilterChecked}
                          placeholder="Section"
                          state={setSections}
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="name">
                          {TransLabelByName("Unit")}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <MultipleSection
                          data={filterData[5]}
                          isFilterChecked={isFilterChecked}
                          placeholder="Unit"
                          state={setUnit}
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="name">
                          {TransLabelByName("Hire Date")}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInputGroup className="input-prepend">
                          <CInput
                            id="appendedPrependedInput"
                            size="16"
                            type="date"
                          />
                          <CInputGroupAppend>
                            <CInputGroupText className="form-control">
                              to
                            </CInputGroupText>
                          </CInputGroupAppend>
                          <CInput
                            id="appendedPrependedInput2"
                            size="16"
                            type="date"
                          />
                        </CInputGroup>
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter>
              {/* <CSwitch className="mr-1" color="success" defaultChecked /> */}
              <CButton
                style={{ marginRight: 5, float: "right" }}
                type="button"
                size="sm"
                color="success"
                onClick={handleClickEvent}
              >
                <CIcon name="cil-scrubber" /> {TransLabelByName("Preview")}
              </CButton>
              <CButton
                style={{ marginRight: 5, float: "right" }}
                type="button"
                size="sm"
                color="danger"
              >
                <CIcon name="cil-ban" /> {TransLabelByName("Reset")}
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
     
      <Link hidden ref={viewReportLinkRef} to={`/report-view/${reportName}`} target="_blank">View</Link>
    </>
  );
};

export default Report;
