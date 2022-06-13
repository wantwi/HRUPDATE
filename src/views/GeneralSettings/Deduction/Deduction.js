import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CIcon from '@coreui/icons-react';
import { CInput, CCard, CCardBody, CFormGroup, CCol, CRow, CButton, CLabel, CCardFooter, CSelect, CTabs, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react';
import { AiOutlinePlus, AiFillSave, AiOutlineRedo } from 'react-icons/ai';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CSAutoComplete, CSCheckbox, CSDivider, CSLab, CSLineLabel, CSRequiredIndicator } from 'src/reusable/components';
import { BoolStatus, CardBodyHeight, HttpAPIRequest, MultipleGetRequest, PostRequest, PutRequest, TestCompanyId } from 'src/reusable/utils/helper';
import { GetDeductions, PostDeduction, PutDeduction } from 'src/reusable/API/DeductionEndpoints';
import GLComponent from 'src/views/GenericParameters/GenericParam/GLComponent';
import { GetAllGeneralLedgersByCompanyId } from 'src/reusable/API/OrgEndpoints';
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

const Deduction = () => {
    const data = useSelector(state => state.data);
    const dispatch = useDispatch();

    const [orgGLAccounts, setOrgGLAccounts] = useState({});
    const [gLAccountData, setGLAccountData] = useState([]);
    const [activeKey, setActiveKey] = useState(1);
    const [show, setShow] = useState(true);
    const [mode, setMode] = useState('');
    const [submitData, setSubmitData] = useState({});
    const [options, setOptions] = useState({});
    const [searchResult, setSearchResult] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [numberOfItems, setNumberOfItems] = useState(10);
    const [orderBy, setOrderBy] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [textLable, setTextLable] = useState("Amount")



    
    useEffect(() => {
        const urls = [GetAllGeneralLedgersByCompanyId(TestCompanyId),];

        if (urls) {
            MultipleGetRequest(urls)
                .then((response) => {
                    if (response && response.length === 1) {
                        if (response[0].ok) {
                            response[0].json().then(data => {
                                setGLAccountData(data);
                                //setCurrencies([{ id: '00000000-0000-0000-0000-000000000000', name: `Select Currency` }, ...data]);
                            });
                        }
                    }
                })
                .catch(err => {
                    console.log({ err })
                })
                .finally(() => {
                    console.log('Done');
                }
            );
        }
    }, []);
   // console.log({gLAccountData});

    const handleAddNewRecord = () => {
        setMode('Add');
        setShow(false);
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

    /** This event handler gets all the GL Accounts that are selected in the GLComponent */
    const handleOnGLChange = (evnt) => {
         setOrgGLAccounts({ ...orgGLAccounts, [evnt?.target?.name]: evnt?.target?.value }) 
        };

    const handleOnSubmit = () => {

        if(!submitData?.code || submitData?.code === ''){
            toaster('', 'Enter code', 'info', 3000);
            return;
        }

        if(!submitData?.name || submitData?.name === ''){
            toaster('', 'Enter name', 'info', 3000);
            return;
        }

        if(!submitData?.frequency || submitData?.frequency === ''){
            toaster('', 'Select frequency', 'info',3000);
            return;
        }

        if(!submitData?.maxAmount || submitData?.maxAmount === ''){
            toaster('', 'Enter maximum amount', 'info', 3000);
            return;
        }

        if(!submitData?.basis || submitData?.basis === ''){
            toaster('','Select basis', 'info', 3000);
            return;
        }

        if(!submitData?.flatAmount || submitData?.flatAmount === ''){
            toaster('','Enter amount', 'info', 3000);
            return;
        }

        if(!submitData?.status || submitData?.status === ''){
            toaster('', 'Select status', 'info', 3000);
            return;
        }

        let newData = { ...submitData, option: options };
        //console.log(newData);
         'Add' === mode ? AddDeduction(newData) : updateDeduction(newData);
    }

    const handleSearchResultSelect = (results) => {
        if (results?.id) {
            setSearchResult(results);
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
            setSearchInput('');
        }

        if ('Update' === mode && searchResult?.id && type === 1) {
            setSubmitData(searchResult);
            setOptions(searchResult?.options);
            dispatch({ type: 'set', data: { ...searchResult } });
        }

        if (type === 2) {
            dispatch({ type: 'set', data: {} });
            setSubmitData({});
            setOptions({});
            setSearchInput('');
        }
    }

    const handleLabelChange = (evnt) => {
        setTextLable(evnt?.target?.options[evnt?.target?.options.selectedIndex].text)
    }

    function AddDeduction(postObject) {

        if ('Add' === mode) {
            const toastId = toast.loading("Creating Deduction");
            PostRequest(PostDeduction(), { data: postObject })
                .then(response => {
                    response.text().then(response => {
                        if ("" === response) {
                            toaster(toastId, 'Addd a Deduction successfully!', 'success', 4000);
                            handleReset(2);
                        } else {
                            try {
                                response = JSON.parse(response);
                                toaster(toastId, response?.reason ? response?.reason : "Failed to Add Deduction", 'error', 4000);
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
                }
            );
        }
    }

    //console.log({orgGLAccounts});
    function updateDeduction(putObject) {
        if ('Update' === mode && searchResult?.id) {
            const toastId = toast.loading("Updating GL Account");

            if (putObject?.isActive)
                delete putObject?.isActive

            PutRequest(PutDeduction(searchResult?.id), { data: putObject })
                .then(response => {
                    response.text().then(response => {
                        console.log(response);

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
                }
            );
        }
    }

    return (
        <>
            <CRow>
                <CCol md='1'></CCol>
                <CCol xs="12"><h5><CSLab code={mode + " Deduction"} /></h5></CCol>
            </CRow>
            <CRow>
                <CCol md="4" xs='7'>
                    <CSAutoComplete
                        filterUrl={GetDeductions(searchInput, pageNumber, numberOfItems, orderBy, sortOrder)}
                        placeholder={'Search for Deductions by name or code'}
                        handleSelect={handleSearchResultSelect}
                        uniqueIdKey={'id'}
                        displayTextKey={'name'}
                        setInput={setSearchInput}
                        input={searchInput}

                        isPaginated={true}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        numberOfItems={numberOfItems}
                        setNumberOfItems={setNumberOfItems}
                        orderBy={orderBy}
                        setOrderBy={setOrderBy}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
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
                                            <CCol md="6">
                                                <CRow>
                                                    <CCol md="4">
                                                        <CLabel><CSLab code='Code' /></CLabel><CSRequiredIndicator />
                                                        <CInput name="code" value={data?.code || ''} onChange={handleOnChange} />
                                                    </CCol>
                                                    <CCol md="8">
                                                        <CLabel><CSLab code={'Name'} /></CLabel> <CSRequiredIndicator />
                                                        <CInput name="name" value={data?.name || ''} onChange={handleOnChange} />
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol md="4" >
                                                        <CLabel> <CSLab code={'Frequency'} /></CLabel><CSRequiredIndicator />
                                                        <CSelect name="frequency" value={data?.frequency || -1} onChange={handleOnChange}>
                                                            {
                                                                ['Select Frequency', 'Recurring', 'Non-Recurring'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                                            }
                                                        </CSelect>
                                                    </CCol>
                                                    <CCol md="4">
                                                        <CLabel> <CSLab code={'Maximum Amount'} /></CLabel><CSRequiredIndicator />
                                                        <CInput name="maxAmount" type="number" value={data?.maxAmount || ''} style={{ textAlign: "right" }} onChange={handleOnChange} />
                                                    </CCol>
                                                    <CCol md="4" >
                                                        <CLabel> <CSLab code={'Basis'} /></CLabel><CSRequiredIndicator />
                                                        <CSelect name="basis" value={data?.basis || -1} onChange={(evnt) => { handleOnChange(evnt); handleLabelChange(evnt) }}>
                                                            {
                                                                ['Select Basis', 'Varying Amount', 'Flat Amount', '% of Basic', '% of Daily Rate', '% of Hourly Rate'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                                            }
                                                        </CSelect>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol md="4" >
                                                        <CLabel><CSLab code={textLable} /></CLabel><CSRequiredIndicator />
                                                        <CInput type="number" name="flatAmount" value={data?.flatAmount || ''} style={{ textAlign: "right" }} onChange={handleOnChange} />
                                                    </CCol>
                                                    <CCol md="4">
                                                        <CLabel> <CSLab code={'Select Status'} /></CLabel><CSRequiredIndicator />
                                                        <CSelect name="status" value={data?.status || ''} onChange={handleOnChange} >
                                                            {
                                                                BoolStatus
                                                                    .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                                            }
                                                        </CSelect>
                                                    </CCol>
                                                </CRow>
                                            </CCol>                                           
                                           <CSDivider style={{height: '100%'}} md='1' />
                                            {/* Applicables */}
                                            <CCol md="5" >
                                                <CSLineLabel name={'Other Info'} />
                                                <CRow>                                                   
                                                    <CCol md="5" xs='7'>
                                                        <CSCheckbox label='Out of Payroll' checked={data?.options?.isOutPayroll || false} name='isOutPayroll' onChange={handleCheckboxChange} />
                                                    </CCol>
                                                    <CCol md="6" xs='7'>
                                                        <CSCheckbox label='Tax Deductible' checked={data?.options?.isTaxDeductible || false} name='isTaxDeductible' onChange={handleCheckboxChange} />
                                                    </CCol>
                                                    <CCol md="6" xs='7'>
                                                        <CSCheckbox label='Pro Rated' checked={data?.options?.isProRated || false} name='isProRated' onChange={handleCheckboxChange} />
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                
                                                </CRow>
                                            </CCol>
                                        </CRow>
                                    </CTabPane>
                                    <CTabPane visible={activeKey === 2 ? 'true' : 'false'} style={{ marginTop: '10px' }}>
                                        {
                                            gLAccountData ?
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
        </>
    )
}

export default Deduction;