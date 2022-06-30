import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FileUploader } from "react-drag-drop-files";
import { SearchEmployees } from "src/reusable/API/EmployeeEndpoints";
import CIcon from "@coreui/icons-react";
import {
  CInputGroup,
  CInput,
  CCard,
  CCardBody,
  CFormGroup,
  CForm,
  CCol,
  CRow,
  CTabs,
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CLabel,
  CCardFooter,
  CSelect,
  CTextarea,
  CInputGroupPrepend,
  CModal,
  CModalBody,
} from "@coreui/react";
import {
  AiOutlinePlus,
  AiOutlineEye,
  AiOutlineClose,
  AiFillSave,
  AiOutlineRedo,
  AiFillCloseCircle,
} from "react-icons/ai";
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
import { DataManager, Query } from "@syncfusion/ej2-data";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import { getValue } from '@syncfusion/ej2-base';
import {
  GetRequest,
  HttpAPIRequest,
  PostRequest,
} from "src/reusable/utils/helper";
import {
  BoolStatus,
  CardBodyHeight,
  MultipleGetRequest,
  TestCompanyId,
} from "src/reusable/utils/helper";
//import { GetLabelByName } from 'src/reusable/configs/config';
import {
  CSAutoComplete,
  CSCheckbox,
  CSDivider,
  CSLab,
  CSLineLabel,
  CSRequiredIndicator,
} from "../../../reusable/components";
import "../../../scss/_custom_table.scss";
import { glAccountData } from "src/views/GenericParameters/data/DataModel";
import GLComponent from "src/views/GenericParameters/GenericParam/GLComponent";
import Loader from "src/Loader/Loader";
import {
  GetBankBranchesByBandId,
  GetBanks,
  GetCurrencies,
  GetGLAccounts,
  GetsalaryGrade,
  GetsalaryGradeNotch,
  GetSupervisorGroup,
  SearchEmployeeByNameOrCode,
  GetOrgsByType,
} from "src/reusable/API/EmployeeDetailsEndpoints";
import { CImage } from "@coreui/bootstrap-react";
import { CustomAxios } from "src/reusable/API/CustomAxios";
import { GetLabelByName } from "src/reusable/configs/config";
// import Loader from 'src/Loader/Loader';

const toaster = (toastId, message, type, time) => {
  switch (type) {
    case "info":
      toast.info(message, {
        position: "top-right",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        isLoading: false,
      });
      break;
    case "error":
    case "success":
    case "warning":
      toast.update(toastId, {
        render: message,
        type,
        position: "top-right",
        autoClose: 5000,
        //delay: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        isLoading: false,
      });
      break;
    default:
      break;
  }
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
];
const editOptions = {
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true,
  mode: "Normal",
};
const toolbarOptions = ["Add", "Cancel"];

const paymentOptions = [
  { name: "Bank", id: "1", stateId: "101" },
  { name: "Mobile Money", id: "2", stateId: "102" },
  { name: "Cash", id: "3", stateId: "103" },
];

const paymentOpts = {
  params: {
    actionComplete: () => false,
    allowFiltering: true,
    dataSource: new DataManager(paymentOptions),
    fields: { text: "name", value: "name" },
    query: new Query(),
  },
};

const FileTypes = ["jpg", "png", "gif", "jpeg"];

const EmployeeDetail = (props) => {
  const lan = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  const [show, setShow] = useState(true);
  const [submitData, setSubmitData] = useState({});
  const [options, setOptions] = useState({});
  const [activeKey, setActiveKey] = useState(1);
  const [visible, setVisible] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [salaryGrade, setSalaryGrade] = useState([]);
  const [supervisorGroup, setSupervisorGroup] = useState([]);
  const [notch, setNotch] = useState([]);
  const [file, setFile] = useState(null);
  const [phone, setPhone] = useState(null);
  const [banks, setBanks] = useState([]);
  const [bankBranches, setBankBranches] = useState([]);
  const [orgGLAccounts, setOrgGLAccounts] = useState({});
  const [gLAccountData, setGLAccountData] = useState([]);
  const [mode, setMode] = useState("");
  const [Orgs, setOrgs] = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfItems, setNumberOfItems] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const [searchInput, setSearchInput] = useState("");

  const [viewinfo, setViewInfo] = useState([]);
  const [empDisplayName, setEmpDisplayName] = useState([]);

  const [handleId, setHandleId] = useState("");

  const handleFileChange = (file) => {
    setFile(file);
  };

  const setNotche = async (event) => {
    const result = await (
      await fetch(GetsalaryGradeNotch(event.target.value))
    ).json();
  };

  const getType = async () => {
    let results = [],
      resultObject = {};
    let types_urls = [
      fetch(GetOrgsByType(2)),
      fetch(GetOrgsByType(3)),
      fetch(GetOrgsByType(4)),
      fetch(GetOrgsByType(5)),
    ];

    const res = await Promise.allSettled(types_urls);

    res.forEach(async (x, index) => {
      resultObject = {
        index: await x.value.json(),
      };
    });

    setTimeout(() => console.log({ resultObject }), 1000);
  };

  useEffect(() => {
    getType();
    const urls = [
      GetCurrencies(),
      GetsalaryGrade(),
      GetsalaryGradeNotch(),
      GetSupervisorGroup(),
      GetGLAccounts(),
      GetBanks(),
      GetBankBranchesByBandId(),
      GetOrgsByType(),
    ];

    if (urls) {
      MultipleGetRequest(urls)
        .then((response) => {
          if (response && response.length === urls.length) {
            if (response[0].ok) {
              response[0].json().then((data) => {
                setCurrencies([
                  {
                    id: "00000000-0000-0000-0000-000000000000",
                    name: `Select Currency`,
                  },
                  ...data,
                ]);
              });
            }
            if (response[1].ok) {
              response[1].json().then((data) => {
                setSalaryGrade([
                  {
                    id: "00000000-0000-0000-0000-000000000000",
                    name: `Select Salary Grade`,
                  },
                  ...data,
                ]);
              });
            }
            if (response[2].ok) {
              response[2].json().then((data) => {
                setNotch([
                  { id: "00000000-0000-0000-0000-000000000000", name: `Notch` },
                  ...data,
                ]);
              });
            }
            if (response[3].ok) {
              response[3].json().then((data) => {
                console.log({ data });
                setSupervisorGroup([
                  {
                    id: "00000000-0000-0000-0000-000000000000",
                    name: `Select Supervisor Group`,
                  },
                  ...data,
                ]);
              });
            }
            if (response[4].ok) {
              response[4].json().then((data) => {
                setGLAccountData([
                  {
                    id: "00000000-0000-0000-0000-000000000000",
                    name: `Select Supervisor Group`,
                  },
                  ...data,
                ]);
              });
            }
            if (response[5].ok) {
              response[5].json().then((data) => {
                setBanks([
                  {
                    id: "00000000-0000-0000-0000-000000000000",
                    name: `Select Supervisor Group`,
                  },
                  ...data,
                ]);
              });
            }
            if (response[6].ok) {
              response[6].json().then((data) => {
                setBankBranches([
                  {
                    id: "00000000-0000-0000-0000-000000000000",
                    name: `Select Supervisor Group`,
                  },
                  ...data,
                ]);
              });
            }
            if (response[7].ok) {
              response[7].json().then((data) => {
                console.log({ data });
                //  setBankBranches([{ id: '00000000-0000-0000-0000-000000000000', name: `Select Supervisor Group` }, ...data]);
              });
            }
          }
        })
        .catch((err) => {
          console.log({ err });
        })
        .finally(() => {
          console.log("Done");
        });
    }
  }, []);

  const [files, setFiles] = useState("");

  // Handles file upload event and updates state
  function handleUpload(event) {
    setFiles(event.target.files[0]);

    // Add code here to upload file to server
    // ...
  }

  const ImageThumb = ({ image }) => {
    return <img src={URL.AddObjectURL(image)} alt={image.name} />;
  };

  const handleCheckboxChange = (evnt) => {
    setOptions((data) => {
      return { ...data, [evnt?.target?.name]: evnt?.target?.checked };
    });
    let option = {
      ...data?.options,
      [evnt?.target?.name]: evnt?.target?.checked,
    };
    dispatch({ type: "set", data: { ...data, option, options: option } });
  };

  const searchReset = () => {
    setShow(true);
    setSearchInput("");
  };

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

  const getEmployeeDetails = async () => {
    try {
      const request = await CustomAxios.get(`EmployeeBio/${handleId}`);
      const response = request.data;
      setViewInfo(response);
      console.log(request);
      // console.log({ searchInput });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getEmployeeDetails();
    console.log(viewinfo);
  }, []);

  const handleAddNewRecord = () => {
    setMode("Add");
    setShow(false);
  };

  const handleOnChange = (evnt) => {
    setSubmitData({ ...data, [evnt?.target?.name]: evnt?.target?.value });
    dispatch({
      type: "set",
      data: { ...data, [evnt?.target?.name]: evnt?.target?.value },
    });

    //console.log(`${evnt?.target?.name}`, `${evnt?.target?.value}`)
  };

  const onGLChange = (evnt) => {
    setOrgGLAccounts({
      ...orgGLAccounts,
      [evnt?.target?.name]: evnt?.target?.value,
    });
  };

  const handleOnSubmit = () => {
    let newData = { ...submitData, option: options, companyId: TestCompanyId };
    console.log(newData);
    //'ss' === mode ? createGLAccount(newData) : updateGLAccount(newData);
  };
  console.log(handleId);
  console.log(viewinfo);

  return (
    <>
      <CRow>
        <CCol md="1"></CCol>
        <CCol xs="12">
          <h5>
            <CRow>
              <CCol xs="12">
                <CSLab
                  code={
                    !show ? mode + " Employee Details" : "HCM-2DVGKL0FBGW_HRPR"
                  }
                />
              </CCol>
            </CRow>
          </h5>
        </CCol>
      </CRow>
      <CRow hidden={!show ? true : false}>
        <CCol md="4" xs="7">
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
        <CCol md="8" xs="5" className="text-right">
          <CFormGroup>
            <CButton
              type="button"
              onClick={handleAddNewRecord}
              size="sm"
              color="primary"
            >
              {" "}
              <AiOutlinePlus />{" "}
              {show ? <CSLab code="HCM-TAAFD4M071D-HRPR" /> : null}{" "}
            </CButton>
          </CFormGroup>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" hidden={show}>
          <CCard>
            <CCardBody style={{ height: CardBodyHeight, overflowY: "auto" }}>
              <CForm action="" method="post">
                <CTabs>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink
                        href="#"
                        active={activeKey === 1}
                        onClick={() => setActiveKey(1)}
                      >
                        <CSLab code="HCM-HZU4WPFB1L9-LASN" />
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink
                        href="#"
                        active={activeKey === 2}
                        onClick={() => setActiveKey(2)}
                      >
                        <CSLab code="HCM-GQR50DATROE_PSLL" />
                      </CNavLink>
                    </CNavItem>

                    <CNavItem>
                      <CNavLink
                        href="#"
                        active={activeKey === 3}
                        onClick={() => setActiveKey(3)}
                      >
                        <CSLab code="HCM-11LBZZDSTTE-HRPR" />
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink
                        href="#"
                        active={activeKey === 4}
                        onClick={() => setActiveKey(4)}
                      >
                        <CSLab code="HCM-TNH48GNHQW-LANG" />
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink
                        href="#"
                        active={activeKey === 5}
                        onClick={() => setActiveKey(5)}
                      >
                        <CSLab code="HCM-DIFIO6DCZ8-PSLL" />
                      </CNavLink>
                    </CNavItem>
                  </CNav>

                  <CTabContent>
                    <CTabPane
                      style={{ marginTop: "10px" }}
                      visible={activeKey === 1 ? "true" : "false"}
                    >
                      <CRow className={"bottom-spacing"}>
                        {/* Details */}
                        <CCol md="6">
                          <CRow>
                            <CCol md="4" xs="4">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-KZPKH8ICPD-PSLL" />{" "}
                              </CLabel>
                              <CInput
                                name="title"
                                value={data?.title || ""}
                                onChange={handleOnChange}
                              />
                            </CCol>
                            <CCol md="4" xs="8">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-KPH53NF08RG" />{" "}
                              </CLabel>
                              <CInput
                                name="firstName"
                                value={data?.firstName || ""}
                                onChange={handleOnChange}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-ZYCFSGCKMC" />{" "}
                              </CLabel>
                              <CInput
                                name="lastName"
                                value={data?.lastName || ""}
                                onChange={handleOnChange}
                              />
                            </CCol>
                          </CRow>

                          <CRow>
                            <CCol md="4">
                              <CLabel>
                                {" "}
                                <CSLab code="HCM-S2MUMDYJNP_HRPR" />{" "}
                              </CLabel>
                              <CInput
                                name="otherName"
                                value={data?.otherName || ""}
                                onChange={handleOnChange}
                              />
                            </CCol>

                            <CCol md="4" xs="6">
                              <CLabel>
                                <CSLab code="HCM-7HTWFD0THEN-PSLL" />
                              </CLabel>
                              <CSelect
                                name="gender"
                                value={data?.gender || -1}
                                onChange={handleOnChange}
                              >
                                {["Select Gender", "Male", "Female"].map(
                                  (x, i) => (
                                    <option key={i} value={x}>
                                      {x}
                                    </option>
                                  )
                                )}
                              </CSelect>
                            </CCol>
                            <CCol md="4" xs="6">
                              <CLabel>
                                <CSLab code="HCM-XYNVK7A8USK_PSLL" />
                              </CLabel>
                              <CInput
                                name="dateOfBirth"
                                value={data?.dateOfBirth || ""}
                                onChange={handleOnChange}
                                type="date"
                              />
                            </CCol>
                          </CRow>

                          <CRow>
                            <CCol md="12" style={{ marginTop: "5px" }}>
                              <CSLineLabel name={"Contact Info"} />
                            </CCol>
                            <CCol md="5">
                              <CLabel>
                                <CSLab code="HCM-L8D4N8LGAS_PSLL" />
                              </CLabel>
                              <CInput
                                name="emailAddress"
                                value={data?.emailAddress || ""}
                                onChange={handleOnChange}
                              />
                            </CCol>
                            <CCol md="4" xs="6">
                              <CLabel>
                                <CSLab code="HCM-28JQRN57PA4-PSLL" />
                              </CLabel>
                              {/* <CInput className="" id="phone" /> */}
                              <PhoneInput
                                placeholder="Phone"
                                value={data?.phoneNumber || ""}
                                onChange={setPhone}
                              />
                            </CCol>
                            <CCol md="3" xs="6">
                              <CLabel>
                                <CSLab code="HCM-W7SKIIIFCKE_PSLL" />
                              </CLabel>
                              <CInput
                                name="digitalAddress"
                                value={data?.digitalAddress || ""}
                                onChange={handleOnChange}
                              />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="12">
                              <CLabel>
                                <CSLab code="HCM-LZJUGBQ5RPP_KCMI" />
                              </CLabel>
                              <CTextarea
                                name="homeAddress"
                                value={data?.homeAddress || ""}
                                onChange={handleOnChange}
                                style={{ height: "60px", resize: "none" }}
                              ></CTextarea>
                            </CCol>
                          </CRow>
                        </CCol>

                        <CSDivider style={{ height: "100%" }} md="1" />

                        <CCol md="5">
                          <CRow>
                            <CCol md="6" xs="6">
                              <CLabel>
                                <CSLab code="HCM-CSKVMLLGNW" />
                              </CLabel>
                              <CSelect
                                name="countryId"
                                value={data?.countryId || -1}
                                onChange={handleOnChange}
                              >
                                {[
                                  "Select Country",
                                  "Ghana",
                                  "Togo",
                                  "Burkina Faso",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="6" xs="6">
                              <CLabel>
                                <CSLab code="HCM-IM8I8SKJ1J9_KCMI" />
                              </CLabel>
                              <CSelect
                                name="nationalityId"
                                value={data?.nationalityId || -1}
                                onChange={handleOnChange}
                              >
                                {[
                                  "Select Nationality",
                                  "Ghanaian",
                                  "Togolese",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="6" xs="7">
                              <CLabel>
                                <CSLab code="HCM-WRKPLF34TW_LOLN" />
                              </CLabel>
                              <CInput
                                name="nationalID"
                                value={data?.nationalId || ""}
                                onChange={handleOnChange}
                              />
                            </CCol>
                            <CCol md="2" xs="5" style={{ marginTop: "15px" }}>
                              <CLabel>
                                <CSLab code="HCM-95HTK1MHWY_PSLL" />
                              </CLabel>
                              <CSCheckbox
                                checked={data?.options?.isResident || false}
                                name="isResident"
                                onChange={handleCheckboxChange}
                              />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="12" style={{ marginTop: "5px" }}>
                              <CRow>
                                <CCol md="12">
                                  <CSLineLabel code="HCM-VSHKR5ODJ1H_LANG" />{" "}
                                </CCol>
                              </CRow>

                              <CRow>
                                <div className="image--container">
                                  <FileUploader
                                    handleChange={handleFileChange}
                                    name="file"
                                    value={data?.photo || ""}
                                    types={FileTypes}
                                    maxSize={1}
                                    file={file}
                                  />
                                  <span
                                    style={{ fontSize: "12px", color: "#666" }}
                                  >
                                    {file
                                      ? `Name: ${file.name}`
                                      : "No image uploaded yet"}
                                  </span>
                                  <span style={{ fontSize: "20px" }}>
                                    {file ? (
                                      <>
                                        {" "}
                                        <AiOutlineEye
                                          onClick={() => setVisible(true)}
                                        />{" "}
                                        <AiOutlineClose
                                          color="red"
                                          onClick={() => setFile(null)}
                                        />{" "}
                                      </>
                                    ) : null}{" "}
                                  </span>
                                </div>
                              </CRow>
                            </CCol>
                          </CRow>
                          {/* <CRow>                                                                                                                
                                                        <CRow>
                                                            <CCol md='12'>
                                                                <CRow>
                                                                    <CCol md="12"><CSLineLabel name="Employee Image" /> </CCol>
                                                                </CRow>
                                                            </CCol>                                                            
                                                            <CCol md="7">
                                                                <input maxSize={2} type="file" onChange={handleUpload} />
                                                                <p>Filename: {files.name}</p>
                                                                <p>File type: {files.type}</p>
                                                                <p>File size: {files.size} bytes</p>
                                                            </CCol>
                                                            <CCol MD="5">
                                                                {files && <ImageThumb image={files} />}
                                                            </CCol>
                                                        </CRow> 
                                                    </CRow> */}
                        </CCol>
                      </CRow>
                    </CTabPane>
                    <CTabPane
                      visible={activeKey === 2 ? "true" : "false"}
                      style={{ marginTop: "10px" }}
                    >
                      <CRow className={"bottom-spacing"}>
                        <CCol md="6">
                          <CRow>
                            <CCol md="3">
                              <CLabel>
                                <CSLab code="HCM-B0VG88EHYDM_KCMI" />
                              </CLabel>
                              <CInput
                                name="staffId"
                                value={data?.staffId || ""}
                                onChange={handleOnChange}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                <CSLab code="HCM-HL6HU7PY50C_KCMI" />
                              </CLabel>
                              <CInput
                                name="hireDate"
                                value={data?.hireDate || ""}
                                onChange={handleOnChange}
                                type="date"
                              />
                            </CCol>
                            <CCol md="5">
                              <CLabel>
                                <CSLab code="HCM-UA0A9VOKO2S_KCMI" />
                              </CLabel>
                              <CSelect
                                name="supervisorGroupId"
                                value={data?.supervisorGroupId || -1}
                                onChange={handleOnChange}
                              >
                                {supervisorGroup.map((x, y) => (
                                  <option key={y} value={x.id}>
                                    {x.name}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                          </CRow>

                          <CRow>
                            <CCol md="12" style={{ marginTop: "2px" }}>
                              <h6 className="ch-l-s">
                                <CSLab code="Segments" />{" "}
                              </h6>
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                <CSLab code="HCM-4D1SZ24U9UO" />
                              </CLabel>
                              <CSelect
                                name="sectionId"
                                value={data?.sectionId || -1}
                                onChange={handleOnChange}
                              >
                                {[
                                  "Select Section",
                                  "Section 1",
                                  "Section 2",
                                  "Section 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                <CSLab code="HCM-N6I0LSIYJF" />
                              </CLabel>
                              <CSelect
                                name="departmentId"
                                value={data?.departmentId || -1}
                                onChange={handleOnChange}
                              >
                                {[
                                  "Select Department",
                                  "Department 1",
                                  "Department 2",
                                  "Department 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                <CSLab code="HCM-LAFPT6FJ57N" />
                              </CLabel>
                              <CSelect
                                name="divisionId"
                                value={data?.divisionId || -1}
                                onChange={handleOnChange}
                              >
                                {[
                                  "Select Division",
                                  "Division 1",
                                  "Division 2",
                                  "Division 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="12"></CCol>
                            <CCol md="4">
                              <CLabel>
                                <CSLab code="HCM-HMLNLPOEIXG" />
                              </CLabel>
                              <CSelect
                                name="employeeTypeId"
                                value={data?.employeeTypeId || -1}
                                onChange={handleOnChange}
                              >
                                {[
                                  "Select Employee Type",
                                  "Type 1",
                                  "Type 2",
                                  "Type 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                <CSLab code="HCM-ATGLL367GOQ" />
                              </CLabel>
                              <CSelect
                                name="positionId"
                                value={data?.positionId || -1}
                                onChange={handleOnChange}
                              >
                                {[
                                  "Select Position",
                                  "Position 1",
                                  "Position 2",
                                  "Position 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                <CSLab code="HCM-DHV9W3RF11D" />
                              </CLabel>
                              <CSelect
                                name="unitId"
                                value={data?.unitId || -1}
                                onChange={handleOnChange}
                              >
                                {[
                                  "Select Unit",
                                  "Unit 1",
                                  "Unit 2",
                                  "Unit 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                          </CRow>

                          <CRow>
                            <CCol md="4">
                              <CLabel>
                                <CSLab code="HCM-6XXECXM4Q5S" />
                              </CLabel>
                              <CSelect
                                name="locationId"
                                value={data?.locationId || -1}
                                onChange={handleOnChange}
                              >
                                {[
                                  "Select Location",
                                  "Location 1",
                                  "Location 2",
                                  "Location 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                <CSLab code="HCM-B4SZR3O5JPO-PSLL" />
                              </CLabel>
                              <CSelect
                                name="employeeStatus"
                                value={data?.employeeStatus || -1}
                                onChange={handleOnChange}
                              >
                                {BoolStatus.map((x, i) => (
                                  <option key={i} value={x.id}>
                                    {x.name}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                <CSLab code="HCM-I3AS1TUOS2_LOLN" />
                              </CLabel>
                              <CSelect
                                name="payrollStatus"
                                value={data?.payrollStatus || -1}
                                onChange={handleOnChange}
                              >
                                {[
                                  "Select Status",
                                  "Suspended",
                                  "Probation",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                          </CRow>
                        </CCol>

                        <CSDivider
                          md="1"
                          style={{ flex: "0 0 .3333333333%" }}
                        />

                        <CCol md="5">
                          <CRow>
                            <CCol md="3" xs="4">
                              <CSCheckbox
                                label="Contract"
                                checked={data?.options?.isContract || false}
                                name="isContract"
                                onChange={handleCheckboxChange}
                              />
                            </CCol>

                            <CCol md="5" xs="8">
                              <CSCheckbox
                                label="Secondary Employment"
                                checked={
                                  data?.options?.isSecondaryEmployment || false
                                }
                                name="isSecondaryEmployment"
                                onChange={handleCheckboxChange}
                              />
                            </CCol>
                            <CCol md="4" xs="6">
                              <CSCheckbox
                                label="Overtime Exempt"
                                checked={
                                  data?.options?.isOvertimeExempt || false
                                }
                                name="isOvertimeExempt"
                                onChange={handleCheckboxChange}
                              />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="3" xs="6" style={{ marginTop: "5px" }}>
                              <CSCheckbox
                                label="Probation"
                                checked={data?.options?.isProbation || false}
                                name="isProbation"
                                onChange={handleCheckboxChange}
                              />
                            </CCol>
                            <CCol md="6" xs="6">
                              <CLabel>
                                <CSLab code="Probation Months" />
                              </CLabel>
                              <CInput
                                name="probationMonth"
                                value={data?.probationMonth || ""}
                                onChange={handleCheckboxChange}
                                style={{ width: "60%" }}
                                type="number"
                              />
                            </CCol>
                          </CRow>

                          <CRow>
                            <CCol md="12" style={{ marginTop: "5px" }}>
                              <h6 htmlFor="name" className="ch-l-s">
                                <CSLab code="HCM-E6FV7KUTAIJ-PSLL" />
                              </h6>
                            </CCol>
                            <CCol md="6">
                              <CLabel>
                                <CSLab code="HCM-P82D0RPB0G-LOLN" />
                              </CLabel>
                              <CSelect
                                name="salaryGradeId"
                                value={data?.salaryGradeId || -1}
                                onChange={(event) => {
                                  handleCheckboxChange();
                                  setNotche(event);
                                }}
                              >
                                {salaryGrade.map((x, i) => (
                                  <option key={i} value={x.id}>
                                    {x.name}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="2">
                              <CLabel>
                                <CSLab code="Notch" />
                              </CLabel>
                              <CInput
                                name="notch"
                                value={data?.notch || ""}
                                onChange={handleCheckboxChange}
                                disabled
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                <CSLab code="HCM-8SV0WSF3M27-KCMI" />
                              </CLabel>
                              <CSelect
                                name="salaryType"
                                value={data?.salaryType || -1}
                                onChange={handleCheckboxChange}
                              >
                                {["Select Type", "Salary", "Wages"].map(
                                  (x, i) => (
                                    <option key={i} value={x}>
                                      {x}
                                    </option>
                                  )
                                )}
                              </CSelect>
                            </CCol>
                            <CCol md="6">
                              <CLabel htmlFor="rate">
                                <CSLab code="HCM-PH98CHJVZO_KCMI" />
                              </CLabel>
                              {/*  */}
                              <CFormGroup>
                                <CInputGroup>
                                  <CInputGroupPrepend>
                                    <CButton color="light">
                                      <CSLab
                                        style={{ fontSize: "11px" }}
                                        code="GHS"
                                      />
                                    </CButton>
                                  </CInputGroupPrepend>
                                  <CInput
                                    name="salaryRate"
                                    value={data?.salaryRate}
                                    onChange={handleCheckboxChange}
                                  />
                                </CInputGroup>
                              </CFormGroup>
                            </CCol>
                          </CRow>
                        </CCol>
                      </CRow>
                    </CTabPane>

                    <CTabPane
                      visible={activeKey === 3 ? "true" : "false"}
                      style={{ marginTop: "10px" }}
                    >
                      <CRow>
                        {/* <CCol md="12"> <h6 className="ch-l-s"><CSLab code="Banks" /></h6> </CCol> */}
                        <CCol md="12">
                          <GridComponent
                            dataSource={{}}
                            allowPaging={true}
                            pageSettings={{ pageSize: 6 }}
                            editSettings={editOptions}
                            toolbar={toolbarOptions}
                            height={200}
                          >
                            <ColumnsDirective>
                              <ColumnDirective
                                field={"id"}
                                headerText={"ID"}
                                width="100"
                                visible={false}
                              />
                              {/* <ColumnDirective field={'paymentOption'} editType="dropdownedit" edit={paymentOpts} headerText="Payment Opt." width='100' /> */}
                              <ColumnDirective
                                field={"bankId"}
                                editType="dropdownedit"
                                headerText={GetLabelByName(
                                  "HCM-ID4MYCDESH-LANG",
                                  lan
                                )}
                                width="100"
                              />
                              <ColumnDirective
                                field={"branchId"}
                                editType="dropdownedit"
                                headerText={GetLabelByName(
                                  "HCM-5JJIZBZLYWP_LANG",
                                  lan
                                )}
                                width="100"
                              />
                              <ColumnDirective
                                field={"bankAccountNumber"}
                                headerText={GetLabelByName(
                                  "HCM-HVW65C2S13E_LANG",
                                  lan
                                )}
                                width="100"
                              />
                              <ColumnDirective
                                field={"fixeAmount"}
                                headerText={GetLabelByName(
                                  "HCM-MCVF3K3UGYK_LANG",
                                  lan
                                )}
                                width="100"
                              />
                              <ColumnDirective
                                field={"percentage"}
                                headerText={GetLabelByName(
                                  "HCM-HB5MNHJGQE5-HRPR",
                                  lan
                                )}
                                width="100"
                              />
                              <ColumnDirective
                                field={"baseAmount"}
                                headerText={GetLabelByName(
                                  "HCM-SLT58KQT1_PSLL",
                                  lan
                                )}
                                width="100"
                              />
                              <ColumnDirective
                                commands={commandOptions}
                                headerText={GetLabelByName(
                                  "HCM-F4IUJ9QVOM6",
                                  lan
                                )}
                                width="100"
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
                    </CTabPane>

                    <CTabPane
                      visible={activeKey === 4 ? "true" : "false"}
                      style={{ marginTop: "10px" }}
                    >
                      <CRow>
                        <CCol md="6">
                          <CRow>
                            <CCol md="12">
                              <CSLineLabel name="HCM-E6FV7KUTAIJ-PSLL" />{" "}
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="6">
                              <CLabel>
                                <CSLab code="HCM-N0SSN34ZO5-HRPR" />
                              </CLabel>
                              <CSelect
                                name="percentageOfBasicSalary"
                                value={data?.percentageOfBasicSalary || -1}
                                onChange={handleOnChange}
                              >
                                {[
                                  "Select Grade",
                                  "Type 1",
                                  "Type 2",
                                  "Type 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="6">
                              <CLabel>
                                <CSLab code="HCM-9LAWIPOM3V" />
                              </CLabel>
                              <CSelect
                                name="payrollHours"
                                value={data?.payrollHours || -1}
                                onChange={handleOnChange}
                              >
                                {[
                                  "Select Type",
                                  "Type 1",
                                  "Type 2",
                                  "Type 3",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="12">
                              <CLabel>
                                <CSLab code="HCM-JBF5RIYQSNH" />
                              </CLabel>
                              <CTextarea
                                name="paySlipNote"
                                value={data?.paySlipNote}
                                onChange={handleOnChange}
                                style={{ height: "60px", resize: "none" }}
                              ></CTextarea>
                            </CCol>
                          </CRow>
                        </CCol>

                        <CSDivider md="1" style={{ height: "100%" }} />

                        <CCol md="5">
                          <CRow>
                            <CCol md="12">
                              <CSLineLabel name="HCM-38YN5L69WMQ-LASN" />{" "}
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="6">
                              <CLabel>
                                <CSLab code="HCM-DMPCPBT8I4K-LOLN" />
                               
                              </CLabel>
                              <CSelect
                                name="network"
                                value={data?.network || -1}
                                onChange={handleOnChange}
                              >
                                {[
                                  "Select Network",
                                  "MTN",
                                  "Vodafone",
                                  "AirtelTigo",
                                  "Other",
                                ].map((x, i) => (
                                  <option key={i} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </CSelect>
                            </CCol>
                            <CCol md="6">
                              <CLabel>
                                <CSLab code="HCM-6T9OAR0ZB4_LASN" />
                              </CLabel>
                              <CInput
                                name="momoNumber"
                                value={data?.momoNumber || ""}
                                onChange={handleOnChange}
                              />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol md="12">
                              <CLabel>
                                <CSLab code="HCM-1QAFIBP0XL7_KCMI" />
                              </CLabel>
                              <CInput
                                name="momoName"
                                value={data?.momoName || ""}
                                onChange={handleOnChange}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                <CSLab code="HCM-MCVF3K3UGYK_LANG" />
                              </CLabel>
                              <CInput
                                name="fixedAmount"
                                value={data?.fixedAmount || ""}
                                onChange={handleOnChange}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                <CSLab code="HCM-HB5MNHJGQE5-HRPR" />
                              </CLabel>
                              <CInput
                                name="percentage"
                                value={data?.percentage || ""}
                                onChange={handleOnChange}
                              />
                            </CCol>
                            <CCol md="4">
                              <CLabel>
                                <CSLab code="HCM-SLT58KQT1_PSLL" />
                              </CLabel>
                              <CInput
                                name="base"
                                value={data?.base || ""}
                                onChange={handleOnChange}
                              />
                            </CCol>
                          </CRow>
                        </CCol>
                      </CRow>
                    </CTabPane>
                    <CTabPane
                      visible={activeKey === 5 ? "true" : "false"}
                      style={{ marginTop: "10px" }}
                    >
                      {glAccountData ? (
                        <GLComponent
                          orgGLAccounts={orgGLAccounts}
                          onGLChange={onGLChange}
                          data={gLAccountData}
                        />
                      ) : (
                        <Loader />
                      )}
                    </CTabPane>
                  </CTabContent>
                </CTabs>
              </CForm>
            </CCardBody>
            <CCardFooter>
              {"Update" === mode ? (
                <CButton
                  style={{ marginRight: 5 }}
                  type="button"
                  size="sm"
                  color="success"
                >
                  <CIcon name="cil-scrubber" />

                  <CSLab code="HCM-ZIRH5SVBDUF_LANG" />
                </CButton>
              ) : null}
              <CButton
                style={{ marginRight: 5, float: "right" }}
                type="button"
                size="sm"
                color="success"
              >
                <AiFillSave size={20} /> <CSLab code="HCM-HGUHIR0OK6T" />{" "}
              </CButton>
              <CButton
                style={{ marginRight: 5, float: "right" }}
                type="button"
                size="sm"
                color="warning"
                onClick={handleOnSubmit}
              >
                <AiOutlineRedo size={20} /> <CSLab code="HCM-MELULU9B6R_KCMI" />{" "}
              </CButton>
              <CButton
                style={{ marginRight: 5, float: "right", color: "white" }}
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
        size={"sm"}
        onClose={() => setVisible(false)}
        closeOnBackdrop={true}
      >
        <CModalBody>
          <CRow style={{ marginTop: "-17px", marginRight: "-25px" }}>
            <CCol md="12" className={"text-right"} style={{ fontSize: "19px" }}>
              <AiFillCloseCircle
                color="red"
                onClick={() => setVisible(false)}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="12">
              <img
                alt={file ? `Name: ${file.name}` : "No image uploaded yet"}
                style={{ width: "90%" }}
                src={file ? URL.AddObjectURL(file) : null}
              />
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
    </>
  );
};

export default EmployeeDetail;
