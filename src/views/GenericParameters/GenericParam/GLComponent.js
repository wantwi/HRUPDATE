import React from 'react';
import { CCol, CRow, CLabel, CSelect } from '@coreui/react';

import { CSLab, CSLineLabel, CSDivider } from 'src/reusable/components';

const GLComponent = ({ orgGLAccounts, onGLChange, data }) => {

    return (
        <>
            <CRow>
                <CCol md='5'>
                    <CRow>
                        <CCol md="12">
                            <CSLineLabel name="HCM-KKY1B2A9GJC_LOLN" />
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol md="6">
                            <CLabel><CSLab code="Salary" /></CLabel><br />
                            <CSelect value={orgGLAccounts?.salaryGLId || '00000000-0000-0000-0000-000000000000'} name='salaryGLId' onChange={onGLChange}>
                                {
                                    [{ id: '00000000-0000-0000-0000-000000000000', name: 'Select Salary' }, ...data]
                                        .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                }
                            </CSelect>
                        </CCol>
                        <CCol md="6">
                            <CLabel><CSLab code="Income Tax" /></CLabel><br />
                            <CSelect value={orgGLAccounts?.incomeTaxGLId || '00000000-0000-0000-0000-000000000000'} name='incomeTaxGLId' onChange={onGLChange}>
                                {
                                    [{ id: '00000000-0000-0000-0000-000000000000', name: 'Select Income Tax' }, ...data]
                                        .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                }
                            </CSelect>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol md="6">
                            <CLabel><CSLab code="Net Salary Payable" /></CLabel><br />
                            <CSelect value={orgGLAccounts?.netSalaryPayableGLId || '00000000-0000-0000-0000-000000000000'} name='netSalaryPayableGLId' onChange={onGLChange}>
                                {
                                    [{ id: '00000000-0000-0000-0000-000000000000', name: 'Select Salary Payable' }, ...data]
                                        .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                }
                            </CSelect>
                        </CCol>
                        <CCol md="6">
                            <CLabel><CSLab code="Operating Overtime" /></CLabel><br />
                            <CSelect value={orgGLAccounts?.operatingOvertimeGLId || '00000000-0000-0000-0000-000000000000'} name='operatingOvertimeGLId' onChange={onGLChange}>
                                {
                                    [{ id: '00000000-0000-0000-0000-000000000000', name: 'Select Overtime' }, ...data]
                                        .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                }
                            </CSelect>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol md="6">
                            <CLabel><CSLab code="Shift Allowance" /></CLabel><br />
                            <CSelect value={orgGLAccounts?.shiftAllowanceGLId || '00000000-0000-0000-0000-000000000000'} name='shiftAllowanceGLId' onChange={onGLChange}>
                                {
                                    [{ id: '00000000-0000-0000-0000-000000000000', name: 'Select Shift Allowance' }, ...data]
                                        .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                }
                            </CSelect>
                        </CCol>
                        <CCol md="6">
                            <CLabel><CSLab code="HCM-A5BKMEIDEA6_LASN" /></CLabel><br />
                            <CSelect value={orgGLAccounts?.taxReliefGLId || '00000000-0000-0000-0000-000000000000'} name='taxReliefGLId' onChange={onGLChange}>
                                {
                                    [{ id: '00000000-0000-0000-0000-000000000000', name: 'Select Tax Relief' }, ...data]
                                        .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                }
                            </CSelect>
                        </CCol>
                    </CRow>
                </CCol>

                <CSDivider md="1" style={{ height: '100%' }} />

                <CCol md='6'>
                    <CRow>
                        <CCol md="6">{/*  Saving Schemes */}
                            <CSLineLabel name="HCM-9LW6QXJLQK-LASN" />
                        </CCol>
                        <CCol md="6">
                            <CSLineLabel name="HCM-TPF2QMSQ1YG-LASN" />
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol md="6">
                            <CRow>
                                <CCol md="12">
                                    <CLabel><CSLab code="HCM-VIEZQFX1BJA-LASN" /></CLabel><br />
                                    <CSelect value={orgGLAccounts?.mandatorySavingSchemeEmployeeContributionGLId || '00000000-0000-0000-0000-000000000000'} name='mandatorySavingSchemeEmployeeContributionGLId' onChange={onGLChange}>
                                        {
                                            [{ id: '00000000-0000-0000-0000-000000000000', name: 'Select Employee Contr. GL' }, ...data]
                                                .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                        }
                                    </CSelect>
                                </CCol>
                                <CCol md="12">
                                    <CLabel><CSLab code="HCM-4JZ72YP83IP-LANG" /></CLabel><br />
                                    <CSelect value={orgGLAccounts?.mandatorySavingSchemeEmployerContributionGLId || '00000000-0000-0000-0000-000000000000'} name='mandatorySavingSchemeEmployerContributionGLId' onChange={onGLChange}>
                                        {
                                            [{ id: '00000000-0000-0000-0000-000000000000', name: 'Select Employer Contr. GL' }, ...data]
                                                .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                        }
                                    </CSelect>
                                </CCol>
                                <CCol md="12">
                                    <CLabel><CSLab code="HCM-BHPWFP7WEX6-PSLL"/></CLabel><br />
                                    <CSelect value={orgGLAccounts?.mandatorySavingSchemeEmployerTotalPayableGLId || '00000000-0000-0000-0000-000000000000'} name='mandatorySavingSchemeEmployerTotalPayableGLId' onChange={onGLChange}>
                                        {
                                            [{ id: '00000000-0000-0000-0000-000000000000', name: 'Select Total Payable' }, ...data]
                                                .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                        }
                                    </CSelect>
                                </CCol>
                            </CRow>
                        </CCol>

                        <CCol md='6'>
                            <CRow>
                                <CCol md="12">
                                    <CLabel><CSLab code= "HCM-VIEZQFX1BJA-LASN" /></CLabel><br />
                                    <CSelect value={orgGLAccounts?.volontarySavingSchemeEmployeeContributionGLId || '00000000-0000-0000-0000-000000000000'} name='volontarySavingSchemeEmployeeContributionGLId' onChange={onGLChange}>
                                        {
                                            [{ id: '00000000-0000-0000-0000-000000000000', name: 'Select Employee Contri. GL' }, ...data]
                                                .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                        }
                                    </CSelect>
                                </CCol>
                                <CCol md="12">
                                    <CLabel><CSLab code="HCM-4JZ72YP83IP-LANG" /></CLabel><br />
                                    <CSelect value={orgGLAccounts?.volontarySavingSchemeEmployerContributionGLId || '00000000-0000-0000-0000-000000000000'} name='volontarySavingSchemeEmployerContributionGLId' onChange={onGLChange}>
                                        {
                                            [{ id: '00000000-0000-0000-0000-000000000000', name: 'Select Employer Contri. GL' }, ...data]
                                                .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                        }
                                    </CSelect>
                                </CCol>
                                <CCol md="12">
                                    <CLabel htmlFor="rate"><CSLab code="HCM-BHPWFP7WEX6-PSLL" /></CLabel><br />
                                    <CSelect value={orgGLAccounts?.volontarySavingSchemeEmployerTotalPayableGLId || '00000000-0000-0000-0000-000000000000'} name='volontarySavingSchemeEmployerTotalPayableGLId' onChange={onGLChange}>
                                        {
                                            [{ id: '00000000-0000-0000-0000-000000000000', name: 'Select Total Payable' }, ...data]
                                                .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                        }
                                    </CSelect>
                                </CCol>
                            </CRow>
                        </CCol>

                    </CRow>






                </CCol>
            </CRow>

        </>
    )
}

export default GLComponent;