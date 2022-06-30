import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toastWarning } from "src/toasters/Toaster";
import { CustomAxios } from "src/reusable/API/CustomAxios";

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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CLabel,
  CTextarea,
  CSelect,
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
  CommandColumn,

  //CommandColumn
} from "@syncfusion/ej2-react-grids";
import { CardBodyHeight } from "src/reusable/utils/helper";
import { GetLabelByName } from "src/reusable/configs/config";
import {
  CSLab,
  CSAutoComplete,
  CSRequiredIndicator,
} from "../../../reusable/components";
import { AiOutlinePlus } from "react-icons/ai";
import { SearchEmployees } from "src/reusable/API/EmployeeEndpoints";

import { LessThanIcon } from "evergreen-ui";
import { BaseURL } from "src/reusable/API/base";
import {
  GetOffenceCategory,
  GetOffenceCategoryRule,
  PostEmployeeDisciplinaryInfo,
} from "src/reusable/API/EmployeeDisciplinaryEndpoints";

const commandOptions = [
  {
    type: "Edit",
    buttonOption: { iconCss: " e-icons e-edit", cssClass: "e-flat" },
  },
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

const editOptions = {
  allowEditing: true,
  allowAdding: true,
  allowDeleting: false,
  allowEditOnDblClick: true,
};

const EmployeeDisciplinaryInformation = (props) => {
  const lan = useSelector((state) => state.language);
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(false);
  const TransLabelByCode = (name) => GetLabelByName(name, lan);

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
  const [offenceCategoryType, setOffenceCategoryType] = useState([]);
  const [offenceCategoryRuleType, setOffenceCategoryRuleType] = useState([]);
  const [handleCategoryTypeID, setHandleCategoryTypeID] = useState("");

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
                dispatch({ type: "set", data: { ...response } });
                setSubmitData({ ...response });
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
  let uniqueIdKey = uniqueIdKey || "id";

  const MultipleGetRequests = async () => {
    try {
      // if (handleCategoryTypeID == "") {
      //   setHandleCategoryTypeID(null);
      // }
      let request = [
        HttpAPIRequest("GET", GetOffenceCategory()),
        // HttpAPIRequest("GET", GetOffenceCategoryRule(handleCategoryTypeID)),
      ];
      const multipleCall = await Promise.allSettled(request);

      setOffenceCategoryType([
        { id: "-1", name: `Select Offence Category` },
        ...multipleCall[0].value,
      ]);
      // setOffenceCategoryRuleType([
      //   { id: "-1", name: `Select Offence Type` },
      //   ...multipleCall[1].value,
      // ]);

      console.log("offence category ", offenceCategoryType);
    } catch (error) {
      console.log(error);
    }
  };

  //Handles category Type Rule

  const handleNewId = async (value) => {
    console.log({ value });
    try {
      let request = [HttpAPIRequest("GET", GetOffenceCategoryRule(value))];

      const multipleCall = await Promise.allSettled(request);
      console.log(multipleCall);
      setOffenceCategoryRuleType([
        { id: "-1", name: `Select Offence Type` },
        multipleCall[0].value,
      ]);
      console.log("offence category ", offenceCategoryType);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("ID", handleCategoryTypeID);

  useEffect(() => {
    MultipleGetRequests();
  }, []);

  //Get employee skill details
  const getEmployeeOffence = async () => {
    try {
      const request = await CustomAxios.get(`EmployeeOffence/${handleId}`);

      const response = request.data;
      console.log("emp response:", response);
      setViewInfo((prevState) => response);
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    if (handleId !== "") {
      getEmployeeOffence();
    }
  }, [handleId]);

  //.console.log(offenceType);

  //Handles Submit
  const handleOnSubmit = () => {
    console.log("submit data ", submitData);

    if (!submitData?.actionBy || submitData?.actionBy === "") {
      toast.error("Please Enter Action Takers Name!", toastWarning);
      return;
    }
    if (!submitData?.actionDate || submitData?.actionDate === "") {
      toast.error("Please Select Action Date!", toastWarning);
      return;
    }
    if (!submitData?.incidentDate || submitData?.incidentDate === "") {
      toast.error("Please Select Incident Date!", toastWarning);
      return;
    }
    if (
      !submitData?.offenceCategoryId ||
      submitData?.offenceCategoryId === ""
    ) {
      toast.error("Please Select Offence Category!", toastWarning);
      return;
    }
    if (
      !submitData?.offenceCategoryRuleId ||
      submitData?.offenceCategoryRuleId === ""
    ) {
      toast.error("Please Select Offence Rule!", toastWarning);
      return;
    }
    if (!submitData?.description || submitData?.description === "") {
      toast.error("Please Enter Offence Description!", toastWarning);
      return;
    }

    // console.log(submitData)
    let employeeId = submitData.id;
    //  let newData = { ...submitData, option: options, companyId: TestCompanyId };
    let newData = {
      ...submitData,
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      CompanyReference: "00001_A01",
      employeeId,
    };
    //let finalData = JSON.stringify(newData)
    // console.log(finalData)
    // 'Add' === mode ? AddGLAccount(newData) : updateGLAccount(newData);
    postEmployeeDisciplinaryInfo(newData);
  };

  //Post Employee Skill
  function postEmployeeDisciplinaryInfo(data) {
    console.log("post data", data);
    PostRequest(PostEmployeeDisciplinaryInfo(), { data: data })
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
    if (evnt?.target?.name === "offenceCategoryId") {
      handleNewId(evnt?.target?.value);
    }
    setSubmitData((data) => {
      return { ...data, [evnt?.target?.name]: evnt?.target?.value };
    });
    dispatch({
      type: "set",
      data: { ...data, [evnt?.target?.name]: evnt?.target?.value },
    });
  };

  // useEffect(() => {

  //   if (submitData?.offenceCategoryId.length > 0) {
  //     handleNewId(submitData.offenceCategoryId);
  //   }
  // }, [submitData?.offenceCategoryId]);

  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-NEPCALZXIL_PSLL" />
          </h5>
        </CCol>
      </CRow>
      <CRow>
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
        <CCol md="8" className="text-right"></CCol>
        <CCol xs="12" hidden={show}>
          <CCard>
            <CCardBody style={{ height: CardBodyHeight, overflowY: "auto" }}>
              <CFormGroup row>
                <CCol md="4">
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
                    {empDisplayName}
                  </span>
                </CCol>
                <CCol md="4">
                  {/* <CTooltip content={`Click here to view Employees`} >
                <CButton color="outline-primary"> <MdPeople /> 120 </CButton>
                </CTooltip> */}
                </CCol>
                <CCol md="4">
                  <CButton
                    color="primary"
                    style={{ float: "right" }}
                    onClick={() => {
                      setVisible(true);
                    }}
                  >
                    <AiOutlinePlus />
                    <CSLab code="HCM-RZ333PHFH5D_HRPR" />{" "}
                  </CButton>
                </CCol>
              </CFormGroup>
              <CCol md="12">
                <GridComponent
                  dataSource={viewinfo}
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
                      field={"actionBy"}
                      headerText={GetLabelByName("HCM-BLC5UYKD3GO-PSLL", lan)}
                      width="100"
                    />
                    <ColumnDirective
                      field={"incidentDate"}
                      headerText={GetLabelByName("HCM-T0013FX72OI_LASN", lan)}
                      width="100"
                    />
                    <ColumnDirective
                      field={"actionDate"}
                      headerText={GetLabelByName("HCM-S3239KDC9DF-PSLL", lan)}
                      width="100"
                    />
                    {/* <ColumnDirective
                      field={""}
                      headerText={GetLabelByName("HCM-LPKSSIUHVFE_PSLL", lan)}
                      width="100"
                    /> */}
                    {/* <ColumnDirective
                      field={""}
                      headerText={GetLabelByName("HCM-84Y7SXTY7GN-KCMI", lan)}
                      width="100"
                    /> */}
                    <ColumnDirective
                      field={"offenceCategoryRule.name"}
                      headerText={GetLabelByName("HCM-0XL423ZC1SCL_HRPR", lan)}
                      width="100"
                    />
                    {/* <ColumnDirective
                      field={""}
                      headerText={GetLabelByName("HCM-00FJ4VU93MK0D_LOLN", lan)}
                      width="100"
                    /> */}

                    <ColumnDirective
                      field={"description"}
                      headerText={GetLabelByName("HCM-9FY7YTVZ1I4", lan)}
                      width="100"
                    />
                    <ColumnDirective
                      commands={commandOptions}
                      headerText={GetLabelByName("HCM-F4IUJ9QVOM6", lan)}
                      width="100"
                      textAlign="Center"
                    />
                  </ColumnsDirective>
                  <Inject
                    services={[Page, Sort, Filter, Group, Edit, CommandColumn]}
                  />
                </GridComponent>
              </CCol>
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
            <CSLab code="HCM-N7FFV235UCR_KCMI" />{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="4">
              <CLabel htmlFor="	actionBy">
                <CSLab code="HCM-BLC5UYKD3GO-PSLL" />
                <CSRequiredIndicator />
              </CLabel>
              <CInput
                className=""
                name="actionBy"
                type="text"
                value={data?.actionBy || " "}
                onChange={handleOnChange}
              />
            </CCol>
            <CCol md="4">
              <CLabel htmlFor="actionDate">
                <CSLab code="HCM-S3239KDC9DF-PSLL" />
                <CSRequiredIndicator />
              </CLabel>
              <CInput
                className=""
                name="actionDate"
                id="actionDate"
                type="date"
                value={data?.actionDate || ""}
                onChange={handleOnChange}
              />
            </CCol>

            <CCol md="4">
              <CLabel htmlFor="incidentDate">
                <CSLab code="HCM-T0013FX72OI_LASN" />
                <CSRequiredIndicator />
              </CLabel>
              <CInput
                className=""
                name="incidentDate"
                id="incidentDate"
                type="date"
                value={data?.incidentDate || ""}
                onChange={handleOnChange}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="4">
              <CLabel htmlFor="offence">
                <CSLab code="HCM-2E10YDIBMZQ_LASN" />
                <CSRequiredIndicator />
              </CLabel>
              <CSelect
                name="offenceCategoryId"
                value={data?.offenceCategoryId || -1}
                onChange={handleOnChange}
              >
                {offenceCategoryType.map((x, i) => (
                  <option key={i} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </CSelect>
            </CCol>

            <CCol md="4">
              <CLabel htmlFor="offenceCategoryRuleId">
                <CSLab code="HCM-1PWPBZG8B09-LASN" />
                <CSRequiredIndicator />
              </CLabel>
              <CSelect
                name="offenceCategoryRuleId"
                value={data?.offenceCategoryRuleId || -1}
                onChange={handleOnChange}
              >
                {offenceCategoryRuleType.map((x, i) => (
                  <option key={i} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </CSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="12">
              <CLabel htmlFor="description">
                <CSLab code="HCM-9FY7YTVZ1I4" />
                <CSRequiredIndicator />
              </CLabel>
              <CTextarea
                id="description"
                name="description"
                style={{ height: "80px", resize: "none" }}
                value={data?.description || " "}
                onChange={handleOnChange}
              ></CTextarea>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            <CSLab code="HCM-9E3ZC2E1S0N-LASN" />
          </CButton>
          <CButton color="primary" onClick={handleOnSubmit}>
            <CSLab code="HCM-HGUHIR0OK6T" />
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EmployeeDisciplinaryInformation;
