import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CIcon from '@coreui/icons-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    CInput, CTextarea, CCard, CCardBody, CFormGroup, CCol, CRow, CButton, CLabel, CCardFooter, CSelect,
} from '@coreui/react';
import { AiOutlinePlus, AiFillSave, AiOutlineRedo, AiOutlineClose } from 'react-icons/ai';
import { CSAutoComplete, CSDivider, CSLab } from 'src/reusable/components';
import { CSLineLabel } from 'src/reusable/components';
import { CardBodyHeight, PostRequest, PutRequest, GetRequest,HttpAPIRequest } from 'src/reusable/utils/helper';
import { GetAllCurrencies, GetGLAccounts, PostLoan, PutLoans, GetAllLoans, GetLoanDetailsByLoanId } from 'src/reusable/API/LoanEndpoints';
import { BoolStatus} from 'src/reusable/utils/helper';
import { CSRequiredIndicator } from 'src/reusable/components';

const toaster = (toastId, message, type, time) => {
    switch (type) {
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
        case 'warning':
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
};

const limitData = ['Select Loan Limit', '% of Basic', 'Maximum Amount'];

function moneyInTxt(value, standard, dec = 0) {
    let nf = new Intl.NumberFormat(standard, {
        minimumFractionDigits: dec,
        maximumFractionDigits: 2
    });
    return nf.format(Number(value) ? value : 0.00);
};
const handleMoney = (e) => {
    console.log(e.target.value);
    console.log(moneyInTxt(e.target.value, 'en', 2));
}
const Loan = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data);

    const [show, setShow] = useState(true);
    const [currencies, setCurrencies] = useState([]);
    const [glAccounts, setGlAccounts] = useState([]);
    const [mode, setMode] = useState('');
    const [submitData, setSubmitData] = useState({});

    const [pageNumber, setPageNumber] = useState(1);
    const [numberOfItems, setNumberOfItems] = useState(10);
    const [orderBy, setOrderBy] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [textLable, setTextLable] = useState("Amount")
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setsearchResult] = useState(null);
    const [, setDisabled] = useState(false);

    const handleReset = (type = 1) => {

        if ('Add' === mode && type === 1) {
            dispatch({ type: 'set', data: {} });
            setSubmitData({});
            setSearchInput('');
            setsearchResult('')
        }

        if ('Update' === mode && searchResult?.id && type === 1) {
            setSubmitData(searchResult);
            dispatch({ type: 'set', data: { ...searchResult } });
        }

        if (type === 2) {
            setMode('Add');
            dispatch({ type: 'set', data: {} });
            setSubmitData({});
            setSearchInput('');           
        }
    }


    const searchReset = () => {
        setShow(true);
        setSearchInput('');
        handleReset(2);
    }

    const handlesearchResultelect = (results) => {
        if (results?.id) {
            setsearchResult(results);
            const toastId = toast.loading("Retrieving Details");

            GetRequest(GetLoanDetailsByLoanId(results?.id))
                .then((response) => {
                    toast.dismiss(toastId);

                    if (response.ok) {
                        response.json().then(response => {
                            //console.log(response.isMaximumPercentageOfBasic)
                            response.isMaximumPercentageOfBasic = response.isMaximumPercentageOfBasic === true ? 1 : 2;
                           // console.log({ response })
                            if (response && Object.keys(response).length > 0) {
                                dispatch({ type: 'set', data: { ...response } });
                                setSubmitData({ ...response });
                                setShow(false);
                                setMode('Update');

                            } else {
                                setMode('Add');
                                setShow(false);
                                dispatch({ type: 'set', data: { ...response } });
                                setSubmitData({ ...response });
                            }
                        })
                    }
                }).catch(err => {
                    console.log(err);
                    toaster(toastId, 'Failed to retrieve details', 'error', 4000)
                })
        }
    }

 const MultipleGetRequests = async() => {
     try {
         let request = [HttpAPIRequest('GET', GetAllCurrencies()), HttpAPIRequest('GET', GetGLAccounts())];
         const multipleCall = await Promise.allSettled(request);

         setCurrencies([{id: '00000000-0000-0000-0000-000000000000', name: `Select Currency`}, ...multipleCall[0].value]);
         setGlAccounts([{id: '00000000-0000-0000-0000-000000000000', name: `Select GL Account`}, ...multipleCall[1].value])
     } catch (error) {
         console.log(error);
     }
 }

    useEffect(() => {
        MultipleGetRequests()
    }, []);

    const handleOnChange = (evnt) => {

        setSubmitData({ ...data, [evnt?.target?.name]: evnt?.target?.value });
        dispatch({ type: 'set', data: { ...data, [evnt?.target?.name]: evnt?.target?.value } });
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

        if (!submitData?.isMaximumPercentageOfBasic || submitData?.isMaximumPercentageOfBasic === '') {
            toaster('', 'Select Loan Limit', 'info', 3000);
            return;
        }
        if (!submitData?.maximumAmountOrPercentageOfBasic || submitData?.maximumAmountOrPercentageOfBasic === '') {
            toaster('', 'Enter Amount', 'info', 3000);
            return;
        }
        if (!submitData?.source || submitData?.source === '') {
            toaster('', 'Select Loan type', 'info', 3000);
            return;
        }

        if (!submitData?.interestType || submitData?.interestType === '') {
            toaster('', 'Select Interest Type', 'info', 3000);
            return;
        }

        if (!submitData?.maximumGracePeriod || submitData?.maximumGracePeriod === '') {
            toaster('', 'Enter Grace Period', 'info', 3000);
            return;
        }

        if (!submitData?.interestRateType || submitData?.interestRateType === '') {
            toaster('', 'Select Interest Rate Type', 'info', 3000);
            return;
        }
        if (!submitData?.interestGLAccountId || submitData?.interestGLAccountId === '') {
            toaster('', 'Enter Calculation Rule', 'info', 3000);
            return;
        }

        if (!submitData?.loanGLAccountId || submitData?.loanGLAccountId === '') {
            toaster('', 'Select Loan GL Account', 'info', 3000);
            return;
        }


        let status = submitData?.status ? JSON.parse(submitData?.status) : false;
        let LoanData = { ...submitData, status };
        LoanData.isMaximumPercentageOfBasic = Number(LoanData.isMaximumPercentageOfBasic) === 1 ? true : false;
        'Add' === mode ? AddLoan(LoanData) : updateLoan(LoanData);
    }
    const handleAddNewRecord = () => {
        setMode('Add');
        setShow(false);
        handleReset(2);
    }

    function AddLoan(postData) {
        //Add segment
        if ('Add' === mode) {
            const toastId = toast.loading("Creating Loan")
            PostRequest(PostLoan(), { data: postData })
                .then(response => {
                    response.text().then(data => {
                        if ("" === data) {
                            toaster(toastId, 'Loan Addd successfully', 'success', 4000);
                            handleReset(2);
                        } else {
                            try {
                                data = JSON.parse(data);
                                toaster(toastId, data?.reason ? data?.reason : 'Failed to Add Loan', 'error', 4000)
                            } catch (error) {
                                console.log(error)
                            }
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    console.log('Done');
                    setDisabled(true);
                }
            )
        }
    }

    function updateLoan(putData) {
        if ('Update' === mode && searchResult?.id) {
            const toastId = toast.loading("Updating Loan");
            PutRequest(PutLoans(searchResult?.id), { data: putData })
                .then(response => {
                    response.text().then(response => {
                        console.log(response);

                        if ("" === response) {
                            toaster(toastId, 'Updated a Loan successfully!', 'success', 4000);
                            handleReset(2);
                        } else {
                            try {
                                response = JSON.parse(response);
                                toaster(toastId, response?.reason ? response?.reason : "Failed to update Loan", 'error', 4000);
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

    const handleLabelChange = (evnt) => {
        setTextLable(evnt?.target?.options[evnt?.target?.options.selectedIndex].text)
    }

    return (
        <>
            <CRow>
                <CCol xs="12"><h5><CSLab code={mode + " Loan"} /></h5></CCol>
            </CRow>
            <CRow hidden={!show? true:false}>
            <CCol md="4" xs='7'>
                    <CSAutoComplete
                        filterUrl={GetAllLoans(searchInput)}
                        placeholder={'Search for Loan by name or code'}
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
                        { show ? <CButton type="button" disabled={mode === 'Add'} onClick={handleAddNewRecord} size="sm" color="primary"><AiOutlinePlus /><CSLab code={'Add '} /> </CButton> : null}
                    </CFormGroup>
                </CCol>
            </CRow>
            <CRow >
                <CCol xs="12" hidden={show}>
                    <CCard>
                        <CCardBody style={{ height: CardBodyHeight, overflowY: 'auto' }}>
                            <CRow>
                                {/* Details */}
                                <CCol md="6">
                                    <CRow>
                                        <CCol md="4">
                                            <CLabel><CSLab code='Code' /></CLabel><CSRequiredIndicator />
                                            <CInput name="code" value={data?.code || ''} onChange={handleOnChange} />
                                        </CCol>
                                        <CCol md="8">
                                            <CLabel><CSLab code={'Name'} /></CLabel><CSRequiredIndicator />
                                            <CInput name="name" value={data?.name || ''} onChange={handleOnChange} />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol md="4">
                                            <CLabel><CSLab code={'Currency'} /></CLabel><CSRequiredIndicator />
                                            <CSelect name="currencyId" value={data?.currencyId || -1} onChange={handleOnChange} >
                                                {
                                                    currencies
                                                        .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                                }
                                            </CSelect>
                                        </CCol>
                                        <CCol md="4">
                                            <CLabel> <CSLab code={'Loan Limit'} /></CLabel><CSRequiredIndicator />
                                            <CSelect name="isMaximumPercentageOfBasic" type="" value={data?.isMaximumPercentageOfBasic || -1} onChange={(evnt) => { handleOnChange(evnt); handleLabelChange(evnt) }}>
                                                {
                                                    limitData.map((x, i) => <option key={i} value={i}>{x}</option>)
                                                }
                                            </CSelect>
                                        </CCol>
                                        <CCol md="4">
                                            <CLabel> <CSLab code={textLable} /></CLabel><CSRequiredIndicator />
                                            <CInput style={{textAlign: 'right'}} name="maximumAmountOrPercentageOfBasic" value={data?.maximumAmountOrPercentageOfBasic || ''} onChange={handleOnChange} onBlur={(e) => handleMoney(e.target.value)} />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol md="4" >
                                            <CLabel> <CSLab code={'Loan Type'} /></CLabel>
                                            <CSelect name="source" value={data?.source || -1} onChange={handleOnChange}>
                                                {
                                                    ['Select Loan Type', 'Employer', 'Third Party'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                                }
                                            </CSelect>
                                        </CCol>
                                        <CCol md="4">
                                            <CLabel><CSLab code="Interest Rate Type" /></CLabel> <CSRequiredIndicator />
                                            <CSelect value={data?.interestRateType || -1} name='interestRateType' onChange={handleOnChange} >
                                                {
                                                    ['Select Interest Rate Type', 'Fixed', 'Varaiable'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                                }
                                            </CSelect>
                                        </CCol>
                                        <CCol md="4" >
                                            <CLabel> <CSLab code={'Interest Calculation Rule'} /></CLabel>
                                            <CSelect name="interestType" value={data?.interestType || -1} onChange={handleOnChange}>
                                                {
                                                    ['Select Interest Calculation Rule', 'Annual', 'Simple', 'Absolute'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                                }
                                            </CSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol md="4">
                                            <CLabel><CSLab code="Status" /></CLabel> <CSRequiredIndicator />
                                            <CSelect value={data?.status || -1} name='status' onChange={handleOnChange} >
                                                {
                                                    BoolStatus
                                                        .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                                }
                                            </CSelect>
                                        </CCol>
                                    </CRow>
                                </CCol>

                                <CSDivider md="1" style={{ height: '100%' }} />

                                <CCol md='5'>
                                    <CRow>
                                        <CCol md='12'><CSLineLabel name="Other Info" /> </CCol>
                                    </CRow>
                                    <CRow className={'bottom-spacing'}>
                                        <CCol md="4">
                                            <CLabel><CSLab code={'Interest Rate'} /></CLabel>
                                            <CInput type='number' name="interestRate" value={data?.interestRate || ""} onChange={handleOnChange} />
                                        </CCol>
                                        <CCol md="4">
                                            <CLabel><CSLab code={'Grace Period'} /></CLabel>
                                            <CInput name="maximumGracePeriod" value={data?.maximumGracePeriod || ""} onChange={handleOnChange} />
                                        </CCol>
                                        <CCol md="4">
                                            <CLabel><CSLab code={'Repayment Period'} /></CLabel>
                                            <CInput name="maximumTerm" value={data?.maximumTerm || ""} onChange={handleOnChange} />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol md="6">
                                            <CLabel><CSLab code={'Loan GL Account'} /></CLabel>
                                            <CSelect name="loanGLAccountId" value={data?.loanGLAccountId || -1} onChange={handleOnChange}>
                                                {
                                                    glAccounts.map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                                }
                                            </CSelect>
                                        </CCol>
                                        <CCol md="6">
                                            <CLabel><CSLab code={'Interest GL Account'} /></CLabel>
                                            <CSelect name="interestGLAccountId" value={data?.interestGLAccountId || -1} onChange={handleOnChange}>
                                                {
                                                   glAccounts.map((x,y) => <option key={y} value={x.id}>{x.name}</option>)
                                                }
                                            </CSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className={'top-spacing'}>
                                        <CCol md="12" style={{ marginTop: '5px' }}>
                                            <CLabel><CSLab code="Description" /></CLabel>
                                            <CTextarea value={data?.note || ''} name="note" style={{ height: '50px' }} onChange={handleOnChange}></CTextarea>
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
                            <CButton  style={{ marginRight: 5, float: 'right' }} onClick={() => searchReset()} type="button" size="sm" color='danger' ><AiOutlineClose size={20} /><CSLab code = 'CANCEL' /></CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Loan
