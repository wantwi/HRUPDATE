import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  CLabel,
  CCardFooter,
  CSelect,
  CTextarea,
} from "@coreui/react";
import { AiFillSave, AiOutlineClose, AiOutlineRedo } from "react-icons/ai";
import { CardBodyHeight } from "src/reusable/utils/helper";
import { GetLabelByName } from "src/reusable/configs/config";
import { CSAutoComplete, CSDivider, CSLab, CSLineLabel } from "../../../reusable/components";
import "../../../scss/_custom_table.scss";
import { GetEmployeeByID, SearchEmployees } from "src/reusable/API/EmployeeEndpoints";
import useFetch from "src/hooks/useFetch";
import useMultiFetch from "src/hooks/useMultiFetch";
import usePost from "src/hooks/usePost";
import { toast } from "react-toastify";
import { toastWarning } from "src/toasters/Toaster";

const EmployeeMovement = (props) => {
  const lan = useSelector((state) => state.language);
  const [searchInput, setSearchInput] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfItems, setNumberOfItems] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [submitData, setSubmitData] = useState({});
  const [sortOrder, setSortOrder] = useState("");
  const [large, setLarge] = useState(false);
  const [mode, setMode] = useState("");
  const [show, setShow] = useState(true);
  // const [grid,] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
const [empDisplayName, setEmpDisplayName] = useState("");
const dispatch = useDispatch();
const [viewinfo, setViewInfo] = useState([]);
const [handleId, setHandleId] = useState("");
const data = useSelector((state) => state.data);

  // const OnSaveContinueClick = () => {
  //     console.log(grid);
  // }

  const {setOptData, setUrl} =  useFetch("", (response,results) => {
    if (response) {
      if (response && Object.keys(response).length > 0) {
        dispatch({ type: "set", data: { ...response } });
        setSubmitData({ ...response });
        setViewInfo( response );
        // setDuplicateData({ ...response })
        console.log({ response });

        //let rates = response?.rates;

        // setExchangeRate(rates);
        setShow(false);
       
      } else {
        setMode("Add");
        setShow(false);
        // dispatch({ type: 'set', data: { ...results, isHomeCurrency } });
        // setSubmitData({ ...results, isHomeCurrency });
      }
    }
});
const searchReset = () => {
  setShow(true);
  setSearchInput("");

};
const  {data:multicallData} =  useMultiFetch([ ], (results) => {
  console.log(results[0].data);
  // setSkillType([...results[0].data]);
     

})
const  {setData:setPostData, setUrl:setPostUrl} = usePost('', (response) => {
  // console.log({location:response });
  const {data} = response
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
    setSubmitData({ ...results });

    if (results?.id) {
      setSearchResult(results);
      setUrl(GetEmployeeByID(results.id))
      // GetRequest(GetEmployeeById(results.id))
      //   .then((response) => {
      //     console.log(response)
      //     // toast.dismiss(toastId);
      //     if (response.ok) {
      //       response.json().then((response) => {
      //         // console.log({response});
      //         if (response && Object.keys(response).length > 0) {
      //           dispatch({ type: "set", data: { ...response } });
      //           setSubmitData({ ...response });
      //           setViewInfo(response);
      //           // setDuplicateData({ ...response })
      //           console.log({ response });

      //           //let rates = response?.rates;

      //           // setExchangeRate(rates);
      //           setShow(false);
               
      //         } else {
      //           setMode("Add");
      //           setShow(false);
      //           // dispatch({ type: 'set', data: { ...results, isHomeCurrency } });
      //           // setSubmitData({ ...results, isHomeCurrency });
      //         }
      //       });
      //     }
      //   })
      //   .catch((err) => {
      //     // console.log(err);
      //     // toaster(toastId, "Failed to retrieve details", 'error', 4000);
      //   });
    }
  };
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
const handlePost=()=>{
  
  setPostUrl()
  setPostData()
}


  return (
    <>
      <CRow>
        <CCol xs="12">
          <h5>
            <CSLab code="HCM-219IVWXVLBI_HRPR" />
          </h5>
        </CCol>
      </CRow>
      <CRow>
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
              <CRow className={"bottom-spacing"}>
                <CCol md="6">
                  <CCol md="12">
                    <CSLineLabel name="HCM-I2TGMIC1TS-HRPR" />{" "}
                  </CCol>
                  <>
                    <CRow>
                      <CCol md="6">
                        <CLabel>
                          {" "}
                          <CSLab code="HCM-HMLNLPOEIXG" />{" "}
                        </CLabel>
                        <CSelect disabled>
                          {[
                            "Select Employee Type",
                            "Type 1",
                            "Type 2",
                            "Type 3",
                          ].map((x, i) => (
                            <option key={i} value={x}>
                              {x}
                            </option>
                          ))}
                        </CSelect>
                      </CCol>
                      <CCol md="6">
                        <CLabel>
                          {" "}
                          <CSLab code="HCM-N6I0LSIYJF" />{" "}
                        </CLabel>
                        <CSelect disabled>
                          {[
                            "Select Department",
                            "Department 1",
                            "Department 2",
                            "Department 3",
                          ].map((x, i) => (
                            <option key={i} value={x}>
                              {x}
                            </option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CRow>
                  </>
                  <>
                    <CRow>
                      <CCol md="6">
                        <CLabel>
                          {" "}
                          <CSLab code="HCM-4D1SZ24U9UO" />{" "}
                        </CLabel>
                        <CSelect disabled>
                          {[
                            "Select Section",
                            "Section 1",
                            "Section 2",
                            "Section 3",
                          ].map((x, i) => (
                            <option key={i} value={x}>
                              {x}
                            </option>
                          ))}
                        </CSelect>
                      </CCol>
                      <CCol md="6">
                        <CLabel>
                          {" "}
                          <CSLab code="HCM-LAFPT6FJ57N" />{" "}
                        </CLabel>
                        <CSelect disabled>
                          {[
                            "Select Division",
                            "Division 1",
                            "Division 2",
                            "Division 3",
                          ].map((x, i) => (
                            <option key={i} value={x}>
                              {x}
                            </option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md="6">
                        <CLabel>
                          {" "}
                          <CSLab code="HCM-ATGLL367GOQ" />{" "}
                        </CLabel>
                        <CSelect disabled>
                          {[
                            "Select Position",
                            "Position 1",
                            "Position 2",
                            "Position 3",
                          ].map((x, i) => (
                            <option key={i} value={x}>
                              {x}
                            </option>
                          ))}
                        </CSelect>
                      </CCol>
                      <CCol md="6">
                        <CLabel>
                          {" "}
                          <CSLab code="HCM-DHV9W3RF11D" />{" "}
                        </CLabel>
                        <CSelect disabled>
                          {["Select Unit", "Unit 1", "Unit 2", "Unit 3"].map(
                            (x, i) => (
                              <option key={i} value={x}>
                                {x}
                              </option>
                            )
                          )}
                        </CSelect>
                      </CCol>
                    </CRow>
                  </>
                  <>
                    <CRow>
                      <CCol md="6">
                        <CLabel>
                          {" "}
                          <CSLab code="HCM-6XXECXM4Q5S" />{" "}
                        </CLabel>
                        <CSelect disabled>
                          {[
                            "Select Location",
                            "Location 1",
                            "Location 2",
                            "Location 3",
                          ].map((x, i) => (
                            <option key={i} value={x}>
                              {x}
                            </option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CRow>
                  </>
                </CCol>

                <CSDivider md="1" />

                <CCol md="5">
                  <CRow>
                    <CCol md="12">
                      <CSLineLabel name="HCM-EKUWHXBRW2O-LANG" />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md="6">
                      <CLabel>
                        {" "}
                        <CSLab code="HCM-HMLNLPOEIXG" />{" "}
                      </CLabel>
                      <CSelect>
                        {[
                          "Select Employee Type",
                          "Type 1",
                          "Type 2",
                          "Type 3",
                        ].map((x, i) => (
                          <option key={i} value={x}>
                            {x}
                          </option>
                        ))}
                      </CSelect>
                    </CCol>
                    <CCol md="6">
                      <CLabel>
                        {" "}
                        <CSLab code="HCM-N6I0LSIYJF" />{" "}
                      </CLabel>
                      <CSelect>
                        {[
                          "Select Department",
                          "Department 1",
                          "Department 2",
                          "Department 3",
                        ].map((x, i) => (
                          <option key={i} value={x}>
                            {x}
                          </option>
                        ))}
                      </CSelect>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md="6">
                      <CLabel>
                        {" "}
                        <CSLab code="HCM-4D1SZ24U9UO" />{" "}
                      </CLabel>
                      <CSelect>
                        {[
                          "Select Section",
                          "Section 1",
                          "Section 2",
                          "Section 3",
                        ].map((x, i) => (
                          <option key={i} value={x}>
                            {x}
                          </option>
                        ))}
                      </CSelect>
                    </CCol>
                    <CCol md="6">
                      <CLabel>
                        {" "}
                        <CSLab code="HCM-LAFPT6FJ57N" />{" "}
                      </CLabel>
                      <CSelect>
                        {[
                          "Select Division",
                          "Division 1",
                          "Division 2",
                          "Division 3",
                        ].map((x, i) => (
                          <option key={i} value={x}>
                            {x}
                          </option>
                        ))}
                      </CSelect>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md="6">
                      <CLabel>
                        {" "}
                        <CSLab code="HCM-ATGLL367GOQ" />{" "}
                      </CLabel>
                      <CSelect>
                        {[
                          "Select Position",
                          "Position 1",
                          "Position 2",
                          "Position 3",
                        ].map((x, i) => (
                          <option key={i} value={x}>
                            {x}
                          </option>
                        ))}
                      </CSelect>
                    </CCol>
                    <CCol md="6">
                      <CLabel>
                        {" "}
                        <CSLab code="HCM-DHV9W3RF11D" />{" "}
                      </CLabel>
                      <CSelect>
                        {["Select Unit", "Unit 1", "Unit 2", "Unit 3"].map(
                          (x, i) => (
                            <option key={i} value={x}>
                              {x}
                            </option>
                          )
                        )}
                      </CSelect>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md="6">
                      <CLabel>
                        {" "}
                        <CSLab code="HCM-6XXECXM4Q5S" />{" "}
                      </CLabel>
                      <CSelect>
                        {[
                          "Select Location",
                          "Location 1",
                          "Location 2",
                          "Location 3",
                        ].map((x, i) => (
                          <option key={i} value={x}>
                            {x}
                          </option>
                        ))}
                      </CSelect>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md="12">
                      <CLabel>
                        {" "}
                        <CSLab code="HCM-1NNHRS3H3JT_LANG" />{" "}
                      </CLabel>
                      <CTextarea
                        style={{ height: "80px", resize: "none" }}
                      ></CTextarea>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md="6"></CCol>
                    <CCol md="6" style={{ float: "right" }}>
                      <CLabel>
                        {" "}
                        <CSLab code="HCM-Z9XSW3FPTIP_HRPR" />{" "}
                      </CLabel>
                      <CInput />
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter>
              {/* <CButton
                style={{ marginRight: 5 }}
                type="button"
                size="sm"
                color="success"
              >
                <CIcon name="cil-scrubber" />{" "}
                <CSLab code="HCM-ZIRH5SVBDUF_LANG" />{" "}
              </CButton> */}
              <CButton
                style={{ marginRight: 5, float: "right" }}
                type="button"
                size="sm"
                color="success"
                onClick={()=>handlePost()}
              >
                <AiFillSave size={20} /> <CSLab code="HCM-HGUHIR0OK6T" />{" "}
              </CButton>
              <CButton
                style={{ marginRight: 5, float: "right" }}
                type="button"
                size="sm"
                color="danger"
                onClick={()=>searchReset()}
              >
              <AiOutlineClose size={20} />{" "}
                <CSLab code="HCM-V3SL5X7PJ9C-LANG" />{" "}
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default EmployeeMovement;
