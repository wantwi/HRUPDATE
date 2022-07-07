import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toastWarning } from "src/toasters/Toaster";
import { CustomAxios } from "src/reusable/API/CustomAxios";
import CSTrainingInformation from "src/reusable/components/CSTrainingInformation/CSTrainingInformation";

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
  CCardHeader,
  CForm,
  CSelect,
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
  CommandColumn,
} from "@syncfusion/ej2-react-grids";
import { CardBodyHeight } from "src/reusable/utils/helper";
import { GetLabelByName } from "src/reusable/configs/config";
import {
  CSLab,
  CSAutoComplete,
  CSRequiredIndicator,
  CSAutoCompleteTraInfo,
} from "../../../reusable/components";
import { AiOutlinePlus } from "react-icons/ai";
import {
  SearchEmployees,
  SearchEmployeesByNameAndProgram,
} from "src/reusable/API/EmployeeEndpoints";
import {
  GetRequest,
  HttpAPIRequest,
  PostRequest,
} from "src/reusable/utils/helper";
import {
  PostProgramInfo,
  GetPrograms,
} from "src/reusable/API/TrainingInformationEndPoint";

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
  const [program, setProgram] = useState([]);

  const handleSearchResultSelect = (results) => {
    console.log("show results", results);

    //setting employee display name on select of suggested item
    setEmpDisplayName((prevState) => `${results.name}`);
    // testApi();
    // return;
    setMode("Add");
    setShow(false);
    dispatch({ type: "set", data: { ...results } });
    setSubmitData({ ...results });

    if (results?.code) {
      setSearchResult(results);

      // GetRequest()
      //   .then((response) => {
      //     // toast.dismiss(toastId);
      //     if (response.ok) {
      //       response.json().then((response) => {
      //         // console.log({response});
      //         if (response && Object.keys(response).length > 0) {
      //           dispatch({ type: "set", data: { ...response } });
      //           setSubmitData({ ...response });
      //           // setDuplicateData({ ...response })
      //           //console.log({ response });

      //           //let rates = response?.rates;

      //           // setExchangeRate(rates);
      //           setShow(false);
      //           setMode("Update");
      //         } else {
      //           setMode("Add");
      //           setShow(false);
      //           // dispatch({ type: 'set', data: { ...results, isHomeCurrency } });
      //           // setSubmitData({ ...results, isHomeCurrency });
      //         }
      //       });
      //     }
      //   })
      // .catch((err) => {
      //   // console.log(err);
      //   // toaster(toastId, "Failed to retrieve details", 'error', 4000);
      // });
    }
  };
  console.log({ submitData });

  const TransLabelByCode = (name) => GetLabelByName(name, lan);

  const MultipleGetRequests = async () => {
    try {
      let request = [HttpAPIRequest("GET", GetPrograms())];
      const multipleCall = await Promise.allSettled(request);
      console.log(multipleCall[0].value);

      setProgram([
        { id: "-1", name: `Select Program` },
        ...multipleCall[0].value,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    MultipleGetRequests();
  }, []);

  // Get employee skill details
  const getProgramById = async () => {
    try {
      const request = await CustomAxios.get(
        `EmployeeTraining/Program/${handleId}`
      );

      const response = request.data;
      console.log("emp response:", response);
      setViewInfo([response]);
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    if (handleId !== "") {
      getProgramById();
    }
  }, [handleId]);
  console.log(handleId);

  //Handles Submit
  const handleOnSubmit = () => {
    console.log("submit data ", submitData);

    if (!submitData?.skillTypeId || submitData?.skillTypeId === "") {
      toast.error("Please Select a Skill Type!", toastWarning);
      return;
    }
    if (!submitData?.description || submitData?.description === "") {
      toast.error("Please Enter Description!", toastWarning);
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
    postProgramInfo(newData);
  };
  console.log({ viewinfo });
  //Post Employee Skill
  function postProgramInfo(data) {
    console.log("post data", data);
    PostRequest(PostProgramInfo(), { data: data })
      .then((response) => {
        response.text().then((data) => {
          if ("" == data) {
            toast.success("Program Added Successfully!");
            console.log("success");
          } else {
            try {
              data = JSON.parse(data);
              toast.error(
                data?.reason ? data?.reason : "Failed to Add Program",
                "error",
                400
              );
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
            <CSTrainingInformation
              filterUrl={SearchEmployeesByNameAndProgram(searchInput)}
              //filterUrl=''            //filterUrl={SearchInternalCurrencies(searchInput)}
              placeholder={"Search for employee by name or code"}
              handleSelect={handleSearchResultSelect}
              //onChange={()=>handleSearchResultSelect}
              displayTextKey={"name"}
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
              programIdGet={getProgramById}
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
                  <b>Program:</b>{" "}
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
            </CCardHeader>

            <CForm action="" method="post">
              <GridComponent
                dataSource={viewinfo}
                height={500}
                allowPaging={true}
                pageSettings={{ pageSize: 10 }}
                editSettings={editOptions}
              >
                <ColumnsDirective>
                  <ColumnDirective
                    field="id"
                    headerText="ID"
                    width="100"
                    visible={false}
                  />
                  <ColumnDirective
                    field="name"
                    headerText={GetLabelByName("HCM-OGH7US2WKV-LOLN", lan)}
                    width="100"
                  />
                  <ColumnDirective
                    field="code"
                    headerText={GetLabelByName("HCM-YTBRY0XIPAH_HRPR", lan)}
                    width="100"
                  />

                  {/* <ColumnDirective
                    field="completedBy"
                    headerText={GetLabelByName("HCM-EAHZHCC8S3F_LOLN", lan)}
                    width="100"
                  /> */}
                  {/* <ColumnDirective
                    commands={commandOptions}
                    headerText={GetLabelByName("HCM-F4IUJ9QVOM6", lan)}
                    width="100"
                    textAlign="Center"
                  /> */}
                </ColumnsDirective>
                <Inject
                  services={[Page, Sort, Filter, Group, Edit, CommandColumn]}
                />
              </GridComponent>
            </CForm>
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
              <CSelect
                name="programId"
                value={data?.programId || -1}
                onChange={handleOnChange}
              >
                {program.map((x, i) => (
                  <option key={i} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </CSelect>
            </CCol>
            <CCol md="5">
              <CLabel>
                <CSLab code="HCM-K85NF9HWVXC-LANG" />
                <CSRequiredIndicator />
              </CLabel>
              <CInput className="" name="startDate" type="date" />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="5">
              <CLabel>
                <CSLab code="HCM-S4N9DCXVMJ" />
                <CSRequiredIndicator />
              </CLabel>
              <CInput className="" name="endDate" type="date" />
            </CCol>
            <CCol md="5">
              <CLabel>
                <CSLab code="HCM-EAHZHCC8S3F_LOLN" />
                <CSRequiredIndicator />
              </CLabel>
              <CInput className="" name="createTraningEmployees" type="text" />
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
          <CButton
            color="primary"
            onClick={() => {
              setVisible(false);
              handleOnSubmit();
            }}
          >
            <CSLab code="HCM-HGUHIR0OK6T" />
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EmployeeTrainingInformation;
