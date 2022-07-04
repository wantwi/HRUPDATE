import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toastWarning } from "src/toasters/Toaster";
import { CustomAxios } from "src/reusable/API/CustomAxios";

import CIcon from "@coreui/icons-react";
import {
  CInputGroupAppend,
  CInputGroup,
  CInput,
  CCard,
  CCardBody,
  CFormGroup,
  CCol,
  CRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CLabel,
  CTextarea,
} from "@coreui/react";
import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  Sort,
  Edit,
  //CommandColumn
} from "@syncfusion/ej2-react-grids";
import { CardBodyHeight } from "src/reusable/utils/helper";
import { GetLabelByName } from "src/reusable/configs/config";
import {
  CSLab,
  CSAutoComplete,
  CSRequiredIndicator,
} from "../../../reusable/components";
import { AiOutlinePlus } from "react-icons/ai";
import { SearchEmployees,SearchEmployeesByNameAndProgram } from "src/reusable/API/EmployeeEndpoints";
import {
  GetRequest,
  HttpAPIRequest,
  PostRequest,
} from "src/reusable/utils/helper";

const commandOptions = [
  {
    type: "Edit",
    buttonOption: { iconCss: " e-icons e-edit", cssClass: "e-flat" },
  },
  {
    type: "Delete",
    buttonOption: { iconCss: "e-icons e-delete", cssClass: "e-flat" },
  },
  {
    type: "Save",
    buttonOption: { iconCss: "e-icons e-update", cssClass: "e-flat" },
  },
  {
    type: "Cancel",
    buttonOption: { iconCss: "e-icons e-cancel-icon", cssClass: "e-flat" },
  },
];

const editOptions = {
  allowEditing: true,
  allowAdding: true,
  allowDeleting: false,
  allowEditOnDblClick: true,
};

const EmployeeTrainingInformation = (props) => {
  const lan = useSelector((state) => state.language);

  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(false);
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfItems, setNumberOfItems] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [submitData, setSubmitData] = useState({});
  const [sortOrder, setSortOrder] = useState("");
  const [large, setLarge] = useState(false);
  const [mode, setMode] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [empDisplayName, setEmpDisplayName] = useState("");
  const [handleId, setHandleId] = useState("");
  const [viewinfo, setViewInfo] = useState([]);
  const [providerTypes, setProviderTypes] = useState([]);
  const [ailmentType, setAilmenentType] = useState([]);

  const handleSearchResultSelect = (results) => {
    console.log("show results", results);

    //setting employee display name on select of suggested item
    setEmpDisplayName(
      (prevState) => `${results.firstName} ${results.lastName}`
    );
    // testApi();
    // return;
    setMode("Add");
    setShow(false);
    dispatch({ type: "set", data: { ...results } });
    setSubmitData({ ...results });

    if (results?.code) {
      setSearchResult(results);

      GetRequest()
        .then((response) => {
          // toast.dismiss(toastId);
          if (response.ok) {
            response.json().then((response) => {
              // console.log({response});
              if (response && Object.keys(response).length > 0) {
                dispatch({ type: "set", data: { ...response } });
                setSubmitData({ ...response });
                // setDuplicateData({ ...response })
                //console.log({ response });

                //let rates = response?.rates;

                // setExchangeRate(rates);
                setShow(false);
                setMode("Update");
              } else {
                setMode("Add");
                setShow(false);
                // dispatch({ type: 'set', data: { ...results, isHomeCurrency } });
                // setSubmitData({ ...results, isHomeCurrency });
              }
            });
          }
        })
        .catch((err) => {
          // console.log(err);
          // toaster(toastId, "Failed to retrieve details", 'error', 4000);
        });
    }
  };

  const TransLabelByCode = (name) => GetLabelByName(name, lan);

  //Get employee skill details
  const getEmployeeSkills = async () => {
    try {
      const request = await CustomAxios.get(`EmployeeSkills/${handleId}`);

      const response = request.data;
      console.log("emp response:", response);
      setViewInfo((prevState) => response);
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    if (handleId !== "") {
      getEmployeeSkills();
    }
  }, [handleId]);

  useEffect(() => {
    console.log("check view info ", viewinfo);
  });

  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code=" Employee Training Information" />
          </h5>
        </CCol>
      </CRow>
      <CRow>
        <CCol md="4">
          <CFormGroup>
            <CSAutoComplete
              filterUrl={SearchEmployeesByNameAndProgram(searchInput)}
              //filterUrl=''            //filterUrl={SearchInternalCurrencies(searchInput)}
              placeholder={"Search for employee by name or code"}
              handleSelect={handleSearchResultSelect}
              //onChange={()=>handleSearchResultSelect}
              displayTextKey={"firstName"}
              setInput={setSearchInput}
              input={searchInput}
              emptySearchFieldMessage={`Please input 3 or more characters to search`}
              searchName={"Employee"}
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
              handleId={setHandleId}
              // reset={handleReset}
            />
          </CFormGroup>
        </CCol>
        <CCol md="8" className="text-right"></CCol>
        <CCol xs="12" hidden={show}>
          <CCard>
            <CCardBody style={{ height: CardBodyHeight, overflowY: "auto" }}>
              <CFormGroup row>
                <CCol md="4">
                  <b>Employee:</b>{" "}
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
                    {empDisplayName}
                  </span>
                </CCol>
                <CCol md="4">
                  {/* <CTooltip content={`Click here to view Employees`} >
                <CButton color="outline-primary"> <MdPeople /> 120 </CButton>
                </CTooltip> */}
                </CCol>
                <CCol md="4">
                  <CButton
                    color="primary"
                    style={{ float: "right" }}
                    onClick={() => {
                      setVisible(true);
                    }}
                  >
                    <AiOutlinePlus />
                    <CSLab code="HCM-YA012RXM2U-PSLL" />{" "}
                  </CButton>
                </CCol>
              </CFormGroup>
              <CCol md="12">
                <GridComponent
                  dataSource={{}}
                  allowPaging={true}
                  pageSettings={{ pageSize: 6 }}
                  editSettings={editOptions}
                >
                  <ColumnsDirective>
                    <ColumnDirective
                      field={"id"}
                      headerText={"ID"}
                      width="100"
                      visible={false}
                    />
                    <ColumnDirective
                      field={"employeeID"}
                      headerText={GetLabelByName("Employee ID")}
                      width="100"
                      visible={false}
                    />
                    <ColumnDirective
                      field={"programCode"}
                      headerText={GetLabelByName("HCM-YTBRY0XIPAH_HRPR", lan)}
                      width="100"
                    />
                    <ColumnDirective
                      field={"programName"}
                      headerText={GetLabelByName("HCM-OGH7US2WKV-LOLN", lan)}
                      width="100"
                    />
                    <ColumnDirective
                      field={"completedBy"}
                      headerText={GetLabelByName("HCM-EAHZHCC8S3F_LOLN", lan)}
                      width="100"
                    />
                    <ColumnDirective
                      commands={commandOptions}
                      headerText={GetLabelByName("HCM-F4IUJ9QVOM6", lan)}
                      width="100"
                      textAlign="Center"
                    />
                  </ColumnsDirective>
                  <Inject services={[Page, Sort, Filter, Group, Edit]} />
                </GridComponent>
              </CCol>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal
        show={visible}
        size={"lg"}
        onClose={() => setVisible(false)}
        closeOnBackdrop={false}
      >
        <CModalHeader>
          <CModalTitle>
            {" "}
            <CSLab code="HCM-YA012RXM2U-PSLL" />{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="5">
              <CLabel>
                <CSLab code="HCM-B0VG88EHYDM_KCMI" />
                <CSRequiredIndicator />
              </CLabel>
              <CInput className="" name="employeeId" />
            </CCol>
            <CCol md="5">
              <CLabel>
                <CSLab code="HCM-YTBRY0XIPAH_HRPR" />
                <CSRequiredIndicator />
              </CLabel>
              <CInput className="" name="ProgramCode" type="text" />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="5">
              <CLabel>
                <CSLab code="HCM-OGH7US2WKV-LOLN" />
                <CSRequiredIndicator />
              </CLabel>
              <CInput className="" name="programName" type="text" />
            </CCol>
            <CCol md="5">
              <CLabel>
                <CSLab code="HCM-EAHZHCC8S3F_LOLN" />
                <CSRequiredIndicator />
              </CLabel>
              <CInput className="" name="Completed By" type="text" />
            </CCol>
          </CRow>

          <CRow>
            <CCol md="10">
              <CLabel>
                <CSLab code="HCM-Z0FV0XJJ06" />
              </CLabel>
              <CTextarea
                name="note"
                style={{ height: "80px", resize: "none" }}
              ></CTextarea>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            <CSLab code="HCM-9E3ZC2E1S0N-LASN" />
          </CButton>
          <CButton color="primary">
            <CSLab code="HCM-HGUHIR0OK6T" />
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EmployeeTrainingInformation;
