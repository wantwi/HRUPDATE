import React, { useEffect, useState } from 'react'

import {
 CButton, 
 CModal, 
 CModalHeader, 
 CModalTitle, 
 CModalBody, 
 CModalFooter,
 CTabs,
 CNavItem,
 CNav,
 CNavLink,
 CTabContent,
 CTabPane
} from '@coreui/react';
import { CSLab } from 'src/reusable/components';
import ViewDetailsTable from './table/ViewDetailsTable';
import { GetHistoryInfo } from 'src/api/actions';
import useAuth from 'src/hooks/useAuth';
import useFetch from 'src/hooks/useFetch';
// import ViewDetailsTable from './table/ViewDetailsTable';



const ViewPositionDetails = ({isGL,titleObj, initTitle,id, showDetails, data,setShowDetails, dateRange}) => {
    console.log({historyData:data});
     const [historyData, setHistoryData] = useState([])
     const [title, setTitle] = useState(initTitle)
     
    const {auth} = useAuth()

const {startDate, endDate} = dateRange


const {setUrl:getDetailsUrl, error, isLoading} = useFetch("", data => {
     
   
let arr =[]
     for (let a in data) {
    
      let newObj = {};
      newObj.lable = a;
      newObj.old =
       ( a === "status" ||  a === "isResident" ||  a === "isPayTax" ||  a === "isContract" ||  a === "isSecondaryEmployment")
          ?  data[a]?.new === "True" ||  data[a]?.new === "1" ||  data[a]?.new === 1 ||  data[a]?.new === "Active" ||  data[a]?.new === "ACTIVE"
            ? "YES"
            : "NO"
          : data[a]?.old || "";
      newObj.new =
     ( a === "status" ||  a === "isResident" ||  a === "isPayTax" ||  a === "isContract" ||  a === "isSecondaryEmployment")
          ?  data[a]?.new === "True" ||  data[a]?.new === "1" ||  data[a]?.new === 1 ||  data[a]?.new === "Active" ||  data[a]?.new === "ACTIVE"
            ? "YES"
            : "NO"
          : data[a]?.new || "";
      // if(a.toLocaleLowerCase() ==="locations"){
      //     newObj.old = data[a].toString()
      //     newObj.new = data[a].toString()
      // }else{

      // }
      arr.push(newObj);
    }
    if (arr.length === 0) {
    //   toast.info(`No changes found`);
      return;
    }



    setHistoryData(arr);
    

  })

  const getDetails = (type) => {
    setTitle(titleObj[type])

    setHistoryData([])
    getDetailsUrl(`Logs/histories/${id}/${type}`)

  }
       
     
   
    return (
        <CModal closeOnBackdrop={false} show={showDetails} onClose={() =>setShowDetails(false)} size="xl">
            <CModalHeader closeButton>
                
                <CModalTitle><CSLab name="History" code={'HCM-OP6HH1ER0WN_LANG'} />  {title ? `: - ${title}` :  ""}</CModalTitle>
            </CModalHeader>
            <CModalBody>
            <CTabs>
              
                    <CNav variant="tabs">
                      <CNavItem>
                        <div>
                        <CNavLink
                          href="#"
                        //   active={activeKey === 1}
                          onClick={() => getDetails("POS")}
                          
                        >
                          <CSLab code="Detail" />
                        </CNavLink>
                        </div>
                        
                      </CNavItem>
                      <CNavItem>
                     
                        <CNavLink
                          href="#"
                        //   active={activeKey === 2}
                        onClick={() => getDetails("POS_EAR")}
                        //   ref={tabTwoRef}
                        >
                          <CSLab code="Benefit" />
                        </CNavLink>
                      </CNavItem>

                      <CNavItem>
                        <CNavLink
                          href="#"
                        //   active={activeKey === 3}
                        onClick={() => getDetails("POS_DED")}
                        >
                          <CSLab code="HCM-6EX09QHNRK3-LASN" />
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>  
                        <CNavLink
                          href="#"
                        //   active={activeKey === 4}
                        
                        onClick={() => getDetails("POS_QUA")}
                        >
                          <CSLab code="Qualification" />
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>  
                        <CNavLink
                          href="#"
                        //   active={activeKey === 4}
                        
                        onClick={() => getDetails("POS_JOB")}
                        >
                          <CSLab code="Job Description" />
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink
                          href="#"
                        //   active={activeKey === 5}
                        
                        onClick={() => getDetails("POS_GLA")}
                        >
                          <CSLab code="HCM-CB7ODJKF2IN-KCMI" />
                        </CNavLink>
                      </CNavItem>
                    </CNav>

                    <CTabContent>
                      <CTabPane
                        style={{ marginTop: "10px" }}
                        // visible={activeKey === 1 ? true : false}
                      >
                        <ViewDetailsTable isGL={isGL} data={data}/>
                      </CTabPane>
                      <CTabPane
                        // visible={activeKey === 2 ? true : false}
                        style={{ marginTop: "10px" }}
                      >
                       {
                        isLoading ? "Please wait" : <ViewDetailsTable isGL={isGL} data={historyData}/>
                       }
                        
                      </CTabPane>

                      <CTabPane
                        // visible={activeKey === 3 ? true : false}
                        style={{ marginTop: "10px" }}
                      >
                         {
                        isLoading ? "Please wait" : <ViewDetailsTable isGL={isGL} data={historyData}/>
                       }
                      </CTabPane>

                      <CTabPane
                        // visible={activeKey === 4 ? true : false}
                        style={{ marginTop: "10px" }}
                      >
                          {
                        isLoading ? "Please wait" : <ViewDetailsTable isGL={isGL} data={historyData}/>
                       }
                      </CTabPane>

                      <CTabPane
                        // visible={activeKey === 4 ? true : false}
                        style={{ marginTop: "10px" }}
                      >
                          {
                        isLoading ? "Please wait" : <ViewDetailsTable isGL={isGL} data={historyData}/>
                       }
                      </CTabPane>

                      <CTabPane
                        // visible={activeKey === 5 ? true : false}
                        style={{ marginTop: "10px" }}
                      >
                        {
                        isLoading ? "Please wait" : <ViewDetailsTable isGL={true} data={historyData}/>
                       }
                      </CTabPane>
                    </CTabContent>
                  </CTabs>
                {/* <ViewDetailsTable isGL={isGL} data={data}/> */}
            </CModalBody>
            <CModalFooter>
                
                <CButton color="secondary" onClick={() => setShowDetails(false)}>
                    <CSLab name="Close" code={'HCM-9E3ZC2E1S0N-LASN'} />
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ViewPositionDetails