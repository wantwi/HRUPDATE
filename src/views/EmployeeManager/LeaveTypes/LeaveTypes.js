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
  GetAvailableDayBasis,
  GetAllowedDayBasis,
  PostEmployeeLeave,
  SearchLeaveTypes,
} from "src/reusable/API/EmployeeLeaveTypes";
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

const LeaveTypes = (props) => {
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
    // testApi();
    // return;
    setMode("Add");
    setShow(false);
    dispatch({ type: "set", data: { ...results } });
    setSubmitData({ ...results });

    if (results?.code) {
      setSearchResult(results);

      GetRequest()
        .then((response) => {
          // toast.dismiss(toastId);
          if (response.ok) {
            response.json().then((response) => {
              // console.log({response});
              if (response && Object.keys(response).length > 0) {
                dispatch({ type: "set", data: { ...renderData(response) } });
                setSubmitData(renderData(response));
                // setDuplicateData({ ...response })
                //console.log({ response });

                //let rates = response?.rates;

                // setExchangeRate(rates);
                setShow(false);
                setMode("Update");
              } else {
                setMode("Add");
                setShow(false);
                // dispatch({ type: 'set', data: { ...results, isHomeCurrency } });
                // setSubmitData({ ...results, isHomeCurrency });
              }
            });
          }
        })
        .catch((err) => {
          // console.log(err);
          // toaster(toastId, "Failed to retrieve details", 'error', 4000);
        });
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
  console.log({ submitdata: setSubmitData });
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
      submitData?.availableDayBasisId === -1
    ) {
      toast.error("Please select available day basis!", toastWarning);
      return;
    }
    if (
      !submitData?.allowedDayBasisId ||
      submitData?.allowedDayBasisId === -1
    ) {
      toast.error("Please select allowed day basis ", toastWarning);
      return;
    }
    if (!submitData?.status || submitData?.status === -1) {
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
            toast.success("Leave Type Added Successfully!!");
            console.log("success");
          } else {
            try {
              data = JSON.parse(data);
              toast.error(
                data?.reason ? data?.reason : "Failed to Add Leave Type",
                "error",
                4000
              );
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
  // {
  //   "id": "88be80f3-37c5-4739-9157-f058a60c7926",
  //   "code": "LV0001",
  //   "name": "annual",
  //   "description": "unknown",
  //   "availableDayBasis": {
  //     "id": "dac4936d-a277-4100-816b-0548b720f7c1",
  //     "code": "ADB00002",
  //     "name": "Balance"
  //   },
  //   "allowedDayBasis": {
  //     "id": "063999cc-27ce-4bef-9a93-3eae9866dab7",
  //     "code": "ALDB00001",
  //     "name": "Calender"
  //   },
  //   "status": true,
  //   "yearEndBasis": {
  //     "id": "be2223b9-dbf5-4754-a561-a348feb99898",
  //     "code": "YEB00002",
  //     "name": "Employee Anniversary"
  //   },
  //   "outstandingDayType": true,
  //   "applyMaximumOutstandingDay": true,
  //   "maximumNumberOfDays": 5
  // }

  // {
  //   "employeeId": "514ba0ac-e65e-4d20-b553-4d61c5f52e9f",
  //   "code": "LV0001",
  //   "name": "annual",
  //   "description": "unknown",
  //   "availableDayBasisId": "dac4936d-a277-4100-816b-0548b720f7c1",
  //   "allowedDayBasisId": "063999cc-27ce-4bef-9a93-3eae9866dab7",
  //   "status": true,
  //   "yearEndBasisId": "be2223b9-dbf5-4754-a561-a348feb99898",
  //   "outstandingDayType": true,
  //   "applyMaximumOutstandingDay": true,
  //   "maximumNumberOfDays": 5,
  //   "companyReference": "00001_a01",
  //   "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  // }

  const renderData = (userInfo) => {
    let newObj = {};
    newObj.employeeId = userInfo?.id || "";
    newObj.code = userInfo?.code || "";
    newObj.name = userInfo?.name || "";
    newObj.description = userInfo?.description || "";
    newObj.availableDayBasisId = userInfo?.availableDayBasis?.id || "";
    newObj.allowedDayBasisId = userInfo?.allowedDayBasis?.id || "";
    newObj.status = userInfo?.status || true;
    newObj.yearEndBasisId = userInfo?.yearEndBasis?.id || "";
    newObj.outstandingDayType = userInfo?.outstandingDayType || "";
    newObj.userId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    newObj.companyReference = "00001_a01";
    newObj.applyMaximumOutstandingDay =
      userInfo?.applyMaximumOutstandingDay || false;
    newObj.maximumNumberOfDays = userInfo?.maximumNumberOfDays || 0;

    return newObj;
  };

  const handleOnChange = (evnt) => {
    //console.log(evnt)
    setSubmitData((data) => {
      return renderData({ ...data, [evnt?.target?.name]: evnt?.target?.value });
    });
    dispatch({
      type: "set",
      data: renderData({ ...data, [evnt?.target?.name]: evnt?.target?.value }),
    });
  };
  console.log({ populate: renderData(submitData) });

  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-E3ZPL9HV68G-LOLN" />
          </h5>
        </CCol>
      </CRow>
      <CRow hidden={!show ? true : false}>
        <CCol md="4">
          <CFormGroup>
            <CSAutoComplete
              filterUrl={SearchLeaveTypes(searchInput)}
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
              {show ? <CSLab code="HCM-TAAFD4M071D-HRPR" /> : null}{" "}
            </CButton>
          </CFormGroup>
        </CCol>
      </CRow>
      <CRow>
        <CCol md="8" className="text-right"></CCol>
        <CCol xs="12" hidden={show}>
          <CCard>
            <CCardBody style={{ height: CardBodyHeight }}>
              <CRow className={"bottom-spacing"}>
                <CCol md="5">
                  <CCol md="12">
                    <CSLineLabel name="HCM-5S2JSN34J47_LANG" />{" "}
                  </CCol>
                  <>
                    <CRow>
                      <CCol md="4">
                        <CLabel>
                          {" "}
                          <CSLab code="HCM-7I262DWOU2R-LOLN" />{" "}
                          <CSRequiredIndicator />
                        </CLabel>
                        <CInput
                          name="code"
                          value={data?.code || ""}
                          onChange={handleOnChange}
                        />
                      </CCol>
                      <CCol md="8">
                        <CLabel>
                          {" "}
                          <CSLab code="HCM-VD1B12NKKJ_LANG" />{" "}
                          <CSRequiredIndicator />
                        </CLabel>
                        <CInput
                          name="name"
                          value={submitData?.name || ""}
                          onChange={handleOnChange}
                        />
                      </CCol>
                    </CRow>
                  </>
                  <>
                    <CRow style={{ marginTop: "10px" }}>
                      <CCol md="6">
                        <CLabel>
                          {" "}
                          <CSLab code="HCM-3J3RLRI3K62_LOLN" />{" "}
                          <CSRequiredIndicator />
                        </CLabel>
                        <CSelect
                          name="availableDayBasisId"
                          value={submitData?.availableDayBasisId || -1}
                          onChange={handleOnChange}
                        >
                          {availableDayBasis.map((x, i) => (
                            <option key={i} value={x.id}>
                              {x.name}
                            </option>
                          ))}
                        </CSelect>
                      </CCol>
                      <CCol md="6">
                        <CLabel>
                          {" "}
                          <CSLab code="HCM-LFITDP0PORN_KCMI" />{" "}
                          <CSRequiredIndicator />
                        </CLabel>
                        <CSelect
                          name="allowedDayBasis.name"
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
                    <CRow style={{ marginTop: "10px" }}>
                      <CCol md="4">
                        <CLabel>
                          {" "}
                          <CSLab code="HCM-RQB38Y1ZFPO-LANG" />{" "}
                          <CSRequiredIndicator />
                        </CLabel>
                        <CSelect
                          name="status"
                          value={data?.status || -1}
                          onChange={handleOnChange}
                        >
                          <option value={-1}>Select Status </option>
                          <option value={true}>Active</option>
                          <option value={false}>Inactive</option>
                        </CSelect>
                      </CCol>
                    </CRow>
                  </>
                  <></>
                </CCol>

                <CSDivider style={{ height: "100%" }} md="1" />

                <CCol md="6">
                  <CCol md="12">
                    <CSLineLabel name="HCM-QPXNX5OVYX_LASN" />{" "}
                    <CRow>
                      <CCol md="6">
                        <CLabel>
                          {" "}
                          <CSLab code="HCM-YRHOMTPDQFB-KCMI" />{" "}
                          <CSRequiredIndicator />
                        </CLabel>
                        <CSelect
                          name="yearEndBasisId"
                          value={data?.yearEndBasisId || -1}
                        >
                          {yearBasis.map((x, i) => (
                            <option key={i} value={x.id}>
                              {x.name}
                            </option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CRow>
                    <CRow
                      style={{
                        border: "1px solid #e1e2e3",
                        // height: 85,
                        background: "#ebedef",
                        marginTop: "10px",
                        borderRadius: "8px",

                        // padding: "13px",
                        width: "100%",
                      }}
                    >
                      {/* <CCol
                        sm={2}
                        md="6"
                        style={{ marginTop: "10px" }}
                        class=" form-check-inline"
                      >
                        <CFormCheck
                          type="radio"
                          name="gridRadios"
                          id="gridRadios1"
                          value="option1"
                          label="Forfeit-Outstanding Days"
                          defaultChecked
                        />
                        <CFormCheck
                          type="radio"
                          name="gridRadios"
                          id="gridRadios2"
                          value="option2"
                          label="Carry-Forward Outstanding Days"
                        />
                      </CCol> */}
                      <CCol md="6" style={{ marginTop: "10px" }}>
                        <div class="form-check form-check-inline">
                          <CInput
                            class="form-check-input"
                            id="inlineRadio1"
                            type="radio"
                            name="inlineRadio"
                            value="option1"
                            style={{ width: "15px" }}
                          />
                          <label class="form-check-label" for="inlineRadio1">
                            <CSLab code="HCM-V97JP40B8M_LANG" />
                            <CSRequiredIndicator />
                          </label>
                        </div>
                      </CCol>
                      <CCol md="6" style={{ marginTop: "10px" }}>
                        <div class="form-check form-check-inline">
                          <CInput
                            class="form-check-input"
                            id="inlineRadio2"
                            type="radio"
                            name="inlineRadio"
                            value="option2"
                            style={{ width: "18px" }}
                            checked
                          />
                          <label class="form-check-label" for="inlineRadio2">
                            <CSLab code="HCM-3BTDN1V82EI-HRPR" />
                            <CSRequiredIndicator />
                          </label>
                        </div>
                      </CCol>
                    </CRow>
                    {/* style={{ background: "red", width: "100%" }} */}
                    <CRow>
                      <CCol md="6" style={{ marginTop: "15px" }}>
                        <CSCheckbox
                          label="HCM-TVARQV319C_PSLL"
                          name="applyMaximumOutstandingDay"
                          onClick={() => setIsChecked(!isChecked)}
                          value={data?.applyMaximumOutstandingDay || ""}
                          onChange={handleOnChange}
                        />
                      </CCol>

                      {isChecked && (
                        <CCol md="6">
                          <CLabel>
                            {" "}
                            <CSLab code="HCM-B5HI1B86NGK_HRPR" />{" "}
                          </CLabel>
                          <CInput
                            style={{ width: "152px" }}
                            name="maximumNumberOfDays"
                            value={data?.maximumNumberOfDays || ""}
                          />
                        </CCol>
                      )}
                    </CRow>
                  </CCol>
                  <CRow></CRow>
                  <CRow></CRow>
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter>
              <CSLab code="HCM-3KZ0O74GRZP-LOLN" style={{ marginRight: 215 }} />
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
