import React, { useState, useRef, useEffect } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
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
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { CFormSelect } from "@coreui/bootstrap-react";
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
  GetEmployeeNextOfKin,
  GetIdTypes,
  GetNationality,
  GetRelationTypes,
  PostBeneficiary,
  PostDependantDetails,
  PostEmployeeEmergencyContact,
  PostEmployeeGuarantor,
  PostEmployeeNextOfKin,
} from "src/reusable/API/EmployeeRelationshipsEndPoint";
import axios from "axios";
import { RelationTypes } from "src/reusable/API/EmployeeFamilyEndPoint";
import { ConsoleIcon } from "evergreen-ui";
import { HandleRelationTypes } from "src/reusable/API/RelationshipTypesEndPoint";
import FormModal from "./modal/FormModal";
import GuarantorForm from "./forms/GuarantorFor";
import DependantForm from "./forms/DependantForm";
import BeneficiaryForm from "./forms/BeneficiaryForm";
import EmergencyContactForm from "./forms/EmergencyContact";
import NextOfKinForm from "./forms/NextOfKinForm";
import useMultiFetch from "src/hooks/useMultiFetch";
import useFetch from "src/hooks/useFetch";
import usePost from "src/hooks/usePost";

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
let relationTs;
let datasource = [];

const getAllTypes = () => {
  HandleRelationTypes().then((res) => {
    datasource = res;
    relationTs = () => {
      const data = {
        dataSource: new DataManager(datasource),
        fields: { text: "name", value: "id" },
        query: new Query(),
      };
    };
  });
};
getAllTypes();
console.log({ relationTs });
setTimeout(() => {}, 2000);

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
//HandleRelationTypes();
let types;
HandleRelationTypes().then((response) => {
  console.log(response);
  types = response;
});
console.log({ HandleRelationTypes: HandleRelationTypes() });

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


const toolbarOptions = [
  "Add",
  {
    text: "Save",
    tooltipText: "Save",
    prefixIcon: "e-save",
    id: "saveItems",
    align: "Right",
  },
];



const EmployeeDetail = (props) => {
  // const [showEmpModal, setshowEmpModal] = useState(false);
  // const [showEmpModal1, setshowEmpModal1] = useState(false);
  const [show, setShow] = useState(true);
  const [grid, setGrid] = useState(null);
  // const [recEarnings, setRecEarnings] = useState(sampleData);
  const trans = useRef(null);
  const [editOptions] = useState({
    allowEditing: false,
    allowAdding: true,
    allowDeleting: true,
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

  const [empDisplayName, setEmpDisplayName] = useState("");
  const [handleId, setHandleId] = useState("");
  const [viewinfo, setViewInfo] = useState([]);
  const [emergencyContact, setEmergencyContact] = useState([]);
  const [nextOfKin, setGetNextOfKin] = useState([]);
  const [guarantor, setGetGuarantor] = useState([]);
  const [benefiaciary, setGetBenefiary] = useState([]);
  const [dependant, setDependant] = useState([]);
  const [relationTypes, setRelationTypes] = useState([]);
  const [showTypes, setShowTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nationality, setNationality] = useState([]);
  const canSave = [fname, lname, relation, phone, address].every(Boolean);

  const firstGrid = useRef(null);
  const secondGrid = useRef(null);
  const thirdGrid = useRef(null);
  const fourthGrid = useRef(null);
  const fifthGrid = useRef(null);
  const [formTitle, setFormTitle] = useState("");
  const [currentFormData, setCurrentFormData] = useState({});
  const [checkedTypes, setCheckedTypes] = useState([]);
  const [checkedTypesGuarantor, setCheckedTypesGuarantor] = useState([]);
  const [checkedTypesNextOfKin, setCheckedTypesNextOfKin] = useState([]);
  const [checkedBeneficiaryTypes, setCheckedBeneficiaryTypes] = useState([]);
  const [identityTypes, setIdentityTypes] = useState([]);

const [postbene, setPostBene]=useState([])
const [postDep, setPostDep]=useState([])
const [postEmerg,setPostEmerg]=useState([])
const [postGua,setPostGuar]= useState([])
const [postNxtofK, setPostNxtofK]=useState([])
  // const submitBtn =  useRef(null)




  const actionBegin2 = () => {};

  const toolbarOptions = [
    "Add",
    {
      text: "Save",
      tooltipText: "Save",
      prefixIcon: "e-save",
      id: "saveItems",
      align: "Right",
    },
  ];

  console.log({ types });
  const [activeKey, setActiveKey] = useState(1);

  // const [large, setLarge] = useState(false);

  //relationTs();

  const searchReset = () => {
    setShow(true);
    setSearchInput("");
    setCurrentFormData("")
  

    // const [grid,] = useState(null);

    // const OnSaveContinueClick = () => {
    //     console.log(grid);
    // }
  };

  const onCompleteAction = (args) => {
    console.log(getValue("name", args));
    console.log(grid);
    if (grid) {
      // here you can update the new row data by using setRowData method of Grid
      // grid.setRowData(newData.id, newData);
      console.log({ showGridItems: grid });
    }
  };

  const submitRequest = (args) => {
    if ( args.item.id === "saveItems") {
      console.log(activeKey)
      if(activeKey === 1){
        console.log(postbene);
            setPostData(postbene)
   setPostUrl(PostBeneficiary())
      }
      if(activeKey === 2){
        console.log(activeKey);
       //console.log(postDep);
         setDependentPostUrl(PostDependantDetails())
         setDependantPostData(postDep)
      }
      if(activeKey === 3){
        console.log(activeKey);
        setEmegencyContactPostUrl(PostEmployeeEmergencyContact())
         setEmegencyContactPostData(postEmerg)
//console.log(postEmerg);
      }
      if(activeKey === 4){
        console.log(activeKey);
       setGuarrantorPostUrl(PostEmployeeGuarantor())
        setPostGuarrantorData(postGua)
      }
      if(activeKey === 5 ){
        console.log(activeKey);
        setNOKPostUrl(PostEmployeeNextOfKin())
        setPostNOK(postNxtofK)
      }

    


      
    } else {
      console.log("ELSE");
    }

    //console.log({ value: firstGrid });
  };

  const actionComplete = (args) => {
    // if (args.requestType === 'add') {
    //   args.cancel = true
    //   console.log(sampleData)
    // }

    if (args.requestType === "save") {
      // setRecEarnings(firstGrid.current.currentViewData)
      let currentData = firstGrid.current.currentViewData;
      //console.log(sampleData)
      console.log(currentData);
      // getSampleData(currentData);

      // console.log(newdata)
      // let result = differenceWith(currentData, sampleData, isEqual);
      //setRecEarnings(newdata)
    }
  };
  var values = ColumnDirective.getValue;

  const onCommandClick = (args) => {
    console.log("on command click");
    onCompleteAction(args);
  };



const  {data:multicallData, setUrls} =  useMultiFetch([], (results) => {
      
  setGetBenefiary([...results[0].data]);
  setDependant([...results[1].data]);
  setEmergencyContact([...results[2].data]);
  setGetGuarantor([...results[3].data]);
  setRelationTypes([...results[4].data]);
  setGetNextOfKin([...results[5].data])
})

useEffect(() => {

setUrls([GetBeneficiary(handleId), 
  GetEmployeeDependant(handleId), GetEmployeeEmergencyContact(handleId), 
  GetEmployeeGuarantor(handleId),RelationTypes(),GetEmployeeNextOfKin(handleId)])
return () => {
  
}
}, [handleId,setUrls])





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
     
    }
  };

  const integerParams = {
    params: {
      // decimals: 1,
      format: "N",
      min: 0,
    },
  };
  var arr = [];


//Beneficiary
  const  {setData:setPostData, setUrl:setPostUrl} = usePost('', (response) => {
    // console.log({location:response });
    setShow(false);
    const {data} = response
    if ("" === data) {
      toast.success(GetLabelByName("HCM-HAGGXNJQW2B_HRPR", lan));
      //showToasts();
      //handleReset(2);
      searchReset()
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

  //HANDLE DEPENDANT POST
  const  {setData:setDependantPostData, setUrl:setDependentPostUrl} = usePost('', (response) => {
    // console.log({location:response });
    setShow(false);
    const {data} = response
    if ("" === data) {
      toast.success(GetLabelByName("HCM-HAGGXNJQW2B_HRPR", lan));
      //showToasts();
      searchReset()
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

  //HANDLE EMERGENCY CONTACT 
  const  {setData:setEmegencyContactPostData, setUrl:setEmegencyContactPostUrl} = usePost('', (response) => {
    // console.log({location:response });
    setShow(false);
    const {data} = response
    if ("" === data) {
      toast.success(GetLabelByName("HCM-HAGGXNJQW2B_HRPR", lan));
      //showToasts();
      searchReset()
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

  //HANDLE GUARANTOR POST
  const  {setData:setPostGuarrantorData, setUrl:setGuarrantorPostUrl} = usePost('', (response) => {
    // console.log({location:response });
    setShow(false);
    const {data} = response
    if ("" === data) {
      toast.success(GetLabelByName("HCM-HAGGXNJQW2B_HRPR", lan));
      //showToasts();
      searchReset()
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

  //HANDLE NEXT OF KIN POST
  const  {setData:setPostNOK, setUrl:setNOKPostUrl} = usePost('', (response) => {
    // console.log({location:response });
    setShow(false);
    const {data} = response
    if ("" === data) {
      toast.success(GetLabelByName("HCM-HAGGXNJQW2B_HRPR", lan));
      //showToasts();
      searchReset()
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


  let getName=(data,id)=>{
    return data.find(x=>x.id=== id)?.name || "Not Found"
  }




  const submitBtn = () => {
    // Beneficiary
    if (activeKey === 1) {
      if (!currentFormData?.firstName || submitData?.firstName === "") {
        toast.error("Please Enter First Name!", toastWarning);
        return;
      }
      if (!currentFormData?.lastName || submitData?.lastName === " ") {
        toast.error("Please Enter Last Name!", toastWarning);
        return;
      }
      if (!currentFormData?.phone || submitData?.phone === " ") {
        toast.error("Please Enter Phone Number!", toastWarning);
        return;
      }
      if (!currentFormData?.address || submitData?.address === " ") {
        toast.error("Please Enter Address!", toastWarning);
        return;
      }
      if (!currentFormData?.percentage || submitData?.percentage === " ") {
        toast.error("Please Enter Percentage!", toastWarning);
        return;
      }
      if (!currentFormData?.relationId || submitData?.relationId == -1) {
        toast.error("Please Select a Relation!", toastWarning);
        return;
      }

    
      // console.log(submitData)
      let employeeId = handleId;
      //  let newData = { ...submitData, option: options, companyId: TestCompanyId }
      let newData = {
        ...currentFormData,
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "string",
        CompanyReference: "00001_A01",
        employeeId,
      };
      console.log(currentFormData);
      let benefiaciaryGridData={
      
        ...currentFormData,
        relation : {
          name: getName(relationTypes,currentFormData?.relationId)
        },
        
      }
      console.log(benefiaciaryGridData);
     setGetBenefiary((prevState)=>[benefiaciaryGridData,...prevState])
     setPostBene(newData)
     checkBenefiary();
      
    }
    //HANDLE DEPENDANT
    if (activeKey === 2) {
      console.log(submitData);
      if (!currentFormData?.firstName || submitData?.firstName === "") {
        toast.error("Please Enter First Name!", toastWarning);
        return;
      }
      if (!currentFormData?.lastName || submitData?.lastName === " ") {
        toast.error("Please Enter Last Name!", toastWarning);
        return;
      }

      if (!currentFormData?.dateOfBirth || submitData?.dateOfBirth === " ") {
        toast.error("Please Enter Date Of Birth!", toastWarning);
        return;
      }
      if (!currentFormData?.address || submitData?.address === " ") {
        toast.error("Please Enter Address!", toastWarning);
        return;
      }
      if (
        !currentFormData?.relationTypeId ||
        submitData?.relationTypeId === -1
      ) {
        toast.error("Please Select Relation!", toastWarning);
        return;
      }
      if (!currentFormData?.nationalityId || submitData?.nationalityId === -1) {
        toast.error("Please Select Nationality!", toastWarning);
        return;
      }
      if (
        !currentFormData?.identityTypeId ||
        submitData?.identityTypeId === -1
      ) {
        toast.error("Please Select ID Type!", toastWarning);
        return;
      }
      if (
        !currentFormData?.identityNumber ||
        submitData?.identityNumber === " "
      ) {
        toast.error("Please Enter ID Number!", toastWarning);
        return;
      }
      if (!currentFormData?.dateOfExpiry || submitData?.dateOfExpiry === " ") {
        toast.error("Please Enter Expiry Date!", toastWarning);
        return;
      }
      // console.log(submitData)
      let employeeId = handleId;
      //  let newData = { ...submitData, option: options, companyId: TestCompanyId };
      let newData = {
        ...currentFormData,
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "string",
        companyReference: "00001_A01",
        employeeId,
      };



      console.log({ newData });
      let posting= {
       ...currentFormData,
         firstName: currentFormData?.firstName,
         lastName: currentFormData?.lastName,
         dateOfBirth:  currentFormData?.dateOfBirth,
         address: currentFormData?.address,
       dateOfExpiry:  currentFormData?.dateOfExpiry,
         identityType: {
            
             name: getName(identityTypes,currentFormData?.identityTypeId)
         },
         relation: {
           
            
             name: getName(checkedTypes,currentFormData?.relationTypeId)
         },
         "nationality": {
            
          
             "name": getName(nationality,currentFormData?.nationalityId)
         },
        
    }
    console.log(posting);
 setDependant((prevState)=>[posting,...prevState])
   setPostDep(newData)

   checkRelationDependant();
    }
    //handle Emegency Contact
    if (activeKey === 3) {
      if (!currentFormData?.firstName || submitData?.firstName === "") {
        toast.error("Please Enter First Name!", toastWarning);
        return;
      }
      if (!currentFormData?.lastName || submitData?.lastName === " ") {
        toast.error("Please Enter Last Name!", toastWarning);
        return;
      }

      if (!currentFormData?.phone || submitData?.phone === " ") {
        toast.error("Please Enter Phone Number!", toastWarning);
        return;
      }
      if (!currentFormData?.address || submitData?.address === " ") {
        toast.error("Please Enter Address!", toastWarning);
        return;
      }
      if (!currentFormData?.email || submitData?.email === -1) {
        toast.error("Please Enter Email!", toastWarning);
        return;
      }
      // console.log(submitData)
      let employeeId = handleId;
      //  let newData = { ...submitData, option: options, companyId: TestCompanyId };
      let newData = {
        ...currentFormData,
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "string",
        companyReference: "00001_A01",
        employeeId,
        name: `${currentFormData?.firstName} ${currentFormData?.lastName}`,
      };

      let posting=  {
       
        name: `${currentFormData?.firstName} ${currentFormData?.lastName}`,
        email : currentFormData?.email,
        phone : currentFormData?.phone,
        address : currentFormData?.address,
      
      }
      console.log({ newData });
      // postEmergencyContact(newData);
      setPostEmerg(newData)
      setEmergencyContact((prevState)=>[posting, ...prevState])
      
    }
    //handle Guarantor
    if (activeKey === 4) {
      if (!currentFormData?.firstName || submitData?.firstName === "") {
        toast.error("Please Enter First Name!", toastWarning);
        return;
      }
      if (!currentFormData?.lastName || submitData?.lastName === " ") {
        toast.error("Please Enter Last Name!", toastWarning);
        return;
      }

      if (!currentFormData?.phone || submitData?.phone === " ") {
        toast.error("Please Enter Phone Number!", toastWarning);
        return;
      }
      if (!currentFormData?.address || submitData?.address === " ") {
        toast.error("Please Enter Address!", toastWarning);
        return;
      }
      if (!currentFormData?.relationId || submitData?.relationId === -1) {
        toast.error("Please Select Relation", toastWarning);
        return;
      }
      if (!currentFormData?.email || submitData?.email === -1) {
        toast.error("Please Enter Email!", toastWarning);
        return;
      }
      if (
        !currentFormData?.nationalityId ||
        submitData?.nationalityId === "-1"
      ) {
        toast.error("Please Select Nationality", toastWarning);
        return;
      }
      if (!currentFormData?.occupation || submitData?.occupation === "-1") {
        toast.error("Please Enter Occupation", toastWarning);
        return;
      }
      setShow(false);
      // console.log(submitData)
      let employeeId = handleId;
      //  let newData = { ...submitData, option: options, companyId: TestCompanyId };
      let newData = {
        ...currentFormData,
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "string",
        companyReference: "00001_A01",
        employeeId,
        name: `${currentFormData?.firstName} ${currentFormData?.lastName}`,
      };

      let posting=  {
        
        name: `${currentFormData?.firstName} ${currentFormData?.lastName}`,
        phone: currentFormData?.phone,
        occupation: currentFormData?.occupation,
        address: currentFormData?.address,
       
        nationality: {
          
          name: getName(nationality,currentFormData?.nationalityId )
        },
        relation: {
         
          name: getName(checkedTypesGuarantor,currentFormData?.relationId)
        }
      }
      setPostGuar(newData)
      setGetGuarantor((prevState)=>[posting,...prevState])
      checkRelationGuarantor();
   
    }
    //handle Next oF Kin
    if (activeKey === 5) {
      if (!currentFormData?.firstName || submitData?.firstName === "") {
        toast.error("Please Enter First Name!", toastWarning);
        return;
      }
      if (!currentFormData?.lastName || submitData?.lastName === " ") {
        toast.error("Please Enter Last Name!", toastWarning);
        return;
      }

      if (!currentFormData?.phone || submitData?.phone === " ") {
        toast.error("Please Enter Phone Number!", toastWarning);
        return;
      }
      if (!currentFormData?.address || submitData?.address === " ") {
        toast.error("Please Enter Address!", toastWarning);
        return;
      }
      if (!currentFormData?.relationId || submitData?.relationId === -1) {
        toast.error("Please Select Relation", toastWarning);
        return;
      }
      if (!currentFormData?.email || submitData?.email === "") {
        toast.error("Please Enter Email!", toastWarning);
        return;
      }
      if (!currentFormData?.nationalityId || submitData?.nationalityId === -1) {
        toast.error("Please Select Nationality", toastWarning);
        return;
      }

      // console.log(submitData)
      let employeeId = handleId;
      //  let newData = { ...submitData, option: options, companyId: TestCompanyId };
      let newData = {
        ...currentFormData,
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "string",
        companyReference: "00001_A01",
        employeeId,
        name: `${currentFormData?.firstName} ${currentFormData?.lastName}`,
      };
      
      // postNextOfKin(newData);

let handleGrid=  {
 
  "name": `${currentFormData?.firstName} ${currentFormData?.lastName}`,
  "email": currentFormData?.email,
  "relationId": currentFormData?.relationId ,
  "phone": submitData?.phone,

  "address": currentFormData?.address,
 
  "relation": {
    "id": currentFormData?.relationId ,
   
    "name": getName(relationTypes,currentFormData?.relationId)
  },
  "nationality": {
    "id": currentFormData?.nationalityId ,
    "name": getName(nationality,currentFormData?.nationalityId)
  }
}

      setGetNextOfKin((prevState)=>[handleGrid,...prevState])
      setPostNxtofK(newData)
      checkRelationNextOfKin();
    }
  };

console.log(submitData?.relationId);

console.log(show);
  //Post Employee Beneficiary
  function postBeneficiary(data) {
    //console.log("post data", data);
    PostRequest(PostBeneficiary(), { data: data })
      .then((response) => {
        response.text().then((data) => {
          if ("" == data) {
            toast.success("Employee Beneficiary Added Successfully!");
            console.log("success");
          //  MultipleGetRequests();
            setCurrentFormData("");
          } else {
            try {
              data = JSON.parse(data);
              toast.error(
                data?.reason
                  ? data?.reason
                  : "Failed to Add Employee Beneficiary",
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
  //post Dependant
  function postDependant(data) {
    console.log("post data", data);
    PostRequest(PostDependantDetails(), { data: data })
      .then((response) => {
        response.text().then((data) => {
          if ("" == data) {
            toast.success("Employee Dependant Added Successfully!");
            console.log("success");
            //MultipleGetRequests();
            setCurrentFormData("");
          } else {
            try {
              data = JSON.parse(data);
              toast.error(
                data?.reason
                  ? data?.reason
                  : "Failed to Add Employee Dependant",
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
  //Post Emergency Contact
  function postEmergencyContact(data) {
    console.log("post data", data);
    PostRequest(PostEmployeeEmergencyContact(), { data: data })
      .then((response) => {
        response.text().then((data) => {
          if ("" == data) {
            toast.success("Emergency Contact Added Successfully!");
            console.log("success");
           // MultipleGetRequests();
            setCurrentFormData("");
          } else {
            try {
              data = JSON.parse(data);
              toast.error(
                data?.reason ? data?.reason : "Failed to Add Emergency Contact",
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
  // Post Guarantor
  function postGuarantor(data) {
    console.log("post data", data);
    PostRequest(PostEmployeeGuarantor(), { data: data })
      .then((response) => {
        response.text().then((data) => {
          if ("" == data) {
            toast.success("Employee Guarantor Added Successfully!");
            console.log("success");
          //  MultipleGetRequests();
            setCurrentFormData("");
          } else {
            try {
              data = JSON.parse(data);
              toast.error(
                data?.reason
                  ? data?.reason
                  : "Failed to Add Employee Guarantor",
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
  // Post Next Of Kin
  function postNextOfKin(data) {
    console.log("post data", data);
    PostRequest(PostEmployeeNextOfKin(), { data: data })
      .then((response) => {
        response.text().then((data) => {
          if ("" == data) {
            toast.success("Employee Guarantor Added Successfully!");
            console.log("success");
            //MultipleGetRequests();
            // handleNextOfKin();
            setCurrentFormData("");
          } else {
            try {
              data = JSON.parse(data);
              toast.error(
                data?.reason
                  ? data?.reason
                  : "Failed to Add Employee Guarantor",
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

  const handleFormChange = (e) => {
    setCurrentFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setSubmitData((data) => {
      return { ...data, [e?.target?.name]: e?.target?.value };
    }); 
  };
  const  {data:multical} =  useMultiFetch([ 
    GetNationality(),GetIdTypes()], (results) => {



      // setRelationTypes([...results[0].data]);
      setNationality([
        { id: "-1", name: `Select Nationality` },
        ...results[0].data,
      ]);
      setIdentityTypes([
        { id: "-1", name: `Select ID Type` },
        ...results[1].data,
      ]);


        
  
  })

  const ben_actionBegin = (args) => {
    console.log({ beneficiary: args });
    checkRelationDependant();
    checkRelationGuarantor();
    checkRelationNextOfKin();
    checkBenefiary();
    if (args.requestType === "add") {
      args.cancel = true;
      setShowModal(true);
    }
  };

  let content = null;
  if (activeKey === 1) {
    content = (
      <BeneficiaryForm
        currentFormData={currentFormData}
        handleFormChange={handleFormChange}
        setCurrentFormData={setCurrentFormData}
        view={checkedBeneficiaryTypes}
      />
    );
  }
  if (activeKey === 2) {
    content = (
      <DependantForm
        currentFormData={currentFormData}
        handleFormChange={handleFormChange}
        setCurrentFormData={setCurrentFormData}
        view={checkedTypes}
        nationality={nationality}
        id={identityTypes}


      />
    );
  }
  if (activeKey === 3) {
    content = (
      <EmergencyContactForm
        currentFormData={currentFormData}
        handleFormChange={handleFormChange}
        setCurrentFormData={setCurrentFormData}
      />
    );
  }
  if (activeKey === 4) {
    content = (
      <GuarantorForm
        currentFormData={currentFormData}
        handleFormChange={handleFormChange}
        setCurrentFormData={setCurrentFormData}
        view={checkedTypesGuarantor}
        nationality={nationality}
        id={identityTypes}
      />
    );
  }
  if (activeKey === 5) {
    content = (
      <NextOfKinForm
        currentFormData={currentFormData}
        handleFormChange={handleFormChange}
        setCurrentFormData={setCurrentFormData}
        view={checkedTypesNextOfKin}
        nationality={nationality}
      />
    );
  }

  // console.log({ currentFormData });
  // console.log({ relationTypes });
  // console.log({ benefiaciary });
  var arr = [];

  // checkRelation
  const checkRelationDependant = () => {
    if (dependant.length > 0) {
      for (let i = 0; i < dependant.length; i++) {
        var obj = {};
        obj = dependant[i].relation;
        arr.push(obj);
      }

      const newdata = relationTypes.filter((val) => {
        return !arr.find((arr) => {
          console.log({ valueID: val.id + ": " + arr.id });
          return (
            (val.name === "Mother" && arr.name === "Mother") ||
            (val.name === "Father" && arr.name === "Father")
          );
        });
      });
      setCheckedTypes(newdata);
      console.log(newdata);
    } else {
      setCheckedTypes(relationTypes);
    }
  };
  // checkRelation
  var temp = [];
  const checkRelationGuarantor = () => {
    if (guarantor.length > 0) {
      for (let i = 0; i < guarantor.length; i++) {
        var obj = {};
        obj = guarantor[i].relation;
        temp.push(obj);
      }

      const newdata = relationTypes.filter((val) => {
        return !temp.find((arr) => {
          console.log({ valueID: val.id + ": " + arr.id });
          return (
            (val.name === "Mother" && arr.name === "Mother") ||
            (val.name === "Father" && arr.name === "Father")
          );
        });
      });
      setCheckedTypesGuarantor(newdata);
      console.log(newdata);
    } else {
      setCheckedTypesGuarantor(relationTypes);
    }
  };

  //Check Next Of Kin Relation
  var arryKin = [];
  const checkRelationNextOfKin = () => {
    if (nextOfKin.length > 0) {
      for (let i = 0; i < nextOfKin.length; i++) {
        var obj = {};
        obj = nextOfKin[i].relation;
        arryKin.push(obj);
        console.log({ Object: obj });
      }
      console.log({ arryKin });
      const newdata = relationTypes.filter((val) => {
        return !arryKin.find((arr) => {
          console.log({ valueID: val.id + ": " + arr.id });
          return (
            (val.name === "Mother" && arr.name === "Mother") ||
            (val.name === "Father" && arr.name === "Father")
          );
        });
      });
      setCheckedTypesNextOfKin(newdata);
      console.log(newdata);
    } else {
      setCheckedTypesNextOfKin(relationTypes);
    }
  };
  var beneficiaryArr = [];
  const checkBenefiary = () => {
    if (benefiaciary.length > 0) {
      for (let i = 0; i < benefiaciary.length; i++) {
        var obj = {};
        obj = benefiaciary[i].relation;
        beneficiaryArr.push(obj);
      }

      const newdata = relationTypes.filter((val) => {
        return !beneficiaryArr.find((arr) => {
          console.log({ valueID: val.id + ": " + arr.id });
          return (
            (val.name === "Mother" && arr.name === "Mother") ||
            (val.name === "Father" && arr.name === "Father")
          );
        });
      });
      setCheckedBeneficiaryTypes(newdata);
      console.log(newdata);
    } else {
      setCheckedBeneficiaryTypes(relationTypes);
    }
  };

  useEffect(() => {
    checkRelationDependant();
  }, [dependant]);
  useEffect(() => {
    checkRelationGuarantor();
  }, [nextOfKin]);
  useEffect(() => {
    checkBenefiary();
  }, [benefiaciary]);

  console.log( checkedTypes);


  return (
    <>
      <CRow hidden={!show}>
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-ETP5RDAYHNK_LANG" />
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
            <CCardBody>
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
                      active={activeKey === 3}
                      onClick={() => setActiveKey(3)}
                    >
                      <CSLab code="HCM-C7C1XLFCOS5-LANG" />
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      href="#"
                      active={activeKey === 4}
                      onClick={() => setActiveKey(4)}
                    >
                      <CSLab code="HCM-2VDPTKA7U9T-LOLN" />
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      href="#"
                      active={activeKey === 5}
                      onClick={() => setActiveKey(5)}
                    >
                      Next of Kin
                    </CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  
                    
                  <CTabPane visible={activeKey === 1 ? "true" : "false"}>
               
                   <GridComponent
                     height={300}
                     actionComplete={actionComplete}
                     dataSource={benefiaciary}
                     allowPaging={true}
                     pageSettings={{ pageSize: 8 }}
                     editSettings={editOptions}
                     ref={firstGrid}
                     toolbar={toolbarOptions}
                     toolbarClick={submitRequest}
                     actionBegin={ben_actionBegin}
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
                         headerText={GetLabelByName(
                           "HCM-RWMIP9K3NEH_HRPR",
                           lan
                         )}
                         editType="dropdownedit"
                         width="100"
                         textAlign="Center"
                         // template={tem}
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
                         edit={integerParams}
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
                      toolbarClick={submitRequest}
                      actionBegin={ben_actionBegin}
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
                          headerText={GetLabelByName("HCM-6CU7NZJCKLF", lan)}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="dateOfBirth"
                          headerText={GetLabelByName(
                            "HCM-XYNVK7A8USK_PSLL",
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
                            "HCM-7WIK8PDIQOV-LOLN",
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
                            "HCM-IM8I8SKJ1J9_KCMI",
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
                            "HCM-RWMIP9K3NEH_HRPR",
                            lan
                          )}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="identityType.name"
                          headerText={GetLabelByName(
                            "HCM-YIEJZNSN8L_PSLL",
                            lan
                          )}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="dateOfExpiry"
                          headerText={GetLabelByName(
                            "HCM-JKZ3735Q4D-LOLN",
                            lan
                          )}
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
                      toolbar={toolbarOptions}
                      toolbarClick={submitRequest}
                      actionBegin={ben_actionBegin}
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
                            "HCM-DQLFZZ9A4F6-LASN",
                            lan
                          )}
                          width="70"
                          //edit={earnings}
                        />
                        <ColumnDirective
                          field="email"
                          headerText={GetLabelByName(
                            "HCM-CXLK7IYZ9B9-KCMI",
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
                      toolbarClick={submitRequest}
                      actionBegin={ben_actionBegin}
                      // actionBegin={actionBegin}
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
                          headerText={GetLabelByName(
                            "HCM-DQLFZZ9A4F6-LASN",
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
                          headerText={GetLabelByName(
                            "HCM-28JQRN57PA4-PSLL",
                            lan
                          )}
                          editType="numericedit"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="occupation"
                          headerText={GetLabelByName(
                            "HCM-RZ2I74RYDFN-KCMI",
                            lan
                          )}
                          editType="text"
                          width="100"
                          textAlign="Center"
                        />
                        <ColumnDirective
                          field="nationality.name"
                          headerText={GetLabelByName(
                            "HCM-IM8I8SKJ1J9_KCMI",
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
                      dataSource={nextOfKin}
                      height={300}
                      allowPaging={true}
                      pageSettings={{ pageSize: 10 }}
                      editSettings={editOptions}
                      ref={fifthGrid}
                      commandClick={onCommandClick}
                      toolbar={toolbarOptions}
                      toolbarClick={submitRequest}
                      actionBegin={ben_actionBegin}
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
                            "HCM-DQLFZZ9A4F6-LASN",
                            lan
                          )}
                          width="70"
                        />
                        <ColumnDirective
                          field="relation.name"
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
                </CTabContent>
              </CTabs>
            </CCardBody>
            <CCardFooter>
                <CButton
                 style={{ marginRight: 9, float: "right", color: "white" }}
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
      <FormModal
        show={showModal}
        activeKey={activeKey}
        setShow={setShowModal}
        submitBtn={submitBtn}
        setCurrentFormData={setCurrentFormData}
      >
        {content}
      </FormModal>
    </>
  );
};

export default EmployeeDetail;
