import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { toastWarning } from "src/toasters/Toaster";
import {
  CInput,
  CCard,
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
  CCardHeader,
  CCardFooter,
} from "@coreui/react";
import {
  ColumnDirective,
  ColumnsDirective,
  CommandColumn,
  Edit,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  Sort,
  Toolbar,

  //CommandColumn
} from "@syncfusion/ej2-react-grids";
import {
  CardBodyHeight,
  GetRequest,
  HttpAPIRequest,
  PostRequest,
} from "src/reusable/utils/helper";
import { GetLabelByName } from "src/reusable/configs/config";
import {
  CSLab,
  CSAutoComplete,
  CSRequiredIndicator,
} from "../../../reusable/components";
import { AiOutlinePlus, AiOutlineClose, AiFillSave } from "react-icons/ai";

import {
  GetEmployee,
  SearchEmployees,
} from "src/reusable/API/EmployeeEndpoints";
import { CustomAxios } from "src/reusable/API/CustomAxios";
import {
  GetEducationCoreArea,
  GetProfessionalTitles,
  GetQualificationTypes,
  PostEmployeeEducationInfos,
  GetEmployeeEducationInfo,
  GetEmployeeById,
  DeleteEmployeeEducationInfos,
} from "src/reusable/API/EmployeeEducationEndpoints";
import { GetEmployeeAccidentByEmployeeId } from "src/reusable/API/AccidentTransaction";
import useMultiFetch from "src/hooks/useMultiFetch";
import useFetch from "src/hooks/useFetch";
import usePost from "src/hooks/usePost";
import SweetAlert from "react-bootstrap-sweetalert";
import useDelete from "src/hooks/useDelete";
import useAuth from "src/hooks/useAuth";

//GetEducationCoreArea
// HttpAPIRequest
// import { SearchEmployees } from 'src/reusable/API/CurrencyEndpoints';
// GetProfessionalTitles

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


const toolbarOptions = ["Add", "Cancel"];

const EmployeeEducationInformation = (props) => {
  const data = useSelector((state) => state.data);
  const lan = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfItems, setNumberOfItems] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [submitData, setSubmitData] = useState({});
  const [sortOrder, setSortOrder] = useState("");
  const [large, setLarge] = useState(false);
  const [show, setShow] = useState(true);
  const [mode, setMode] = useState("");
  const [editOptions] = useState({
    allowEditing: false,
    allowAdding: true,
    allowDeleting: true,
    allowEditOnDblClick: false,
  });
  const [visible, setVisible] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [viewinfo, setViewInfo] = useState([]);
  const [handleId, setHandleId] = useState("");
  const TransLabelByCode = (name) => GetLabelByName(name, lan);
  const [titles, setProfessionalTitle] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [educationCore, setEducationCore] = useState([]);
  const [empDisplayName, setEmpDisplayName] = useState("");
  const [post, setPost] =useState([])
  const [delEmployeeName,setDelEmployeeName]=useState("")
const[isActive,setIsActive]=useState(false)
const[delEmployeeID,setDelEmployeeID]=useState("")
const [EmployeeEduInfoChildren,setEmployeeEduInfoChildren]=useState([])
  // const [postdetails,setPostDetails]= useState([{name:"",gender:""}])
  const startDateRef = useRef(null)
  const endDateRef = useRef(null)
  const qualificationRef = useRef(null)
  const coreAreaRef =useRef(null)
  const proTitle = useRef(null)
  const gradeRef = useRef(null)
  const schoolRef = useRef(null)

const refs = [
  startDateRef,
  endDateRef,
  qualificationRef,
  coreAreaRef,
  proTitle,
  gradeRef,
  schoolRef
]

const refs2 = [
  qualificationRef,
  coreAreaRef,
  proTitle,
  
]

const checkForValue = (ref) => {
  console.log({checkForValue: ref.current?.value});
  if (ref.current?.value) {
    ref.current.style.border = "1px solid green";
  }
};


  // GetProfessionalTitles()
  const  {data:multicallData} =  useMultiFetch([  GetProfessionalTitles(),  
    GetQualificationTypes(),GetEducationCoreArea()], (results) => {
      setProfessionalTitle([
        { id: -1, name: `Select Title` },
        ...results[0].data,
      ]);
      setQualification([
        { id: -1, name: `Select Qualification` },
        ...results[1].data,
      ]);
      setEducationCore([
        { id: -1, name: `Select Education Core Area` },
        ...results[2].data,
      ]);
      console.log(results[0].data)
   
  
  })

  const {auth}= useAuth()
  const {companyReference: CompanyReference } = auth


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

    if (results?.id) {
      setSearchResult(results);
      setUrl(GetEmployeeById(results?.id))
      
    }
  };
  const searchReset = () => {
    setShow(true);
    setSearchInput("");
setViewInfo("")
refs.forEach((ref) => {
  
  ref.current.style.border = "1px solid #d8dbe0";
  return


});
dispatch({ type: 'set', data: { } });

    // const [grid,] = useState(null);

    // const OnSaveContinueClick = () => {
    //     console.log(grid);
    // }
  };

  const handleOnSubmit = () => {

    refs.forEach((ref) => {
      if (ref.current.value.length > 2) {
        ref.current.style.border = "2px solid green";
      }else if (ref.current.value.length < 1) {
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
    refs2.forEach((ref) => {
      if (ref.current.value !== "-1") {
        ref.current.style.border = "2px solid green";
      }else if (ref.current.value === "-1") {
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



    if (!submitData?.StartDate || submitData?.StartDate === -1 && !submitData?.endDate || submitData?.endDate === -1 && !submitData?.qualificationId || submitData?.qualificationId === -1 && !submitData?.educationTypeId || submitData?.educationTypeId === -1 && !submitData?.titleId || submitData?.titleId === -1 && !submitData?.grade || submitData?.grade === "" && !submitData?.school || submitData?.school === "") {
      toast.error(GetLabelByName("HCM-WQ9J7737WDC_LASN", lan), toastWarning);
      return;
    }


    if (!submitData?.StartDate || submitData?.StartDate === -1) {
      toast.error("Please Select Start Date!", toastWarning);
      return;
    }

    if (!submitData?.endDate || submitData?.endDate === -1) {
      toast.error("Please Select End Date!", toastWarning);
      return;
    }

    if (!submitData?.qualificationId || submitData?.qualificationId === -1) {
      toast.error("Please Select Qualification Type!", toastWarning);
      return;
    }

    if (!submitData?.educationTypeId || submitData?.educationTypeId === -1) {
      toast.error("Please Select Core Area!", toastWarning);
      return;
    }

    if (!submitData?.titleId || submitData?.titleId === -1) {
      toast.error("Please Select Professional Title!", toastWarning);
      return;
    }
    if (!submitData?.grade || submitData?.grade === "") {
      toast.error("Please Enter Grade!", toastWarning);
      return;
    }
    if (!submitData?.school || submitData?.school === "") {
      toast.error("Please Enter School!", toastWarning);
      return;
    }
 
  
   
    
   
let forGrid =
  {
    isDelete : true,
    grade: submitData?.grade,
    school: submitData?.school,
    startDate: submitData?.StartDate,
    endDate: submitData?.endDate,
    educationType: {
      
      
      name: getName(submitData?.educationTypeId,educationCore),
      
      status: true
    },
    title: {
    
      name : getName(submitData?.titleId,titles)
    },
    qualification: {
     
      name : getName(submitData?.qualificationId,qualification)
    }
  }
 



let submit = {
  isDelete: true,
  description: submitData?.description,
  educationTypeId: submitData?.educationTypeId,
  qualificationId : submitData?.qualificationId,
  titleId: submitData?.titleId,
  status: true,
  grade: submitData?.grade,
  startDate: submitData?.StartDate,
  endDate: submitData?.endDate,
  school: submitData?.school
}

  setEmployeeEduInfoChildren((prev)=>[...prev, submit])
setViewInfo((prevState)=>[forGrid,...prevState])
console.log(forGrid);

   setVisible(false)
   dispatch({ type: 'set', data: {} });


  };






  // RENDER DROPDOWN NAMES
  const getName = (id, states) => {
    return states.find((x) => x.id == id)?.name || "Not found";
   };





   const handlePost=()=>{
    let postHobby={
      employeeId: handleId,
      "createEmployeeEducationChildren": EmployeeEduInfoChildren,
      "companyReference": "00001_a01",
      "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
    if( EmployeeEduInfoChildren.length > 0){
      setPostUrl(PostEmployeeEducationInfos())
      setPostData(postHobby)
    }
  
   // console.log(post)
   }

   const  {setData:setPostData, setUrl:setPostUrl} = usePost('', (response) => {
    // console.log({location:response });
    const {data} = response
    if ("" === data) {
      toast.success(GetLabelByName("HCM-HAGGXNJQW2B_HRPR", lan));
      //showToasts();
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
console.log(EmployeeEduInfoChildren);
  function postEmployeeEducationInfo(data) {
    console.log(data);
    PostRequest(PostEmployeeEducationInfos(), { data: data })
      .then((response) => {
        response.text().then((data) => {
          if ("" === data) {
            toast.success("Employee Education Information Added Succesfully!");
            console.log("success");
            getEmployeebyId(submitData.id);
          } else {
            try {
              data = JSON.parse(data);
              toast.error(
                data?.reason
                  ? data?.reason
                  : "Failed to Employee Education Information",
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


  
  const {setOptData, setUrl} =  useFetch("", (response,results) => {
    if (response) {
        if (response && Object.keys(response).length > 0) {
            // setSearchResult(results);
            dispatch({ type: 'set', data: { ...response } });
            setSubmitData({...response});
            setViewInfo((prevState) => response);
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
  // console.log({ baseurl: process.env.REACT_APP_BASE_URL });
  const getEmployeebyId =(id) => {
    setUrl(GetEmployeeById(id))
      
    // try {
    //   const request = await CustomAxios.get(`EmployeeEducation/${handleId}`);

    //   const response = request.data;
    //   setViewInfo((prevState) => response);
    // } catch (error) {
    //   console.log({ error });
    // }
  };

  // console.log("log", viewinfo);
  // useEffect(() => {
  //   if (handleId !== "") {
  //     getEmployeebyId();
  //   }
  // }, [handleId]);

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

  const onConfirm = () => {

    handleDeleteItem();

  };

  const onCancel = () => {

    setIsActive(false);
  
  };
  
  const onCommandClick = (args) => {
    console.log(args.rowData);
    if(args.rowData.isDelete === true){
      args.cancel = false;
      setEmployeeEduInfoChildren((current)=>current.filter((deleteItem) => deleteItem.isDelete !== true));
      setViewInfo((current)=>current.filter((deleteItem) => deleteItem.isDelete !== true))
      return;
    }
    else{
      onCompleteAction(args);
 
    }
  
  };
  
  
  
  
  const onCompleteAction = (args) => {
  
    if (args.commandColumn.type === 'Delete') {
  
      args.cancel = false;
  
      setIsActive(true)
  
      setDelEmployeeName(`${args?.rowData?.employee?.firstName
      } ${args?.rowData?.employee?.lastName
      }`)
  
      setDelEmployeeID(args.rowData.id)
  
    }
  
  };
  
  const handleDeleteItem = async () => {
  
    let deleteData = {
  
  
      transactionId: delEmployeeID,
  
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  
      accountReference: "string"
  
    }
  
    setDeletUrl(DeleteEmployeeEducationInfos())
  
    setDeleteData({ data: deleteData })
  
  
  
  };
  const { setData: setDeleteData, setUrl: setDeletUrl } = useDelete('', (response) => {
  
    // console.log({location:response });
  
    const { data } = response
  
    if (response.status === 200 || response.status === 204) {
  
      toast.success(`${GetLabelByName("HCM-9VWW2UPSTXS-PSLL", lan)}?`);
      
      setIsActive(false);
      setViewInfo("")
      getEmployeebyId(handleId)
      // GetPreviousData(nonCashId);
      getEmployeebyId(handleId)
  
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
title={`${GetLabelByName("HCM-Z3GW6TG207", lan)}?`}
 onConfirm={onConfirm}
 onCancel={onCancel}
 focusCancelBtn
show={isActive}
></SweetAlert>
      <CRow hidden={!show}>
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-ZHMVWWTZ63B_KCMI" />
          </h5>
        </CCol>
      </CRow>
      <CRow hidden={!show}>
        <CCol md="4">
          <CSAutoComplete
            filterUrl={SearchEmployees(searchInput)}
            //filterUrl=''            //filterUrl={SearchInternalCurrencies(searchInput)}
            placeholder={GetLabelByName("HCM-6FKJ6FEGW7A-HRPR", lan)}
            handleSelect={handleSearchResultSelect}
            //onChange={()=>handleSearchResultSelect}
            displayTextKey={"firstName"}
            setInput={setSearchInput}
            input={searchInput}
            emptySearchFieldMessage={GetLabelByName(
              `HCM-HUI7EHKRJW5_LANG`,
              lan
            )}
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
                    <CSLab code="HCM-5RMQ68926X9_HRPR" />{" "}
                  </CButton>
                </CCol>
              </CFormGroup>
            </CCardHeader>
            <CRow style={{ overflowY: "auto" }}>
              <CCol md="12">
                <GridComponent
                  height={450}
                  allowPaging={true}
                  dataSource={viewinfo}
                  commandClick={onCommandClick}
                  //toolbar={toolbarOptions}
                >
                  <ColumnsDirective>
                    <ColumnDirective
                      field={"school"}
                      headerText="School"
                      width="120"
                    />
                    <ColumnDirective
                      field="qualification.name"
                      headerText="Qualification"
                      width="120"
                    />
                    <ColumnDirective
                      field={"grade"}
                      headerText="Grade"
                      width="120"
                    />
                    <ColumnDirective
                      field={"title.name"}
                      headerText="Title"
                      width="120"
                    />
                    <ColumnDirective
                      field={"educationType.name"}
                      headerText="Core Area"
                      width="120"
                    />
                    <ColumnDirective
                      field="startDate"
                      headerText="Start Date"
                      width="100"
                      type="date"
                      format={"dd/MMM/yyyy"}
                    />
                    <ColumnDirective
                      field="endDate"
                      headerText="End Date"
                      width="100"
                      type="date"
                      format={"dd/MMM/yyyy"}
                    />

                    <ColumnDirective
                      commands={commandOptions}
                      color="primary"
                      headerText={"Action"}
                      width="50"
                      textAlign="Center"
                    />
                  </ColumnsDirective>
                  <Inject
                    services={[
                      Page,
                      Sort,
                      Filter,
                      Group,
                      Edit,
                      Toolbar,
                      CommandColumn,
                    ]}
                  />
                </GridComponent>
              </CCol>
            </CRow>
            <CCardFooter style={{ position: 'relative;' }}>
            <CButton
                style={{ marginRight: 5, float: 'right', color: 'white' }}
                  onClick={() => handlePost()}
                  type="button"
                  size="sm" 
                  color="success"
                >
                  <AiFillSave size={20} /> 
                  <CSLab code="HCM-HGUHIR0OK6T" />
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
        <CModalHeader>
          <CModalTitle>
            {" "}
            <CSLab code="HCM-5RMQ68926X9_HRPR" />{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="3">
              <CLabel htmlFor="date">
                <CSLab code="HCM-K85NF9HWVXC-LANG" />
                <CSRequiredIndicator />
              </CLabel>
              <input
              className="form-control"
                name="StartDate"
                id="StartDate"
                type="date"
                ref={startDateRef}

                value={data?.StartDate || -1}
       onChange={(e)=>{handleOnChange(e); checkForValue(startDateRef)}}

                max={moment().format("YYYY-MM-DD")}
              />
            </CCol>
            <CCol md="3">
              <CLabel htmlFor="endDate">
                <CSLab code="HCM-S4N9DCXVMJ" />
                <CSRequiredIndicator />
              </CLabel>
              <input
               className="form-control"
                id="endDate"
                name="endDate"
                type="date"
                ref={endDateRef}
                value={data?.endDate || -1}
                onChange={(e)=>{handleOnChange(e); checkForValue(endDateRef)}}

                max={moment().format("YYYY-MM-DD")}
              />
            </CCol>
            <CCol md="5">
              <CLabel htmlFor="qualification">
                <CSLab code="HCM-AQL471VH30T_LANG" />
                <CSRequiredIndicator />
              </CLabel>
              <select
              className="form-control"
                name="qualificationId"
                value={data?.qualificationId || -1}
                ref={qualificationRef}
                onChange={(e)=>{handleOnChange(e); checkForValue(qualificationRef)}}

              >
                {qualification.map((x, i) => (
                  <option key={i} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </select>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="3">
              <CLabel htmlFor="coreArea">
                <CSLab code="HCM-0GQBD3AIMTXJ_HRPR" />
                <CSRequiredIndicator />
              </CLabel>
              <select
              className="form-control"
                name="educationTypeId"
                ref={coreAreaRef}
                value={data?.educationTypeId || -1}
                onChange={(e)=>{handleOnChange(e); checkForValue(coreAreaRef)}}
              >
                {educationCore.map((x, i) => (
                  <option key={i} value={x.id}>
                    {x.name}
                  </option>
                ))}
                {/* {["Select Core Area", "Core Area 1", "Core Area 2"].map(
                  (x, i) => (
                    <option value={x} key={1}>
                      {x}
                    </option>
                  )
                )} */}
              </select>
            </CCol>
            <CCol md="3">
              <CLabel htmlFor="professionalTitle">
                <CSLab code="HCM-14CIXISPX6X-LANG" />
                <CSRequiredIndicator />
              </CLabel>
              <select
              className="form-control"
                name="titleId"
                ref={proTitle}
                value={data?.titleId || -1}
                onChange={(e)=>{handleOnChange(e); checkForValue(proTitle)}}
              >
                {titles.map((x, i) => (
                  <option key={i} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </select>
            </CCol>
            <CCol md="3">
              <CLabel htmlFor="grade">
                <CSLab code="HCM-P82D0RPB0G-LOLN" />
                <CSRequiredIndicator />
              </CLabel>
              <input
          className="form-control"
                id="grade"
                type="text"
                ref={gradeRef}
                name="grade"
                value={data?.grade || ""}
                onChange={(e)=>{handleOnChange(e); checkForValue(gradeRef)}}
                placeholder={GetLabelByName("HCM-D5ABDMN6RNT_LANG", lan)}
              />
            </CCol>
            <CCol md="3">
              <CLabel htmlFor="school">
                <CSLab code="HCM-2QFYBV7EKOX-HRPR" />
                <CSRequiredIndicator />
              </CLabel>

              <input
               className="form-control"
                id="school"
                type="text"
                name="school"
                ref={schoolRef}
                value={data?.school || ""}
                onChange={(e)=>{handleOnChange(e); checkForValue(schoolRef)}}
                placeholder={GetLabelByName("HCM-TIUPTL2IYO9-KCMI", lan)}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="12">
              <CLabel htmlFor="comment">
                <CSLab code="HCM-XZE49GGWIEJ-PSLL" />
              </CLabel>
              <CTextarea
                id="comment"
                style={{ height: "80px", resize: "none" }}
                name="description"
                value={data?.description || ""}
                onChange={handleOnChange}
              ></CTextarea>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter style={{ position: 'relative;' }}>
       <p style={{ position: "absolute", left: "20px" }}><em style={{ fontSize: "12px" }}><CSLab code="HCM-S6DELVG0IQS-HRPR" /> (<CSRequiredIndicator />)<CSLab code="HCM-H72Q4EB363H_PSLL" /></em></p>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            <CSLab code="HCM-9E3ZC2E1S0N-LASN" />
          </CButton>
          <CButton color="primary">
            <CSLab code="HCM-TAAFD4M071D-HRPR" onClick={()=>handleOnSubmit()} />
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EmployeeEducationInformation;
