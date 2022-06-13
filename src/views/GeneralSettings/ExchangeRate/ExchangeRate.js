import React, { useState, useEffect } from 'react';
import { CCol, CFormGroup, CRow } from '@coreui/react';
import { getValue } from '@syncfusion/ej2-base';
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort, Edit, CommandColumn, Toolbar } from '@syncfusion/ej2-react-grids';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CSAutoComplete, CSLab } from '../../../reusable/components';
import { GetPayPeriod, PostExchangeRate, SearchCompanyCurrenciesByName, SearchExchangeRateByCompCurrencyId } from 'src/reusable/API/CurrencyEndpoints';
import { DateHandler, GetRequest, MultipleGetRequest, PostRequest, TestCompanyId } from 'src/reusable/utils/helper';

function AddQuery(restructured, state, value, text) {
    return {
        params: {
            actionComplete: () => false,
            allowFiltering: true,
            dataSource: new DataManager(state === 'url' ? { adaptor: new WebApiAdaptor(), url: restructured } : restructured),
            fields: { text, value },
            query: new Query()
        }
    }
}

const editOptions = { allowEditing: false, allowAdding: true, allowDeleting: true, mode: 'Normal' };
const toolbarOptions = ['Add', 'Cancel'];
const commandOptions = [
    //{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
    { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } }
];

let instanceGrid = null, rowData = null;

const dateTemplate = (args) => {
    return (<DatePickerComponent value={getValue('exchangeRateDate', args)} id="exchangeRateDate" placeholder="Exchange Date" floatLabelType='Never' />)
}

export default function ExchangeRate() {
    //const lan = useSelector(state => state.language);
    const [show, setShow] = useState(false);
    const [payPeriods, setPayPeriods] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [numberOfItems, setNumberOfItems] = useState(10);
    const [orderBy, setOrderBy] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [exchangeRate, setExchangeRate] = useState([]);
    const [large, setLarge] = useState(false);
    const [gridState, setGridState] = useState(false);

    useEffect(() => {
        const urls = [GetPayPeriod(TestCompanyId)];

        if (urls) {
            MultipleGetRequest(urls)
                .then((response) => {
                    if (response && response.length === 1) {
                        if (response[0].ok) {
                            response[0].json().then(data => {
                                if (data && Object.keys(data).length > 0) {
                                    setPayPeriods(data);
                                }
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


    const handleSearchResultSelect = (results, toastId = null) => {

        if (results?.companyCurrencyId) {
            setGridState(false);
            GetRequest(SearchExchangeRateByCompCurrencyId(results?.companyCurrencyId, 1, 10, '', ''))
                .then(response => {
                    if (response.ok) {
                        response.json().then(response => {

                            setSearchResults(null);

                            if (response?.isNotEmpty) {
                                console.log(response.items)
                                let changedArray = response?.items.map((x, i) => { return { ...x, payPeriodId: x?.periodName, exchangeRateDate: new Date(x?.updateAt) } });
                                setExchangeRate(changedArray);
                                setGridState(true);
                            } else {
                                setExchangeRate([]);
                            }
                            setShow(true);
                            setSearchResults(results);
                        });
                    }
                })
                .finally(() => {

                    // This will be triggered for the Add exchange. 
                    if (toastId) {
                        toast.update(toastId, {
                            render: 'Exchange Rate Addd successfully', type: 'success', position: "top-right",
                            autoClose: 3000,
                            //delay: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            isLoading: false
                        });
                    }
                }
            )
        }
    }

    const handleActionComplete = (args) => {
        const data = args?.data;
        const eventType = args?.requestType

        switch (eventType) {
            case 'add':
                break;
            case 'save':
                rowData = { ...data, payPeriodId: payPeriods['id'], companyCurrencyId: searchResults?.companyCurrencyId, exchangeRateDate: DateHandler.formatDateForDB(data?.exchangeRateDate) };
                break;
            case 'delete':
                break;
            default:
                break;
        }
    }

    const handleCommand = (args) => {

        const type = args?.commandColumn?.type;
        const data = args?.rowData;

        switch (type) {
            case 'Save':
                setTimeout(() => {
                    AddExchangeRate(toast.loading("Creating Exchange Rate"), rowData);
                }, 50);
                break;
            case 'Delete':
                console.log({ data });
                deleteExchangeRate(toast.loading("Deleting Exchange Rate"), data?.exchangeRateId)
                break;
            default:
                break;
        }
    }

    const handleQueryCellInfo = (args) => {
        // console.log(args);
    }

    /**
     * Function to Add a new exchange rate
     * @param {React.ReactText} toastId - required
     * @param { object } rowData - required
     */
    function AddExchangeRate(toastId, rowData) {
        PostRequest(PostExchangeRate(), { data: rowData })
            .then((response) => {
                if (response.ok) {
                    response.text().then(data => {

                        if ("" === data) {
                            handleSearchResultSelect(searchResults, toastId);
                        } else {
                            toast.update(toastId, {
                                render: 'Failed to Add Exchange Rate ', type: 'error', position: "top-right",
                                autoClose: 3000,
                                //delay: 1000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                isLoading: false
                            });
                        }
                    });
                }
            })
            .catch(err => {
                console.log({ err });
                toast.update(toastId, {
                    render: 'Failed to Add Exchange Rate ', type: 'error', position: "top-right",
                    autoClose: 3000,
                    //delay: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    isLoading: false
                });
            })
        //instanceGrid.dataSource.unshift(rowData); // Add record.
        //instanceGrid.refresh(); // Refresh the Grid.
    }

     /**
     * Function to Add a new exchange rate
     * @param {React.ReactText} toastId - required
     * @param { string } exhangeRateId - required
     */
    function deleteExchangeRate(toastId, exhangeRateId){
        console.log({exhangeRateId});
        setTimeout(() => {
            toast.update(toastId, {
                render: 'Exchange Rate deleted succesfully', type: 'success', position: "top-right",
                autoClose: 3000,
                //delay: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                isLoading: false
            });
        }, 3000)
    }


    return (
        <>
            <CRow>
                <CCol>
                    <h5>{<CSLab code='Exchange Rate' />}</h5>
                </CCol>
            </CRow>
            <CRow>
                <CCol md="4">
                    <CSAutoComplete
                        filterUrl={SearchCompanyCurrenciesByName(TestCompanyId, searchInput, pageNumber, numberOfItems, orderBy, sortOrder)}
                        placeholder={'Search for GL Account by name or code'}
                        handleSelect={handleSearchResultSelect}
                        uniqueIdKey={'companyCurrencyId'}
                        displayTextKey={'name'}
                        setInput={setSearchInput}
                        input={searchInput}
                        emptySearchFieldMessage={`Please input name or code for search`}
                        searchName={'GL Account'}

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
                <CCol md="8" className='text-right'></CCol>

                <CCol md='12' hidden={!show}>
                    <CFormGroup>
                        <CRow>
                            <CCol md="6">
                                <b>Currency:</b>{" "}
                                <span
                                    style={{
                                    textDecoration: "underline dotted",
                                    cursor: "pointer",
                                    }}
                                    type="button"
                                    onClick={() => setLarge(!large)}
                                    size="md"
                                    color="primary"
                                >
                               EURO
                                </span>
                            </CCol>
                        </CRow>
                    </CFormGroup>
                    {
                        payPeriods && searchResults && gridState
                            ?
                            <GridComponent dataSource={exchangeRate} allowPaging={true} pageSettings={{ pageSize: 6 }} ref={grid => instanceGrid = grid}
                                editSettings={editOptions} toolbar={toolbarOptions} height={'350px'} actionComplete={handleActionComplete} commandClick={handleCommand}
                                queryCellInfo={handleQueryCellInfo}
                            >
                                <ColumnsDirective>
                                    <ColumnDirective field={"exchangeRateId"} headerText={"ID"} width='100' visible={false} />
                                    <ColumnDirective field={"payPeriodId"} validationRules={{ required: true, minLength: 3 }} editType='dropdownedit' headerText={"Pay Period"} width='70' edit={AddQuery([payPeriods], '', 'name', 'name')} />
                                    <ColumnDirective field={"rate"} validationRules={{ required: true, minLength: 1 }} editType='numericedit' textAlign='right' headerText={"Exchange Rate"} width='100' edit={{ params: { decimals: 2 } }} />
                                    <ColumnDirective field={"exchangeRateDate"} validationRules={{ required: true, minLength: 3 }} editType='datetimeedit' type='date' format='yMd' headerText={"Exchange Date"} width='100' editTemplate={dateTemplate} />
                                    <ColumnDirective commands={commandOptions} headerText={'Action'} width='100' textAlign="Center" />
                                </ColumnsDirective>
                                <Inject services={[Page, Sort, Filter, Group, Edit, CommandColumn, Toolbar]} />
                            </GridComponent>
                            :
                            null

                    }
                </CCol>
                <CCol md='12' style={{ height: '10px' }}></CCol>
            </CRow>
        </>
    )
}