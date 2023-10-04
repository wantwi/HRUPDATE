import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SearchEmployees } from "src/reusable/API/EmployeeEndpoints";
import { CustomAxios } from "src/reusable/API/CustomAxios";
import { toast } from "react-toastify";
import { toastWarning } from "src/toasters/Toaster";
import CIcon from "@coreui/icons-react";
import {
  CCard,
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
  CTextarea,
  CCardHeader,
  CCardFooter,
} from "@coreui/react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
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
import {
  CSAutoComplete,
  CSRequiredIndicator,
} from "../../../reusable/components";

import useFetch from "src/hooks/useFetch";
import usePost from "src/hooks/usePost";
import { DeleteEmployeeHometown, GetEmployeeHometownId, PostEmployeeHometown } from "src/reusable/API/EmployeeHometownEndpoints";
import useDelete from "src/hooks/useDelete";
import SweetAlert from "react-bootstrap-sweetalert";
import useAuth from "src/hooks/useAuth";

const editOptions = {
  allowEditing: false,
  allowAdding: false,
  allowDeleting: true,
  allowEditOnDblClick: false,
};
const commandOptions = [
  // {
  //   type: "Edit",
  //   buttonOption: { iconCss: " e-icons e-edit", cssClass: "e-flat" },
  // },
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

const EmployeeHomeTown = (props) => {
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
  const [empDisplayName, setEmpDisplayName] = useState("");
  const [handleId, setHandleId] = useState("");
  const [viewinfo, setViewInfo] = useState([]);
  const [skillType, setSkillType] = useState([]);
  const [chekedSkillTypes, setCheckedSkillTypes] = useState([]);
  const [delEmployeeName, setDelEmployeeName] = useState("")
  const [isActive, setIsActive] = useState(false)
  const [delEmployeeID, setDelEmployeeID] = useState("")
  const [EmployeeHomeTownChildrenList, setEmployeeHomeTownChildrenList] = useState([])

  const hometownRef = useRef(null);

  const refs = [
    hometownRef,
  ]
  const checkForValue = (ref) => {
    console.log({ checkForValue: ref });
    if (ref.current?.value) {
      ref.current.style.border = "1px solid green";
    }
  };

  const { setUrl } = useFetch("", (response, results) => {
    if (response) {
      if (response && Object.keys(response).length > 0) {
        dispatch({ type: "set", data: { ...response } });
        // setSubmitData({ ...response });
        setViewInfo(response);
        // setDuplicateData({ ...response })
        console.log({ response });


        setShow(false);

      } else {
        setMode("Add");
        setShow(false);
        // dispatch({ type: 'set', data: { ...results, isHomeCurrency } });
        // setSubmitData({ ...results, isHomeCurrency });
      }
    }
  });

  const { auth } = useAuth()
  const { companyReference: CompanyReference } = auth


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
    //  dispatch({ type: "set", data: { ...results } });
    // setSubmitData({ ...results });

    if (results?.id) {
      HandleGet(results?.id)
      setSearchResult(results);

    }
  };
  const HandleGet = (id) => {
    console.log({ id })
    setUrl(GetEmployeeHometownId(id))
  }
  const searchReset = () => {
    setShow(true);
    setSearchInput("");
    dispatch({ type: "set", data: {} });
    setSubmitData("")
    setEmployeeHomeTownChildrenList("")
    setViewInfo([])
    refs.forEach((ref) => {

      ref.current.style.border = "1px solid #d8dbe0";
      return


    });

  };

  //Handles Submit
  const handleOnSubmit = () => {
    refs.forEach((ref) => {
      if (ref.current.value.length > 2) {
        ref.current.style.border = "2px solid green";
      } else if (ref.current.value.length < 2) {
        ref.current.style.border = "2px solid red";
        console.log("second");
      } else if (ref.current.value === "") {
        ref.current.style.border = "2px solid red";
        console.log("third");

      } else {
        ref.current.style.border = "2px solid red";

        return

      }
    });
    if (!submitData?.name || submitData?.name === "") {
      toast.error(GetLabelByName("HCM-WQ9J7737WDC_LASN", lan), toastWarning);
      return;
    }

    // if (!submitData?.name || submitData?.name === "") {
    //   toast.error("Please enter hometown!", toastWarning);
    //   return;
    // }



    setVisible(false);
    const submit = {
      description: submitData?.description,
      firstName: submitData?.firstName,
      id: submitData?.id,
      lastName: submitData?.lastName,
      name: submitData?.name,
      staffId: submitData?.staffId,
      isDelete: true
    }

    setEmployeeHomeTownChildrenList((prev) => [...prev, submit])
    console.log({ submit: submit });

    let postData = {
      isDelete: true,
      "name": submitData?.name,
      "employee": {
        "firstName": searchResult?.firstName,
        "lastName": searchResult?.lastName,
      }

    }

    setViewInfo((prevState) => [...prevState, postData])
    dispatch({ type: "set", data: {} });


  };

  const handleposting = () => {

    let postBody = {
      employeeId: searchResult?.id,
      createEmployeeHomeTownChildren: EmployeeHomeTownChildrenList,
      "companyReference": "00001_a01",
      "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    }
    console.log(EmployeeHomeTownChildrenList);
    if (EmployeeHomeTownChildrenList.length > 0) {
      setPostUrl(PostEmployeeHometown())
      setPostData(postBody)
      postBody("")
    }


  }

  const { setData: setPostData, setUrl: setPostUrl } = usePost('', (response) => {
    // console.log({location:response });
    const { data } = response
    if ("" === data) {
      toast.success(GetLabelByName("HCM-HAGGXNJQW2B_HRPR", lan));
      //  showToasts();
      searchReset(2);
    } else {
      try {
        data = JSON.parse(response);
        let mdata = data.errors[0].message;
        toast.error(`${mdata}`, toastWarning);
      } catch (error) {
        console.log(error);
      }
    }

  })




  const handleOnChange = (evnt) => {
    //console.log(evnt)
    console.log(evnt?.target?.value)
    setSubmitData((data) => {
      return { ...data, [evnt?.target?.name]: evnt?.target?.value };
    });
    dispatch({
      type: "set",
      data: { ...data, [evnt?.target?.name]: evnt?.target?.value },
    });
  };

  console.log(viewinfo)
  var skillDropDownArr = [];
  const checkBenefiary = () => {
    // console.log("Checking...");
    if (viewinfo.length > 0) {
      //  console.log("Debug 1")
      for (let i = 0; i <= viewinfo.length; i++) {

        var obj = {};

        obj = viewinfo[i]?.skillType;
        skillDropDownArr.push(obj);
        console.log(obj);
      }

      const newdata = skillType.filter((val) => {
        return !skillDropDownArr.find((arr) => {
          console.log(arr);
          console.log({ valueID: val?.id + "::: " + arr?.id });
          return val?.id === arr?.id;
        });
      });
      setCheckedSkillTypes(newdata);
      console.log(newdata);
    } else {
      setCheckedSkillTypes(skillType);

    }
  };



  useEffect(() => {
    if (viewinfo.length > 0) {
      checkBenefiary();
    }

    // console.log(skillType);

  }, []);

  const handleClose = () => {
    setVisible(false)
    handleReset()
    dispatch({ type: "set", data: {} });

  }

  const onConfirm = () => {

    handleDeleteItem();

  };

  const onCancel = () => {

    setIsActive(false);

  };

  const onCommandClick = (args) => {
    console.log(args?.rowData);
    if (args?.rowData?.isDelete === true) {
      args.cancel = false;
      setViewInfo((current) => current.filter((deleteItem) => deleteItem.isDelete !== true));
      setEmployeeHomeTownChildrenList((current) => current.filter((deleteItem) => deleteItem.isDelete !== true))
      return;
    }
    else {
      onCompleteAction(args);

    }
  };

  const handleReset = () => {
    setViewInfo()
  }

  const onCompleteAction = (args) => {
    if (args.commandColumn.type === 'Delete') {
      args.cancel = true;
      setIsActive(true)
      setDelEmployeeName(empDisplayName)
      setDelEmployeeID(args.rowData.id)
    }

  };

  const handleDeleteItem = async () => {
    let deleteData = {
      transactionsId: delEmployeeID,
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      accountReference: "string"
    }

    setDeletUrl(DeleteEmployeeHometown())
    setDeleteData({ data: deleteData })
  };

  const { setData: setDeleteData, setUrl: setDeletUrl } = useDelete('', (response) => {
    const { data } = response
    if (response.status === 200 || response.status === 204) {
      toast.success(`${GetLabelByName("HCM-NUNYCE5Y09A-HRPR", lan)}`);
      setIsActive(false);
      setViewInfo([])
      HandleGet(handleId)
    } else {
      toast.error('Transaction Failed, Please try agin later!', toastWarning);
    }
  })



  return (
    <>
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title={`${GetLabelByName("HCM-KFXT3UX564C-LASN", lan)}?`}
        onConfirm={onConfirm}
        onCancel={onCancel}
        focusCancelBtn
        show={isActive}
      >

      </SweetAlert>
      <CRow >
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-A0B8SHDK6DI_LASN" />
          </h5>
        </CCol>
      </CRow>
      <CRow hidden={!show}>
        <CCol md="4">
          <CFormGroup>
            <CSAutoComplete
              filterUrl={SearchEmployees(searchInput)}
              //filterUrl=''            //filterUrl={SearchInternalCurrencies(searchInput)}
              placeholder={GetLabelByName("HCM-6FKJ6FEGW7A-HRPR", lan)}
              handleSelect={handleSearchResultSelect}
              //onChange={()=>handleSearchResultSelect}
              displayTextKey={"firstName"}
              setInput={setSearchInput}
              input={searchInput}
              emptySearchFieldMessage={`Please input 3 or more characters to search`}
              searchName={"Employee"}
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
              handleId={setHandleId}
            // reset={handleReset}
            />
          </CFormGroup>
        </CCol>
      </CRow>
      <CRow>
        <CCol md="8" className="text-right"></CCol>
        <CCol xs="12" hidden={show}>
          <CCard>
            <CCardHeader>
              <CFormGroup row>
                <CCol md="4">
                  <b>Employee:</b>{" "}
                  <span
                    title={empDisplayName}
                    style={{
                      padding: 5,
                      borderRadius: 5,
                      fontWeight: 900,
                      cursor: "pointer",
                      background: "#fff",
                      color: "#315a76",
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
                  {
                    viewinfo.length > 0 ? null :
                      <CButton
                        color="primary"
                        style={{ float: "right" }}
                        onClick={() => {
                          setVisible(true);
                          checkBenefiary();
                        }}
                      >
                        <AiOutlinePlus /> {" "}
                        <CSLab code="HCM-Q2KYSG4U96_LOLN" />{" "}
                      </CButton>
                  }

                </CCol>
              </CFormGroup>
            </CCardHeader>

            <CForm action="" method="post">
              <>
                <GridComponent
                  height={350}
                  dataSource={viewinfo}
                  allowPaging={true}
                  pageSettings={{ pageSize: 10 }}
                  editSettings={editOptions}
                  commandClick={onCommandClick}
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
                      headerText={GetLabelByName("HCM-KPH53NF08RG", lan)}
                      width="100"
                    />
                    <ColumnDirective
                      field={"employee.lastName"}
                      headerText={GetLabelByName("HCM-6CU7NZJCKLF", lan)}
                      width="100"
                    />

                    <ColumnDirective
                      field={"name"}
                      headerText={GetLabelByName("HCM-UVUQH81OLB8-LASN", lan)}
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
                    services={[Page, Sort, Filter, Group, Edit, CommandColumn]}
                  />
                </GridComponent>
              </>
            </CForm>

            <CCardFooter style={{ position: 'relative;' }}>
              <CButton onClick={() => handleposting()} style={{ marginRight: 5, float: "right" }} type="submit" size="sm" color="success" >
                <CIcon name="cil-scrubber" /> Submit
              </CButton>

              <CButton
                style={{ marginRight: 5, float: 'right', color: 'white' }}
                onClick={() => searchReset()}
                type="button"
                size="sm"
                color="danger"
              >
                <AiOutlineClose size={20} />
                <CSLab code="HCM-V3SL5X7PJ9C-LANG" />
              </CButton>

            </CCardFooter>
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
            <CSLab code="HCM-Q2KYSG4U96_LOLN" />{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className={"bottom-spacing"}>
            <>
              <CCol md="12">
                <CLabel htmlFor="name">
                  <CSLab code="HCM-UVUQH81OLB8-LASN" />{" "}<CSRequiredIndicator />
                </CLabel>
                <input className="form-control" type="text" id="name" name="name" value={data?.name || ""} ref={hometownRef} onChange={(e) => { handleOnChange(e); checkForValue(hometownRef) }} placeholder={GetLabelByName("HCM-8VMMSBPPZRJ-KCMI", lan)} />
              </CCol>
              {/* <CCol md="12">
                <CLabel htmlFor="Skill">
                  <CSLab code="HCM-P29OOIV9P7_PSLL" />
                  <CSRequiredIndicator />
                </CLabel>
                <CSelect
                  name="skillTypeId"
                  value={data?.skillTypeId || -1}
                  onChange={handleOnChange}
                >
                  <option value={-1}> Select Skill</option>
                  {chekedSkillTypes.map((x, i) => (
                    <option key={i} value={x.id}>
                      {x.name}
                    </option>
                  ))}
                </CSelect>
              </CCol> */}
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
          <p
            style={{
              fontSize: "10px",
              marginRight: "291px",
              marginBottom: "-34px",
            }}
          >
            <em>
              <CSLab code="HCM-LVXUVAB9G_KCMI" />( <CSRequiredIndicator />)
            </em>
          </p>
          <CButton color="secondary" onClick={() => { handleClose(); }}>
            <CSLab code="HCM-V3SL5X7PJ9C-LANG" />
          </CButton>
          <CButton
            // style={{ cursor: !canSave ? "not-allowed" : "pointer" }}
            //disabled={!canSave}
            onClick={() => {

              handleOnSubmit();
            }}
            color="primary"
          >
            <CSLab code="HCM-TAAFD4M071D-HRPR" />
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EmployeeHomeTown;
