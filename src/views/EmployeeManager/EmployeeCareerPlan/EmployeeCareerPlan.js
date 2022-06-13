import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import CIcon from '@coreui/icons-react';
import { CInputGroupAppend, CInputGroup, CInput, CCard, CCardBody, CFormGroup, CForm, CCol, CRow, CTabs, CButton, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CCardFooter } from '@coreui/react';

import {
    ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort, Edit,
    CommandColumn, Toolbar
} from '@syncfusion/ej2-react-grids';

import { AiFillSave, AiOutlineRedo } from 'react-icons/ai';
import { CardBodyHeight } from 'src/reusable/utils/helper';
import { GetLabelByName } from 'src/reusable/configs/config';
import { CSLab} from '../../../reusable/components';
import "../../../scss/_custom_table.scss";


const commandOptions = [
    { type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
    { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } }
];
const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
const toolbarOptions = ['Add', 'Cancel'];



const EmployeeCareerPlan = (props) => {
    const lan = useSelector(state => state.language);

    const [show, setShow] = useState(true);
    const [activeKey, setActiveKey] = useState(1);

    const TransLabelByCode = (name) => GetLabelByName(name, lan);

    return (
        <>
            <CRow>
                <CCol xs="12"><h5><CSLab code="Employee Career Plan" /></h5></CCol>
            </CRow>
            <CRow>
                <CCol md="4">
                    <CFormGroup>
                        <CInputGroup>
                            <CInput className='border-left-curve' type="text" id="username3" name="username3" autoComplete="name" placeholder={TransLabelByCode('Search for Employee Career Plan by name')} />
                            <CInputGroupAppend>
                                <CButton onClick={() => setShow(!show)} className='border-right-curve' color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                            </CInputGroupAppend>
                        </CInputGroup>
                    </CFormGroup>
                </CCol>
                <CCol xs="12" hidden={show}>
                    <CCard>
                        <CCardBody style={{ height: CardBodyHeight, overflowY: 'auto' }}>
                            <CForm action="" method="post">
                                <CTabs>
                                    <CNav variant="tabs">
                                        <CNavItem>
                                            <CNavLink href="#" active={activeKey === 1}
                                                onClick={() => setActiveKey(1)}><CSLab code="Training Plan" /></CNavLink>
                                        </CNavItem>
                                        <CNavItem>
                                            <CNavLink href="#" active={activeKey === 2}
                                                onClick={() =>  setActiveKey(2) }><CSLab code="Position Plan" /></CNavLink>
                                        </CNavItem>
                                        <CNavItem>
                                            <CNavLink href="#" active={activeKey === 3}
                                                onClick={() => { setActiveKey(3) }}><CSLab code="Personal Development" /></CNavLink>
                                        </CNavItem>
                                        <CNavItem>
                                            <CNavLink href="#" active={activeKey === 4}
                                                onClick={() =>  setActiveKey(4)}><CSLab code="Succession Plan" /></CNavLink>
                                        </CNavItem>
                                    </CNav>

                                    <CTabContent>
                                       
                                        <CTabPane visible={activeKey === 1 ? 'true' : 'false'} style={{ marginTop: '10px' }}>
                                            <CRow>
                                                <CCol md="12">
                                                    <GridComponent dataSource={{}} allowPaging={true} pageSettings={{ pageSize: 6 }} editSettings={editOptions} toolbar={toolbarOptions} height={200}>
                                                        <ColumnsDirective>
                                                            <ColumnDirective field={"id"} headerText={"ID"} width='100' visible={false} />
                                                            <ColumnDirective field={'programCode'} headerText="Program Code" width='100' />
                                                            <ColumnDirective field={'programName'} editType='dropdownedit' headerText="Program Name" width='100' />
                                                            <ColumnDirective field={'planDate'} headerText="Plan Date" width='100' />
                                                            <ColumnDirective field={'completionDate'} headerText="Completion Date" width='100' />
                                                            <ColumnDirective commands={commandOptions} headerText={"Action"} width='100' textAlign="Center" />
                                                        </ColumnsDirective>
                                                        <Inject services={[Page, Sort, Filter, Group, Edit, Toolbar, CommandColumn]} />
                                                    </GridComponent>
                                                </CCol>
                                            </CRow>
                                        </CTabPane>
                                        <CTabPane visible={activeKey === 2 ? 'true' : 'false'} style={{ marginTop: '10px' }}>
                                            <CRow>
                                                <CCol md="12">
                                                    <GridComponent dataSource={{}} allowPaging={true} pageSettings={{ pageSize: 6 }} editSettings={editOptions} toolbar={toolbarOptions} height={200}>
                                                        <ColumnsDirective>
                                                            <ColumnDirective field={"id"} headerText={"ID"} width='100' visible={false} />
                                                            <ColumnDirective field={'date'} headerText="Date" width='100' />
                                                            <ColumnDirective field={'jobClassification'} headerText="Job Classification" width='100' />
                                                            <ColumnDirective field={'jobDescription'} headerText="Job Description" width='100' />
                                                            <ColumnDirective commands={commandOptions} headerText={"Action"} width='100' textAlign="Center" />
                                                        </ColumnsDirective>
                                                        <Inject services={[Page, Sort, Filter, Group, Edit, Toolbar, CommandColumn]} />
                                                    </GridComponent>
                                                </CCol>
                                            </CRow>
                                        </CTabPane>
                                        <CTabPane visible={activeKey === 3 ? 'true' : 'false'} style={{ marginTop: '10px' }}>
                                            <CRow>
                                                <CCol md="12"> <h6 htmlFor="name" className="ch-l-s"><CSLab code="Banks" /></h6> </CCol>
                                                <CCol md="12">
                                                    <GridComponent dataSource={{}} allowPaging={true} pageSettings={{ pageSize: 6 }} editSettings={editOptions} toolbar={toolbarOptions} height={200}>
                                                        <ColumnsDirective>
                                                            <ColumnDirective field={"id"} headerText={"ID"} width='100' visible={false} />
                                                            <ColumnDirective field={'date'} headerText="Date" width='100' />
                                                            <ColumnDirective field={'priority'} headerText="Priority" width='100' />
                                                            <ColumnDirective commands={commandOptions} headerText={"Action"} width='100' textAlign="Center" />
                                                        </ColumnsDirective>
                                                        <Inject services={[Page, Sort, Filter, Group, Edit, Toolbar, CommandColumn]} />
                                                    </GridComponent>
                                                </CCol>
                                            </CRow>
                                        </CTabPane>
                                        <CTabPane visible={activeKey === 4 ? 'true' : 'false'} style={{ marginTop: '10px' }}>
                                            <CRow>
                                                {/* <CCol md="12"> <h6 htmlFor="name" className="ch-l-s"><CSLab code="Banks" /></h6> </CCol> */}
                                                <CCol md="12">
                                                    <GridComponent dataSource={{}} allowPaging={true} pageSettings={{ pageSize: 6 }} editSettings={editOptions} toolbar={toolbarOptions} height={200}>
                                                        <ColumnsDirective>
                                                            <ColumnDirective field={"id"} headerText={"ID"} width='100' visible={false} />
                                                            <ColumnDirective field={'date'} headerText="Date" width='100' />
                                                            <ColumnDirective field={'jobDescription'} headerText="Job Description" width='100' />
                                                            <ColumnDirective field={'successor'} headerText="Successor" width='100' />
                                                            <ColumnDirective commands={commandOptions} headerText={"Action"} width='100' textAlign="Center" />
                                                        </ColumnsDirective>
                                                        <Inject services={[Page, Sort, Filter, Group, Edit, Toolbar, CommandColumn]} />
                                                    </GridComponent>
                                                </CCol>
                                            </CRow>
                                        </CTabPane>
                                    </CTabContent>
                                </CTabs>
                            </CForm>
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

export default EmployeeCareerPlan