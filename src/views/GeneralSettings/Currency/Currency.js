import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CInput, CCard, CCardBody, CCol, CRow, CButton, CLabel, CCardFooter, CSelect, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CCollapse, CDataTable } from '@coreui/react';
import { AiFillSave, AiOutlineRedo, AiOutlineClose } from 'react-icons/ai';
import {
    ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort,
    Edit, CommandColumn, Toolbar
} from '@syncfusion/ej2-react-grids';

//import CIcon from '@coreui/icons-react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BoolStatus, CardBodyHeight, GetRequest, PostRequest, TestCompanyId, PutRequest, //DateHandler 
} from 'src/reusable/utils/helper';
import { GetCurrencyDetailsByCurrencyId, PostCurrency, PutCurrency, SearchInternalCurrencies } from 'src/reusable/API/CurrencyEndpoints';
import { CSAutoComplete, CSCheckbox, CSDivider, CSLab, CSRequiredIndicator } from 'src/reusable/components';
//import { GetLabelByName } from 'src/reusable/configs/config';
import '../../../scss/_custom_table.scss';
import { Prompt } from 'react-router-dom';


const getBadge = (status) => {
    switch (status) {
        case true:
        case 1:
        case 'True':
            return 'success'
        case false:
        case 0:
        case 'False':
            return 'secondary'
        default:
            return 'primary'
    }
}
const TABLEFIELDS = {
    1: [{ key: 'code', label: 'Code' }, { key: 'name', label: 'Name' }, { key: 'status', label: 'Status' }, { key: 'date', label: 'Date' }, { key: 'id', label: 'Show' }],
    2: [],
    3: []
}
//, { key: 'exchangeRate', label: 'Exchange Rate' }, { key: 'AddAt', label: 'Date' }, { key: 'id', label: 'Show' }

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

}

const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: false, allowEditOnDblClick: true };
//const toolbarOptions = ['Add', 'Cancel'];

const commandOptions = [
    { type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
    { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } }
];


const Currency = () => {
    const data = useSelector(state => state.data);
    const dispatch = useDispatch();

    const [searchInput, setSearchInput] = useState("");
    const [show, setShow] = useState(true);
    const [disabled,] = useState(true);
    const [activeKey] = useState(1);
    const [visible, setVisible] = useState(false);
    const [searchResult, setSearchResult] = useState(null);
    const [mode, setMode] = useState('');
    const [submitData, setSubmitData] = useState({});
    const [historyData,] = useState({ name: '', data: null });
    const [isHomeCurrency,] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [exhangeRate, setExchangeRate] = useState(null);
    const [numberOfItems, setNumberOfItems] = useState(10);
    const [orderBy, setOrderBy] = useState('');
    const [activeHistory, setActiveHistory] = useState([]);
    const [sortOrder, setSortOrder] = useState('');
    const [duplicateData, setDuplicateData] = useState({});

    const handleOnSubmit = () => {

        if (!submitData?.isActive || submitData?.isActive === '') {
            toaster('', 'Select a status', 'info', 3000);
            return;
        }

        let isActive = submitData?.isActive ? JSON.parse(submitData?.isActive) : false;
        let currencyData = { ...submitData, isActive, companyId: TestCompanyId, currencyId: submitData?.id }
        'Add' === mode ? AddCurrency(currencyData) : UpdateCurrency(currencyData);
    }

    const toggleDetails = (index) => {
        const position = activeHistory.indexOf(index);
        let newDetails = activeHistory.slice()
        if (position !== -1) {
            newDetails.splice(position, 1)
        } else {
            newDetails = [...historyData?.data?.filter((x, i) => i === index), index]
        }

        setActiveHistory(newDetails)
    }

    const handleReset = () => {
        setShow(true);
    }

    const handleChange = (evnt) => {
        setSubmitData({ ...data, [evnt?.target?.name]: JSON.parse(evnt?.target?.value) });
        dispatch({ type: 'set', data: { ...data, [evnt?.target?.name]: JSON.parse(evnt?.target?.value) } });
    }

    const handleSearchResultSelect = (results) => {
        if (results?.id) {
            setSearchResult(results);
            const toastId = toast.loading("Retrieving Details");

            GetRequest(GetCurrencyDetailsByCurrencyId(results?.id))
                .then((response) => {
                    toast.dismiss(toastId);
                    if (response.ok) {
                        response.json().then(response => {
                           // console.log(response);
                            if (response && Object.keys(response).length > 0) {
                                dispatch({ type: 'set', data: { ...response } });
                                setSubmitData({ ...response });
                                setDuplicateData({...response})

                                let rates = response?.rates;
                                console.log(rates);
                                setExchangeRate(rates);
                                setShow(false);
                                setMode('Update');
                            } else {
                                setMode('Add');
                                setShow(false);
                                dispatch({ type: 'set', data: { ...results, isHomeCurrency } });
                                setSubmitData({ ...results, isHomeCurrency });
                            }
                        });
                    }

                }).catch(err => {
                    console.log(err);
                    toaster(toastId, "Failed to retrieve details", 'error', 4000);
                }
            );
        }
    }

    function AddCurrency(postData) {
        //Add segment
        if ('Add' === mode) {
            const toastId = toast.loading("Creating Currency ")
            PostRequest(PostCurrency(), { data: postData })
                .then(response => {
                    response.text().then(data => {
                        if ("" === data) {
                            toaster(toastId, 'Currency Addd successfully', 'success', 4000);
                        } else {
                            try {
                                data = JSON.parse(data);
                                toaster(toastId, data?.reason ? data?.reason : 'Failed to Add Currency', 'error', 4000)
                            } catch (error) {
                                console.log(error)
                            }
                        }
                    });
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                    console.log('Done')
                }
            )
        }
    }

    function UpdateCurrency(putData) {
        if ('Update' === mode && searchResult?.id) {
            const toastId = toast.loading("Updating Currency");
            if (putData?.isActive)
                delete putData?.isActive

            PutRequest(PutCurrency(searchResult?.id), { data: putData })
                .then(response => {
                    response.text().then(data => {
                        if ("" === data) {
                            toaster(toastId, 'Updated a Currency successfully!', 'success', 4000);

                        } else {
                            try {
                                data = JSON.parse(data);
                                toaster(toastId, data?.reason ? data?.reason : "Failed to update Currency", 'error', 4000);
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

    // const renderHistoryPreviewData = (data) => {
    //     let previewHistoryList = [];
    //     data.forEach(value => {
    //         const { currencyCode, isActive, AdddAt } = value;
    //         let resObj = {
    //             name: data?.name, code: currencyCode, status: isActive, date: DateHandler.calendarHelp(AdddAt, '-')
    //         }
    //         previewHistoryList.push(resObj)
    //         // return { name: '', data: previewHistoryList }
    //     })

    //     return { name: activeKey === 1 ? 'Details History' : '', data: previewHistoryList }
    // }

    // const handleHistoryPreview = () => {
    //     //GetCurrencyLogsByCompanyId
    //     const companyId = TestCompanyId
    //     const endpoint = activeKey === 1 ? GetCurrencyLogsByCompanyId(companyId) : null;

    //     if ('Update' === mode && endpoint) {
    //         setVisible(true);

    //         GetRequest(endpoint)
    //             .then(response => {
    //                 if (response.ok) {
    //                     response.json()
    //                         .then(data => {
    //                             setHistoryData(renderHistoryPreviewData(data.items));

    //                         });
    //                 }

    //             }).catch(err => {
    //                 console.log(err);
    //             });
    //     }
    // }

    return (
        <>
            <CRow>
            {/* <Prompt
                when={data?.isActive !== duplicateData?.isActive}
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
            /> */}
                <CCol md='1'></CCol>
                <CCol md='12'> <h5><CSLab code={`${mode} Currency`} /> </h5></CCol>
            </CRow>

            <CRow hidden={!show ? true : false}>
            <CCol md="4" xs='7'>
                    <CSAutoComplete
                        filterUrl={SearchInternalCurrencies(searchInput, pageNumber, numberOfItems, orderBy, sortOrder)}
                        //filterUrl={SearchCurrenciesByNameOrCode(searchInput)}
                        placeholder={'Search for currency by name or code'}
                        handleSelect={handleSearchResultSelect}
                        uniqueIdKey={'id'}
                        displayTextKey={'name'}
                        setInput={setSearchInput}
                        input={searchInput}
                        emptySearchFieldMessage={`Please input 3 or more characters to search`}
                        searchName={'Currency'}

                        isPaginated={true}
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
                        reset={handleReset}
                    />
                </CCol>
                <CCol md="8" className='text-right'>
                </CCol>
            </CRow>
            <CRow >
                {/* <CCol md='1'></CCol> */}

                

                <CCol md='1'></CCol>
                <CCol md="12" hidden={show}>
                    <CCard>
                        <CCardBody style={{ height: CardBodyHeight, overflowY: 'auto' }}>
                            <CRow>
                                <CCol md='4'>
                                    <CRow className={'bottom-spacing'}>
                                        <>
                                            <CCol md="5">
                                                <CLabel htmlFor="code"><CSLab code={'TL03'} /></CLabel>
                                                <CInput disabled={disabled} value={data?.code || ''} name="code" />
                                            </CCol>
                                            <CCol md="7" className="text-right">
                                                <CLabel style={{ color: '#FFF' }}><CSLab code="." /></CLabel><br />
                                                <CSCheckbox label={'Home Currency'} disabled={disabled} checked={data?.isHomeCurrency || false} name={'isHomeCurrency'} />
                                            </CCol>
                                            <CCol md="12">
                                                <CLabel htmlFor="name"><CSLab code={'TL04'} /></CLabel>
                                                <CInput disabled={disabled} value={data?.name || ''} id="name" />
                                            </CCol>
                                            <CCol md="6">
                                                <CLabel htmlFor="Symbol"><CSLab code={'Symbol'} /></CLabel>
                                                <CInput disabled={disabled} value={data?.symbol || ''} id="Symbol" />
                                            </CCol>
                                            <CCol md="6">
                                            <CLabel><CSLab code={'Status'} /></CLabel> <CSRequiredIndicator />
                                                <CSelect value={data?.isActive === false ? 'false' : 'true' || -1} disabled={data?.isHomeCurrency || false} name="isActive" onChange={handleChange}>
                                                    {
                                                        BoolStatus
                                                            .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                                    }
                                                </CSelect>
                                            </CCol>
                                        </>
                                    </CRow>
                                </CCol>

                                <CSDivider md="1" style={{ height: '100%' }} />

                                <CCol md='7'>

                                    <CRow className={'bottom-spacing'}>
                                        <CCol md='12'><CLabel className="ch-l-s" ><CSLab code={'Current Exchange Rate'} /></CLabel></CCol>
                                    </CRow>
                                    <CRow>
                                        {
                                            exhangeRate && exhangeRate.length > 0 ?
                                                exhangeRate?.map((x, i) => {
                                                    return (
                                                    <CCol md="12" style={{ marginTop: '8px' }}>
                                                        <GridComponent allowPaging={true} pageSettings={{ pageSize: 6 }} editSettings={editOptions}>
                                                            <ColumnsDirective>
                                                                <ColumnDirective field={"id"} headerText={"ID"} width='100' visible={false} />
                                                                <ColumnDirective field={'code'} isPrimaryKey={true} headerText="Code" width='50' lockColumn={true} />
                                                                <ColumnDirective field={'payPriod'} headerText="Pay Priod" editType='numericedit' format="C2" width='100' />
                                                                <ColumnDirective field={'Rate'} headerText="Rate" editType='numericedit' format="C2" width='80' />
                                                                <ColumnDirective field={'Date'} headerText="Date" editType='numericedit' format="C2" width='100' />
                                                                <ColumnDirective commands={commandOptions} headerText={"Action"} width='80' textAlign="Center" />
                                                            </ColumnsDirective>
                                                            <Inject services={[Page, Sort, Filter, Group, Edit, CommandColumn, Toolbar]} />
                                                        </GridComponent>
                                                    </CCol>
                                                   
                                                    )
                                                })

                                                : null

                                        }
                                    </CRow>

                                    {/* <CRow>
                                        {
                                            exhangeRate && exhangeRate.length > 0 ?
                                                exhangeRate?.map((x, i) => {
                                                    return (
                                                        <>
                                                            <CCol md="3">
                                                                <CLabel><CSLab code={'Code'} /></CLabel>
                                                                <CInput disabled={disabled} value={x?.quoteCode || ''} />
                                                            </CCol>
                                                            <CCol md="3">
                                                                <CLabel><CSLab code={'Pay Period'} /></CLabel>
                                                                <CInput disabled={disabled} value={'October 2021' || ''} />
                                                            </CCol>
                                                            <CCol md="3">
                                                                <CLabel><CSLab code={'Rate'} /></CLabel>
                                                                <CInput disabled={disabled} value={x?.value || ''} />
                                                            </CCol>
                                                            <CCol md="3">
                                                                <CLabel><CSLab code={'Date'} /></CLabel>
                                                                <CInput disabled={disabled} value={DateHandler.calendarHelp(x?.updateAt, '-') || ''} />
                                                            </CCol>
                                                        </>
                                                    )
                                                })

                                                : null

                                        }
                                    </CRow> */}
                                </CCol>
                            </CRow>
                        </CCardBody>
                        <CCardFooter>
                            {/* {'Update' === mode ? <CButton style={{ marginRight: 5 }} type="button" size="sm" color="success" onClick={handleHistoryPreview}><CIcon name="cil-scrubber" />
                                <CSLab code="View History" />
                            </CButton> : null} */}

                            <CButton style={{ marginRight: 5, float: 'right' }} type="button" size="sm" color="success" onClick={handleOnSubmit}><AiFillSave size={20} />
                                {'Add' === mode ? <CSLab code="TL11" /> : <CSLab code="Update" />}
                            </CButton>
                            <CButton style={{ marginRight: 5, float: 'right' }} onClick={handleReset} type="button" size="sm" color={'Add' === mode ? 'danger' : 'warning'}>
                                <AiOutlineRedo size={20} /> {'Add' === mode ? <CSLab code="TL12" /> : <CSLab code="Undo" />}
                            </CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>
                <CCol md='1'></CCol>
            </CRow>


            <CModal show={visible} size={'lg'} onClose={() => setVisible(false)} closeOnBackdrop={false}>
                <CModalHeader>
                    <CModalTitle> <CSLab code={historyData?.name} /> </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow style={{ height: '40vh', overflowY: 'auto' }}>
                        {
                            (activeKey === 1) ?
                                <CDataTable
                                    items={historyData?.data}
                                    fields={TABLEFIELDS[activeKey]}
                                    itemsPerPage={5}
                                    hover
                                    pagination
                                    scopedSlots={{
                                        code: (item) => (
                                            <td className={item.code && item.code[0] === '_' ? 'highlight-td' : ''}>
                                                {item.code}
                                            </td>
                                        ),
                                        name: (item) => (
                                            <td className={item.name && item.name[0] === '_' ? 'highlight-td' : ''}>
                                                {item.name}
                                            </td>
                                        ),
                                        status: (item) => (
                                            <td className={item.status && item.status[0] === '_' ? 'highlight-td' : ''}>
                                                {getBadge(item.status) === 'success' ? 'Active' : 'Inactive'}
                                            </td>
                                        ),
                                        AddAt: (item) => (
                                            <td>
                                                {/* {DateHandler.calendarHelp(item.date, '-') || null} */}
                                                {item.date}
                                            </td>
                                        ),
                                        id: (item, index) => (
                                            <td className="py-2">
                                                <CButton
                                                    color="primary"
                                                    variant="outline"
                                                    shape="square"
                                                    size="sm"
                                                    onClick={() => { toggleDetails(index) }}>
                                                    {activeHistory.includes(index) ? 'Hide' : 'Show'}
                                                </CButton>
                                            </td>
                                        ),
                                        details: (item, index) => {
                                            return (
                                                <CCollapse show={activeHistory.includes(index)} >
                                                    <CCardBody>
                                                        <h6 className={'text-center'}>{item?.code}</h6>
                                                        <p className="text-muted">Description: {item?.description}</p>
                                                        <p className="text-muted">Date: {item?.date}</p>
                                                    </CCardBody>
                                                </CCollapse>
                                            )
                                        }
                                    }}
                                />
                                :
                                null
                        }


                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}><CSLab code="TL50" /></CButton>
                </CModalFooter>
            </CModal>


        </>
    )
}

export default Currency;