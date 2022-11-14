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
import { GetEmployeeByID, SearchEmployees } from "src/reusable/API/EmployeeEndpoints";

import { CustomAxios } from "src/reusable/API/CustomAxios";
import { BaseURL } from "src/reusable/API/base";
import { toast } from "react-toastify";
import {
  PostEmployeeLanguage,
  GetEmployeeLanguagesType,
} from "src/reusable/API/EmployeeLanguage";
import { IdNumberIcon } from "evergreen-ui";
import { Dropdown } from "@coreui/coreui";
import useMultiFetch from "src/hooks/useMultiFetch";
import usePost from "src/hooks/usePost";
import useFetch from "src/hooks/useFetch";
import { Log } from "oidc-client";
import useDelete from "src/hooks/useDelete";
import SweetAlert from "react-bootstrap-sweetalert";
// import { values } from "core-js/es7/array";

const editOptions = {
  allowEditing: false,
  allowAdding: true,
  allowDeleting: true,
  allowEditOnDblClick: false,
};

const commandOptions = [
  // {
  //   type: "Edit",
  //   buttonOption: { iconCss: " e-icons e-edit", cssClass: "e-flat" },
  // },
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
  const [post , setPost] =useState([])
  const [delEmployeeName,setDelEmployeeName]=useState("")
const[isActive,setIsActive]=useState(false)
const[delEmployeeID,setDelEmployeeID]=useState("")
  //const [newGridDta, setNewGridData] = useState([]);
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


  const {setOptData, setUrl} =  useFetch("", (response,results) => {
    if (response) {
      console.log(response);
      const request = response;
      const res = request.map((x) => ({
        languageId: x.id,
        read: x.read,
        speak: x.speak,
        write: x.write,
      }));

      //console.log({ res });

       
      dispatch({ type: "set", data: { ...response } });
      setViewInfo(renderViewInfor(request));

    }
});




  const handleSearchResultSelect = (results) => {


    //setting employee display name on select of suggested item
    setEmpDisplayName(
      (prevState) => `${results.firstName} ${results.lastName}`
    );
  
    setMode("Add");
    setShow(false);
    dispatch({ type: "set", data: { ...results } });
    setSubmitData({ ...results });
console.log(results);
     if (results?.id) {
       setSearchResult(results);
      //  getEmployeelanguage(results.id)
       setUrl(GetEmployeeByID(results?.id))
    //   GetRequest()
    //     .then((response) => {
    //       // toast.dismiss(toastId);
    //       if (response.ok) {
    //         response.json().then((response) => {
          
    //           if (response && Object.keys(response).length > 0) {
    //             dispatch({ type: "set", data: { ...response } });
    //             setSubmitData({ ...response });
              
    //             setShow(false);
    //             setMode("Update");
    //           } else {
    //             setMode("Add");
    //             setShow(false);
              
    //           }
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //        console.log(err);
    //       // toaster(toastId, "Failed to retrieve details", 'error', 4000);
    //     });
    }
  };
  const searchReset = () => {
    setShow(true);
    setSearchInput("");
    setVisible(false)
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


  //Get employee skill details
  const getEmployeelanguage = (ID) => {
    setUrl(GetEmployeeByID(ID))
    console.log(ID)
   
  };



  const submitRequest = (args) => {
    if (firstGrid && args.item.id === "saveItems") {
      // console.log("first");
      // console.log({ value: firstGrid?.current?.currentViewData });
    }
  };


//DROP DOWN FOR EMPLOYEE LANGUAGE
  const  {data:multicallData} =  useMultiFetch([ GetEmployeeLanguagesType()], (results) => {
    setEmployeelanguageType([...results[0].data]);
  
  })


  const GetColumnNames = () => {
   
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
    DropDown()
              GetColumnNames();
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
     console.log(submitData)
    let employeeId = searchResult?.id;
    //  let newData = { ...submitData, option: options, companyId: TestCompanyId };

    let newData = {
      ...submitData,
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      CompanyReference: "00001_A01",
      employeeId: employeeId,
    };


let newGridData ={
  employee: {
    id: handleId,
  },
  language: {
    id: submitData?.languageId,
    name: selectedName,
  },
  read: getName(submitData?.read),
  write: getName(submitData?.write),
  speak: getName(submitData?.speak),
}
setPost(newData)
  
    console.log(newGridData);
    setViewInfo((prevState) => [newGridData,...prevState]);
   
  

   // setPostEmployee([newData]);

  };


  const getName = (id) => {
    return reading.find((x) => x.id == id)?.name || "Not found";
  };
  
 
  const handlePost=()=>{
    console.log(post)
    setPostData(post)
     setPostUrl(PostEmployeeLanguage())
    }



const trials=()=>{
alert("Clicked")
}






  // console.log(viewinfo);
  // const SetViewGrid=(data)=>{
  //   setViewInfo((prevState) => [...prevState,data]);
  // }

  const  {setData:setPostData, setUrl:setPostUrl} = usePost('', (response) => {
    // console.log({location:response });
    const {data} = response
    if ("" === data) {
      toast.success(GetLabelByName("HCM-HAGGXNJQW2B_HRPR", lan));
      //showToasts();
      searchReset();
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


  //Post Employee Skill
  // function postEmployeeLanguage(data) {
  //   console.log("post data", data);
  //   PostRequest(PostEmployeeLanguage(), { data: data })
  //     .then((response) => {
  //       response.text().then((data) => {
  //         if ("" == data) {
  //           toast.success("Employee Language Added Successfully!");
  //           console.log("success");
  //           getEmployeelanguage();
  //           setVisible(false);
  //           setSubmitData("");
  //         } else {
  //           try {
  //             data = JSON.parse(data);
  //             toast.error(
  //               data?.reason ? data?.reason : "Failed to Add Employee Language",
  //               "error",
  //               400
  //             );
  //             setVisible(true);
  //           } catch (error) {
  //             console.log(error);
  //             toast.error(error.message);
  //           }
  //         }
  //       });
  //     })
  //     .catch((err) => {
  //       console.log({ err });
  //     })
  //     .finally(() => {
  //       console.log("Done");
  //     });
  // }
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


  const TransLabelByCode = (name) => GetLabelByName(name, lan);

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
      //console.log(newdata);
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
  
  const onConfirm = () => {

    handleDeleteItem();

  };

  const onCancel = () => {

    setIsActive(false);
  
  };
  
  const onCommandClick = (args) => {
  console.log(args);
  // onCompleteAction(args);
  
  };
  
  
  
  
  const onCompleteAction = (args) => {
  
    if (args.commandColumn.type === 'Delete') {
  
      args.cancel = true;
  
      setIsActive(true)
  
      setDelEmployeeName(`${args?.rowData?.employee?.firstName
      } ${args?.rowData?.employee?.lastName
      }`)
  
      setDelEmployeeID(args.rowData.id)
  
    }
  
  };
  
  const handleDeleteItem = async () => {
  
    let deleteData = {
  
      earningId: "",
  
      employeeId: delEmployeeID,
  
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  
      accountReference: "string"
  
    }
  
    setDeletUrl("")
  
    setDeleteData({ data: deleteData })
  
  
  
  };
  const { setData: setDeleteData, setUrl: setDeletUrl } = useDelete('', (response) => {
  
    // console.log({location:response });
  
    const { data } = response
  
    if (response.status === 200 || response.status === 204) {
  
      toast.success('Employee Language Deleted Successfully!',);
  
      setIsActive(false);
  
      // GetPreviousData(nonCashId);
  
    } else {
  
      toast.error('Transaction Failed, Please try agin later!', toastWarning);
  
    }
  
  
  
  })
  



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
  //console.log({ viewinfo });
  //console.log({ arr });
  
  console.log(viewinfo);
  //console.log({ postEmployee });

  return (
    <>
     <SweetAlert
 warning
showCancel
 confirmBtnText="Yes, delete it!"
confirmBtnBsStyle="danger"
title={`${GetLabelByName("HCM-IIQS2WWFTPP_KCMI", lan)} ${GetLabelByName("HCM-2YN2O0KO4YX-LASN", lan)} ${GetLabelByName("HCM-SF00RQBW0XB_PSLL", lan)} ${delEmployeeName}?`}
 onConfirm={onConfirm}
 onCancel={onCancel}
 focusCancelBtn
show={isActive}
></SweetAlert>
      <CRow hidden={!show}>
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
                      //getEmployeelanguage();
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
              commandClick={onCommandClick}
              // editSettings={editOptions}
              // toolbar={toolbarOptions}
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
                // onClick={() => postEmployeeLanguage(postEmployee)}
                onClick={()=>handlePost()}
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
        <p style={{ position: "absolute", left: "20px" }}><em style={{ fontSize: "12px" }}><CSLab code="HCM-S6DELVG0IQS-HRPR" /> (<CSRequiredIndicator />)<CSLab code="HCM-H72Q4EB363H_PSLL" /></em></p>

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
              handleOnSubmit();
              // trials()
            }}
          >
            {/* <CSLab code="HCM-TAAFD4M071D-HRPR" /> */}
            <CSLab code="HCM-HGUHIR0OK6T" />
           
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EmployeeLanguage;
