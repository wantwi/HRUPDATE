import React, {  } from 'react';
import { CCard, CCardBody, CForm, CCol, CRow, CButton, CLabel, CCardFooter} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort } from '@syncfusion/ej2-react-grids';

import { CSLab } from 'src/reusable/components';
import '../../../scss/_custom_table.scss';

const CurrentUser = () => {

    return (
        <>
            <CRow>
                <CCol>
                    <h5><CSLab code='Current Users List' /> </h5>
                </CCol>
            </CRow>
            <CRow >
                <CCol xs="12">
                    <CCard>
                        <CCardBody>
                            <CForm action="" method="post">
                                <CRow className={'bottom-spacing'}>
                                    <CCol md="12">
                                        <>
                                            <GridComponent dataSource={{}} allowPaging={true} pageSettings={{ pageSize: 6 }}>
                                                <ColumnsDirective>
                                                    <ColumnDirective field={"id"} headerText={"ID"} width='100' visible={false} />
                                                    <ColumnDirective field={"payPeriod"} headerText={"Surname"} width='100' />
                                                    <ColumnDirective field={"exchangeRate"} headerText={"First Name"} width='100' />
                                                    <ColumnDirective field={"exchangeDate"} headerText={"Group"} width='100' />
                                                    <ColumnDirective field={"lastExchangeRate"} headerText={"Login Time"} width='100' />
                                                    <ColumnDirective field={"lastExchangeDate"} headerText={"Module"} width='100' />
                                                </ColumnsDirective>
                                                <Inject services={[Page, Sort, Filter, Group]} />
                                            </GridComponent>
                                        </>
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCardBody>
                        <CCardFooter>
                            <CLabel><h6><CSLab code={`Total # of Users: ${0}`} /></h6></CLabel>
                            <CButton style={{ marginRight: 5, float: 'right' }} type="button" size="sm" color="primary"><CIcon name="cil-scrubber" /> <CSLab code="Refresh" /> </CButton>
                            <CButton style={{ marginRight: 5, float: 'right' }} type="button" size="sm" color="warning"><CIcon name="cil-scrubber" /> <CSLab code="Logout" /> </CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>

        </>
    )
}

export default CurrentUser;