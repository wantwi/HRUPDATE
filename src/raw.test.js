import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

import CIcon from '@coreui/icons-react';
import { CCard, CCardBody, CFormGroup, CCol, CRow, CTabs, CButton, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CCardFooter, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CLabel, CListGroupItem, CListGroup, CCollapse, CDataTable } from '@coreui/react';
import { AiOutlinePlus, AiFillSave, AiOutlineRedo } from 'react-icons/ai';
import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort, Edit, CommandColumn, Toolbar } from '@syncfusion/ej2-react-grids';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';

import { CSAutoComplete, CSDivider, CSLab } from 'src/reusable/components';
import { Locations } from '../../../reusable/utils/GenericData';
import { GetParamData } from 'src/reusable/configs/config';
import { CardBodyHeight, TestCompanyId, PostRequest, GetRequest, MultipleGetRequest, PutRequest, DateHandler } from 'src/reusable/utils/helper';
import {
    PostOrganization, GetAllOrganizationByTypeAndCompany, GetAllSalaryGrades, SearchOrganizationByNameOrCodeUsingType, GetLocationsByOrgId, PutOrganization, GetGLAccountsByOrgId, GetOrgGLAccountsHistoryByOrgId,
    GetOrgDetailsByOrgId, GetEarningsByOrgId, GetDeductionsByOrgId, GetOrgDetailsHistoryByOrgId, GetOrgEarningsHistoryByOrgId, GetOrgDeductionsHistoryByOrgId, GetAllDeductionsByCompanyId,
    GetAllEarningsByCompanyId, GetAllGeneralLedgersByCompanyId, GetAllCurrenciesByCompanyId
} from 'src/reusable/API/OrgEndpoints';

import '../../../scss/_custom_table.scss';
import '../../../scss/_custom_multi_select.scss';
import Loader from 'src/Loader/Loader';

import DetailsComponent from './DetailsComponent';
import GLComponent from './GLComponent'

const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
const toolbarOptions = ['Add', 'Cancel'];

const commandOptions = [
    { type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
    { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } }
];

function createQuery(restructured, state) {
    return {
        params: {
            actionComplete: () => false,
            allowFiltering: true,
            dataSource: new DataManager(state === 'url' ? { adaptor: new WebApiAdaptor(), url: restructured } : restructured),
            fields: { text: "name", value: "id" },
            query: new Query()
        }
    }
}

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

//setHistoryData(x => {return {...x, name: activeKey === 1 ? 'Details History' : activeKey === 2 ? 'General Ledger History' : activeKey === 3 ? 'Earning History' : activeKey === 4 ? 'Deduction History' : '', data}});
const TABLEFIELDS = {
    1: [{ key: 'code', label: 'Code' }, { key: 'name', label: 'Name' }, { key: 'status', label: 'Status' }, { key: 'createAt', label: 'Date' }, { key: 'id', label: 'Show' }],
    2: [{ key: 'salaryGL', label: 'Salary' }, { key: 'incomeTaxGL', label: 'Income Tax' }, { key: 'netSalaryPayableGL', label: 'Net Salary Payable' }, { key: 'operatingOvertimeGL', label: 'Operating Overtime' }, { key: 'id', label: 'Show' }],
    3: [],
    4: []
}

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

// Variables declaration
let locationsScope = null;

const GenericParameter = (props) => {

    const lan = useSelector(state => state?.language);
    const reduxData = useSelector(state => state?.data);
    const dispatch = useDispatch();

    const pagename = props?.match?.url.split('/').at(-1).toLowerCase();
    const { searchPlaceholder, addLabel, name, link, type, successCreate, successUpdate } = GetParamData(pagename, lan);

    const [show, setShow] = useState(true);
    const [activeKey, setActiveKey] = useState(1);
    const [details, setDetails] = useState({});
    const [orgGLAccounts, setOrgGLAccounts] = useState({});
    const [gLAccountData, setGLAccountData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [parentData, setParentData] = useState([]);
    const [locations, setLocations] = useState(null);
    const [orgLocations, setOrgLocations] = useState([]);
    const [mode, setMode] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [earning, setEarning] = useState(null);
    const [deduction, setDeduction] = useState(null);
    const [currencies, setCurrencies] = useState(null);
    const [isEarningDeductionReady, setIsEarningDeductionReady] = useState(false);
    const [visible, setVisible] = useState(false);
    const [historyData, setHistoryData] = useState({ name: '', data: null });
    const [activeHistory, setActiveHistory] = useState([]);
    const [undoData, setUndoData] = useState({ details: null, generalLedger: null, deductions: null, earnings: null, locations: null });
    const [multiSelectState, setMultiSelectState] = useState(false);


    const [pageNumber, setPageNumber] = useState(1);
    const [numberOfItems, setNumberOfItems] = useState(10);
    const [orderBy, setOrderBy] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {

        async function fetchPopulation(type, name) {
            const urls = [];

            type = ['position', 'employeetype'].includes(pagename) ? 'LOC' : type;

            if (!['location'].includes(pagename)) urls.push(GetAllOrganizationByTypeAndCompany(type, TestCompanyId));
            if (pagename === 'position') urls.push(GetAllSalaryGrades(TestCompanyId), GetAllDeductionsByCompanyId(TestCompanyId), GetAllEarningsByCompanyId(TestCompanyId), GetAllCurrenciesByCompanyId(TestCompanyId));
            if (pagename) urls.push(GetAllGeneralLedgersByCompanyId(TestCompanyId))

            setLoading(true);
            setIsEarningDeductionReady(false);

            if (urls) {
                MultipleGetRequest(urls)
                    .then((response) => {
                        setMultiSelectState(false);
                        // All GL Accounts
                        if (response && response.length === 1) {
                            if (response[0].ok) {
                                response[0].json().then(response => {
                                    if (response) {
                                        setGLAccountData(response);
                                    }
                                });
                            }
                        }

                        // All Parents
                        if (response && response.length === 2) {

                            if (response[0].ok) {
                                response[0].json().then(response => {
                                    if (['position', 'employeetype'].includes(pagename)) {
                                        Locations.dataSource = (response && response?.length > 0) ? response : [];
                                        setLocations(Locations);
                                    } else {
                                        setParentData([{ id: '00000000-0000-0000-0000-000000000000', name: `Select ${name}` }, ...response]);
                                    }
                                });
                            }

                            // All GL Accounts
                            if (response[1].ok) {
                                response[1].json().then(response => {
                                    if (response) {
                                        setGLAccountData(response);
                                    }
                                });
                            }
                        }

                        if (response && response.length === 6) {

                            // All Locations
                            if (response[0].ok) {
                                response[0].json().then(response => {
                                    if (['position', 'employeetype'].includes(pagename)) {
                                        Locations.dataSource = (response && response?.length > 0) ? response : [];
                                        setLocations(Locations);
                                    } else {
                                        setParentData([{ id: '00000000-0000-0000-0000-000000000000', name: `Select ${name}` }, ...response]);
                                    }
                                });
                            }

                            // All Salary Grade
                            if (response[1].ok) {
                                response[1].json().then(response => {
                                    if (response) {
                                        if (response) {
                                            let data = [{ id: '00000000-0000-0000-0000-000000000000', name: `Select ${name}` }, ...response]
                                            setParentData(data);
                                        }
                                    }
                                });
                            }

                            // All Earnings
                            if (response[2].ok) {
                                response[2].json().then(response => {
                                    if (response) {
                                        const restructured = response.map(x => { return { id: x.id, name: x.name } });
                                        setDeduction(createQuery(restructured, ''));
                                    }
                                });
                            }

                            // All Deductions
                            if (response[3].ok) {
                                response[3].json().then(response => {
                                    if (response) {
                                        const restructured = response.map(x => { return { id: x.id, name: x.name } });
                                        setEarning(createQuery(restructured, ''));
                                    }
                                });
                            }

                            // All Currencies
                            if (response[4].ok) {
                                response[4].json().then(response => {
                                    if (response) {
                                        const restructured = response.map(x => { return { id: x.id, name: x.name } });
                                        setCurrencies(createQuery(restructured, ''));
                                        // setGLAccountData(response);
                                    }
                                });
                            }

                            // All GL Accounts
                            if (response[5].ok) {
                                response[5].json().then(response => {
                                    if (response) {
                                        setGLAccountData(response);
                                    }
                                });
                            }
                        }

                        setMultiSelectState(true);
                    })
                    .catch(err => {
                        console.log({ err })
                        Locations.dataSource = []
                        setLocations(Locations);
                        toaster('', `Failed to load ${name}`, 'warn', 3000);
                    })
                    .finally(() => {
                        setLoading(false);
                        setIsEarningDeductionReady(true);
                    });
            }
        }

        fetchPopulation(link.type, link.name);

    }, [pagename, link?.name, link?.type, setDeduction, setEarning, setIsEarningDeductionReady, setMultiSelectState]);



    const onDetailsChange = (evnt) => {
        setDetails({ ...details, [evnt?.target?.name]: evnt?.target?.value });
        dispatch({ type: 'set', data: { ...reduxData, details: { ...reduxData?.details, [evnt?.target?.name]: evnt?.target?.value } } });
    };

    const onGLChange = (evnt) => {
        setOrgGLAccounts({ ...orgGLAccounts, [evnt?.target?.name]: evnt?.target?.value });
        dispatch({ type: 'set', data: { ...reduxData, orgGLAccounts: { ...reduxData?.orgGLAccounts, [evnt?.target?.name]: evnt?.target?.value } } });
    };

    const handleReset = () => {

        if ('Create' === mode) {

            setMultiSelectState(true);

            setDetails({});
            setOrgGLAccounts({});
            setOrgLocations([]);
            setSearchInput('');
            dispatch({ type: 'set', data: {details: {}, orgGLAccounts: {}, orgLocations: [], orgDeductions: [], orgEarnings: [] } });

            // This will clear any selected locations in the multi select
            if (locationsScope && locationsScope?.value?.length > 0) {
                locationsScope.value = null;
                locationsScope.text = null;
            }
        }

        if ('Update' === mode) {

            setMultiSelectState(false);
            setMultiSelectState(true);

            if (undoData?.details) {
                setDetails(x => { return { ...x, ...undoData?.details } });
                dispatch({ type: 'set', data: { ...reduxData, details: {...undoData?.details} } });
            }

            if (undoData?.generalLedger) {
                setOrgGLAccounts(x => { return { ...x, ...undoData?.generalLedger } });
                dispatch({ type: 'set', data: { ...reduxData, orgGLAccounts: {...undoData?.generalLedger} } });
            }

            if (undoData?.locations) {

                setOrgLocations(undoData?.locations);
                dispatch({ type: 'set', data: { ...reduxData, orgLocations: [...undoData?.locations] } });

                setTimeout(() => {

                    // This will clear any selected locations in the multi select
                    if (locationsScope && locationsScope?.value?.length > 0) {
                        locationsScope.text = null;
                        locationsScope.value = undoData?.locations.map(x => x.locationId);
                        locationsScope?.dataBind();
                    }
                }, 100);


            }

        }

    };

    const handleAddNewRecord = () => {
        handleReset();
        setSearchResults(null)
        setShow(false);
        setSearchInput('');
        setMode('Create');
    }

    const handleSubmit = () => {

        if (!details?.code || details?.code === '') {
            toaster('', 'Please enter a code', 'info', 4000);
            return;
        }

        if (!details?.name || details?.name === '') {
            toaster('', 'Please enter a name', 'info', 4000);
            return;
        }

        if (!details?.status || details?.status === '') {
            toaster('', 'Select a status', 'info', 4000);
            return;
        }

        let status = details?.status ? JSON.parse(details?.status) : false;
        let postObject = { ...details, companyId: TestCompanyId, type, status, orgGLAccounts, orgLocations };

        console.log(postObject);

        'Create' === mode ? createOrg(postObject) : updateOrg(postObject);
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

    /**
    * Triggered when a location selected in the tree dropdown.
    */
    const handleLocationsSelect = () => {

        setTimeout(function () {
            setOrgLocations(locationsScope?.value ? locationsScope?.value.map(locId => { return { locationId: locId } }) : []);
            dispatch({ type: 'set', data: { ...reduxData, orgLocations: locationsScope?.value ? locationsScope?.value.map(locId => { return { locationId: locId } }) : [] } });
        }, 0);
    }

    const handleLocationsChange = (args) => {
        args.value = orgLocations.map(x => x.locationId);
    }

    const handleSearchResultSelect = (results) => {
        setSearchResults(results);
        const toastId = toast.loading("Retrieving details ");

        const orgId = results?.id
        const endpoint = activeKey === 1 ? GetOrgDetailsByOrgId(orgId) : activeKey === 2 ? GetGLAccountsByOrgId(orgId) : activeKey === 3 ? GetEarningsByOrgId(orgId) : activeKey === 4 ? GetDeductionsByOrgId(orgId) : null;

        const urls = [];

        if (['employeetype', 'position'].includes(pagename) && activeKey === 1) {
            urls.push(GetLocationsByOrgId(orgId), endpoint)
        } else {
            if (activeKey === 1) {
                urls.push(endpoint);
            }
        }

        if (activeKey === 2) {
            urls.push(endpoint);
        }

        if (['position'].includes(pagename) && activeKey === 3) {
            // Earning
            urls.push(endpoint);
        }

        if (['position'].includes(pagename) && activeKey === 4) {
            // Deduction
            urls.push(endpoint);
        }

        MultipleGetRequest(urls)
            .then((response) => {
                if (response && response.length === 2 && activeKey === 1) {
                    if (response[0].ok) {
                        setMultiSelectState(false);

                        response[0].json().then(response => {
                            setMultiSelectState(true);
                            if (response && response.length > 0) {
                                setOrgLocations(response);
                                dispatch({ type: 'set', data: { ...reduxData, orgLocations: [...response] } });
                                setUndoData(x => { return { ...x, locations: response } });
                                locationsScope.text = '';
                                locationsScope.value = response.map(x => x.locationId);
                                locationsScope?.dataBind();
                            }
                        });
                    }

                    if (response[1].ok) {
                        response[1].json().then(response => {
                            setDetails(response);
                            dispatch({ type: 'set', data: { ...reduxData, details: {...response} } });
                            setUndoData(x => { return { ...x, details: response } });
                        });
                    }

                    if (response[0].ok && response[1].ok) {
                        setShow(false);
                        setMode('Update');
                        toast.dismiss(toastId);
                    }
                }

                if (response && response.length === 1 && activeKey === 1) {
                    if (response[0].ok) {
                        response[0].json().then(response => {
                            setDetails(response);
                            dispatch({ type: 'set', data: { ...reduxData, details: {...response} } });
                            setUndoData(x => { return { ...x, details: response } });
                            setShow(false);
                            setMode('Update');
                            toast.dismiss(toastId);
                        });
                    }
                }

                if (response && response.length === 1 && activeKey === 2) {
                    if (response[0].ok) {
                        response[0].json().then(response => {
                            setOrgGLAccounts(response);
                            dispatch({ type: 'set', data: { ...reduxData, orgGLAccounts: {...response} } });
                            setUndoData(x => { return { ...x, generalLedger: response } });
                            setShow(false);
                            setMode('Update');
                            toast.dismiss(toastId);
                        });
                    }
                }

                if (response && response.length === 1 && activeKey === 3) {
                    if (response[0].ok) {
                        response[0].json().then(response => {
                            toast.dismiss(toastId);
                            if (response) {
                                setUndoData(x => { return { ...x, earnings: response } });
                            }
                        });
                    }
                }

                if (response && response.length === 1 && activeKey === 4) {
                    if (response[0].ok) {
                        response[0].json().then(response => {
                            toast.dismiss(toastId);
                            if (response) {
                                setUndoData(x => { return { ...x, deductions: response } });
                            }
                        });
                    }
                }

            })
            .catch(err => {
                console.log({ err });
                toaster(toastId, `Failed to retrieve details!`, 'error', 3000);
            }).finally(() => {
                //toast.dismiss(toastId);
                console.log({reduxData});
            });
    }

    /** Function called when creating org */
    function createOrg(postObject) {
        // Create segment
        if ('Create' === mode) {
            const toastId = toast.loading("Creating " + name);
            setDisabled(true);
            PostRequest(PostOrganization(), { data: postObject })
                .then(response => {
                    response.text().then(response => {

                        if ("" === response) {
                            toaster(toastId, successCreate, 'success', 4000);
                            handleAddNewRecord();
                        } else {
                            try {
                                response = JSON.parse(response);
                                toaster(toastId, response?.reason ? response?.reason : "Failed to create " + name, 'error', 4000);
                            } catch (error) {

                            }
                        }
                    });
                })
                .catch(err => {
                    console.log({ err })
                })
                .finally(() => {
                    console.log('Done');
                    setDisabled(false);
                });
        }
    }

    /** Function called when updating org */
    function updateOrg(postObject) {
        if ('Update' === mode && searchResults?.id) {
            const toastId = toast.loading("Updating " + name);
            setDisabled(true);
            PutRequest(PutOrganization(searchResults?.id), { data: { ...postObject } })
                .then(response => {
                    if (!response.ok) {
                        toaster(toastId, "Failed to update " + name, 'error', 4000);
                    }

                    response.text().then(response => {

                        if ("" === response) {
                            toaster(toastId, successUpdate, 'success', 4000);
                            handleAddNewRecord();
                        }
                    });
                })
                .catch(err => {
                    console.log({ err });
                })
                .finally(() => {
                    //console.log('Done');
                    setDisabled(false);
                });
        } else {
            console.log(searchResults, mode)
        }
    }

    const handleTabSwitch = (number) => {

        if ('Create' === mode) setActiveKey(number);

        const orgId = searchResults?.id
        const endpoint = number === 1 ? GetOrgDetailsByOrgId(orgId) : number === 2 ? GetGLAccountsByOrgId(orgId) : number === 3 ? GetEarningsByOrgId(orgId) : number === 4 ? GetDeductionsByOrgId(orgId) : null;

        if ('Update' === mode && endpoint) {
            const toastId = toast.loading("Retrieving details ");

            const urls = [];

            if (['employeetype', 'position'].includes(pagename) && number === 1) {
                urls.push(GetLocationsByOrgId(orgId), endpoint)
            } else {
                if (number === 1) {
                    urls.push(endpoint);
                }
            }

            if (number === 2) {
                urls.push(endpoint);
            }

            if (['position'].includes(pagename) && number === 3) {
                // Earning
                urls.push(endpoint);
            }

            if (['position'].includes(pagename) && number === 4) {
                // Deduction
                urls.push(endpoint);
            }

            MultipleGetRequest(urls)
                .then((response) => {
                    if (response && response.length === 2 && number === 1) {
                        if (response[0].ok) {
                            response[0].json().then(response => {
                                if (response && response.length > 0) {
                                    setOrgLocations(response);
                                    dispatch({ type: 'set', data: { ...reduxData, orgLocations: {...response} } });
                                    setUndoData(x => { return { ...x, locations: response } });
                                    locationsScope.text = '';
                                    locationsScope.value = response.map(x => x.locationId);
                                    locationsScope?.dataBind();
                                }
                            });
                        }

                        if (response[1].ok) {
                            response[1].json().then(response => {
                                setDetails(response);
                                dispatch({ type: 'set', data: { ...reduxData, details: {...response} } });
                                setUndoData(x => { return { ...x, details: response } });
                                setActiveKey(number);
                            });
                        }

                        if (response[0].ok && response[1].ok) {
                            setShow(false);
                            setActiveKey(number);
                            toast.dismiss(toastId);
                        }
                    }

                    if (response && response.length === 1 && number === 1) {
                        if (response[0].ok) {
                            response[0].json().then(response => {
                                setDetails(response);
                                dispatch({ type: 'set', data: { ...reduxData, details: {...response} } });
                                setUndoData(x => { return { ...x, details: response } });
                                setShow(false);
                                setActiveKey(number);
                                toast.dismiss(toastId);
                            });
                        }
                    }

                    if (response && response.length === 1 && number === 2) {
                        if (response[0].ok) {
                            response[0].json().then(response => {
                                setOrgGLAccounts(response);
                                dispatch({ type: 'set', data: { ...reduxData, orgGLAccounts: response } });
                                setUndoData(x => { return { ...x, generalLedger: response } });
                                setShow(false);
                                setActiveKey(number);
                                toast.dismiss(toastId);
                            });
                        }
                    }

                    if (response && response.length === 1 && number === 3) {
                        if (response[0].ok) {
                            response[0].json().then(response => {
                                toast.dismiss(toastId);
                                if (response) {
                                    setActiveKey(number);
                                    console.log({ earning: response });
                                }
                            });
                        }
                    }

                    if (response && response.length === 1 && number === 4) {
                        if (response[0].ok) {
                            response[0].json().then(response => {
                                toast.dismiss(toastId);
                                if (response) {
                                    setActiveKey(number);
                                    console.log({ deduction: response });
                                }
                            });
                        }
                    }


                })
                .catch(err => {
                    console.log({ err });
                    toaster(toastId, `Failed to retrieve details!`, 'error', 3000);
                }).finally(() => {
                    //toast.dismiss(toastId);
                })
        }

    }

    const handleHistoryPreview = () => {

        const orgId = searchResults?.id
        const endpoint = activeKey === 1 ? GetOrgDetailsHistoryByOrgId(orgId) : activeKey === 2 ? GetOrgGLAccountsHistoryByOrgId(orgId) : activeKey === 3 ? GetOrgEarningsHistoryByOrgId(orgId) : activeKey === 4 ? GetOrgDeductionsHistoryByOrgId(orgId) : null;

        if ('Update' === mode && endpoint) {
            setVisible(true);

            GetRequest(endpoint)
                .then(response => {
                    if (response.ok) {
                        response.json()
                            .then(data => {
                                setHistoryData(x => { return { ...x, name: activeKey === 1 ? 'Details History' : activeKey === 2 ? 'General Ledger History' : activeKey === 3 ? 'Earning History' : activeKey === 4 ? 'Deduction History' : '', data } });
                            });
                    }

                }).catch(err => {
                    console.log(err);
                });
        }
    }

    return (

        <>
            <CRow>
                <CCol xs="12"><h5>{mode} {name}</h5></CCol>
            </CRow>

            <CRow style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}} >
                <CCol md="4" xs='7'>
                    <CSAutoComplete
                        filterUrl={SearchOrganizationByNameOrCodeUsingType(TestCompanyId, type, searchInput)}
                        placeholder={searchPlaceholder}
                        handleSelect={handleSearchResultSelect}
                        uniqueIdKey={'id'}
                        displayTextKey={'name'}
                        setInput={setSearchInput}
                        input={searchInput}
                        emptySearchFieldMessage={`Please input ${pagename} name or code for search`}
                        searchName={pagename}
                        isPaginated={false}
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
                        <CButton type="button" onClick={handleAddNewRecord} size="sm" color="primary"> <AiOutlinePlus /> {show ? addLabel : null} </CButton>
                    </CFormGroup>
                </CCol>

                <CCol xs="12" hidden={show}>
                    <CTabs>
                        <CCard>
                            <CCardBody style={{ height: CardBodyHeight, overflowY: 'auto' }}>
                                {
                                    !loading ?
                                        <>

                                            <CNav variant="tabs">
                                                <CNavItem>
                                                    <CNavLink href="#" onClick={() => handleTabSwitch(1)} active={activeKey === 1}>
                                                        <CSLab code="TL01" />
                                                    </CNavLink>
                                                </CNavItem>
                                                <CNavItem>
                                                    <CNavLink href="#" onClick={() => handleTabSwitch(2)} active={activeKey === 2} >
                                                        <CSLab code="TL02" /></CNavLink>
                                                </CNavItem>

                                                {
                                                    pagename && pagename === 'position' ?
                                                        (
                                                            <>
                                                                <CNavItem>
                                                                    <CNavLink href="#" active={activeKey === 3}
                                                                        onClick={() => handleTabSwitch(3)}><CSLab code="Earning" /></CNavLink>
                                                                </CNavItem>
                                                                <CNavItem>
                                                                    <CNavLink href="#" active={activeKey === 4}
                                                                        onClick={() => handleTabSwitch(4)}><CSLab code="Deduction" /></CNavLink>
                                                                </CNavItem>
                                                            </>
                                                        ) :
                                                        null
                                                }

                                            </CNav>

                                            <CTabContent>

                                                {/* Details */}
                                                <CTabPane style={{ marginTop: '10px' }} visible={activeKey === 1 ? 'true' : 'false'}>
                                                    <CRow>
                                                        {/* Details */}
                                                        <DetailsComponent onDetailsChange={onDetailsChange} pagename={pagename} details={details} parentData={parentData} link={link} />

                                                        {
                                                            pagename && (pagename === 'employeetype' || pagename === 'position') ?
                                                                (
                                                                    <CSDivider md='1' />
                                                                ) : null
                                                        }

                                                        {/* Applicables */}
                                                        <CCol md="6">

                                                            <CRow>
                                                                <CCol md="12">
                                                                    {
                                                                        pagename && (pagename === 'employeetype' || pagename === 'position') ?
                                                                            (
                                                                                <>
                                                                                    <CLabel htmlFor="name"><CSLab code='Locations' /></CLabel>
                                                                                    {
                                                                                        multiSelectState ?
                                                                                            <DropDownTreeComponent
                                                                                                ref={(scope) => {
                                                                                                    if (scope) locationsScope = scope;
                                                                                                }}
                                                                                                close={handleLocationsSelect}
                                                                                                change={handleLocationsChange}
                                                                                                fields={locations}
                                                                                                placeholder={'Select Location'}
                                                                                                showCheckBox={true}
                                                                                                name='locations'
                                                                                                id={'dropdowntree'}
                                                                                                showSelectAll={true}
                                                                                                selectAllText={'Select all locations'}
                                                                                                unSelectAllText={'Unselect all locations'} />
                                                                                            :
                                                                                            <Loader />
                                                                                    }

                                                                                </>
                                                                            ) : null
                                                                    }

                                                                </CCol>
                                                            </CRow>
                                                        </CCol>
                                                    </CRow>
                                                </CTabPane>

                                                {/* General Ledger */}
                                                <CTabPane visible={activeKey === 2 ? 'true' : 'false'} style={{ marginTop: '10px' }}>
                                                    {
                                                        gLAccountData ?
                                                            <GLComponent orgGLAccounts={orgGLAccounts} onGLChange={onGLChange} data={gLAccountData} />
                                                            :
                                                            <Loader />}
                                                </CTabPane>

                                                {/* Earning tab [Position] */}
                                                <CTabPane style={{ marginTop: '10px' }} visible={activeKey === 3 ? 'true' : 'false'}>
                                                    <CRow>
                                                        {
                                                            (isEarningDeductionReady && earning && currencies) ?
                                                                <CCol md="12">
                                                                    <>
                                                                        <GridComponent dataSource={{}} allowPaging={true} pageSettings={{ pageSize: 6 }} editSettings={editOptions} toolbar={toolbarOptions}>
                                                                            <ColumnsDirective>
                                                                                <ColumnDirective field={"id"} headerText={"ID"} width='100' visible={false} />
                                                                                <ColumnDirective field={"earning"} editType='dropdownedit' headerText={"Earning"} width='100' edit={earning} />
                                                                                <ColumnDirective field={"currency"} editType='dropdownedit' headerText={"Currency"} width='100' edit={currencies} />
                                                                                <ColumnDirective field={"calculationRule"} headerText={"Calculation Rule"} width='100' />
                                                                                <ColumnDirective field={"maximumAmount"} headerText={"Maximum Amount"} width='100' />
                                                                                <ColumnDirective commands={commandOptions} headerText={'Action'} width='100' textAlign="Center" />
                                                                            </ColumnsDirective>
                                                                            <Inject services={[Page, Sort, Filter, Group, Edit, CommandColumn, Toolbar]} />
                                                                        </GridComponent>
                                                                    </>
                                                                </CCol>
                                                                :
                                                                <Loader />
                                                        }
                                                    </CRow>
                                                </CTabPane>

                                                {/* Deduction tab [Position] */}
                                                <CTabPane style={{ marginTop: '10px' }} visible={activeKey === 4 ? 'true' : 'false'}>
                                                    <CRow>
                                                        {
                                                            (isEarningDeductionReady && deduction && currencies) ?
                                                                <CCol md="12">
                                                                    <>
                                                                        <GridComponent dataSource={{}} allowPaging={true} pageSettings={{ pageSize: 6 }} editSettings={editOptions} toolbar={toolbarOptions}>
                                                                            <ColumnsDirective>
                                                                                <ColumnDirective field={"id"} headerText={"ID"} width='100' visible={false} />
                                                                                <ColumnDirective field={"deduction"} editType='dropdownedit' headerText={"Deduction"} width='100' edit={deduction} />
                                                                                <ColumnDirective field={"currency"} headerText={"Currency"} width='100' editType='dropdownedit' edit={currencies} />
                                                                                <ColumnDirective field={"calculationRule"} headerText={"Calculation Rule"} width='100' />
                                                                                <ColumnDirective field={"maximumAmount"} headerText={"Maximum Amount"} width='100' />
                                                                                <ColumnDirective commands={commandOptions} headerText={'Action'} width='100' textAlign="Center" />
                                                                            </ColumnsDirective>
                                                                            <Inject services={[Page, Sort, Filter, Group, Edit, CommandColumn, Toolbar]} />
                                                                        </GridComponent>
                                                                    </>
                                                                </CCol>
                                                                :
                                                                <Loader />
                                                        }
                                                    </CRow>
                                                </CTabPane>

                                            </CTabContent>

                                        </>

                                        :
                                        <Loader />
                                }
                            </CCardBody>

                            <CCardFooter>
                                {'Update' === mode ? <CButton style={{ marginRight: 5 }} type="button" size="sm" color="success" onClick={handleHistoryPreview}><CIcon name="cil-scrubber" />
                                    <CSLab code="View History" />
                                </CButton> : null}

                                <CButton style={{ marginRight: 5, float: 'right' }} type="button" size="sm" color="success" onClick={handleSubmit}><AiFillSave size={20} />
                                    {'Create' === mode ? <CSLab code="TL11" /> : <CSLab code="Update" />}
                                </CButton>

                                <CButton style={{ marginRight: 5, float: 'right' }} onClick={handleReset} type="button" size="sm" color={'Create' === mode ? 'danger' : 'warning'}>
                                    <AiOutlineRedo size={20} /> {'Create' === mode ? <CSLab code="TL12" /> : <CSLab code="Undo" />}
                                </CButton>

                            </CCardFooter>
                        </CCard>
                    </CTabs>
                </CCol>
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
                                        createAt: (item) => (
                                            <td>
                                                {DateHandler.calendarHelp(item.createAt, '-') || null}
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
                                                        <p className="text-muted">Date: {item?.createAt}</p>
                                                    </CCardBody>
                                                </CCollapse>
                                            )
                                        }
                                    }}
                                />
                                : (activeKey === 2) ?
                                    <CDataTable
                                        items={historyData?.data}
                                        fields={TABLEFIELDS[activeKey]}
                                        itemsPerPage={5}
                                        hover
                                        pagination
                                        scopedSlots={{
                                            createAt: (item) => (
                                                <td>
                                                    {DateHandler.calendarHelp(item.createAt, '-') || null}
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

                                                            <CRow>
                                                                <CCol md={6}>
                                                                    <h6>GL Setting</h6>
                                                                    <CListGroup>
                                                                        <CListGroupItem>Salary: {item?.salaryGL || 'Not available'}</CListGroupItem>
                                                                        <CListGroupItem>Income Tax: {item?.incomeTaxGL || 'Not available'}</CListGroupItem>
                                                                        <CListGroupItem>Net Salary Payable: {item?.netSalaryPayableGL || 'Not available'}</CListGroupItem>
                                                                        <CListGroupItem>Operating Overtime: {item?.operatingOvertimeGL || 'Not available'}</CListGroupItem>
                                                                        <CListGroupItem>Shift Allowance: {item?.shiftAllowanceGL || 'Not available'}</CListGroupItem>
                                                                        <CListGroupItem>Tax Relief: {item?.taxReliefGL || 'Not available'}</CListGroupItem>
                                                                    </CListGroup>
                                                                </CCol>

                                                                <CCol md={6}>
                                                                    <h6>Mandatory Saving Schemes</h6>
                                                                    <CListGroup>
                                                                        <CListGroupItem>Salary: {item?.salaryGL || 'Not available'}</CListGroupItem>
                                                                        <CListGroupItem>Income Tax: {item?.incomeTaxGL || 'Not available'}</CListGroupItem>
                                                                        <CListGroupItem>Net Salary Payable: {item?.netSalaryPayableGL || 'Not available'}</CListGroupItem>
                                                                    </CListGroup>
                                                                    <h6>Voluntary Saving Schemes</h6>
                                                                    <CListGroup>
                                                                        <CListGroupItem>Salary: {item?.salaryGL || 'Not available'}</CListGroupItem>
                                                                        <CListGroupItem>Income Tax: {item?.incomeTaxGL || 'Not available'}</CListGroupItem>
                                                                        <CListGroupItem>Net Salary Payable: {item?.netSalaryPayableGL || 'Not available'}</CListGroupItem>
                                                                    </CListGroup>
                                                                </CCol>
                                                            </CRow>

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

export default GenericParameter
