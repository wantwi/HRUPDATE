import { CCol } from '@coreui/react';
import React from 'react';

const Divider = ({ md, style }) => {
    return (
        <CCol md={md} style={style}>
            <div className="vl"></div>
        </CCol>
    )
}

export default Divider;