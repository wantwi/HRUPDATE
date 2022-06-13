import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { CCol, CRow, CFormGroup, CInputGroup, CInput, CInputGroupAppend, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,CLabel  } from '@coreui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import CIcon from '@coreui/icons-react';

import { CSLab, TableComponent } from '../../../reusable/components';
import { UserGroup } from '../../../reusable/utils/UserGroups';
import { GetLabelByName } from 'src/reusable/configs/config';

export default function GroupManager() {
    const lan = useSelector(state => state.language);

    const [grid, setGrid] = useState(null);
    const [visible, setVisible] = useState(false);
    const [, setEditData] = useState(null);
    const [mode, setMode] = useState(0); // 0 - CREATE, 1 - EDIT

    const TransLabelByCode = (name) => GetLabelByName(name, lan);

    const paymentOptionTableOptions = [
        { valueKey: 'id', valueName: ('ID'), isVisible: false },
        { valueKey: 'name', valueName: ('Name'), isVisible: true },
        { valueKey: 'numberOfCompanies', valueName: ('Companies'), isVisible: true },
        { valueKey: 'strStatus', valueName: ('Status'), isVisible: true }
    ];

    // const paymentOptionTableOptions = [
    //     { valueKey: 'id', valueName: TransLabelByCode('TL54'), isVisible: false },
    //     { valueKey: 'name', valueName: TransLabelByCode('TL04'), isVisible: true },
    //     { valueKey: 'numberOfCompanies', valueName: TransLabelByCode('TL52'), isVisible: true },
    //     { valueKey: 'strStatus', valueName: TransLabelByCode('TL53'), isVisible: true }
    // ];


    const onAddButtonClick = () => {
        console.log(grid);
        setMode(0);
        setVisible(!visible);
    }

    const onCommandClick = (args) => {
        const type = args?.commandColumn?.type;

        switch (type) {
            case 'Edit':
                setVisible(true);
                setEditData(args?.rowData);
                setMode(1);
                break;
            default:
                break;
        }
    };

    // const OnTableReady = () => {
    //     console.log(grid);
    //     if (grid) {
    //         const column = grid.getColumnByField("ShipCity");
    //         column.headerText = "Changed Text";
    //         grid.refreshHeader();
    //     }
    // }

    return (
        <>
            <CRow>
                <CCol>
                    <h5><CSLab code="TL41" /></h5>
                </CCol>
            </CRow>
            <CRow>
                <CCol md="4">
                    <CFormGroup>
                        <CInputGroup>
                            <CInput className='border-left-curve' type="text" id="username3" name="username3" autoComplete="name" placeholder={TransLabelByCode('TL43')} />
                            <CInputGroupAppend>
                                <CButton className='border-right-curve' color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                            </CInputGroupAppend>
                        </CInputGroup>
                    </CFormGroup>
                </CCol>
                <CCol md="8" className='text-right'>
                    <CFormGroup>
                        {<CButton type="button" onClick={onAddButtonClick} size="sm" color="primary"> <AiOutlinePlus />  <CSLab code='Add'/> </CButton>}
                    </CFormGroup>
                </CCol>
                <CCol md='12'>
                    <TableComponent dataSource={UserGroup} OnCommandClick={onCommandClick} setGrid={setGrid} fields={paymentOptionTableOptions} />
                </CCol>
            </CRow>

            <CModal show={visible} size={'xl'} onClose={() => setVisible(false)} closeOnBackdrop={false}>
                <CModalHeader>
                    <CModalTitle>{mode ? <CSLab code='TL46' /> : <CSLab code='TL45' />}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <>
                            <CCol md="6">
                                <CLabel htmlFor="name"><CSLab code='TL44' /></CLabel>
                                <CInput className="" id="name" />
                            </CCol>
                        </>
                    </CRow>
                    <CRow>
                        <>
                           
                        </>
                    </CRow>

                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}> <CSLab code="TL50" /> </CButton>
                    <CButton color="primary"><CSLab code="TL11" /></CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}