import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

  //CommandColumn
} from "@syncfusion/ej2-react-grids";
import { CardBodyHeight, GetRequest, HttpAPIRequest, PostRequest } from "src/reusable/utils/helper";
import { GetLabelByName } from "src/reusable/configs/config";
import { CSLab, CSAutoComplete } from "../../../reusable/components";
import { AiOutlinePlus } from "react-icons/ai";
import { SearchEmployees } from "src/reusable/API/EmployeeEndpoints";
import { CustomAxios } from "src/reusable/API/CustomAxios";
import { GetEducationCoreArea, GetProfessionalTitles, GetQualificationTypes, PostEmployeeEducationInfos } from "src/reusable/API/EmployeeEducationEndpoints";

//GetEducationCoreArea
// HttpAPIRequest
// import { SearchEmployees } from 'src/reusable/API/CurrencyEndpoints';
// GetProfessionalTitles

// const commandOptions = [
//   {
//     type: "Edit",
//     buttonOption: { iconCss: " e-icons e-edit", cssClass: "e-flat" },
//   },
//   {
//     type: "Delete",
//     buttonOption: { iconCss: "e-icons e-delete", cssClass: "e-flat" },
//   },
//   {
//     type: "Save",
//     buttonOption: { iconCss: "e-icons e-update", cssClass: "e-flat" },
//   },
//   {
//     type: "Cancel",
//     buttonOption: { iconCss: "e-icons e-cancel-icon", cssClass: "e-flat" },
//   },
// ];

// const editOptions = {
//   allowEditing: true,
//   allowAdding: true,
//   allowDeleting: false,
//   allowEditOnDblClick: true,
// };

const EmployeeEducationInformation = (props) => {
  const data = useSelector(state => state.data);
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
  const [visible, setVisible] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [viewinfo, setViewInfo] = useState([]);
  const [handleId, setHandleId] = useState("");
  const TransLabelByCode = (name) => GetLabelByName(name, lan);
  const [titles, setProfessionalTitle] = useState([])
  const [qualification, setQualification] = useState([])
  const [educationCore, setEducationCore] = useState([])
  // const [postdetails,setPostDetails]= useState([{name:"",gender:""}])

  const MultipleGetRequests = async () => {
    try {
      let request = [HttpAPIRequest('GET', GetProfessionalTitles()), HttpAPIRequest('GET', GetQualificationTypes()), HttpAPIRequest('GET', GetEducationCoreArea())];
      const multipleCall = await Promise.allSettled(request);
      //console.log(multipleCall[2].value)

      setProfessionalTitle([{ id: '-1', name: `Select Title` }, ...multipleCall[0].value]);
      setQualification([{ id: '-1', name: `Select Qualification` }, ...multipleCall[1].value])
      setEducationCore([{ id: '-1', name: `Select Education Core Area` }, ...multipleCall[2].value])
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    MultipleGetRequests()
  }, []);

  const handleSearchResultSelect = (results) => {
    console.log("show results", results);

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

  const handleOnSubmit = () => {
    console.log(submitData)

    // if (!submitData?.earningId || submitData?.earningId === -1) {
    //     //toast.error('Please select an earning!', toastWarning);
    //     return;
    // }
    // if (!submitData?.unit || submitData?.unit === '') {
    //    // toast.error('Please enter a value for unit!', toastWarning);
    //     return;
    // }
    // if (!submitData?.payPeriodId || submitData?.payPeriodId === '') {
    //     //toast.error('Please select a pay period!', toastWarning);
    //     return;
    // }
    // console.log(submitData)
    let employeeId = submitData.id
    //  let newData = { ...submitData, option: options, companyId: TestCompanyId };
    let newData = {
      ...submitData, "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "userName": "string", "CompanyReference" : "00001_A01", employeeId
    };
    //let finalData = JSON.stringify(newData)
    // console.log(finalData)
    // 'Add' === mode ? AddGLAccount(newData) : updateGLAccount(newData);
    postEmployeeEducationInfo(newData)
  }

  function postEmployeeEducationInfo(data){
    console.log(data)
    PostRequest(PostEmployeeEducationInfos(), {data: data})
      .then(response => {
        response.text().then(data => {
          if ("" === data) {
            // toast.success('Earning Mass Update Successful!',);
            console.log("success")
          } else {
            try {
              data = JSON.parse(data);
              // toaster(toastId, data?.reason ? data?.reason : "Failed to update Currency", 'error', 4000);
            } catch (error) {
              console.log(error);
            }
          }
        });
      })
      .catch(err => {
        console.log({ err })
      })
      .finally(() => {
        console.log('Done');
      }
      );
  }


  // console.log({ baseurl: process.env.REACT_APP_BASE_URL });
  const testApi = async () => {
    try {
      const request = await CustomAxios.get(
        // `http://192.168.0.48:5100/Employees/${handleId}/profile`
        `http://192.168.0.48:5100/EmployeeBio/${handleId}`
        //`${process.env.REACT_APP_BASE_URL}/Employees?companyReference=00001_A01`
      );

      const res = request.data;

      setViewInfo([res]);
      //setViewInfo((nonRecurringData) => [res, ...nonRecurringData]);

      //console.log(`${process.env.REACT_APP_BASE_URL}/Employees?companyReference=00001_A01`)
      // console.log({ searchInput });
    } catch (error) {
      console.log({ error });
    }
  };
  // console.log("log", viewinfo);
  useEffect(() => {
    if (handleId !== "") {
      testApi();
    }
  }, [handleId]);
  const employeeName = viewinfo.map((x) => x.firstName + " " + x.lastName);
  //console.log(employeeName);
  //console.log(handleId);
  //console.log("trials : ", viewinfo[0]);
  // let content;

  const handleOnChange = (evnt) => {
    //console.log(evnt)
    setSubmitData(data => { return { ...data, [evnt?.target?.name]: evnt?.target?.value } })
    dispatch({ type: 'set', data: { ...data, [evnt?.target?.name]: evnt?.target?.value } });
  }

  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="Employee Education Information" />
          </h5>
        </CCol>
      </CRow>
      <CRow>
        <CCol md="4">
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
                    <CSLab code="Add Employee Education Information" />{" "}
                  </CButton>
                </CCol>
              </CFormGroup>
            </CCardHeader>
            {/* address: null
country: "GH"
createdAt: "2022-06-15T10:50:43.7867215"
dateOfBirth: "2001-06-14T14:09:05.366"
digitalAddress: null
email: "michael.ameyaw@persol.net"
firstName: "Michael"
gender: "Male"
isResident: true
lastName: "Ameyaw"
nationalID: null
nationality: "GH"
otherName: "Optional"
phoneNumber: "0244123652"
titleId: "00 */}

            <CRow style={{ height: CardBodyHeight, overflowY: "auto" }}>
              <CCol md="12">
                <GridComponent
                  height={300}
                  allowPaging={true}
                  dataSource={viewinfo}
                >
                  <ColumnsDirective>
                    <ColumnDirective
                      field="firstName"
                      headerText="First Name"
                      width="120"
                    />
                    <ColumnDirective
                      field="lastName"
                      headerText="lastName"
                      width="150"
                    />
                    <ColumnDirective
                      field="email"
                      headerText="email"
                      width="150"
                    />
                    <ColumnDirective
                      field="phoneNumber"
                      headerText="phoneNumber"
                      width="150"
                    />
                  </ColumnsDirective>
                  <Inject services={[Page, Sort, Filter, Group]} />
                </GridComponent>
              </CCol>
            </CRow>
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
            <CSLab code="Add Employee Education Information" />{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="3">
              <CLabel htmlFor="date">
                <CSLab code="Start Date" />
              </CLabel>
              <CInput className="" name="StartDate" id="StartDate" type="date" value={data?.StartDate || -1} onChange={handleOnChange} />
            </CCol>
            <CCol md="3">
              <CLabel htmlFor="endDate">
                <CSLab code="End Date" />
              </CLabel>
              <CInput className="" id="endDate" name="endDate" type="date" value={data?.endDate || -1} onChange={handleOnChange} />
            </CCol>
            <CCol md="6">
              <CLabel htmlFor="qualification">
                <CSLab code="Qualification" />
              </CLabel>
              <CSelect name="qualificationId" value={data?.qualificationId || -1} onChange={handleOnChange}>
                {
                  qualification.map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                }
              </CSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="4">
              <CLabel htmlFor="coreArea">
                <CSLab code="Core Area " />
              </CLabel>
              <CSelect name="educationTypeId" value={data?.educationTypeId || -1} onChange={handleOnChange}>
                {educationCore.map((x, i) => <option key={i} value={x.id}>{x.name}</option>)}
                {/* {["Select Core Area", "Core Area 1", "Core Area 2"].map(
                  (x, i) => (
                    <option value={x} key={1}>
                      {x}
                    </option>
                  )
                )} */}
              </CSelect>
            </CCol>
            <CCol md="4">
              <CLabel htmlFor="professionalTitle">
                <CSLab code="Professional Title" />
              </CLabel>
              <CSelect name="titleId" value={data?.titleId || -1} onChange={handleOnChange}>
                {
                  titles.map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                }
              </CSelect>
            </CCol>
            <CCol md="4">
              <CLabel htmlFor="grade">
                <CSLab code="Grade" />
              </CLabel>
              <CInput className="" id="grade" type="text" name="grade" value={data?.grade || ""} onChange={handleOnChange} />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="12">
              <CLabel htmlFor="comment">
                <CSLab code="Comment" />
              </CLabel>
              <CTextarea
                id="comment"
                style={{ height: "80px", resize: "none" }}
                name="description" value={data?.description || ""} onChange={handleOnChange}
              ></CTextarea>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            <CSLab code="TL50" />
          </CButton>
          <CButton color="primary">
            <CSLab code="TL11" onClick={handleOnSubmit} />
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EmployeeEducationInformation;
