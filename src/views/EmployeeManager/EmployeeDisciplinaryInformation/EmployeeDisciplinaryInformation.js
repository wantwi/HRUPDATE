import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toastWarning } from "src/toasters/Toaster";
import { CustomAxios } from "src/reusable/API/CustomAxios";
import moment from "moment";
import useMultiFetch from "src/hooks/useMultiFetch";
import useFetch from "src/hooks/useFetch";
import usePost from "src/hooks/usePost";
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
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  Sort,
  Edit,
  CommandColumn,

  //CommandColumn
} from "@syncfusion/ej2-react-grids";
import { CardBodyHeight } from "src/reusable/utils/helper";
import { GetLabelByName } from "src/reusable/configs/config";
import {
  CSLab,
  CSAutoComplete,
  CSRequiredIndicator,
} from "../../../reusable/components";
import { AiFillSave, AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { SearchEmployees } from "src/reusable/API/EmployeeEndpoints";

import { LessThanIcon } from "evergreen-ui";
import { BaseURL } from "src/reusable/API/base";
import {
  GetEmployeeOffenceById,
  GetOffenceCategory,
  GetOffenceCategoryRule,
  PostEmployeeDisciplinaryInfo,
} from "src/reusable/API/EmployeeDisciplinaryEndpoints";
import { CardHeader } from "semantic-ui-react";
import useAuth from "src/hooks/useAuth";

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

const editOptions = {
  allowEditing: true,
  allowAdding: true,
  allowDeleting: false,
  allowEditOnDblClick: true,
};

const EmployeeDisciplinaryInformation = (props) => {
  const lan = useSelector((state) => state.language);
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(false);
  const TransLabelByCode = (name) => GetLabelByName(name, lan);

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
  const [offenceCategoryType, setOffenceCategoryType] = useState([]);
  const [offenceCategoryRuleType, setOffenceCategoryRuleType] = useState([]);
  const [handleCategoryTypeID, setHandleCategoryTypeID] = useState("");
const[value, setValueid] =useState("")

const actionByRef= useRef(null);
const actionDateRef = useRef(null);
const incidentDateRef = useRef(null);
const offenceCategoryRef = useRef(null);
const offenceCategoryRuleRef = useRef(null);

const refs = [
  actionByRef,
  actionDateRef,
  incidentDateRef,
]

const refs2 = [
  offenceCategoryRef,
  offenceCategoryRuleRef,
]


const checkForValue = (ref) => {
  console.log({checkForValue: ref});
  if (ref.current?.value) {
    ref.current.style.border = "1px solid green";
  }
};


  const handleSearchResultSelect = (results) => {
    console.log("show results", results);
//setSearchResult(results)
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
getEmployeeOffence(results.id)
      // GetRequest()
      //   .then((response) => {
      //     // toast.dismiss(toastId);
      //     if (response.ok) {
      //       response.json().then((response) => {
              // console.log({response});
            //   if (response && Object.keys(response).length > 0) {
            //     dispatch({ type: "set", data: { ...response } });
            //     setSubmitData({ ...response });
            //     // setDuplicateData({ ...response })
            //     //console.log({ response });

            //     //let rates = response?.rates;

            //     // setExchangeRate(rates);
            //     setShow(false);
            //     setMode("Update");
            //   } else {
            //     setMode("Add");
            //     setShow(false);
            //     // dispatch({ type: 'set', data: { ...results, isHomeCurrency } });
            //     // setSubmitData({ ...results, isHomeCurrency });
            //   }
            // });
        //   }
        // })
        // .catch((err) => {
        //   // console.log(err);
        //   // toaster(toastId, "Failed to retrieve details", 'error', 4000);
        // });
    }
  };
  let uniqueIdKey = uniqueIdKey || "id";

  // const MultipleGetRequests = async () => {
  //   try {
  //     // if (handleCategoryTypeID == "") {
  //     //   setHandleCategoryTypeID(null);
  //     // }
  //     let request = [
  //       HttpAPIRequest("GET", GetOffenceCategory()),
  //       // HttpAPIRequest("GET", GetOffenceCategoryRule(handleCategoryTypeID)),
  //     ];
  //     const multipleCall = await Promise.allSettled(request);

  //     setOffenceCategoryType([
  //       { id: "-1", name: `Select Offence Category` },
  //       ...multipleCall[0].value,
  //     ]);
  //     // setOffenceCategoryRuleType([
  //     //   { id: "-1", name: `Select Offence Type` },
  //     //   ...multipleCall[1].value,
  //     // ]);

  //     console.log("offence category ", offenceCategoryType);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  //Handles category Type Rule

  // const handleNewId = async (value) => {
  //   console.log({ value });
  //   try {
  //     let request = [HttpAPIRequest("GET", GetOffenceCategoryRule(value))];

  //     const multipleCall = await Promise.allSettled(request);
  //     console.log(multipleCall);
  //     setOffenceCategoryRuleType([
  //       { id: "-1", name: `Select Offence Type` },
  //       multipleCall[0].value,
  //     ]);
  //     console.log("offence category ", offenceCategoryType);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const {auth}= useAuth()
  const {companyReference: CompanyReference } = auth

  
  const  {data:multicallData} =  useMultiFetch([ GetOffenceCategory(), 
    GetOffenceCategoryRule()], (results) => {
      setOffenceCategoryType([
        { id: "-1", name: `Select Offence Category` },
        ...results[0].data,
      ]);
      setOffenceCategoryRuleType([ { id: "-1", name: `Select Offence Category Rule` },
      ...results[1].data,])
  
  })
  console.log("ID", handleCategoryTypeID);

  // useEffect(() => {
  //   MultipleGetRequests();
  // }, []);

  //Get employee skill details


  const {setOptData, setUrl} =  useFetch("", (response,results) => {
    if (response) {
        if (response && Object.keys(response).length > 0) {
            setSearchResult(results);
            dispatch({ type: 'set', data: { ...response } });
            setSubmitData({...response});
            setViewInfo((prevState) => response);
            //setDupData({...response})
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
const searchReset = () => {
  setShow(true);
  setSearchInput("");
setViewInfo("")
dispatch({ type: 'set', data: { } });

  // const [grid,] = useState(null);

  // const OnSaveContinueClick = () => {
  //     console.log(grid);
  // }
};
  const getEmployeeOffence =(id) => {
    setUrl(GetEmployeeOffenceById(id))
    // try {
    //   const request = await CustomAxios.get(`EmployeeOffence/${handleId}`);

    //   const response = request.data;
    //   console.log("emp response:", response);
    //   setViewInfo((prevState) => response);
    // } catch (error) {
    //   console.log({ error });
    // }
  };
  // useEffect(() => {
  //   if (handleId !== "") {
  //     getEmployeeOffence();
  //   }
  // }, [handleId]);

  //.console.log(offenceType);

  //Handles Submit
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
    if (!submitData?.actionBy || submitData?.actionBy === ""  && !submitData?.actionDate || submitData?.actionDate === "" && !submitData?.incidentDate || submitData?.incidentDate === ""  && !submitData?.offenceCategoryId ||
    submitData?.offenceCategoryId ===  "-1" && !submitData?.offenceCategoryRuleId ||
    submitData?.offenceCategoryRuleId === "") {
      toast.error(GetLabelByName("HCM-WQ9J7737WDC_LASN", lan), toastWarning);
      return;
    }


    if (!submitData?.actionBy || submitData?.actionBy === "") {
      toast.error("Please Enter Action Takers Name!", toastWarning);
      return;
    }
    if (!submitData?.actionDate || submitData?.actionDate === "") {
      toast.error("Please Select Action Date!", toastWarning);
      return;
    }
    if (!submitData?.incidentDate || submitData?.incidentDate === "") {
      toast.error("Please Select Incident Date!", toastWarning);
      return;
    }
    if (
      !submitData?.offenceCategoryId ||
      submitData?.offenceCategoryId ===  "-1"
    ) {
      toast.error("Please Select Offence Category!", toastWarning);
      return;
    }
    if (
      !submitData?.offenceCategoryRuleId ||
      submitData?.offenceCategoryRuleId === ""
    ) {
      toast.error("Please Select Offence Rule!", toastWarning);
      return;
    }
    // if (!submitData?.description || submitData?.description === "") {
    //   toast.error("Please Enter Offence Description!", toastWarning);
    //   return;
    // }

    // console.log(submitData)
    let employeeId = submitData.id;
    //  let newData = { ...submitData, option: options, companyId: TestCompanyId };


    setVisible(false);
    let newData = {
      ...submitData,
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      CompanyReference: "00001_A01",
      employeeId: searchResult?.id,
    };
    setPostUrl(PostEmployeeDisciplinaryInfo())
    setPostData(newData)
    //postEmployeeDisciplinaryInfo(newData);
  };

  //Post Employee Skill

  const  {setData:setPostData, setUrl:setPostUrl} = usePost('', (response) => {
    // console.log({location:response });
    const {data} = response
    if ("" === data) {
      toast.success(GetLabelByName("HCM-HAGGXNJQW2B_HRPR", lan));
     // showToasts();
      
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

  function postEmployeeDisciplinaryInfo(data) {
    console.log("post data", data);
    PostRequest(PostEmployeeDisciplinaryInfo(), { data: data })
      .then((response) => {
        response.text().then((data) => {
          if ("" === data) {
            toast.success("Disciplinary Information Added Successful!");
            console.log("success");
            getEmployeeOffence();
          } else {
            try {
              data = JSON.parse(data);
              toast.error(
                data?.reason
                  ? data?.reason
                  : "Failed to Add Disciplinary Information",
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
  const handleOnChange = (evnt) => {
    if (evnt?.target?.name === "offenceCategoryId") {
      //handleNewId(evnt?.target?.value);
      setValueid(evnt?.target?.value)
    }
    setSubmitData((data) => {
      return { ...data, [evnt?.target?.name]: evnt?.target?.value };
    });
    dispatch({
      type: "set",
      data: { ...data, [evnt?.target?.name]: evnt?.target?.value },
    });
  };
  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-NEPCALZXIL_PSLL" />
          </h5>
        </CCol>
      </CRow>
      <CRow>
        <CCol md="4">
          <CFormGroup>
            <CSAutoComplete
              filterUrl={SearchEmployees(searchInput)}
              //filterUrl=''            //filterUrl={SearchInternalCurrencies(searchInput)}
              placeholder={GetLabelByName("HCM-6FKJ6FEGW7A-HRPR", lan)}
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
                    <CSLab code="HCM-RZ333PHFH5D_HRPR" />{" "}
                  </CButton>
                </CCol>
              </CFormGroup>
            </CCardHeader>
            <CCardBody style={{ height: CardBodyHeight, overflowY: "auto" }}>
            
              <CCol md="12">
                <GridComponent
                height={450}
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
                      field={"actionBy"}
                      headerText={GetLabelByName("HCM-BLC5UYKD3GO-PSLL", lan)}
                      width="100"
                    />
                    <ColumnDirective
                      field={"incidentDate"}
                      headerText={GetLabelByName("HCM-T0013FX72OI_LASN", lan)}
                      width="100"
                      type="date"
                      format="dd/MMM/yyyy"
                    />
                    <ColumnDirective
                      field={"actionDate"}
                      headerText={GetLabelByName("HCM-S3239KDC9DF-PSLL", lan)}
                      width="100"
                      type="date"
                      format="dd/MMM/yyyy"
                    />
                    {/* <ColumnDirective
                      field={""}
                      headerText={GetLabelByName("HCM-LPKSSIUHVFE_PSLL", lan)}
                      width="100"
                    /> */}
                    {/* <ColumnDirective
                      field={""}
                      headerText={GetLabelByName("HCM-84Y7SXTY7GN-KCMI", lan)}
                      width="100"
                    /> */}
                    <ColumnDirective
                      field={"offenceCategoryRule.name"}
                      headerText={GetLabelByName("HCM-0XL423ZC1SCL_HRPR", lan)}
                      width="100"
                    />
                    {/* <ColumnDirective
                      field={""}
                      headerText={GetLabelByName("HCM-00FJ4VU93MK0D_LOLN", lan)}
                      width="100"
                    /> */}

                    <ColumnDirective
                      field={"description"}
                      headerText={GetLabelByName("HCM-9FY7YTVZ1I4", lan)}
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
              </CCol>
            </CCardBody>
            <CCardFooter style={{ position: 'relative;' }}>
            {/* <CButton
                style={{ marginRight: 5, float: 'right', color: 'white' }}
                  onClick={() => handlePost()}
                  type="button"
                  size="sm" 
                  color="success"
                >
                  <AiFillSave size={20} /> 
                  <CSLab code="HCM-HGUHIR0OK6T" />
                </CButton> */}
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
            <CSLab code="HCM-N7FFV235UCR_KCMI" />{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="4">
              <CLabel htmlFor="	actionBy">
                <CSLab code="HCM-BLC5UYKD3GO-PSLL" />
                <CSRequiredIndicator />
              </CLabel>
              <input
              className="form-control"
              ref={actionByRef}
                name="actionBy"
                type="text"
                value={data?.actionBy || " "}
                onChange={(e)=>{handleOnChange(e); checkForValue(actionByRef)}}
                placeholder={GetLabelByName("HCM-BLC5UYKD3GO-PSLL", lan)}
              />
            </CCol>
            <CCol md="4">
              <CLabel htmlFor="actionDate">
                <CSLab code="HCM-S3239KDC9DF-PSLL" />
                <CSRequiredIndicator />
              </CLabel>
              <input
               className="form-control"
               ref={actionDateRef}
                name="actionDate"
                id="actionDate"
                type="date"
                value={data?.actionDate || ""}
                onChange={(e)=>{handleOnChange(e); checkForValue(actionDateRef)}}
                max={moment().format("YYYY-MM-DD")}
              />
            </CCol>

            <CCol md="4">
              <CLabel htmlFor="incidentDate">
                <CSLab code="HCM-T0013FX72OI_LASN" />
                <CSRequiredIndicator />
              </CLabel>
              <input
               className="form-control"
               ref={incidentDateRef}
                name="incidentDate"
                id="incidentDate"
                type="date"
                value={data?.incidentDate || ""}
                onChange={(e)=>{handleOnChange(e); checkForValue(incidentDateRef)}}
                max={moment().format("YYYY-MM-DD")}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="4">
              <CLabel htmlFor="offence">
                <CSLab code="HCM-2E10YDIBMZQ_LASN" />
                <CSRequiredIndicator />
              </CLabel>
              <select
              className="form-control"
                name="offenceCategoryId"
                ref={offenceCategoryRef}
                onChange={(e)=>{handleOnChange(e); checkForValue(offenceCategoryRef)}}
                value={data?.offenceCategoryId || -1}
                
              >
                {offenceCategoryType.map((x, i) => (
                  <option key={i} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </select>
            </CCol>

            <CCol md="4">
              <CLabel htmlFor="offenceCategoryRuleId">
                <CSLab code="HCM-1PWPBZG8B09-LASN" />
                <CSRequiredIndicator />
              </CLabel>
              <select
               className="form-control"
               ref={offenceCategoryRuleRef}
                name="offenceCategoryRuleId"
                value={data?.offenceCategoryRuleId || -1}
                onChange={(e)=>{handleOnChange(e); checkForValue(offenceCategoryRuleRef)}}
              >
                {offenceCategoryRuleType.map((x, i) => (
                  <option key={i} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </select>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="12">
              <CLabel htmlFor="description">
                <CSLab code="HCM-9FY7YTVZ1I4" />
                <CSRequiredIndicator />
              </CLabel>
              <CTextarea
                id="description"
                name="description"
                style={{ height: "80px", resize: "none" }}
                value={data?.description || " "}
                onChange={handleOnChange}
              ></CTextarea>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <div
            style={{
              fontSize: "12px",
              marginRight: "400px",
              marginBottom: "-24px",
            }}
          >
            <p>
              <em>
                <CSLab code="HCM-WKZ2Y0KPTT9-PSLL" /> (
                <CSRequiredIndicator />)
              </em>
            </p>
          </div>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            <CSLab code="HCM-9E3ZC2E1S0N-LASN" />
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
           
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

export default EmployeeDisciplinaryInformation;
