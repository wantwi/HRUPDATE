import React, { useEffect, useState } from "react";
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
import { AiOutlinePlus } from "react-icons/ai";

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
} from "src/reusable/API/EmployeeEducationEndpoints";
import { GetEmployeeAccidentByEmployeeId } from "src/reusable/API/AccidentTransaction";

//GetEducationCoreArea
// HttpAPIRequest
// import { SearchEmployees } from 'src/reusable/API/CurrencyEndpoints';
// GetProfessionalTitles

const commandOptions = [
  {
    type: "Delete",
    buttonOption: { iconCss: "e-icons e-delete", cssClass: "e-flat" },
  },
];

const editOptions = {
  allowEditing: true,
  allowAdding: true,
  allowDeleting: false,
  allowEditOnDblClick: true,
};
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
  const [visible, setVisible] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [viewinfo, setViewInfo] = useState([]);
  const [handleId, setHandleId] = useState("");
  const TransLabelByCode = (name) => GetLabelByName(name, lan);
  const [titles, setProfessionalTitle] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [educationCore, setEducationCore] = useState([]);
  const [empDisplayName, setEmpDisplayName] = useState("");
  // const [postdetails,setPostDetails]= useState([{name:"",gender:""}])

  const MultipleGetRequests = async () => {
    try {
      let request = [
        HttpAPIRequest("GET", GetProfessionalTitles()),
        HttpAPIRequest("GET", GetQualificationTypes()),
        HttpAPIRequest("GET", GetEducationCoreArea()),
      ];
      const multipleCall = await Promise.allSettled(request);
      //console.log(multipleCall[2].value)

      setProfessionalTitle([
        { id: "-1", name: `Select Title` },
        ...multipleCall[0].value,
      ]);
      setQualification([
        { id: "-1", name: `Select Qualification` },
        ...multipleCall[1].value,
      ]);
      setEducationCore([
        { id: "-1", name: `Select Education Core Area` },
        ...multipleCall[2].value,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    MultipleGetRequests();
  }, []);

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

  const handleOnSubmit = () => {
    console.log(submitData);

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
    // if (!submitData?.payPeriodId || submitData?.payPeriodId === '') {
    //     //toast.error('Please select a pay period!', toastWarning);
    //     return;
    // }
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
    postEmployeeEducationInfo(newData);
  };

  function postEmployeeEducationInfo(data) {
    console.log(data);
    PostRequest(PostEmployeeEducationInfos(), { data: data })
      .then((response) => {
        response.text().then((data) => {
          if ("" === data) {
            toast.success("Employee Education Information Added Succesfully!");
            console.log("success");
            getEmployeebyId();
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

  // console.log({ baseurl: process.env.REACT_APP_BASE_URL });
  const getEmployeebyId = async () => {
    try {
      const request = await CustomAxios.get(`EmployeeEducation/${handleId}`);

      const response = request.data;
      setViewInfo((prevState) => response);
    } catch (error) {
      console.log({ error });
    }
  };

  // console.log("log", viewinfo);
  useEffect(() => {
    if (handleId !== "") {
      getEmployeebyId();
    }
  }, [handleId]);

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

  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-ZHMVWWTZ63B_KCMI" />
          </h5>
        </CCol>
      </CRow>
      <CRow>
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
            <CRow style={{ height: CardBodyHeight, overflowY: "auto" }}>
              <CCol md="12">
                <GridComponent
                  height={300}
                  allowPaging={true}
                  dataSource={viewinfo}
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
                      width="150"
                    />
                    <ColumnDirective
                      field={"grade"}
                      headerText="Grade"
                      width="120"
                    />
                    <ColumnDirective
                      field={"title.name"}
                      headerText="Title"
                      width="150"
                    />
                    <ColumnDirective
                      field={"educationType.name"}
                      headerText="Core Area"
                      width="150"
                    />
                    <ColumnDirective
                      field="startDate"
                      headerText="Start Date"
                      width="150"
                      type="date"
                      format={"dd/MMM/yyyy"}
                    />
                    <ColumnDirective
                      field="endDate"
                      headerText="End Date"
                      width="150"
                      type="date"
                      format={"dd/MMM/yyyy"}
                    />

                    {/* <ColumnDirective
                      commands={commandOptions}
                      color="primary"
                      headerText={"Action"}
                      width="50"
                      textAlign="Center"
                    /> */}
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
              <CInput
                className=""
                name="StartDate"
                id="StartDate"
                type="date"
                value={data?.StartDate || -1}
                onChange={handleOnChange}
                max={moment().format("YYYY-MM-DD")}
              />
            </CCol>
            <CCol md="3">
              <CLabel htmlFor="endDate">
                <CSLab code="HCM-S4N9DCXVMJ" />
                <CSRequiredIndicator />
              </CLabel>
              <CInput
                className=""
                id="endDate"
                name="endDate"
                type="date"
                value={data?.endDate || -1}
                onChange={handleOnChange}
                max={moment().format("YYYY-MM-DD")}
              />
            </CCol>
            <CCol md="5">
              <CLabel htmlFor="qualification">
                <CSLab code="HCM-AQL471VH30T_LANG" />
                <CSRequiredIndicator />
              </CLabel>
              <CSelect
                name="qualificationId"
                value={data?.qualificationId || -1}
                onChange={handleOnChange}
              >
                {qualification.map((x, i) => (
                  <option key={i} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </CSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="3">
              <CLabel htmlFor="coreArea">
                <CSLab code="HCM-0GQBD3AIMTXJ_HRPR" />
                <CSRequiredIndicator />
              </CLabel>
              <CSelect
                name="educationTypeId"
                value={data?.educationTypeId || -1}
                onChange={handleOnChange}
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
              </CSelect>
            </CCol>
            <CCol md="3">
              <CLabel htmlFor="professionalTitle">
                <CSLab code="HCM-14CIXISPX6X-LANG" />
                <CSRequiredIndicator />
              </CLabel>
              <CSelect
                name="titleId"
                value={data?.titleId || -1}
                onChange={handleOnChange}
              >
                {titles.map((x, i) => (
                  <option key={i} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </CSelect>
            </CCol>
            <CCol md="3">
              <CLabel htmlFor="grade">
                <CSLab code="HCM-P82D0RPB0G-LOLN" />
                <CSRequiredIndicator />
              </CLabel>
              <CInput
                className=""
                id="grade"
                type="text"
                name="grade"
                value={data?.grade || ""}
                onChange={handleOnChange}
                placeholder={GetLabelByName("HCM-D5ABDMN6RNT_LANG", lan)}
              />
            </CCol>
            <CCol md="3">
              <CLabel htmlFor="school">
                <CSLab code="HCM-2QFYBV7EKOX-HRPR" />
                <CSRequiredIndicator />
              </CLabel>

              <CInput
                className=""
                id="school"
                type="text"
                name="school"
                value={data?.school || ""}
                onChange={handleOnChange}
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
        <CModalFooter>
          <div style={{ marginRight: "350px" }}>
            <p>
              <em>
                All fields marked with asterisk (<CSRequiredIndicator />) are
                required
              </em>
            </p>
          </div>

          <CButton color="secondary" onClick={() => setVisible(false)}>
            <CSLab code="HCM-9E3ZC2E1S0N-LASN" />
          </CButton>
          <CButton color="primary">
            <CSLab code="HCM-HGUHIR0OK6T" onClick={handleOnSubmit} />
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EmployeeEducationInformation;
