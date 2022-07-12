import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { GetLabelByName } from "src/reusable/configs/config";

import {
  CInputGroupAppend,
  CInputGroup,
  CInput,
  CCard,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CCol,
  CButton,
  CLabel,
  CCardFooter,
  CCardHeader,
  CFormGroup,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
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
//import { RecurringEarningData2, } from "../../../reusable/utils/EarningsData";
//import { payPeriod } from '../../../reusable/utils/GenericData';
//import { employees } from '../../../reusable/utils/GenericData';
//import { getValue } from "@syncfusion/ej2-base";
//import 'react-toastify/dist/ReactToastify.css';
import { AiOutlinePlus } from "react-icons/ai";
import "../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-react-grids/styles/material.css";
import { CSCheckbox } from "src/reusable/components";
import { CardBodyHeight } from "src/reusable/utils/helper";
import { AiFillSave, AiOutlineRedo } from "react-icons/ai";
import { CSLab } from "src/reusable/components";
//import toast, { Toaster } from 'react-hot-toast';
//import { toastWarning } from 'src/reusable/components/ToastStylesComponent/ToastStyles';
//import { customStyles } from 'src/reusable/components/SelectComponent/SelectStyle';
//import { handleNumberOnly } from 'src/reusable/utils/helper';
//import { GetAllEarning, SearchEarnings, GetAllEarningEmployees, GetGLAccounts, PutBasicSalaryMassUpdate, GetAllEmployees } from 'src/reusable/API/EarningEndPoints';
import {
  HttpAPIRequest,
  PutRequest,
  GetRequest,
} from "src/reusable/utils/helper";
import CSAutoComplete from "src/reusable/components/AutoCompleteComponent/CSAutoComplete";
import { SearchEmployees } from "src/reusable/API/EmployeeEndpoints";
import {
  GetBeneficiary,
  GetEmployeeDependant,
  GetEmployeeEmergencyContact,
  GetEmployeeGuarantor,
} from "src/reusable/API/EmployeeRelationshipsEndPoint";
import axios from "axios";
import { RelationTypes } from "src/reusable/API/EmployeeFamilyEndPoint";
import { ConsoleIcon } from "evergreen-ui";

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

const NonRecurringEarningsByEarning = (props) => {
  const [selectedValue, setSelectedValue] = useState();
  const dispatch = useDispatch();
  const [array, setArray] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [mode, setMode] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfItems, setNumberOfItems] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [handleId, setHandleId] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [submitData, setSubmitData] = useState({});
  const [show, setShow] = useState(true);
  const [grid, setGrid] = useState(null);
  const [activeKey, setActiveKey] = useState(1);
  const [large, setLarge] = useState(false);
  const [options, setOptions] = useState({});
  const [showEmpModal, setshowEmpModal] = useState(false);
  const [empDisplayName, setEmpDisplayName] = useState("");

  const [viewinfo, setViewInfo] = useState([]);
  const [emergencyContact, setEmergencyContact] = useState([]);
  const [nextOfKin, setGetNextOfKin] = useState([]);
  const [guarantor, setGetGuarantor] = useState([]);
  const [benefiaciary, setGetBenefiary] = useState([]);
  const [dependant, setDependant] = useState([]);
  const [relationTypes, setRelationTypes] = useState([]);
  const [showTypes, setShowTypes] = useState([]);

  const lan = useSelector((state) => state.language);

  const [editOptions] = useState({
    allowEditing: false,
    allowAdding: false,
    allowDeleting: false,
    allowEditOnDblClick: false,
  });
  const data = useSelector((state) => state.data);
  const [earningName, setEarningName] = useState([]);
  const [earningID, setEarningId] = useState([]);
  const [cmbEmployees, setEmployees] = useState([]);
  //const nonRecurringData = []
  //
  const firstGrid = useRef(null);
  const secondGrid = useRef(null);
  const thirdGrid = useRef(null);
  const fourthGrid = useRef(null);
  const fifthGrid = useRef(null);

  const onCompleteAction = (args) => {
    // console.log(getValue("name", args));
    console.log(grid);
    if (grid) {
      // here you can update the new row data by using setRowData method of Grid
      // grid.setRowData(newData.id, newData)
    }

    /*
            actionComplete={onCompleteAction}
            actionBegin={onBeginAction}
        */
  };

  const handleChange = (e) => {
    console.log(e);
    setSelectedValue(e.label);
  };

  const MultipleGetRequests = async () => {
    try {
      let request = [
        HttpAPIRequest("GET", GetBeneficiary(handleId)),
        HttpAPIRequest("GET", GetEmployeeDependant(handleId)),
        HttpAPIRequest("GET", GetEmployeeEmergencyContact(handleId)),
        HttpAPIRequest("GET", GetEmployeeGuarantor(handleId)),
        HttpAPIRequest("GET", RelationTypes()),
      ];
      const multipleCall = await Promise.allSettled(request);
      console.log(multipleCall[0].value);

      setGetBenefiary([...multipleCall[0].value]);
      setDependant([...multipleCall[1].value]);
      setEmergencyContact([...multipleCall[2].value]);
      setGetGuarantor([...multipleCall[3].value]);
      setRelationTypes([...multipleCall[4].value]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (handleId) {
      MultipleGetRequests();
    }
  }, [handleId]);

  // const MultipleGetRequests = async () => {
  //   try {
  //   //  let request = [HttpAPIRequest('GET', GetAllEarningEmployees()),];
  //     const multipleCall = await Promise.allSettled(request);

  //     // console.log(multipleCall[6].value.id)
  //     let employeeData = multipleCall[0].value

  //     let empData = []
  //     for (let i = 0; i < employeeData.length; i++) {
  //       empData.push({
  //         id: `${employeeData[i].id}`,
  //         name: `${employeeData[i].name} - ${employeeData[i].staffId}`
  //       })
  //     }

  //     setEmployees([{ id: '-1', name: `Select Employee` }, ...empData])
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   MultipleGetRequests()
  // }, []);
  const integerParams = {
    params: {
      // decimals: 1,
      format: "N",
      min: 0,
    },
  };
  const handleOnSubmit = () => {
    console.log(submitData);
    // if (!submitData.employeeId || submitData.employeeId === -1) {
    //   toast.error('Please select an employee!', toastWarning);
    //   return;
    // }
    // if (!submitData?.payPeriodId || submitData?.payPeriodId === -1) {
    //   toast.error('Please select a period!', toastWarning);
    //   return;
    // }
    // if (!submitData?.unit || submitData?.unit === '') {
    //   toast.error('Please enter a value for unit!', toastWarning);
    //   return;
    // }
    //console.log(selectedValue)
    let newData = { earningId: earningID, ...submitData, options };
    console.log("new", newData);
    setArray((nonRecurringData) => [newData, ...nonRecurringData]);
    handleReset();
    // 'Add' === mode ? AddGLAccount(newData) : updateGLAccount(newData);
  };

  const trans = useRef(null);

  const submitRequest = (args) => {
    let tabData = trans?.current?.currentViewData;
    let finaldata = {
      earningIDs: earningID,
      tabData,
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      companyReference: "string",
    };
    console.log(JSON.stringify(finaldata));
  };

  const handleOnChange = (evnt) => {
    setSubmitData((data) => {
      return { ...data, [evnt?.target?.name]: evnt?.target?.value };
    });
    dispatch({
      type: "set",
      data: { ...data, [evnt?.target?.name]: evnt?.target?.value },
    });
  };

  const handleReset = (type = 1) => {
    dispatch({ type: "set", data: {} });
    setSubmitData({});
    setSelectedValue([]);
  };

  const handleCheckboxChange = (evnt) => {
    console.log(1);
    setOptions((data) => {
      return { ...data, [evnt?.target?.name]: evnt?.target?.checked };
    });
    let option = {
      ...data?.options,
      [evnt?.target?.name]: evnt?.target?.checked,
    };
    dispatch({ type: "set", data: { ...data, option, options: option } });
  };

  const handleCheckboxChanges = (evnt) => {
    console.log(2);
    setOptions((data) => {
      return { ...data, [evnt?.target?.name]: evnt?.target?.checked };
    });
    let option = {
      ...data?.options,
      [evnt?.target?.name]: evnt?.target?.checked,
    };
    console.log(option);
    dispatch({ type: "set", data: { ...data, option, options: option } });
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

  const onCommandClick = (args) => {
    console.log(args);
    onCompleteAction(args);
  };

  //const renderError = (message) => <p className="help is-danger">{message}</p>;

  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>Employee Relationship</h5>
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
        <CCol hidden={show} xs="12">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol md="4">
                  <b>
                    <CSLab code={"HCM-8LH7SFKKDJG_LASN"} /> :{" "}
                  </b>
                  <span
                    style={{
                      textDecoration: "underline dotted",
                      cursor: "pointer",
                    }}
                    type="button"
                    //onClick={() => setLarge(!large)}
                    size="md"
                    color="primary"
                  >
                    {empDisplayName}
                  </span>
                </CCol>
                <CCol md="4">
                  {/* <CTooltip content={`Click here to view Employees`}>
                    <CButton color="outline-primary"> <MdPeople /> 120 </CButton>
                  </CTooltip> */}
                </CCol>
                <CCol md="4">
                  <CButton
                    color="primary"
                    style={{ float: "right" }}
                    onClick={() => setshowEmpModal(!showEmpModal)}
                  >
                    <AiOutlinePlus /> <CSLab code={"HCM-N6EVCOP12K-LOLN"} />{" "}
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink
                    href="#"
                    active={activeKey === 1}
                    onClick={() => setActiveKey(1)}
                  >
                    <CSLab code="HCM-MS5RN9DANOF-PSLL" />
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="#"
                    active={activeKey === 2}
                    onClick={() => setActiveKey(2)}
                  >
                    <CSLab code="HCM-TXJFM19UOAG-LOLN" />
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="#"
                    active={activeKey === 6}
                    onClick={() => setActiveKey(6)}
                  >
                    <CSLab code="HCM-C7C1XLFCOS5-LANG" />
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="#"
                    active={activeKey === 3}
                    onClick={() => setActiveKey(3)}
                  >
                    <CSLab code="HCM-2VDPTKA7U9T-LOLN" />
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="#"
                    active={activeKey === 4}
                    onClick={() => setActiveKey(4)}
                  >
                    Next of Kin
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane visible={activeKey === 1 ? "true" : "false"}>
                  <GridComponent
                    height={400}
                    dataSource={benefiaciary}
                    allowPaging={true}
                    pageSettings={{ pageSize: 8 }}
                    editSettings={editOptions}
                    ref={firstGrid}
                    toolbarClick={submitRequest}
                  >
                    <ColumnsDirective>
                      <ColumnDirective
                        field="id"
                        headerText="ID"
                        width="100"
                        visible={false}
                        isPrimaryKey={true}
                      />
                      <ColumnDirective
                        field="firstName"
                        editType="text"
                        headerText={GetLabelByName("HCM-KPH53NF08RG", lan)}
                        width="100"

                        //onChange={(e) => setfname(e.target.value)}
                      />
                      <ColumnDirective
                        field="lastName"
                        headerText={GetLabelByName("HCM-ZYCFSGCKMC", lan)}
                        editType="text"
                        width="100"
                        textAlign="Center"
                        // name="lname"
                        // value={lname}
                        // onChange={(e) => setlname(e.target.value)}
                      />
                      <ColumnDirective
                        field="relation.name"
                        //   edit={relationTypes}
                        headerText={GetLabelByName("HCM-ZYCFSGCKMC", lan)}
                        editType="text"
                        width="100"
                        textAlign="Center"
                        //  template={tem}
                      />

                      <ColumnDirective
                        field="address"
                        headerText={GetLabelByName("HCM-7WIK8PDIQOV-LOLN", lan)}
                        editType="text"
                        width="100"
                        textAlign="Center"
                        name="address"
                        // value={address}
                        // onChange={(e) => setAddress(e.target.value)}
                      />
                      {/* <ColumnDirective
                          field="relation"
                          headerText={GetLabelByName(
                            "HCM-RWMIP9K3NEH_HRPR",
                            lan
                          )}
                          editType="text"
                          width="100"
                          textAlign="Center"
                          // name="relation"
                          // value={relation}
                          // onChange ={(e)=>setRelation(e.target.value)}
                        /> */}
                      <ColumnDirective
                        field="percentage"
                        headerText={GetLabelByName("HCM-HB5MNHJGQE5-HRPR", lan)}
                        editType="numericedit"
                        edit={integerParams}
                        width="100"
                        textAlign="Center"
                      />
                      {/* <ColumnDirective
                        commands={commandOptions}
                        headerText={GetLabelByName("HCM-F4IUJ9QVOM6", lan)}
                        width="100"
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
                        CommandColumn,
                        Toolbar,
                      ]}
                    />
                  </GridComponent>
                </CTabPane>
                <CTabPane visible={activeKey === 2 ? "true" : "false"}>
                  <GridComponent
                    dataSource={dependant}
                    height={300}
                    allowPaging={true}
                    pageSettings={{ pageSize: 8 }}
                    editSettings={editOptions}
                    ref={secondGrid}
                    commandClick={onCommandClick}
                    toolbarClick={submitRequest}
                  >
                    <ColumnsDirective>
                      <ColumnDirective
                        field="id"
                        headerText="ID"
                        width="100"
                        visible={false}
                        isPrimaryKey={true}
                      />
                      <ColumnDirective
                        field="firstName"
                        editType="text"
                        headerText={GetLabelByName("HCM-VD1B12NKKJ_LANG", lan)}
                        width="70"
                        //edit={earnings}
                      />
                      <ColumnDirective
                        field="lastName"
                        headerText={GetLabelByName("HCM-RWMIP9K3NEH_HRPR", lan)}
                        editType="text"
                        width="100"
                        textAlign="Center"
                      />
                      <ColumnDirective
                        field="dateOfBirth"
                        headerText={GetLabelByName("HCM-IM8I8SKJ1J9_KCMI", lan)}
                        editType="date"
                        width="100"
                        textAlign="Center"
                        type="date"
                        format="dd/MMM/yyyy"
                      />
                      <ColumnDirective
                        field="address"
                        headerText={GetLabelByName("HCM-XYNVK7A8USK_PSLL", lan)}
                        editType="text"
                        width="100"
                        textAlign="Center"
                      />
                      <ColumnDirective
                        field="nationality.name"
                        headerText={GetLabelByName("HCM-XYNVK7A8USK_PSLL", lan)}
                        editType="text"
                        width="100"
                        textAlign="Center"
                      />
                      <ColumnDirective
                        field="relation.name"
                        headerText={GetLabelByName("HCM-IM8I8SKJ1J9_KCMI", lan)}
                        editType="text"
                        width="100"
                        textAlign="Center"
                      />
                      <ColumnDirective
                        field="identityType.name"
                        headerText={GetLabelByName("HCM-IM8I8SKJ1J9_KCMI", lan)}
                        editType="text"
                        width="100"
                        textAlign="Center"
                      />
                      <ColumnDirective
                        field="dateOfExpiry"
                        headerText={GetLabelByName("HCM-IM8I8SKJ1J9_KCMI", lan)}
                        type="date"
                        format="dd/MMM/yyyy"
                        editType="dateedit"
                        width="100"
                        textAlign="Center"
                      />

                      {/* <ColumnDirective
                        commands={commandOptions}
                        headerText={GetLabelByName("HCM-F4IUJ9QVOM6", lan)}
                        width="100"
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
                        CommandColumn,
                        Toolbar,
                      ]}
                    />
                  </GridComponent>
                </CTabPane>
                <CTabPane visible={activeKey === 3 ? "true" : "false"}>
                  <GridComponent
                    dataSource={emergencyContact}
                    height={300}
                    allowPaging={true}
                    pageSettings={{ pageSize: 8 }}
                    editSettings={editOptions}
                    ref={thirdGrid}
                    commandClick={onCommandClick}
                    //
                    toolbarClick={submitRequest}
                  >
                    <ColumnsDirective>
                      <ColumnDirective
                        field="id"
                        headerText="ID"
                        width="100"
                        visible={false}
                        isPrimaryKey={true}
                      />
                      <ColumnDirective
                        field="name"
                        editType="text"
                        headerText={GetLabelByName("HCM-RWMIP9K3NEH_HRPR", lan)}
                        width="70"
                        //edit={earnings}
                      />
                      <ColumnDirective
                        field="email"
                        headerText={GetLabelByName("HCM-RWMIP9K3NEH_HRPR", lan)}
                        editType="text"
                        width="100"
                        textAlign="Center"
                      />
                      <ColumnDirective
                        field="phone"
                        headerText={GetLabelByName("HCM-28JQRN57PA4-PSLL", lan)}
                        editType="numericedit"
                        width="100"
                        textAlign="Center"
                      />
                      <ColumnDirective
                        field="address"
                        headerText={GetLabelByName("HCM-7WIK8PDIQOV-LOLN", lan)}
                        editType="text"
                        //
                        width="100"
                        textAlign="Center"
                      />
                      {/* <ColumnDirective
                        commands={commandOptions}
                        headerText={GetLabelByName("HCM-F4IUJ9QVOM6", lan)}
                        width="100"
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
                        CommandColumn,
                        Toolbar,
                      ]}
                    />
                  </GridComponent>
                </CTabPane>
                <CTabPane visible={activeKey === 4 ? "true" : "false"}>
                  <GridComponent
                    dataSource={guarantor}
                    height={300}
                    allowPaging={true}
                    pageSettings={{ pageSize: 8 }}
                    editSettings={editOptions}
                    ref={fourthGrid}
                    commandClick={onCommandClick}

                    // toolbarClick={submitRequest}
                  >
                    <ColumnsDirective>
                      <ColumnDirective
                        field="id"
                        headerText="ID"
                        width="100"
                        visible={false}
                        isPrimaryKey={true}
                      />
                      <ColumnDirective
                        field="name"
                        editType="text"
                        headerText={GetLabelByName("HCM-RWMIP9K3NEH_HRPR", lan)}
                        width="70"
                        // edit={earnings}
                      />
                      <ColumnDirective
                        field="relation.name"
                        headerText={GetLabelByName("HCM-RWMIP9K3NEH_HRPR", lan)}
                        editType="text"
                        width="100"
                        textAlign="Center"
                      />
                      {/* <ColumnDirective
                          field="email"
                          headerText={GetLabelByName(
                            "HCM-L8D4N8LGAS_PSLL",
                            lan
                          )}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        /> */}
                      <ColumnDirective
                        field="phone"
                        headerText={GetLabelByName("HCM-28JQRN57PA4-PSLL", lan)}
                        editType="numericedit"
                        width="100"
                        textAlign="Center"
                      />
                      <ColumnDirective
                        field="nationality.name"
                        headerText={GetLabelByName("HCM-7WIK8PDIQOV-LOLN", lan)}
                        editType="text"
                        width="100"
                        textAlign="Center"
                      />
                      <ColumnDirective
                        field="address"
                        headerText={GetLabelByName("HCM-7WIK8PDIQOV-LOLN", lan)}
                        editType="text"
                        width="100"
                        textAlign="Center"
                      />
                      {/* <ColumnDirective
                        commands={commandOptions}
                        headerText={GetLabelByName("HCM-F4IUJ9QVOM6", lan)}
                        width="100"
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
                        CommandColumn,
                        Toolbar,
                      ]}
                    />
                  </GridComponent>
                </CTabPane>
                <CTabPane visible={activeKey === 5 ? "true" : "false"}>
                  <GridComponent
                    dataSource={nextOfKin[0]}
                    height={300}
                    allowPaging={true}
                    pageSettings={{ pageSize: 10 }}
                    editSettings={editOptions}
                    ref={fifthGrid}
                    commandClick={onCommandClick}
                    toolbarClick={submitRequest}
                  >
                    <ColumnsDirective>
                      <ColumnDirective
                        field="id"
                        headerText="ID"
                        width="100"
                        visible={false}
                        // isPrimaryKey={true}
                      />
                      <ColumnDirective
                        field="name"
                        editType="text"
                        headerText={GetLabelByName("HCM-RWMIP9K3NEH_HRPR", lan)}
                        width="70"
                      />
                      {/* <ColumnDirective
                          field="relationId"
                          headerText={GetLabelByName(
                            "HCM-RWMIP9K3NEH_HRPR",
                            lan
                          )}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        /> */}
                      <ColumnDirective
                        field="phone"
                        headerText={GetLabelByName("HCM-28JQRN57PA4-PSLL", lan)}
                        editType="numericedit"
                        width="100"
                        textAlign="Center"
                      />
                      <ColumnDirective
                        field="email"
                        headerText={GetLabelByName("HCM-L8D4N8LGAS_PSLL", lan)}
                        editType="text"
                        width="100"
                        textAlign="Center"
                      />
                      <ColumnDirective
                        field="address"
                        headerText={GetLabelByName("HCM-7WIK8PDIQOV-LOLN", lan)}
                        editType="text"
                        width="100"
                        textAlign="Center"
                      />
                      <ColumnDirective
                        commands={commandOptions}
                        headerText={GetLabelByName("HCM-F4IUJ9QVOM6", lan)}
                        width="100"
                        textAlign="Center"
                      />
                    </ColumnsDirective>
                    {/* <Inject
                        services={[
                          Page,
                          Sort,
                          Filter,
                          Group,
                          Edit,
                          CommandColumn,
                          Toolbar,
                        ]}
                      /> */}
                  </GridComponent>
                </CTabPane>
                {/* <CTabPane visible={activeKey === 6 ? "true" : "false"}>
                    <GridComponent
                      height={300}
                      dataSource={sampleData}
                      allowPaging={true}
                      pageSettings={{ pageSize: 8 }}
                      editSettings={editOptions}
                      ref={(g) => setGrid(g)}
                      commandClick={onCommandClick}
                    >
                      <ColumnsDirective>
                        <ColumnDirective
                          field="id"
                          headerText="ID"
                          width="100"
                          visible={false}
                          isPrimaryKey={true}
                        />
                        <ColumnDirective
                          field="name"
                          headerText={GetLabelByName(
                            "HCM-RWMIP9K3NEH_HRPR",
                            lan
                          )}
                          width="100"
                        />
                        <ColumnDirective
                          field="numberOfCompanies"
                          headerText={GetLabelByName(
                            "HCM-XCT7UIQ8P9L_KCMI",
                            lan
                          )}
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="strStatus"
                          headerText={GetLabelByName(
                            "HCM-RQB38Y1ZFPO-LANG",
                            lan
                          )}
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          commands={commandOptions}
                          headerText={GetLabelByName("HCM-F4IUJ9QVOM6", lan)}
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
                          CommandColumn,
                        ]}
                      />
                    </GridComponent>
                  </CTabPane>
                  <CTabPane visible={activeKey === 7 ? "true" : "false"}>
                    <GridComponent
                      height={300}
                      allowPaging={true}
                      pageSettings={{ pageSize: 8 }}
                      editSettings={editOptions}
                      ref={trans}
                      commandClick={onCommandClick}
                               
                    >
                      <ColumnsDirective>
                        <ColumnDirective
                          field="id"
                          headerText="ID"
                          width="100"
                          visible={false}
                          isPrimaryKey={true}
                        />
                        <ColumnDirective
                          field={"payPeriod"}
                          editType="dropdownedit"
                          headerText={GetLabelByName(
                            "HCM-IXI11NRGSL_LASN",
                            lan
                          )}
                          width="70"
                          edit={earnings}
                        />
                        <ColumnDirective
                          field={"ruleValue"}
                          headerText={GetLabelByName("HCM-KGCV55ZJX9A_PSLL")}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="unit"
                          headerText={GetLabelByName(
                            "HCM-L03LHDL3ZEH_LANG",
                            lan
                          )}
                          editType="numericedit"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="unit"
                          headerText={GetLabelByName(
                            "HCM-FPFINOQEG27_LANG",
                            lan
                          )}
                          editType="numericedit"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          commands={commandOptions}
                          headerText={GetLabelByName(
                            "HCM-FPFINOQEG27_LANG",
                            lan
                          )}
                          width="100"
                          textAlign="Center"
                        />
                      </ColumnsDirective> */}
                {/* <Inject
                        services={[
                          Page,
                          Sort,
                          Filter,
                          Group,
                          Edit,
                          CommandColumn,
                          Toolbar,
                        ]}
                      /> */}
                {/* </GridComponent>
                  </CTabPane> */}
                {/* <CTabPane visible={activeKey === 8 ? "true" : "false"}>
                    <GridComponent
                      height={300}
                      allowPaging={true}
                      pageSettings={{ pageSize: 8 }}
                      editSettings={editOptions}
                      ref={trans}
                      commandClick={onCommandClick}
                               
                    >
                      <ColumnsDirective>
                        <ColumnDirective
                          field="id"
                          headerText="ID"
                          width="100"
                          visible={false}
                          isPrimaryKey={true}
                        />
                        <ColumnDirective
                          field={"payPeriod"}
                          editType="dropdownedit"
                          headerText={GetLabelByName(
                            "HCM-QNAC7YH7NBO-LOLN",
                            lan
                          )}
                          width="70"
                          edit={earnings}
                        />
                        <ColumnDirective
                          field={"ruleValue"}
                          headerText={GetLabelByName(
                            "HCM-KGCV55ZJX9A_PSLL",
                            lan
                          )}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="unit"
                          headerText={GetLabelByName(
                            "HCM-L03LHDL3ZEH_LANG",
                            lan
                          )}
                          editType="numericedit"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="unit"
                          headerText={GetLabelByName(
                            "HCM-FPFINOQEG27_LANG",
                            lan
                          )}
                          editType="numericedit"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          commands={commandOptions}
                          headerText={GetLabelByName("HCM-F4IUJ9QVOM6", lan)}
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
                          CommandColumn,
                          Toolbar,
                        ]}
                      />
                    </GridComponent>
                  </CTabPane> */}
              </CTabContent>
            </CTabs>
            <CCardFooter>
              {/* { <CButton style={{ marginRight: 5 }} type="button" size="sm" color="success"><CIcon name="cil-scrubber" /> <CSLab code="View History" /> </CButton>} */}
              <CButton
                style={{ marginRight: 5, float: "right" }}
                type="button"
                size="sm"
                onClick={submitRequest}
                color="success"
              >
                <AiFillSave size={20} />
                <CSLab code="Update" />
              </CButton>
              <CButton
                style={{ marginRight: 5, float: "right", color: "white" }}
                onClick={() => handleReset(1)}
                type="button"
                size="sm"
                color="warning"
              >
                <AiOutlineRedo size={20} /> <CSLab code="Undo" />
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>

      <CModal show={large} onClose={() => setLarge(!large)} size="md">
        <CModalHeader closeButton>
          <CModalTitle>Earning Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="5">
              <p>
                <b>Code:</b>
              </p>
            </CCol>
            <CCol md="6">
              <p>EARN266</p>
            </CCol>
            <CCol md="1"></CCol>
          </CRow>
          <CRow>
            <CCol md="5">
              <p>
                <b>Earning Name:</b>
              </p>
            </CCol>
            <CCol md="6">
              <p>Transportation Allowance</p>
            </CCol>
            <CCol md="1"></CCol>
          </CRow>
          <CRow>
            <CCol md="5">
              <p>
                <b>Calculation Rule:</b>
              </p>
            </CCol>
            <CCol md="6">
              <p>Flat Amount</p>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="5">
              <p>
                <b>Flat Amount:</b>
              </p>
            </CCol>
            <CCol md="6">
              <p>GH₵ 900.00</p>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="5">
              <p>
                <b>Expiry Date:</b>
              </p>
            </CCol>
            <CCol md="6">
              <p>19/Aug/2021</p>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setLarge(!large)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        show={showEmpModal}
        onClose={() => setshowEmpModal(!showEmpModal)}
        size="md"
      >
        <CModalHeader closeButton>
          <CModalTitle>
            <CSLab code={"HCM-N6EVCOP12K-LOLN"} />
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form>
            <CRow>
              <CCol md="12">
                <CLabel htmlFor="appendedPrependedInput">
                  Assign <b>{earningName}</b> to an employee
                </CLabel>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="12">
                <CLabel htmlFor="employeeId">
                  <CSLab code={"HCM-N6EVCOP12K-LOLN"} />
                </CLabel>
                <CSelect
                  name="employeeId"
                  value={data?.employeeId || -1}
                  onChange={handleOnChange}
                >
                  {cmbEmployees.map((x, i) => (
                    <option key={i} value={x.id}>
                      {x.name}
                    </option>
                  ))}
                </CSelect>
              </CCol>
            </CRow>

            <CRow>
              <CCol md="6">
                <CLabel htmlFor="Period">
                  <CSLab code={"HCM-HIE9Z3NNLN"} />
                </CLabel>
                <CSelect
                  name="payPeriodId"
                  value={data?.payPeriodId || -1}
                  onChange={handleOnChange}
                >
                  {
                    // payPeriod.map((x, i) => <option key={i} value={x.name}>{x.name}</option>)
                  }
                </CSelect>
              </CCol>
              <CCol md="6">
                <CLabel htmlFor="unit">
                  <CSLab code={"HCM-DHV9W3RF11D"} />
                </CLabel>
                <CInput
                  placeholder="Enter unit"
                  name="unit"
                  id="unit"
                  value={data?.unit || ""}
                  onChange={handleOnChange}
                  //  onKeyPress={(e) => handleNumberOnly(e)}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md="6">
                <CLabel>
                  <CSLab code={"HCM-8JZSECQCBTQ_LASN"} />
                </CLabel>
                <CSelect
                  name="activityId"
                  value={data?.activityId || -1}
                  onChange={handleOnChange}
                >
                  {[
                    "Select Activity ID",
                    "Percentage of basic",
                    "Flat Amount",
                  ].map((x, i) => (
                    <option key={i} value={x}>
                      {x}
                    </option>
                  ))}
                </CSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="6">
                <CSCheckbox
                  htmlFor="skipDateEntry"
                  label={<CSLab code={"HCM-WMNWNWW83DS_LANG"} />}
                  checked={data?.options?.skipDateEntry || false}
                  name="skipDateEntry"
                  onChange={handleCheckboxChange}
                />
              </CCol>
              <CCol md="6">
                <CSCheckbox
                  htmlFor="skipGLAccountEntry"
                  label={<CSLab code={"HCM-ZP7UU58NJBE_LOLN"} />}
                  checked={data?.options?.skipGLAccountEntry || false}
                  name="skipGLAccountEntry"
                  onChange={handleCheckboxChanges}
                />
              </CCol>
            </CRow>
          </form>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={handleOnSubmit}>
            <CSLab code={"HCM-TAAFD4M071D-HRPR"} />
          </CButton>
          <CButton
            color="secondary"
            onClick={() => {
              setshowEmpModal(!showEmpModal);
              handleReset();
            }}
          >
            <CSLab code={"HCM-9E3ZC2E1S0N-LASN"} />
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default NonRecurringEarningsByEarning;
