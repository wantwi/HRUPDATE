import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

//import { toast } from "react-toastify";
import { toastWarning } from "src/toasters/Toaster";
import moment from "moment";
import { validEmail,validPhoneNumber } from "src/reusable/utils/data/regex";

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
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

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

import useMultiFetch from "src/hooks/useMultiFetch";
import useFetch from "src/hooks/useFetch";
import usePost from "src/hooks/usePost";

import { GetLabelByName } from "src/reusable/configs/config";
import {
  CSLab,
  CSAutoComplete,
  CSRequiredIndicator,
} from "../../../reusable/components";
import {
  CardBodyHeight,
  GetRequest,
  HttpAPIRequest,
  PostRequest,
} from "src/reusable/utils/helper";
import { SearchEmployees } from "src/reusable/API/EmployeeEndpoints";
// 
import { CustomAxios } from "src/reusable/API/CustomAxios";
import { BaseURL } from "src/reusable/API/base";
import { toast } from "react-toastify";
import { DeleteEmployeeFamily, GetEmployeeFamily, PostFamily } from "src/reusable/API/EmployeeFamilyEndPoint";
import SweetAlert from "react-bootstrap-sweetalert";
import useDelete from "src/hooks/useDelete";
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input";
import { Formik } from "formik";
import useAuth from "src/hooks/useAuth";

const editOptions = {
  allowEditing: false,
  allowAdding: false,
  allowDeleting: true,
  allowEditOnDblClick: false,
};

const commandOptions = [

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

const EmployeeFamily = () => {
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
  const [getEmployeeAccident, setEmployeeAccident] = useState([]);
  const [post, setPost]=useState([])
const [delEmployeeName,setDelEmployeeName]=useState("")
const[isActive,setIsActive]=useState(false)
const[delEmployeeID,setDelEmployeeID]=useState("")
const [EmployeeFamilyChildren,setEmployeeFamilyChildren]=useState([])
const [phone, setPhone] = useState(null);
const [canSave, setCanSave] = useState(false);
const [isSubmitBtnClick, setIsSubmitBtnClick] = useState(false);
const [empDisplayName, setEmpDisplayName] = useState("");

  
  const searchReset = () => {
    setShow(true);
    setSearchInput("");
    setEmployeeAccident("")
    setPhone(null)
    setSubmitData("")
    dispatch({ type: 'set', data: {} });
    refs.forEach((ref) => {
  
        ref.current.style.border = "1px solid #d8dbe0";
        return
 
      
    });
    

  };
const initialState= [
  
    {
      "id": null,
      "name": null,
      "email": null,
      "phone": null,
      "staffId": null,
      "companyReference": null,
      "employee": {
          "id": null,
          "firstName": null,
          "lastName":null,
          "staffId": null,
          "status": false,
          isDelete : false,
      }
  }
]
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null)

  const refs = [
    nameRef,
    emailRef,
    phoneRef
         
  ];
  const {auth}= useAuth()
  const {companyReference: CompanyReference } = auth

  // useEffect(() => {
  //   MultipleGetRequests();
  // }, []);
  const checkForValue = (ref) => {
    console.log({checkForValue: ref.current.style.border});
    if (ref.current?.value) {
      ref.current.style.border = "1px solid green";
    }
  };

 

  const {setOptData, setUrl} =  useFetch("", (response,results) => {
    if (response) {
        if (response && Object.keys(response).length > 0) {
            setSearchResult(results);
            dispatch({ type: 'set', data: { ...response } });
           // setSubmitData({...response});
           
           setEmployeeAccident(response);
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
  
  // get employee by id for grid view
  const getEmployFamily =  (id) => {
    setUrl(GetEmployeeFamily(id))
   
  };
  const checkRequired=()=>{

   refs.forEach((ref) => {
            if (ref.current.value.length > 2) {
              ref.current.style.border = "2px solid green";
            }else if (ref.current.value.length < 2) {
              ref.current.style.border = "2px solid red";
            } else if (ref.current.value === "") {
              ref.current.style.border = "2px solid red";
            } else {
              ref.current.style.border = "2px solid red";
       
            }
          });
          
    
  
  }
  const checkRequiredToast=()=>{

  }
  // 

  //handles form submit
  const handleOnSubmit = () => {
  
    refs.forEach((ref) => {
      if (ref.current.value.length > 2) {
        ref.current.style.border = "2px solid green";
      }else if (ref.current.value.length < 2) {
        ref.current.style.border = "2px solid red";
        console.log("second");
      } else if (ref.current.value === "") {
        ref.current.style.border = "2px solid red";
        console.log("third");

      } else {
        ref.current.style.border = "2px solid red";
       
        return
 
      }
    });
    
    if (!submitData?.name || submitData?.name === "" && !submitData?.email || submitData?.email === ""  &&  !phone || phone === "") {
      toast.error(GetLabelByName("HCM-WQ9J7737WDC_LASN", lan), toastWarning);
      return;
    }
    
   

    if (!submitData?.name || submitData?.name === "") {
      toast.error(GetLabelByName("HCM-W4TEXTQO7M9_LOLN", lan), toastWarning); 
      return;
    }
    if ( !phone || phone === "" ) {
      toast.error("Please Enter Phone Number!", toastWarning);
      return;
    }
    if (!submitData?.email || submitData?.email === "") {
      toast.error("Please Enter Email Address!", toastWarning);
      return;
    }

   //submitData?.phone = phone;
   setVisible(false)
    let newData = {
      ...submitData,
      phone,
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      CompanyReference: "00001_a01",
      employeeId: handleId,
      isDelete: true,
    };

console.log(newData);
    
    setEmployeeFamilyChildren((prev)=>[...prev,newData])

   // setEmployeeFamilyChildren((current)=>current.filter((item) => console.log(item) ))
    
    setEmployeeAccident((prevState)=>[newData,...prevState])
  setSubmitData([])
  dispatch({ type: "set", data: { } });
  setPhone()
  };

const handlePosting=()=>{
  let postBody={
    employeeId: handleId,
    "createEmployeeFamilyChildren": EmployeeFamilyChildren,
    "companyReference": "00001_a01",
    "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }

  console.log(postBody);
  if(EmployeeFamilyChildren.length > 0){
    setPostData(postBody)
    setPostUrl(PostFamily())
    setEmployeeFamilyChildren([])
  }
   
   // console.log(post);
}


  const  {setData:setPostData, setUrl:setPostUrl} = usePost('', (response) => {
    // console.log({location:response });
    const {data} = response
    if ("" === data) {
      toast.success(`${GetLabelByName("HCM-HAGGXNJQW2B_HRPR", lan)}`);
    //  showToasts();
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

    setMode("Add");
    setShow(false);
    dispatch({ type: "set", data: { ...results } });
    // setSubmitData({ ...results });
    setEmpDisplayName(
      (prevState) => `${results.firstName} ${results.lastName}`
    );

    if (results?.id) {
      setSearchResult(results);
      getEmployFamily(results.id)
   
    }
  };

  // const employeeName = viewinfo.map((x) => x.firstName + " " + x.lastName);
  const TransLabelByCode = (name) => GetLabelByName(name, lan);

  const handleOnChange = (evnt) => {
  
    setSubmitData((data) => {
      return { ...data, [evnt?.target?.name]: evnt?.target?.value };
    });
    dispatch({
      type: "set",
      data: { ...data, [evnt?.target?.name]: evnt?.target?.value },
    });
    console.log(evnt?.target?.name);
    if(evnt?.target?.name === "name" && evnt?.target?.value === ""){
      toast.error("Enter Name")
    }
  };




  console.log("from Db: ", getEmployeeAccident);

  console.log({ submitdatas: data });

  const onConfirm = () => {

    handleDeleteItem();

  };

  const onCancel = () => {

    setIsActive(false);

  };

  const onCommandClick = (args) => {



    console.log(args);
    if(args.rowData.isDelete === true){
      args.cancel = false;
      setEmployeeAccident((current)=>current.filter((deleteItem) => deleteItem.isDelete !== true));
      setEmployeeFamilyChildren((current)=>current.filter((deleteItem) => deleteItem.isDelete !== true))
      return;
    }
    else{
      onCompleteAction(args);
 
    }


  
    
  };

const rowSelected=(args)=>{
console.log(args);
}


  const onCompleteAction = (args) => {
console.log(args);
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

  console.log(delEmployeeID);
    let deleteData = {

      transactionsId: delEmployeeID || "",

      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",

      accountReference: "string"

    }

    setDeletUrl(DeleteEmployeeFamily())

    setDeleteData({ data: deleteData })



  };
  const { setData: setDeleteData, setUrl: setDeletUrl } = useDelete('', (response) => {

    // console.log({location:response });

    const { data } = response

    if (response.status === 200 || response.status === 204) {

      toast.success(`${GetLabelByName("HCM-9VWW2UPSTXS-PSLL", lan)}`);
      setIsActive(false);
      setEmployeeAccident("")
      // GetPreviousData();
      getEmployFamily(handleId)


    } else {

      toast.error('Transaction Failed, Please try agin later!', toastWarning);

    }



  })
  useEffect(()=>{
    if(validPhoneNumber(data?.phone)){
      console.log("VALID")
    }

  },[data?.phone])
console.log(getEmployeeAccident);
  console.log(EmployeeFamilyChildren);  
  return (
    <>
  
<SweetAlert
 warning
showCancel
 confirmBtnText="Yes, delete it!"
confirmBtnBsStyle="danger"
title={`${GetLabelByName("HCM-Z3GW6TG207", lan)}?`}
 onConfirm={onConfirm}
 onCancel={onCancel}
 focusCancelBtn
show={isActive}
>
 {/* <CSLab code='HCM-7KY656PSXDB-LASN' /> */}
 </SweetAlert>


      <CRow >
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-BFCF6D9NBVN_LASN" />
          </h5>
        </CCol>
      </CRow>
      <CRow hidden={!show}>
        <CCol md="4">
          <CSAutoComplete
            filterUrl={SearchEmployees(searchInput)}
            placeholder={"Search for employee by name or code"}
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
                    <CSLab code="HCM-Z3BWHGKCFE_PSLL" />{" "}
                  </CButton>
                </CCol>
              </CFormGroup>
            </CCardHeader>
            {/* style={{ height: CardBodyHeight, overflowY: "auto" }} */}

            <GridComponent
            rowDeselected={rowSelected}
              height={"350"}
              dataSource={getEmployeeAccident}
              allowPaging={true}
              pageSettings={{ pageSize: 10 }}
              editSettings={editOptions}
              commandClick={onCommandClick}
            >
              <ColumnsDirective>
                <ColumnDirective
                  field={""}
                  headerText="ID"
                  width="100"
                  visible={false}
                />
                <ColumnDirective
                  field="name"
                  headerText={GetLabelByName("HCM-DQLFZZ9A4F6-LASN", lan)}
                  width="100"
                />
                <ColumnDirective
                  field="email"
                  headerText={GetLabelByName("HCM-CXLK7IYZ9B9-KCMI", lan)}
                  // type="date"
                  // format="dd/MMM/yyyy"
                  width="100"
                />
                <ColumnDirective
                  field="phone"
                  headerText={GetLabelByName("HCM-28JQRN57PA4-PSLL", lan)}
                  width="100"
                />
                {/* <ColumnDirective
                  field="dateInformed"
                  headerText={GetLabelByName("HCM-GOO3SSJSCG5_LANG", lan)}
                  type="date"
                  format="dd/MMM/yyyy"
                  width="100"
                /> */}
                HCM-GOO3SSJSCG5_LANG
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
            <CCardFooter>
            <CButton onClick={()=>handlePosting()} style={{ marginRight: 5, float: "right" }} type="submit" size="sm" color="success" >
                <CIcon name="cil-scrubber" />   <CSLab code="HCM-4FBXK4LHPN5_KCMI" />
              </CButton>
            <CButton
                 style={{ marginRight: 5, float: 'right', color: 'white' }}
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
            <CSLab code="HCM-Z3BWHGKCFE_PSLL" />{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className={"bottom-spacing"}>
            <>
              <CCol md="6">
                <CLabel htmlFor="name">
                  <CSLab code="HCM-DQLFZZ9A4F6-LASN" />
                  <CSRequiredIndicator />
                </CLabel>
                <input
                  name="name"
                  ref={nameRef}
                  className="form-control"
                  value={data?.name || ""}
                  onChange={(e)=>{handleOnChange(e); checkForValue(nameRef)}}
                  placeholder={GetLabelByName("HCM-W4TEXTQO7M9_LOLN",lan)}
                />
                  {/* {accidentTypes.map((x, i) => (
                    <option key={i} value={x.id}>
                      {x.name}
                    </option>
                  ))}
                </CSelect> */}
              </CCol>
              <CCol md="4" xs="6">
              <CLabel>
    <CSLab code="HCM-BOSPUEXHRP_PSLL" />
    </CLabel><CSRequiredIndicator />
          <PhoneInput
                  name ='phone'
                  ref={phoneRef}
              placeholder="Phone"
             value={data?.phone || phone ||  ''}
            
                 onChange={(e)=> {setPhone(e);checkForValue(nameRef)}} 
        />
              </CCol>
            </>
          </CRow>
          <CRow className={"bottom-spacing"}>
            <>
            <CCol md="6">
                <CLabel htmlFor="email">
                  <CSLab code="HCM-CXLK7IYZ9B9-KCMI" />
                  <CSRequiredIndicator />
                </CLabel>
                <input
                  id="email"
                  name="email"
                  type="text"
                  ref={emailRef}
                  className="form-control"
                  value={data?.email || ""}
                  onChange={(e)=>{handleOnChange(e); checkForValue(emailRef)}}
                  placeholder={GetLabelByName("HCM-61522DCMNA-LANG", lan)}
                ></input>
              </CCol>
              {/* <CCol md="6">
                <CLabel htmlFor="DateInformed">
                  <CSLab code="HCM-GOO3SSJSCG5_LANG" />
                  <CSRequiredIndicator />
                </CLabel>
                <CInput
                  className=""
                  id="DateInformed"
                  type="date"
                  name="DateInformed"
                  value={data?.DateInformed || -1}
                  onChange={handleOnChange}
                  max={moment().format("YYYY-MM-DD")}
                />
              </CCol> */}
            </>
          </CRow>
          {/* <CRow>
            <CCol md="6">
              <CLabel>
                <CSLab code="HCM-Z0FV0XJJ06" />
              </CLabel>
              <CTextarea
                id="note"
                name="note"
                value={data?.note || ""}
                onChange={handleOnChange}
                style={{ height: "60px", resize: "none" }}
              ></CTextarea>
            </CCol>
          </CRow> */}
        </CModalBody>
        <CModalFooter>
        <p style={{ position: "absolute", left: "20px" }}><em style={{ fontSize: "12px" }}><CSLab code="HCM-S6DELVG0IQS-HRPR" /> (<CSRequiredIndicator />)<CSLab code="HCM-H72Q4EB363H_PSLL" /></em></p>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            <CSLab code="HCM-V3SL5X7PJ9C-LANG" />
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              setIsSubmitBtnClick(true)
                handleOnSubmit();
            
            
             
            }}
          >
            <CSLab code="HCM-TAAFD4M071D-HRPR" />
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EmployeeFamily;
