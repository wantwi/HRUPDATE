import React, { useState, useRef, useEffect } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
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
  CCardHeader,
} from "@coreui/react";
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

// import { isEqual, differenceWith } from 'react-lodash'
import { CSAutoComplete, CSLab } from "src/reusable/components";
import { toast } from "react-toastify";
import { toastWarning } from "src/toasters/Toaster";
import { SearchEmployees } from "src/reusable/API/EmployeeEndpoints";
import { GetLabelByName } from "src/reusable/configs/config";
import {
  DeleteBeneficiary,
  DeleteDependantDetails,
  DeleteEmployeeEmergencyContact,
  DeleteEmployeeGuarantor,
  DeleteEmployeeNextOfKin,
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
import SweetAlert from "react-bootstrap-sweetalert";
import useDelete from "src/hooks/useDelete";
import useAuth from "src/hooks/useAuth";


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
setTimeout(() => { }, 2000);


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
//HandleRelationTypes();
let types;
HandleRelationTypes().then((response) => {
  types = response;
});

// function refreshPage() {
//   window.location.reload(false);
// }

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
  const [address, setAddress] = useState("");
  const lan = useSelector((state) => state.language);
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
  const [showModal, setShowModal] = useState(false);
  const [nationality, setNationality] = useState([]);
  const canSave = [fname, lname, relation, phone, address].every(Boolean);

  const firstGrid = useRef(null);
  const secondGrid = useRef(null);
  const thirdGrid = useRef(null);
  const fourthGrid = useRef(null);
  const fifthGrid = useRef(null);
  const [currentFormData, setCurrentFormData] = useState({});
  const [checkedTypes, setCheckedTypes] = useState([]);
  const [checkedTypesGuarantor, setCheckedTypesGuarantor] = useState([]);
  const [checkedTypesNextOfKin, setCheckedTypesNextOfKin] = useState([]);
  const [checkedBeneficiaryTypes, setCheckedBeneficiaryTypes] = useState([]);
  const [identityTypes, setIdentityTypes] = useState([]);
  // const submitBtn =  useRef(null)
  const [delEmployeeName, setDelEmployeeName] = useState("")
  const [isActive, setIsActive] = useState(false)
  const [delEmployeeID, setDelEmployeeID] = useState("")
  const [labels, setLabel] = useState("")
  const [EmployeeDependantChildrenList, setEmployeeDependantChildrenList] = useState([])
  const [EmployeeBeneficiaryChildrenList, setEmployeeBeneficiaryChildrenList] = useState([])
  const [EmployeeEmerGencyContactChildrenList, setEmployeeEmerGencyContactChildrenList] = useState([])
  const [EmployeerGurrantoContactChildrenList, setEmployeeGurrantoContactChildrenList] = useState([])
  const [EmployeeNextOfKinChildrenList, setEmployeeNextOfKinChildrenList] = useState([])
  const [checkPercentage, setPercentage] = useState(false)
  const [percent, setPercent] = useState(0)
  const [phone, setPhone] = useState(null);


  //Beneficiary
  const firstNameRef = useRef(null);
  const LastnameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const relationRef = useRef(null);
  const percentageRef = useRef(null);


  const refs = [
    firstNameRef,
    LastnameRef,
    phoneRef,
    addressRef,
    percentageRef
  ]
  const refs2 = [
    relationRef,
  ]
  //Emergency Contact
  const firstNameEmergContactRef = useRef(null);
  const LastnameEmergContactRef = useRef(null);
  const phoneEmergContactRef = useRef(null);
  const addressEmergContactRef = useRef(null);
  const emailEmergContactRef = useRef(null)


  const EmergContRefs = [
    firstNameEmergContactRef,
    LastnameEmergContactRef,
    addressEmergContactRef,
    phoneEmergContactRef,
    emailEmergContactRef

  ]

  //Dependent Refs
  const DependentFirstName = useRef(null);
  const DependentLastName = useRef(null);
  const DependentDOB = useRef(null);
  const DependentAddress = useRef(null);
  const DependentRelation = useRef(null);
  const DependentNationality = useRef(null);
  const DependentIdType = useRef(null);
  const DependentIdNumber = useRef(null);
  const DependentDateOfExpiry = useRef(null);
  const DependentEmail = useRef(null)
  const DependentPhone = useRef(null)

  const DependentRefs = [
    DependentFirstName,
    DependentLastName,
    DependentDOB,
    DependentAddress,
    DependentIdType,
    DependentIdNumber,
    DependentDateOfExpiry,

  ]

  const DependentDropDownRefs = [
    DependentRelation,
    DependentNationality,
  ]

  //Guarrantor Ref
  const GuarrantorfirstNameRef = useRef(null);
  const GuarrantorLastnameRef = useRef(null);
  const GuarrantorphoneRef = useRef(null);
  const GuarrantoraddressRef = useRef(null);
  const GuarrantorRelationRef = useRef(null);
  const GuarrantorNationalityRef = useRef(null);
  const GuarrantorEmailRef = useRef(null)
  const GuarrantorOccupationRef = useRef(null)


  const GuarantorRefs = [
    GuarrantorfirstNameRef,
    GuarrantorLastnameRef,
    GuarrantorphoneRef,
    GuarrantoraddressRef,
    GuarrantorEmailRef,
    GuarrantorOccupationRef

  ]
  const GuarantorDropDownRefs = [
    GuarrantorRelationRef,
    GuarrantorNationalityRef,
  ]



  const NextOfKinFirstNameRef = useRef(null)
  const NextOfKinLastNameRef = useRef(null);
  const NextOfKinPhoneRef = useRef(null)
  const NextOfKinAddress = useRef(null);
  const NextOfKinRelation = useRef(null);
  const NextOfKinNationality = useRef(null)

  const NextOfKinRefs = [
    NextOfKinFirstNameRef,
    NextOfKinLastNameRef,
    NextOfKinPhoneRef,
    NextOfKinAddress,

  ]
  const NextOfKinDropDownRefs = [
    NextOfKinRelation,
    NextOfKinNationality
  ]

  const checkForValue = (ref) => {
    if (ref.current?.value) {
      ref.current.style.border = "1px solid green";
    }
  };

  const actionBegin2 = () => { };

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

  const [activeKey, setActiveKey] = useState(1);

  // const [large, setLarge] = useState(false);

  //relationTs();

  const searchReset = () => {
    console.log("called");
    setShow(true);
    setSearchInput("");
    setCurrentFormData("")
    setSubmitData("")
    refs.forEach((ref) => {

      ref.current.style.border = "1px solid #d8dbe0";
      return


    });
    if (activeKey === 1) {
      setGetBenefiary([])
    }
    if (activeKey === 2) {
      setDependant([])

    }
    if (activeKey === 3) {
      setEmergencyContact([])
    }
    if (activeKey === 4) {
      setGetGuarantor([])
    }
    if (activeKey === 5) {
      setGetNextOfKin([])
    };
  }



  const { auth } = useAuth()
  const { companyReference: CompanyReference } = auth
  const onCompleteAction = (args) => {
    if (activeKey === 1) {
      if (args.commandColumn.type === 'Delete') {

        args.cancel = true;

        setIsActive(true)

        setDelEmployeeName(`${args?.rowData?.employee?.firstName
          } ${args?.rowData?.employee?.lastName
          }`)

        setDelEmployeeID(args?.rowData?.id)
        setLabel("HCM-MS5RN9DANOF-PSLL")
      }
    }
    if (activeKey === 2) {
      if (args.commandColumn.type === 'Delete') {

        args.cancel = true;

        setIsActive(true)

        setDelEmployeeName(`${args?.rowData?.employee?.firstName
          } ${args?.rowData?.employee?.lastName
          }`)

        setDelEmployeeID(args.rowData.id)
        setLabel("HCM-TXJFM19UOAG-LOLN")
      }
    }
    if (activeKey === 3) {
      if (args.commandColumn.type === 'Delete') {

        args.cancel = true;

        setIsActive(true)

        setDelEmployeeName(`${args?.rowData?.employee?.firstName
          } ${args?.rowData?.employee?.lastName
          }`)

        setDelEmployeeID(args.rowData.id)
        setLabel("HCM-C7C1XLFCOS5-LANG")
      }
    }
    if (activeKey === 4) {
      if (args.commandColumn.type === 'Delete') {

        args.cancel = true;

        setIsActive(true)

        setDelEmployeeName(`${args?.rowData?.employee?.firstName
          } ${args?.rowData?.employee?.lastName
          }`)

        setDelEmployeeID(args.rowData.id)
        setLabel("HCM-2VDPTKA7U9T-LOLN")
      }
    }
    if (activeKey === 5) {
      if (args.commandColumn.type === 'Delete') {

        args.cancel = true;

        setIsActive(true)

        setDelEmployeeName(`${args?.rowData?.employee?.firstName
          } ${args?.rowData?.employee?.lastName
          }`)

        setDelEmployeeID(args.rowData.id)
        setLabel("HCM-EP256EK5BS-LASN")
      }
    }

  };

  const submitRequest = (args) => {
    if (args.item.id === "saveItems") {
      if (activeKey === 1) {

        let PostBody = {
          employeeId: handleId,
          createEmployeeBeneficiaryChildren: EmployeeBeneficiaryChildrenList,
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          userName: "string",
          CompanyReference: "00001_A01",
        }
        if (EmployeeBeneficiaryChildrenList.length > 0) {
          setPostData(PostBody)
          setPostUrl(PostBeneficiary())
          PostBody("")
        }
        return;
      }
      if (activeKey === 2) {

        let postBody = {
          employeeId: handleId,
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          userName: "string",
          companyReference: "00001_A01",
          createEmployeeDependantChildren: EmployeeDependantChildrenList,

        }
        if (EmployeeDependantChildrenList.length > 0) {
          setDependentPostUrl(PostDependantDetails())
          setDependantPostData(postBody)
          postBody("")
        }
        return;
      }
      if (activeKey === 3) {
        let Emergency = {
          employeeId: handleId,
          createEmployeeEmergencyContactChildren: EmployeeEmerGencyContactChildrenList,
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          userName: "string",
          companyReference: "00001_A01",
        }
        if (EmployeeEmerGencyContactChildrenList.length > 0) {
          setEmegencyContactPostUrl(PostEmployeeEmergencyContact())
          setEmegencyContactPostData(Emergency)
          Emergency("")
        }
        return;
      }
      if (activeKey === 4) {
        let postbody = {
          employeeId: handleId,
          "createEmployeeGuarantorChildren": EmployeerGurrantoContactChildrenList,
          "companyReference": "string",
          "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }
        if (EmployeerGurrantoContactChildrenList.length > 0) {
          setGuarrantorPostUrl(PostEmployeeGuarantor())
          setPostGuarrantorData(postbody)
          postbody("")
        }
        return;
      }
      if (activeKey === 5) {
        let postbody = {
          employeeId: handleId,
          createEmployeeNextofKinChildren: EmployeeNextOfKinChildrenList,
          companyReference: "string",
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }
        if (EmployeeNextOfKinChildrenList.length > 0) {
          setNOKPostUrl(PostEmployeeNextOfKin())
          setPostNOK(postbody)
          postbody("")
        }
        return;
      }

    } else {
      console.log("ELSE");
    }

  };

  const actionComplete = (args) => {
    if (activeKey == 1) {
      // setPercentage(handlePercentageCalc(BeneficiaryForm))
    }

  };
  var values = ColumnDirective.getValue;

  const onCommandClick = (args) => {
    console.log(args?.rowData);
    if (args.rowData.isDelete === true) {

      if (activeKey === 1) {
        setEmployeeBeneficiaryChildrenList((current) => current.filter((deleteItem) => deleteItem.isDelete !== true));

      }
      if (activeKey === 2) {
        setEmployeeDependantChildrenList((current) => current.filter((deleteItem) => deleteItem.isDelete !== true));


      }
      if (activeKey === 3) {
        setEmployeeEmerGencyContactChildrenList((current) => current.filter((deleteItem) => deleteItem.isDelete !== true));

      }
      if (activeKey === 4) {
        setEmployeeGurrantoContactChildrenList((current) => current.filter((deleteItem) => deleteItem.isDelete !== true));

      }
      if (activeKey === 5) {
        setEmployeeNextOfKinChildrenList((current) => current.filter((deleteItem) => deleteItem.isDelete !== true));

      };
      args.cancel = false;
      return;
    } else {
      onCompleteAction(args);
    }

  };



  const { data: multicallData, setUrls } = useMultiFetch([], (results) => {

    console.log({ results })
    setGetBenefiary([...results[0].data]);
    setDependant([...results[1].data]);
    setEmergencyContact([...results[2].data]);
    setGetGuarantor([...results[3].data]);
    setRelationTypes([...results[4].data]);
    setGetNextOfKin([...results[5].data])

  })

  useEffect(() => {
    console.log(handleId);
    setUrls([GetBeneficiary(handleId),
    GetEmployeeDependant(handleId), GetEmployeeEmergencyContact(handleId),
    GetEmployeeGuarantor(handleId), GetRelationTypes(CompanyReference), GetEmployeeNextOfKin(handleId)])
    console.log(handleId);
  }, [searchResult, handleId, setUrls, CompanyReference])


  useEffect(() => {
  }, [EmployeeDependantChildrenList])




  const handleSearchResultSelect = (results) => {

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
  const { setData: setPostData, setUrl: setPostUrl } = usePost('', (response) => {
    // console.log({location:response });
    setShow(false);
    const { data } = response
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
  const { setData: setDependantPostData, setUrl: setDependentPostUrl } = usePost('', (response) => {
    setShow(false);
    const { data } = response
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
  const { setData: setEmegencyContactPostData, setUrl: setEmegencyContactPostUrl } = usePost('', (response) => {
    // console.log({location:response });
    setShow(false);
    const { data } = response
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
  const { setData: setPostGuarrantorData, setUrl: setGuarrantorPostUrl } = usePost('', (response) => {
    // console.log({location:response });
    setShow(false);
    const { data } = response
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
  const { setData: setPostNOK, setUrl: setNOKPostUrl } = usePost('', (response) => {
    // console.log({location:response });
    setShow(false);
    const { data } = response
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


  let getName = (data, id) => {
    return data.find(x => x.id === id)?.name || "Not Found"
  }




  const submitBtn = () => {
    // Beneficiary

    if (activeKey === 1) {
      refs.forEach((ref) => {
        if (ref.current.value.length > 2) {
          ref.current.style.border = "2px solid green";
        } else if (ref.current.value.length < 1) {
          ref.current.style.border = "2px solid red";
        } else if (ref.current.value === "") {
          ref.current.style.border = "2px solid red";

        } else {
          ref.current.style.border = "2px solid red";

          return

        }
      });
      refs2.forEach((ref) => {
        if (ref.current.value !== "-1") {
          ref.current.style.border = "2px solid green";
        } else if (ref.current.value === "-1") {
          ref.current.style.border = "2px solid red";
        } else if (ref.current.value === "") {
          ref.current.style.border = "2px solid red";

        } else {
          ref.current.style.border = "2px solid red";

          return

        }
      });

      if (!currentFormData?.firstName || submitData?.firstName === "" && !currentFormData?.lastName || submitData?.lastName === "" && !phone || phone === "" && !currentFormData?.address || submitData?.address === "" && !currentFormData?.percentage || submitData?.percentage === "") {
        toast.error(GetLabelByName("HCM-WQ9J7737WDC_LASN", lan), toastWarning);
        return;
      }


      if (!currentFormData?.firstName || submitData?.firstName === "") {
        toast.error("Please Enter First Name!", toastWarning);
        return;
      }
      if (!currentFormData?.lastName || submitData?.lastName === "") {
        toast.error("Please Enter Last Name!", toastWarning);
        return;
      }
      if (!phone || phone === "") {
        toast.error("Please Enter Phone Number!", toastWarning);
        return;
      }
      if (!currentFormData?.address || submitData?.address === "") {
        toast.error("Please Enter Address!", toastWarning);
        return;
      }
      if (!currentFormData?.percentage || submitData?.percentage === "") {
        toast.error("Please Enter Percentage!", toastWarning);
        return;
      }
      if (!currentFormData?.relationId || submitData?.relationId == -1) {
        toast.error("Please Select a Relation!", toastWarning);
        return;
      }


      let benefiaciaryGridData = {
        isDelete: true,
        ...currentFormData,
        relation: {
          name: getName(relationTypes, currentFormData?.relationId),

        },


      }

      let data = {
        ...currentFormData,
        phone: phone,
        isDelete: true
      }

      setGetBenefiary((prevState) => [...prevState, benefiaciaryGridData])
      benefiaciaryGridData("")
      setEmployeeBeneficiaryChildrenList((prev) => [...prev, data])


      checkBenefiary();
      setCurrentFormData("")
      setPhone("")
      setShowModal(false)

    }
    //HANDLE DEPENDANT
    if (activeKey === 2) {
      checkRelationDependant();
      DependentRefs.forEach((ref) => {
        if (ref.current.value.length > 2) {
          ref.current.style.border = "2px solid green";
        } else if (ref.current.value.length < 1) {
          ref.current.style.border = "2px solid red";
        } else if (ref.current.value === "") {
          ref.current.style.border = "2px solid red";

        } else {
          ref.current.style.border = "2px solid red";

          return

        }
      });
      DependentDropDownRefs.forEach((ref) => {
        if (ref.current.value !== "-1") {
          ref.current.style.border = "2px solid green";
        } else if (ref.current.value === "-1") {
          ref.current.style.border = "2px solid red";
        } else if (ref.current.value === "") {
          ref.current.style.border = "2px solid red";

        } else {
          ref.current.style.border = "2px solid red";

          return

        }
      });

      if (!currentFormData?.firstName || submitData?.firstName === "" &&
        !currentFormData?.lastName || submitData?.lastName === "" &&
        !currentFormData?.dateOfBirth || submitData?.dateOfBirth === "" &&
        !currentFormData?.address || submitData?.address === "" &&
        !currentFormData?.relationTypeId ||
        submitData?.relationTypeId === "-1" && !currentFormData?.nationalityId || submitData?.nationalityId === "-1"
        && !currentFormData?.identityTypeId ||
        submitData?.identityTypeId === "-1" && !currentFormData?.identityNumber ||
        submitData?.identityNumber === "" && !currentFormData?.dateOfExpiry || submitData?.dateOfExpiry === "") {
        toast.error(GetLabelByName("HCM-WQ9J7737WDC_LASN", lan), toastWarning);
        return;
      }
      if (!currentFormData?.firstName || submitData?.firstName === "") {
        toast.error("Please Enter First Name!", toastWarning);
        return;
      }
      if (!currentFormData?.lastName || submitData?.lastName === "") {
        toast.error("Please Enter Last Name!", toastWarning);
        return;
      }

      if (!currentFormData?.dateOfBirth || submitData?.dateOfBirth === "") {
        toast.error("Please Enter Date Of Birth!", toastWarning);
        return;
      }
      if (!currentFormData?.address || submitData?.address === "") {
        toast.error("Please Enter Address!", toastWarning);
        return;
      }
      if (
        !currentFormData?.relationTypeId ||
        submitData?.relationTypeId === "-1"
      ) {
        toast.error("Please Select Relation!", toastWarning);
        return;
      }
      if (!currentFormData?.nationalityId || submitData?.nationalityId === "-1") {
        toast.error("Please Select Nationality!", toastWarning);
        return;
      }
      if (
        !currentFormData?.identityTypeId ||
        submitData?.identityTypeId === "-1"
      ) {
        toast.error("Please Select ID Type!", toastWarning);
        return;
      }
      if (
        !currentFormData?.identityNumber ||
        submitData?.identityNumber === ""
      ) {
        toast.error("Please Enter ID Number!", toastWarning);
        return;
      }
      if (!currentFormData?.dateOfExpiry || submitData?.dateOfExpiry === "") {
        toast.error("Please Enter Expiry Date!", toastWarning);
        return;
      }



      let formaData = {
        isDelete: true,
        address: currentFormData?.address,

        dateOfBirth: currentFormData?.dateOfBirth,

        dateOfExpiry: currentFormData?.dateOfExpiry,

        firstName: currentFormData?.firstName,

        identityNumber: currentFormData?.identityNumber,

        identityTypeId: currentFormData?.identityTypeId,

        lastName: currentFormData?.lastName,

        nationalityId: currentFormData?.nationalityId,

        relationTypeId: currentFormData?.relationTypeId,
      }

      setEmployeeDependantChildrenList((prev) => [...prev, formaData])

      //console.log({Trial: currentFormData,Dep });
      let posting = {
        isDelete: true,
        ...currentFormData,
        firstName: currentFormData?.firstName,
        lastName: currentFormData?.lastName,
        dateOfBirth: currentFormData?.dateOfBirth,
        address: currentFormData?.address,
        dateOfExpiry: currentFormData?.dateOfExpiry,
        identityType: {

          name: getName(identityTypes, currentFormData?.identityTypeId)
        },
        relation: {

          id: currentFormData?.relationTypeId,
          name: getName(checkedTypes, currentFormData?.relationTypeId)
        },
        "nationality": {


          "name": getName(nationality, currentFormData?.nationalityId)
        },

      }

      setDependant((prevState) => [posting, ...prevState])
      //setPostDep((prevState)=>[Dep,...prevState])
      setCurrentFormData("")
      setShowModal(false)
    }
    //handle Emegency Contact
    if (activeKey === 3) {

      EmergContRefs.forEach((ref) => {
        if (ref.current.value.length > 2) {
          ref.current.style.border = "2px solid green";
        } else if (ref.current.value.length < 1) {
          ref.current.style.border = "2px solid red";
        } else if (ref.current.value === "") {
          ref.current.style.border = "2px solid red";

        } else {
          ref.current.style.border = "2px solid red";

          return

        }
      });
      if (!currentFormData?.firstName || submitData?.firstName === "" && !currentFormData?.lastName || submitData?.lastName === "" && !phone || phone === "" && !currentFormData?.address || submitData?.address === "" && !currentFormData?.email || submitData?.email === -1) {
        toast.error(GetLabelByName("HCM-WQ9J7737WDC_LASN", lan), toastWarning);
        return;
      }

      if (!currentFormData?.firstName || submitData?.firstName === "") {
        toast.error("Please Enter First Name!", toastWarning);
        return;
      }
      if (!currentFormData?.lastName || submitData?.lastName === " ") {
        toast.error("Please Enter Last Name!", toastWarning);
        return;
      }

      if (!phone || phone === "") {
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


      let posting = {
        isDelete: true,
        employee: {

          firstName: `${currentFormData?.firstName} `,
          lastName: `${currentFormData?.lastName}`
        }
        ,
        email: currentFormData?.email,
        phone: phone,
        address: currentFormData?.address,

      }






      // postEmergencyContact(newData);
      let data = {
        isDelete: true,
        ...currentFormData,
        phone: phone,
      }
      setEmployeeEmerGencyContactChildrenList((prev) => [...prev, data])

      setEmergencyContact((prevState) => [posting, ...prevState])
      setCurrentFormData("")
      setPhone("")
      setShowModal(false)
    }
    //handle Guarantor
    if (activeKey === 4) {

      GuarantorRefs.forEach((ref) => {
        if (ref.current.value.length > 2) {
          ref.current.style.border = "2px solid green";
        } else if (ref.current.value.length < 1) {
          ref.current.style.border = "2px solid red";
        } else if (ref.current.value === "") {
          ref.current.style.border = "2px solid red";

        } else {
          ref.current.style.border = "2px solid red";

          return

        }
      });
      GuarantorDropDownRefs.forEach((ref) => {
        if (ref.current.value !== "-1") {
          ref.current.style.border = "2px solid green";
        } else if (ref.current.value === "-1") {
          ref.current.style.border = "2px solid red";
        } else if (ref.current.value === "") {
          ref.current.style.border = "2px solid red";

        } else {
          ref.current.style.border = "2px solid red";

          return

        }
      });

      if (!currentFormData?.firstName || submitData?.firstName === "" &&
        !currentFormData?.lastName || submitData?.lastName === "" && !phone || phone === "" && !currentFormData?.address || submitData?.address === ""
        && !currentFormData?.relationId || submitData?.relationId === "-1" &&
        !currentFormData?.email || submitData?.email === -1 && !currentFormData?.nationalityId ||
        submitData?.nationalityId === "-1" && !currentFormData?.occupation || submitData?.occupation === "-1") {
        toast.error(GetLabelByName("HCM-WQ9J7737WDC_LASN", lan), toastWarning);
        return;
      }

      if (!currentFormData?.firstName || submitData?.firstName === "") {
        toast.error("Please Enter First Name!", toastWarning);
        return;
      }
      if (!currentFormData?.lastName || submitData?.lastName === " ") {
        toast.error("Please Enter Last Name!", toastWarning);
        return;
      }

      if (!phone || phone === " ") {
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


      // console.log(submitData)
      let employeeId = handleId;
      //  let newData = { ...submitData, option: options, companyId: TestCompanyId };


      let gridView = {
        isDelete: true,
        name: `${currentFormData?.firstName} ${currentFormData?.lastName}`,
        phone: phone,
        occupation: currentFormData?.occupation,
        address: currentFormData?.address,

        nationality: {

          name: getName(nationality, currentFormData?.nationalityId)
        },
        relation: {

          name: getName(checkedTypesGuarantor, currentFormData?.relationId)
        }
      }
      let data = {
        ...currentFormData,
        phone: phone,
        isDelete: true,
      }
      setEmployeeGurrantoContactChildrenList((prev) => [...prev, data])


      setGetGuarantor((prevState) => [gridView, ...prevState])
      checkRelationGuarantor();
      setCurrentFormData("")
      setPhone("")
      setShowModal(false)
    }
    //handle Next oF Kin
    if (activeKey === 5) {
      NextOfKinRefs.forEach((ref) => {
        if (ref.current.value.length > 2) {
          ref.current.style.border = "2px solid green";
        } else if (ref.current.value.length < 1) {
          ref.current.style.border = "2px solid red";
        } else if (ref.current.value === "") {
          ref.current.style.border = "2px solid red";

        } else {
          ref.current.style.border = "2px solid red";

          return

        }
      });
      NextOfKinDropDownRefs.forEach((ref) => {
        if (ref.current.value !== "-1") {
          ref.current.style.border = "2px solid green";
        } else if (ref.current.value === "-1") {
          ref.current.style.border = "2px solid red";
        } else if (ref.current.value === "") {
          ref.current.style.border = "2px solid red";

        } else {
          ref.current.style.border = "2px solid red";

          return

        }
      });

      if (!currentFormData?.firstName || submitData?.firstName === "" &&
        !currentFormData?.lastName || submitData?.lastName === "" && !phone || phone === "" && !currentFormData?.address || submitData?.address === ""
        && !currentFormData?.relationId || submitData?.relationId === "-1" &&
        !currentFormData?.email || submitData?.email === -1 && !currentFormData?.nationalityId ||
        submitData?.nationalityId === "-1") {
        toast.error(GetLabelByName("HCM-WQ9J7737WDC_LASN", lan), toastWarning);
        return;
      }
      if (!currentFormData?.firstName || submitData?.firstName === "") {
        toast.error("Please Enter First Name!", toastWarning);
        return;
      }
      if (!currentFormData?.lastName || submitData?.lastName === " ") {
        toast.error("Please Enter Last Name!", toastWarning);
        return;
      }

      if (!phone || phone === "") {
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

      let handleGrid = {
        isDelete: true,
        "name": `${currentFormData?.firstName} ${currentFormData?.lastName}`,
        "email": currentFormData?.email,
        "relationId": currentFormData?.relationId,
        "phone": phone,

        "address": currentFormData?.address,

        "relation": {
          "id": currentFormData?.relationId,

          "name": getName(relationTypes, currentFormData?.relationId)
        },
        "nationality": {
          "id": currentFormData?.nationalityId,
          "name": getName(nationality, currentFormData?.nationalityId)
        }
      }

      let data = {
        ...currentFormData,
        phone: phone,
        isDelete: true,
      }
      setEmployeeNextOfKinChildrenList((prev) => [...prev, data])
      setGetNextOfKin((prevState) => [handleGrid, ...prevState])
      // setPostNxtofK(newData)
      checkRelationNextOfKin();
      setCurrentFormData("")
      setPhone("")
      setShowModal(false)
    }
  };



  const handleFormChange = (e) => {
    setCurrentFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setSubmitData((data) => {
      return { ...data, [e?.target?.name]: e?.target?.value };
    });
    if (e?.target?.name === "percentage") {
      setPercent(e?.target?.value)
    }
  };


  const { data: multical } = useMultiFetch([
    GetNationality(CompanyReference), GetIdTypes(CompanyReference)], (results) => {



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
        setPhone={setPhone}
        firstNameref={firstNameRef}
        lastNameref={LastnameRef}
        phonref={phoneRef}
        addressref={addressRef}
        relationref={relationRef}
        percentageref={percentageRef}
        checkValue={checkForValue}
        phone={phone}
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
        firstNameref={DependentFirstName}
        lastNameref={DependentLastName}
        addressref={DependentAddress}
        relationRef={DependentRelation}
        nationalityRef={DependentNationality}
        dateOfBirthRef={DependentDOB}
        IdTypeRef={DependentIdType}
        IdNumerRef={DependentIdNumber}
        dateOfExpiry={DependentDateOfExpiry}
        checkValue={checkForValue}
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
        firstNameref={firstNameEmergContactRef}
        lastNameref={LastnameEmergContactRef}
        phonref={phoneEmergContactRef}
        addressref={addressEmergContactRef}
        emailRef={emailEmergContactRef}
        checkValue={checkForValue}
        setPhone={setPhone}
        phone={phone}
        currentFormData={currentFormData}
        handleFormChange={handleFormChange}
        setCurrentFormData={setCurrentFormData}
      />
    );
  }
  if (activeKey === 4) {
    content = (
      <GuarantorForm
        firstName={GuarrantorfirstNameRef}
        lastName={GuarrantorLastnameRef}
        phoneRef={GuarrantorphoneRef}
        address={GuarrantoraddressRef}
        email={GuarrantorEmailRef}
        occupation={GuarrantorOccupationRef}
        relation={GuarrantorRelationRef}
        nationalityRef={GuarrantorNationalityRef}
        checkValue={checkForValue}
        setPhone={setPhone}
        phone={phone}
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
        firstNameRef={NextOfKinFirstNameRef}
        lastNameRef={NextOfKinLastNameRef}
        phoneRef={NextOfKinPhoneRef}
        AddressRef={NextOfKinAddress}
        relationRef={NextOfKinRelation}
        nationalityRef={NextOfKinNationality}
        checkValue={checkForValue}
        setPhone={setPhone}
        phone={phone}
        currentFormData={currentFormData}
        handleFormChange={handleFormChange}
        setCurrentFormData={setCurrentFormData}
        view={checkedTypesNextOfKin}
        nationality={nationality}
      />
    );
  }
  // useEffect(()=>{
  //   if(benefiaciary){

  console.log({ data: currentFormData });
  //   // setPercentage(result)

  //   }

  // },[benefiaciary])
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
          return (
            (val.name === "Mother" && arr.name === "Mother") ||
            (val.name === "Father" && arr.name === "Father")
          );
        });
      });
      setCheckedTypes(newdata);
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
          return (
            (val.name === "Mother" && arr.name === "Mother") ||
            (val.name === "Father" && arr.name === "Father")
          );
        });
      });
      setCheckedTypesGuarantor(newdata);
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
      }
      const newdata = relationTypes.filter((val) => {
        return !arryKin.find((arr) => {
          return (
            (val.name === "Mother" && arr.name === "Mother") ||
            (val.name === "Father" && arr.name === "Father")
          );
        });
      });
      setCheckedTypesNextOfKin(newdata);
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
          return (
            (val.name === "Mother" && arr.name === "Mother") ||
            (val.name === "Father" && arr.name === "Father")
          );
        });
      });
      setCheckedBeneficiaryTypes(newdata);
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
  }, [currentFormData?.relationId]);


  //Fetch used for calling data after deleting
  const { setOptData, setUrl } = useFetch("", (response, results) => {
    if (response) {
      if (response && Object.keys(response).length > 0) {
        // setSearchResult(results);
        dispatch({ type: 'set', data: { ...response } });
        setSubmitData(response);
        //setDupData({...response})
        setViewInfo(response)
        setMode('Update');
        setShow(false);
        if (activeKey === 1) {
          setGetBenefiary(response)
        }
        if (activeKey === 2) {
          setDependant(response)
        }
        if (activeKey === 3) {
          setEmergencyContact(response)
        }
        if (activeKey === 4) {
          setGetGuarantor(response)
        }
        if (activeKey === 5) {
          setGetNextOfKin(response)
        }
      } else {
        setMode('Add');
        setShow(false);
        dispatch({ type: 'set', data: { ...response } });
        setSubmitData({ ...response });
      }
    }
  });
  //FUNCTION USED TO CHECK ACTIVE TAB AND SET URL FOR FETCH
  const showNewData = () => {
    if (activeKey === 1) {
      setGetBenefiary([])
      setUrl(GetBeneficiary(handleId))
    }
    if (activeKey === 2) {
      setDependant([])
      setUrl(GetEmployeeDependant(handleId))
    }
    if (activeKey === 3) {
      setUrl(GetEmployeeEmergencyContact(handleId))
    }
    if (activeKey === 4) {
      setUrl(GetEmployeeGuarantor(handleId))
    }
    if (activeKey === 5) {
      setUrl(GetEmployeeNextOfKin(handleId))
    }

  }
  const handleDeleteItem = async () => {

    if (activeKey === 1) {
      let deleteData = {

        earningId: "",
        transactionsId: delEmployeeID,


        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",

        accountReference: "string"

      }

      setDeletUrl(DeleteBeneficiary())

      setDeleteData({ data: deleteData })
    }
    if (activeKey === 2) {
      let deleteData = {

        earningId: "",
        transactionsId: delEmployeeID,


        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",

        accountReference: "string"

      }

      setDeletUrl(DeleteDependantDetails())

      setDeleteData({ data: deleteData })
    }
    if (activeKey === 3) {
      let deleteData = {

        earningId: "",
        transactionsId: delEmployeeID,



        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",

        accountReference: "string"

      }

      setDeletUrl(DeleteEmployeeEmergencyContact())

      setDeleteData({ data: deleteData })
    }
    if (activeKey === 4) {
      let deleteData = {

        earningId: "",
        transactionsId: delEmployeeID,



        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",

        accountReference: "string"

      }

      setDeletUrl(DeleteEmployeeGuarantor())

      setDeleteData({ data: deleteData })
    }
    if (activeKey === 5) {
      let deleteData = {

        earningId: "",
        transactionsId: delEmployeeID,



        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",

        accountReference: "string"

      }

      setDeletUrl(DeleteEmployeeNextOfKin())

      setDeleteData({ data: deleteData })
    }



  };
  const onConfirm = () => {

    handleDeleteItem();

  };

  const onCancel = () => {

    setIsActive(false);

  };

  // AXIOS FUNCTION FOR DELETE
  const { setData: setDeleteData, setUrl: setDeletUrl } = useDelete('', (response) => {


    const { data } = response

    if (response.status === 200 || response.status === 204) {

      toast.success(`${GetLabelByName("HCM-9VWW2UPSTXS-PSLL", lan)}`);
      setIsActive(false);

      // GetPreviousData(nonCashId);
      if (activeKey === 1) {
        setGetBenefiary([])
        showNewData()
      }


      if (activeKey === 2) {
        setDependant([])
        showNewData()

      }


      if (activeKey === 3) {
        setEmergencyContact([])
        showNewData()
      }
      if (activeKey === 4) {
        setGetGuarantor([])
        showNewData()

      }
      if (activeKey === 5) {
        setGetNextOfKin([])
        showNewData()

      }

    } else {

      toast.error('Transaction Failed, Please try agin later!', toastWarning);

    }



  })
  const handlePercentageCalc = (data) => {
    let results = 0;
    let convert = 0;
    if (benefiaciary) {
      for (let i = 0; i < data.length; i++) {
        convert = parseInt(data[i]?.percentage);
        results = convert + results
        console.log(results);
      }
    }
    console.log(results > 100);

  }

  const han = (data, newData) => {
    let rest = 0
    let results = 0;
    if (data) {

      data?.map((x) => { rest = rest + parseInt(x.percentage) })
    }
    results = rest + parseInt(newData)

    return results > 100

  }
  useEffect(() => {
    if (activeKey === 1) {
      setPercentage(han(benefiaciary, currentFormData?.percentage))
      if (han(benefiaciary, currentFormData?.percentage)) {
        toast.error("Percentage total must be 100% or less")
      }
    }


  }, [percent])


  // useEffect(() => {

  //   const percentages = benefiaciary.map(x =>(x?.percentage))

  //   const res = percentages.reduce(
  //     (previousValue, currentValue) =>parseInt(previousValue)  + parseInt(percent) ,
  //     0
  //   );

  console.log({ benefiaciary: benefiaciary });

  //   return () => {

  //   }
  // }, [currentFormData?.percentage])
  console.log(EmployeeDependantChildrenList);


  return (
    <>
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title={`${GetLabelByName("HCM-Z3GW6TG207", lan)} ?`}
        onConfirm={onConfirm}
        onCancel={onCancel}
        focusCancelBtn
        show={isActive}
      ></SweetAlert>
      <CRow >
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
              isPaginated={true}
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
            <CCardHeader hidden={show} className={""}>
              <CFormGroup row>
                <CCol md="4">
                  <b>Employee:</b>{" "}
                  <span
                    title={empDisplayName}
                    style={{
                      padding: 5,
                      borderRadius: 5,
                      fontWeight: 900,
                      cursor: "pointer",
                      background: "#fff",
                      color: "#315a76",
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
            </CCardHeader>
            <CCardBody>

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
                      <CSLab code="HCM-EP256EK5BS-LASN" />
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
                          field="firstName"
                          editType="text"
                          headerText={GetLabelByName("HCM-KPH53NF08RG", lan)}
                          width="80"

                        //onChange={(e) => setfname(e.target.value)}
                        />
                        <ColumnDirective
                          field="lastName"
                          headerText={GetLabelByName("HCM-ZYCFSGCKMC", lan)}
                          editType="text"
                          width="80"
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
                          field="employee.firstName"
                          editType="text"
                          headerText={GetLabelByName(
                            "HCM-VD1B12NKKJ_LANG",
                            lan
                          )}
                          width="70"
                        //edit={earnings}
                        />
                        <ColumnDirective
                          field="employee.lastName"
                          editType="text"
                          headerText={GetLabelByName(
                            "HCM-6CU7NZJCKLF",
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
        disableBtn={checkPercentage}
      >
        {content}
      </FormModal>
    </>
  );
};

export default EmployeeDetail;
