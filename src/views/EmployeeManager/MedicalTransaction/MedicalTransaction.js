import React, { useState, useEffect, useRef } from "react";
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
  CCardFooter,
} from "@coreui/react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

import useMultiFetch from "src/hooks/useMultiFetch";
import useFetch from "src/hooks/useFetch";
import usePost from "src/hooks/usePost";
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
// import getClassName from "ui-box/dist/src/get-class-name";
import SweetAlert from "react-bootstrap-sweetalert";
import useDelete from "src/hooks/useDelete";
import useAuth from "src/hooks/useAuth";

const editOptions = {
  allowEditing: false,
  allowAdding: false,
  allowDeleting: false,
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
const [post,setPost]=useState([])
const [delEmployeeName,setDelEmployeeName]=useState("")
const[isActive,setIsActive]=useState(false)
const[delEmployeeID,setDelEmployeeID]=useState("")


const ailmentRef = useRef(null)
const healthCareProvider =useRef(null)
const costRef = useRef(null)
const dateOfVisitRef = useRef(null)

const refs=[
  ailmentRef,
  healthCareProvider,
  costRef,
  dateOfVisitRef
]
const {auth}= useAuth()
  const {companyReference: CompanyReference } = auth

const checkForValue = (ref) => {
  console.log({checkForValue: ref});
  if (ref.current?.value) {
    ref.current.style.border = "1px solid green";
  }
};
  
  const {setOptData, setUrl} =  useFetch("", (response,results) => {
    if (response) {
        if (response && Object.keys(response).length > 0) {
            // setSearchResult(results);
            dispatch({ type: 'set', data: { ...response } });
            setSubmitData(response);
            //setDupData({...response})
            setViewInfo(response)
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
    setSearchResult(results);
    if (results?.id) {

getEmployeeMedicalyById(results.id)
     
    }
  };
  const searchReset = () => {
    setShow(true);
    setSearchInput("");
    setViewInfo("")
    dispatch({ type: "set", data: {} });
    refs.forEach((ref) => {
  
      ref.current.style.border = "1px solid #d8dbe0";
      return

    
  });
  };



  
  const  {data:multicallData} =  useMultiFetch([GetProviderTypes(), 
    GetAilmentType()], (results) => {
      setProviderTypes([
        { id: "-1", name: `Select Provider` },
        ...results[0].data,
      ]);
      setAilmenentType([
        { id: "-1", name: `Select Ailment` },
        ...results[1].data,
      ]);
  
  })


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
    
    if (!submitData?.ailmentTypeId || submitData?.ailmentTypeId === -1 && !submitData?.providorTypeId || submitData?.providorTypeId === ""  &&  !submitData?.dateOfService || submitData?.dateOfService === "") {
      toast.error(GetLabelByName("HCM-WQ9J7737WDC_LASN", lan), toastWarning);
      return;
    }

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
    if (!submitData?.cost || submitData?.cost <  0) {
      toast.error("Please Enter Cost!", toastWarning);
      return;
    }
    setVisible(false);
    let newData = {
      ...submitData,
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      CompanyReference: "00001_A01",
      employeeId : searchResult?.id,
    };
    //let finalData = JSON.stringify(newData)
    console.log(newData)
    // 'Add' === mode ? AddGLAccount(newData) : updateGLAccount(newData);
   // postEmployeeMedical(newData);
let handleNewGridData=
{
 
  "providorTypesDto": {
    "id": submitData?.providorTypeId,
  
    "name": getName(providerTypes,submitData?.providorTypeId ),
   
  },
  "cost": submitData?.cost,
  "dateOfService": submitData?.dateOfService,
  "ailmentTypesDto": {
    "id": submitData?.ailmentTypeId,
    
    "name": getName(ailmentType,submitData?.ailmentTypeId),
   
  },
 

}

   setViewInfo((prevState)=>[handleNewGridData,...prevState])
   setPost(newData)
   setSubmitData("")
   
  };

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

const getName=(data, id)=>{
return data.find(x=>x.id=== id)?.name || "Not Found"
}
  
  const handlePost=()=>{
    setPostData(post)
    setPostUrl(PostEmployeeMedical())
  }
  
  //Post Employee Hobby
  // function postEmployeeMedical(data) {
  //   console.log("post data", data);
  //   PostRequest(PostEmployeeMedical(), { data: data })
  //     .then((response) => {
  //       response.text().then((data) => {
  //         if ("" === data) {
  //           toast.success("Medical Transaction Successful!");
  //           getEmployeeMedicalyById();
  //           console.log("success");
  //         } else {
  //           try {
  //             data = JSON.parse(data);
  //             toast.error(
  //               data?.reason
  //                 ? data?.reason
  //                 : "Failed to Create Medical Transaction",
  //               "error",
  //               400
  //             );
  //           } catch (error) {
  //             console.log(error);
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

  const getEmployeeMedicalyById =(id) => {
    setUrl(GetEmployeeMedical(id))
    // try {
    //   const request = await CustomAxios.get(`EmployeeMedical/${handleId}`);

    //   const response = request.data;
    //   console.log("emp response:", response);
    //   setViewInfo((prevState) => response);
    // } catch (error) {
    //   console.log({ error });
    // }
  };
  // useEffect(() => {
  //   if (handleId !== "") {
  //     getEmployeeMedicalyById();
  //   }
  // }, [handleId]);

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

  const onConfirm = () => {

    handleDeleteItem();

  };

  const onCancel = () => {

    setIsActive(false);
  
  };
  
  const onCommandClick = (args) => {
  // console.log(args);
   onCompleteAction(args);
  
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
      setViewInfo("")
      getEmployeeMedicalyById(handleId)
  
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
title={`${GetLabelByName("HCM-IIQS2WWFTPP_KCMI", lan)} ${GetLabelByName("HCM-VZJ3MPY1WO_LASN", lan)} ${GetLabelByName("HCM-SF00RQBW0XB_PSLL", lan)} ${delEmployeeName}?`}
 onConfirm={onConfirm}
 onCancel={onCancel}
 focusCancelBtn
show={isActive}
></SweetAlert>
      <CRow hidden={!show}>
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-VZJ3MPY1WO_LASN" />
          </h5>
        </CCol>
      </CRow>
      <CRow hidden={!show}>
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
      </CRow>
      <CRow>
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
              height={"350"}
              dataSource={viewinfo}
              allowPaging={true}
              pageSettings={{ pageSize: 10 }}
              editSettings={editOptions}
              commandClick={onCommandClick}
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
                  headerText={GetLabelByName("HCM-3OZ72JARXE-KCMI", lan)}
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
            <CSLab code="HCM-II7ZU68FSX_LANG" />{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className={"bottom-spacing"}>
            <>
              <CCol md="6">
                <CLabel htmlFor="ailmentTypeId">
                  <CSLab code="HCM-QRFDOPK87VI_LASN" />
                  <CSRequiredIndicator />
                </CLabel>
                <select
                className="form-control"
                  name="ailmentTypeId"
                  ref={ailmentRef}
                  value={data.ailmentTypeId || -1}
                  onChange={(e)=>{handleOnChange(e); checkForValue(ailmentRef)}}
                >
                  {ailmentType.map((x, i) => (
                    <option key={i} value={x.id}>
                      {x.name}
                    </option>
                  ))}
                </select>
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="HealthCareProvider">
                  <CSLab code="HCM-D7HKVE8UGRI_LOLN" />
                  <CSRequiredIndicator />
                </CLabel>
                <select
                  name="providorTypeId"
                  ref={healthCareProvider}
                  className="form-control"
                  value={data?.providorTypeId || -1}
                  onChange={(e)=>{handleOnChange(e); checkForValue(healthCareProvider)}}
                >
                  {providerTypes.map((x, i) => (
                    <option key={i} value={x.id}>
                      {x.name}
                    </option>
                  ))}
                </select>
              </CCol>
            </>
          </CRow>
          <CRow className={"bottom-spacing"}>
            <>
              <CCol md="6">
                <CLabel htmlFor="dateOfService">
                  <CSLab code="HCM-I23QDSWPM1D_KCMI" />
                  <CSRequiredIndicator />
                </CLabel>
                <input
          className="form-control"
                  id="dateOfService"
                  ref={dateOfVisitRef}
                  type="date"
                  name="dateOfService"
                  value={data?.dateOfService || -1}
                  onChange={(e)=>{handleOnChange(e); checkForValue(dateOfVisitRef)}}

                  max={moment().format("YYYY-MM-DD")}
                />
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="Cost">
                  <CSLab code="HCM-3OZ72JARXE-KCMI" />
                  <CSRequiredIndicator />
                </CLabel>
                <input
               className="form-control"
                  id="Cost"
                  type="text"
                  ref={costRef}
                  name="cost"
                  value={data?.cost || ""}
                  onChange={(e)=>{handleOnChange(e); checkForValue(costRef)}}

                />
              </CCol>
            </>
          </CRow>
          <CRow className={"bottom-spacing"}>
            <CCol md="6">
              <CLabel htmlFor="Note">
                <CSLab code="HCM-Z0FV0XJJ06" />{" "} <CSRequiredIndicator />
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

export default MedicalTransaction;
