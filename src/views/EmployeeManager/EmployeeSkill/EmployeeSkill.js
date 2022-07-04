import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SearchEmployees } from "src/reusable/API/EmployeeEndpoints";
import { CustomAxios } from "src/reusable/API/CustomAxios";
import { toast } from "react-toastify";
import { toastWarning } from "src/toasters/Toaster";

import {
  GetRequest,
  HttpAPIRequest,
  PostRequest,
} from "src/reusable/utils/helper";

import CIcon from "@coreui/icons-react";
import {
  CInputGroupAppend,
  CInputGroup,
  CInput,
  CCard,
  CCardBody,
  CFormGroup,
  CForm,
  CCol,
  CRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CLabel,
  CSelect,
  CTextarea,
  CCardHeader,
} from "@coreui/react";
import { AiOutlinePlus } from "react-icons/ai";

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
  CommandColumn,
} from "@syncfusion/ej2-react-grids";

import "../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-react-grids/styles/material.css";

import { GetLabelByName } from "src/reusable/configs/config";
import { CSLab } from "../../../reusable/components";
import { CardBodyHeight } from "src/reusable/utils/helper";
import {
  CSCheckbox,
  CSLineLabel,
  CSAutoComplete,
  CSRequiredIndicator,
} from "../../../reusable/components";
import {
  GetEmployeeSkillsTypes,
  PostEmployeeSkill,
} from "src/reusable/API/EmployeeSkillsEndPoints";
import { CCardGroup } from "@coreui/bootstrap-react";

const editOptions = {
  allowEditing: false,
  allowAdding: false,
  allowDeleting: false,
  allowEditOnDblClick: false,
};
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

const EmployeeSkill = (props) => {
  const lan = useSelector((state) => state.language);
  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(false);
  const [skill, setSkill] = useState("");

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
  const [educationCore, setEducationCore] = useState([]);
  const [empDisplayName, setEmpDisplayName] = useState("");
  const [handleId, setHandleId] = useState("");
  const [viewinfo, setViewInfo] = useState([]);
  const [skillType, setSkillType] = useState([]);

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

  //Drop down list for hobby types
  const MultipleGetRequests = async () => {
    try {
      let request = [HttpAPIRequest("GET", GetEmployeeSkillsTypes())];
      const multipleCall = await Promise.allSettled(request);
      console.log(multipleCall[0].value);

      setSkillType([
        { id: "-1", name: `Select Skill` },
        ...multipleCall[0].value,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    MultipleGetRequests();
  }, []);

  //Handles Submit
  const handleOnSubmit = () => {
    console.log("submit data ", submitData);

    if (!submitData?.skillTypeId || submitData?.skillTypeId === "") {
      toast.error("Please Select a Skill Type!", toastWarning);
      return;
    }
    if (!submitData?.description || submitData?.description === '') {
        toast.error('Please Enter Description!', toastWarning);
        return;
    }
    // console.log(submitData)
    let employeeId = submitData.id;
    //  let newData = { ...submitData, option: options, companyId: TestCompanyId };
    let newData = {
      ...submitData,
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      CompanyReference: "00001_A01",
      employeeId,
    };
    //let finalData = JSON.stringify(newData)
    // console.log(finalData)
    // 'Add' === mode ? AddGLAccount(newData) : updateGLAccount(newData);
    postEmployeeSkill(newData);
  };

  //Post Employee Skill
  function postEmployeeSkill(data) {
    console.log("post data", data);
    PostRequest(PostEmployeeSkill(), { data: data })
      .then((response) => {
        
        response.text().then((data) => {
         
          if ("" == data) {
            toast.success('Employee Skill Added Successfully!',);
            console.log("success");
          } else {
            try {
              data = JSON.parse(data);
               toast.error(data?.reason ? data?.reason : "Failed to Add Employee Skill", 'error', 400);
            } catch (error) {
              console.log(error);
            }
          }
        });
      })
      .catch((err) => {
        console.log({ err });
      })
      .finally(() => {
        console.log("Done");
      });
  }
  const handleOnChange = (evnt) => {
    //console.log(evnt)
    setSubmitData((data) => {
      return { ...data, [evnt?.target?.name]: evnt?.target?.value };
    });
    dispatch({
      type: "set",
      data: { ...data, [evnt?.target?.name]: evnt?.target?.value },
    });
  };

  console.log(" skiltype", skillType);
  const canSave = [skill].every(Boolean);

  const TransLabelByCode = (name) => GetLabelByName(name, lan);
  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-GW2XDSAH46_LASN" />
          </h5>
        </CCol>
      </CRow>
      <CRow>
        <CCol md="4">
          <CFormGroup>
            <CSAutoComplete
              filterUrl={SearchEmployees(searchInput)}
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
            <CCardHeader>
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
                    <CSLab code="HCM-NUIZ7RTQ2AD_KCMI" />{" "}
                  </CButton>
                </CCol>
              </CFormGroup>

            </CCardHeader>

            <CForm action="" method="post">
              <>
                <GridComponent
                  height={500}
                  dataSource={viewinfo}
                  allowPaging={true}
                  pageSettings={{ pageSize: 10 }}
                  editSettings={editOptions}
                >
                  <ColumnsDirective>
                    <ColumnDirective
                      field={""}
                      headerText={"ID"}
                      width="100"
                      visible={false}
                    />
                    <ColumnDirective
                      field={"employee.firstName"}
                      headerText={GetLabelByName("HCM-VD1B12NKKJ_LANG", lan)}
                      width="100"
                    />

                    <ColumnDirective
                      field={"skillType.name"}
                      headerText={GetLabelByName("HCM-P29OOIV9P7_PSLL", lan)}
                      width="100"
                    />
                    <ColumnDirective
                      commands={commandOptions}
                      headerText={GetLabelByName("HCM-F4IUJ9QVOM6", lan)}
                      width="100"
                      textAlign="Center"
                    />
                  </ColumnsDirective>
                  <Inject
                    services={[
                      Page,
                      Sort,
                      Filter,
                      Group,
                      Edit,
                      CommandColumn,
                    ]}
                  />
                </GridComponent>
              </>
            </CForm>

          </CCard>
        </CCol>
      </CRow>

      <CModal
        show={visible}
        size={"md"}
        onClose={() => setVisible(false)}
        closeOnBackdrop={false}
      >
        <CModalHeader>
          <CModalTitle>
            {" "}
            <CSLab code="HCM-NUIZ7RTQ2AD_KCMI" />{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className={"bottom-spacing"}>
            <>
              {/* <CCol md="4">
                <CLabel htmlFor="Name">
                  <CSLab code="Name" />
                </CLabel>
                <CInput type="text" id="Name" />
              </CCol> */}
              <CCol md="12">
                <CLabel htmlFor="Skiil">
                  <CSLab code="HCM-P29OOIV9P7_PSLL" />
                  <CSRequiredIndicator />
                </CLabel>
                <CSelect
                  name="skillTypeId"
                  value={data?.skillTypeId || -1}
                  onChange={handleOnChange}
                >
                  {skillType.map((x, i) => (
                    <option key={i} value={x.id}>
                      {x.name}
                    </option>
                  ))}
                </CSelect>
              </CCol>
              {/* <CCol md="4">
                <CLabel htmlFor="phonenumber">
                  <CSLab code="Phone Number" />
                </CLabel>
                <CInput id="phonenumber" input="text" />
              </CCol> */}
            </>
          </CRow>
          <CRow className={"bottom-spacing"}>
            <CCol md="12">
              <CLabel htmlFor="description">
                <CSLab code="HCM-Z0FV0XJJ06" />
              </CLabel>
              <CTextarea
                name="description"
                value={data?.description || ""}
                onChange={handleOnChange}
                style={{ height: "60px", resize: "none" }}
              />
            </CCol>
          </CRow>
          {/* <CRow className={"bottom-spacing"}>
            <CCol md="4">
              <CLabel htmlFor="email">
                <CSLab code="Email" />
              </CLabel>
              <CInput id="email" input="text" />
            </CCol>
            <CCol md="4">
              <CLabel htmlFor="Occupation">
                <CSLab code="Occupation" />
              </CLabel>
              <CInput id="Occupation" input="text" />
            </CCol>
            <CCol md="4">
              <CLabel htmlFor="Nationality">
                <CSLab code="Nationality" />
              </CLabel>
              <CSelect>
                {[
                  "Select Nationality",
                  "Afghan",
                  "British",
                  "Canadian",
                  "Danish",
                  "Ghanaian",
                ].map((x, i) => (
                  <option key={i} value={x}>
                    {x}
                  </option>
                ))}
              </CSelect>
            </CCol>
          </CRow> */}
          {/* <CRow className={"bottom-spacing"}>
            <>
              <CCol md="4">
                <CLabel htmlFor="Nationality">
                  <CSLab code="Nationality" />
                </CLabel>
                <CSelect>
                  {[
                    "Select Nationality",
                    "Afghan",
                    "British",
                    "Canadian",
                    "Danish",
                    "Ghanaian",
                  ].map((x, i) => (
                    <option key={i} value={x}>
                      {x}
                    </option>
                  ))}
                </CSelect>
              </CCol>
            </>
          </CRow> */}
          {/* <CRow className={"bottom-spacing"}>
            <CCol md="8">
              <CLabel>
                <CSLab code="Address" />
              </CLabel>
              <CTextarea
                name="Address"
                style={{ height: "60px", resize: "none" }}
              ></CTextarea>
            </CCol>
          </CRow> */}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            <CSLab code="HCM-V3SL5X7PJ9C-LANG" />
          </CButton>
          <CButton
            // style={{ cursor: !canSave ? "not-allowed" : "pointer" }}
            //disabled={!canSave}
            onClick={() => {
              setVisible(false);
              handleOnSubmit();
            }}
            color="primary"
          >
            <CSLab code="HCM-HGUHIR0OK6T" />
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EmployeeSkill;
