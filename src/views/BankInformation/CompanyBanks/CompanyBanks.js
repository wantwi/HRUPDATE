import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import CIcon from '@coreui/icons-react';
import { CInputGroupAppend, CInputGroup, CInput, CCard, CCardBody, CFormGroup, CCol, CRow, CButton, CLabel, CTextarea, CCardFooter} from '@coreui/react';
import { AiOutlinePlus, AiFillSave, AiOutlineRedo } from 'react-icons/ai';
import { CardBodyHeight} from 'src/reusable/utils/helper';
import { GetLabelByName } from 'src/reusable/configs/config';
import { CSLab } from 'src/reusable/components';
import { SingleSelectComponent } from '../../../reusable/components';
import { Currency } from '../../../reusable/utils/GenericData';

const CompanyBanks = () => {
    const lan = useSelector(state => state.language);

    const [show, setShow] = useState(true);

    const TransLabelByCode = (name) => GetLabelByName(name, lan);

    return (
        <>
            <CRow>
                <CCol xs="12"><h5>Company Banks</h5></CCol>
            </CRow>
            <CRow >
                <CCol md="4">
                    <CFormGroup>
                        <CInputGroup>
                            <CInput className='border-left-curve' type="text" id="search" name="search" autoComplete="off" placeholder={TransLabelByCode('TL24')} />
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
                                <CRow >
                                    <CCol md="3">
                                        <CLabel><CSLab code={'TL03'} /></CLabel>
                                        <CInput className="" name="code" />
                                    </CCol>
                                    <CCol md="9">
                                        <CLabel htmlFor="name"><CSLab code={'TL04'} /></CLabel>
                                        <CInput className="" name="name" />
                                    </CCol>
                                </CRow>
                                <CRow >
                                    <CCol md="4">
                                        <CLabel htmlFor="name"><CSLab code={'TL27'} /></CLabel>
                                        <CInput className="" name="accountnumber" />
                                    </CCol>
                                    <CCol md="4">
                                        <CLabel htmlFor="name"><CSLab code={'TL28'} /></CLabel>
                                        <CInput className="" name="bankrouting" />
                                    </CCol>
                                    <CCol md="4">
                                        <CLabel htmlFor="name"><CSLab code={'TL29'} /></CLabel>
                                        <SingleSelectComponent multiData={{ Currency }} />
                                    </CCol>                                    
                                </CRow>
                                <CRow>
                                    <CCol md="4">
                                        <CLabel htmlFor="name"><CSLab code={'TL30'} /></CLabel>
                                        <CInput className="" name="branch" />
                                    </CCol>
                                </CRow>
                                <CRow className={'bottom-spacing'}>
                                    <CCol md="12">
                                        <CLabel htmlFor="name"><CSLab code={'TL26'} /></CLabel>
                                        <CTextarea className="" name="accountdescription"></CTextarea>
                                    </CCol>
                                </CRow>
                                <CRow className={'bottom-spacing'}>
                                    <CCol md="12">
                                        <CLabel htmlFor="name"><CSLab code={'TL31'} /></CLabel>
                                        <CTextarea className="" name="note"></CTextarea>
                                    </CCol>
                                </CRow>                       
                            </CCol>
                            <CCol md="5"></CCol>
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

export default CompanyBanks
