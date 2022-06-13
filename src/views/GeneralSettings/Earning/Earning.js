import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CIcon from '@coreui/icons-react';
import { CInput, CCard, CCardBody, CForm, CFormGroup, CCol, CRow, CButton, CLabel, CCardFooter, CSelect, CTabs, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, } from '@coreui/react';
import { AiOutlinePlus, AiFillSave, AiOutlineRedo } from 'react-icons/ai';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CSAutoComplete, CSCheckbox, CSDivider, CSLab, CSLineLabel } from 'src/reusable/components';
//import { GetLabelByName } from 'src/reusable/configs/config';
import { BoolStatus, CardBodyHeight, TestCompanyId } from 'src/reusable/utils/helper';
import { glAccountData } from 'src/views/GenericParameters/data/DataModel';
import GLComponent from 'src/views/GenericParameters/GenericParam/GLComponent';
import Loader from 'src/Loader/Loader';


const toaster = (toastId, message, type, time) => {
    switch (type) {
        case 'warn':
            toast.warn(message, {
                position: "top-right",
                autoClose: time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                isLoading: false
            })
            break;
        case 'info':
            toast.info(message, {
                position: "top-right",
                autoClose: time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                isLoading: false
            })
            break;
        case 'error':
        case 'success':
            toast.update(toastId, {
                render: message, type, position: "top-right",
                autoClose: 5000,
                //delay: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                isLoading: false
            });
            break;
        default:
            break;
    }

}

const Earning = () => {
    // const lan = useSelector(state => state?.language);
    const data = useSelector(state => state.data);
    const dispatch = useDispatch();

    const [activeKey, setActiveKey] = useState(1);
    const [show, setShow] = useState(true);
    const [visible, setVisible] = useState(false);
    const [mode, setMode] = useState('');
    const [gLAccountData, setGLAccountData] = useState([]);
    const [orgGLAccounts, setOrgGLAccounts] = useState({});
    const [textLable, setTextLable] = useState("Amount");
    const [options, setOptions] = useState({});
    const [submitData, setSubmitData] = useState({});
    const [searchResults, setSearchResults] = useState(null);

    //const TransLabelByCode = (name) => GetLabelByName(name, lan);

    useEffect(function () {

    }, []);

    const handleSearchResultSelect = (results) => {
        if (results?.id) {
            setSearchResults(results);
            dispatch({ type: 'set', data: { ...results } });
            setSubmitData(results);
            setOptions(results?.options);
            setMode('Update');
            setShow(false);
        }
    }


    const handleReset = (type = 1) => {

        if ('Add' === mode && type === 1) {
            dispatch({ type: 'set', data: {} });
            setSubmitData({});
            setOptions({});
            //setSearchInput('');
        }

        if ('Update' === mode && searchResults?.id && type === 1) {
            setSubmitData(searchResults);
            setOptions(searchResults?.options);
            dispatch({ type: 'set', data: { ...searchResults } });
        }

        if (type === 2) {
            setMode('Add');
            dispatch({ type: 'set', data: {} });
            setSubmitData({});
            setOptions({});
            //setSearchInput('');
        }
    }

    const handleAddNewRecord = () => {
        setMode('Add');
        setShow(false);
        //setSearchInput('');
        handleReset(2);
    }


    const handleOnGLChange = (evnt) => {
        setOrgGLAccounts({ ...orgGLAccounts, [evnt?.target?.name]: evnt?.target?.value })
    };

    const handleLabelChange = (evnt) => {
        setTextLable(evnt?.target?.options[evnt?.target?.options.selectedIndex].text)
    }

    const handleOnSubmit = () => {
        let newData = { ...submitData, option: options, companyId: TestCompanyId };
        console.log(newData);

        //'Add' === mode ? AddGLAccount(newData) : updateGLAccount(newData);
    }



    const handleOnChange = (evnt) => {
        setSubmitData(data => { return { ...data, [evnt?.target?.name]: evnt?.target?.value } })
        dispatch({ type: 'set', data: { ...data, [evnt?.target?.name]: evnt?.target?.value } });
    }

    const handleCheckboxChange = (evnt) => {
        setOptions(data => { return { ...data, [evnt?.target?.name]: evnt?.target?.checked } })
        let option = { ...data?.options, [evnt?.target?.name]: evnt?.target?.checked }
        dispatch({ type: 'set', data: { ...data, option, options: option } });
    }

    // function AddEarning(postObject) {

    //     if ('Add' === mode) {
    //         const toastId = toast.loading("Creating Earning");
    //         //setDisabled(true);
    //         PostRequest(PostEarning(), { data: postObject })
    //             .then(response => {
    //                 response.text().then(response => {
    //                     if ("" === response) {
    //                         toaster(toastId, 'Addd a Earning successfully!', 'success', 4000);
    //                         handleReset(2);
    //                     } else {
    //                         try {
    //                             response = JSON.parse(response);
    //                             toaster(toastId, response?.reason ? response?.reason : "Failed to Add Earning", 'error', 4000);
    //                         } catch (error) {
    //                             console.log(error);
    //                         }
    //                     }

    //                 });

    //             })
    //             .catch(err => {
    //                 console.log({ err })
    //             })
    //             .finally(() => {
    //                 console.log('Done');
    //                 setDisabled(true);
    //             });
    //     }
    // }

    // function updateEarning(putObject) {
    //     if ('Update' === mode && searchResults?.id) {
    //         const toastId = toast.loading("Updating Earning");
    //         //setDisabled(true);
    //         if (putObject?.isActive)
    //             delete putObject?.isActive

    //         PutRequest(PutEarning(searchResults?.id), { data: putObject })
    //             .then(response => {
    //                 response.text().then(response => {
    //                     console.log(response);

    //                     if ("" === response) {
    //                         toaster(toastId, 'Updated a Earning successfully!', 'success', 4000);
    //                         handleReset(2);
    //                     } else {
    //                         try {
    //                             response = JSON.parse(response);
    //                             toaster(toastId, response?.reason ? response?.reason : "Failed to update Earning", 'error', 4000);
    //                         } catch (error) {
    //                             console.log(error);
    //                         }
    //                     }

    //                 });

    //             })
    //             .catch(err => {
    //                 console.log({ err })
    //             })
    //             .finally(() => {
    //                 console.log('Done');
    //                 setDisabled(true);
    //             });
    //     }
    // }


    return (
        <>
            <CRow>
                <CCol xs="12"><h5><CSLab code={mode + " Earning"} /></h5></CCol>
            </CRow>
            <CRow>
                <CCol md="4" xs='7'>
                    <CSAutoComplete
                        placeholder={'Search for Earning by name or code'}
                    />
                </CCol>
                <CCol md="8" xs='5' className='text-right'>
                    <CFormGroup>
                        {show ? <CButton type="button" onClick={handleAddNewRecord} size="sm" color="primary"> <AiOutlinePlus />  <CSLab code={'Add'} /> </CButton> : null}
                    </CFormGroup>
                </CCol>
                <CCol xs="12" hidden={show}>
                    <CCard>
                        <CCardBody style={{ height: CardBodyHeight, overflowY: 'auto' }}>
                                <CTabs>
                                    <CNav variant="tabs">
                                        <CNavItem>
                                            <CNavLink href="#" active={activeKey === 1}
                                                onClick={() => setActiveKey(1)}>  <CSLab code='Details' /></CNavLink>
                                        </CNavItem>
                                        <CNavItem>
                                            <CNavLink href="#" active={activeKey === 2}
                                                onClick={() => setActiveKey(2)}> <CSLab code='General Ledger' /></CNavLink>
                                        </CNavItem>
                                    </CNav>
                                    <CTabContent>
                                        <CTabPane style={{ marginTop: '10px' }} visible={activeKey === 1 ? 'true' : 'false'}>
                                            <CRow>
                                                {/* Details */}
                                                <CCol md="6">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel><CSLab code='Code' /></CLabel>
                                                            <CInput name="code" value={data?.code || ""} onChange={handleOnChange} />
                                                        </CCol>
                                                        <CCol md="8">
                                                            <CLabel><CSLab code={'Name'} /></CLabel>
                                                            <CInput name="name" value={data?.name || ""} onChange={handleOnChange} />
                                                        </CCol>
                                                    </CRow>

                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel><CSLab code={'Frequency'} /></CLabel>
                                                            <CSelect name="frequency" value={data?.frequency || -1} onChange={handleOnChange}>
                                                                {
                                                                    ['Select Frequency', 'Recurring', 'Non-Recurring'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>
                                                        <CCol md="4">
                                                            <CLabel> <CSLab code={'Maximum Amount'} /></CLabel>
                                                            <CInput name="maximumAmount" value={data?.maximumAmount || ""} onChange={handleOnChange} style={{ textAlign: "right" }} />
                                                        </CCol>
                                                        <CCol md="4">
                                                            <CLabel> <CSLab code={'Type'} /></CLabel>
                                                            <CSelect name="type" value={data?.type || -1} onChange={handleOnChange}>
                                                                {
                                                                    ['Select Type', 'Overtime', 'Bonus', 'Shift'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol md="4" >
                                                            <CLabel> <CSLab code={'Basis'} /></CLabel>
                                                            <CSelect name="basis" value={data?.basis || -1} onChange={(evnt) => { handleOnChange(evnt); handleLabelChange(evnt) }}>
                                                                {
                                                                    ['Select Basis', 'Varying Amount', 'Flat Amount', '% of Basic', '% of Daily Rate', '% of Hourly Rate'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>
                                                        <CCol md="4" >
                                                            <CLabel><CSLab code={textLable} /></CLabel>
                                                            <CInput type="number" name="flatAmount" value={data?.flatAmount || ''} style={{ textAlign: "right" }} onChange={handleOnChange} />
                                                        </CCol>
                                                        <CCol md="4">
                                                            <CLabel> <CSLab code={'Select Status'} /></CLabel>
                                                            <CSelect name="status" value={data?.status || ''} onChange={handleOnChange}>
                                                                {
                                                                    BoolStatus
                                                                        .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>
                                                    </CRow>
                                                </CCol>

                                                <CSDivider style={{ height: '100%' }} md='1' />
                                                {/* Applicables */}
                                                <CCol md="5" >
                                                    <CRow>
                                                        <CCol md='12'><CSLineLabel name="Other Info" /> </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CSCheckbox label='Basic' checked={data?.options?.basic || false} name='basic' onChange={handleCheckboxChange} />
                                                        </CCol>
                                                        <CCol md="4">
                                                            <CSCheckbox label='Pro Rated' checked={data?.options?.proRated || false} name='proRated' onChange={handleCheckboxChange} />
                                                        </CCol>
                                                        <CCol md="4">
                                                            <CSCheckbox label='Annually' checked={data?.options?.annually || false} name='annually' onChange={handleCheckboxChange} />
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CSCheckbox label='Taxable' checked={data?.options?.taxable || false} name='taxable' onChange={handleCheckboxChange} />
                                                        </CCol>
                                                        <CCol md="4">
                                                            <CSCheckbox label='Tax Element' checked={data?.options?.taxElement || false} name='taxElement' onChange={handleCheckboxChange} />
                                                        </CCol>
                                                        <CCol md="4">
                                                            <CSCheckbox label='Tax Shift' checked={data?.options?.taxShift || false} name='taxShift' onChange={handleCheckboxChange} />
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CSCheckbox label='Tax Earning' checked={data?.options?.taxEarning || false} name='taxEarning' onChange={handleCheckboxChange} />
                                                        </CCol>
                                                        <CCol md="4">
                                                            <CSCheckbox label='Out Of Pay' checked={data?.options?.outOfPay || false} name='outOfPay' onChange={handleCheckboxChange} />
                                                        </CCol>
                                                        <CCol md="4">
                                                            <CSCheckbox label='Serverance Pay' checked={data?.options?.serverancePay || false} name='serverancePay' onChange={handleCheckboxChange} />
                                                        </CCol>
                                                    </CRow>
                                                </CCol>
                                            </CRow>
                                        </CTabPane>
                                        <CTabPane visible={activeKey === 2 ? 'true' : 'false'} style={{ marginTop: '10px' }}>
                                            {
                                                glAccountData ?
                                                    <GLComponent orgGLAccounts={orgGLAccounts} onGLChange={handleOnGLChange} data={gLAccountData} />
                                                    :
                                                    <Loader />
                                            }
                                        </CTabPane>
                                    </CTabContent>
                                </CTabs>
                        </CCardBody>
                        <CCardFooter>
                            <CButton style={{ marginRight: 5 }} type="button" size="sm" color="success"><CIcon name="cil-scrubber" /> <CSLab code="View History" /> </CButton>
                            <CButton style={{ marginRight: 5, float: 'right' }} type="button" size="sm" color="success" onClick={handleOnSubmit}><AiFillSave size={20} />
                                {'Add' === mode ? <CSLab code="TL11" /> : <CSLab code="Update" />}
                            </CButton>
                            <CButton style={{ marginRight: 5, float: 'right' }} onClick={() => handleReset(1)} type="button" size="sm" color={'Add' === mode ? 'danger' : 'warning'}>
                                <AiOutlineRedo size={20} /> {'Add' === mode ? <CSLab code="TL12" /> : <CSLab code="Undo" />}
                            </CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>

            <CModal show={visible} size={'lg'} onClose={() => setVisible(false)} closeOnBackdrop={false}>
                <CModalHeader>
                    <CModalTitle> <CSLab code='Add GL Account' /> </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <>
                            <CCol md="6">
                                <CLabel><CSLab code='Code' /></CLabel>
                                <CInput className="" id="glCode" />
                            </CCol>
                            <CCol md="6">
                                <CLabel><CSLab code='Name' /></CLabel>
                                <CInput className="" id="glName" />
                            </CCol>
                        </>
                        <>
                            <CCol md="6">
                                <CLabel><CSLab code='GL Account' /></CLabel>
                                <CSelect id="GLAccount">
                                    {
                                        ['Select GL Account', 'GL 1', 'GL 2'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                    }
                                </CSelect>
                            </CCol>
                        </>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton style={{ marginRight: 5, float: 'right' }} type="button" size="sm" color="success"><AiFillSave size={20} /> <CSLab code="TL11" /> </CButton>
                    <CButton style={{ marginRight: 5, float: 'right' }} type="button" size="sm" color="danger"><AiOutlineRedo size={20} /> <CSLab code="TL12" /> </CButton>
                </CModalFooter>
            </CModal>

        </>
    )
}

export default Earning;