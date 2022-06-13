import React from 'react';
import { useSelector } from 'react-redux';

import CIcon from '@coreui/icons-react';
import { CInputGroupAppend, CInputGroup, CInput, CCard, CCardBody, CFormGroup, CCol, CRow, CButton, CLabel, CCardFooter } from '@coreui/react';
import { AiOutlinePlus, AiFillSave, AiOutlineRedo } from 'react-icons/ai';
import { CardBodyHeight } from 'src/reusable/utils/helper';
import {
    ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort, Edit,
    //CommandColumn 
} from '@syncfusion/ej2-react-grids';

import { GetLabelByName } from 'src/reusable/configs/config';
import { CSCheckbox, CSDivider, CSLab, CSLineLabel } from 'src/reusable/components';

const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: false, allowEditOnDblClick: true };

const TaxTable = () => {
    const lan = useSelector(state => state.language);

    const [show, setShow] = React.useState(true);

    const TransLabelByCode = (name) => GetLabelByName(name, lan);

    return (
        <>
            <CRow>
                <CCol xs="12"><h5><CSLab code="Tax Table" /></h5></CCol>
            </CRow>
            <CRow >
                <CCol md="4">
                    <CFormGroup>
                        <CInputGroup>
                            <CInput className='border-left-curve' type="text" id="search" name="search" autoComplete="off" placeholder={TransLabelByCode('Search for tax table by name')} />
                            <CInputGroupAppend>
                                <CButton className='border-right-curve' onClick={() => setShow(!show)} color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
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
                            <CRow>
                                <CCol md='6'>
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
                                        <CCol md="4">
                                            <CLabel><CSLab code={'Tax Free Amount'} /></CLabel>
                                            <CInput className="" id="accountnumber" />
                                        </CCol>

                                        <CCol md="4">
                                            <CLabel><CSLab code={'Start Date'} /></CLabel>
                                            <CInput type="date" />
                                        </CCol>
                                        <CCol md="4">
                                            <CLabel><CSLab code={'End Date'} /></CLabel>
                                            <CInput type="date" />
                                        </CCol>

                                         <CCol md="4" xs="6">
                                            <CSCheckbox label={'Default Tax Table'}  name='FixedAmount'  />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol md="12">
                                            <CSLineLabel name="Based On" />
                                        </CCol>
                                        <CCol md="4" xs="6">
                                            <CSCheckbox label={'Fixed Amount'}  name='FixedAmount'  />
                                        </CCol>
                                        <CCol md="4" xs="6">
                                            <CSCheckbox label={'Percentage(%)'}  name='Percentage'  />
                                        </CCol>
                                        <CCol md="4" xs="6">
                                            <CSCheckbox label={'Flat Amount'}  name='flatAmount'  />
                                        </CCol>
                                        <CCol md="5" xs="6">
                                            <CSCheckbox label={'Percentage Based On'}  name='PercentageBasedOn'  />
                                        </CCol>
                                       
                                    </CRow>
                                </CCol>

                                <CSDivider md="1" />

                                <CCol md='5'>
                                    <CRow className={'bottom-spacing'}>
                                        <CCol md="12">
                                            <h6 className="ch-l-s"><CSLab code="Tax Band" /></h6>
                                        </CCol>
                                        <CCol md="12">
                                            <GridComponent dataSource={{}} allowPaging={true} pageSettings={{ pageSize: 6 }} editSettings={editOptions}>
                                                <ColumnsDirective>
                                                    <ColumnDirective field={"id"} headerText={"ID"} width='100' visible={false} />
                                                    <ColumnDirective field={'taxBand'} headerText="Tax Band" width='100' />
                                                    <ColumnDirective field={'taxableAmount'} headerText="Taxable Amount" width='100' />
                                                    <ColumnDirective field={'Percentage'} headerText="Percentage" width='100' />
                                                    {/* <ColumnDirective commands={commandOptions} headerText={"Action"} width='100' textAlign="Center" /> */}
                                                </ColumnsDirective>
                                                <Inject services={[Page, Sort, Filter, Group, Edit]} />
                                            </GridComponent>
                                        </CCol>
                                    </CRow>
                                </CCol>

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

export default TaxTable;