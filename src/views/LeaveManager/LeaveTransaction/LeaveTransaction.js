import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SearchEmployees } from "src/reusable/API/EmployeeEndpoints";
import { toast } from "react-toastify";
import { toastWarning } from "src/toasters/Toaster";
import CIcon from "@coreui/icons-react";
import {
  CInput,
  CCard,
  CCardBody,
  CFormGroup,
  CCol,
  CRow,
  CButton,
  CCardFooter,
  CSelect,

  CLabel,
  CTextarea,
  CCardHeader,

} from "@coreui/react";
import { AiOutlineClose } from "react-icons/ai";
import { AiFillSave, AiOutlineRedo } from "react-icons/ai";
import { CardBodyHeight } from "src/reusable/utils/helper";
import "../../../scss/_custom_table.scss";
import { GetLabelByName } from "src/reusable/configs/config";
import {
  CSLab,
  CSAutoComplete,
  CSRequiredIndicator,
} from "../../../reusable/components";
import usePost from "src/hooks/usePost";
import useMultiFetch from "src/hooks/useMultiFetch";
import useFetch from "src/hooks/useFetch";
import { getLeaveTypes, AllowedDayBasis, AvailableDayBasis, GetLeaveTransactionById, PostLeaveTransaction, YearEndBasis } from "src/reusable/API/LeaveTransaction";
import LeaveTypes from "../../EmployeeManager/LeaveTypes/LeaveTypes";
import useAuth from "src/hooks/useAuth";



const LeaveTransaction = (props) => {
  const lan = useSelector((state) => state.language);

  const [show, setShow] = useState(true)

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
  const [empDisplayName, setEmpDisplayName] = useState("");
  const [handleId, setHandleId] = useState("");
  const [viewinfo, setViewInfo] = useState([]);
  const [employeeName, setEmployeeName] = useState("")
  const [leaveTypes, setLeaveTypes] = useState([])
  const { auth } = useAuth()
  const { companyReference: CompanyReference } = auth

  useMultiFetch([getLeaveTypes()], (results) => {
    console.log({ results })
    setLeaveTypes([
      { id: "-1", name: `Select Leave Type` },
      ...results[0].data,
    ]);

  })

  const { setUrl } = useFetch("", (response, results) => {
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


  const { setData: setPostData, setUrl: setPostUrl } = usePost('', (response) => {
    // console.log({location:response });
    const { data } = response
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
    setEmpDisplayName(
      (prevState) => `${results.firstName} ${results.lastName}`
    );

    setMode("Add");
    setShow(false);
    dispatch({ type: "set", data: { ...results } });
    setSubmitData({ ...results });

    if (results?.id) {
      setSearchResult(results);
      setEmployeeName(`${results?.firstName} ${results?.lastName}`)
      console.log(results.id)
      setUrl(GetLeaveTransactionById(results?.id))
    }
  };


  const searchReset = () => {
    setShow(true);
    setSearchInput("");
    handleReset()
  };
  //Handles Submit
  const handleOnSubmit = () => {
    console.log("submit data ", submitData);
    // toast.success(GetLabelByName("HCM-HAGGXNJQW2B_HRPR", lan));
    if (!submitData?.leaveType || submitData?.leaveType === -1) {
      toast.error("Please Select Leave Type", toastWarning);
      return;
    }
    if (!submitData?.leaveStartDate || submitData?.leaveStartDate === "") {
      toast.error("Please Select Start Date", toastWarning);
      return;
    }
    if (!submitData?.leaveEndDate || submitData?.leaveEndDate === "") {
      toast.error("Please Select End Date", toastWarning);
      return;
    }

    toast.success(GetLabelByName("HCM-HAGGXNJQW2B_HRPR", lan));
    handleReset()
    setPostUrl(PostLeaveTransaction())

  };

  const handleReset = () => {
    setSubmitData({})
  }

  const handleOnChange = (evnt) => {
    setSubmitData((data) => {
      return { ...data, [evnt?.target?.name]: evnt?.target?.value };
    });
    dispatch({
      type: "set",
      data: { ...data, [evnt?.target?.name]: evnt?.target?.value },
    });
  };

  useEffect(() => {
    if (submitData?.leaveEndDate) {
      const startDate = new Date(submitData?.leaveStartDate).getTime();
      const endDate = new Date(submitData?.leaveEndDate).getTime();
      const differenceMillis = Math.abs(startDate - endDate);
      const differenceDays = differenceMillis / (1000 * 60 * 60 * 24);
      console.log({ differenceDays })
      setSubmitData((prev) => ({
        ...prev,
        ...{
          daysNumber: differenceDays,
        },
      }));
    }

  }, [submitData?.leaveStartDate, submitData?.leaveEndDate])

  useEffect(() => {
    console.log(submitData?.leaveType)
    if (submitData?.leaveType === "1") {
      setSubmitData((prev) => ({
        ...prev,
        ...{
          leaveScheduled: 0,
          allowedDays: 10,
          leaveRemaining: 10,
          leaveTaken: 0
        },
      }));
    } else if (submitData?.leaveType === "2") {
      setSubmitData((prev) => ({
        ...prev,
        ...{
          leaveScheduled: 2,
          allowedDays: 25,
          leaveRemaining: 15,
          leaveTaken: 10
        },
      }));
    } else if (submitData?.leaveType === "3") {
      setSubmitData((prev) => ({
        ...prev,
        ...{
          leaveScheduled: 0,
          allowedDays: 15,
          leaveRemaining: 15,
          leaveTaken: 0,
        },
      }));
    } else {
      setSubmitData((prev) => ({
        ...prev,
        ...{
          leaveScheduled: 0,
          allowedDays: 0,
          leaveRemaining: 0,
          leaveTaken: 0
        },
      }));
    }
  }, [submitData?.leaveType])

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
      </CRow>
      <CRow>
        <CCol md="4" className="text-right"></CCol>
        <CCol xs="12" hidden={show}>
          <CCard>
            <CCardHeader>
              <CFormGroup row>
                <CCol md="4">
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
                {/* <CCol md="2">
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
                </CCol> */}
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
              <CRow>
                <CCol md="3">

                </CCol>
                <CCol md="6" className={"bg-silver-lighter well"}>
                  <CRow >
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
                  </CRow>
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
                        <CSLab code="HCM-Z0FV0XJJ06" />{" "}
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
                <CCol md='3'></CCol>
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
                onClick={handleOnSubmit}
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

export default LeaveTransaction;
