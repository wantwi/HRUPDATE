import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SearchEmployees } from "src/reusable/API/EmployeeEndpoints";
import { CustomAxios } from "src/reusable/API/CustomAxios";
import { toast } from "react-toastify";
import { toastWarning } from "src/toasters/Toaster";

import {
  GetRequest,
  HttpAPIRequest,
  PostRequest,
} from "src/reusable/utils/helper";

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
  CCardFooter,
  CSelect,
  CForm,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CLabel,
  CTextarea,
  CInputRadio,
  CCardHeader,
  CModalFooter,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from "@coreui/react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { AiFillSave, AiOutlineRedo } from "react-icons/ai";
import { CardBodyHeight } from "src/reusable/utils/helper";
import { CSDivider } from "../../../reusable/components";
import "../../../scss/_custom_table.scss";

import { Divisions } from "../../../reusable/utils/GenericData";
import { GetLabelByName } from "src/reusable/configs/config";
import {
  CSCheckbox,
  CSLab,
  CSLineLabel,
  SingleSelectComponent,
  CSAutoComplete,
  CSRequiredIndicator,
} from "../../../reusable/components";
import { Checkbox } from "evergreen-ui";
import CheckBoxComponent from "src/reusable/components/CheckBoxComponent/CheckBoxComponent";
import { setChecked } from "@syncfusion/ej2-react-grids";
import { CFormCheck, CFormInput } from "@coreui/bootstrap-react";
import {
  GetYearBasis,
  PostEmployeeLeave,
  GetAllowedDayBasis,
  GetAvailableDayBasis,
  GetLeaveTypes,
} from "src/reusable/API/EmployeeLeaveTypes";
import usePost from "src/hooks/usePost";
import useMultiFetch from "src/hooks/useMultiFetch";
import useFetch from "src/hooks/useFetch";

// {
//   "employeeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "code": "string",
//   "name": "string",
//   "description": "string",
//   "availableDayBasisId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "allowedDayBasisId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "status": true,
//   "yearEndBasisId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "outstandingDayType": true,
//   "applyMaximumOutstandingDay": true,
//   "maximumNumberOfDays": 0,
//   "companyReference": "string",
//   "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
// }

const LeaveTransaction = (props) => {
  const lan = useSelector((state) => state.language);

  const [show, setShow] = useState(true);
  const [activeKey, setActiveKey] = useState(1);
  const [, setSaveContinueLabel] = useState("Continue");

  const [isChecked, setIsChecked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [skill, setSkill] = useState("");

  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfItems, setNumberOfItems] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [submitData, setSubmitData] = useState({});
  const [sortOrder, setSortOrder] = useState("");
  const [large, setLarge] = useState(false);
  const [mode, setMode] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [educationCore, setEducationCore] = useState([]);
  const [empDisplayName, setEmpDisplayName] = useState("");
  const [handleId, setHandleId] = useState("");
  const [viewinfo, setViewInfo] = useState([]);
  const [availableDayBasis, setAvailableDayBasis] = useState([]);
  const [allowedDayBasis, setAllowedDayBasis] = useState([]);
  const [yearBasis, setYearBasis] = useState([]);
  const [employeeName, setEmployeeName]= useState("")
  const [leaveType, setLeaveType]=useState([])
  const [leaveReason,setLeaveReason]=useState([])

  const handleAddNewRecord = () => {
    setMode("Add");
    setShow(false);
  };

  const  {data:multicallData} =  useMultiFetch([GetAvailableDayBasis(), 
    GetAllowedDayBasis(),GetYearBasis(),GetLeaveTypes()], (results) => {
      setAvailableDayBasis([
        { id: "-1", name: `Select Available Day Basis` },
        ...results[0].value,
      ]);
      setAllowedDayBasis([
        { id: "-1", name: `Select Allowed Day Basis ` },
        ...results[1].value,
      ]);
      setYearBasis([
        { id: "-1", name: `Select Year Basis` },
        ...results[2].value,
      ]);
      setLeaveType([
        { id: "-1", name: `Select Leave Types` },
        ...results[3].value,
      ]);
  })

  const {setOptData, setUrl} =  useFetch("", (response,results) => {
    if (response) {
        if (response && Object.keys(response).length > 0) {
            // setSearchResult(results);
            dispatch({ type: 'set', data: { ...response } });
            setSubmitData(response);
            //setDupData({...response})
            setViewInfo(response)
            setMode('Update');
            setShow(false);
        } else {
            setMode('Add');
            setShow(false);
            dispatch({ type: 'set', data: { ...response } });
            setSubmitData({ ...response });
        }
    }
});


  const  {setData:setPostData, setUrl:setPostUrl} = usePost('', (response) => {
    // console.log({location:response });
    const {data} = response
    if ("" === data) {
      toast.success(GetLabelByName("HCM-HAGGXNJQW2B_HRPR", lan));
      //showToasts();
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
    dispatch({ type: "set", data: { ...results } });
    setSubmitData({ ...results });

    if (results?.id) {
      setSearchResult(results);
      setEmployeeName(`${results?.firstName} ${results?.lastName}`)



      // GetRequest()
      //   .then((response) => {
      //     // toast.dismiss(toastId);
      //     if (response.ok) {
      //       response.json().then((response) => {
      //         // console.log({response});
      //         if (response && Object.keys(response).length > 0) {
      //           dispatch({ type: "set", data: { ...response } });
      //           setSubmitData({ ...response });
      //           // setDuplicateData({ ...response })
      //           //console.log({ response });

      //           //let rates = response?.rates;

      //           // setExchangeRate(rates);
      //           setShow(false);
      //           setMode("Update");
      //         } else {
      //           setMode("Add");
      //           setShow(false);
      //           // dispatch({ type: 'set', data: { ...results, isHomeCurrency } });
      //           // setSubmitData({ ...results, isHomeCurrency });
      //         }
      //       });
      //     }
      //   })
      //   .catch((err) => {
      //     // console.log(err);
      //     // toaster(toastId, "Failed to retrieve details", 'error', 4000);
      //   });
    }
  };
  // GET EMPLOYEE lEAVE DETAILS
  // const getEmployeeSkills = async () => {
  //   try {
  //     const request = await CustomAxios.get(`EmployeeSkills/${handleId}`);

  //     const response = request.data;
  //     console.log("emp response:", response);
  //     setViewInfo((prevState) => response);
  //   } catch (error) {
  //     console.log({ error });
  //   }
  // };
  // useEffect(() => {
  //   if (handleId !== "") {
  //     getEmployeeSkills();
  //   }
  // }, [handleId]);

  const TransLabelByCode = (name) => GetLabelByName(name, lan);
  const searchReset = () => {
    setShow(true);
    setSearchInput("");

    // const [grid,] = useState(null);

    const TransLabelByCode = (name) => GetLabelByName(name, lan);

    // const OnSaveContinueClick = () => {
    //     console.log(grid);
    // }
  };

  //Drop down list for hobby types
  const MultipleGetRequests = async () => {
    try {
      let request = [
        HttpAPIRequest("GET", GetAvailableDayBasis()),
        HttpAPIRequest("GET", GetAllowedDayBasis()),
        HttpAPIRequest("GET", GetYearBasis()),
      ];
      const multipleCall = await Promise.allSettled(request);
      console.log(multipleCall[0].value);
      console.log(multipleCall[1].value);
      console.log(multipleCall[2].value);

      setAvailableDayBasis([
        { id: "-1", name: `Select Available Day Basis` },
        ...multipleCall[0].value,
      ]);
      setAllowedDayBasis([
        { id: "-1", name: `Select Allowed Day Basis ` },
        ...multipleCall[1].value,
      ]);
      setYearBasis([
        { id: "-1", name: `Select Year Basis` },
        ...multipleCall[2].value,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    MultipleGetRequests();
  }, []);

  //Handles Submit
  const handleOnSubmit = () => {
    console.log("submit data ", submitData);

    if (!submitData?.skillTypeId || submitData?.skillTypeId === "") {
      toast.error("Please Select a Skill Type!", toastWarning);
      return;
    }
    // if (!submitData?.payPeriodId || submitData?.payPeriodId === '') {
    //     //toast.error('Please select a pay period!', toastWarning);
    //     return;
    // }
    // console.log(submitData)
    let employeeId = submitData.id;
    //  let newData = { ...submitData, option: options, companyId: TestCompanyId };
    let newData = {
      ...submitData,
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      CompanyReference: "00001_A01",
      employeeId,
      status: true,
    };
    //let finalData = JSON.stringify(newData)
    // console.log(finalData)
    // 'Add' === mode ? AddGLAccount(newData) : updateGLAccount(newData);
    postEmployeeLeave(newData);
  };

  //Post Employee Skill
  function postEmployeeLeave(data) {
    console.log("post data", data);
    PostRequest(PostEmployeeLeave(), { data: data })
      .then((response) => {
        response.text().then((data) => {
          if ("" === data) {
            // toast.success('Earning Mass Update Successful!',);
            console.log("success");
          } else {
            try {
              data = JSON.parse(data);
              // toaster(toastId, data?.reason ? data?.reason : "Failed to update Currency", 'error', 4000);
            } catch (error) {
              console.log(error);
            }
          }
        });
      })
      .catch((err) => {
        console.log({ err });
      })
      .finally(() => {
        console.log("Done");
      });
  }
  const handleOnChange = (evnt) => {
    //console.log(evnt)
    setSubmitData((data) => {
      return { ...data, [evnt?.target?.name]: evnt?.target?.value };
    });
    dispatch({
      type: "set",
      data: { ...data, [evnt?.target?.name]: evnt?.target?.value },
    });
  };

  return (
    <>
      <CRow >
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-I0ZV6XVP41I_LASN" />
          </h5>
        </CCol>
      </CRow>
      <CRow hidden={!show ? true : false}>
        <CCol md="4">
          <CFormGroup>
            <CSAutoComplete
              filterUrl={SearchEmployees(searchInput)}
              //filterUrl=''            //filterUrl={SearchInternalCurrencies(searchInput)}
              placeholder={"Search for employee by name or code"}
              handleSelect={handleSearchResultSelect}
              //onChange={()=>handleSearchResultSelect}
              displayTextKey={"firstName"}
              setInput={setSearchInput}
              input={searchInput}
              emptySearchFieldMessage={`Please input 3 or more characters to search`}
              searchName={"Employee"}
              isPaginated={false}
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

        {/* <CCol md="8" xs="5" className="text-right">
          <CFormGroup>
            <CButton
              type="button"
              onClick={handleAddNewRecord}
              size="sm"
              color="primary"
            >
              {" "}
              <AiOutlinePlus />{" "}
              {show ? <CSLab code="HCM-I0ZV6XVP41I_LASN" /> : null}{" "}
            </CButton>
          </CFormGroup>
        </CCol> */}
      </CRow>
      <CRow>
        <CCol md="4" className="text-right"></CCol>
        <CCol xs="10" hidden={show}>
          <CCard>
          <CCardHeader>

              <CFormGroup row>
                <CCol md="2">
                <CCol md="4" className="text-right"></CCol>
                  <b>Employee:</b>{" "}
                  <span
                    style={{
                      textDecoration: "underline dotted",
                      cursor: "pointer",
                    }}
                    type="button"
                    onClick={() => setLarge(!large)}
                    size="md"
                    color="primary"
                  >
                    {employeeName}
                  </span>
                </CCol>
                   <CCol md="2">
                <CCol md="4" className="text-right"></CCol>
                  <b>Department:</b>{" "}
                  <span
                    style={{
                      textDecoration: "underline dotted",
                      cursor: "pointer",
                    }}
                    type="button"
                    onClick={() => setLarge(!large)}
                    size="md"
                    color="primary"
                  >
                    Software Dept.
                  </span>
                </CCol>
                <CCol md="2">
                <CCol md="4" className="text-right"></CCol>
                  <b>Position:</b>{" "}
                  <span
                    style={{
                      textDecoration: "underline dotted",
                      cursor: "pointer",
                    }}
                    type="button"
                    onClick={() => setLarge(!large)}
                    size="md"
                    color="primary"
                  >
                    Software Eng.
                  </span>
                </CCol>
                <CCol md="2">
                <CCol md="4" className="text-right"></CCol>
                  <b>Hire Date:</b>{" "}
                  <span
                    style={{
                      textDecoration: "underline dotted",
                      cursor: "pointer",
                    }}
                    type="button"
                    onClick={() => setLarge(!large)}
                    size="md"
                    color="primary"
                  >
                    10-Nov-2022
                  </span>
                </CCol>
                <CCol md="4">
                  {/* <CTooltip content={`Click here to view Employees`} >
                <CButton color="outline-primary"> <MdPeople /> 120 </CButton>
                </CTooltip> */}
                </CCol>
                {/* <CCol md="4">
                  <CButton
                    color="primary"
                    style={{ float: "right" }}
                    onClick={() => {
                      setVisible(true);
                    }}
                  >
                    <AiOutlinePlus />
                    <CSLab code="HCM-AEPFSW9621-LANG" />{" "}
                  </CButton>
                </CCol> */}
              </CFormGroup>
            </CCardHeader>
            <CCardBody style={{ height: CardBodyHeight }}>
              {/* <CRow className={"bottom-spacing"}> */}
              {/* <CCol md="5"> */}
              {/* <CCol md="12">
                    <CSLineLabel name="HCM-5S2JSN34J47_LANG" />{" "}
                  </CCol> */}

{/* 
                   <CCol >
                   <CRow>
                     <>
               
                  <CCol md="2">
                    <CLabel>
                      {" "}
                      <CSLab code="HCM-FQYC4N0VN1W-HRPR" />{" "}
                    </CLabel>
                    <CInput
                      name="employeename"
                      value={data?.employeename || ""}
                      onChange={handleOnChange}
                    />
                  </CCol>
                  <CCol md="2">
                    <CLabel>
                      {" "}
                      <CSLab code="HCM-5S2JSN34J47_LANG" />{" "}
                    </CLabel>
                    <CSelect
                      name="leaveType"
                      value={data?.leaveType || -1}
                      onChange={handleOnChange}
                    >
                      {availableDayBasis.map((x, i) => (
                        <option key={i} value={x.id}>
                          {x.name}
                        </option>
                      ))}
                    </CSelect>
                  </CCol>
                  <CCol md="2">
                    <CLabel>
                      {" "}
                      <CSLab code="HCM-SFIO9LH60UG-KCMI" />{" "}
                    </CLabel>
                    <CInput
                      name="leaveBalance"
                      value={data?.leaveBalance || ""}
                      onChange={handleOnChange}
                    />
                  </CCol>
                </>
              </CRow>
              <>
                <CRow style={{ marginTop: "10px" }}>
                  <CCol md="2">
                    <CLabel>
                      {" "}
                      <CSLab code="HCM-LFITDP0PORN_KCMI" />{" "}
                    </CLabel>
                    <CSelect
                      name="allowedDayBasisId"
                      value={data?.allowedDayBasisId || -1}
                    >
                      {allowedDayBasis.map((x, i) => (
                        <option key={i} value={x.id}>
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
                      <CSLab code="HCM-Z0FV0XJJ06" />{" "}
                    </CLabel>
                    <CTextarea
                      name="description"
                      value={data?.description || ""}
                      onChange={handleOnChange}
                      style={{ height: "80px", resize: "none" }}
                    ></CTextarea>
                  </CCol>
                </CRow>
                <CRow style={{ marginTop: "10px" }}>
                  <CCol md="4">
                    <CLabel>
                      {" "}
                      <CSLab code="HCM-RQB38Y1ZFPO-LANG" />{" "}
                    </CLabel>
                    <CSelect>
                      {["Select Status", "Active", "Inactive"].map((x, i) => (
                        <option key={i} value={x}>
                          {x}
                        </option>
                      ))}
                    </CSelect>
                  </CCol>
                </CRow>
              </>
            </CCol>      */}
                    <CRow>
                                        <CCol md='3'></CCol>
                                        <CCol md="4">
                                            <CRow >
                                                {/* <CCol md="4">
                                                    <CLabel> <CSLab code="HCM-FQYC4N0VN1W-HRPR" />{" "}</CLabel> <CSRequiredIndicator />
                                                    <CSelect  name="employeename"  value={data?.employeename || ""}  onChange={handleOnChange}  >
                                                      </CSelect>
                                                </CCol> */}
                                                <CCol md="4"><CLabel> <CSLab code="HCM-5S2JSN34J47_LANG" />{" "}</CLabel> <CSRequiredIndicator />
                                                <CSelect
                                                    name="leaveType"
                                                    value={data?.leaveType || -1}
                                                    onChange={handleOnChange}
                                                  >
                                                    <option value={-1} key="1"> Select Type</option>
                                                    {leaveType.map((x, i) => (
                                                      <option key={i} value={x.id}>
                                                        {x.name}
                                                      </option>
                                                    ))}
                                                  </CSelect>
                                                </CCol>
                                                <CCol md="2">
                                                    <CLabel>
                                                      {" "}
                                                      <CSLab code="HCM-MELS9L6AGFI-LASN" />{" "}</CLabel> <CSRequiredIndicator />
                                             
                                                    <CInput
                                                      name="leaveTaken"
                                                      value={data?.leaveTaken || ""}
                                                      onChange={handleOnChange}
                                                      disabled
                                                    />
                                                       
                                                    
                                                </CCol>
                                                <CCol md="3">
                                                    <CLabel>
                                                      {" "}
                                                      <CSLab code="HCM-3JPHHVBOVEN-PSLL" />{" "}</CLabel> <CSRequiredIndicator />
                                             
                                                    <CInput
                                                      name="leaveBalance"
                                                      value={data?.leaveBalance || ""}
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
                                                      value={data?.leaveBalance || ""}
                                                      onChange={handleOnChange}
                                                      disabled
                                                    />
                                                       
                                                    
                                                </CCol>
                                            </CRow>
                                            <CRow className={'bottom-spacing'}>
                                            
                                              
                                          {/* <CCol md="4"><CLabel> <CSLab code="HCM-D0U4M0L8TNH-KCMI" />{" "}</CLabel> <CSRequiredIndicator />
                                                <CSelect
                                                    name="leaveReason"
                                                    value={data?.leaveReason || -1}
                                                    onChange={handleOnChange}
                                                  >
                                                    {availableDayBasis.map((x, i) => (
                                                      <option key={i} value={x.id}>
                                                        {x.name}
                                                      </option>
                                                    ))}
                                                  </CSelect>
                                                </CCol> */}
                                                <CCol md="4">
                                                    <CLabel> <CSLab code="HCM-K85NF9HWVXC-LANG" />{" "}</CLabel> <CSRequiredIndicator />
                                                    <CInput type="date" name="leaveStartDate"  value={data?.leaveStartDate || ""}  onChange={handleOnChange} />
                                                </CCol>
                                                <CCol md="4">
                                                    <CLabel> <CSLab code="HCM-S4N9DCXVMJ" />{" "}</CLabel> <CSRequiredIndicator />
                                                    <CInput type="date" name="leaveEndDate"  value={data?.leaveEndDate || ""}  onChange={handleOnChange} />
                                                </CCol>
                                                <CCol md="4 ">
                                                    <CLabel>
                                                      {" "}
                                                      <CSLab code="Number Of Days" />{" "}</CLabel> <CSRequiredIndicator />
                                                    <CInput
                                                      name="leaveBalance"
                                                      value={data?.leaveBalance || ""}
                                                      onChange={handleOnChange}
                                               disabled
                                                    />
                                                       
                                                    
                                                </CCol>
                                                
                                            </CRow>
                                            <CRow>
                                            <CCol md="12">
                                              <CLabel>
                                                {" "}
                                                <CSLab code="HCM-Z0FV0XJJ06" />{" "}
                                              </CLabel>
                                              <CTextarea
                                                name="description"
                                                value={data?.description || ""}
                                                onChange={handleOnChange}
                                                style={{ height: "80px", resize: "none" }}
                                              ></CTextarea>
                                            </CCol>
                                            </CRow>
                                            {/* <CRow>
                                            <CCol md="8">
                                              <CLabel>
                                                {" "}
                                                <CSLab code="HCM-Z0FV0XJJ06" />{" "}
                                              </CLabel>
                                              <CTextarea
                                                name="description"
                                                value={data?.description || ""}
                                                onChange={handleOnChange}
                                                style={{ height: "80px", resize: "none" }}
                                              ></CTextarea>
                                            </CCol>
                                            </CRow> */}
                                        </CCol>                                 
                                        <CCol md='3'></CCol>
                                    </CRow>
              
              <></>
              {/* </CCol> */}

              {/* <CSDivider style={{ height: "100%" }} md="1" /> */}
              {/* bgb
               */}
              {/* </CRow> */}
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
                onClick={handleOnSubmit}
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
      
      {/* <CModal
        closeOnBackdrop={false}
        show={large}
        onClose={() => setLarge(!large)}
        size="sm"
      >
        <CModalHeader closeButton>
          <CModalTitle>Employee Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="12">
              <CLabel>Department</CLabel>
              <CInput value={"Software Department"} disabled={true} />
            </CCol>
           
          </CRow>
          <CRow>
          <CCol md="12">
              <CLabel>Position</CLabel>
              <CInput value={"Software Dev."} disabled={true} />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="12">
              <CLabel> Hire Date </CLabel>
              <CInput
                style={{ textAlign: "left" }}
                value={"10-11-2022"}
                disabled={true}
              />
            </CCol>
           
          </CRow>
         

        </CModalBody>
        <CModalFooter>
          <CButton color='warning' onClick={() => setLarge(!large)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal> */}
    </>
  );
};

export default LeaveTransaction;
