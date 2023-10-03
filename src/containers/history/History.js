import React, { useEffect, useState } from 'react'

import {
 CButton, 
 CModal, 
 CModalHeader, 
 CModalTitle, 
 CModalBody, 
 CModalFooter,
 
} from '@coreui/react';
import { CSLab } from 'src/reusable/components';
import HistoryTable from './table/HistoryTable';
import { DateRangePickerComponent, PresetsDirective, PresetDirective } from '@syncfusion/ej2-react-calendars';
import { CCol, CRow } from '@coreui/bootstrap-react';
import "./style.css"
import ViewDetails from './ViewDetails';
import { toast } from 'react-toastify';
// import { GetHistoryInfo } from 'src/api/actions';
import useFetch from 'src/hooks/useFetch';
import { GetHistoryInfo } from 'src/api/actions';
import { type } from 'src/reusable/utils/data/GenericData';
import useAuth from 'src/hooks/useAuth';

const renderDate = (dateStr) => {
   
    let dDate =  new Date(dateStr)
   
    let year = dDate.getFullYear()
   
    let month = dDate.getMonth() + 1
    let day = dDate.getDate()

   return `${year}-${month}-${day}`

}

const today = new Date(new Date().toDateString());
const weekStart = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
const weekEnd = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
    - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString());
    const monthStart = new Date(new Date(new Date().setDate(1)).toDateString());
    const monthEnd = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)).toDateString());
    const lastStart = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
    const lastEnd = new Date(new Date(new Date().setDate(0)).toDateString());
    const yearStart = new Date(new Date(new Date().getFullYear() - 1, 0, 1).toDateString());
    const yearEnd = new Date(new Date(new Date().getFullYear() - 1, 11, 31).toDateString());

    //http://psl-linux:5100/Logs/histories?itemId=3fa85f64-5717-4562-b3fc-2c963f66afa6&itemType=POS&companyReference=00000

const History = ({isGL=false, searchResult ={}, show, setShowHistory, url ="",title =""}) => {
    const [showDetails, setShowDetails] = useState(false)
    const [historyDetails, setHistoryDetails] = useState([])
   const [historyData,setHistoryData]  = useState([])
   const [dateValue, setDateValue] = useState(null)
  const {auth} =  useAuth()

      const { data, error, setUrl,isLoading } = useFetch("",(response) =>{
        // console.log({historyRes:response});
        if(response && response.items.length > 0){

            console.log({response})
             const {items} = response

             if(isGL){
                console.log({response})
             }else{
                setHistoryData(items.filter(x => x?.type !=="CREATE"))
               
             }

             setShowHistory(true)
           
        }else{
            toast.info(`No history found`)        
            setHistoryData([])
            // setShowHistory(false)
        }
      });

    //  console.log({useFetch1:error, data, isLoading})

  
    const rowSelected =(args)=>{
        let arr =[]
        let data = args.data?.data
        
        for(let a in data){
            console.log({rowSelected: a});
           
            let newObj ={}
            newObj.lable = a
            newObj.old = a === "status" ?  data[a]?.old ==="True"?  "Active" :"Inactive" :  data[a]?.old  || ""
            newObj.new = a === "status" ?  data[a]?.new ==="True"?  "Active" :"Inactive" :  data[a]?.new  || ""
            // if(a.toLocaleLowerCase() ==="locations"){
            //     newObj.old = data[a].toString()
            //     newObj.new = data[a].toString()
            // }else{
               
                

            // }
            arr.push(newObj)
           
        }
         if(arr.length === 0){
            toast.info(`No changes found`)  
            return
        }
      
         setHistoryDetails(arr)
         setShowDetails(true)

    }

    const handleHistory = async(startDate,endDate)=>{
        
        const {id} =searchResult
   //  setUrl(`${url}&startDate=${startDate}&endDate=${endDate}`)
       let response  = await  GetHistoryInfo(`${url}&companyReference=${auth?.companyReference}&startDate=${startDate}&endDate=${endDate}`)
       
       
    //    http://192.168.0.48:5100/Organisation/Departments/Logs?departmentId=eb63759d-7785-4077-849f-1ab44102372c&companyReference=00001_A01&startDate=2022-9-20&endDate=2022-10-1
    //    http://192.168.0.48:5100/Organisation/Departments/Logs?departmentId=eb63759d-7785-4077-849f-1ab44102372c&companyReference=00001_A01&startDate=2022-20-9&endDate=2022-1-10
        if(response && response.length > 0){
            setHistoryData(response)
            setShowHistory(true)
        }else{
            toast.info(`No history found`)        
            setHistoryData([])
            // setShowHistory(false)
        }
    }

    const onChange =(args)=>{
        setDateValue(args.value)
        if(args?.value){
            handleHistory(renderDate(args?.value[0]), renderDate(args?.value[1])) 
        }else{
            setHistoryData([])
        }
    }

    const closeModal = () => {
        setDateValue(null)
        setShowHistory(false)
        setHistoryData([])
    }

    useEffect(() => {
        setHistoryData([])
        setDateValue(null)
      return () => {
        setHistoryData([])
        setShowHistory(false)
        setDateValue(null)
      }
    }, [])

    
  
    return (
        <>
       
        <CModal closeOnBackdrop={false} show={show} onClose={closeModal} size="lg">
            {
                title ? <CModalHeader closeButton>
                <CModalTitle><CSLab name="History" code={'HCM-OP6HH1ER0WN_LANG'} />  : {title}</CModalTitle>
            </CModalHeader>:
            <CModalHeader closeButton>
            <CModalTitle><CSLab name="History" code={'HCM-OP6HH1ER0WN_LANG'} />  {isGL ?" (GL)" : ""}  : {searchResult?.code ||""} - {searchResult?.name ||""}</CModalTitle>
        </CModalHeader>
            }
           
            <CModalBody>
            <CRow>
            <CCol md='6'>
                <h5>Select Start and End Date : </h5>
            </CCol>
                <CCol md='6' >
                <div className='daterangepicker-control-section mb-1 _dateRange' style={{border:'1px solid #d2e1e2',padding:"3px 15px 0 15px", height:34, zIndex:1}}>
               {show ? <DateRangePickerComponent placeholder='Start and End date' value={dateValue} onChange={onChange} format={'dd\'\/\'MMMM\'\/\'yyyy'}>
                    <PresetsDirective>
                        <PresetDirective label="Today" start={today} end={today}></PresetDirective>
                        <PresetDirective label="This Week" start={weekStart} end={weekEnd}></PresetDirective>
                        <PresetDirective label="This Month" start={monthStart} end={monthEnd}></PresetDirective>
                        <PresetDirective label="Last Month" start={lastStart} end={lastEnd}></PresetDirective>
                        <PresetDirective label="Last Year" start={yearStart} end={yearEnd}></PresetDirective>
                    </PresetsDirective>
                </DateRangePickerComponent> : null}
                </div>
               
                </CCol>
               
            </CRow>
               
                <HistoryTable rowSelected={rowSelected} data={historyData}/>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={closeModal}>
                    <CSLab name="Close" code={'HCM-9E3ZC2E1S0N-LASN'} />
                </CButton>
            </CModalFooter>
        </CModal>

        <ViewDetails isGL={isGL} searchResult={searchResult} showDetails ={showDetails} setShowDetails={setShowDetails} data={historyDetails} />
        </>
    )
}

export default History