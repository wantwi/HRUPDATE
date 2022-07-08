import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BaseURL } from "src/reusable/API/base";
import { toast } from "react-toastify";
import { toastWarning } from "src/toasters/Toaster";

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
  CCardHeader,
} from "@coreui/react";
import { AiOutlinePlus } from "react-icons/ai";
import {
  GetRequest,
  HttpAPIRequest,
  PostRequest,
} from "src/reusable/utils/helper";

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

import { SearchEmployees } from "src/reusable/API/EmployeeEndpoints";

import { GetLabelByName } from "src/reusable/configs/config";
import { CSLab, CSAutoComplete } from "../../../reusable/components";
import { CardBodyHeight } from "src/reusable/utils/helper";
import {
  CSCheckbox,
  CSLineLabel,
  CSRequiredIndicator,
} from "../../../reusable/components";
import { CustomAxios } from "src/reusable/API/CustomAxios";
import {
  PostEmployeeHobbies,
  GetEmployeeHobbyTypes,
} from "src/reusable/API/EmployeeHobbyEndPoints";
import Select from "react-select";

import { MultiValue } from "src/templates/maxvalue/maxvalue";
import { customStyles } from "src/templates/maxvalue/maxvalue";

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

const EmployeeHobby = (props) => {
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
  const [educationCore, setEducationCore] = useState([]);
  const [empDisplayName, setEmpDisplayName] = useState("");
  const [handleId, setHandleId] = useState("");
  const [viewinfo, setViewInfo] = useState([]);
  const [hobbyTypes, setHobbyTypes] = useState([]);
  const [employeeHobbyId, setEmployeeHobbybyId] = useState([]);
  const [unitId, setUnitValue] = useState([]);

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
      let request = [HttpAPIRequest("GET", GetEmployeeHobbyTypes())];
      const multipleCall = await Promise.allSettled(request);
      console.log(multipleCall[0].value);

      setHobbyTypes([
        { id: "-1", name: `Select Hobby` },
        ...multipleCall[0].value,
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

    if (!submitData?.hobbyTypeId || submitData?.hobbyTypeId === -1) {
      toast.error("Please Select Hobby Type!", toastWarning);
      return;
    }
    // if (!submitData?.unit || submitData?.unit === '') {
    //    // toast.error('Please enter a value for unit!', toastWarning);
    //     return;
    // }
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
    };
    //let finalData = JSON.stringify(newData)
    // console.log(finalData)
    // 'Add' === mode ? AddGLAccount(newData) : updateGLAccount(newData);
    postEmployeeHobby(newData);
  };

  //Post Employee Hobby
  function postEmployeeHobby(data) {
    console.log("post data", data);
    PostRequest(PostEmployeeHobbies(), { data: data })
      .then((response) => {
        response.text().then((data) => {
          if ("" === data) {
            toast.success("Employee Hobby Added Succesfully!");
            console.log("success");
            getEmployeeHobbybyId();
          } else {
            try {
              data = JSON.parse(data);
              toast.error(
                data?.reason ? data?.reason : "Failed to Add Employee Hobby",
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

  const getEmployeeHobbybyId = async () => {
    try {
      const request = await CustomAxios.get(`EmployeeHobbies/${handleId}`);

      const response = request.data;
      console.log("emp response:", response);
      setViewInfo((prevState) => response);
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    if (handleId !== "") {
      getEmployeeHobbybyId();
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

  const handleUnit = (e) => {
    setUnitValue(Array.isArray(e) ? e.map((x) => x.id) : []);
  };

  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-DXF3IK0PP9V-HRPR" />
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
                    <CSLab code="HCM-S4GK0TDPEEG_PSLL" />{" "}
                  </CButton>
                </CCol>
              </CFormGroup>
            </CCardHeader>

            <CForm action="" method="post">
              <>
                <GridComponent
                  height={500}
                  dataSource={viewinfo}
                  allowPaging={true}
                  pageSettings={{ pageSize: 10 }}
                  editSettings={editOptions}
                >
                  <ColumnsDirective>
                    <ColumnDirective
                      field={""}
                      headerText={"ID"}
                      width="100"
                      visible={false}
                    />
                    <ColumnDirective
                      field={"employee.firstName"}
                      headerText={GetLabelByName("HCM-FQYC4N0VN1W-HRPR", lan)}
                      width="100"
                    />

                    <ColumnDirective
                      field="hobbyType.name"
                      headerText={GetLabelByName("HCM-7NAYG6MHKMA-KCMI", lan)}
                      width="100"
                    />
                  </ColumnsDirective>
                  <Inject
                    services={[Page, Sort, Filter, Group, Edit, CommandColumn]}
                  />
                </GridComponent>
              </>
            </CForm>
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
            <CSLab code="HCM-S4GK0TDPEEG_PSLL" />{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className={"bottom-spacing"}>
            <>
              <CCol md="6">
                <CLabel htmlFor="Hobby">
                  <CSLab name="hobby" code="HCM-7NAYG6MHKMA-KCMI" />
                  <CSRequiredIndicator />
                </CLabel>

                <Select
                  //defaultValue={[colourOptions[2], colourOptions[3]]}

                  // onFocus={() => setIsDisabled(!isDisabled)}

                  onChange={handleUnit}
                  isMulti
                  name="unit"
                  options={hobbyTypes}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  className="general-ledger-account-select"
                  classNamePrefix="mySelect"
                  value={hobbyTypes.filter((obj) => unitId.includes(obj.id))}
                  components={{ MultiValue }}
                  styles={customStyles}
                  // placeholder={<CSLab code={"HCM-12HRKJ3VLGIH_HRPR"} />}
                />
              </CCol>
            </>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CSLab code="HCM-3KZ0O74GRZP-LOLN" style={{ marginRight: 215 }} />
          <CButton color="secondary" onClick={() => setVisible(false)}>
            <CSLab code="HCM-V3SL5X7PJ9C-LANG" />
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

export default EmployeeHobby;
