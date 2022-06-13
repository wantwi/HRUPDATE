import React from 'react';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';

import { CSLab } from 'src/reusable/components';

export default function Configuration() {

    return (
        <>
            <CRow><CCol xs="12"><h5><CSLab code='TL42' /></h5></CCol></CRow>

            <CRow >
                <CCol md="6"><h6><CSLab code='Active Segments' /></h6></CCol>
                <CCol md="6"><h6><CSLab code='Inactive Segments' /></h6></CCol>
                <CCol md="6">
                    <CCard>
                        <CCardBody>
                            <CSLab code="Segments" />
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol md="6">
                    <CCard>
                        <CCardBody>
                            <CSLab code="Segments" />
                        </CCardBody>

                    </CCard>
                </CCol>
            </CRow>

        </>
    )
}