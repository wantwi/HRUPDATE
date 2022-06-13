import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import CIcon from '@coreui/icons-react';
import { CInputGroupAppend, CInputGroup, CInput, CCard, CCardBody, CFormGroup, CCol, CRow, CButton, CLabel, CTextarea, CCardFooter } from '@coreui/react';
import { AiOutlinePlus, AiFillSave, AiOutlineRedo } from 'react-icons/ai';

import { CardBodyHeight} from 'src/reusable/utils/helper';
import { GetLabelByName } from 'src/reusable/configs/config';
import { CSLab } from 'src/reusable/components';
import { SingleSelectComponent } from '../../../reusable/components';
import { InterBankID } from '../../../reusable/utils/GenericData';

const Branch = () => {
    const lan = useSelector(state => state.language);

    const [show, setShow] = useState(true);

    const TransLabelByCode = (name) => GetLabelByName(name, lan);

    return (
        <>
            <CRow>
                <CCol xs="12"><h5>Branch</h5></CCol>
            </CRow>
            <CRow >
                <CCol md="4">
                    <CFormGroup>
                        <CInputGroup>
                            <CInput className='border-left-curve' type="text" id="search" name="search" autoComplete="off" placeholder={TransLabelByCode('TL39')} />
                            <CInputGroupAppend>
                                <CButton className='border-right-curve' color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                            </CInputGroupAppend>
                        </CInputGroup>
                    </CFormGroup>
                </CCol>
                <CCol md="8" className='text-right'>
                    <CFormGroup>
                        {show ? <CButton type="button" onClick={() => setShow(!show)} size="sm" color="primary"> <AiOutlinePlus />  <CSLab code={'Add'} /> </CButton> : null}
                    </CFormGroup>
                </CCol>

                <CCol xs="12" hidden={show}>
                    <CCard>
                        <CCardBody style={{height: CardBodyHeight, overflowY: 'auto'}}>
                            <CRow>
                                <CCol md="7">
                                    <CRow className={'bottom-spacing'}>
                                        <CCol md="4">
                                            <CLabel ><CSLab code={'TL03'} /></CLabel>
                                            <CInput className="" id="code" />
                                        </CCol>
                                        <CCol md="8">
                                            <CLabel htmlFor="name"><CSLab code={'TL04'} /></CLabel>
                                            <CInput className="" name="name" />
                                        </CCol>
                                        <CCol md="4">
                                            <CLabel ><CSLab code={'TL34'} /></CLabel>
                                            <SingleSelectComponent multiData={{ InterBankID }} />
                                        </CCol>
                                    </CRow>
                                    <CRow className={'bottom-spacing'}>
                                        <CCol md="12">
                                            <CLabel ><CSLab code={'TL31'} /></CLabel>
                                            <CTextarea className="" style={{ height: '80px' }} name="note" ></CTextarea>
                                        </CCol>
                                    </CRow>
                                </CCol>
                                <CCol md="5" ></CCol>
                            </CRow>
                               
                                
                        </CCardBody>
                        <CCardFooter>
                            <CButton style={{ marginRight: 5 }} type="button" size="sm" color="success"><CIcon name="cil-scrubber" /> <CSLab code="View History" /> </CButton>
                            <CButton style={{ marginRight: 5, float: 'right' }} type="button" size="sm" color="success"><AiFillSave size={20} /> <CSLab code="TL11" /> </CButton>
                            <CButton style={{ marginRight: 5, float: 'right' }} type="button" size="sm" color="danger"><AiOutlineRedo size={20} /> <CSLab code="TL12" /> </CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>

            </CRow>
        </>
    )
}

export default Branch
