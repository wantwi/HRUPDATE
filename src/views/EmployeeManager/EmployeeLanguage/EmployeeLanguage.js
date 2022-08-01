import React, { useState, useEffect, useRef } from "react";
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
  CCardFooter,
} from "@coreui/react";
import { AiOutlinePlus, AiFillSave, AiOutlineClose } from "react-icons/ai";

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
import { IdNumberIcon } from "evergreen-ui";
import { Dropdown } from "@coreui/coreui";
// import { values } from "core-js/es7/array";

const editOptions = {
  allowEditing: false,
  allowAdding: true,
  allowDeleting: true,
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
  const [checkedTypes, setCheckedTypes] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [postEmployee, setPostEmployee] = useState([]);
  const [newGridDta, setNewGridData] = useState([]);
  const firstGrid = useRef();

  const toolbarOptions = [
    "Add",
    "Cancel",
    // {
    //   text: "Save",
    //   tooltipText: "Save",
    //   prefixIcon: "e-save",
    //   id: "saveItems",
    //   align: "Right",
    // },
  ];

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
  const searchReset = () => {
    setShow(true);
    setSearchInput("");

    // const [grid,] = useState(null);

    // const OnSaveContinueClick = () => {
    //     console.log(grid);
    // }
  };

  const renderViewInfor = (data) => {
    return data.map((x) => ({
      ...x,
      write: reading.find((y) => y.id == x.write)?.name || "Not set",
      read: reading.find((y) => y.id == x.read)?.name || "Not set",
      speak: reading.find((y) => y.id == x.speak)?.name || "Not set",
    }));
  };

  // employee: {id: '514ba0ac-e65e-4d20-b553-4d61c5f52e9f', firstName: 'Michael', lastName: 'Ameyaw', staffId: 'PSL1002', status: false}
  // id: "e4a87fe5-46b2-47c4-b96a-8f68705ceb0c"
  // language: {id: '48f6ee0c-baae-4766-8601-1384ee2df0f4', code: 'LAN0003', name: 'Spanish'}
  // read: "Advanced"
  // speak: "Intermediate"
  // write: "Advanced"

  //Get employee skill details
  const getEmployeelanguage = async () => {
    try {
      const request = await CustomAxios.get(`EmployeeLanguage/${handleId}`);

      const response = request.data;
      const res = response.map((x) => ({
        languageId: x.id,
        read: x.read,
        speak: x.speak,
        write: x.write,
      }));

      console.log({ res });

      // console.log("renderViewInfor");
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

  // useEffect(() => {
  //   console.log("check view info ", viewinfo);
  // });

  //Drop down list for hobby types
  const MultipleGetRequests = async () => {
    try {
      let request = [HttpAPIRequest("GET", GetEmployeeLanguagesType())];
      const multipleCall = await Promise.allSettled(request);
      // console.log(multipleCall[0].value);

      setEmployeelanguageType([...multipleCall[0].value]);
    } catch (error) {
      console.log(error);
    }
  };
  const submitRequest = (args) => {
    if (firstGrid && args.item.id === "saveItems") {
      console.log("first");
      console.log({ value: firstGrid?.current?.currentViewData });
    }

    //console.log({ value: firstGrid });
  };
  useEffect(() => {
    MultipleGetRequests();
    // change();
  }, []);

  const GetColumnNames = () => {
    console.log(submitData.languageId);
    console.log(employeeLanguageType);
    const name = employeeLanguageType?.find(
      (x) => x?.id === submitData?.languageId
    );
    setSelectedName(name?.name);
  };
  const GridAddDelay=()=>{
    setTimeout(()=>{
      handleOnSubmit()
    },500)
  }

  //Handles Submit
  const handleOnSubmit = () => {
    console.log("submit data ", submitData);

    if (!submitData?.languageId || submitData?.languageId == -1) {
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
    let employeeId = submitData?.id;
    //  let newData = { ...submitData, option: options, companyId: TestCompanyId };
    let newData = {
      ...submitData,
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      CompanyReference: "00001_A01",
      employeeId,
    };
    setViewInfo((prevState) => [...prevState,newGridDta]);
    const getName = (id) => {
      return reading.find((x) => x.id == id)?.name || "Not found";
    };
    console.log(newData);
    console.log(submitData?.id);
    //let finalData = JSON.stringify(newData)
    // console.log(finalData)
    // 'Add' === mode ? AddGLAccount(newData) : updateGLAccount(newData);
    //postEmployeeLanguage(newData);
    setPostEmployee([newData]);
    setNewGridData([{
      employee: {
        id: handleId,
      },
      language: {
        id: submitData?.languageId,
        name: selectedName,
      },
      read: getName(submitData.read),
      write: getName(submitData.write),
      speak: getName(submitData.speak),
    }]);
  
    console.log(submitData.languageId);
    //  console.log({ showGrid });
  };
  const SetViewGrid=(data)=>{
    setViewInfo((prevState) => [...prevState,data]);
  }

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
            setSubmitData("");
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
              toast.error(error.message);
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
  // const change = () => {
  //   console.log("working");
  //   viewinfo.map((x) => setReadState(x.read));
  // };
  // if (readState < 2) {
  //   console.log({ readState });
  // }
  const TransLabelByCode = (name) => GetLabelByName(name, lan);
  // console.log({ viewinfo });
  // const check=()=>{
  //   for (let i = 0; i < viewinfo.length; i++) {
  //     if (viewinfo[i]) {
  //       console.log({ i });
  //     }
  //   }
  // }
  var arr = [];
  const DropDown = () => {
    if (viewinfo.length > 0) {
      for (let i = 0; i < viewinfo.length; i++) {
        var obj = {};
        obj = viewinfo[i].language;
        arr.push(obj);
      }

      const newdata = employeeLanguageType.filter((val) => {
        return !arr.find((arr) => {
          // console.log({ valueID: val.id + ": " + arr.id });
          return val?.id === arr?.id;
        });
      });
      setCheckedTypes(newdata);
      console.log(newdata);
    } else {
      setCheckedTypes(employeeLanguageType);
    }
  };

  useEffect(() => {
    if (viewinfo.length > 0) {
      DropDown();
    }
  }, [viewinfo]);
  useEffect(() => {
    if (submitData.languageId) {
      GetColumnNames();
    }
  }, [submitData?.languageId]);
  console.log({ newGridDta });
  // const getSampleData = () => {
  //   viewinfo.map((items) => setEmployeelanguage([items.language]));
  //   console.log({view: viewinfo})
  //   console.log({languages: employeeLanguageType})
  //   let response = [];
  //   if (employeeLanguage) {
  //     //filter
  //     const newdata = employeeLanguageType.filter((val) => {
  //       return employeeLanguage.find((data) => {
  //         console.log({ valueID: val.name + ":" + data.name });
  //         return val.id == data.id;
  //       });
  //     });

  //     setCheckedTypes(newdata);

  //     response = newdata;
  //   } else {
  //     setCheckedTypes(employeeLanguageType);

  //     response = employeeLanguage;
  //   }

  //   //setRecEarnings(response)

  //   return response;
  // };
  console.log({ viewinfo });
  console.log({ arr });
  
  console.log({ selectedName });
  console.log({ postEmployee });

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
        <CCol md="4" hidden={!show}>
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
      </CRow>

      <CRow>
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
                    onClick={() => {
                      setLarge(!large);
                    }}
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
                      setTimeout(() => {
                        setVisible(true);
                      }, 500);

                      DropDown();
                      getEmployeelanguage();
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
              height={"350"}
              dataSource={viewinfo}
              allowPaging={true}
              pageSettings={{ pageSize: 10 }}
              editSettings={editOptions}
              toolbar={toolbarOptions}
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

                <ColumnDirective
                  commands={commandOptions}
                  headerText={GetLabelByName("HCM-F4IUJ9QVOM6", lan)}
                  width="100"
                  textAlign="Center"
                />
              </ColumnsDirective>
              <ColumnsDirective></ColumnsDirective>
              <Inject
                services={[Page, Sort, Filter, Group, Edit, CommandColumn]}
              />
            </GridComponent>
            <CCardFooter>
              <CButton
                style={{ marginRight: 5, float: "right" }}
                type="button"
                size="sm"
                color="success"
                onClick={() => postEmployeeLanguage(postEmployee)}
              >
                <AiFillSave size={20} /> <CSLab code="HCM-HGUHIR0OK6T" />{" "}
              </CButton>
              <CButton
                style={{ marginRight: 9, float: "right", color: "white" }}
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
                  value={data?.languageId || -1}
                  onChange={handleOnChange}
                >
                  {" "}
                  <option value={-1}>Select Language</option>
                  {checkedTypes.map((x, i) => (
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
          <div
            style={{
              fontSize: "10px",
              marginRight: "565px",
              marginBottom: "-24px",
            }}
          >
            <CSLab code="HCM-WKZ2Y0KPTT9-PSLL" /> (<CSRequiredIndicator />)
          </div>

          <CButton
            color="secondary"
            onClick={() => {
              setVisible(false);
              //setSubmitData(null);
            }}
          >
            <CSLab code="HCM-V3SL5X7PJ9C-LANG" />
          </CButton>

          <CButton
            color="primary"
            onClick={() => {
              //setVisible(false);
              handleOnSubmit();
                DropDown()
              GetColumnNames();
              SetViewGrid(newGridDta)

            }}
          >
            <CSLab code="HCM-TAAFD4M071D-HRPR" />
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EmployeeLanguage;
