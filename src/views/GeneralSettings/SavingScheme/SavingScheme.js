import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSelect, CInput, CCard, CCardBody, CFormGroup, CCol, CRow, CButton, CLabel, CCardFooter, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react';
import { AiOutlinePlus, AiOutlineRedo, AiFillSave } from 'react-icons/ai';
import CIcon from '@coreui/icons-react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CSLab, CSCheckbox, CSDivider, CSAutoComplete, CSLineLabel } from 'src/reusable/components';
//import { GetLabelByName } from 'src/reusable/configs/config';
import { BoolStatus, CardBodyHeight, GetRequest, HttpAPIRequest, PostRequest, PutRequest, TestCompanyId } from 'src/reusable/utils/helper';
import { GetAllCurrencies, GetGLAccounts, GetSavingSchemeDetailsBySavingSchemeId, PostSavingScheme, PutSavingScheme, SearchSavingSchemeByNameOrCode } from 'src/reusable/API/SavingSchemeEndppoints';
import { savingSchemeType } from 'src/views/GenericParameters/data/DataModel';

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


const SavingScheme = () => {
    //const lan = useSelector(state => state.language);
    //const TransLabelByCode = (name) => GetLabelByName(name, lan);
    const data = useSelector(state => state.data);
    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState(true);
    const [mode, setMode] = useState('')
    const [searchInput, setSearchInput] = useState('');
    const [options, setOptions] = useState({});
    const [submitData, setSubmitData] = useState({})
    const [currencies, setCurrencies] = useState([]);
    const [glAccounts, setGlAccounts] = useState([]);
    const [textLable, setTextLable] = useState("Amount");
    const [searchResult, setsearchResult] = useState(null);

    const [pageNumber, setPageNumber] = useState(1);
    const [numberOfItems, setNumberOfItems] = useState(10);
    const [orderBy, setOrderBy] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const handleAddNewRecord = () => {
        setMode('Add');
        setShow(false);
    }


    const MultipleGetRequest = async() =>{
        try {
        // useEffect(() => {
            let requests = [HttpAPIRequest('GET',GetAllCurrencies()), HttpAPIRequest('GET', GetGLAccounts())
            ]
            const multipleCall = await Promise.allSettled(requests);
    
            setCurrencies([{id: '00000000-0000-0000-0000-000000000000', name: `Select Currencies`}, ...multipleCall[0].value] );
            setGlAccounts([{id: '00000000-0000-0000-0000-000000000000', name: `Select Employee Type`}, ...multipleCall[1].value])
           
    
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() =>{
        MultipleGetRequest();
    }, []);


    
    const handleReset = (type = 1) => {

        if ('Add' === mode && type === 1) {
            dispatch({ type: 'set', data: {} });
            setSubmitData({});
            setOptions({});
            setSearchInput('');
        }

        if ('Update' === mode && searchResult?.id && type === 1) {
            setSubmitData(searchResult);
            setOptions(searchResult?.options);
            dispatch({ type: 'set', data: { ...searchResult } });
        }

        if (type === 2) {
            setMode('Add');
            dispatch({ type: 'set', data: {} });
            setSubmitData({});
            setOptions({});
            setSearchInput('');
        }
    }

    const handleOnChange = (evnt) => {
        console.log({[evnt?.target?.name]: evnt?.target?.value });
        setSubmitData(data => { return { ...data, [evnt?.target?.name]: evnt?.target?.value } })
        dispatch({ type: 'set', data: { ...data, [evnt?.target?.name]: evnt?.target?.value } });
    }

    const handleCheckboxChange = (evnt) => {
        setOptions(data => { return { ...data, [evnt?.target?.name]: evnt?.target?.checked } })
        let option = { ...data?.options, [evnt?.target?.name]: evnt?.target?.checked }
        dispatch({ type: 'set', data: { ...data, option, options: option } });
    }

    const handleLabelChange = (evnt) => {
        setTextLable(evnt?.target?.options[evnt?.target?.options.selectedIndex].text)
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

        if (!submitData?.currencyId || submitData?.currencyId === '') {
            toaster('', 'Select currency', 'info', 3000);
            return;
        }

        if (!submitData?.savingSchemeType || submitData?.savingSchemeType === '') {
            toaster('', 'Select Saving scheme Type', 'info', 3000);
            return;
        }
        if (!submitData?.status || submitData?.status === '') {
            toaster('', 'Select status', 'info', 3000);
            return;
        }
        // if (!submitData?.calculationRule || submitData?.calculationRule === '') {
        //     toaster('', 'Select Calculation Rule', 'info', 3000);
        //     return;
        // }
        let newData = { ...submitData, option: options, companyId: TestCompanyId };
        'Add' === mode ? AddSavingScheme(newData) : updateSavingScheme(newData);

    };

    const searchReset = () => {
        setShow(true);
        setSearchInput('');
    }
    
    const handlesearchResultelect = (results) => {
        if (results?.id) {
            setsearchResult(results);
            const toastId = toast.loading("Retrieving Details");

            GetRequest(GetSavingSchemeDetailsBySavingSchemeId(results?.id))
                .then((response) => {
                    toast.dismiss(toastId);

                    if (response.ok) {
                        response.json().then(response => {
                            //console.log(response.isMaximumPercentageOfBasic)
                            //response.isMaximumPercentageOfBasic = response.isMaximumPercentageOfBasic === true ? 1 : 2;
                           // console.log({ response })
                            if (response && Object.keys(response).length > 0) {
                                dispatch({ type: 'set', data: { ...results } });
                                setSubmitData({ ...results });
                                setShow(false);
                                setMode('Update');

                            } else {
                                setMode('Add');
                                setShow(false);
                                dispatch({ type: 'set', data: { ...results } });
                                setSubmitData({ ...results });
                            }
                        })
                    }
                }).catch(err => {
                    console.log(err);
                    toaster(toastId, 'Failed to retrieve details', 'error', 4000)
                })
        }
    }

    function AddSavingScheme(postObject) {

        if ('Add' === mode) {
            const toastId = toast.loading("Creating GL Account");
            //setDisabled(true);
            PostRequest(PostSavingScheme(), { data: postObject })
                .then(response => {
                    response.text().then(response => {
                        if ("" === response) {
                            toaster(toastId, 'Addd a Saving Scheme successfully!', 'success', 4000);
                            handleReset(2);
                        } else {
                            try {
                                response = JSON.parse(response);
                                toaster(toastId, response?.reason ? response?.reason : "Failed to Add a Saving Scheme", 'error', 4000);
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
                    //setDisabled(true);
                });
        }
    }



    function updateSavingScheme(putData) {
        if ('Update' === mode && searchResult?.id) {
            const toastId = toast.loading("Updating GL Account");
            //setDisabled(true);
            if (putData?.isActive)
                delete putData?.isActive

            PutRequest(PutSavingScheme(searchResult?.id), { data: putData })
                .then(response => {
                    response.text().then(response => {
                        console.log(response);

                        if ("" === response) {
                            toaster(toastId, 'Updated a Saving Scheme successfully!', 'success', 4000);
                            handleReset(2);
                        } else {
                            try {
                                response = JSON.parse(response);
                                toaster(toastId, response?.reason ? response?.reason : "Failed to update Saving Scheme", 'error', 4000);
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
                   // setDisabled(true);
                });
        }
    }   


    return (
        <>
            <CRow>
                <CCol md='1'></CCol>
                <CCol xs="12"><h5><CSLab code={mode + " Saving Scheme"} /></h5></CCol>
            </CRow>
            <CRow >
                <CCol md="4" xs='7'>
                    <CSAutoComplete
                        filterUrl={SearchSavingSchemeByNameOrCode(searchInput)}
                        placeholder={'Search for Saving Scheme by name or code'}
                        handleSelect={handlesearchResultelect}
                        uniqueIdKey={'id'}
                        displayTextKey={'name'}
                        setInput={setSearchInput}
                        emptySearchFieldMessage={`Please input three or more characters to search`}
                        input={searchInput}

                        isPaginated={false}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        numberOfItems={numberOfItems}
                        setNumberOfItems={setNumberOfItems}
                        orderBy={orderBy}
                        setOrderBy={setOrderBy}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}

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

                <CCol xs='12' hidden={show}>
                    <CCard>
                        <CCardBody style={{ height: CardBodyHeight, overflowY: 'auto' }}>
                            <CRow >
                                <CCol md="6">
                                    <CRow>
                                        <CCol md="4">
                                            <CLabel><CSLab code={'Code'} /></CLabel>
                                            <CInput name="code" value={data?.code || ''} onChange={handleOnChange} />
                                        </CCol>
                                        <CCol md="8">
                                            <CLabel><CSLab code={'Name'} /></CLabel>
                                            <CInput name="name" value={data?.name || ''} onChange={handleOnChange} />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol md="4">
                                            <CLabel><CSLab code={'Currency'} /></CLabel>
                                            <CSelect name="currencyId" value={data?.currencyId || -1} onChange={handleOnChange}>
                                                {
                                                    currencies
                                                    .map((x, i) => <option key={i} value={x?.id}>{x?.name}</option>)
                                                }
                                            </CSelect>
                                        </CCol>
                                        <CCol md="4">
                                            <CLabel><CSLab code={'Savings Type'} /></CLabel>
                                            <CSelect name="savingSchemeType" value={data?.savingSchemeType || -1} onChange={handleOnChange}>
                                                {
                                                    savingSchemeType
                                                        .map((x, i) => <option key={i} value={x.value}>{x.name}</option>)
                                                }
                                            </CSelect>
                                        </CCol>
                                        <CCol md="4">
                                            <CLabel><CSLab code={'Status'} /></CLabel>
                                            <CSelect name="status" value={data?.status || -1} onChange={handleOnChange}>
                                                {
                                                    BoolStatus
                                                        .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                                }
                                            </CSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol md="4">
                                            <CLabel><CSLab code={'Calculation Rules'} /></CLabel>
                                            <CSelect name="isCalculationRule" value={data?.isCalculationRule || -1} onChange={(evnt) => { handleOnChange(evnt); handleLabelChange(evnt) }}>
                                                {
                                                    ['Select Calculation Rule', 'Varying Amount', 'Flat Amount', 'Percentage Based On'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                                }
                                            </CSelect>
                                        </CCol>
                                        <CCol md="4" >
                                            <CLabel><CSLab  style={{textAlign: 'right'}} code={textLable} /></CLabel>
                                            <CInput type="number" name="flatAmount" value={data?.flatAmount || ''} style={{ textAlign: "right" }} onChange={handleOnChange} />
                                        </CCol>
                                        <CCol md="4" style={{marginTop: '15px'}}>
                                            <CSCheckbox label='Qualification  Rule' name='isQualificationRule' checked={data?.options?.isQualificationRule || false} onChange={handleCheckboxChange} />
                                        </CCol>                                        
                                    </CRow>
                                    <CRow>
                                        <CCol md="4"  style={{marginTop: '15px'}}>
                                            <CSCheckbox label='Statutory Fund' name='isStatutoryFund' checked={data?.options?.isStatutoryFund || false} onChange={handleCheckboxChange} />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol md="12" style={{ marginTop: '15px' }}>
                                            {/* <h6 className="ch-l-s"><CSLab code="Transaction Analysis" /></h6> */}
                                            <CSLineLabel name={'Transaction Analysis'} />

                                        </CCol>
                                        <CCol md="5">
                                            <CLabel><CSLab code={'Transaction Analysis'} /></CLabel>
                                            <CSelect name="sunTAnalysis" value={data?.sunTAnalysis || -1} onChange={handleOnChange}>
                                                {
                                                    ['Select Transaction Analysis', 'Sun T-Analysis 1', 'Sun T-Analysis 2', 'Sun T-Analysis 3'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                                }
                                            </CSelect>
                                        </CCol>
                                    </CRow>
                                </CCol>
                                <CSDivider md="1" style={{ flex: '0 0 .3333333333%' }} />
                                <CCol md="5">
                                    <CRow>
                                        <CCol md="12" style={{ marginTop: '15px' }}>
                                            {/* <h6 className="ch-l-s"><CSLab code="GL Settings" /></h6> */}
                                            <CSLineLabel name="GL Settings" />
                                        </CCol>
                                        <CCol md="6">
                                            
                                            <CLabel><CSLab code={'Employee GL Account'} /></CLabel>
                                            <CSelect name="mandatorySavingSchemeEmployeeContributionGLId" value={data?.mandatorySavingSchemeEmployeeContributionGLId || -1} onChange={handleOnChange}>
                                                {
                                                    glAccounts
                                                    .map((x, i) => <option key={i} value={x?.id}>{x?.name}</option>)
                                                }
                                            </CSelect>
                                        </CCol>
                                        <CCol md="6">
                                            <CLabel><CSLab code={' Employer GL Account'} /></CLabel>
                                            <CSelect name="mandatorySavingSchemeEmployerContributionGLId" value={data?.mandatorySavingSchemeEmployerContributionGLId || -1} onChange={handleOnChange}>
                                                {
                                                    glAccounts
                                                    .map((x, i) => <option key={i} value={x?.id}>{x?.name}</option>)
                                                }
                                            </CSelect>
                                        </CCol>
                                        <CCol md="6">
                                            <CLabel><CSLab code={"Employer's Payable"} /></CLabel>
                                            <CSelect name="mandatorySavingSchemeEmployerTotalPayableGLId" value={data?.mandatorySavingSchemeEmployerTotalPayableGLId || -1} onChange={handleOnChange}>
                                                {
                                                    glAccounts
                                                    .map((x, i) => <option key={i} value={x?.id}>{x?.name}</option>)
                                                }
                                            </CSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol md="12">
                                            {/* <h6 className="ch-l-s"><CSLab code="Other Rule" /></h6> */}
                                            <CSLineLabel name="Other Rules" /> 
                                            
                                        </CCol>
                                        <CCol md="7">
                                            <CSCheckbox label='Tax Employers Contribution' name='isTaxEmployerContibution' checked={data?.options?.isTaxEmployerContibution || false} onChange={handleCheckboxChange} />
                                        </CCol>  
                                        
                                        <CCol md="5">
                                            <CSCheckbox label='Tax Deductible' name='isTaxDeductible' checked={data?.options?.isTaxDeductible || false} onChange={handleCheckboxChange} />
                                        </CCol>                           
                                    </CRow>
                                    <CRow>
                                    <CCol md="8">
                                            <CSCheckbox label='Tax Rebate on Employers Contribution' name='isTaxRebateOnEmployerContribution' checked={data?.options?.isTaxRebateOnEmployerContribution || false} onChange={handleCheckboxChange} />
                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CRow>
                        </CCardBody>
                        <CCardFooter>
                            {'Update' === mode ? <CButton style={{ marginRight: 5 }} type="button" size="sm" color="success" ><CIcon name="cil-scrubber" />
                                <CSLab code="View History" />
                            </CButton> : null}

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
                                <CSelect>
                                    {
                                        ['Select GL Account', 'GL 1', 'GL 2'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                    }
                                </CSelect>
                            </CCol>
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

export default SavingScheme;