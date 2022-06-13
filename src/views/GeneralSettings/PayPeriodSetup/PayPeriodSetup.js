import React from 'react';

import { CCol, CRow } from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';

const PayPeriodSetup = () => {
const data = useSelector(state => state.data)
const dispatch = useDispatch();


const handleOnChange = (evnt) => {
    dispatch({type: 'set', data:{...data, [evnt?.target?.name]: evnt?.target?.value}})

}

    return (
        <>
            <CRow>
                <CCol xs="12"><h5>{'Pay Period Setup'}</h5></CCol>
            </CRow>
        </>
    )
}

export default PayPeriodSetup;