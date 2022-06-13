import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSelect, CInput, CCard, CCardBody, CFormGroup, CCol, CRow, CButton, CLabel, CCardFooter, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, } from '@coreui/react';
import { AiOutlinePlus, AiFillSave, AiOutlineRedo,AiOutlineClose } from 'react-icons/ai';
import CIcon from '@coreui/icons-react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {ColumnDirective,ColumnsDirective,Filter,GridComponent,Group,Inject,Page,Sort,Edit,CommandColumn,Toolbar} from '@syncfusion/ej2-react-grids';

import { CSAutoComplete, CSDivider, CSLab, CSRequiredIndicator } from 'src/reusable/components';
import { BoolStatus, CardBodyHeight, GetRequest, HttpAPIRequest, PostRequest, PutRequest, TestCompanyId } from 'src/reusable/utils/helper';
import { GetAllCurrencies, GetAllEmployeeTypes, GetNotchSize, GetSalaryGradeDetailsBySalaryGradeId, PostSalaryGrade, PutSalaryGrade, SearchSalaryGradesByNameOrCode } from 'src/reusable/API/SalaryGradeEndpoint';


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

const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: false, allowEditOnDblClick: true };
//const toolbarOptions = ['Add', 'Cancel'];

const commandOptions = [
    { type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
    { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } }
];

let instanceGrid = null;


const SalaryGrade = () => {
    const data = useSelector(state => state.data);
    const dispatch = useDispatch();

    const [show, setShow] = useState(true);
    const [mode, setMode] = useState('')
    const [searchInput, setSearchInput] = useState('');
    const [visible, setVisible] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [employeeTypes, setEmployeeTypes] = useState([]);
    const [notches, setNotches] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [numberOfItems, setNumberOfItems] = useState(10);
    const [orderBy, setOrderBy] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [submitData, setSubmitData] = useState({});
    const [notchSize, setNotchSize] = useState(0);

    const renderNotches = (data) => {

        let items = [];
        for (var x = 0; x < data.size; x++) {
            let dataObj = { index: `${x + 1}`, name: 'textName',  amount: null }
            items.push(dataObj);           
        }
        return items
    }

    const MultipleGetRequest = async() =>{
        try {
        // useEffect(() => {
            let requests = [HttpAPIRequest('GET',GetAllCurrencies(TestCompanyId)), HttpAPIRequest('GET', GetAllEmployeeTypes(TestCompanyId)), HttpAPIRequest('GET', GetNotchSize())]
            const multipleCall = await Promise.allSettled(requests);
    
            setCurrencies([{id: '00000000-0000-0000-0000-000000000000', name: `Select Currencies`}, ...multipleCall[0].value] );
            setEmployeeTypes([{id: '00000000-0000-0000-0000-000000000000', name: `Select Employee Type`}, ...multipleCall[1].value])
            setNotchSize(multipleCall[2].value);
    
        } catch (error) {
            console.log(error);
        }
    }


useEffect(() =>{
    MultipleGetRequest();
}, []);

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

        if (!submitData?.salaryType || submitData?.salaryType === '') {
            toaster('', 'Select salary type', 'info', 3000);
            return;
        }
        if (!submitData?.employeeTypeId || submitData?.employeeTypeId === '') {
            toaster('', 'Select employee type', 'info', 3000);
            return;
        }

        if (!submitData?.minimumSalary || submitData?.minimumSalary === '') {
            toaster('', 'Enter minimum salary', 'info', 3000);
            return;
        }
        if (!submitData?.maximumSalary || submitData?.maximumSalary === '') {
            toaster('', 'Enter maximum salary', 'info', 3000);
            return;
        }
        if (!submitData?.isActive || submitData?.isActive === '') {
            toaster('', 'Select status', 'info', 3000);
            return;
        }

        let isActive = submitData?.isActive ? JSON.parse(submitData?.isActive) : false;
        let currentData = { ...submitData, isActive, companyId: TestCompanyId, notches: instanceGrid?.dataSource };
        'Add' === mode ? AddSalaryGrade(currentData) : updateSalaryGrade(currentData);
    }

    const handleOnChange = (evnt) => {
        setSubmitData({ ...data, [evnt?.target?.name]: evnt?.target?.value });
        dispatch({ type: 'set', data: { ...data, [evnt?.target?.name]: evnt?.target?.value } });
    }

    const handleAddNewRecord = () => {
        setMode('Add');
        setShow(false);
       // handleReset(2);
    }
  
    const searchReset = () => {
        setShow(true);
        setSearchInput('');
        handleReset(2)
    }

    const handleReset = (type = 1) => {

        if ('Add' === mode && type === 1) {
            dispatch({ type: 'set', data: {} });
            setSubmitData({});
            setSearchInput('');
            setSearchResult('')
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
            //setNotchSize(0)
            setNotches(renderNotches(notchSize))
        }
    }

  

    const handleSearchResultSelect = (results) => {
        if (results?.id) {
            setSearchResult(results);
            const toastId = toast.loading("Retrieving Details");

            GetRequest(GetSalaryGradeDetailsBySalaryGradeId(results?.id))
                .then((response) => {
                    toast.dismiss(toastId);

                    if (response.ok) {
                        response.json().then(response => {
                               //console.log(response);
                            if (response && Object.keys(response).length > 0) {
                                //console.log(response.notches);
                                response = response.hasOwnProperty('noches') ? { ...response, notches: response.noches.map((x, index) => { return { index: `${index + 1}`, ...x }})}
                                    : { ...response, notches: response.notches.map((x, index) => { return { index: `${index + 1}`, ...x } }) }

                                dispatch({ type: 'set', data: { ...results } });
                                setSubmitData({ ...results });
                                setShow(false);
                                setMode('Update');
                                setNotches(response.notches)

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
                }
            )
        }
    }

    function AddSalaryGrade(postData) {
        //Add segment
        if ('Add' === mode) {
            const toastId = toast.loading("Creating salary grade ")
            PostRequest(PostSalaryGrade(), { data: postData })
                .then(response => {
                    response.text().then(data => {
                        if ("" === data) {
                            toaster(toastId, 'Salary Grade Addd successfully', 'success', 4000);
                            handleReset(2);
                        } else {
                            try {
                                data = JSON.parse(data);
                                toaster(toastId, data?.reason ? data?.reason : 'Failed to Add Salary Grade', 'error', 4000)
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


    function updateSalaryGrade(putData) {
        if ('Update' === mode && searchResult?.id) {
            const toastId = toast.loading("Updating Salary Grade");
            if (putData?.noches) delete putData?.noches

            //console.log({putData, URL: PutSalaryGrade(searchResult?.id) + ')'})
            PutRequest(PutSalaryGrade(searchResult?.id), { data: putData })
                .then(response => {
                    response.text().then(response => {
                        console.log(response);

                        if ("" === response) {
                            toaster(toastId, 'Updated a Salary Grade successfully!', 'success', 4000);
                            handleReset(2);
                        } else {
                            try {
                                response = JSON.parse(response);
                                toaster(toastId, response?.reason ? response?.reason : "Failed to update Salary Grade", 'error', 4000);
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
                    setDisabled(true)
                }
            );
        }
    }

    return (
        <>
            <CRow>
                <CCol md='1'></CCol>
                <CCol xs="12"><h5><CSLab code={mode + " Salary grade"} /></h5></CCol>
            </CRow>
            <CRow hidden={!show ? true : false}>
            <CCol md="4" xs='7'>
                    <CSAutoComplete
                        filterUrl={SearchSalaryGradesByNameOrCode(TestCompanyId, searchInput, pageNumber, numberOfItems, orderBy, sortOrder)}
                        placeholder={'Search for GL Account by name or code'}
                        handleSelect={handleSearchResultSelect}
                        uniqueIdKey={'id'}
                        displayTextKey={'name'}
                        setInput={setSearchInput}
                        input={searchInput}
                        emptySearchFieldMessage={`Please input three or more characters to  search`}
                        searchName={'Salary Grade'}

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
                        reset={searchReset}
                    />
                </CCol>
                <CCol md="8" xs='5' className='text-right'>
                    <CFormGroup>
                        <CButton type="button" onClick={handleAddNewRecord} size="sm" color="primary"> <AiOutlinePlus /> {show ? <CSLab code={'Add'} /> : null} </CButton>
                    </CFormGroup>
                </CCol>
            </CRow>
            <CRow style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}>
               

                <CCol xs="12" hidden={show}>
                    <CCard>
                        <CCardBody style={{ height: CardBodyHeight, overflowY: 'auto' }}>
                            <CRow>
                                <CCol md="6">
                                    <CRow>
                                        <CCol md="4">
                                            <CLabel><CSLab code={'Code'} /></CLabel> <CSRequiredIndicator />
                                            <CInput name="code" value={data?.code || ''} onChange={handleOnChange} />
                                        </CCol>
                                        <CCol md="8"><CLabel><CSLab code={'Name'} /></CLabel> <CSRequiredIndicator />
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
                                            <CLabel><CSLab code={'Salary Type'} /></CLabel><CSRequiredIndicator />
                                            <CSelect name="salaryType" value={data?.salaryType || -1} onChange={handleOnChange}>
                                                {
                                                    ['Select Type', 'Hourly', 'Daily', 'Weekly', 'Monthly', 'Annually'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                                }
                                            </CSelect>
                                        </CCol>
                                        <CCol md="4">
                                            <CLabel><CSLab code={'Employee Type'} /></CLabel><CSRequiredIndicator />
                                            <CSelect name="employeeTypeId" value={data?.employeeTypeId || -1} onChange={handleOnChange}>
                                                {
                                                    employeeTypes
                                                        .map((x, y) => <option key={y} value={x.id}>{x.name}</option>)
                                                }
                                            </CSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className={'bottom-spacing'}>
                                        <CCol md="4">
                                            <CLabel><CSLab code={'Minimum Salary'} /></CLabel><CSRequiredIndicator />
                                            <CInput name="minimumSalary" type="number" value={data?.minimumSalary || ''} style={{ textAlign: "right" }} onChange={handleOnChange} />
                                        </CCol>
                                        <CCol md="4">
                                            <CLabel><CSLab code={'Maximum Salary'} /></CLabel><CSRequiredIndicator />
                                            <CInput name="maximumSalary" type="number" value={data?.maximumSalary || ''} style={{ textAlign: "right" }} onChange={handleOnChange} />
                                        </CCol>
                                        <CCol md="4">
                                            <CLabel><CSLab code={'Status'} /></CLabel><CSRequiredIndicator />
                                            <CSelect name="isActive" value={data?.isActive || -1} onChange={handleOnChange}>
                                                {
                                                    BoolStatus
                                                        .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                                }
                                            </CSelect>
                                        </CCol>
                                    </CRow>
                                </CCol>
                                
                                <CSDivider md="1" style={{ height: '100%' }} />

                                <CCol md="5">
                                    {notches ?
                                        <CCol md="12" style={{ marginTop: '8px' }}>
                                            <GridComponent dataSource={notches} ref={(grid) => instanceGrid = grid} allowPaging={true} pageSettings={{ pageSize: 6 }} editSettings={editOptions}>
                                                <ColumnsDirective>
                                                    <ColumnDirective field={"id"} headerText={"ID"} width='100' visible={false} />
                                                    <ColumnDirective field={'index'} isPrimaryKey={true} headerText="Notch" width='50' lockColumn={true} />
                                                    <ColumnDirective field={'amount'} headerText="Amount"  editType='numericedit'  width='60' />
                                                    <ColumnDirective commands={commandOptions} headerText={"Action"} width='80' textAlign="Center" />
                                                </ColumnsDirective>
                                                <Inject services={[Page, Sort, Filter, Group, Edit, CommandColumn, Toolbar]} />
                                            </GridComponent>
                                        </CCol>
                                        : null
                                    }
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


            <CModal show={visible} size={'lg'} onClose={() => setVisible(false)} closeOnBackdrop={false}>
                <CModalHeader>
                    <CModalTitle> <CSLab code='Add GL Account' /> </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <>
                        <CRow>
                            <CCol md="6">
                                <CLabel><CSLab code='Code' /></CLabel>
                                <CInput id="glCode" />
                            </CCol>
                            <CCol md="6">
                                <CLabel><CSLab code='Name' /></CLabel>
                                <CInput id="glName" />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol md="6">
                                <CLabel><CSLab code='GL Account' /></CLabel>
                                <CSelect>
                                    {
                                        ['Select GL Account', 'GL 1', 'GL 2'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                    }
                                </CSelect>
                            </CCol>
                        </CRow>
                    </>

                </CModalBody>
                <CModalFooter>
                   
                    <CButton color="secondary" onClick={() => setVisible(false)}> <CSLab code="TL50" /> </CButton>
                    <CButton color="primary"><CSLab code="TL11" /></CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default SalaryGrade;