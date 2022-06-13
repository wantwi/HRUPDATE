import React from 'react';
import { CInput, CCol, CRow, CLabel, CTextarea, CSelect } from '@coreui/react';

import { BoolStatus } from 'src/reusable/utils/helper';
import { CSRequiredIndicator, CSLab } from 'src/reusable/components';

const DetailsComponent = ({onDetailsChange, details, pagename, parentData, link}) => {


    return (
        <CCol md="5">
            <CRow>
                <CCol md="4">
                    <CLabel><CSLab code="Code" /> </CLabel> <CSRequiredIndicator />
                    <CInput value={details?.code || ''} name='code' onChange={onDetailsChange} />
                </CCol>
                <CCol md="8">
                    <CLabel><CSLab code="Name" /></CLabel> <CSRequiredIndicator />
                    <CInput value={details?.name || ''} name="name" onChange={onDetailsChange} />
                </CCol>
            </CRow>
            <CRow>
                <CCol md="4">
                    <CLabel><CSLab code="Status" /></CLabel> <CSRequiredIndicator />
                    <CSelect value={details?.status || -1} name='status' onChange={onDetailsChange}>
                        {
                            BoolStatus
                                .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                        }
                    </CSelect>
                </CCol>
                {
                    pagename && (pagename === 'employeetype' || pagename === 'location') ?
                        null :
                        <CCol md="8">
                            <CLabel><CSLab code={link.code} /></CLabel>
                            <CSelect value={details?.[pagename === 'position' ? 'salaryGradeId' : 'parentId'] || '00000000-0000-0000-0000-000000000000'}
                                name={pagename === 'position' ? 'salaryGradeId' : 'parentId'} onChange={onDetailsChange}>
                                {
                                    parentData
                                        .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                }
                            </CSelect>
                        </CCol>
                }
            </CRow>

            <CRow className={'top-spacing'}>
                <CCol md="12" style={{ marginTop: '5px' }}>
                    <CLabel><CSLab code="Description" /></CLabel>
                    <CTextarea value={details?.description || ''} name="description" style={{ height: '80px' }} onChange={onDetailsChange}></CTextarea>
                </CCol>
            </CRow>
        </CCol>

    )
}

export default DetailsComponent;