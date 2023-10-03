import React from 'react'

import {
 CButton, 
 CModal, 
 CModalHeader, 
 CModalTitle, 
 CModalBody, 
 CModalFooter
} from '@coreui/react';
import { CSLab } from 'src/reusable/components';
import ViewDetailsTable from './table/ViewDetailsTable';

const ViewDetails = ({isGL, searchResult={}, showDetails, data,setShowDetails}) => {

    // console.log({data})
   
    return (
        <CModal closeOnBackdrop={false} show={showDetails} onClose={() =>setShowDetails(false)} size="xl">
            <CModalHeader closeButton>
                
                <CModalTitle><CSLab name="History" code={'HCM-OP6HH1ER0WN_LANG'} /> : {searchResult?.code ||""} - {searchResult?.name ||""}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <ViewDetailsTable isGL={isGL} data={data}/>
            </CModalBody>
            <CModalFooter>
                
                <CButton color="secondary" onClick={() => setShowDetails(false)}>
                    <CSLab name="Close" code={'HCM-9E3ZC2E1S0N-LASN'} />
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ViewDetails