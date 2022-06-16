import React, { useState, useRef } from "react";
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

const earnings = {
  params: {
    actionComplete: () => false,
    allowFiltering: true,
    dataSource: new DataManager(sampleData),
    fields: { text: "name", value: "name" },
    query: new Query(),
  },
};
console.log("trials", earnings.params.fields )
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

  console.log(fname);
  const canSave = [fname, lname, relation, phone, address].every(Boolean);

  const firstGrid = useRef(null);

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
      console.log({ value: firstGrid?.current?.currentViewData });
    }

    //console.log({ value: firstGrid });
  };

  const actionBegin = (args) => {
    console.log(args);
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

  const onCommandClick = (args) => {
    onCompleteAction(args);
  };

  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>Employee Relationships</h5>
        </CCol>
      </CRow>
      <CRow>
        <CCol md="4">
          <CFormGroup>
            <CInputGroup>
              <CInput
                className="border-left-curve"
                type="text"
                id="username3"
                name="username3"
                autoComplete="name"
                placeholder="Search by Employee ID or name"
              />
              <CInputGroupAppend>
                <CButton
                  onClick={() => setShow(!show)}
                  className="border-right-curve"
                  color="primary"
                >
                  <CIcon name="cil-magnifying-glass" />
                </CButton>
              </CInputGroupAppend>
            </CInputGroup>
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
              <CTabs>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink
                      href="#"
                      active={activeKey === 1}
                      onClick={() => setActiveKey(1)}
                    >
                      Beneficiary
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      href="#"
                      active={activeKey === 2}
                      onClick={() => setActiveKey(2)}
                    >
                      Dependant
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      href="#"
                      active={activeKey === 6}
                      onClick={() => setActiveKey(6)}
                    >
                      Emergency Contact
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      href="#"
                      active={activeKey === 3}
                      onClick={() => setActiveKey(3)}
                    >
                      Guarantor
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
                          field={"firstname"}
                          editType="text"
                          headerText={"First Name"}
                          width="100"
                          edit={earnings}
                          value={"fname"}
                          //onChange={(e) => setfname(e.target.value)}
                        />
                        <ColumnDirective
                          field="lastname"
                          headerText={"Last Name"}
                          editType="text"
                          width="100"
                          textAlign="Center"
                          // name="lname"
                          // value={lname}
                          // onChange={(e) => setlname(e.target.value)}
                        />
                        <ColumnDirective
                          field="address"
                          headerText={"Address"}
                          editType="text"
                          width="100"
                          textAlign="Center"
                          name="address"
                          // value={address}
                          // onChange={(e) => setAddress(e.target.value)}
                        />
                        <ColumnDirective
                          field="relation"
                          headerText={"Relation"}
                          editType="text"
                          width="100"
                          textAlign="Center"
                          // name="relation"
                          // value={relation}
                          // onChange ={(e)=>setRelation(e.target.value)}
                        />
                        <ColumnDirective
                          field="percentage"
                          headerText={"Percentage"}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          commands={commandOptions}
                          headerText="Action"
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
                      height={300}
                      allowPaging={true}
                      pageSettings={{ pageSize: 8 }}
                      editSettings={editOptions}
                      ref={(g) => setGrid(g)}
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
                          field={"name"}
                          editType="text"
                          headerText={"Name"}
                          width="70"
                          //edit={earnings}
                        />
                        <ColumnDirective
                          field={"relation"}
                          headerText={"Relation"}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="dateofbirth"
                          headerText={"Date of Birth"}
                          editType="datetimeedit"
                          editTemplate={editTemplate}
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="nationality"
                          headerText={"Nationality"}
                          editType="dropdownedit"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          commands={commandOptions}
                          headerText="Action"
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
                      height={300}
                      allowPaging={true}
                      pageSettings={{ pageSize: 8 }}
                      editSettings={editOptions}
                      ref={(g) => setGrid(g)}
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
                          field={"name"}
                          editType="text"
                          headerText={"Name"}
                          width="70"
                          //edit={earnings}
                        />
                        <ColumnDirective
                          field={"relation"}
                          headerText={"Relation"}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="phonenumber"
                          headerText="Phone Number"
                          editType="numericedit"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="address"
                          headerText="Address"
                          editType="text"
                          // editTemplate={editTemplate}
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          commands={commandOptions}
                          headerText="Action"
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
                      height={300}
                      allowPaging={true}
                      pageSettings={{ pageSize: 8 }}
                      editSettings={editOptions}
                      ref={(g) => setGrid(g)}
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
                          field={"name"}
                          editType="text"
                          headerText={"Name"}
                          width="70"
                          // edit={earnings}
                        />
                        <ColumnDirective
                          field={"relation"}
                          headerText={"Relation"}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field={"email"}
                          headerText={"Email"}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="phonenumber"
                          headerText="Phone Number"
                          editType="numericedit"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field={"address"}
                          headerText={"Address"}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          commands={commandOptions}
                          headerText="Action"
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
                      height={300}
                      allowPaging={true}
                      pageSettings={{ pageSize: 8 }}
                      editSettings={editOptions}
                      ref={(g) => setGrid(g)}
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
                          field={"name"}
                          editType="text"
                          headerText={"Name"}
                          width="70"
                          edit={earnings}
                        />
                        <ColumnDirective
                          field={"relation"}
                          headerText={"Relation"}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="phonenumber"
                          headerText="Phone Number"
                          editType="numericedit"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="email"
                          headerText="Email"
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="address"
                          headerText="Address"
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          commands={commandOptions}
                          headerText="Action"
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
                  <CTabPane visible={activeKey === 6 ? "true" : "false"}>
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
                          headerText="Name"
                          width="100"
                        />
                        <ColumnDirective
                          field="numberOfCompanies"
                          headerText="Companies"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="strStatus"
                          headerText="Status"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          commands={commandOptions}
                          headerText="Action"
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
                          headerText={"Savings Scheme Type"}
                          width="70"
                          edit={earnings}
                        />
                        <ColumnDirective
                          field={"ruleValue"}
                          headerText={"Scheme ID"}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="unit"
                          headerText="Employer Contibution"
                          editType="numericedit"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="unit"
                          headerText="Employee Contibution"
                          editType="numericedit"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          commands={commandOptions}
                          headerText="Action"
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
                  <CTabPane visible={activeKey === 8 ? "true" : "false"}>
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
                          headerText={"Relief Type"}
                          width="70"
                          edit={earnings}
                        />
                        <ColumnDirective
                          field={"ruleValue"}
                          headerText={"Scheme ID"}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="unit"
                          headerText="Employer Contibution"
                          editType="numericedit"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="unit"
                          headerText="Employee Contibution"
                          editType="numericedit"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          commands={commandOptions}
                          headerText="Action"
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
                <CIcon name="cil-ban" /> Reset
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default EmployeeDetail;
