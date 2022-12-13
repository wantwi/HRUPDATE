import React, { useState } from "react";
import {
  CInputGroupAppend,
  CInputGroup,
  CInput,
  CFormGroup,
  CButton,
  CRow,
  CCol,
} from "@coreui/react";
import {
  AiFillForward,
  AiFillBackward,
  AiFillCloseCircle,
} from "react-icons/ai";
import CIcon from "@coreui/icons-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GetRequest, isObject } from "src/reusable/utils/helper";
import useFetch from "src/hooks/useFetch";

const styles = {
  position: "absolute",
  inset: "0px auto auto 0px",
  transform: "translate(1px, 37px)",
  width: "94%",
  marginTop: -10,
  left: "14px",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  transition: "0.3s",
  border: "1px solid #d8dbe0",
  overflow: "hidden",
  overflowY: "scroll",
  height: "400px",
};

let indexCount = 0,
  _pageNumber = 0,
  _currentPage = 0;

const CSAutoComplete = ({
  filterUrl,
  uniqueIdKey,
  displayTextKey,
  placeholder,
  handleSelect,
  input,
  setInput,
  searchName,
  emptySearchFieldMessage,
  isPaginated,
  pageNumber,
  setPageNumber,
  numberOfItems,
  setNumberOfItems,
  orderBy,
  setOrderBy,
  sortOrder,
  setSortOrder,
  selectNumberOfItems,
  mode,
  setMode,
  reset,
  handleId,
}) => {
  //console.log({ filterUrl, uniqueIdKey, displayTextKey, placeholder, handleSelect, input, setInput, searchName, emptySearchFieldMessage, isPaginated, pageNumber, setPageNumber, numberOfItems, setNumberOfItems, orderBy, setOrderBy, sortOrder, setSortOrder, selectNumberOfItems, mode, setMode, reset })
  // Set default values
  uniqueIdKey = uniqueIdKey || "id";
  displayTextKey = displayTextKey || "name";
  searchName = searchName || "query";
  emptySearchFieldMessage = emptySearchFieldMessage || "Input search query";
  pageNumber = pageNumber || 1;
  numberOfItems = numberOfItems || 10;
  orderBy = orderBy || "";
  sortOrder = sortOrder || "";
  selectNumberOfItems = selectNumberOfItems || [10, 15, 20];
  mode = mode || "Create";

  const alternativeTextKey = "code";

  //toaster function
  const toaster = (toastId, message, type, time) => {
    switch (type) {
      case "warn":
        toast.warn(message, {
          position: "top-right",
          autoClose: time,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          isLoading: false,
        });
        break;
      case "info":
      case "error":
      case "success":
        toast.update(toastId, {
          render: message,
          type,
          position: "top-right",
          autoClose: time,
          //delay: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          isLoading: false,
        });
        break;
      default:
        break;
    }
  };

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeeid, setEmployeeId] = useState("");
  const [name, setName] = useState([]);

  //get user input
  const onChange = (e) => {
    const userInput = e.target.value;

    //
    if (!userInput || !input) {
      setSuggestions([]);
      setShowSuggestions(false);
      if (setOrderBy) setOrderBy("");
      if (setSortOrder) setSortOrder("");
      if (setPageNumber) setPageNumber(1);
      if (setNumberOfItems) setNumberOfItems(5);
    }

    // Filter our suggestions that don't contain the user's input
    const unLinked = suggestions.filter((suggestion) => {
      return (
        suggestion?.[displayTextKey]
          .toLowerCase()
          .indexOf(userInput?.toLowerCase()) > -1 ||
        suggestion?.[alternativeTextKey]
          .toLowerCase()
          .indexOf(userInput.toLowerCase()) > -1
      );
    });

    //console.log({ unLinked });

    setInput(e.target.value);
    setFilteredSuggestions(unLinked);

    switch (e.key) {
      case "ArrowUp":
        if (showSuggestions && indexCount > 0) indexCount--;
        break;
      case "ArrowDown":
        if (showSuggestions && filteredSuggestions.length - 1 > indexCount)
          indexCount++;
        break;
      case "Enter":
        if (showSuggestions) {
          const filteredData = filteredSuggestions.filter(
            (_, index) => index === indexCount
          );
          //console.log(showSuggestions);

          if (filteredData && filteredData.length > 0) {
            handleSelect(filteredData[0]);
            setInput(filteredData?.[0]?.[displayTextKey]);
            setFilteredSuggestions([]);
            setShowSuggestions(false);
          }
        } else {
          handleSearchInput();
          indexCount = 0;
        }

        break;
      default:
        break;
    }
  };

  const onClick = (e) => {
    //console.log("RESULTS", filterUrl);

    if (e?.target?.id) {
      let selectedItem = filteredSuggestions.filter(
        (x) => x?.[uniqueIdKey] === e?.target?.id
      );
      // console.log(selectedItem[0].id);
      handleId(selectedItem[0].id);
      //setEmployeeId(selectedItem[0].id);

      if (selectedItem && selectedItem.length === 1)
        handleSelect(selectedItem[0]);
    }

    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    indexCount = 0;
    setShowSuggestions(false);
  };






  const {setOptData, setUrl} =  useFetch("", (response,results) => {
    const toastId = toast.loading("Searching ");
    if (response) {
      if (
        response.items &&
        Array.isArray(response.items) &&
        response.items.length > 0
      ) {
        toast.dismiss(toastId);
        setSuggestions(response.items);
        setFilteredSuggestions(response.items);
        setShowSuggestions(true);
      }
      if (response && isObject(response)) {
        if (response?.hasOwnProperty("empty")) {
          if (!response?.empty) {
            toast.dismiss(toastId);
            let values = response?.items || response?.data;
            setSuggestions(values);

            setTotalResults(response?.totalResults);
            setTotalPages(response?.totalPages);
            setCurrentPage(response?.currentPage);
            setFilteredSuggestions(values);
            setShowSuggestions(true);
            _currentPage = response?.currentPage;
          } else {
            toaster(toastId, `No records found`, "info", 3000);
          }

          // console.log("Paginated");
        }
      }

      if (response && Array.isArray(response) && response.length === 0) {
        toaster(toastId, `No records found`, "info", 2000);
      }
    }
});

  //console.log(handleId);
  //console.log({ employeeid });
  const runSearch = (url) => {
    //const toastId = toast.loading("Searching ");
 
    if (input && input.length > 2) {
      setUrl(url)
      // GetRequest(url, {})
      //   .then((response) => {
      //     if (response.ok) {
      //       response.json().then((data) => {
      //         console.log({ data });

      //         if (
      //           data.items &&
      //           Array.isArray(data.items) &&
      //           data.items.length > 0
      //         ) {
      //           toast.dismiss(toastId);
      //           setSuggestions(data.items);
      //           setFilteredSuggestions(data.items);
      //           setShowSuggestions(true);
      //         }
      //         console.log({ test: data });
      //         if (data && isObject(data)) {
      //           if (data?.hasOwnProperty("empty")) {
      //             if (!data?.empty) {
      //               toast.dismiss(toastId);
      //               let values = data?.items || data?.data;
      //               setSuggestions(values);

      //               setTotalResults(data?.totalResults);
      //               setTotalPages(data?.totalPages);
      //               setCurrentPage(data?.currentPage);
      //               setFilteredSuggestions(values);
      //               setShowSuggestions(true);
      //               _currentPage = data?.currentPage;
      //             } else {
      //               toaster(toastId, `No records found`, "info", 3000);
      //             }

      //             // console.log("Paginated");
      //           }
      //         }

      //         if (data && Array.isArray(data) && data.length === 0) {
      //           toaster(toastId, `No records found`, "info", 2000);
      //         }
      //       });
      //     }
      //   })
      //   .catch((err) => {
      //     toaster(toastId, "There was an error!", "error", 3000);
      //     console.log(err);
      //   });

    } else {
       toast.error(`${emptySearchFieldMessage}`, "info", 2000);
      //alert('Input to short');
    }
  };

  const handleSearchInput = (mode = "search") => {
    if (mode === "search") {
      runSearch(filterUrl);
    } else {
      if (setMode && reset) {
        setMode("");
        setInput("");
        reset();
      }
    }
  };

  const handlePagination = (number, type) => {
    if (number < 1) return;

    if ("next" === type && number > totalPages) return;

    if (setPageNumber) setPageNumber(number);
    switch (type) {
      case "next":
        if (setPageNumber)
          setPageNumber((numb) => (numb !== number ? number : numb));
        _pageNumber = number;
        break;
      case "previous":
        if (setPageNumber)
          setPageNumber((numb) => (numb !== number ? number : numb));
        _pageNumber = number;
        break;
      default:
        break;
    }

    let modifiedEndpoint = modifiedURL("Page", filterUrl, number);
    runSearch(modifiedEndpoint);
  };

  function modifiedURL(name, url, value) {
    const BaseURL = url.split("?")[0];
    const urlParams = new URLSearchParams(
      filterUrl.includes("?") ? filterUrl.split("?")[1] : ""
    );
    urlParams.set(name, value);
    return BaseURL + "?" + urlParams.toString() || url;
  }

  // const handleNumberOfItemsChange = (evnt) => {
  //     const value = evnt?.target?.value;
  //     if (setNumberOfItems) setNumberOfItems(num => num !== value ? value : num);

  //     setPageNumber(1);
  //     _pageNumber = 1;

  //     let one = modifiedURL('Page', filterUrl, 1);
  //     let two = modifiedURL('Results', one, Number(value));
  //     console.log({ value, one, two })
  //     runSearch(two);
  // }
  //console.log({ filteredSuggestions });

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <div>
        <ul className={`dropdown-menu show suggestions`} style={styles}>
          {filteredSuggestions.map((suggestion, index) => {
            return (
              <li
                key={index}
                className={`dropdown-item ${
                  index === indexCount ? "active" : ""
                }`}
                id={suggestion?.[uniqueIdKey]}
                // key={suggestion?.[uniqueIdKey]}
                onClick={onClick}
                title={`Click to select `}
              >
                {[suggestion?.[displayTextKey], " ", suggestion?.lastName,"  ", "-"," ", suggestion?.staffId]}
             
              </li>
            );
          })}

          {isPaginated ? (
            <CCol
              style={{
                position: "absolute",
                bottom: "0px",
                marginTop: 5,
                backgroundColor: "white",
              }}
            >
              <CRow>
                <CCol md={7} xs={9}>
                  <div className="pagination">
                    {/* Previous Button */}
                    <div
                      className="page-item"
                      style={{ marginRight: "5px", padding: "5px" }}
                    >
                      <CButton
                        size={"lg"}
                        className="page-link"
                        onClick={() => {
                          // console.log({
                          //   _pageNumber,
                          //   _currentPage,
                          //   currentPage,
                          //   pageNumber,
                          //   totalPages,
                          // });
                          //if ((_currentPage >= _pageNumber)) {
                          handlePagination(pageNumber - 1, "previous");
                          //}
                        }}
                      >
                        <AiFillBackward />
                      </CButton>
                    </div>

                    {/* Page Count */}
                    <div style={{ marginTop: "15px" }} className="page-item">
                      {currentPage === 0 ? currentPage + 1 : currentPage} of{" "}
                      {totalPages}
                    </div>

                    {/* Next Button */}
                    <div
                      className="page-item"
                      style={{ marginLeft: "5px", padding: "5px" }}
                    >
                      <CButton
                        size={"lg"}
                        className="page-link"
                        onClick={() => {
                          // console.log({
                          //   _pageNumber,
                          //   _currentPage,
                          //   currentPage,
                          //   pageNumber,
                          //   totalPages,
                          // });

                          //if ((_pageNumber <= _currentPage)) {
                          handlePagination(pageNumber + 1, "next");
                          //}
                        }}
                      >
                        <AiFillForward />
                      </CButton>
                    </div>
                  </div>
                </CCol>

                {/* <CCol md={3} xs={3}>
                                        <CSelect value={numberOfItems} onChange={handleNumberOfItemsChange}>
                                            {selectNumberOfItems.map((x, i) => <option key={i} value={x}>{x}</option>)}
                                        </CSelect>
                                    </CCol> */}

                <CCol md={5} xs={6} className="text-right">
                  <li style={{ marginLeft: "5px", marginTop: "15px" }}>
                    Records:{" "}
                    {totalResults === 0 && suggestions.length > 0
                      ? suggestions.length
                      : totalResults}
                  </li>
                </CCol>
              </CRow>
            </CCol>
          ) : null}
        </ul>
      </div>
    ) : null;
  };

  return (
    <>
      <CFormGroup>
        <CInputGroup>
          <CInput
            type="text"
            // disabled={mode === "Update"}
            className={
                 "border-left-curve"
            }
            onChange={onChange}
            onKeyDown={onChange}
            value={input}
            placeholder={placeholder}
          />
          <CInputGroupAppend>
            <CButton
              className="border-right-curve"
              color={ "primary"}
              onClick={() =>
                handleSearchInput(
                  
                )
              }
            >
             
                <CIcon name={"cil-magnifying-glass"} />
              
            </CButton>
          </CInputGroupAppend>
        </CInputGroup>
        {showSuggestions && input && <SuggestionsListComponent />}
      </CFormGroup>
    </>
  );
};
export default CSAutoComplete;
