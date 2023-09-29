import React, { useState, useRef, useEffect } from "react";
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
import useDebounce from "src/hooks/useDebounce";
import { GetRequest, isObject } from "src/reusable/utils/helper";
import useFetch from "src/hooks/useFetch";
import useLoader from "src/hooks/useLoader";
import { CSLab } from "..";

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
  showDash = true,
  handleId,
}) => {
  //console.log({ filterUrl, uniqueIdKey, displayTextKey, placeholder, handleSelect, input, setInput, searchName, emptySearchFieldMessage, isPaginated, pageNumber, setPageNumber, numberOfItems, setNumberOfItems, orderBy, setOrderBy, sortOrder, setSortOrder, selectNumberOfItems, mode, setMode, reset })
  // Set default values
  const { debouncedValue: debouncedSearchValue, setDebouncedValue } = useDebounce(input, 300);
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
  const { isLoading, setIsLoading } = useLoader();
  const [count, setCount] = useState(0);
  const searchInputRef = useRef(null);
  //get user input
  const onChange = (e) => {
    setDebouncedValue("");
    setCount(0);
    const userInput = e.target.value;
    if (!userInput || !input) {
      setSuggestions([]);
      setShowSuggestions(false);
      if (setOrderBy) setOrderBy("");
      if (setSortOrder) setSortOrder("");
      if (setPageNumber) setPageNumber(1);
      if (setNumberOfItems) setNumberOfItems(10);
    }

    // Filter our suggestions that don't contain the user's input
    const unLinked = suggestions.filter((suggestion) => {
      return (
        suggestion?.[displayTextKey] > -1 ||
        suggestion?.[alternativeTextKey] > -1
      );
    });

    setInput(e.target.value);

    setFilteredSuggestions(unLinked);

    switch (e.key) {
      case "ArrowUp":
        if (showSuggestions) {
          if (count < 0) {
            setCount(0);
          }
          if (count >= 0) {
            if (count === filteredSuggestions.length - 1) {
              setCount(0);
            } else {
              setCount((pre) => pre + 1);
            }
          }
        }
        break;
      case "ArrowDown":
        if (showSuggestions) {
          if (count < 0) {
            setCount(0);
          }
          if (count >= 0) {
            if (count === filteredSuggestions.length - 1) {
              setCount(0);
            } else {
              setCount((pre) => pre + 1);
            }
          }
        }
        break;
      case "Enter":
        if (showSuggestions) {
          const filteredData = filteredSuggestions.filter(
            (_, index) => index === count
          );

          if (filteredData && filteredData.length > 0) {
            handleSelect(filteredData[0]);
            setInput("");
            // //setInput(filteredData?.[0]?.[displayTextKey]);
            setFilteredSuggestions([]);
            setShowSuggestions(false);
          }
        } else {
          handleSearchInput();
          indexCount = 0;
          setCount(0);
        }
        // if (showSuggestions) {
        //     const filteredData = filteredSuggestions.filter((_, index) => index === indexCount);

        //     if (filteredData && filteredData.length > 0) {
        //         handleSelect(filteredData[0]);
        //         setInput('');
        //         // //setInput(filteredData?.[0]?.[displayTextKey]);
        //         setFilteredSuggestions([]);
        //         setShowSuggestions(false);
        //     }

        // } else {
        //     handleSearchInput();
        //     indexCount = 0;
        //     setCount(0)
        // }
        break;
      default:
        break;
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      if (showSuggestions) {
        const filteredData = filteredSuggestions.filter(
          (_, index) => index === count
        );

        if (filteredData && filteredData.length > 0) {
          handleSelect(filteredData[0]);
          setInput("");
          // //setInput(filteredData?.[0]?.[displayTextKey]);
          setFilteredSuggestions([]);
          setShowSuggestions(false);
        }
      } else {
        handleSearchInput();
        indexCount = 0;
        setCount(0);
      }
    } else if (e.key === "ArrowDown") {
      if (showSuggestions) {
        if (count < 0) {
          setCount(0);
        }
        if (count >= 0) {
          if (count === filteredSuggestions.length - 1) {
            setCount(0);
          } else {
            setCount((pre) => pre + 1);
          }
        }
      }
    } else if (e.key === "ArrowUp") {
      if (showSuggestions) {
        if (filteredSuggestions && count <= 0) {
          setCount(filteredSuggestions.length - 1);
        } else {
          setCount((pre) => pre - 1);
        }

        // if(count === filteredSuggestions.length -1){
        //     setCount(0)
        // }else{
        //     setCount(pre => pre -1)
        // }
      }
    }
  };

  const onClick = (e) => {
    setInput("");
    setDebouncedValue("");

    if (e?.target?.id) {
      let selectedItem = filteredSuggestions.filter(
        (x) => x?.[uniqueIdKey] === e?.target?.id
      );
      if (selectedItem && selectedItem.length === 1)
        handleSelect(selectedItem[0]);
    }

    setFilteredSuggestions([]);
    // setInput(e.target.innerText);
    indexCount = 0;
    setShowSuggestions(false);
  };

  const { setUrl } = useFetch("", (response, results) => {
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
    setIsLoading(true);
    if (input && input.length > 0) {
      setUrl(url);
    } else {
      setIsLoading(false);
      toast.info(`${emptySearchFieldMessage}`);
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
    //setCount(0)
    // console.log("clicked", type, number)
    // console.log({ totalPages })
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
                className={`dropdown-item ${index === count ? "active" : ""}`}
                id={suggestion?.[uniqueIdKey]}
                key={suggestion?.[uniqueIdKey]}
                onClick={onClick}
                title={`Click to select ${suggestion?.[displayTextKey]}`}
              >
                {suggestion?.name || suggestion?.firstName}{" "}
                {suggestion?.lastName} {showDash ? "-" : ""}{" "}
                {suggestion?.staffId || suggestion?.code}
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
                          handlePagination(pageNumber - 1, "previous");
                          searchInputRef.current.focus();
                          setCount(0);
                        }}
                      >
                        <AiFillBackward />
                      </CButton>
                    </div>

                    {/* Page Count */}
                    <div style={{ marginTop: "15px" }} className="page-item">
                      {currentPage === 0 ? currentPage + 1 : currentPage}{" "}
                      <CSLab code="HCM-C35GOK6XT1" /> {totalPages}
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
                          handlePagination(pageNumber + 1, "next");

                          searchInputRef.current.focus();
                          setCount(0);
                        }}
                      >
                        <AiFillForward />
                      </CButton>
                    </div>
                  </div>
                </CCol>
                <CCol md={5} xs={6} className="text-right">
                  <li style={{ marginLeft: "5px", marginTop: "15px" }}>
                    <CSLab code="HCM-6I37E6VERLR_KCMI" />{" "}
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

    // /setInput("")
  };

  useEffect(() => {
    if (debouncedSearchValue.length > 1 && debouncedSearchValue !== "*") {
      handleSearchInput();
    }
    return () => {
      setDebouncedValue("");
    };
  }, [debouncedSearchValue]);

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
              color={"primary"}
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
