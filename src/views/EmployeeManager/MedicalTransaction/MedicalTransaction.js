import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toastWarning } from "src/toasters/Toaster";
import { CustomAxios } from "src/reusable/API/CustomAxios";
import { SearchEmployees } from "src/reusable/API/EmployeeEndpoints";
import { GetEmployeeMedical } from "src/reusable/API/MedicalTransactionsEndPoints";
import moment from "moment";
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
  CForm,
  CCol,
  CRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CLabel,
  CSelect,
  CTextarea,
} from "@coreui/react";
import { AiOutlinePlus } from "react-icons/ai";

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
} from "@syncfusion/ej2-react-grids";

import "../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-react-grids/styles/material.css";

import { GetLabelByName } from "src/reusable/configs/config";
import {
  CSLab,
  CSAutoComplete,
  CSRequiredIndicator,
} from "../../../reusable/components";
import { CardBodyHeight } from "src/reusable/utils/helper";

import {
  GetProviderTypes,
  GetAilmentType,
  PostEmployeeMedical,
} from "src/reusable/API/MedicalTransactionsEndPoints";
import { CCardHeader } from "@coreui/bootstrap-react";

const editOptions = {
  allowEditing: false,
  allowAdding: false,
  allowDeleting: false,
  allowEditOnDblClick: false,
};
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

const MedicalTransaction = () => {
  const lan = useSelector((state) => state.language);
  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(false);
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
  const [providerTypes, setProviderTypes] = useState([]);
  const [ailmentType, setAilmenentType] = useState([]);

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

  // const getEmployyeHobbyById = async () => {
  //   try {
  //     const request = await CustomAxios.get(
  //       `${BaseURL}EmployeeAccident/${handleId}`
  //     );
  //     const respond = request.data;
  //     setEmployeeHobbybyId([respond[0]]);
  //     console.log("responds", respond);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //Drop down list for hobby types
  const MultipleGetRequests = async () => {
    try {
      let request = [
        HttpAPIRequest("GET", GetProviderTypes()),
        HttpAPIRequest("GET", GetAilmentType()),
      ];
      const multipleCall = await Promise.allSettled(request);
      console.log(multipleCall[0].value);

      setProviderTypes([
        { id: "-1", name: `Select Provider` },
        ...multipleCall[0].value,
      ]);
      setAilmenentType([
        { id: "-1", name: `Select Ailment` },
        ...multipleCall[1].value,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    MultipleGetRequests();
  }, []);
  const handleOnSubmit = () => {
    console.log("submit data ", submitData);

    if (!submitData?.ailmentTypeId || submitData?.ailmentTypeId === -1) {
      toast.error("Please Select Ailment!", toastWarning);
      return;
    }
    if (!submitData?.providorTypeId || submitData?.providorTypeId === "") {
      toast.error("Please Select Provider!", toastWarning);
      return;
    }
    if (!submitData?.dateOfService || submitData?.dateOfService === "") {
      toast.error("Please Select a Date!", toastWarning);
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
    postEmployeeMedical(newData);
  };

  //Post Employee Hobby
  function postEmployeeMedical(data) {
    console.log("post data", data);
    PostRequest(PostEmployeeMedical(), { data: data })
      .then((response) => {
        response.text().then((data) => {
          if ("" === data) {
            toast.success("Medical Transaction Successful!");
            getEmployeeMedicalyById();
            console.log("success");
          } else {
            try {
              data = JSON.parse(data);
              toast.error(
                data?.reason
                  ? data?.reason
                  : "Failed to Create Medical Transaction",
                "error",
                400
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

  const getEmployeeMedicalyById = async () => {
    try {
      const request = await CustomAxios.get(`EmployeeMedical/${handleId}`);

      const response = request.data;
      console.log("emp response:", response);
      setViewInfo((prevState) => response);
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    if (handleId !== "") {
      getEmployeeMedicalyById();
    }
  }, [handleId]);

  useEffect(() => {
    console.log("check view info ", viewinfo);
  });

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
  console.log(viewinfo);

  const TransLabelByCode = (name) => GetLabelByName(name, lan);
  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="Medical Transaction" />
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
            <CCardHeader>
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
                    <CSLab code="HCM-AEPFSW9621-LANG" />{" "}
                  </CButton>
                </CCol>
              </CFormGroup>
            </CCardHeader>
            <GridComponent
              height={"500"}
              dataSource={viewinfo}
              allowPaging={true}
              pageSettings={{ pageSize: 10 }}
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
                  field={"ailmentTypesDto.name"}
                  headerText={GetLabelByName("HCM-QRFDOPK87VI_LASN", lan)}
                  width="100"
                />
                <ColumnDirective
                  field={"providorTypesDto.name"}
                  headerText={GetLabelByName("HCM-D7HKVE8UGRI_LOLN", lan)}
                  width="100"
                />
                <ColumnDirective
                  field={"dateOfService"}
                  headerText={GetLabelByName("HCM-I23QDSWPM1D_KCMI", lan)}
                  type="date"
                  format="dd/MMM/yyyy"
                  width="100"
                />
                <ColumnDirective
                  field={"cost"}
                  headerText={GetLabelByName("HCM-7I262DWOU2R-LOLN", lan)}
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
          </CCard>
        </CCol>
      </CRow>

      <CModal
        show={visible}
        size={"lg"}
        onClose={() => setVisible(false)}
        closeOnBackdrop={false}
      >
        <CModalHeader style={{ position: "right" }}>
          <CModalTitle>
            {" "}
            <CSLab code="HCM-II7ZU68FSX_LANG" />{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className={"bottom-spacing"}>
            <>
              <CCol md="4">
                <CLabel htmlFor="ailmentTypeId">
                  <CSLab code="HCM-QRFDOPK87VI_LASN" />
                  <CSRequiredIndicator />
                </CLabel>
                <CSelect
                  name="ailmentTypeId"
                  value={data.ailmentTypeId || -1}
                  onChange={handleOnChange}
                >
                  {ailmentType.map((x, i) => (
                    <option key={i} value={x.id}>
                      {x.name}
                    </option>
                  ))}
                </CSelect>
              </CCol>
              <CCol md="4">
                <CLabel htmlFor="HealthCareProvider">
                  <CSLab code="HCM-D7HKVE8UGRI_LOLN" />
                  <CSRequiredIndicator />
                </CLabel>
                <CSelect
                  name="providorTypeId"
                  value={data?.providorTypeId || -1}
                  onChange={handleOnChange}
                >
                  {providerTypes.map((x, i) => (
                    <option key={i} value={x.id}>
                      {x.name}
                    </option>
                  ))}
                </CSelect>
              </CCol>
            </>
          </CRow>
          <CRow className={"bottom-spacing"}>
            <>
              <CCol md="4">
                <CLabel htmlFor="dateOfService">
                  <CSLab code="HCM-I23QDSWPM1D_KCM" />
                  <CSRequiredIndicator />
                </CLabel>
                <CInput
                  className=""
                  id="dateOfService"
                  type="date"
                  name="dateOfService"
                  value={data?.dateOfService || -1}
                  onChange={handleOnChange}
                  max={moment().format("YYYY-MM-DD")}
                />
              </CCol>
              <CCol md="4">
                <CLabel htmlFor="Cost">
                  <CSLab code="HCM-3OZ72JARXE-KCMI" />
                  <CSRequiredIndicator />
                </CLabel>
                <CInput
                  className=""
                  id="Cost"
                  type="number"
                  name="cost"
                  value={data?.cost || ""}
                  onChange={handleOnChange}
                />
              </CCol>
            </>
          </CRow>
          <CRow className={"bottom-spacing"}>
            <CCol md="8">
              <CLabel htmlFor="Note">
                <CSLab code="HCM-Z0FV0XJJ06" />
              </CLabel>
              <CTextarea
                name="note"
                style={{ height: "60px", resize: "none" }}
                value={data?.note || ""}
                onChange={handleOnChange}
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CSLab code="HCM-3KZ0O74GRZP-LOLN" style={{ marginRight: 215 }} />
          <CButton color="secondary" onClick={() => setVisible(false)}>
            <CSLab code="HCM-MELULU9B6R_KCMI" />
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              setVisible(false);
              handleOnSubmit();
            }}
          >
            <CSLab code="HCM-HGUHIR0OK6T" />
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default MedicalTransaction;
