import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import CIcon from '@coreui/icons-react';
import { CInputGroupAppend, CInputGroup, CInput, CCard, CCardBody, CFormGroup, CForm, CCol, CRow, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CLabel, CSelect } from '@coreui/react';
import { AiOutlinePlus } from 'react-icons/ai';

import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort, Edit, CommandColumn } from '@syncfusion/ej2-react-grids';

import '../../../../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
import "../../../../node_modules/@syncfusion/ej2-react-grids/styles/material.css";

import { GetLabelByName } from 'src/reusable/configs/config';
import { CSLab } from '../../../reusable/components';
import { CardBodyHeight } from 'src/reusable/utils/helper';

const editOptions = { allowEditing: false, allowAdding: false, allowDeleting: false, allowEditOnDblClick: false };
const commandOptions = [
    { type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
    { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
    { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }
];

const EmployeeJobHistory = () => {
    const lan = useSelector(state => state.language);
    const [show, setShow] = useState(true);
    const [visible, setVisible] = useState(false);

    const TransLabelByCode = (name) => GetLabelByName(name, lan);
    return (
        <>
            <CRow>
                <CCol xs="12"><h5><CSLab code="Employee Job History" /></h5></CCol>
            </CRow>
            <CRow >
                <CCol md="4">
                    <CFormGroup>
                        <CInputGroup>
                            <CInput className='border-left-curve' type="text" id="username3" name="username3" autoComplete="name" placeholder={TransLabelByCode('TL48')} />
                            <CInputGroupAppend>
                                <CButton type="button" className='border-right-curve' color="primary" onClick={() => setShow(!show)}><CIcon name="cil-magnifying-glass" /></CButton>
                            </CInputGroupAppend>
                        </CInputGroup>
                    </CFormGroup>
                </CCol>
                <CCol md="8" className='text-right'>
                </CCol>
                <CCol xs="12" hidden={show}>
                    <CCard>
                        <CCardBody style={{height: CardBodyHeight, overflowY: 'auto'}}>
                            <CButton type="button" style={{ marginBottom: 5 }} onClick={() => { setVisible(true) }} size="sm" color="primary"> <AiOutlinePlus />  <CSLab code="Add Employee Job History" /></CButton>
                            <CForm action="" method="post">
                                <>
                                    <GridComponent dataSource={{}} allowPaging={true} pageSettings={{ pageSize: 6 }} editSettings={editOptions}>
                                        <ColumnsDirective>
                                            <ColumnDirective field={""} headerText={"ID"} width='100' visible={false} />
                                            <ColumnDirective field={""} headerText={"Start Date"} width='100' />
                                            <ColumnDirective field={""} headerText={"End Date"} width='100' />
                                            <ColumnDirective field={""} headerText={"Position"} width='100' />
                                            <ColumnDirective field={""} headerText={"Employee Type"} width='100' />
                                            <ColumnDirective field={""} headerText={"Supervisor"} width='100' />
                                            <ColumnDirective field={""} headerText={"Division"} width='100' />
                                            <ColumnDirective field={""} headerText={"Location"} width='100' />
                                            <ColumnDirective field={""} headerText={"Unit"} width='100' />
                                            <ColumnDirective field={""} headerText={"Department"} width='100' />
                                            <ColumnDirective field={""} headerText={"Currency"} width='100' />
                                            <ColumnDirective commands={commandOptions} headerText={GetLabelByName('TL51', lan)} width='100' textAlign="Center" />
                                        </ColumnsDirective>
                                        <Inject services={[Page, Sort, Filter, Group, Edit, CommandColumn]} />
                                    </GridComponent>
                                </>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CModal show={visible} size={'lg'} onClose={() => setVisible(false)} closeOnBackdrop={false}>
                <CModalHeader>
                    <CModalTitle> <CSLab code='Add Employee Job History' /> </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow className={'bottom-spacing'}>
                        <>
                            <CCol md="4">
                                <CLabel htmlFor="username"><CSLab code='Start Date' /></CLabel>
                                <CInput className="" id="startdate" type="date" />
                            </CCol>
                            <CCol md="4">
                                <CLabel htmlFor="firstname"><CSLab code='End Date' /></CLabel>
                                <CInput className="" id="enddate" type="date" />

                            </CCol>
                            <CCol md="4">
                                <CLabel htmlFor="name"><CSLab code='Position' /></CLabel>
                                <CSelect>
                                    {
                                        ['Select Position', 'Software Engineer', 'Customer Support', 'Project Manager'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                    }
                                </CSelect>
                            </CCol>
                        </>
                    </CRow>
                    <CRow className={'bottom-spacing'}>
                        <>
                            <CCol md="4">
                                <CLabel htmlFor="name"><CSLab code='Employee Type' /></CLabel>
                                <CSelect>
                                    {
                                        ['Select Employee Type', 'Software Engineer', 'Customer Support', 'Project Manager'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                    }
                                </CSelect>
                            </CCol>
                            <CCol md="8">
                                <CLabel htmlFor="Supervisor"><CSLab code='Supervisor' /></CLabel>
                                <CInput className="" id="Supervisor" type="text" />
                            </CCol>

                        </>
                    </CRow>
                    <CRow className={'bottom-spacing'}>
                        <>
                            <CCol md="4">
                                <CLabel htmlFor="division"><CSLab code='Division' /></CLabel>
                                <CSelect>
                                    {
                                        ['Select Division', 'Software Develeopment Dpt', 'Customer Support Dpt', 'Research and Development'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                    }
                                </CSelect>
                            </CCol>
                            <CCol md="4">
                                <CLabel htmlFor="name"><CSLab code='Location' /></CLabel>
                                <CSelect>
                                    {
                                        ['Select Location', 'Accra, Tema', 'Tamale', 'Kumasi'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                    }
                                </CSelect>
                            </CCol>
                            <CCol md="4">
                                <CLabel htmlFor="unit"><CSLab code='Unit' /></CLabel>
                                <CSelect>
                                    {
                                        ['Select Unit', 'Software Develeopment Dpt', 'Customer Support Dpt', 'Research and Development'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                    }
                                </CSelect>
                            </CCol>
                        </>
                    </CRow>
                    <CRow className={'bottom-spacing'}>
                        <>
                            <CCol md="4">
                                <CLabel htmlFor="department"><CSLab code='Department' /></CLabel>
                                <CSelect>
                                    {
                                        ['Select Department', 'Software Develeopment Dpt', 'Customer Support Dpt', 'Research and Development'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                    }
                                </CSelect>
                            </CCol>
                            <CCol md="4">
                                <CLabel htmlFor="currency"><CSLab code='Currency' /></CLabel>
                                <CSelect>
                                    {
                                        ['Select Currency', 'Ghanaian Cedis', 'US Dollars'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                    }
                                </CSelect>
                            </CCol>
                        </>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}><CSLab code="TL50" /></CButton>
                    <CButton color="primary"><CSLab code="TL11" /></CButton>
                </CModalFooter>
            </CModal>

        </>
    )
}

export default EmployeeJobHistory;