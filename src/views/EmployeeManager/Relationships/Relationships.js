import React, { useState, useRef, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { CustomAxios } from "src/reusable/API/CustomAxios";
import {
  CInputGroupAppend,
  CInputGroup,
  CInput,
  CCard,
  CRow,
  CFormGroup,
  CCol,
  CButton,
  CCardFooter,
  CTabContent,
  CNavItem,
  CNavLink,
  CNav,
  CTabs,
  CTabPane,
  CCardBody,
  CLabel,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
//import { genericParamData } from '../../Deductions/DeductionMassUpdate/node_modules/src/reusable/utilities/config';
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
// import { Variable } from "../../../reusable/utils/GenericData";
// import { RecurringEarningData } from "../../../reusable/utils/EarningsData";
import { getValue } from "@syncfusion/ej2-base";
import { DataManager, Query } from "@syncfusion/ej2-data";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import "../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-react-grids/styles/material.css";
import { CardBodyHeight } from "src/reusable/utils/helper";
// import { isEqual, differenceWith } from 'react-lodash'
import { CSAutoComplete, CSLab } from "src/reusable/components";
import { toast } from "react-toastify";
import { toastWarning } from "src/toasters/Toaster";
import { SearchEmployees } from "src/reusable/API/EmployeeEndpoints";

import {
  GetRequest,
  HttpAPIRequest,
  PostRequest,
} from "src/reusable/utils/helper";
import { GetLabelByName } from "src/reusable/configs/config";
import {
  GetBeneficiary,
  GetEmployeeDependant,
  GetEmployeeEmergencyContact,
  GetEmployeeGuarantor,
} from "src/reusable/API/EmployeeRelationshipsEndPoint";
import axios from "axios";

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

const sampleData = [
  { name: "Clothing Allowance", id: "1", stateId: "101" },
  { name: "Airtime Allowance", id: "2", stateId: "102" },
  { name: "Accommodation Allowances", id: "3", stateId: "103" },
  { name: "Fuel Allowance", id: "4", stateId: "104" },
];
let response = [];
const getSampleData = (data) => {
  console.log(data);

  if (data) {
    //filter
    const newdata = sampleData.filter((val) => {
      return !data.find((val2) => {
        //  console.log({valueID:val.id+":"+val2.id});
        return val.name === val2.name;
      });
    });
    response = newdata;
  } else {
    response = sampleData;
  }
  return response;
};

//onClick={handleOnSubmit}

// const saveButton = () => {
//   return (
//     <CButton style={{ marginRight: 5, float: 'right' }} type="button" size="sm" color="success"><AiFillSave size={20} />
//       <CSLab code="Update" />
//     </CButton>
//   )
//}

// const earnings = {
//   params: {
//     actionComplete: () => false,
//     allowFiltering: true,

//     fields: { text: "name", value: "name" },
//     query: new Query(),
//   },
// };
// console.log("trials", earnings.params.fields);
function refreshPage() {
  window.location.reload(false);
}

const editTemplate = (args) => {
  return (
    <DatePickerComponent
      value={getValue("date", args)}
      id="date"
      placeholder="Expiry Date"
      floatLabelType="Never"
      format="dd-mmm-yyyy"
    />
  );
  //(<CInput type='date' />)
};

const EmployeeDetail = (props) => {
  // const [showEmpModal, setshowEmpModal] = useState(false);
  // const [showEmpModal1, setshowEmpModal1] = useState(false);
  const [show, setShow] = useState(true);
  const [grid, setGrid] = useState(null);
  const [recEarnings, setRecEarnings] = useState(sampleData);
  const trans = useRef(null);
  const [editOptions] = useState({
    allowEditing: false,
    allowAdding: true,
    allowDeleting: false,
    allowEditOnDblClick: false,
  });
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setEmail] = useState("");
  const [relation, setRelation] = useState("");
  const [phone, setPhone] = useState("");
  const [otherPhone, setOtherPhone] = useState("");
  const [address, setAddress] = useState("");

  const lan = useSelector((state) => state.language);
  const [visible, setVisible] = useState(false);
  const [skill, setSkill] = useState("");
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
  const [emergencyContact, setEmergencyContact] = useState([]);
  const [nextOfKin, setGetNextOfKin] = useState([]);
  const [guarantor, setGetGuarantor] = useState([]);
  const [benefiaciary, setGetBenefiary] = useState([]);
  const [dependant, setDependant] = useState([]);

  const canSave = [fname, lname, relation, phone, address].every(Boolean);

  const firstGrid = useRef(null);
  const secondGrid = useRef(null);
  const thirdGrid = useRef(null);
  const fourthGrid = useRef(null);
  const fifthGrid = useRef(null);

  const toolbarOptions = [
    "Add",
    "Cancel",
    {
      text: "Save",
      tooltipText: "Save",
      prefixIcon: "e-save",
      id: "saveItems",
      align: "Right",
    },
  ];

  const [activeKey, setActiveKey] = useState(1);

  // const [large, setLarge] = useState(false);

  const onCompleteAction = (args) => {
    console.log(getValue("name", args));
    console.log(grid);
    if (grid) {
      // here you can update the new row data by using setRowData method of Grid
      // grid.setRowData(newData.id, newData)
    }
  };

  const submitRequest = (args) => {
    if (firstGrid && args.item.id === "saveItems") {
      console.log("first");
      let request = axios.post();
      console.log({ first: firstGrid?.current?.currentViewData });
    }

    //console.log({ value: firstGrid });
  };

  const actionBegin = (args) => {
    // if (args.requestType === 'add') {
    //   args.cancel = true
    //   console.log(sampleData)
    // }

    if (args.requestType === "save") {
      // setRecEarnings(firstGrid.current.currentViewData)
      let currentData = firstGrid.current.currentViewData;
      //console.log(sampleData)
      console.log(currentData);
      getSampleData(currentData);

      // console.log(newdata)
      // let result = differenceWith(currentData, sampleData, isEqual);
      //setRecEarnings(newdata)
    }
  };
  var values = ColumnDirective.getValue;

  const onCommandClick = (args) => {
    onCompleteAction(args);
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

  const handleNextOfKin = async () => {
    try {
      const request = await CustomAxios.get(`EmployeeNextofKin/${handleId}`);

      const response = request.data;
      console.log("emp response:", response);
      console.log({ response });
      setGetNextOfKin([response]);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (handleId !== "") {
      handleNextOfKin();
    }
  }, [handleId]);
  console.log(nextOfKin);
  //console.log(handleId);

  const MultipleGetRequests = async () => {
    try {
      let request = [
        HttpAPIRequest("GET", GetBeneficiary(handleId)),
        HttpAPIRequest("GET", GetEmployeeDependant(handleId)),
        HttpAPIRequest("GET", GetEmployeeEmergencyContact(handleId)),
        HttpAPIRequest("GET", GetEmployeeGuarantor(handleId)),
      ];
      const multipleCall = await Promise.allSettled(request);
      console.log(multipleCall[0].value);

      setGetBenefiary([...multipleCall[0].value]);
      setDependant([...multipleCall[1].value]);
      setEmergencyContact([...multipleCall[2].value]);
      setGetGuarantor([...multipleCall[3].value]);
    } catch (error) {
      console.log(error);
    }
  };
  const integerParams = {
    params: {
      min: 0,
    },
  };

  useEffect(() => {
    MultipleGetRequests();
  }, [handleId]);
  console.log({ emergency: emergencyContact });
  console.log({ guarant: guarantor });
  console.log({ benefits: benefiaciary });
  console.log({ dependands: dependant });

  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-ETP5RDAYHNK_LANG" />
          </h5>
        </CCol>
      </CRow>
      <CRow>
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
        <CCol xs="12" hidden={show}>
          <CCard>
            {/* <CCardHeader hidden={show} className={""}>
              <b>Employee:</b>{" "}
              <span style={{textDecoration: "underline dotted", cursor: "pointer", }} type="button" onClick={() => setLarge(!large)} size="md" color="primary" >
               Michael Nartey
              </span>
              {
              Number(activeKey) !== 5 ?
                <CButton color="primary" style={{ float: "right" }} onClick={() => setshowEmpModal(!showEmpModal)}>{"Add " + btnVals[activeKey]}</CButton> :
                <CButton color="primary" style={{ float: "right" }} onClick={() => setshowEmpModal1(!showEmpModal1)}>{"Add " + btnVals[activeKey]}</CButton>
              }
            </CCardHeader> */}
            <CCardBody style={{ height: CardBodyHeight, overflowY: "auto" }}>
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
                <CCol md="4"></CCol>
              </CFormGroup>
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
                      height={300}
                      actionComplete={actionBegin}
                      dataSource={benefiaciary}
                      allowPaging={true}
                      pageSettings={{ pageSize: 8 }}
                      editSettings={editOptions}
                      ref={firstGrid}
                      toolbar={toolbarOptions}
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
                          headerText={GetLabelByName("HCM-ZYCFSGCKMC", lan)}
                          editType="dropdownedit"
                          width="100"
                          textAlign="Center"
                          // name="lname"
                          // value={lname}
                          // onChange={(e) => setlname(e.target.value)}
                        />
                        <ColumnDirective
                          field="address"
                          headerText={GetLabelByName(
                            "HCM-7WIK8PDIQOV-LOLN",
                            lan
                          )}
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
                          headerText={GetLabelByName(
                            "HCM-HB5MNHJGQE5-HRPR",
                            lan
                          )}
                          editType="numericedit"
                          editParams={" minValue: 0"}
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
                      toolbar={toolbarOptions}
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
                          headerText={GetLabelByName(
                            "HCM-VD1B12NKKJ_LANG",
                            lan
                          )}
                          width="70"
                          //edit={earnings}
                        />
                        <ColumnDirective
                          field="lastName"
                          headerText={GetLabelByName(
                            "HCM-RWMIP9K3NEH_HRPR",
                            lan
                          )}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="dateOfBirth"
                          headerText={GetLabelByName(
                            "HCM-IM8I8SKJ1J9_KCMI",
                            lan
                          )}
                          editType="date"
                          width="100"
                          textAlign="Center"
                          type="date"
                          format="dd/MMM/yyyy"
                        />
                        <ColumnDirective
                          field="address"
                          headerText={GetLabelByName(
                            "HCM-XYNVK7A8USK_PSLL",
                            lan
                          )}
                          editType="text"
                          editTemplate={editTemplate}
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="nationality.name"
                          headerText={GetLabelByName(
                            "HCM-XYNVK7A8USK_PSLL",
                            lan
                          )}
                          editType="text"
                          editTemplate={editTemplate}
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="relation.name"
                          headerText={GetLabelByName(
                            "HCM-IM8I8SKJ1J9_KCMI",
                            lan
                          )}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="identityType.name"
                          headerText={GetLabelByName(
                            "HCM-IM8I8SKJ1J9_KCMI",
                            lan
                          )}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="dateOfExpiry"
                          headerText={GetLabelByName(
                            "HCM-IM8I8SKJ1J9_KCMI",
                            lan
                          )}
                          type="date"
                          format="dd/MMM/yyyy"
                          editType="dateedit"
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
                      toolbar={toolbarOptions}
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
                          headerText={GetLabelByName(
                            "HCM-RWMIP9K3NEH_HRPR",
                            lan
                          )}
                          width="70"
                          //edit={earnings}
                        />
                        <ColumnDirective
                          field="email"
                          headerText={GetLabelByName(
                            "HCM-RWMIP9K3NEH_HRPR",
                            lan
                          )}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="phone"
                          headerText={GetLabelByName(
                            "HCM-28JQRN57PA4-PSLL",
                            lan
                          )}
                          editType="numericedit"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="address"
                          headerText={GetLabelByName(
                            "HCM-7WIK8PDIQOV-LOLN",
                            lan
                          )}
                          editType="text"
                          // editTemplate={editTemplate}
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
                      toolbar={toolbarOptions}
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
                          headerText={GetLabelByName(
                            "HCM-RWMIP9K3NEH_HRPR",
                            lan
                          )}
                          width="70"
                          // edit={earnings}
                        />
                        <ColumnDirective
                          field="relation.name"
                          headerText={GetLabelByName(
                            "HCM-RWMIP9K3NEH_HRPR",
                            lan
                          )}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="email"
                          headerText={GetLabelByName(
                            "HCM-L8D4N8LGAS_PSLL",
                            lan
                          )}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="phone"
                          headerText={GetLabelByName(
                            "HCM-28JQRN57PA4-PSLL",
                            lan
                          )}
                          editType="numericedit"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="nationality.name"
                          headerText={GetLabelByName(
                            "HCM-7WIK8PDIQOV-LOLN",
                            lan
                          )}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="address"
                          headerText={GetLabelByName(
                            "HCM-7WIK8PDIQOV-LOLN",
                            lan
                          )}
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
                      toolbar={toolbarOptions}
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
                          headerText={GetLabelByName(
                            "HCM-RWMIP9K3NEH_HRPR",
                            lan
                          )}
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
                          headerText={GetLabelByName(
                            "HCM-28JQRN57PA4-PSLL",
                            lan
                          )}
                          editType="numericedit"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="email"
                          headerText={GetLabelByName(
                            "HCM-L8D4N8LGAS_PSLL",
                            lan
                          )}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="address"
                          headerText={GetLabelByName(
                            "HCM-7WIK8PDIQOV-LOLN",
                            lan
                          )}
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
                      toolbar={toolbarOptions}
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
                      toolbar={toolbarOptions}
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
            </CCardBody>

            <CCardFooter>
              {/* <CButton onClick={submitRequest} style={{ marginRight: 5, float: "right" }} type="submit" size="sm" color="success" >
                <CIcon name="cil-scrubber" /> Submit
              </CButton> */}
              <CButton
                onClick={refreshPage}
                style={{ marginRight: 5, float: "right" }}
                type="reset"
                size="sm"
                color="danger"
              >
                <CIcon name="cil-ban" /> <CSLab code="HCM-MELULU9B6R_KCMI" />
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default EmployeeDetail;
