import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { FileUploader } from "react-drag-drop-files";
import { CCol, CRow, CFormGroup, CInputGroup, CInput, CInputGroupAppend, CTabs, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CLabel } from '@coreui/react';
import { AiOutlinePlus, AiOutlineEye, AiOutlineClose } from 'react-icons/ai';
import CIcon from '@coreui/icons-react';

import usersData from '../../../reusable/utils/UsersData';
import { TableComponent, CSLab } from '../../../reusable/components';
import { GetLabelByName, config } from 'src/reusable/configs/config';

const { defaultUserImage } = config

const tableOptions = [
    { valueKey: 'id', valueName: 'ID', isVisible: false },
    { valueKey: 'name', valueName: 'Name', isVisible: true },
    { valueKey: 'role', valueName: 'Role', isVisible: true },
    { valueKey: 'status', valueName: 'Status', isVisible: true }
];

export default function UserManager() {
    const lan = useSelector(state => state.language);

    const [grid, setGrid] = useState(null);
    const [visible, setVisible] = useState(false);
    const [, setEditData] = useState(null);
    const [mode, setMode] = useState(0); // 0 - CREATE, 1 - EDIT
    const [activeKey, setActiveKey] = useState(1);
    const [file, setFile] = useState(null);
    const [show, setShow] = useState(false);

    const TransLabelByCode = (name) => GetLabelByName(name, lan);

    const handleFileChange = (file) => {
        setFile(file);
    };


    const FileTypes = ["jpg", "png", "gif", "jpeg"];

    const OnAddButtonClick = () => {
        console.log(grid);
        setMode(0);
        setVisible(!visible);
    }

    const onCommandClick = (args) => {
        const type = args?.commandColumn?.type;

        switch (type) {
            case 'Edit':
                console.log(args?.rowData);
                setVisible(true);
                setEditData(args?.rowData);
                setMode(1);
                break;
            default:
                break;
        }
    }

    return (
        <>
            <CRow>
                <CCol>
                    <h5>{<CSLab code='TL55' />}</h5>
                </CCol>
            </CRow>
            <CRow>
                <CCol md="4">
                    <CFormGroup>
                        <CInputGroup>
                            <CInput className='border-left-curve' type="text" id="username3" name="username3" autoComplete="name" placeholder={TransLabelByCode('TL56')} />
                            <CInputGroupAppend>
                                <CButton className='border-right-curve' color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                            </CInputGroupAppend>
                        </CInputGroup>
                    </CFormGroup>
                </CCol>
                <CCol md="8" className='text-right'>
                    <CFormGroup>
                        <CButton type="button" onClick={OnAddButtonClick} size="sm" color="primary"> <AiOutlinePlus /> <CSLab code={'Add'} /></CButton>
                    </CFormGroup>
                </CCol>
                <CCol md='12'>
                    <TableComponent dataSource={usersData} OnCommandClick={onCommandClick} setGrid={setGrid} fields={tableOptions} />
                </CCol>
            </CRow>

            <CModal show={visible} size={'lg'} onClose={() => setVisible(false)} closeOnBackdrop={false}>
                <CModalHeader>
                    <CModalTitle>{mode ? <CSLab code='TL23' /> : <CSLab code='TL22' />}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CTabs>
                        <CNav variant="tabs">
                            <CNavItem>
                                <CNavLink href="#" active={activeKey === 1}
                                    onClick={() => { setActiveKey(1); }}><CSLab code="TL20" /></CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink href="#" active={activeKey === 2}
                                    onClick={() => { setActiveKey(2); }}><CSLab code="TL58" /></CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink href="#" active={activeKey === 3}
                                    onClick={() => { setActiveKey(3); }}><CSLab code="TL21" /></CNavLink>
                            </CNavItem>
                        </CNav>
                        <CTabContent>
                            <CTabPane style={{ marginTop: '10px' }} visible={activeKey === 1 ? 'true' : 'false'}>
                                <CRow className={'bottom-spacing'}>
                                    <>
                                        <CCol md="4">
                                            <CLabel htmlFor="username"><CSLab code='TL16' /></CLabel>
                                            <CInput className="" id="username" />
                                        </CCol>
                                        <CCol md="4">
                                            <CLabel htmlFor="firstname"><CSLab code='TL15' /></CLabel>
                                            <CInput className="" id="firstname" />
                                        </CCol>
                                        <CCol md="4">
                                            <CLabel htmlFor="name"><CSLab code='TL17' /></CLabel>
                                            <CInput className="" id="lastname" />
                                        </CCol>
                                    </>
                                </CRow>
                                <CRow className={'bottom-spacing'}>
                                    <>
                                        <CCol md="8">
                                            <CLabel htmlFor="email"><CSLab code='TL18' /></CLabel>
                                            <CInput className="" id="email" />
                                        </CCol>
                                        <CCol md="4">
                                            <CLabel htmlFor="phone"><CSLab code='TL19' /></CLabel>
                                            <CInput className="" id="phone" />
                                        </CCol>
                                    </>
                                </CRow>
                            </CTabPane>
                            <CTabPane style={{ marginTop: '10px' }} visible={activeKey === 2 ? 'true' : 'false'}>
                                    <CRow>
                                        <CCol md="6">
                                            <div className='.image--cont' style={{height: ''}}>
                                                <FileUploader handleChange={handleFileChange}  types={FileTypes} maxSize={1} file={file} />
                                                <span style={{ fontSize: '12px', color: '#666' }}>{file ? `Name: ${file.name}` : "No image uploaded yet"}</span>
                                                <span style={{ fontSize: '20px' }}>{file ? <> <AiOutlineEye onClick={() => setShow(true)} /> <AiOutlineClose color='red' onClick={() => setFile(null)} /> </> : null} </span>
                                            </div>
                                        </CCol>
                                        <CCol md="6">
                                                <CButton style={{marginRight: 10}} className='border-right-curve' color="primary"><CSLab code="TL59" /></CButton>
                                                <CButton className='border-right-curve' color="danger"><CSLab code="TL60" /></CButton>
                                        </CCol>
                                    </CRow>
                            </CTabPane>
                            <CTabPane style={{ marginTop: '10px' }} visible={activeKey === 3 ? 'true' : 'false'}>
                                <CRow className={'bottom-spacing'}>
                                    <>
                                        <CCol md="8">
                                            <h5><CSLab code={'Group Tab'} /></h5>
                                        </CCol>
                                        <CCol md="4">

                                        </CCol>
                                    </>
                                </CRow>
                            </CTabPane>

                        </CTabContent>

                    </CTabs>

                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}><CSLab code="TL50" /></CButton>
                    <CButton color="primary"><CSLab code="TL11" /></CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}