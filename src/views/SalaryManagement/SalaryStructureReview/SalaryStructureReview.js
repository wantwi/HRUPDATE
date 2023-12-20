import React, { useState } from "react";
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
  CSAutoComplete,
  CSRequiredIndicator,
} from "../../../reusable/components";
import useMultiFetch from "src/hooks/useMultiFetch";
import { AllowedDayBasis, AvailableDayBasis, GetLeaveTransactionById, LeaveTypesDrop, YearEndBasis } from "src/reusable/API/LeaveTransaction";
import useFetch from "src/hooks/useFetch";
import { MultiSelectComponent, CheckBoxSelection, Inject } from '@syncfusion/ej2-react-dropdowns';
import "./style.css"



const LeaveTypes = () => {
  const lan = useSelector((state) => state.language);
  const [show, setShow] = useState(false);
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
  const [leaveType, setLeaveType] = useState([])
  const [allowFilter, setAllowFilter] = useState(false)
  const [genericData, setGenericData] = useState(null)
  const [basis, setBasis] = useState("1")

  const handleAddNewRecord = () => {
    setMode("Add");
    setShow(false);
  };

  const handleSearchResultSelect = (results) => {
    console.log("show results", results);

    //setting employee display name on select of suggested item
    setEmpDisplayName(
      (prevState) => `${results.firstName} ${results.lastName}`
    );
    setMode("Add");
    setShow(false);
    dispatch({ type: "set", data: { ...results } });
    setSubmitData({ ...results });

    if (results?.id) {
      setSearchResult(results);
      setUrl(GetLeaveTransactionById(results?.id))

    }
  };
  const COMPREF = JSON.parse(
    sessionStorage.getItem("companyReference")
  )?.reference;

  const TransLabelByCode = (name) => GetLabelByName(name, lan);
  const searchReset = () => {
    setShow(true);
    setSearchInput("");


  };

  const countries = [
    { Name: 'Australia', Code: 'AU' },
    { Name: 'Bermuda', Code: 'BM' },
    { Name: 'Canada', Code: 'CA' },
    { Name: 'Cameroon', Code: 'CM' },
    { Name: 'Denmark', Code: 'DK' },
    { Name: 'France', Code: 'FR' },
    { Name: 'Finland', Code: 'FI' },
    { Name: 'Germany', Code: 'DE' },
    { Name: 'Greenland', Code: 'GL' },
    { Name: 'Hong Kong', Code: 'HK' },
    { Name: 'India', Code: 'IN' },
    { Name: 'Italy', Code: 'IT' },
    { Name: 'Japan', Code: 'JP' },
    { Name: 'Mexico', Code: 'MX' },
    { Name: 'Norway', Code: 'NO' },
    { Name: 'Poland', Code: 'PL' },
    { Name: 'Switzerland', Code: 'CH' },
    { Name: 'United Kingdom', Code: 'GB' },
    { Name: 'United States', Code: 'US' }
  ];
  // maps the appropriate column to fields property
  const checkFields = { text: 'Name', value: 'Code' };




  // const { data: multicallData } = useMultiFetch([AvailableDayBasis(COMPREF),
  // AllowedDayBasis(COMPREF),
  // YearEndBasis(COMPREF),
  // LeaveTypesDrop(COMPREF)
  // ], (results) => {
  //   // console.log({ results });
  //   setAvailableDayBasis([
  //     { id: "-1", name: `Select Available Day Basis` },
  //     ...results[0].data,
  //   ]);
  //   setAllowedDayBasis([
  //     { id: "-1", name: `Select Allowed Day Basis ` },
  //     ...results[1].data,
  //   ]);
  //   setYearBasis([
  //     { id: "-1", name: `Select Year Basis` },
  //     ...results[2].data,
  //   ]);
  //   setLeaveType([
  //     { id: "-1", name: `Select Leave Types` },
  //     ...results[3].data,
  //   ]);
  // })

  const { setOptData, setUrl } = useFetch("", (response, results) => {
    if (response) {
      if (response && Object.keys(response).length > 0) {
        setSearchResult(results);
        dispatch({ type: 'set', data: { ...response } });
        setSubmitData({ ...response });
        //  setDupData({...response})
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
  //Handles Submit
  const handleOnSubmit = () => {
    console.log("submit data ", submitData);

    if (!submitData?.code || submitData?.code === "") {
      toast.error("Please enter code!", toastWarning);
      return;
    }
    if (!submitData?.name || submitData?.name === "") {
      toast.error("Please enter name!", toastWarning);
      return;
    }
    if (
      !submitData?.availableDayBasisId ||
      submitData?.availableDayBasisId === "-1"
    ) {
      toast.error("Please select available day basis!", toastWarning);
      return;
    }
    if (
      !submitData?.allowedDayBasisId ||
      submitData?.allowedDayBasisId === "-1"
    ) {
      toast.error("Please select allowed day basis ", toastWarning);
      return;
    }
    if (!submitData?.status || submitData?.status === "-1") {
      toast.error("Please select status", toastWarning);
      return;
    }
    if (!submitData?.yearEndBasisId || submitData?.yearEndBasisId === -1) {
      toast.error("Please select year end basis", toastWarning);
      return;
    }

    console.log(submitData);
    let employeeId = submitData.id;
    //  let newData = { ...submitData, option: options, companyId: TestCompanyId };
    let newData = {
      ...submitData,
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      CompanyReference: COMPREF,
      employeeId,
      status: true,
    };
    //let finalData = JSON.stringify(newData)
    // console.log(finalData)
    // 'Add' === mode ? AddGLAccount(newData) : updateGLAccount(newData);
    // postEmployeeLeave(newData);
  };


  const handleOnChange = (evnt) => {
    console.log(evnt)
    setSubmitData((data) => {
      return { ...data, [evnt?.target?.name]: evnt?.target?.value };
    });
    dispatch({
      type: "set",
      data: { ...data, [evnt?.target?.name]: evnt?.target?.value },
    });
  };


  const multiFetchResponse = (response) => {
    let resObj = {};
    resObj.salaryGaradeList = response[0].data;
    // resObj.paySettings = response[1].data;
    // resObj.allPositions = response[2].data;
    setGenericData(resObj);
  };

  useMultiFetch(
    [
      `/Employees/${COMPREF}/SalaryGrades`

    ],
    multiFetchResponse
  );


  return (
    <>
      <CRow >
        <CCol xs="12">
          <h5 hidden>
            <CSLab code="HCM-E3ZPL9HV68G-LOLN" />
          </h5>
        </CCol>
      </CRow>
      <CRow hidden={!show ? true : false}>
        <CCol md="4">
          <CFormGroup>
            <CSAutoComplete
              filterUrl={SearchEmployees(searchInput)}
              //filterUrl=''            //filterUrl={SearchInternalCurrencies(searchInput)}
              placeholder={"Search for leave by leave type "}
              handleSelect={handleSearchResultSelect}
              //onChange={()=>handleSearchResultSelect}
              displayTextKey={"name"}
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

        <CCol md="8" xs="5" className="text-right">
          <CFormGroup>
            <CButton
              type="button"
              onClick={handleAddNewRecord}
              size="sm"
              color="primary"
            >
              {" "}
              <AiOutlinePlus />{" "}
              {show ? <CSLab code="HCM-U5IWNYFKLM_LOLN" /> : null}{" "}
            </CButton>
          </CFormGroup>
        </CCol>

      </CRow>

      <CRow>
        <CCol md="8" className="text-right"></CCol>
        <CCol xs="12" hidden={show}>
          <CCard>
            <CCardHeader style={{ height: 45 }}>
              <CFormGroup row>
                <CCol md="4">
                  <b>Salary Structure Review</b>{" "}
                  {/* <span
                    style={{
                      textDecoration: "underline dotted",
                      cursor: "pointer",
                    }}
                    type="button"
                    onClick={() => setLarge(!large)}
                    size="md"
                    color="primary"
                  >
                    {empDisplayName}
                  </span> */}
                </CCol>

              </CFormGroup>
            </CCardHeader>
            <CCardBody style={{ height: CardBodyHeight }}>
              <CRow className={"bottom-spacing"}>
                <CCol md="3"></CCol>
                <CCol md="6" style={{}}>

                  <CRow>
                    <CCol md={4}>
                      <CLabel>
                        {" "}
                        {/* <CSLab code="HCM-YRHOMTPDQFB-KCMI" />{" "} */}
                        Format
                      </CLabel>
                      <CSelect name="yearEndBasisId">
                        <option>Increase</option>
                        <option>Decrease</option>
                      </CSelect>

                    </CCol>
                    <CCol md={5}>
                      <CLabel>
                        {" "}
                        {/* <CSLab code="HCM-YRHOMTPDQFB-KCMI" />{" "} */}
                        Basis
                      </CLabel>
                      <CSelect value={basis} name="basis" onChange={(e) => setBasis(e.target.value)}>
                        <option value={'1'}>% of Basic</option>
                        <option value={'2'}>Flat Amount</option>
                      </CSelect>
                    </CCol>
                    <CCol md={3}>
                      <CLabel>
                        {" "}
                        {/* <CSLab code="HCM-YRHOMTPDQFB-KCMI" />{" "} */}
                        Value {basis === '2' ? '' : '(%)'}
                      </CLabel>
                      <CInput
                        style={{ textAlign: "right" }}
                        name="basisValue"

                      />

                    </CCol>
                  </CRow>

                  <CCol md="12" className="mt-4">

                    <CSLineLabel name="Filters" />{" "}
                  </CCol>

                  <CRow>
                    <CCol md={12}>

                      <CSCheckbox
                        label={!allowFilter ? 'All' : 'Filter'}
                        checked={!allowFilter}
                        name="inlineRadio"
                        defaultChecked
                        onChange={() => setAllowFilter(!allowFilter)}
                      />


                    </CCol>
                    <CCol md={12} >
                      <CLabel>
                        {" "}
                        {/* <CSLab code="HCM-YRHOMTPDQFB-KCMI" />{" "} */}
                        Salary Grade
                      </CLabel>
                      <div style={{ display: "flex", gap: 10 }}>
                        <CSelect name="sgFrom" disabled={!allowFilter}>
                          {
                            genericData?.salaryGaradeList?.map(x => <option key={x?.id}>{x?.name}</option>)
                          }



                        </CSelect>

                        <label>To</label>
                        <CSelect name="sgTo" disabled={!allowFilter}>
                          {
                            genericData?.salaryGaradeList?.map(x => <option key={x?.id}>{x?.name}</option>)
                          }
                        </CSelect>
                      </div>


                    </CCol>

                  </CRow>
                  <CRow>
                    <CCol>
                      <CLabel className="mt-2">
                        {" "}
                        {/* <CSLab code="HCM-YRHOMTPDQFB-KCMI" />{" "} */}
                        Employee Type
                      </CLabel>
                      {

                        allowFilter ? <MultiSelectComponent id="checkboxx" dataSource={countries} fields={checkFields} placeholder="Select countries" value={null} mode="CheckBox" showSelectAll={true} showDropDownIcon={true} enableSelectionOrder={true} filterBarPlaceholder="Search countries" popupHeight="350px">
                          <Inject services={[CheckBoxSelection]} />
                        </MultiSelectComponent> :
                          <select disabled className="form-control"></select>

                      }

                    </CCol>
                    <CCol md={12}>
                      <CLabel className="mt-2">
                        {" "}
                        {/* <CSLab code="HCM-YRHOMTPDQFB-KCMI" />{" "} */}
                        Reason
                      </CLabel>
                      <textarea disabled={!allowFilter} className="form-control" rows={3} style={{ resize: "none" }}></textarea>
                    </CCol>
                    <CCol>
                      <div className="mt-2">
                        <CSCheckbox
                          label="Auto update position"
                          // checked={formData?.probationEligible}
                          name="probationEligible"
                        // onChange={handleCheckEvent}
                        />
                      </div>


                    </CCol>
                  </CRow>

                </CCol>



                {/* <CSDivider style={{ height: "100%" }} md="1" /> */}


              </CRow>
            </CCardBody>
            <CCardFooter>
              <div
                style={{
                  fontSize: "12px",
                  marginRight: "439px",
                  marginBottom: "-34px",
                }}
              >
                <p>
                  <em>
                    <CSLab code="HCM-WKZ2Y0KPTT9-PSLL" /> (
                    <CSRequiredIndicator />)
                  </em>
                </p>
              </div>
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
    </>
  );
};

export default LeaveTypes;
