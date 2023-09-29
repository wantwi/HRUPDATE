import React, { useEffect, useState } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useAuth from "src/hooks/useAuth";
import useFetch from "src/hooks/useFetch";
import { CompanyReference } from "src/reusable/utils/helper";
import * as RiIcons from "react-icons/ri";
import useAppGolbals from "src/hooks/useAppGolbals";

const TheHeaderDropdownTasks = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const { auth } = useAuth();
  const { setAppGlobals } = useAppGolbals();
  const itemsCount = 2;
  const { companyReference, companyId } = auth;

  useFetch("Users/Companies", (response) => {
    setCompanies(response);
    setAppGlobals((pre) => ({ ...pre, numOfCompany: response.length }));
  });

  const handClickEvent = (id) => {
    setSelectedCompany(id);
  };

  useEffect(() => {
    if (selectedCompany.length > 0) {
      const currentCompany = companies.find((x) => x?.id === selectedCompany);

      sessionStorage.setItem(
        "companyReference",
        JSON.stringify(currentCompany)
      );
      window.location.reload();
    }
    return () => { };
  }, [selectedCompany]);

  // console.log({ auth });
  // const itemsCount = 5
  let compName = JSON.parse(sessionStorage.getItem("companyReference"));
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          padding: "4px 20px",
          background: "#e1e2e3",
          borderRadius: 10,
        }}
      >
        {auth?.companyName || compName?.name}
        {/* {compName.name} */}
      </div>
      <div>
        <CDropdown inNav className="c-header-nav-item mx-2">
          <CDropdownToggle className="c-header-nav-link" caret={false}>
            <RiIcons.RiBankFill
              style={{ fontSize: 20 }}
              title="View Company(s)"
            />
            <CBadge shape="pill" color="warning">
              {companies.length}
            </CBadge>
          </CDropdownToggle>
          <CDropdownMenu placement="bottom-end" className="pt-0">
            <CDropdownItem
              header
              tag="div"
              className="text-center"
              color="light"
            >
              <strong>You have {companies.length} company(s)</strong>
            </CDropdownItem>
            {companies.map((x) => (
              <CDropdownItem
                style={{
                  cursor:
                    process.env.REACT_APP_ID === x.id
                      ? "not-allowed"
                      : "pointer",
                }}
                disabled={companyId === x?.id ? true : false}
                onClick={() => handClickEvent(x?.id)}
                key={x?.id}
                className="d-block"
              >
                <div className="medium mb-1">{x?.name}</div>{" "}
              </CDropdownItem>
            ))}

            {/* <CDropdownItem className="d-block">
          <div className="medium mb-1">Google</div>
          <CProgress size="xs" color="success" value={100} />
        </CDropdownItem> */}
          </CDropdownMenu>
        </CDropdown>
      </div>
    </div>
  );
}

export default TheHeaderDropdownTasks