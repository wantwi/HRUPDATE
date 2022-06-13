import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CIcon from '@coreui/icons-react';
import { CInput, CCard, CCardBody, CFormGroup, CCol, CRow, CButton, CLabel, CCardFooter, CSelect, CTabs, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CTextarea, } from '@coreui/react';
import { AiOutlinePlus, AiFillSave, AiOutlineRedo } from 'react-icons/ai';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetParamData } from "src/reusable/configs/config";

import { CSAutoComplete, CSDivider, CSLab, CSLineLabel } from 'src/reusable/components';
//import { GetLabelByName } from 'src/reusable/configs/config';
import { BoolStatus, CardBodyHeight, HttpAPIRequest, MultipleGetRequest, PostRequest, PutRequest, TestCompanyId } from 'src/reusable/utils/helper';
import { glAccountData } from 'src/views/GenericParameters/data/DataModel';
import GLComponent from 'src/views/GenericParameters/GenericParam/GLComponent';
import Loader from 'src/Loader/Loader';
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { GetAllGeneralLedgersByCompanyId, GetAllOrganizationByTypeAndCompany, GetGLAccountsByOrgId, GetLocationsByOrgId, PostOrganization, PutOrganization, SearchOrganizationByNameOrCodeUsingType } from 'src/reusable/API/EmployeeTypeEndpoint';
import { GetAllCurrencies } from 'src/reusable/API/SavingSchemeEndppoints';


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
let locationsScope = null;

const EmployeeType = (props) => {
    const data = useSelector(state => state.data);
    const lan = useSelector((state) => state.language);
    const pagename = props?.match?.url.split("/").at(-1).toLowerCase();
    const { searchPlaceholder, name, link, type, successCreate, successUpdate } =
      GetParamData(pagename, lan);
    const dispatch = useDispatch();

    const [activeKey, setActiveKey] = useState(1);
    const [show, setShow] = useState(true);
    const [visible, setVisible] = useState(false);
    const [mode, setMode] = useState('');
    const [gLAccountData, setGLAccountData] = useState([]);
    const [orgGLAccounts, setOrgGLAccounts] = useState({});
    const [orgLocations, setOrgLocations] = useState([]);
    const [locations, setLocations] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [options, setOptions] = useState({});
    const [submitData, setSubmitData] = useState({});
    const [searchResults, setSearchResults] = useState(null);
    const [disabled, setDisabled] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfItems, setNumberOfItems] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchInput, setSearchInput] = useState("");

    //const TransLabelByCode = (name) => GetLabelByName(name, lan);


    const MultipleGetRequest = async() =>{
        try {
            let requests = [HttpAPIRequest('GET', GetAllOrganizationByTypeAndCompany('LOC', TestCompanyId)), HttpAPIRequest('GET', GetAllCurrencies()), HttpAPIRequest('GET', GetAllGeneralLedgersByCompanyId(TestCompanyId))]
            

            const multipleCall  = await Promise.allSettled(requests)

            //console.log({multipleCall});
            
           setLocations([{id: 'F9475BB6-D10F-4161-9268-B6DD827A3CDF', name: `Select Locations`}, ...multipleCall[0].value])
            setCurrencies([{id: '00000000-0000-0000-0000-000000000000', name: `Select Currencies`}, ...multipleCall[1].value] );
           setGLAccountData([{id: '00000000-0000-0000-0000-000000000000', ...multipleCall[2].value}])
        } catch (error) {
            console.log(error);
        }
    }

    console.log({locations});
    console.log({currencies});
    console.log({gLAccountData});

    useEffect( () => {
       MultipleGetRequest();
        // const urls = [GetAllGeneralLedgersByCompanyId(TestCompanyId),];

        // if (urls) {
        //     MultipleGetRequest(urls)
        //         .then((response) => {
        //             if (response && response.length === 1) {
        //                 if (response[0].ok) {
        //                     response[0].json().then(data => {
        //                         setGLAccountData(data);
        //                     });
        //                 }
        //             }
        //         })
        //         .catch(err => {
        //             console.log({ err })
        //         })
        //         .finally(() => {
        //             console.log('Done');
        //         }
        //     );
        // }
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

    const handleAddNewRecord = () => {
   
        setShow(false);
        setMode("Create");
        handleReset(2);
      };

      const handleOnGLChange = (evnt) => {
        setOrgGLAccounts({ ...orgGLAccounts, [evnt?.target?.name]: evnt?.target?.value }) 
       };


    const handleLocationsSelect = () => {
        setTimeout(function () {
          setOrgLocations(
            locationsScope?.value
              ? locationsScope?.value.map((locId) => {
                  return { locationId: locId };
                })
              : []
          );
        }, 0);
      };
    
      const handleLocationsChange = (args) => {
        args.value = orgLocations.map((x) => x.locationId);
        //console.log({ locationChangeArgs: args });
      };

    const handleOnChange = (evnt) => {
        //console.log({[evnt?.target?.name]: evnt?.target?.value });
        setSubmitData(data => { return { ...data, [evnt?.target?.name]: evnt?.target?.value } })
        dispatch({ type: 'set', data: { ...data, [evnt?.target?.name]: evnt?.target?.value } });
    }      
    
      const handleSubmit = () => {
        if (!data?.code || data?.code === "") {
          toaster("", "Please enter a code", "info", 4000);
          return;
        }
    
        if (!data?.name || data?.name === "") {
          toaster("", "Please enter a name", "info", 4000);
          return;
        }
    
        if (!data?.status || data?.status === "") {
          toaster("", "Select a status", "info", 4000);
          return;
        }
    
        let status = data?.status ? JSON.parse(data?.status) : false;
        let postObject = {...submitData, companyId: TestCompanyId,type,status,orgGLAccounts,orgLocations,};
        console.log(postObject);
    
        //"Create" === mode ? createEmployeeType(postObject) : updateEmployeeType(postObject);
      };


      const handleReset = (type = 1) => {
        if ("Create" === mode && type === 1) {
          setSubmitData({});
          setOrgGLAccounts({});
          setOrgLocations([]);
          dispatch({ type: 'set', data: {} });
          //setMode(mode => mode);
          setSearchInput("");
    
          // This will clear any selected locations in the multi select
          if (locationsScope && locationsScope?.value?.length > 0) {
            locationsScope.value = null;
            locationsScope.text = null;
          }
        }
        if ("Update" === mode && searchResults?.id && type === 1) {
          setSubmitData(searchResults);
          setOrgGLAccounts({});
          setOrgLocations([]);
          dispatch({ type: 'set', data: {...searchResults} });
        }
    
        if (type === 2) {
          setMode("Create");
          dispatch({ type: 'set', data: {} });
          setSubmitData({});
          setOrgGLAccounts({});
          setOrgLocations([]);
          setSearchInput("");
        }
      };

      const searchReset = () => {
        //setDetails({});
        setOrgGLAccounts({});
        setOrgLocations([]);
        //setMode(mode => mode);
        setSearchInput("");
        setShow(true);
    
        // // This will clear any selected locations in the multi select
        // if (locationsScope && locationsScope?.value?.length > 0) {
        //   locationsScope.value = null;
        //   locationsScope.text = null;
        // }
      };

    function createEmployeeType(postObject) {

        if ('Create' === mode) {
            const toastId = toast.loading("Creating Employee Type");
            //setDisabled(true);
            PostRequest(PostOrganization(), { data: postObject })
                .then(response => {
                    response.text().then(response => {
                        if ("" === response) {
                            toaster(toastId, 'Created a Employee Type successfully!', 'success', 4000);
                            handleReset(2);
                        } else {
                            try {
                                response = JSON.parse(response);
                                toaster(toastId, response?.reason ? response?.reason : "Failed to create Employee Type", 'error', 4000);
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

    function updateEmployeeType(putObject) {
        if ('Update' === mode && searchResults?.id) {
            const toastId = toast.loading("Updating Employee Type");
            //setDisabled(true);
            if (putObject?.isActive)
                delete putObject?.isActive

            PutRequest(PutOrganization(searchResults?.id), { data: putObject })
                .then(response => {
                    response.text().then(response => {
                        //console.log(response);

                        if ("" === response) {
                            toaster(toastId, 'Updated a Employee Type successfully!', 'success', 4000);
                            handleReset(2);
                        } else {
                            try {
                                response = JSON.parse(response);
                                toaster(toastId, response?.reason ? response?.reason : "Failed to update Employee Type", 'error', 4000);
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
            <CRow>
                <CCol xs="12"><h5><CSLab code={mode + " Employee Type"} /></h5></CCol>
            </CRow >
            <CRow style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}>
                <CCol md="4" xs='7'>
                    <CSAutoComplete
                        filterUrl={SearchOrganizationByNameOrCodeUsingType (TestCompanyId, type,searchInput )}
                        placeholder={searchPlaceholder}
                        handleSelect={handleSearchResultSelect}
                        uniqueIdKey={"id"}
                        displayTextKey={"name"}
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
                        mode={mode}
                        setMode={setMode}
                        reset={searchReset}
                    />
                </CCol>
                <CCol md="8" xs='5' className='text-right'>
                    <CFormGroup>
                        <CButton type="button" disabled={mode === "Create"} onClick={handleAddNewRecord} size="sm" color="primary"><AiOutlinePlus /> {show ? <CSLab code={"Add "} /> : null}{" "}</CButton>
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
                                                            <CLabel> <CSLab code={'Select Status'} /></CLabel>
                                                            <CSelect name="status" value={data?.status || -1} onChange={handleOnChange}>
                                                                {
                                                                    BoolStatus
                                                                        .map((x, i) => <option key={i} value={x.id}>{x.name}</option>)
                                                                }
                                                            </CSelect>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol>
                                                            <CLabel><CSLab code="Description" /></CLabel>
                                                            <CTextarea value={data?.description || ''} name="description" style={{ height: '80px' }} onChange={handleOnChange}></CTextarea>
                                                        </CCol>
                                                    </CRow>
                                                </CCol>

                                                <CSDivider style={{ height: '100%' }} md='1' />
                                                {/* Applicables */}
                                                <CCol md="5" >
                                                    <CRow>
                                                        <CCol md='12'>
                                                            <>
                                                                <CLabel htmlFor="name">
                                                                <CSLab code="Locations" />
                                                                </CLabel> 
                                                                {/* <MultiSelectComponent
                                                                // ref={(scope) => {
                                                                // if (scope) locationsScope = scope;
                                                                // }}
                                                                id="defaultelement"
                                                                 dataSource={locations} 
                                                                 mode="CheckBox" 
                                                                 fields={{ text: 'name', value: 'id' }} placeholder="Select Locations"
                                                                  showSelectAll={true} 
                                                                  showDropDownIcon={true}                                                                
                                                                 >
                                                                      <Inject services={[CheckBoxSelection]}/>
                                                                 </MultiSelectComponent> */}
                                                                 
                                                                {/* <DropDownTreeComponent
                                                                close={handleLocationsSelect}
                                                                change={handleLocationsChange}
                                                                dataSource={[{id: "088f01b8-6c78-40af-984a-4f3ea99c96f6",name: "Ghana Cedis"}]}
                                                               fields= {{ text: 'name', value: 'id' }}
                                                                placeholder={"Select Location"}
                                                                showCheckBox={true}
                                                                name="locations"
                                                                id={"dropdowntree"}
                                                                showSelectAll={true}
                                                                selectAllText={"Select all locations"}
                                                                unSelectAllText={"Unselect all locations"}
                                                                /> */}
                                                            </>
                                                        </CCol>
                                                        {/* <CCol md='12'>
                                                        <MultiSelectComponent id="checkbox" ref={(scope) => {locationsScope = scope; }} 
                                                            dataSource={locations} 
                                                            fields={{text: 'name', value: 'id' }}  
                                                            mode="CheckBox"
                                                           // placeholder="Select Location(s)"
                                                            showSelectAll={true}
                                                            showDropDownIcon={true}
                                                            popupHeight="default"
                                                            >
                                                            <Inject services={[CheckBoxSelection]}/>
                                                        </MultiSelectComponent>
                                                        </CCol> */}
                                                        <CCol md='12'>
                                                        
                                                            <MultiSelectComponent 
                                                            id="checkbox"
                                                             dataSource={locations}
                                                              placeholder="Select a Location"
                                                              mode="CheckBox"
                                                              showSelectAll={true}
                                                              fields={{text: 'name', value: 'id' }} 
                                                              >
                                                                   <Inject services={[CheckBoxSelection]}/>
                                                                  </MultiSelectComponent>
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
                            {"Update" === mode ? (<CButton style={{ marginRight: 5 }} type="button"size="sm"color="success" ><CIcon name="cil-scrubber" />     <CSLab code="View History" />
                            </CButton>
                            ) : null}
                            <CButton style={{ marginRight: 5, float: "right" }} type="button" size="sm" color="success" onClick={handleSubmit}><AiFillSave size={20} />{"Create" === mode ? (
                                <CSLab code="TL11" />
                            ) : (<CSLab code="Update" />)}
                            </CButton>
                            <CButton style={{ marginRight: 5, float: "right" }} onClick={() => handleReset(1)} type="button" size="sm" color={"Create" === mode ? "danger" : "warning"}>
                            {" "}
                            <AiOutlineRedo size={20} />{" "}
                            {"Create" === mode ? (
                                <CSLab code="TL12" />) : (<CSLab code="Undo" />)}
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

export default EmployeeType;