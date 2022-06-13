import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CIcon from '@coreui/icons-react';
import { CInput, CCard, CCardBody, CFormGroup, CCol, CRow, CButton, CLabel, CTextarea, CCardFooter } from '@coreui/react';
import { AiOutlinePlus, AiFillSave, AiOutlineRedo } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CardBodyHeight, PostRequest, PutRequest, TestCompanyId } from 'src/reusable/utils/helper';
//import { GetLabelByName } from 'src/reusable/configs/config';
import { CSAutoComplete, CSCheckbox, CSDivider, CSLab, CSLineLabel } from 'src/reusable/components';
import { PostGeneralLedger, PutGeneralLedger, SearchGeneralLedgersByNameOrCode } from 'src/reusable/API/GeneralLedgersEndpoints';
import { Prompt } from 'react-router-dom';


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

const GlAccount = (props) => {
    //console.log({props})
    // const lan = useSelector(state => state?.language);
    const data = useSelector(state => state.data);
    const dispatch = useDispatch();

    const [show, setShow] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [submitData, setSubmitData] = useState({});
    const [options, setOptions] = useState({});
    const [, setDisabled] = useState(false);
    const [mode, setMode] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [dupData, setDupData] = useState({})

    //const TransLabelByCode = (name) => GetLabelByName(name, lan);

    const handleAddNewRecord = () => {
        setMode('Add');
        setShow(false);
        //setSearchInput('');
       // handleReset(2);
    }

    const searchReset = () => {
        setShow(true);
        setSearchInput('');
        handleReset(2);
    }

    const handleReset = (type = 1) => {
        if ('Add' === mode && type === 1) {
            dispatch({ type: 'set', data: {} });
            setSubmitData({});
            setOptions({});
            setSearchInput('');
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
            setSearchInput('');
        }
    }

    const handleSearchResultSelect = (results) => {
        if (results?.id) {
            setSearchResults(results);
            setDupData({ ...results })
            dispatch({ type: 'set', data: { ...results } });
            setSubmitData(results);
            setOptions(results?.options);
            setMode('Update');
            setShow(false);
        }
    }

    const handleChange = (evnt) => {
        let isControledAC = evnt?.target?.name === 'isControledAC' ? evnt?.target?.checked : data?.isControledAC;
        setSubmitData(data => { return { ...data, [evnt?.target?.name]: evnt?.target?.value, isControledAC } })
        dispatch({ type: 'set', data: { ...data, [evnt?.target?.name]: evnt?.target?.value, isControledAC } });
    }

    const handleCheckboxChange = (evnt) => {
        setOptions(data => { return { ...data, [evnt?.target?.name]: evnt?.target?.checked } })
        let option = { ...data?.options, [evnt?.target?.name]: evnt?.target?.checked }
        dispatch({ type: 'set', data: { ...data, option, options: option } });
    }

    const handleOnSubmit = () => {
        if (!submitData?.code || submitData?.code === '') {
            toaster('', 'Enter code', 'info', 3000);
            return;
        }
        if (!submitData?.name || submitData?.name === '') {
            toaster('', 'Enter name', 'info', 3000);
            return;
        }

        let newData = { ...submitData, option: options, companyId: TestCompanyId };
        'Add' === mode ? AddGLAccount(newData) : updateGLAccount(newData);
    }


    function AddGLAccount(postObject) {

        if ('Add' === mode) {
            const toastId = toast.loading("Creating GL Account");
            //setDisabled(true);
            PostRequest(PostGeneralLedger(), { data: postObject })
                .then(response => {
                    response.text().then(response => {
                        if ("" === response) {
                            toaster(toastId, 'Addd a GL Account successfully!', 'success', 4000);
                            handleReset(2);
                        } else {
                            try {
                                response = JSON.parse(response);
                                toaster(toastId, response?.reason ? response?.reason : "Failed to Add GL Account", 'error', 4000);
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    });
                })
                .catch(err => {
                    console.log({ err })
                })
                .finally(() => {
                    console.log('Done');
                    setDisabled(true);
                });
        }
    }

    function updateGLAccount(putObject) {
        if ('Update' === mode && searchResults?.id) {
            const toastId = toast.loading("Updating GL Account");
            //setDisabled(true);
            if (putObject?.isActive)
                delete putObject?.isActive

            PutRequest(PutGeneralLedger(searchResults?.id), { data: putObject })
                .then(response => {
                    response.text().then(response => {
                        //console.log(response);

                        if ("" === response) {
                            toaster(toastId, 'Updated a GL Account successfully!', 'success', 4000);
                            handleReset(2);
                        } else {
                            try {
                                response = JSON.parse(response);
                                toaster(toastId, response?.reason ? response?.reason : "Failed to update GL Account", 'error', 4000);
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    });
                })
                .catch(err => {
                    console.log({ err })
                })
                .finally(() => {
                    console.log('Done');
                    setDisabled(true);
                }
            );
        }
    }   


    return (
        <>
            <Prompt
                when={data?.code !== dupData?.code || data?.internalCode !== dupData?.internalCode
                    || data?.isControledAC !== dupData?.isControledAC || data?.name !== dupData?.name 
                    || data?.description !== dupData?.description || data?.options !== dupData?.options }
                    message={
                        JSON.stringify(
                            `{
                            "confirmText": "Continue", 
                            "messageText": "It looks like you might have some unsaved  
                                        changes! Are you sure you want to continue?",
                            "cancelText": "Do not Continue"
                            }`   
                        )
                    }
            />
            <CRow>
                <CCol xs="12"><h5><CSLab code={mode + " GL Account"} /></h5></CCol>
            </CRow>
            <CRow >
                <CCol md="4" xs='7'>
                    <CSAutoComplete
                        filterUrl={SearchGeneralLedgersByNameOrCode(TestCompanyId, '')}
                        placeholder={'Search for GL Account by name or code'}
                        handleSelect={handleSearchResultSelect}
                        uniqueIdKey={'id'}
                        displayTextKey={'name'}
                        setInput={setSearchInput}
                        input= {searchInput}
                        mode={mode}
                        setMode={setMode}
                        reset={searchReset}
                    />
                </CCol>
                <CCol md="8" xs='5' className='text-right'>
                    <CFormGroup>
                        <CButton type="button" onClick={handleAddNewRecord} size="sm" color="primary"> <AiOutlinePlus /> {show ? <CSLab code={'Add'} /> : null} </CButton>
                    </CFormGroup>
                </CCol>

                <CCol xs="12" hidden={show}>
                    <CCard>
                        <CCardBody style={{ height: CardBodyHeight, overflowY: 'auto' }}>
                            <CRow >
                                <CCol md="6">
                                    <CRow>
                                        <CCol md="4">
                                            <CLabel><CSLab code={'TL03'} /></CLabel>
                                            <CInput className="" value={data?.code || ''} name="code" onChange={handleChange} />
            
                                        </CCol>
                                        <CCol md="4">
                                            <CLabel><CSLab code={'Internal GL Code'} /></CLabel>
                                            <CInput  value={data?.internalCode || ''} name="internalCode" onChange={handleChange} />
                                        </CCol>
                                        <CCol md="4">
                                            <CLabel style={{ color: '#FFF' }}><CSLab code="." /></CLabel><br />
                                            <CSCheckbox label={'Control A/C'} checked={data?.isControledAC || false} name='isControledAC' onChange={handleChange} />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol md="12">
                                            <CLabel><CSLab code={'TL04'} /></CLabel>
                                            <CInput  value={data?.name || ''} name="name" onChange={handleChange} />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol md="12">
                                            <CLabel htmlFor="name"><CSLab code={'Note'} /></CLabel>
                                            <CTextarea onChange={handleChange} value={data?.description || ''} name="description" style={{ height: '80px' }}></CTextarea>
                                        </CCol>
                                    </CRow>
                                </CCol>
                                   
                                    <CSDivider md='1' style={{height: '100%'}} />
                               
                                <CCol md="5">
                                    <CRow>
                                        <CCol md="12" style={{ marginTop: '15px' }}>
                                            {/* <h6 className="ch-l-s"><CSLab code="Transaction Analysis" /></h6> */}

                                            <CSLineLabel name={'Transaction Analysis'} />
                                        </CCol>
                                        <>
                                            <CCol md="6">
                                                <CSCheckbox label='T1' checked={data?.options?.t1 || false} name='t1' onChange={handleCheckboxChange} />
                                            </CCol>
                                            <CCol md="6">
                                                <CSCheckbox label='T6' checked={data?.options?.t6 || false} name='t6' onChange={handleCheckboxChange} />
                                            </CCol>
                                            <CCol md="6">
                                                <CSCheckbox label='T2' checked={data?.options?.t2 || false} name='t2' onChange={handleCheckboxChange} />
                                            </CCol>
                                            <CCol md="6">
                                                <CSCheckbox label='T7' checked={data?.options?.t7 || false} name='t7' onChange={handleCheckboxChange} />
                                            </CCol>
                                            <CCol md="6">
                                                <CSCheckbox label='T3' checked={data?.options?.t3 || false} name='t3' onChange={handleCheckboxChange} />
                                            </CCol>
                                            <CCol md="6">
                                                <CSCheckbox label={'T8'} checked={data?.options?.t8 || false} name='t8' onChange={handleCheckboxChange} />
                                            </CCol>
                                            <CCol md="6">
                                                <CSCheckbox label='T4' checked={data?.options?.t4 || false} name='t4' onChange={handleCheckboxChange} />
                                            </CCol>
                                            <CCol md="6">
                                                <CSCheckbox label={'T9'} checked={data?.options?.t9 || false} name='t9' onChange={handleCheckboxChange} />
                                            </CCol>
                                            <CCol md="6">
                                                <CSCheckbox label='T5' checked={data?.options?.t5 || false} name='t5' onChange={handleCheckboxChange} />
                                            </CCol>
                                            <CCol md="6">
                                                <CSCheckbox label={'T10'} checked={data?.options?.t10 || false} name='t10' onChange={handleCheckboxChange} />
                                            </CCol>
                                        </>
                                    </CRow>
                                </CCol>
                            </CRow>
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
        </>
    )
}

export default GlAccount;