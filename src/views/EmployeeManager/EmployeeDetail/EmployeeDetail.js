import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FileUploader } from "react-drag-drop-files";
import CIcon from '@coreui/icons-react';
import { CInput, CCard, CCardBody, CFormGroup, CCol, CRow, CTabs, CButton, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CLabel, CCardFooter, CSelect, CTextarea,CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter, CCardHeader, CForm } from '@coreui/react';
import { AiOutlinePlus, AiOutlineEye, AiOutlineClose, AiFillSave, AiOutlineRedo, AiFillCloseCircle, AiOutlineDelete } from 'react-icons/ai';
import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort, Edit, CommandColumn, Toolbar } from '@syncfusion/ej2-react-grids';

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'


import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import { getValue } from '@syncfusion/ej2-base';

import { CardBodyHeight} from 'src/reusable/utils/helper';
//import { GetLabelByName } from 'src/reusable/configs/config';
import { CSAutoComplete, CSCheckbox, CSLab, CSLineLabel, CSRequiredIndicator } from '../../../reusable/components';
import "../../../scss/_custom_table.scss";
import { GetBankBranchesByBandId, GetBanks, GetCurrencies, GetGLAccounts, GetsalaryGrade, GetsalaryGradeNotch, SearchEmployeeByNameOrCode, GetTitles, GetCountry,  PostEmployee, PutEmployee, GetPayrollHours, GetEmployeeDetailsByEmployeeID, GetAllGender, GetAllMarital, GetEmployeeGeneralLedger, GetEmployeeStatus, GetEmployeeOrganisation, GetEmployeeAccounts, GetEmployeeSalaryInfoByEmployeeID, GetAllNetworks,  GetAllEmployeeTypesByCompanyRefernece, GetAllPositionsByCompanyReference, GetAllUnitsByCompanyReference, GetsalaryGradeDetails, GetNationality } from 'src/reusable/API/EmployeeDetailsEndpoints';
import { GetLabelByName } from 'src/reusable/configs/config';
import CurrencyFormat from 'react-currency-format';
import {  accountType,  payBasis } from 'src/reusable/utils/data/generic';
import SweetAlert from 'react-bootstrap-sweetalert';
import {  GetHistoryInfo } from 'src/api/actions';
// import Loader from 'src/Loader/Loader';
import moment from "moment";
import { GetAllDepartmentsByCompanyReference } from 'src/reusable/API/SectionEndpoints';
import { GetAllSectionsByCompanyReference } from 'src/reusable/API/UnitEndpoints';
import { GetAllDivisonsByCompanyReference } from 'src/reusable/API/DepartmentEndpoints';
import { GetAllLocationsByCompanyReference } from 'src/reusable/API/DivisionEndpoints';
import useDelete from 'src/hooks/useDelete';
import useMultiFetch from 'src/hooks/useMultiFetch';
import useFetch from 'src/hooks/useFetch';
import usePost from 'src/hooks/usePost';
import usePut from 'src/hooks/usePut';

let companyReference = '00001_A01';
let countryCode = 'GH'

const commandOptions = [
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssclassName: 'e-flat' } },
    { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssclassName: 'e-flat' } }
];


const FileTypes = ["jpg", "png", "gif", "jpeg"];

const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, allowEditOnDblClick: false };

function EmployeeDetail (props) {
    const lan = useSelector((state) => state.language);
    const dispatch = useDispatch();
    const data = useSelector(state => state.data);
    const [show, setShow] = useState(true);
    const [submitData, setSubmitData] = useState({});
    const [submit, setSubmit] = useState({});
    const [submits, setSubmits] = useState({});
    const [values, setValues] = useState({});
    const [activeKey, setActiveKey] = useState(1);
    const [visible, setVisible] = useState(false);
    const [, setCurrencies] = useState([]);
    const [salaryGrade, setSalaryGrade] = useState([]);
    // const [, setNotch] = useState([]);
    const [file, setFile] = useState(null);
    const [phone, setPhone] = useState(null);
    const [banks, setBanks] = useState([]);
    // const [, setBankBranches] = useState([]);
    const [gLAccountData, setGLAccountData] = useState([]);
    const [mode, setMode] = useState("");
    const [titles, setTitles] = useState([]);
    const [countries, setCountries] = useState([]);
    const [nationality, setNationality] = useState([]);
    const [section, setSection] = useState([]);
    const [department, setDepartment] = useState([]);
    const [division, setDivision] = useState([]);
    const [employeeType, setEmployeeType] = useState([]);
    const [position, setPosition] = useState([]);
    const [unit, setUnit] = useState([]);
    const [location, setLocation] = useState([]);
    const [employeeStatus, setEmployeeStatus] = useState([]);
    const [textLable, setTextLable] = useState("HCM-75HIH44NO3J_PSLL");
    const [showModal, setshowModal] = useState(false);
    // const [, setDisabled] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [numberOfItems, setNumberOfItems] = useState(10);
    const [orderBy, setOrderBy] = useState('');
    const [payrollHours, setPayrollHours] = useState([]);
    const [sortOrder, setSortOrder] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [opt, ] = useState(null);
    const [, setDupData] = useState({})
    const [payOpt, setpayOpt] =useState(0)
    const [branche,setBranche] = useState([])
    const [enableBtn, setEnableBtn] = useState(false);
    const [paymentObj, setPaymentObj] = useState([])
    const [, setDisplayGrid] = useState(false)
    // const [enableAddBtn,setEnableAddBtn] = useState(true)
    const [paymentBasis, setPaymentBasis] = useState(0)
    const [notchValue, setNotchValue] = useState([])
    const [gender, setGender] = useState([])
    const [networks, setNetworks] = useState([])
    const [maritalStatus, setMaritalStatus] = useState([])
    const [, setShowHistory] = useState(false)
    const [, setHistoryData] = useState([])
    const [isActive,setIsActive] = useState(false)
    const [base64IMG,setBase64IMG] = useState("")
    // const [finalObjData, setFinalObjData] = useState({})
    const [finalAccData, setFinalAccData] = useState({})
    const [finalOrg, setFinalOrg] = useState({});
    const [finalSal, setFinalSal] = useState({});
    const [finalDate, setFinalDate] = useState([]);
    const [submitDob, setSubmitDob] = useState({})
    const [disableRate, setDisableRate] = useState(false)
    const [handleId, setHandleId] = useState("");

    const onConfirm = () =>{
        handleDeleteItem()
    }

    const onCancel =()=>{
        setIsActive(false)
    }

    const handleFileChange = (file) => {
         console.log({file: file})
        setFile(file);
        convertToBase64(file);
    };
   
    const convertToBase64 = (file) => {
       
        const reader = new FileReader()
    
        reader.readAsDataURL(file)
    
        reader.onload = () => {
        //    console.log('called: ', reader.result)
          setBase64IMG(reader.result)
        }
    }

    const dataURLtoFile = (dataurl, filename)  => {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }    

    const diplayBase64Img = (photoData,photoName) => {
        const file = dataURLtoFile(photoData,`${photoName}.png`);
        setFile(file);  
    }

    const {setData, setUrl:setDeletUrl} = useDelete("", (response) =>
     {

        if(response){
            searchReset()
            toast.success('Division Deleted Successfully!')
            // toaster('', 'Enter code', 'success', 3000)
        }
        setIsActive(false)
    })

    const handleDelete =()=>{
        // setIsActive(true)
    }

    const handleDeleteItem = async () => {
        const { id } = searchResult;
        setData({data:{employeeId:id}})
        setDeletUrl(`/Employees`);
      };
    
    const handleHistory = async()=>{
        const {id} =searchResult
        let response =null

        if(activeKey === 1){
            response = await  GetHistoryInfo(`/Organisation/Departments/Logs?departmentId=${id}&companyReference=${companyReference}`)
        }else{
           
            response = await  GetHistoryInfo(`/Organisation/Departments/GL/Logs?departmentId=${id}&companyReference=${companyReference}`)
        }
        if(response){
            setHistoryData(response)
            setShowHistory(true)
        }
    }

    const {setUrl} =  useFetch("", (result) => {
        // console.log({GetsalaryGradeNotch: result});
        setNotchValue(result);
    })

    const setNotche = async (event) => {
        setUrl(GetsalaryGradeNotch(event.target.value));       
    };
    const {setUrl: gldetails} = useFetch('', (result) => {   
        setValues(result)
    })

    const getGldetailsByGLID = async (event) => {
        gldetails(GetsalaryGradeDetails(event.target.value))
    };

    const {setUrl: bankss} = useFetch('', (result) => {   
        setBranche(result)
       })

       const getBranches = async (event) => {
        bankss(GetBankBranchesByBandId(event.target.value))
      };

    const setBankBranche = async(event) =>{
        const result = await (await fetch(GetBankBranchesByBandId(event.target.value))).json();
         setBranche(result)
    }

    const {setUrl: ledgerData,} = useFetch('', (result) => {          
        setSubmitData((prev) => ({...prev, ...result}))         
       })
     
       const getData = async (id) => {
         ledgerData(GetEmployeeGeneralLedger(id));
       };

       const {setUrl: accountData,} = useFetch('', (result) => {   
        let theEmployee = result.map(x => ({
            ...x,
            paymentModetext: x.paymentMode,
            bankIdtext: x.bankName,
            branchIdtext: x.branchName,
            accountNumber: x.accountNumber,
            paymentBasis: x.paymentBasis,
            paymentBasisName: x.paymentBasisName,
            fixedAmountOrPercentageOfNet: x.fixedAmountOrPercentageOfNet,
            isDefault: x.isDefault === true ? 'Yes' : 'No',
            bankOrNetworkName: x?.bankName ? x.bankName : x?.mobileNetworkName
        }))
        
        setPaymentObj(theEmployee)
        setFinalAccData(...result)
       })
     
       const getAccData = async (id) => {
        accountData(GetEmployeeAccounts(id));
       };

       const {setUrl: ledgerOrgData,} = useFetch('', (result) => { 
        let id = result?.salaryGradeId
        if(result?.salaryGradeId !== ''){          
            gldetails(GetsalaryGradeDetails(id));
            setUrl(GetsalaryGradeNotch(id))
        }

        let theFinal = result?.hireDate
        const xFinal = new Date(theFinal)
        let hireDate = moment(xFinal).format('YYYY-MM-DD');
        // console.log({hireDate:hireDate});
        setSubmits({...result,hireDate})       
         setFinalOrg({...result})
       })

    //    console.log({submit: submit});
     
       const getOrgData = async (id) => {
        ledgerOrgData( GetEmployeeOrganisation(id));
       };

       const {setUrl: getProfileData,} = useFetch('', (result) => {        
        let theFinal = result?.dateOfBirth;        
        const xFinal = new Date(theFinal)
        let dateOfBirth = moment(xFinal).format('YYYY-MM-DD');
      
        setFinalDate({...result,dateOfBirth})
       })
     
       const getProfileDetails = async (id) => {
        getProfileData( GetEmployeeDetailsByEmployeeID(id));
       };

       const {setUrl: salaryData,} = useFetch('', (result) => { 
         setFinalSal({...result});
       })
     
       const salData = async (id) => {
        salaryData(GetEmployeeSalaryInfoByEmployeeID(id));
       };       
   

        const {setOptData, setUrl: loadData} =  useFetch("", (response,results) => {
            if (response) {
            
                if (response && Object.keys(response).length > 0) {
                    dispatch({ type: 'set', data: { ...response } });
                    setSubmitData((prev) => ( {...prev,...response} ));
                    setDupData({ ...response });
                    setShow(false);
                    setMode('Update');
                    // Trying to display image from API
                    diplayBase64Img(response?.photoPassportReference,response?.firstName);
                
                } else {
                    setMode('Add');
                    setShow(false);
                    dispatch({ type: 'set', data: { ...results } });
                setSubmitData((prev) => ({...prev, ...results}) );
                }
            
            }
        });

        const handleSearchResultSelect = (results) => {
            // console.log('result', results);
            setSearchResult(results);
            setOptData(results)
            if (results?.id) {
                getData(results?.id)
                getAccData(results?.id)
                getOrgData(results?.id)
                getProfileDetails(results?.id)
                salData(results?.id)
                
                loadData(GetEmployeeDetailsByEmployeeID(results?.id))
            
            }

        }

    // console.log(submitData?.photoPassportReference)

    const handleLabelChange = (evnt) => {
        setTextLable(evnt?.target?.options[evnt?.target?.options.selectedIndex].text)
    }

    const paymentOnChange = (evnt) => {       
      
        if (evnt.target.nodeName === "SELECT") {

            var index = evnt.nativeEvent.target.selectedIndex;      
            const name = evnt?.target?.name
            // paymentBasistext 
            setSubmitData(data => { return { ...data, [evnt?.target?.name]: evnt?.target?.value, [`${name}text`]: evnt?.nativeEvent.target[index].text } })      
            dispatch({ type: 'set', data: { ...data, [evnt?.target?.name]: evnt?.target?.value } });
      
          } else {      
            setSubmitData(data => { return { ...data, [evnt?.target?.name]: evnt?.target?.value } })      
            dispatch({ type: 'set', data: { ...data, [evnt?.target?.name]: evnt?.target?.value } });      
          }
        
        if(evnt?.target?.name === 'paymentMode'){
            if(evnt?.target.value === '-1'){
                setpayOpt(0)
                setDisplayGrid(false)
            }
            if(evnt.target.value ==='1'){
                setpayOpt(1)
                setDisplayGrid(false)
            }
            if(evnt.target.value ==='2' ){
                setpayOpt(2)
                setDisplayGrid(false)
            }
            if(evnt.target.value ==='3'){
                setpayOpt(3)
            }
        }

        if(evnt?.target?.name === 'paymentBasis'){
            if(evnt.target.value === 1){
                setPaymentBasis(1);
            }
            if(evnt.target.value === 2 ){
                setPaymentBasis(2);
            }
        }
    }

    const restForm = () =>{
        dispatch({ type: 'set', data: {} });       
    }
   
    const formClose = () => {        
      setshowModal(!showModal)

      restForm()
    }

    const getName=(data,value)=>{
        return data.find(x=>x.id == value)?.name || "No"
    }
    const temp=[
        {
            id:true,
            name: "Yes"
        },{
            id:false,
            name: "No"
        }
    ]
    const paySubmit = () => {
        let def = getName(temp,submitData?.isDefault)
       
        let base = 1
       if(payOpt === 1){
        let fixedAmountOrPercentageOfNet = covertToNumber(submitData?.fixedAmountOrPercentageOfNet);      
        let paymentData = { ...submitData,...data,paymentBasisName:submitData.paymentBasistext, base: base,isDefault:def, bankOrNetworkName: submitData?.bankIdtext, fixedAmountOrPercentageOfNet: fixedAmountOrPercentageOfNet};
        setPaymentObj([...paymentObj, paymentData]);
        
       }
     
      if(payOpt === 2){
        let def = getName(temp,submitData?.isDefault);
        let fixedAmountOrPercentageOfNet = covertToNumber(submitData?.fixedAmountOrPercentageOfNet)
         
        let paymentData = { ...submitData,...data, paymentBasisName: submitData.paymentBasistext, base: base,isDefault:def, bankOrNetworkName: submitData?.mobileNetworkIdtext, fixedAmountOrPercentageOfNet:fixedAmountOrPercentageOfNet};      
        delete paymentData?.branchIdtext
        delete paymentData?.branchIdtext
        delete paymentData?.branchId
        delete paymentData?.branchId
        setPaymentObj([...paymentObj, paymentData])
        
      }

      if(payOpt === 3){
        let def = getName(temp,submitData?.isDefault);
        let fixedAmountOrPercentageOfNet = covertToNumber(submitData?.fixedAmountOrPercentageOfNet)
       
        let paymentData = { ...submitData,...data,paymentBasisName: submitData.paymentBasistext, base: base, isDefault:def, fixedAmountOrPercentageOfNet:fixedAmountOrPercentageOfNet};      
        delete paymentData?.branchIdtext
        delete paymentData?.branchIdtext
        delete paymentData?.bankIdtext
        delete paymentData?.bankIdtext
        delete paymentData?.mobileNetworkIdtext
        delete paymentData?.mobileNetworkIdtext
        delete paymentData?.accountNumber
        delete paymentData?.accountNumber
        setPaymentObj([...paymentObj, paymentData]);
      }
      
        formClose();        
    }

   
   
    const  {data:multicallData} =  useMultiFetch([
         GetCurrencies(companyReference), GetsalaryGrade(companyReference),GetAllGender('GND'),GetBanks(countryCode),GetGLAccounts(companyReference),  
         GetAllMarital('MST'), GetTitles(companyReference),GetCountry(), GetAllSectionsByCompanyReference(companyReference),  GetAllDepartmentsByCompanyReference(companyReference),
          GetAllDivisonsByCompanyReference(companyReference), GetAllEmployeeTypesByCompanyRefernece(companyReference),
          GetAllPositionsByCompanyReference(companyReference),GetAllUnitsByCompanyReference(companyReference),
           GetAllLocationsByCompanyReference(companyReference),GetEmployeeStatus(companyReference), GetPayrollHours(companyReference),
           GetAllNetworks(companyReference),GetNationality()
        ], (results) => {

        let newArray = results[5].data       
        // return
        let empData = [];    
          for (let i = 0; i < newArray.length; i++) {
    
          let myObj = newArray[i].name.toLowerCase()
          let finalObj = myObj.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
            empData.push({
              id: `${newArray[i].id}`,
              name: `${finalObj}`,
            });
    
          }

          let newArray1 = results[6].data       
          // return
          let empData1 = [];      
            for (let i = 0; i < newArray1.length; i++) {
      
            let myObj = newArray1[i].name.toLowerCase()
            let finalObj = myObj.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
            empData1.push({
                id: `${newArray1[i].id}`,
                name: `${finalObj}`,
              });
      
            }
       
        setCurrencies([{ id: "00000000-0000-0000-0000-000000000000", name: GetLabelByName("HCM-HW51DA7XHTS_LANG", lan)},  ...results[0].data, ]);
        setSalaryGrade([  { id: "00000000-0000-0000-0000-000000000000", name: GetLabelByName("HCM-S21O1901NO-LANG", lan)},  ...results[1].data, ]);
        setGender([  { id: "00000000-0000-0000-0000-000000000000", name: GetLabelByName("HCM-MM55OQ4NDNP_PSLL", lan) },  ...results[2].data, ]);
        setBanks([{ id: "00000000-0000-0000-0000-000000000000", name: GetLabelByName("HCM-WGN2SQIGAC_LOLN", lan)},  ...results[3].data, ]);
        setGLAccountData([  { id: "00000000-0000-0000-0000-000000000000", name: GetLabelByName("HCM-VYPXE8XVYOI-KCMI", lan) },  ...results[4].data, ]);
        setMaritalStatus([{ id: "00000000-0000-0000-0000-000000000000", name:GetLabelByName("HCM-24XO0WBOU79-HRPR", lan) }, ...empData, ]);
        setTitles([{ id: "00000000-0000-0000-0000-000000000000", name:GetLabelByName("HCM-EOH7D1YOS2G_LOLN", lan)},  ...empData1,]);
        setCountries([{ id: "00000000-0000-0000-0000-000000000000", name: GetLabelByName("HCM-SU6R69R7V1B-HRPR", lan) }, ...results[7].data, ]);
        setSection([{ id: "00000000-0000-0000-0000-000000000000", name: GetLabelByName("HCM-2S3TJ25P51U_LASN", lan)}, ...results[8].data, ]);
        setDepartment([{ id: "00000000-0000-0000-0000-000000000000", name: GetLabelByName("HCM-0APETFHDKISK-LASN", lan)},  ...results[9].data,]);
        setDivision([{ id: "00000000-0000-0000-0000-000000000000", name:GetLabelByName("HCM-N03SHYQ1ECP-KCMI", lan)},  ...results[10].data,]);
        setEmployeeType([{ id: "00000000-0000-0000-0000-000000000000", name:GetLabelByName("HCM-39I2LKM186T", lan)  }, ...results[11].data, ]);
        setPosition([{ id: "00000000-0000-0000-0000-000000000000", name: GetLabelByName("HCM-JPS5AVZ3EU-KCMI", lan), },  ...results[12].data,]);
        setUnit([{ id: "00000000-0000-0000-0000-000000000000", name: GetLabelByName("HCM-12HRKJ3VLGIH_HRPR", lan) }, ...results[13].data, ]);
        setLocation([{ id: "00000000-0000-0000-0000-000000000000", name:GetLabelByName("HCM-I77U99FH77D-LANG", lan)  }, ...results[14].data, ]);
        setEmployeeStatus([{ id: "00000000-0000-0000-0000-000000000000", name: GetLabelByName("HCM-HKINDUDDDUT_LOLN", lan), },  ...results[15].data,]);
        setPayrollHours([{ id: "00000000-0000-0000-0000-000000000000", name: GetLabelByName("HCM-ZYB0UGLFZT9_HRPR", lan) }, ...results[16].data, ]);
        setNetworks([{ id: "00000000-0000-0000-0000-000000000000", name:GetLabelByName("HCM-3F8KSN99RXU-KCMI", lan) , },  ...results[17].data,]);
        setNationality([{ id: "00000000-0000-0000-0000-000000000000", demonym: GetLabelByName("HCM-QBIJLIRXEVB-LASN", lan), name: GetLabelByName("HCM-QBIJLIRXEVB-LASN", lan) }, ...results[18].data, ]);
        // setLocation([{ id: "00000000-0000-0000-0000-000000000000", name: `Select Location` }, ...results[1s].data, ]);
      })      

   
    const handleCheckboxChange1 = (evnt) => {
        //isResident
        let isDefault = evnt?.target?.name === 'isDefault' ? evnt?.target?.checked : data?.isDefault;
        setSubmitData(data => { return { ...data, [evnt?.target?.name]: evnt?.target?.value, isDefault } })
        dispatch({ type: 'set', data: { ...data, [evnt?.target?.name]: evnt?.target?.value, isDefault } });
    }
    const handleCheckboxChange2 = (evnt) => {
        //isResident
        let isResident = evnt?.target?.name === 'isResident' ? evnt?.target?.checked : data?.isResident;
        setSubmitData(data => { return { ...data, [evnt?.target?.name]: evnt?.target?.value, isResident } })
        dispatch({ type: 'set', data: { ...data, [evnt?.target?.name]: evnt?.target?.value, isResident } });
    }
    const handleCheckboxChange3 = (evnt) => {
        //isResident
        let isContract = evnt?.target?.name === 'isContract' ? evnt?.target?.checked : data?.isContract;
        setSubmitData(data => { return { ...data, [evnt?.target?.name]: evnt?.target?.value, isContract } })
        dispatch({ type: 'set', data: { ...data, [evnt?.target?.name]: evnt?.target?.value, isContract } });
    }
    const handleCheckboxChange4 = (evnt) => {
        //isResident
        let isSecondaryEmployment = evnt?.target?.name === 'isSecondaryEmployment' ? evnt?.target?.checked : data?.isSecondaryEmployment;
        setSubmitData(data => { return { ...data, [evnt?.target?.name]: evnt?.target?.value, isSecondaryEmployment } })
        dispatch({ type: 'set', data: { ...data, [evnt?.target?.name]: evnt?.target?.value, isSecondaryEmployment } });
    }
    const handleCheckboxChange5 = (evnt) => {
        //isResident
        let isOvertimeExempt = evnt?.target?.name === 'isOvertimeExempt' ? evnt?.target?.checked : data?.isOvertimeExempt;
        setSubmitData(data => { return { ...data, [evnt?.target?.name]: evnt?.target?.value, isOvertimeExempt } })
        dispatch({ type: 'set', data: { ...data, [evnt?.target?.name]: evnt?.target?.value, isOvertimeExempt } });
    }
    const handleCheckboxChange6 = (evnt) => {
        //isResident
        let isProbation = evnt?.target?.name === 'isProbation' ? evnt?.target?.checked : data?.isProbation;
        setSubmitData(data => { return { ...data, [evnt?.target?.name]: evnt?.target?.value, isProbation } })
        dispatch({ type: 'set', data: { ...data, [evnt?.target?.name]: evnt?.target?.value, isProbation } });
        // console.log(isProbation);
    }

    const searchReset = () => {
        setShow(true);
        setSearchInput('');
        setBase64IMG({});
        setSubmit({});
        setPaymentObj([]);
        handleReset(2);
        setSubmitData({})
    }

    const handleReset = (type = 1) => {

        if ('Add' === mode && type === 1) {
            dispatch({ type: 'set', data: {} });
            setSubmitData({});
            // setSearchInput('');
            setSearchResult('')
            handleReset(2)
        }

        if ('Update' === mode && searchResult?.id && type === 1) {
            setSubmitData(searchResult);
            dispatch({ type: 'set', data: { ...searchResult } });
        }

        if (type === 2) {
            setMode('Add');
            dispatch({ type: 'set', data: {} });
            setSubmitData({});
            setSearchInput('');
            setBase64IMG({});
            setSubmit({});
            setPaymentObj([])
            setSubmitDob({})
            setSubmits({})
            setValues({})
            //handleReset(2)
        }
    }  
    const covertToNumber =(data)=>{
       //console.log(data) 
       if(data === Number(data)){
        return data
       }else{
        return +data.replace(/[^\w\s]/gi, '') 
       }
       
    }
      
    const trans = useRef(null)
    
    const handleOnSubmit = (args) => {
        // console.log(args);
        const timePart = "12:06:12.287Z"
        let newData = { ...submitData,...values, companyReference};
        let dateOfBirth = submitDob.dateOfBirth.includes('T') ? submitDob.dateOfBirth : `${submitDob.dateOfBirth}T${timePart}`
        
        let Means = trans?.current?.currentViewData;

        let paymentMeans = Means?.map(x => ({
            paymentMode:x?.paymentModeIndex,
            bankId: x?.bankId || "00000000-0000-0000-0000-000000000000",
            branchId:x?.branchId || "00000000-0000-0000-0000-000000000000",
            mobileNetworkId:x?.mobileNetworkId || "00000000-0000-0000-0000-000000000000",
            accountNumber: x?.accountNumber || "",
            accountName: x?.accountName || "",
            fixedAmountOrPercentageOfNet: covertToNumber(x?.fixedAmountOrPercentageOfNet)  || 0,
            paymentBasis: x?.paymentBasis || 0,
            paymentBasisName: x?.paymentBasisName || 0,
            isDefault: x?.isDefault === 'Yes' ? true : false
        }));

      let salaryType = values?.salaryType;

        let organization = {
            //let hireDate =  
            "staffId": submitData.staffId,
            "hireDate": submitData.hireDate.includes('T') ? submitData.hireDate : `${submitData.hireDate}T${timePart}`,
            "sectionId": submitData?.sectionId  || "00000000-0000-0000-0000-000000000000",
            "departmentId": submitData?.departmentId || "00000000-0000-0000-0000-000000000000" ,
            "divisionId": submitData?.divisionId || "00000000-0000-0000-0000-000000000000" ,
            "employeeTypeId": submitData?.employeeTypeId || "00000000-0000-0000-0000-000000000000" ,
            "positionId": submitData?.positionId || "00000000-0000-0000-0000-000000000000" ,
            "unitId": submitData?.unitId || "00000000-0000-0000-0000-000000000000" ,
            "locationId": submitData?.locationId || "00000000-0000-0000-0000-000000000000" ,
            "employeeStatusId": submitData?.employeeStatusId,
            "isContract": submitData?.isContract || false,
            "isSecondaryEmployment": submitData?.isSecondaryEmployment || false,
            "isProbation": submitData?.isProbation || false,
            "probationMonth": submitData?.probationMonth || 0,
            "isOvertimeExempt": submitData?.isOvertimeExempt || false,
            "salaryGradeId": submit?.salaryGradeId || "00000000-0000-0000-0000-000000000000",
            "notchId": submitData?.notchId || "00000000-0000-0000-0000-000000000000",
            "salaryType": salaryType || 0,
            "salaryRate":  covertToNumber(submitData?.salaryRate) || 0,
            "payrollStatus": submitData?.payrollStatus || 1
        };       
       
        let salaryInfo = {
            "percentageOfBasic": submitData?.percentageOfBasic || 0,
            "payrollHourId": submitData?.payrollHourId || "00000000-0000-0000-0000-000000000000",
            "paySlipNote": submitData.paySlipNote
        }
        let glAccount ={
            "salaryGLId": submitData?.salaryGLId || "00000000-0000-0000-0000-000000000000",
            "netSalaryPayableGLId": submitData?.netSalaryPayableGLId || "00000000-0000-0000-0000-000000000000",
            "shiftAllowanceGLId": submitData?.shiftAllowanceGLId || "00000000-0000-0000-0000-000000000000",
            "incomeTaxGLId": submitData?.incomeTaxGLId || "00000000-0000-0000-0000-000000000000",
            "operatingOvertimeGLId": submitData?.operatingOvertimeGLId || "00000000-0000-0000-0000-000000000000",
            "taxReliefGLId": submitData?.taxReliefGLId || "00000000-0000-0000-0000-000000000000",
            "mandatorySavingSchemeEmployeeContributionGLId": submitData?.mandatorySavingSchemeEmployeeContributionGLId || "00000000-0000-0000-0000-000000000000",
            "mandatorySavingSchemeEmployerContributionGLId": submitData?.mandatorySavingSchemeEmployerContributionGLId || "00000000-0000-0000-0000-000000000000",
            "mandatorySavingSchemeEmployerTotalPayableGLId": submitData?.mandatorySavingSchemeEmployerTotalPayableGLId || "00000000-0000-0000-0000-000000000000",
            "volontarySavingSchemeEmployeeContributionGLId": submitData?.volontarySavingSchemeEmployeeContributionGLId || "00000000-0000-0000-0000-000000000000",
            "volontarySavingSchemeEmployerContributionGLId": submitData?.volontarySavingSchemeEmployerContributionGLId || "00000000-0000-0000-0000-000000000000",
            "volontarySavingSchemeEmployerTotalPayableGLId": submitData?.volontarySavingSchemeEmployerTotalPayableGLId || "00000000-0000-0000-0000-000000000000",
        }

        let employeeId = searchResult?.id;
        
        let finaldata = {...newData, organization, paymentMeans, salaryInfo, glAccount, dateOfBirth:dateOfBirth, companyReference:  companyReference }
        let UpdateData = {...newData, organization, paymentMeans, salaryInfo, glAccount, dateOfBirth:dateOfBirth, companyReference:  companyReference,employeeId }
       //delete submitData?.accountType
      
      
      //return

     if(mode === "Add"){
        AddEmployee(finaldata,values)
     }else{
        updateEmployee(UpdateData);
     }
       
    }

    const {setData:setPutData, setUrl:setPutUrl} = usePut("", (response) =>{
        const {data} = response
        if ("" === data) {
            toast.success(GetLabelByName("HCM-KUN4HK2DYAL_LOLN", lan));
            handleReset(2);
        } 
    })

    const {setData:setPostData, setUrl:setPostUrl} = usePost("", (response) =>{
        const {data} = response
        if ("" === data) {
            toast.success(GetLabelByName("HCM-HAGGXNJQW2B_HRPR", lan));
            handleReset(2);
        }   // else {
        //   try {
        //     data = JSON.parse(response);
        //     let mdata = data.errors[0].message;
        //     toast.error(`${mdata}`, toastWarning);
        //   } catch (error) {
        //     console.log(error);
        //   }
        // }     
    })
 
    function AddEmployee(postData) {
    //    console.log({base64IMG:base64IMG})

        postData.photoPassportReference =  base64IMG && base64IMG.length > 3 ? base64IMG : ""

        postData.phoneNumber = phone
        postData.paymentMeans = postData?.paymentMeans?.map(x => ({
            paymentMode:x?.paymentModeIndex,
            bankId: x?.bankId || "00000000-0000-0000-0000-000000000000",
            branchId:x?.branchId || "00000000-0000-0000-0000-000000000000",
            mobileNetworkId:x?.mobileNetworkId || "00000000-0000-0000-0000-000000000000",
            accountNumber: x?.accountNumber || "",
            accountName: x?.accountName || "",
            fixedAmountOrPercentageOfNet: covertToNumber(x?.fixedAmountOrPercentageOfNet)  || 0,
            paymentBasis: x?.paymentBasis || 0,
            paymentBasisName: x?.paymentBasisName || 0,
            isDefault: x?.isDefault || false
        }))

        // console.log({postData:  postData.photoPassportReference});

        postData.salaryInfo.percentageOfBasic = +postData.salaryInfo.percentageOfBasic 
       
        let finalObj = {
          
            "titleId":postData.titleId,
            "firstName": postData.firstName,
            "lastName": postData.lastName,
            "otherName":postData.otherName,
            "gender":+postData.gender,
            "dateOfBirth":postData.dateOfBirth,
            "maritalStatus":postData.maritalStatus,
            "emailAddress":postData.emailAddress,
            "phoneNumber": postData.phoneNumber,
            "digitalAddress":postData.digitalAddress,
            "nationality": postData.nationality,
            "country": postData.country,
            "nationalID": postData.nationalID,
            "isResident": postData.isResident,
            "address": postData.address,
            "photoPassportReference": postData.photoPassportReference || "",
            "organization":postData.organization,
            "accounts":postData.accounts,
            "salaryInfo": postData.salaryInfo,
            "glAccount": postData.glAccount,
            "companyReference":postData.companyReference,
            "paymentMeans": postData.paymentMeans,
            "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "userName": ""
          }

  
    //    console.log(submitData);
        if ('Add' === mode) {
            setPostUrl(PostEmployee())
            setPostData( finalObj )
            }
    }

    function updateEmployee(putData) {

        putData.photoPassportReference =  base64IMG && base64IMG.length > 3 ? base64IMG : ""
        // putData.photoPassportReference = base64IMG  ||"" 
        putData.phoneNumber = phone
        putData.paymentMeans = putData?.putData?.map(x => ({
            paymentMode:x?.paymentModeIndex,
            bankId: x?.bankId || "00000000-0000-0000-0000-000000000000",
            branchId:x?.branchId || "00000000-0000-0000-0000-000000000000",
            mobileNetworkId:x?.mobileNetworkId || "00000000-0000-0000-0000-000000000000",
            accountNumber: x?.accountNumber || "",
            accountName: x?.accountName || "",
            fixedAmountOrPercentageOfNet: x?.fixedAmountOrPercentageOfNet  || 0,
            paymentBasis: x?.paymentBasis || 0,
            isDefault: x?.isDefault || false,
        }))

        putData.salaryInfo.percentageOfBasic = +putData.salaryInfo.percentageOfBasic 
        putData.employeeId = searchResult?.id;

        let finalObjs = {
            "employeeId": putData.employeeId ,
            "titleId":putData.titleId,
            "firstName": putData.firstName,
            "lastName": putData.lastName,
            "otherName":putData.otherName,
            "gender":+putData.gender,
            "dateOfBirth":putData.dateOfBirth,
            "maritalStatus":putData.maritalStatus,
            "emailAddress":putData.emailAddress,
            "phoneNumber": putData.phoneNumber,
            "digitalAddress":putData.digitalAddress,
            "nationality": putData.nationality,
            "country": putData.country,
            "nationalID": putData.nationalID,
            "isResident": putData.isResident,
            "address": putData.address,
            // "photoPassportReference": base64IMG  || "",
            "organization":putData.organization,
            "accounts":putData.accounts,
            "salaryInfo": putData.salaryInfo,
            "glAccount": putData.glAccount,
            "companyReference":putData.companyReference,
            "paymentMeans": putData.paymentMeans,
            "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "userName": ""
          }
        

        if ('Update' === mode) {
            setPutUrl(PutEmployee())
            setPutData(finalObjs);           
        }
    }
 
    const handleAddNewRecord = () => {
        setMode('Add');
        setShow(false);
        setSubmitData({});
        setSearchInput('');
        setBase64IMG({});
        setSubmit({});
        setPaymentObj([])
    }

    const handleAddNewAccount = () => {
        setshowModal(!showModal);
        restForm();
        setpayOpt(0);
    }
    const handleOnChange = (evnt) => {

        setSubmitData({ ...submitData, [evnt?.target?.name]: evnt?.target?.value });
        dispatch({ type: 'set', data: { ...data, [evnt?.target?.name]: evnt?.target?.value } }); 
       // console.log(`${evnt?.target?.name}`, `${evnt?.target?.value}`)
    }

    const handleChange = (evnt) => {

        setSubmits({ ...submitData, [evnt?.target?.name]: evnt?.target?.value });
        dispatch({ type: 'set', data: { ...data, [evnt?.target?.name]: evnt?.target?.value } }); 
       // console.log(`${evnt?.target?.name}`, `${evnt?.target?.value}`)
    }

    const handleOnChange1 = (evnt) => {

        setSubmit({ ...data, [evnt?.target?.name]: evnt?.target?.value });
        dispatch({ type: 'set', data: { ...data, [evnt?.target?.name]: evnt?.target?.value } }); 
       // console.log(`${evnt?.target?.name}`, `${evnt?.target?.value}`)
    }

    const handleOnChange2 = (evnt) => {

        setSubmitDob({ ...data, [evnt?.target?.name]: evnt?.target?.value });
        dispatch({ type: 'set', data: { ...data, [evnt?.target?.name]: evnt?.target?.value } }); 
       // console.log(`${evnt?.target?.name}`, `${evnt?.target?.value}`)
    }
    //  const handlePayNew  = () => {
    //     setPaymentObj([])
    // }    
  
const rowSelected = (args) => {
    //   handleDelete() 
      let result = args?.data;
      setSearchResult(result)
}

const actionBegin =(args)=>{   
    if(args.requestType === "delete"){
        handleDelete() 
    }
}

 useEffect(()=> {
    if(
        submitData?.hireDate && submitData?.firstName && submitData?.lastName && submitDob?.dateOfBirth &&
        submitData?.emailAddress && submitData?.gender && submit?.salaryGradeId &&  
        submitData?.departmentId && submitData?.maritalStatus  && submitData?.employeeTypeId 
        && submitData?.staffId && submitData?.employeeStatusId  && submitData?.country && submitData?.nationality 
        )
        {
         setEnableBtn(false);
        } else {
         setEnableBtn(true);
        }

},[submitData])

    useEffect(() => {
        setSubmitData((prev) => ({...prev, ...finalSal})) 
    }, [finalSal])

    useEffect(() => {
        setSubmitData((prev) => ({...prev, ...finalOrg})) 
    }, [finalOrg])

    useEffect(() => {
        setSubmitData((prev) => ({...prev, ...finalAccData})) 
    }, [finalAccData])

    useEffect(() => {
        setSubmitDob((prev) => ({...prev, ...finalDate}))
    }, [finalDate])

    return (
        <>
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                title={`Delete ${searchResult?.name}?`}
                onConfirm={onConfirm}
                onCancel={onCancel}
                focusCancelBtn
                show={isActive}
            >
        You will not be able to recover this record
      </SweetAlert>
            <CRow hidden={!show ? true : false}>
                 <CCol md='1'></CCol>
                <CCol   xs="12"><h5><CSLab code={'HCM-2DVGKL0FBGW_HRPR'} /></h5></CCol>
            <CCol md="4" xs="7">
                    <CSAutoComplete
                        filterUrl={SearchEmployeeByNameOrCode(companyReference,searchInput, pageNumber, numberOfItems, orderBy, sortOrder)}
                        placeholder= {GetLabelByName("HCM-4NCKCPUZGF7_LASN", lan)}
                        handleSelect={handleSearchResultSelect}
                        uniqueIdKey={'id'}
                        displayTextKey={'firstName'}
                        setInput={setSearchInput}
                        emptySearchFieldMessage={GetLabelByName( "HCM-76PRNEXWQMS_LOLN", lan)}
                        input={searchInput}
                        handleId={setHandleId}

                        isPaginated={false}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        numberOfItems={numberOfItems}
                        setNumberOfItems={setNumberOfItems}
                        orderBy={orderBy}
                        setOrderBy={setOrderBy}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                    />
                </CCol>
                <CCol md="8" xs='5' className='text-right'>
                    <CFormGroup>
                        <CButton type="button" onClick={handleAddNewRecord} size="sm" color="primary"> <AiOutlinePlus /> {show ? <CSLab code={'HCM-TAAFD4M071D-HRPR'} /> : null} </CButton>
                    </CFormGroup>
                </CCol>
            </CRow>
            <CRow>            
                <CCol xs="12" hidden={show}>
                    <CCard>
                        <CCardHeader>
                        <CCol xs="12"><h5><CSLab lable="" code={!show? mode === 'Add' ? GetLabelByName("HCM-ORVVKCDAB5_LASN", lan): mode === 'Update' ? GetLabelByName("HCM-M7JNZHXNTT-KCMI", lan)   : GetLabelByName("HCM-M7JNZHXNTT-KCMI", lan) : 'null' } /></h5></CCol>
                        </CCardHeader>
                        <CCardBody style={{ height: CardBodyHeight, overflowY: 'auto' }}>
                            <CForm action="" method="post" autoComplete='off'>
                                <CTabs>
                                    <CNav variant="tabs">
                                        <CNavItem>
                                            <CNavLink href="#" active={activeKey === 1}
                                                onClick={() => setActiveKey(1)}><CSLab code="HCM-HZU4WPFB1L9-LASN" /></CNavLink>
                                        </CNavItem>
                                        <CNavItem>
                                            <CNavLink href="#" active={activeKey === 2}
                                                onClick={() => setActiveKey(2)}><CSLab code="HCM-GQR50DATROE_PSLL" /></CNavLink>
                                        </CNavItem>

                                        <CNavItem>
                                            <CNavLink href="#" active={activeKey === 3}
                                                onClick={() => setActiveKey(3)}><CSLab code="HCM-D9GDJ0ZHB7U_LOLN" /></CNavLink>
                                        </CNavItem>
                                        <CNavItem>
                                            <CNavLink href="#" active={activeKey === 4}
                                                onClick={() => setActiveKey(4)}><CSLab code="HCM-TNH48GNHQW-LANG" /></CNavLink>
                                        </CNavItem>
                                        <CNavItem>
                                            <CNavLink href="#" active={activeKey === 5}
                                                onClick={() => setActiveKey(5)}><CSLab code="HCM-CB7ODJKF2IN-KCMI" /></CNavLink>
                                        </CNavItem>
                                    </CNav>

                                    <CTabContent>
                                        <CTabPane style={{ marginTop: '10px' }} visible={activeKey === 1 ? 'true' : 'false'}>
                                            <CRow className={'bottom-spacing'}>
                                                {/* Details */}
                                                <CCol md="6">
                                                    <CRow>
                                                        <CCol md="4" xs="4">
                                                            <CLabel> <CSLab code="HCM-KZPKH8ICPD-PSLL" /> </CLabel>
                                                            <CSelect  name="titleId" value={submitData?.titleId || ''} onChange={handleOnChange}>
                                                                {
                                                                    titles.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>
                                                        <CCol md="4" xs="8">
                                                            <CLabel> <CSLab code="HCM-KPH53NF08RG" /> </CLabel><CSRequiredIndicator />
                                                            <CInput placeholder={GetLabelByName("HCM-M45LNYXVT6_LASN", lan)} name="firstName" value={submitData?.firstName || ''} onChange={handleOnChange} />
                                                        </CCol>
                                                        <CCol md="4">
                                                            <CLabel> <CSLab code="HCM-ZYCFSGCKMC" /> </CLabel><CSRequiredIndicator />
                                                            <CInput placeholder={GetLabelByName("HCM-B6FYFT3XE6S_HRPR", lan)} name="lastName" value={submitData?.lastName || ''} onChange={handleOnChange} />
                                                        </CCol>
                                                    </CRow>

                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel>  <CSLab code="HCM-S2MUMDYJNP_HRPR" /> </CLabel>
                                                            <CInput placeholder={GetLabelByName("HCM-WOEVNX19YX-LASN", lan)} name="otherName" value={submitData?.otherName || ''} onChange={handleOnChange} />
                                                        </CCol>

                                                        <CCol md="4" xs="6">
                                                            <CLabel><CSLab code="HCM-7HTWFD0THEN-PSLL" /></CLabel><CSRequiredIndicator />
                                                            <CSelect name="gender" value={submitData?.gender || -1} onChange={handleOnChange}>
                                                                {                                                                    
                                                                    gender.map((x, i) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>
                                                        <CCol md="4" xs="6">
                                                            <CLabel><CSLab code="HCM-XYNVK7A8USK_PSLL" /></CLabel><CSRequiredIndicator />
                                                            <CInput name="dateOfBirth" value={submitDob?.dateOfBirth || ''} max={new Date().toISOString().slice(0, -14)} onKeyDown={(e) => e.preventDefault()}  onChange={handleOnChange2} type='date' />
                                                        </CCol>
                                                        <CCol md="4">
                                                            <CLabel htmlFor=""><CSLab code='HCM-76DW66H8FM-LANG' /></CLabel><CSRequiredIndicator />
                                                            <CSelect name='maritalStatus' value={submitData?.maritalStatus || ''} onChange={handleOnChange} >
                                                                {
                                                                    maritalStatus.map((x,i)=><option value={x.id} key={i}>{x.name}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol> 
                                                    </CRow>
                                                    <CRow>
                                                        <CCol md="12" style={{ marginTop: '5px' }}>
                                                            <CSLineLabel name={'HCM-YD305CBYLEE_LOLN'} />
                                                        </CCol>
                                                        <CCol md="5">
                                                            <CLabel><CSLab code="HCM-CXLK7IYZ9B9-KCMI" /></CLabel><CSRequiredIndicator />
                                                            <CInput  placeholder={GetLabelByName("HCM-61522DCMNA-LANG", lan)}name="emailAddress" value={submitData?.emailAddress || ''} onChange={handleOnChange} />
                                                        </CCol>
                                                        <CCol md="4" xs="6">
                                                            <CLabel><CSLab code="HCM-BOSPUEXHRP_PSLL" /></CLabel><CSRequiredIndicator />
                                                            <PhoneInput
                                                                name ='phoneNumber'
                                                                placeholder="Phone"
                                                                value={submitData?.phoneNumber || ''}
                                                                onChange={setPhone} 
                                                            />
                                                        </CCol>
                                                        <CCol md="3" xs="6">
                                                            <CLabel><CSLab code="HCM-W7SKIIIFCKE_PSLL" /></CLabel>
                                                            <CInput placeholder={GetLabelByName("HCM-MLXT5911ZC-LASN", lan)} name="digitalAddress" value={submitData?.digitalAddress || ''} onChange={handleOnChange} />
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol md="12">
                                                            <CLabel><CSLab code="HCM-ZSJMVZ6F8MR-LOLN" /></CLabel>
                                                            <CTextarea placeholder={GetLabelByName("HCM-AF2ZPOUARPA-PSLL", lan)} name="address" value={submitData?.address || ''} onChange={handleOnChange} style={{ height: '60px', resize: 'none' }}></CTextarea>
                                                        </CCol>
                                                    </CRow>
                                                </CCol>
                                                <CCol md='1'>
                                                    <div className="vl" style={{height: '45vh'}}></div>
                                                </CCol>  
                                                <CCol md="5">
                                                    <CRow>
                                                        <CCol md="6" xs="6">
                                                            <CLabel><CSLab code="HCM-CSKVMLLGNW" /></CLabel><CSRequiredIndicator />
                                                            <CSelect name="country" value={submitData?.country || -1} onChange={handleOnChange}>
                                                                {
                                                                    countries.map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>
                                                        <CCol md="6" xs="6">
                                                            <CLabel><CSLab code="HCM-IM8I8SKJ1J9_KCMI" /></CLabel><CSRequiredIndicator />
                                                            <CSelect name="nationality" value={submitData?.nationality || -1} onChange={handleOnChange}>
                                                                {
                                                                    nationality.map((x, i) => <option key={i} value={x.id}>{x.demonym}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol md="6" xs="7">
                                                            <CLabel ><CSLab code="HCM-WRKPLF34TW_LOLN" /></CLabel>
                                                            <CInput placeholder={GetLabelByName("HCM-RHPFDVJQYK_LANG", lan)} name="nationalID" value={submitData?.nationalID || ''} onChange={handleOnChange} />
                                                        </CCol>
                                                        <CCol md="2" xs="5" style={{marginTop: '15px'}}>
                                                            <CSCheckbox label='HCM-95HTK1MHWY_PSLL' checked={submitData?.isResident || false} name='isResident' onChange={handleCheckboxChange2} />
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol md="12" style={{ marginTop: '5px' }}>
                                                            <CRow>
                                                                <CCol md="12"><CSLineLabel name="HCM-VSHKR5ODJ1H_LANG" /> </CCol>
                                                            </CRow>                                                           
                                                            <CRow>  
                                                                <div className='image--container'>                                                                
                                                                    <FileUploader handleChange={handleFileChange} name="photoPassportReference" value={submitData?.photoPassportReference || ''} types={FileTypes} maxSize={1} file={file}  />                                                                   
                                                                    <span style={{ fontSize: '12px', color: '#666' }}>{file ? `Name: ${file.name}` : "No image uploaded yet"}</span>
                                                                    <span style={{ fontSize: '20px' }}>{file ? <> <AiOutlineEye onClick={() => setVisible(true)} /> <AiOutlineClose color='red' onClick={() => setFile(null)} /> </> : null} </span>
                                                                </div>                                                                                                                   
                                                            </CRow>
                                                        </CCol>
                                                    </CRow>                                                 
                                                </CCol>
                                            </CRow>
                                        </CTabPane>
                                        <CTabPane visible={activeKey === 2 ? 'true' : 'false'} style={{ marginTop: '10px' }}>
                                            <CRow className={'bottom-spacing'}>
                                                <CCol md='6'>
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel><CSLab code="HCM-6ADWUXU89T8_LASN" /></CLabel><CSRequiredIndicator />
                                                            <CInput placeholder={GetLabelByName("HCM-KVU6ZZOI9TR_LASN", lan)} name="staffId" value={submitData?.staffId || ''} onChange={handleOnChange} />
                                                        </CCol>
                                                        <CCol md="5">
                                                            <CLabel><CSLab code="HCM-HL6HU7PY50C_KCMI" /></CLabel><CSRequiredIndicator />
                                                            <CInput  name="hireDate" max={new Date().toISOString().slice(0, -14)} onKeyDown={(e) => e.preventDefault()} value={submits?.hireDate || ''} onChange={handleChange} type="date" />
                                                            {/* <CInput name="hireDate" value={new Date()} onChange={handleOnChange} type="date" /> */}
                                                        </CCol>                                                       
                                                    </CRow>

                                                    <CRow>
                                                        <CCol md="12" style={{ marginTop: '2px' }}><h6 className="ch-l-s"><CSLab code='HCM-5FP2JTH13DT-HRPR' /> </h6></CCol>
                                                        <CCol md="4">
                                                            <CLabel><CSLab code="HCM-4D1SZ24U9UO" /></CLabel>
                                                            <CSelect name="sectionId" value={submitData?.sectionId || -1} onChange={handleOnChange}>
                                                                {
                                                                    section.map((x, i) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>
                                                        <CCol md="4">
                                                            <CLabel><CSLab code="HCM-N6I0LSIYJF" /></CLabel><CSRequiredIndicator />
                                                            <CSelect name="departmentId" value={submitData?.departmentId || -1} onChange={handleOnChange}>
                                                                {
                                                                  department.map((x, i) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>
                                                        <CCol md="4">
                                                            <CLabel><CSLab code="HCM-LAFPT6FJ57N" /></CLabel>
                                                            <CSelect name="divisionId" value={submitData?.divisionId || -1} onChange={handleOnChange}>
                                                                {
                                                                    division.map((x, i) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol md="12"></CCol>
                                                        <CCol md="4">
                                                            <CLabel><CSLab code="HCM-HMLNLPOEIXG" /></CLabel><CSRequiredIndicator />
                                                            <CSelect name="employeeTypeId" value={submitData?.employeeTypeId || -1} onChange={handleOnChange}>
                                                                {
                                                                    employeeType.map((x, i) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>
                                                        <CCol md="4">
                                                            <CLabel><CSLab code="HCM-ATGLL367GOQ" /></CLabel>
                                                            <CSelect name="positionId" value={submitData?.positionId || -1} onChange={handleOnChange}>
                                                                {
                                                                   position.map((x, i) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>
                                                        <CCol md="4">
                                                            <CLabel><CSLab code="HCM-DHV9W3RF11D" /></CLabel>
                                                            <CSelect name="unitId" value={submitData?.unitId || -1} onChange={handleOnChange}>
                                                                {
                                                                    unit.map((x, i) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel><CSLab code="HCM-6XXECXM4Q5S" /></CLabel>
                                                            <CSelect name="locationId" value={submitData?.locationId || -1} onChange={handleOnChange}>
                                                                {
                                                                    location.map((x, i) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>
                                                        <CCol md="4">
                                                            <CLabel><CSLab code="HCM-B4SZR3O5JPO-PSLL" /></CLabel><CSRequiredIndicator />
                                                            <CSelect name="employeeStatusId" value={submitData?.employeeStatusId || -1} onChange={handleOnChange}>
                                                                {
                                                                    employeeStatus
                                                                        .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>
                                                    </CRow>
                                                </CCol>
                                               
                                                <CCol md='1'>
                                                    <div className="vl" style={{height: '45vh'}}></div>
                                                </CCol>     

                                                <CCol md='5'>
                                                    <CRow>
                                                        <CCol md="4" xs="4">
                                                            <CSCheckbox label='HCM-MBLDMC4EA0H-HRPR' checked={submitData?.isContract || false} name='isContract' onChange={handleCheckboxChange3} />
                                                        </CCol>

                                                        <CCol md="8" xs="8">
                                                            <CSCheckbox label='HCM-Y1ZMCB4FV0A-PSLL' checked={submitData?.isSecondaryEmployment || false} name='isSecondaryEmployment' onChange={handleCheckboxChange4} />
                                                        </CCol>
                                                        <CCol md="12" xs="6">
                                                            <CSCheckbox label='HCM-NJWYDCN6AFH-KCMI' checked={submitData?.isOvertimeExempt || false} name='isOvertimeExempt' onChange={handleCheckboxChange5} />
                                                        </CCol>
                                                        <CCol md="4" xs="6" style={{ marginTop: '15px' }}>
                                                            <CSCheckbox label='HCM-1PE5XKQHUDH-LANG' checked={submitData?.isProbation || false} name='isProbation' onChange={handleCheckboxChange6} />
                                                        </CCol>
                                                        <CCol md="8" xs="6">
                                                            <CLabel><CSLab code="HCM-37G0RI11N7-LOLN" /></CLabel>
                                                            <CInput  name="probationMonth" placeholder={GetLabelByName("HCM-4E1JWW6GREC_KCMI", lan)} value={submitData?.probationMonth || ''} onChange={handleOnChange} />
                                                        </CCol>
                                                    </CRow>

                                                    <CRow>
                                                        <CCol md="12" style={{ marginTop: '5px' }}>
                                                            <h6 htmlFor="name" className="ch-l-s"><CSLab code="HCM-E6FV7KUTAIJ-PSLL" /></h6>
                                                        </CCol>
                                                        <CCol md="6">
                                                            <CLabel ><CSLab code="HCM-PZP4MEYWDGH" /></CLabel><CSRequiredIndicator />
                                                            <CSelect name="salaryGradeId" value={submitData?.salaryGradeId || -1} onChange={(evnt) => { setSubmitData(prev => ({...prev, notch: evnt.target.value}));
                                                                getGldetailsByGLID(evnt) ; handleOnChange1(evnt); setNotche(evnt)  }}>
                                                                {
                                                                    salaryGrade
                                                                        .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>
                                                        <CCol md="6">
                                                            <CLabel><CSLab code="HCM-EMJ8YGMQGH9_KCMI" /></CLabel>
                                                            <CSelect name="notchId" value={submitData?.salaryRate || -1} disabled={notchValue.length > 0 ? false : true} onChange={(evnt) => {                                                            
                                                                setSubmitData(prev => ({...prev, notchId: evnt.target.id, salaryRate: evnt.target.value}))
                                                                setDisableRate(true)
                                                            }}><option key={0} value={0} >{`Select Notch`}</option>
                                                                {
                                                                    notchValue
                                                                        .map((x, i) => <option key={i+1} value={x.amount} id={x.id}>{`Notch ${i+1}`}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>
                                                        <CCol md="4">
                                                            <CLabel><CSLab code="HCM-CVBN0JP6CNQ_PSLL" /></CLabel>
                                                            <CInput   name="currency" value={values?.currency || ''} onChange={handleOnChange1}  disabled />
                                                        </CCol>
                                                        <CCol md="4">
                                                            <CLabel><CSLab code="HCM-8SV0WSF3M27-KCMI" /></CLabel>
                                                            <CInput  name="salaryType" value={values?.salaryType || ''} onChange={handleOnChange1}  disabled />
                                                        </CCol>
                                                        <CCol md="4" style={{ textAlign: 'right' }}>
                                                            <CLabel htmlFor="rate"><CSLab code="HCM-PH98CHJVZO_KCMI" /></CLabel><CSRequiredIndicator />
                                                            <CurrencyFormat thousandSeparator={true}                                                                 
                                                                style={{ textAlign: 'right' }}
                                                                name="salaryRate"
                                                                value={submitData?.salaryRate}
                                                                disabled = {disableRate ? true : false}
                                                                onChange={handleOnChange}   
                                                                placeholder={'0.00'}                                                             
                                                                />
                                                           
                                                        </CCol>
                                                    </CRow>
                                                </CCol>
                                            </CRow>
                                        </CTabPane>

                                        <CTabPane visible={activeKey === 3 ? 'true' : 'false'} style={{ marginTop: '10px' }}>
                                        <CRow>        
                                            <CCol md='12' className='text-right'>
                                                <CFormGroup>
                                                   <CButton type="button" onClick={handleAddNewAccount} size="sm" color="primary"> <AiOutlinePlus  />  <CSLab code={'HCM-5W6FDEX4795-LASN'} /> </CButton> 
                                                </CFormGroup>
                                            </CCol>    
                                             <CCol md="12">
                                                <GridComponent allowPaging={true} dataSource={paymentObj} editSettings={editSettings} height={350}  rowSelected={rowSelected} actionComplete={actionBegin} pageSettings={{ pageSize: 5 }} ref={trans}  >
                                                    <ColumnsDirective>
                                                        <ColumnDirective field="id" headerText={"ID"} width='100' visible={false} />
                                                        <ColumnDirective field='paymentModetext' edit={opt}  headerText={GetLabelByName("HCM-GKPKF3QGKHJ-LASN", lan)}  width='100' /> 
                                                        <ColumnDirective field='bankOrNetworkName' headerText={GetLabelByName("HCM-8HQGFGIAVIC_LANG", lan)} width='100' />
                                                        <ColumnDirective field='branchIdtext' headerText={GetLabelByName("HCM-5JJIZBZLYWP_LANG", lan)} width='100' />                                                      
                                                        <ColumnDirective field='accountNumber' headerText={GetLabelByName("HCM-1UEP04SV4P9_LASN", lan)}  width='100' />
                                                        <ColumnDirective field='paymentBasisName' headerText={GetLabelByName("HCM-C1JUXJYA3B7-LASN", lan)} width='100' />
                                                        <ColumnDirective field='fixedAmountOrPercentageOfNet' headerText={GetLabelByName("HCM-75HIH44NO3J_PSLL", lan)} format='n2' width='80' />
                                                        <ColumnDirective field='isDefault' headerText={GetLabelByName("HCM-BL95JD6K2W9-LOLN", lan)}  width='90' />
                                                        <ColumnDirective commands={commandOptions} headerText={GetLabelByName("HCM-F4IUJ9QVOM6", lan)} width='60' textAlign="Center" />
                                                    </ColumnsDirective>
                                                    <Inject services={[Page, Sort, Filter, Group, Edit, Toolbar, CommandColumn]} />
                                                </GridComponent>
                                            </CCol>
                                        </CRow>
                                        <CModal size={'lg'}  show={showModal} onClose={() => setshowModal(!showModal)} closeOnBackdrop={false}>
                                                <CModalHeader onClose={() => setVisible(false)}>
                                                    <CModalTitle> <CSLab code='HCM-WM35S647NT_LOLN' /> </CModalTitle>
                                                </CModalHeader>
                                                <CModalBody>
                                                   
                                                       {
                                                        payOpt === 0 ?  <CRow>
                                                        <CCol md="8">
                                                            <CLabel htmlFor=""><CSLab code='HCM-GKPKF3QGKHJ-LASN' /></CLabel>
                                                            <CSelect name='paymentMode' value={data?.paymentMode || ''} onChange={paymentOnChange}>
                                                                {
                                                                    accountType.map((x,i)=><option value={x.id} key={i}>{x.name}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol> 
                                                    </CRow>:null
                                                       }
                                                        {
                                                        payOpt === 3 ?  
                                                        <div>
                                                            <CRow>
                                                            
                                                            <CCol md="8">
                                                                <CLabel htmlFor=""><CSLab code='HCM-GKPKF3QGKHJ-LASN' /></CLabel>
                                                                <CSelect name='paymentMode' value={data?.paymentMode || ''} onChange={paymentOnChange}>
                                                                    {
                                                                        accountType.map((x,i)=><option value={x.id} key={i}>{x.name}</option>)
                                                                    }
                                                                </CSelect>
                                                            </CCol> 
                                                            <CCol md="4" xs="6">
                                                                <CLabel style={{ color: '#FFF' }}><CSLab code="." /></CLabel><br />
                                                                <CSCheckbox label='HCM-BL95JD6K2W9-LOLN' checked={data?.isDefault || false} name='isDefault' onChange={handleCheckboxChange1} />
                                                            </CCol>
                                                            <CCol md="6">
                                                                    <CLabel><CSLab code='HCM-C1JUXJYA3B7-LASN' /></CLabel><CSRequiredIndicator />
                                                                    <CSelect name='paymentBasis'  value={data?.paymentBasis || ''}  onChange={(evnt) => { paymentOnChange(evnt); handleLabelChange(evnt);   setPaymentBasis(+evnt?.target?.value) }}>
                                                                        {
                                                                        payBasis.map((x,i)=><option value={x.id} key={i}>{x.name}</option>)
                                                                        }
                                                                    </CSelect>
                                                                </CCol>
                                                                <CCol md="6" style={{ textAlign: 'right' }}>
                                                                    <CLabel  ><CSLab code={textLable} /></CLabel><CSRequiredIndicator />
                                                                    <CurrencyFormat thousandSeparator={true}                                                                 
                                                                        style={{ textAlign: 'right' }}
                                                                        name="fixedAmountOrPercentageOfNet"
                                                                        value={data?.fixedAmountOrPercentageOfNet || ''}
                                                                        onChange={paymentOnChange}  
                                                                        placeholder={'0.00'}                                                              
                                                                        />
                                                                </CCol>
                                                                
                                                                <CCol md="12">
                                                                    <CLabel><CSLab code='HCM-Z0FV0XJJ06' /></CLabel>
                                                                    <CTextarea placeholder={GetLabelByName("HCM-Z0FV0XJJ06", lan)} onChange={paymentOnChange} value={data?.note || ''} name="note" style={{ height: '80px', resize: 'none' }}></CTextarea>
                                                                </CCol>                                                         
                                                            </CRow>
                                                        </div>
                                                        : null 
                                                    }
                                                    {
                                                        payOpt === 2 ?
                                                        <CRow> 
                                                            
                                                        <CCol md="8">
                                                            <CLabel htmlFor=""><CSLab code='HCM-GKPKF3QGKHJ-LASN' /></CLabel>
                                                            <CSelect name='paymentMode' value={data?.paymentMode || ''} onChange={paymentOnChange}>
                                                                {
                                                                    accountType.map((x,i)=><option value={x.id} key={i}>{x.name}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol> 
                                                        <CCol md="4" xs="6">
                                                            <CLabel style={{ color: '#FFF' }}><CSLab code="." /></CLabel><br />
                                                            <CSCheckbox label='HCM-BL95JD6K2W9-LOLN' checked={data?.isDefault || false} name='isDefault' onChange={handleCheckboxChange1} />
                                                        </CCol>                                                       
                                                        <CCol md="4">
                                                            <CLabel htmlFor=""><CSLab code='HCM-8HQGFGIAVIC_LANG' /></CLabel><CSRequiredIndicator />
                                                            <CSelect name='mobileNetworkId' value={data?.mobileNetworkId || ''} onChange={(event) => { paymentOnChange(event); setBankBranche(event) }} >
                                                                {
                                                                    networks.map((x,i)=><option value={x.id} key={i}>{x.name}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>                
                                                        <CCol md="4">
                                                            <CLabel ><CSLab code='HCM-28JQRN57PA4-PSLL' /></CLabel><CSRequiredIndicator />
                                                            <CInput placeholder={GetLabelByName("HCM-CEY6712B3G-LANG", lan)} name='accountNumber' value={data?.accountNumber || ''} onChange={paymentOnChange}  />
                                                        </CCol>
                                                        <CCol md="4">
                                                            <CLabel><CSLab code='HCM-C1JUXJYA3B7-LASN' /></CLabel><CSRequiredIndicator />
                                                            <CSelect name='paymentBasis'  value={data?.paymentBasis || ''}  onChange={(evnt) => { paymentOnChange(evnt); handleLabelChange(evnt);   setPaymentBasis(+evnt?.target?.value) }}>
                                                                {
                                                                   payBasis.map((x,i)=><option value={x.id} key={i}>{x.name}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>
                                                        {
                                                            paymentBasis === 1 ? 
                                                            <CCol md="4" style={{ textAlign: 'right' }}>
                                                            <CLabel><CSLab code={textLable} /></CLabel><CSRequiredIndicator />
                                                                <CurrencyFormat thousandSeparator={true} 
                                                                    
                                                                    style={{ textAlign: 'right' }}
                                                                    name="fixedAmountOrPercentageOfNet"
                                                                    value={data?.fixedAmountOrPercentageOfNet || ''}
                                                                    onChange={paymentOnChange}
                                                                    placeholder={'0.00'}
                                                                    />
                                                            </CCol> :null
                                                        }
                                                        {
                                                            paymentBasis === 2 ? 
                                                            <CCol md="4">
                                                                <CLabel><CSLab code={textLable} /></CLabel><CSRequiredIndicator />
                                                                <CInput placeholder={'0.00'} style={{textAlign: 'right'}} name="fixedAmountOrPercentageOfNet" value={data?.fixedAmountOrPercentageOfNet || ''}  onChange={handleOnChange} />
                                                            </CCol>
                                                            : null
                                                        }
                                                                                                             
                                                        <CCol md="12">
                                                            <CLabel htmlFor="name"><CSLab code='HCM-Z0FV0XJJ06' /></CLabel>
                                                            <CTextarea placeholder={GetLabelByName("HCM-Z0FV0XJJ06", lan)} onChange={paymentOnChange} value={data?.note || ''} name="note" style={{ height: '80px', resize: 'none' }}></CTextarea>
                                                        </CCol>
                                                    </CRow>:null
                                                    }
                                                                                                     
                                            {
                                                payOpt === 1  ?
                                                <CRow>  
                                                    
                                                    <CCol md="8">
                                                            <CLabel htmlFor=""><CSLab code='HCM-GKPKF3QGKHJ-LASN' /></CLabel>
                                                            <CSelect name='paymentMode' value={data?.paymentMode || ''} onChange={paymentOnChange}>
                                                                {
                                                                    accountType.map((x,i)=><option value={x.id} key={i}>{x.name}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol> 
                                                        <CCol md="4" xs="6">
                                                            <CLabel style={{ color: '#FFF' }}><CSLab code="." /></CLabel><br />
                                                            <CSCheckbox label='HCM-BL95JD6K2W9-LOLN' checked={data?.isDefault || false} name='isDefault' onChange={handleCheckboxChange1} />
                                                        </CCol>                                                      
                                                <CCol md="4">
                                                    <CLabel htmlFor=""><CSLab code='HCM-9C7OD5FHV7Q_PSLL' /></CLabel><CSRequiredIndicator />
                                                    <CSelect name='bankId' value={data?.bankId || ''} onChange={(event) => { paymentOnChange(event); getBranches(event) }} >
                                                        {
                                                            banks.map((x,i)=><option value={x.id} key={i}>{x.name}</option>)
                                                        }
                                                    </CSelect>
                                                </CCol> 
                                                <CCol md="4">
                                                    <CLabel htmlFor=""><CSLab code='HCM-5JJIZBZLYWP_LANG' /></CLabel><CSRequiredIndicator />
                                                    <CSelect  name='branchId' value={data?.branchId || ''} onChange={paymentOnChange}>
                                                    <option value='' >select Branch</option>
                                                        {
                                                            branche.map((x,i)=><option value={x.id} key={i}>{x.name}</option>)
                                                        }
                                                    </CSelect> 
                                                </CCol>                
                                                <CCol md="4">
                                                    <CLabel ><CSLab code='HCM-HVW65C2S13E_LANG' /></CLabel><CSRequiredIndicator />
                                                    <CInput placeholder={GetLabelByName("HCM-CEY6712B3G-LANG", lan)} name='accountNumber' value={data?.accountNumber || ''} onChange={paymentOnChange}  />
                                                </CCol>
                                                <CCol md="4">
                                                    <CLabel><CSLab code='HCM-C1JUXJYA3B7-LASN' /></CLabel><CSRequiredIndicator />
                                                    <CSelect name='paymentBasis'  value={data?.paymentBasis || ''}  onChange={(evnt) => { paymentOnChange(evnt); handleLabelChange(evnt) }}>
                                                        {
                                                            payBasis.map((x,i)=><option value={x.id} key={i}>{x.name}</option>)
                                                        }
                                                    </CSelect>
                                                </CCol>
                                                <CCol md="4" style={{ textAlign: 'right' }}>
                                                <CLabel ><CSLab code={textLable} /></CLabel><CSRequiredIndicator />
                                                    <CurrencyFormat thousandSeparator={true} 
                                                        
                                                        style={{ textAlign: 'right' }}
                                                        name="fixedAmountOrPercentageOfNet"
                                                        value={data?.fixedAmountOrPercentageOfNet || ''}
                                                        onChange={paymentOnChange}
                                                        placeholder={'0.00'}
                                                        />
                                                </CCol> 
                                                <CCol md="12">
                                                    <CLabel htmlFor="name"><CSLab code='HCM-Z0FV0XJJ06' /></CLabel>
                                                    <CTextarea placeholder={GetLabelByName("HCM-Z0FV0XJJ06", lan)} onChange={paymentOnChange} value={data?.note || ''} name="note" style={{ height: '80px', resize: 'none' }}></CTextarea>
                                                </CCol>
                                            </CRow>:null
                                            }
                                                        
                                                </CModalBody>
                                                <CModalFooter>
                                               {/*  */}
                                                <CButton color="secondary" size='sm' onClick={formClose}><AiOutlineClose size={20} />Close</CButton>
                                                <CButton  onClick={paySubmit}   style={{ marginRight: 5, float: 'right' }}  type="button" size="sm" color="success"><AiFillSave size={20} /> Add</CButton>
                                                </CModalFooter>
                                            </CModal>
                                        </CTabPane>

                                        <CTabPane visible={activeKey === 4 ? 'true' : 'false'} style={{ marginTop: '10px' }}>
                                            <CRow>
                                                <CCol md="6">
                                                    <CRow>
                                                        <CCol md="12"><CSLineLabel name="HCM-E6FV7KUTAIJ-PSLL" /> </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol md="6">
                                                            <CLabel><CSLab code="HCM-9LAWIPOM3V" /></CLabel>
                                                            <CSelect name="payrollHourId" value={submitData?.payrollHourId || -1} onChange={handleOnChange}>
                                                                {
                                                                    payrollHours.map((x, i) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>
                                                        <CCol md="6" style={{ textAlign: 'right' }}>
                                                            <CLabel><CSLab code="HCM-6QY4DPP3GS_LANG" /></CLabel>
                                                            <CInput placeholder={'0.00'} style={{ textAlign: 'right' }} name='percentageOfBasic' value={submitData?.percentageOfBasic || ''} onChange={handleOnChange}  />
                                                            
                                                        </CCol>
                                                        
                                                    </CRow>
                                                    <CRow>
                                                        <CCol md="12">
                                                            <CLabel><CSLab code="HCM-4OJ0M8OPPGO-PSLL" /></CLabel>
                                                            <CTextarea placeholder={GetLabelByName("HCM-Z0FV0XJJ06", lan)} name="paySlipNote" value={submitData?.paySlipNote} onChange={handleOnChange} style={{ height: '60px', resize: 'none' }}></CTextarea>
                                                        </CCol>
                                                    </CRow>
                                                </CCol>

                                                <CCol md='1'>
                                                    <div className="vl" style={{height: '45vh'}}></div>
                                                </CCol>  

                                            </CRow>
                                        </CTabPane>
                                        <CTabPane visible={activeKey === 5 ? 'true' : 'false'} style={{ marginTop: '10px' }}>
                                         
                                         <CRow>
                                             <CCol md="12">
                                                 {/* <CSLineLabel name="HCM-KKY1B2A9GJC_LOLN" /> */}
                                             </CCol>
                                             <CCol md='5'>
                                             <CRow>
                                             <CCol md="12">
                                                         <CSLineLabel name="HCM-E4VNOAZJPA_LASN" />
                                                     </CCol>
                                             </CRow>
             
                                         <CRow>
                                             <CCol md="6">
                                                 <CLabel><CSLab code="HCM-WINM5J0YY5K-LANG" /></CLabel><br />
                                                 <CSelect value={submitData?.salaryGLId || -1} name='salaryGLId'  onChange={handleOnChange} >
                                                     {
                                                         gLAccountData
                                                             .map((x, i) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                     }
                                                 </CSelect>
                                             </CCol>
                                             <CCol md="6">
                                                 <CLabel><CSLab code="HCM-0CQE84MSYWAG-KCMI" /></CLabel><br />
                                                 <CSelect value={submitData?.incomeTaxGLId || -1} name='incomeTaxGLId' onChange={handleOnChange}  >
                                                     {
                                                         gLAccountData
                                                             .map((x, i) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                     }
                                                 </CSelect>
                                             </CCol>
                                         </CRow>
             
                                         <CRow>
                                             <CCol md="6">
                                                 <CLabel><CSLab code="HCM-EJ9UPUJMQCM-PSLL" /></CLabel><br />
                                                 <CSelect value={submitData?.netSalaryPayableGLId  || -1} name='netSalaryPayableGLId' onChange={handleOnChange}  >
                                                     {
                                                         gLAccountData
                                                             .map((x, i) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                     }
                                                 </CSelect>
                                             </CCol>
                                             <CCol md="6">
                                                 <CLabel><CSLab code="HCM-2BNAL7LG4ZS_PSLL" /></CLabel><br />
                                                 <CSelect value={submitData?.operatingOvertimeGLId || -1} name='operatingOvertimeGLId' onChange={handleOnChange}  >
                                                     {
                                                         gLAccountData
                                                             .map((x, i) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                     }
                                                 </CSelect>
                                             </CCol>
                                         </CRow>
             
                                         <CRow>
                                             <CCol md="6">
                                                 <CLabel><CSLab code="HCM-IJW6JZJJEYA-PSLL" /></CLabel><br />
                                                 <CSelect value={submitData?.shiftAllowanceGLId ||  -1} name='shiftAllowanceGLId' onChange={handleOnChange}  >
                                                     {
                                                         gLAccountData
                                                             .map((x, i) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                     }
                                                 </CSelect>
                                             </CCol>
                                             <CCol md="6">
                                                 <CLabel><CSLab code="HCM-A5BKMEIDEA6_LASN" /></CLabel><br />
                                                 <CSelect value={submitData?.taxReliefGLId || -1} name='taxReliefGLId' onChange={handleOnChange}  >
                                                     {
                                                         gLAccountData
                                                             .map((x, i) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                     }
                                                 </CSelect>
                                             </CCol>
                                         </CRow>
                                     </CCol>
             
                                     <CCol md='1'>
                                            <div className="vl" style={{height: '45vh'}}></div>
                                        </CCol>        
                                     <CCol md='6'>
                                         <CRow>
                                             <CCol md="6">{/*  Saving Schemes */}
                                                 <CSLineLabel name="HCM-9LW6QXJLQK-LASN" />
                                             </CCol>
                                             <CCol md="6">
                                                 <CSLineLabel name="HCM-TPF2QMSQ1YG-LASN" />
                                             </CCol>
                                         </CRow>
             
                                         <CRow>
                                             <CCol md="6">
                                                 <CRow>
                                                     <CCol md="12">
                                                         <CLabel><CSLab code="HCM-VIEZQFX1BJA-LASN" /></CLabel><br />
                                                         <CSelect value={submitData?.mandatorySavingSchemeEmployeeContributionGLId || -1} name='mandatorySavingSchemeEmployeeContributionGLId' onChange={handleOnChange}  >
                                                             {
                                                             gLAccountData
                                                                     .map((x, i) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                             }
                                                         </CSelect>
                                                     </CCol>
                                                     <CCol md="12">
                                                         <CLabel><CSLab code="HCM-4JZ72YP83IP-LANG" /></CLabel><br />
                                                         <CSelect value={submitData?.mandatorySavingSchemeEmployerContributionGLId || -1} name='mandatorySavingSchemeEmployerContributionGLId' onChange={handleOnChange}  >
                                                             {
                                                                 gLAccountData
                                                                     .map((x, i) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                             }
                                                         </CSelect>
                                                     </CCol>
                                                     <CCol md="12">
                                                         <CLabel><CSLab code="HCM-BHPWFP7WEX6-PSLL" /></CLabel><br />
                                                         <CSelect value={submitData?.mandatorySavingSchemeEmployerTotalPayableGLId || -1} name='mandatorySavingSchemeEmployerTotalPayableGLId' onChange={handleOnChange}  >
                                                             {
                                                                 gLAccountData
                                                                     .map((x, i) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                             }
                                                         </CSelect>
                                                     </CCol>
                                                 </CRow>
                                             </CCol>
             
                                             <CCol md='6'>
                                                 <CRow>
                                                     <CCol md="12">
                                                         <CLabel><CSLab code="HCM-VIEZQFX1BJA-LASN" /></CLabel><br />
                                                         <CSelect value={submitData?.volontarySavingSchemeEmployeeContributionGLId || -1} name='volontarySavingSchemeEmployeeContributionGLId' onChange={handleOnChange}  >
                                                             {
                                                                 gLAccountData
                                                                     .map((x, i) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                             }
                                                         </CSelect>
                                                     </CCol>
                                                     <CCol md="12">
                                                         <CLabel><CSLab code="HCM-4JZ72YP83IP-LANG" /></CLabel><br />
                                                         <CSelect value={submitData?.volontarySavingSchemeEmployerContributionGLId || -1} name='volontarySavingSchemeEmployerContributionGLId' onChange={handleOnChange}  >
                                                             {
                                                                 gLAccountData
                                                                     .map((x, i) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                             }
                                                         </CSelect>
                                                     </CCol>
                                                     <CCol md="12">
                                                         <CLabel htmlFor="rate"><CSLab code="HCM-BKT38G6Y2NM_PSLL" /></CLabel><br />
                                                         <CSelect value={submitData?.volontarySavingSchemeEmployerTotalPayableGLId || -1} name='volontarySavingSchemeEmployerTotalPayableGLId' onChange={handleOnChange}  >
                                                             {
                                                                 gLAccountData
                                                                     .map((x, i) => <option key={x.id} value={x.id}>{x.name}</option>)
                                                             }
                                                         </CSelect>
                                                     </CCol>
                                                 </CRow>
                                             </CCol>
             
                                         </CRow>
                                     </CCol>
                                 </CRow>
                                    </CTabPane>
                                     </CTabContent>
                                 </CTabs>
                             </CForm>  
                                     </CCardBody>
                                     <CCardFooter>                            
                                        {'Update' === mode ? <CButton onClick={handleHistory} style={{ marginRight: 5, color: 'white' }} type="button" size="sm" color="success" ><CIcon name="cil-scrubber" />
                                            <CSLab lable="View History" code="HCM-ZIRH5SVBDUF_LANG" />
                                        </CButton> : null}
                                        <CButton  style={{ marginRight: 5, float: 'right' }} type="button" size="sm" color="success" onClick={handleOnSubmit}><AiFillSave size={20} />
                                            {'Add' === mode ? <CSLab code="HCM-HGUHIR0OK6T" /> : <CSLab code="HCM-5L07EAZ2A48" />}
                                        </CButton>
                                        <CButton   style={{ marginRight: 5, float: 'right', color: 'white' }} onClick={() => handleReset(1)} type="button" size="sm" color={'Add' === mode ? 'warning' : 'warning'}>
                                            <AiOutlineRedo size={20} /> {'Add' === mode ? <CSLab code="HCM-MELULU9B6R_KCMI" /> : <CSLab code="HCM-5KVATR3LGG5" />}
                                        </CButton>
                                        <CButton name='Cancel'  style={{ marginRight: 5, float: 'right', color: 'white' }} onClick={() => searchReset()} type="button" size="sm" color='secondary' ><AiOutlineClose size={20} /><CSLab code = 'HCM-V3SL5X7PJ9C-LANG' /></CButton>
                                        {
                                            'Update' === mode ? <CButton onClick={handleDelete}  style={{ marginRight: 5, float: 'right', color: 'white' }}  type="button" size="sm" color='danger' >
                                                <AiOutlineDelete size={20} /><CSLab lable="Delete" code = 'HCM-IIQS2WWFTPP_KCMI' /></CButton>
                                            : null
                                        }
                                        <p style={{left: "20px" }}><em style={{ fontSize: "12px" }}><CSLab code="HCM-S6DELVG0IQS-HRPR" /> (<CSRequiredIndicator />) <CSLab code="HCM-H72Q4EB363H_PSLL" /></em></p>
                                    </CCardFooter>
                                 </CCard>
                             </CCol>
                         </CRow>
                        <CModal show={visible} size={'sm'} onClose={() => setVisible(false)} closeOnBackdrop={true}>
                            <CModalBody>
                                <CRow style={{ marginTop: '-17px', marginRight: '-25px' }}>
                                    <CCol md='12' className={"text-right"} style={{ fontSize: '19px' }}>
                                        <AiFillCloseCircle color='red' onClick={() => setVisible(false)} />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol md="12">
                                        <img alt={file ? `Name: ${file.name}` : "No image uploaded yet"} style={{ width: '90%' }} src={file ? URL.createObjectURL(file) : null} />
                                    </CCol>
                                </CRow>
                            </CModalBody>
                        </CModal>
                        <ToastContainer />
        </>
    )
}

export default EmployeeDetail