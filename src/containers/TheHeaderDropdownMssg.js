import React, { useState, useEffect } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useAuth from "src/hooks/useAuth";
import useFetch from "src/hooks/useFetch";
import "./messageHeader.css";
import * as RiIcons from "react-icons/ri";

const TheHeaderDropdownMssg = () => {
  const { auth } = useAuth();
  const [apps, setApps] = useState([]);
  const { companyReference, companyId, companyName } = auth;
  const itemsCount = 4

  const { setUrl } = useFetch("", (response) => {
    // console.log('apps', response)
    setApps(response);
  });

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("companyReference"))) {
      setUrl(
        `Applications/${JSON.parse(sessionStorage.getItem("companyReference"))?.reference
        }`
      );
    }

    // console.log({
    //   headerCall: JSON.parse(sessionStorage.getItem("companyReference")),
    // });

    return () => { };
  }, []);

  useEffect(() => {
    if (companyReference) {
      setUrl(`Applications/${companyReference}`);
    }
    return () => {
      setUrl("");
    };
  }, [auth]);

  return (
    <CDropdown inNav className="c-header-nav-item mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link " caret={false}>
        {/* <CIcon name="cil-envelope-open" /><CBadge shape="pill" color="info">{itemsCount}</CBadge> */}
        <h5
          className="badge badge-info"
          style={{ fontWeight: "bold", padding: 10, fontSize: 15, minWidth: 150 }}
        >
          HR  <RiIcons.RiArrowDownSFill /> {" "}
        </h5>
      </CDropdownToggle>
      <CDropdownMenu
        className="pt-0 app-menu-wrapp"
        placement="bottom-end"
        style={{ left: "1px !important", minWidth: 200 }}
      >
        <CDropdownItem header tag="div" color="light">
          <strong>You have {apps.length} application(s)</strong>
        </CDropdownItem>
        {apps.map((x) => (
          <CDropdownItem
            key={x?.id}
            style={{
              cursor:
                process.env.REACT_APP_ID === x.id ? "not-allowed" : "pointer",
            }}
            disabled={process.env.REACT_APP_ID === x.id ? true : false}
            href={`${x?.appPath}/#/?id=${companyId}$${companyReference}$${companyName}`}
            target="_blank"
          >
            <div className="message">
              <div className="text-truncate font-weight-bold">{x?.name}</div>
            </div>
          </CDropdownItem>
        ))}

        {/* <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                  src={'avatars/5.jpg'}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-danger"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Janet Doe</small>
              <small className="text-muted float-right mt-1">1:52 PM</small>
            </div>
            <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
            </div>
          </div>
        </CDropdownItem>

        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                  src={'avatars/4.jpg'}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-info"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Joe Doe</small>
              <small className="text-muted float-right mt-1">4:03 AM</small>
            </div>
            <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
            </div>
          </div>
        </CDropdownItem> */}
        {/* <CDropdownItem href="#" className="text-center border-top"><strong>View all messages</strong></CDropdownItem> */}
      </CDropdownMenu>
    </CDropdown>
  );
}

export default TheHeaderDropdownMssg