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
  saveComplete,
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
import {
  PostAccidentTransaction,
  GetAccidentTypes,
  GetEmployeeAccidentByEmployeeId,
  DeleteAccidentTransaction,
} from "src/reusable/API/AccidentTransaction";
import { CustomAxios } from "src/reusable/API/CustomAxios";
import { BaseURL } from "src/reusable/API/base";
import { toast } from "react-toastify";
import SweetAlert from "react-bootstrap-sweetalert";
import useDelete from "src/hooks/useDelete";
import useAuth from "src/hooks/useAuth";

const editOptions = {
  allowEditing: false,
  allowAdding: false,
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

const AccidentTransaction = () => {
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
  const [transactionData, setTransactionData] = useState([]);
  const [accidentTypes, setAccidentTypes] = useState([]);
  const [getEmployeeAccident, setEmployeeAccident] = useState([]);
  const [delEmployeeName,setDelEmployeeName]=useState("")
const[isActive,setIsActive]=useState(false)
const[delEmployeeID,setDelEmployeeID]=useState("")
const[AccidentTransactionChildren, setAccidentTransactionChildren]=useState([])

const accidentTypeRef =useRef(null);
const locationRef = useRef(null);
const dateInformedRef = useRef(null);
const dateOfAccidentRef = useRef(null)

const refs=[
  accidentTypeRef,
  locationRef,
  dateInformedRef,
  dateOfAccidentRef

]

const checkForValue = (ref) => {
  console.log({checkForValue: ref});
  if (ref.current?.value) {
    ref.current.style.border = "1px solid green";
  }
};

const {auth}= useAuth()
  const {companyReference: CompanyReference } = auth
  //fucntion for multiple get (dropDown list in the form)
  // const MultipleGetRequests = async () => {
  //   try {
  //     let request = [HttpAPIRequest("GET", GetAccidentTypes())];
  //     const multipleCall = await Promise.allSettled(request);
  //     console.log(multipleCall[0].value);

  //     setAccidentTypes([
  //       { id: "-1", name: `Select Accident Type` },
  //       ...multipleCall[0].value,
  //     ]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const searchReset = () => {
    setShow(true);
    setSearchInput("");
    dispatch({ type: 'set', data: {  } });
    setAccidentTransactionChildren("")
    refs.forEach((ref) => {
  
      ref.current.style.border = "1px solid #d8dbe0";
      return

    
  });
    setSubmitData("");
    // const [grid,] = useState(null);

    // const OnSaveContinueClick = () => {
    //     console.log(grid);
    // }
  };
  const  {data:multicallData} =  useMultiFetch([ GetAccidentTypes(CompanyReference)], (results) => {
    setAccidentTypes([{ id: "-1", name: `Select Accident Type` }, ...results[0].data]);
   
  })

  // useEffect(() => {
  //   MultipleGetRequests();
  // }, []);


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
            // setSubmitData({ ...response });
        }
    }
});
  
  // get employee by id for grid view
  const getEmployyeAccidentById =  (id) => {
    setUrl(GetEmployeeAccidentByEmployeeId(id))
  
  };

  //handles form submit
  const handleOnSubmit = () => {
    console.log(submitData);

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
    if (!submitData?.accidentTypeId || submitData?.accidentTypeId === -1 && !submitData?.LocationofAccident ||
      submitData?.LocationofAccident === "" && !submitData?.DateofAccident || submitData?.DateofAccident === "" && !submitData?.DateInformed || submitData?.DateInformed === "") {
      toast.error(GetLabelByName("HCM-WQ9J7737WDC_LASN", lan), toastWarning);
      return;
    }

    if (!submitData?.accidentTypeId || submitData?.accidentTypeId === -1) {
      toast.error("Please Select Accident Type!", toastWarning);
      return;
    }
    if (
      !submitData?.LocationofAccident ||
      submitData?.LocationofAccident === ""
    ) {
      toast.error("Please Enter Location!", toastWarning);
      return;
    }
    if (!submitData?.DateofAccident || submitData?.DateofAccident === "") {
      toast.error("Please Select Accident Date!", toastWarning);
      return;
    }
    if (!submitData?.DateInformed || submitData?.DateInformed === "") {
      toast.error("Please select a Date!", toastWarning);
      return;
    }
    if (!submitData?.note || submitData?.note === "") {
      toast.error("Please Provide Description!", toastWarning);
      return;
    }

    // console.log(submitData)

    // let employeeId = submitData.id;
    // let newData = {
    //   ...submitData,
    //   userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //   userName: "string",
    //   CompanyReference: "00001_a01",
    //   employeeId : searchResult?.id
    // };
    setVisible(false);
    let postin = 
    {
      isDelete: true,
      "locationOfAccident": submitData?.LocationofAccident,
    
    
      "dateOfAccident":  submitData?.DateofAccident,
      "dateInformed": submitData?.DateInformed,
      "accidentTypesDto": {
        "id": submitData?.accidentTypeId,
        
        "name" : getName(accidentTypes,submitData?.accidentTypeId),
        
      },
     
    }
let submit = {
  DateInformed : submitData?.DateInformed,

DateofAccident : submitData?.DateofAccident,

LocationofAccident : submitData?.LocationofAccident,

accidentTypeId : submitData?.accidentTypeId,

note : submitData?.note,
isDelete :true

}

console.log({sub :submitData });
    setAccidentTransactionChildren((prev)=>[...prev,submit])
    // setTransactionData(newData)
    setEmployeeAccident((prevState)=>[postin,...prevState])


   
  
    // postAccidentTrans(newData);
  };


const handlePost =()=>{
  let postBody={
    employeeId: handleId,
    companyReference: "00001_a01",
    "createEmployeeAccidentChildren": AccidentTransactionChildren,
    "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
  console.log(AccidentTransactionChildren);
  if(AccidentTransactionChildren?.length > 0   ){
    setPostData(postBody)
    setPostUrl(PostAccidentTransaction())
    postBody("")
  }
 
}


  const  {setData:setPostData, setUrl:setPostUrl} = usePost('', (response) => {
    // console.log({location:response });
    const {data} = response
    if ("" === data) {
      toast.success(GetLabelByName("HCM-HAGGXNJQW2B_HRPR", lan));
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
const getName=(data,id)=>{
return data.find(x=>x.id === id)?.name || "Not Found"
}

  //funtion to handle post
  function postAccidentTrans(data) {
    console.log(data);
    PostRequest(PostAccidentTransaction(), { data: data })
      .then((response) => {
        response.text().then((data) => {
          if ("" === data) {
            toast.success("Accident Transaction Added Successfully!");
            console.log("success");
           // getEmployyeAccidentById();
          } else {
            try {
              data = JSON.parse(data);
              toast.error(
                data?.reason
                  ? data?.reason
                  : "Failed to Add Accident Transaction",
                "error",
                4000
              );
            } catch (error) {
              console.log("MODEL", error);
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

  const handleSearchResultSelect = (results) => {
    console.log("show results", results);

    setMode("Add");
    setShow(false);
    dispatch({ type: "set", data: { ...results } });
    // setSubmitData({ ...results });

    if (results?.id) {
      setSearchResult(results);
      getEmployyeAccidentById(results.id)
    
    }
  };

  const employeeName = viewinfo.map((x) => x.firstName + " " + x.lastName);
  const TransLabelByCode = (name) => GetLabelByName(name, lan);

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
  console.log("from Db: ", getEmployeeAccident);

  console.log({ submitdatas: data });
  const onConfirm = () => {

    handleDeleteItem();

  };

  const onCancel = () => {

    setIsActive(false);
  
  };
  
  const onCommandClick = (args) => {
if(args.rowData.isDelete === true){
      args.cancel = false;
      setAccidentTransactionChildren((current)=>current.filter((deleteItem) => deleteItem.isDelete !== true))
      return;
    }
    else{
      onCompleteAction(args);
 
    }
  
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
  
      transactionsId: delEmployeeID,
  
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  
      accountReference: "string"
  
    }
    setDeletUrl(DeleteAccidentTransaction())
  
    setDeleteData({ data: deleteData })
  
  
  
  };
  const { setData: setDeleteData, setUrl: setDeletUrl } = useDelete('', (response) => {
  
    // console.log({location:response });
  
    const { data } = response
  
    if (response.status === 200 || response.status === 204) {
  
      toast.success(`${GetLabelByName("HCM-9VWW2UPSTXS-PSLL", lan)}`);
  
      setIsActive(false);
    setEmployeeAccident("")

      getEmployyeAccidentById(handleId)
      // GetPreviousData(nonCashId);
  
    } else {
  
      toast.error('Transaction Failed, Please try agin later!', toastWarning);
  
    }
  
  
  
  })
  return (
    <>
     <SweetAlert
 warning
showCancel
 confirmBtnText="Yes, delete it!"
confirmBtnBsStyle="danger"
title={`${GetLabelByName("HCM-IIQS2WWFTPP_KCMI", lan)} ${GetLabelByName("HCM-Z0GANCGNQO-LOLN", lan)} ${GetLabelByName("HCM-SF00RQBW0XB_PSLL", lan)} ${delEmployeeName}?`}

 onConfirm={onConfirm}
 onCancel={onCancel}
 focusCancelBtn
show={isActive}
></SweetAlert>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-Z0GANCGNQO-LOLN" />
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
                    <CSLab code="HCM-7SLZ9PA5A0V_KCMI" />{" "}
                  </CButton>
                </CCol>
              </CFormGroup>
            </CCardHeader>
            {/* style={{ height: CardBodyHeight, overflowY: "auto" }} */}

            <GridComponent
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
                  field="accidentTypesDto.name"
                  headerText={GetLabelByName("HCM-EZWGSC0K0OK_KCMI", lan)}
                  width="100"
                />
                <ColumnDirective
                  field="dateOfAccident"
                  headerText={GetLabelByName("HCM-JVUPJOPETGK-LANG", lan)}
                  type="date"
                  format="dd/MMM/yyyy"
                  width="100"
                />
                <ColumnDirective
                  field="locationOfAccident"
                  headerText={GetLabelByName("HCM-QJCY2VRWA7_LOLN", lan)}
                  width="100"
                />
                <ColumnDirective
                  field="dateInformed"
                  headerText={GetLabelByName("HCM-GOO3SSJSCG5_LANG", lan)}
                  type="date"
                  format="dd/MMM/yyyy"
                  width="100"
                />
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
            <CButton onClick={handlePost} style={{ marginRight: 5, float: "right" }} type="submit" size="sm" color="success" >
                <CIcon name="cil-scrubber" /> Submit
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
            <CSLab code="HCM-7SLZ9PA5A0V_KCMI" />{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className={"bottom-spacing"}>
            <>
              <CCol md="6">
                <CLabel htmlFor="AccidentType">
                  <CSLab code="HCM-LPG0UTX0P7H-HRPR" />
                  <CSRequiredIndicator />
                </CLabel>
                <select
                  name="accidentTypeId"
                  ref={accidentTypeRef}
                  className="form-control"
                  value={data?.accidentTypeId || ""}
                  onChange={(e)=>{handleOnChange(e); checkForValue(accidentTypeRef)}}
                >
                  {accidentTypes.map((x, i) => (
                    <option key={i} value={x.id}>
                      {x.name}
                    </option>
                  ))}
                </select>
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="LocationofAccident">
                  <CSLab code="HCM-QJCY2VRWA7_LOLN" />
                  <CSRequiredIndicator />
                </CLabel>
                <input
                  id="LocationofAccident"
                  name="LocationofAccident"
                  type="text"
                    ref={locationRef}
                    className="form-control"
                  value={data?.LocationofAccident || ""}
                  onChange={(e)=>{handleOnChange(e); checkForValue(locationRef)}}
                  placeholder={GetLabelByName("HCM-ZFA4W47NARI_KCMI", lan)}
                ></input>
              </CCol>
            </>
          </CRow>
          <CRow className={"bottom-spacing"}>
            <>
              <CCol md="6">
                <CLabel htmlFor="DateofAccident">
                  <CSLab code="HCM-JVUPJOPETGK-LANG" />
                  <CSRequiredIndicator />
                </CLabel>
                <input
                
                  id="DateofAccident"
                  name="DateofAccident"
                  ref={dateOfAccidentRef}
                  value={data?.DateofAccident || ""}
                  className= "form-control"
                  type="date"
                  onChange={(e)=>{handleOnChange(e);checkForValue(dateOfAccidentRef)}}
                  max={moment().format("YYYY-MM-DD")}
                />
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="DateInformed">
                  <CSLab code="HCM-GOO3SSJSCG5_LANG" />
                  <CSRequiredIndicator />
                </CLabel>
                <input
                className="form-control"
                  id="DateInformed"
                  type="date"
                  name="DateInformed"
                  ref={dateInformedRef}
                  value={data?.DateInformed || ""}
                  onChange={(e)=>{handleOnChange(e); checkForValue(dateInformedRef)}}
                  max={moment().format("YYYY-MM-DD")}
                />
              </CCol>
            </>
          </CRow>
          <CRow>
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
          </CRow>
        </CModalBody>
        <CModalFooter>
        <p style={{ position: "absolute", left: "20px" }}><em style={{ fontSize: "12px" }}><CSLab code="HCM-S6DELVG0IQS-HRPR" /> (<CSRequiredIndicator />)<CSLab code="HCM-H72Q4EB363H_PSLL" /></em></p>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            <CSLab code="HCM-V3SL5X7PJ9C-LANG" />
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
          
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

export default AccidentTransaction;
