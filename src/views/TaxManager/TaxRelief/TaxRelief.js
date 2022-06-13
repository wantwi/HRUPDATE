import React from 'react';
import { useSelector } from 'react-redux';

import CIcon from '@coreui/icons-react';
import { CInputGroupAppend, CInputGroup, CInput, CCard, CCardBody, CFormGroup, CCol, CRow, CButton, CLabel, CCardFooter, CSelect, CTextarea } from '@coreui/react';
import { AiOutlinePlus, AiFillSave, AiOutlineRedo } from 'react-icons/ai';
import { CardBodyHeight } from 'src/reusable/utils/helper';
import { GetLabelByName } from 'src/reusable/configs/config';
import { CSCheckbox, CSLab, CSLineLabel } from 'src/reusable/components';


const TaxRelief = () => {
    const lan = useSelector(state => state.language);

    const [show, setShow] = React.useState(true);

    const TransLabelByCode = (name) => GetLabelByName(name, lan);

    return (
        <>
            <CRow>
                <CCol xs="12"><h5><CSLab code="Tax Relief" /></h5></CCol>
            </CRow>
            <CRow >
                <CCol md="4">
                    <CFormGroup>
                        <CInputGroup>
                            <CInput className='border-left-curve' type="text" id="search" name="search" autoComplete="off" placeholder={TransLabelByCode('Search for tax relief by name')} />
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
                        <CCardBody style={{ height: CardBodyHeight, overflowY: 'auto' }}>
                            <CRow> <CCol md="7">
                                    <CRow>
                                        <CCol md="4">
                                            <CLabel><CSLab code={'TL03'} /></CLabel>
                                            <CInput className="" id="code" />
                                        </CCol>
                                        <CCol md="8">
                                            <CLabel><CSLab code={'TL04'} /></CLabel>
                                            <CInput className="" id="name" />
                                        </CCol>
                                    </CRow>

                                    <CRow>
                                        <CCol md="6">
                                            <CLabel><CSLab code={'Currency'} /></CLabel>
                                            <CSelect>
                                                {
                                                    ['Select Currency', ' Cur 1', 'Cur 2'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                                }
                                            </CSelect>
                                        </CCol>
                                        <CCol md="6">
                                            <CLabel><CSLab code={'Tax Table'} /></CLabel>
                                            <CSelect>
                                                {
                                                    ['Select Tax Table', ' Table 1', 'Table 2'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                                }
                                            </CSelect>
                                        </CCol>
                                    </CRow>

                                    <CRow>
                                        <CCol md="12">
                                            <CSLineLabel name='Calculation Rule' />
                                        </CCol>                                      
                                        <CCol md="4" xs="6">
                                            {/* <CLabel style={{ color: '#FFF' }}><CSLab code="." /></CLabel><br /> */}
                                            <CSCheckbox label={'Flat Amount'}  name='flatAmount'  />
                                        </CCol>

                                        <CCol md="4" xs="6">
                                            {/* <CLabel style={{ color: '#FFF' }}><CSLab code="." /></CLabel><br /> */}
                                            <CSCheckbox label={'Varying Amount'}  name='varyingAmount'  />
                                        </CCol>
                                        <CCol md="4" xs="6">
                                            {/* <CLabel style={{ color: '#FFF' }}><CSLab code="." /></CLabel><br /> */}
                                            <CSCheckbox label={'% Of Basic'}  name='percentageOfBasic'  />
                                        </CCol>
                                        <CCol md="4" xs="6">
                                            {/* <CLabel style={{ color: '#FFF' }}><CSLab code="." /></CLabel><br /> */}
                                            <CSCheckbox label={'% Of Gross'}  name='percentageOfGross'  />
                                        </CCol>
                                        <CCol md="4">
                                            <CLabel><CSLab code={'Amount/Units'} /></CLabel><br />
                                            <CInput type="number" style={{textAlign: 'right'}} />
                                        </CCol>
                                    </CRow>
                                    <CRow>  
                                        <CCol md="12">
                                            <CLabel><CSLab code={'Notes'} /></CLabel><br />
                                            <CTextarea style={{ height: '80px' }}></CTextarea>
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

export default TaxRelief;