import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//import { toast } from "react-toastify";
import { toastWarning } from "src/toasters/Toaster";
import moment from "moment";

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
  CSLineLabel,
} from "../../../reusable/components";
import {
  CardBodyHeight,
  GetRequest,
  HttpAPIRequest,
  PostRequest,
} from "src/reusable/utils/helper";
import { SearchEmployees } from "src/reusable/API/EmployeeEndpoints";

import { CustomAxios } from "src/reusable/API/CustomAxios";
import { BaseURL } from "src/reusable/API/base";
import { toast } from "react-toastify";
import {
  PostEmployeeLanguage,
  GetEmployeeLanguagesType,
} from "src/reusable/API/EmployeeLanguage";

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

const EmployeeLanguage = () => {
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
  const [viewinfo, setViewInfo] = useState([]);
  const [handleId, setHandleId] = useState("");
  const [titles, setProfessionalTitle] = useState([]);
  const [accidentTypes, setAccidentTypes] = useState([]);

  const [employeeLanguage, setEmployeelanguage] = useState([]);
  const [employeeLanguageType, setEmployeelanguageType] = useState([]);
  const [employeeName, setEmpDisplayName] = useState("");
  const [readState, setReadState] = useState([]);

  const reading = [
    {
      id: 1,
      name: "Beginner",
    },
    {
      id: 2,
      name: "Intermediate",
    },
    {
      id: 3,
      name: "Advanced",
    },
    {
      id: 4,
      name: "Fluent",
    },
    {
      id: 5,
      name: "Native",
    },
  ];
  const Writing = [
    {
      id: 1,
      name: "Beginner",
    },
    {
      id: 2,
      name: "Intermediate",
    },
    {
      id: 3,
      name: "Advanced",
    },
    {
      id: 4,
      name: "Fluent",
    },
    {
      id: 5,
      name: "Native",
    },
  ];
  const Speaking = [
    {
      id: 1,
      name: "Beginner",
    },
    {
      id: 2,
      name: "Intermediate",
    },
    {
      id: 3,
      name: "Advanced",
    },
    {
      id: 4,
      name: "Fluent",
    },
    {
      id: 5,
      name: "Native",
    },
  ];

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
  const renderViewInfor = (data) => {
    return data.map((x) => ({
      ...x,
      write: reading.find((y) => y.id === x.write)?.name ||"Not set",
      read: reading.find((y) => y.id === x.read)?.name  ||"Not set",
      speak: reading.find((y) => y.id === x.speak)?.name  ||"Not set",
    }));
  };

  //Get employee skill details
  const getEmployeelanguage = async () => {
    try {
      const request = await CustomAxios.get(`EmployeeLanguage/${handleId}`);

      const response = request.data;

      console.log("renderViewInfor",);
      setViewInfo(renderViewInfor(response));
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    if (handleId !== "") {
      getEmployeelanguage();
    }
  }, [handleId]);

  useEffect(() => {
    console.log("check view info ", viewinfo);
  });

  //Drop down list for hobby types
  const MultipleGetRequests = async () => {
    try {
      let request = [HttpAPIRequest("GET", GetEmployeeLanguagesType())];
      const multipleCall = await Promise.allSettled(request);
      console.log(multipleCall[0].value);

      setEmployeelanguageType([
        { id: "-1", name: `Select Language` },
        ...multipleCall[0].value,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    MultipleGetRequests();
    change();
  }, []);

  //Handles Submit
  const handleOnSubmit = () => {
    console.log("submit data ", submitData);

    if (!submitData?.languageId || submitData?.languageId === -1) {
      toast.error("Please Select a Language!", toastWarning);
      return;
    }
    if (!submitData?.read || submitData?.read === -1) {
      toast.error("Please Select Ability(Reading)!", toastWarning);
      return;
    }
    if (!submitData?.write || submitData?.write === -1) {
      toast.error("Please Select Ability(Writing)!", toastWarning);
      return;
    }
    if (!submitData?.speak || submitData?.speak === -1) {
      toast.error("Please Select Ability(Speaking)!", toastWarning);
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
    postEmployeeLanguage(newData);
  };

  //Post Employee Skill
  function postEmployeeLanguage(data) {
    console.log("post data", data);
    PostRequest(PostEmployeeLanguage(), { data: data })
      .then((response) => {
        response.text().then((data) => {
          if ("" == data) {
            toast.success("Employee Language Added Successfully!");
            console.log("success");
            getEmployeelanguage();
            setVisible(false);
          } else {
            try {
              data = JSON.parse(data);
              toast.error(
                data?.reason ? data?.reason : "Failed to Add Employee Language",
                "error",
                400
              );
              setVisible(true);
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

  // const canSave = [skill].every(Boolean);
  const change = () => {
    console.log("working");
    viewinfo.map((x) => setReadState(x.read));
  };
  if (readState < 2) {
    console.log({ readState });
  }
  const TransLabelByCode = (name) => GetLabelByName(name, lan);
  console.log({ viewinfo });
  // const check=()=>{
  //   for (let i = 0; i < viewinfo.length; i++) {
  //     if (viewinfo[i]) {
  //       console.log({ i });
  //     }
  //   }
  // }
  useEffect(() => {
    for (let i = 0; i < viewinfo.length; i++) {
      if (viewinfo) {
        let tryy = viewinfo[i].read;
        // if(tryy === reading.id)
      }
    }
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-2YN2O0KO4YX-LASN" />
          </h5>
        </CCol>
      </CRow>
      <CRow>
        <CCol md="4">
          <CSAutoComplete
            filterUrl={SearchEmployees(searchInput)}
            placeholder={GetLabelByName("HCM-6FKJ6FEGW7A-HRPR", lan)}
            handleSelect={handleSearchResultSelect}
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
          />
        </CCol>
        <CCol md="8" className="text-right"></CCol>
        <CCol xs="12" hidden={show}>
          <CCard>
            <CCardHeader hidden={show} className={""}>
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
                    {employeeName}
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
                    <CSLab code="HCM-I5D6MXXMDOO_LANG" />{" "}
                  </CButton>
                </CCol>
              </CFormGroup>
            </CCardHeader>
            {/* style={{ height: CardBodyHeight, overflowY: "auto" }} */}

            <GridComponent
              height={"500"}
              dataSource={viewinfo}
              allowPaging={true}
              pageSettings={{ pageSize: 10 }}
              editSettings={editOptions}
            >
              <ColumnsDirective>
                <ColumnDirective
                  field={""}
                  headerText="ID"
                  width="100"
                  visible={false}
                />
                <ColumnDirective
                  field="language.name"
                  headerText={GetLabelByName("HCM-CPUHVEW404-LOLN", lan)}
                  width="100"
                />
                <ColumnDirective
                  field="read"
                  headerText={GetLabelByName("HCM-1TTFQIMXC5L_LASN", lan)}
                  width="100"
                />
                <ColumnDirective
                  field="write"
                  headerText={GetLabelByName("HCM-D7I7MVGUUNL_KCMI", lan)}
                  width="100"
                />
                <ColumnDirective
                  field="speak"
                  headerText={GetLabelByName("HCM-RN4OAN30KMI-KCMI", lan)}
                  width="100"
                />

                {/* <ColumnDirective
                  commands={commandOptions}
                  headerText={GetLabelByName("HCM-F4IUJ9QVOM6", lan)}
                  width="100"
                  textAlign="Center"
                /> */}
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
            <CSLab code="HCM-I5D6MXXMDOO_LANG" />{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className={"bottom-spacing"}>
            <>
              <CCol md="6">
                <CLabel htmlFor="languageType">
                  <CSLab code="HCM-3WG87DYRWCR-LOLN" /> <CSRequiredIndicator />
                </CLabel>
                <CSelect
                  name="languageId"
                  value={data?.languageId || ""}
                  onChange={handleOnChange}
                >
                  {employeeLanguageType.map((x, i) => (
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
              <CCol md="12" style={{ marginTop: "5px" }}>
                <CSLineLabel name={"Proficiency"} />
              </CCol>
              <CCol md="4">
                <CLabel>
                  <CSLab code="HCM-NZQAVOJB6PG_LANG" /> <CSRequiredIndicator />
                </CLabel>
                <CSelect
                  name="read"
                  value={data?.read || -1}
                  onChange={handleOnChange}
                >
                  <option value={-1} selected>
                    Select Option
                  </option>
                  {reading.map((x, i) => (
                    <option key={i} value={x.id}>
                      {x.name}
                    </option>
                  ))}
                  {/* <option value={-1}>Select Ability</option>
                  <option value={1}>Beginner</option>
                  <option value={2}>Intermediate</option>
                  <option value={3}>Advanced</option>
                  <option value={4}>Fluent</option>
                  <option value={5}>Native</option> */}
                </CSelect>
              </CCol>
              <CCol md="4">
                <CLabel>
                  <CSLab code="HCM-D7I7MVGUUNL_KCMI" /> <CSRequiredIndicator />
                </CLabel>
                <CSelect
                  name="write"
                  value={data?.write || -1}
                  onChange={handleOnChange}
                >
                  <option value={-1} selected>
                    Select Option
                  </option>
                  {Writing.map((x, i) => (
                    <option key={i} value={x.id}>
                      {x.name}
                    </option>
                  ))}
                  {/* <option value={-1}>Select Ability</option>
                  <option value={1}>Beginner</option>
                  <option value={2}>Intermediate</option>
                  <option value={3}>Advanced</option>
                  <option value={4}>Fluent</option>
                  <option value={5}>Native</option> */}
                </CSelect>
              </CCol>
              <CCol md="4">
                <CLabel>
                  <CSLab code="HCM-3OMR0504EHX-HRPR" /> <CSRequiredIndicator />
                </CLabel>
                <CSelect
                  name="speak"
                  value={data?.speak || -1}
                  onChange={handleOnChange}
                >
                  <option value={-1} selected>
                    Select Option
                  </option>
                  {Speaking.map((x, i) => (
                    <option key={i} value={x.id}>
                      {x.name}
                    </option>
                  ))}
                  {/* <option value={-1}>Select Ability</option>
                  <option value={1}>Beginner</option>
                  <option value={2}>Intermediate</option>
                  <option value={3}>Advanced</option>
                  <option value={4}>Fluent</option>
                  <option value={5}>Native</option> */}
                </CSelect>
              </CCol>
            </>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <div style={{ fontSize: "10px", marginRight: "420px" }}>
            <p>
              <em>
                All fields marked with asterisk (<CSRequiredIndicator />) are
                required
              </em>
            </p>
          </div>

          <CButton color="secondary" onClick={() => setVisible(false)}>
            <CSLab code="HCM-V3SL5X7PJ9C-LANG" />
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              // setVisible(false);
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

export default EmployeeLanguage;
