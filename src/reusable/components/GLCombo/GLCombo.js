import React, { useEffect, useState } from "react";
import { AsyncTypeahead, Typeahead } from "react-bootstrap-typeahead";
import Highlighter from "react-highlight-words";
import useAuth from "src/hooks/useAuth";
import useFetch from "src/hooks/useFetch";
import { GetGLAccounts } from "src/reusable/API/EmployeeDetailsEndpoints";

const GLCombo = ({
  gLAccountData,
  name,
  state,
  setState,
  defaultVal,
  disabled = false,
}) => {
  //console.log({gLAccountData, name, state, setState, defaultVal});
  const { auth } = useAuth();
  const { companyReference: COMPANY_REFRENCE } = auth;
  const [searchText, setSearchText] = useState("");
  const { data, isLoading } = useFetch(GetGLAccounts(COMPANY_REFRENCE));
  const [selectedArry, setselectedArry] = useState([]);

  const getSelected = (id) => {
    //   console.log({getSelected: gLAccountData?.find(x => x?.id === id)});
    return gLAccountData?.find((x) => x?.id === id)?.name || "";
  };

  const handleChange = (args) => {
    //console.log({ handleChange: args });
    const value = args[0]?.id;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  if (isLoading) {
    return "Loading GL...";
  }

  return (
    <Typeahead
      disabled={disabled}
      onInputChange={(text) => setSearchText(text)}
      id={`${name}`}
      labelKey={(option) =>
        `${option?.code || ""}${option?.code ? " - " : ""}${option?.name || ""}`
      }
      onChange={handleChange}
      options={isLoading ? [] : gLAccountData}
      placeholder="search GL"
      selected={searchText.length === 0 ? [defaultVal] : ""}
      // defaultInputValue={{name:defaultVal}}

      renderMenuItemChildren={(option, props) => (
        <div
          key={option?.id || ""}
          style={{ display: "flex", flexDirection: "row", padding: 0 }}
        >
          <span style={{ color: "teal", fontWeight: "bold" }}>
            <Highlighter
              searchWords={[`${searchText}`]}
              autoEscape={true}
              textToHighlight={option?.code + " -  "}
              highlightStyle={{
                background: "gold",
                padding: 0,
                margin: 0,
              }}
            />
          </span>
          <span>
            <Highlighter
              searchWords={[`${searchText}`]}
              autoEscape={true}
              textToHighlight={option?.name}
              highlightStyle={{
                background: "gold",
                padding: 0,
                margin: 0,
                fontWeight: 500,
              }}
            />
          </span>
        </div>
      )}
      caseSensitive={false}
      clearButton={true}
    />
  );
};

export default GLCombo;
