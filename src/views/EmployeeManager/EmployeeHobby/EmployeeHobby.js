import React, { useState, useEffect, useRef } from "react";
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
  CCardFooter,
} from "@coreui/react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
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
  GetEmployeeHobbyTypes,GetEmployeeByid, DeleteEmployeeHobbies
} from "src/reusable/API/EmployeeHobbyEndPoints";
import Select from "react-select";

import { MultiValue } from "src/templates/maxvalue/maxvalue";
import { customStyles } from "src/templates/maxvalue/maxvalue";
import useMultiFetch from "src/hooks/useMultiFetch";
import useFetch from "src/hooks/useFetch";
import usePost from "src/hooks/usePost";
import useDelete from "src/hooks/useDelete";
import SweetAlert from "react-bootstrap-sweetalert";




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
  const [employeeHobby, setEmployeeHobbyby] = useState([]);
  const [unitId, setUnitValue] = useState([]);
  const [checkedHobby, setCheckedHobbyTypes] = useState();
  const [delEmployeeName,setDelEmployeeName]=useState("")
  const[isActive,setIsActive]=useState(false)
  const[delEmployeeID,setDelEmployeeID]=useState("")
  const[EmployeeHobbyChildren,setEmployeeHobbyChildren]=useState([])


  const hobbyRef =useRef([]);


  const refs = [
    hobbyRef,

  ]
  


  const checkForValue = (ref) => {
    console.log({checkForValue: ref.current.value});
    if (ref.current?.value) {
      ref.current.style.border = "1px solid green";
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

  
  //Drop down list for hobby types
  const  {data:multicallData} =  useMultiFetch([ GetEmployeeHobbyTypes()], (results) => {
    setHobbyTypes([ ...results[0].data]);
   
  })

  const handleOnSubmit = () => {

    // refs.forEach((ref) => {
    
    //   if (ref.current.props.value < 1) {
    //     ref.current.style.border = "2px solid green";
    //   }else if (ref.current.value.length === -1) {
    //     ref.current.style.border = "2px solid red";
    //     console.log("second");
    //   } else if (ref.current.value === "") {
    //     ref.current.style.border = "2px solid red";
    //     console.log("third");

    //   } else {
    //     ref.current.style.border = "2px solid red";
       
    //     return
 
    //   }
    // });
    // if (!unitId.length || unitId.length < 1 ) {
    //   toast.error(GetLabelByName("HCM-WQ9J7737WDC_LASN", lan), toastWarning);
    //   return;
    // }

     if (unitId.length < 1) {
       toast.error("Please Select Hobby Type!", toastWarning);
       return;
    }
   
    let employeeId = submitData.id;
    //  let newData = { ...submitData, option: options, companyId: TestCompanyId };
    setVisible(false);
    
    let newData = {
    
      hobbyTypeId: `${unitId[0]}  `,
      employeeId: searchResult?.id,
      companyReference: "00001_a01",
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    };
    let gridView= {
      
      "hobbyType": {
        id: `${unitId.map((x)=> x)}`,
        
        "name": getName(hobbyTypes,`${unitId.map((x)=>x)}`),
       
      },
      "employee": {
        
        "firstName": searchResult?.firstName,
        "lastName": searchResult?.lastName,
       
      }
    }


 

    setEmployeeHobbyChildren((prev)=>[...prev, gridView?.hobbyType?.id])
setEmployeeHobbyby(newData)
    setViewInfo((prevState)=>[gridView,...prevState])
    //console.log(gridView)

    //postEmployeeHobby(newData);
    fanf()
console.log(unitId);
  };


const fanf=()=>{
  unitId.map((x)=> console.log(x))
}



const handlePost=()=>{
  let postBody={
    employeeId: handleId,
    "createEmployeeHobbyChildren": EmployeeHobbyChildren,
    "companyReference": "00001_a01",
    "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
       setPostUrl(PostEmployeeHobbies())
     setPostData(postBody)
}


const getName=(data,id)=>{
  return data.find(x=>x.id === id)?.name || "Not Found"
}
  const  {setData:setPostData, setUrl:setPostUrl} = usePost('', (response) => {
    // console.log({location:response });
    const {data} = response
    if ("" === data) {
      toast.success(GetLabelByName("HCM-HAGGXNJQW2B_HRPR", lan));
      // getEmployeeHobbybyId(searchResult?.id);
    //  showToasts();
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
      getEmployeeHobbybyId(results?.id)
    }
  };


  const {setOptData, setUrl} =  useFetch("", (response,results) => {
    if (response) {
      console.log(response)
        if (response && Object.keys(response).length > 0) {

            dispatch({ type: 'set', data: { ...response } });
            setSubmitData({...response});
          setViewInfo(response)
            setMode('Update');
            setShow(false);
        } else {
            setMode('Add');
            setShow(false);
            dispatch({ type: 'set', data: { ...response } });
            setSubmitData({response });
        }
    }
});

  const getEmployeeHobbybyId =  (id) => {
    setUrl(GetEmployeeByid(id))
    // try {
    //   const request = await CustomAxios.get(`EmployeeHobbies/${handleId}`);

    //   const response = request.data;
    //   console.log("emp response:", response);
    //   setViewInfo((prevState) => response);
    // } catch (error) {
    //   console.log({ error });
    // }
  };
  // useEffect(() => {
  //   if (handleId !== "") {
  //     getEmployeeHobbybyId();
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

  const handleUnit = (e) => {
    console.log(e);
    setUnitValue(Array.isArray(e) ? e.map((x) => x.id) : []);
    
  };

  var hobbyDropDownArr = [];
  const checkHobbyTypes = () => {
    if (viewinfo.length > 0) {
      for (let i = 0; i < viewinfo.length; i++) {
        var obj = {};
        obj = viewinfo[i].hobbyType;
        hobbyDropDownArr.push(obj);
      }

      const newdata = hobbyTypes.filter((val) => {
        return !hobbyDropDownArr.find((arr) => {
          console.log({ valueID: val.id + "::: " + arr.id });
          return val.id === arr.id;
        });
      });
      if (newdata.length == 0) {
        toast.error("All Employee Skills Have Been Selected");
      } else {
        setCheckedHobbyTypes(newdata);
      }
    } else {
      setCheckedHobbyTypes(hobbyTypes);
    }
  };
  console.log(viewinfo);


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
  
      transactionId: delEmployeeID,
  
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  
      accountReference: "string"
  
    }
  
    setDeletUrl(DeleteEmployeeHobbies())
  
    setDeleteData({ data: deleteData })
  
  
  
  };
  const { setData: setDeleteData, setUrl: setDeletUrl } = useDelete('', (response) => {
  
    // console.log({location:response });
  
    const { data } = response
  
    if (response.status === 200 || response.status === 204) {
  
      toast.success('Employee Language Deleted Successfully!',);
  
      setIsActive(false);
      setViewInfo("")
      getEmployeeHobbybyId(handleId)
    
      // GetPreviousData(nonCashId);
  
    } else {
  
      toast.error('Transaction Failed, Please try agin later!', toastWarning);
  
    }
  
  
  
  })
console.log(educationCore);
  return (
    <>
    
 <SweetAlert
 warning
showCancel
 confirmBtnText="Yes, delete it!"
confirmBtnBsStyle="danger"
 title={`${GetLabelByName("HCM-IIQS2WWFTPP_KCMI", lan)} ${GetLabelByName("HCM-DXF3IK0PP9V-HRPR", lan)} ${GetLabelByName("HCM-SF00RQBW0XB_PSLL", lan)} ${delEmployeeName}?`}
 onConfirm={onConfirm} 
 onCancel={onCancel}
 focusCancelBtn
show={isActive}
></SweetAlert>
      <CRow hidden={!show}>
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-DXF3IK0PP9V-HRPR" />
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
                      checkHobbyTypes();
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
                  height={350}
                  dataSource={viewinfo}
                  allowPaging={true}
                  pageSettings={{ pageSize: 10 }}
                  editSettings={editOptions}
                  commandClick={onCommandClick}
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
                      headerText={GetLabelByName("HCM-KPH53NF08RG", lan)}
                      width="100"
                    />
                    <ColumnDirective
                      field={"employee.lastName"}
                      headerText={GetLabelByName("HCM-6CU7NZJCKLF", lan)}
                      width="100"
                    />

                    <ColumnDirective
                      field="hobbyType.name"
                      headerText={GetLabelByName("HCM-7NAYG6MHKMA-KCMI", lan)}
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
              </>
            </CForm>
            <CCardFooter>
            <CButton onClick={handlePost} style={{ marginRight: 5, float: "right" }} type="submit" size="sm" color="success" >
                <CIcon name="cil-scrubber" /> Submit
              </CButton>
              <CButton name='Cancel'  style={{ marginRight: 5, float: 'right', color: 'white' }} onClick={() => searchReset()} type="button" size="sm" color='danger' ><AiOutlineClose size={20} /><CSLab code = 'HCM-V3SL5X7PJ9C-LANG' /></CButton>

          
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>

      {checkedHobby && (
        <CModal
          show={visible}
          size={"md"}
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
                <CCol md="12">
                  <CLabel htmlFor="hobbyTypeId">
                    <CSLab name="hobbyTypeId" code="HCM-7NAYG6MHKMA-KCMI" />
                    <CSRequiredIndicator />
                  </CLabel>

                  <Select
                    //defaultValue={[colourOptions[2], colourOptions[3]]}

                    //onFocus={() => setIsDisabled(!isDisabled)}
                    ref={hobbyRef}
                    onChange={(e)=>{handleUnit(e);checkForValue(hobbyRef)}}
                    isMulti
                    name="unit"
                    options={checkedHobby}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    className="general-ledger-account-select"
                    classNamePrefix="mySelect"
                    value={checkedHobby?.filter((obj) =>
                      unitId.includes(obj.id)
                    )}
                    components={{ MultiValue }}
                    styles={customStyles}
                    placeholder={<CSLab code={"Select Hobby"} />}
                  />
                </CCol>
              </>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <p
              style={{
                fontSize: "10px",
                marginRight: "291px",
                marginBottom: "-34px",
              }}
            >
              <em>
                <CSLab code="HCM-LVXUVAB9G_KCMI" />( <CSRequiredIndicator />)
              </em>
            </p>
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
      )}
    </>
  );
};

export default EmployeeHobby;
