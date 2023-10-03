import React, { useState } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from "@coreui/icons-react";
import Profile from "../assets/profile.png";

import useAuth from "src/hooks/useAuth";
import * as RiIcons from "react-icons/ri";
import useAppGolbals from "src/hooks/useAppGlobals";
import useFetch from "src/hooks/useFetch";
import { userLogout } from "src/auth/config";
const TheHeaderDropdown = () => {
  const { auth } = useAuth();
  const [profileImage, setProfileImage] = useState(Profile);
  useFetch(`download/${auth?.sub}`, (response) => {
    if (response?.base6) {
      setProfileImage(response);
    } else {
      setProfileImage(Profile);
    }
  });
  // const { appGlobals } = useAppGolbals();
  // const { numOfCompany } = appGlobals;
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={profileImage?.base6 || Profile}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
            style={{ width: 40, height: 40 }}
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>{auth?.name}</strong>
        </CDropdownItem>
        <CDropdownItem to={"/notifications/payrunNotifications"}>
          <CIcon name="cil-bell" className="mfe-2" />
          Notifications
          <CBadge color="info" className="mfs-auto">
            0
          </CBadge>
        </CDropdownItem>
        {/* <CDropdownItem>
          <CIcon name="cil-envelope-open" className="mfe-2" />
          Messages
          <CBadge color="success" className="mfs-auto">42</CBadge>
        </CDropdownItem> */}
        <CDropdownItem>
          {/* <i name="fa fa-user" className="mfe-2" /> */}
          <RiIcons.RiBankLine className="mfe-2" />
          Company(s)
          <CBadge color="danger" className="mfs-auto">
            {/* {numOfCompany} */} 1
          </CBadge>
        </CDropdownItem>
        {/* <CDropdownItem>
          <CIcon name="cil-comment-square" className="mfe-2" />
          Comments
          <CBadge color="warning" className="mfs-auto">42</CBadge>
        </CDropdownItem> */}
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />
          Profile
        </CDropdownItem>

        {/* <CDropdownItem to={"/generalsettings/companyProfile"}>
          <CIcon name="cil-settings" className="mfe-2" />
          Company Profile
        </CDropdownItem> */}

        {/* <CDropdownItem>
          <CIcon name="cil-credit-card" className="mfe-2" />
          Payments
          <CBadge color="secondary" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-file" className="mfe-2" />
          Projects
          <CBadge color="primary" className="mfs-auto">42</CBadge>
        </CDropdownItem> */}
        <CDropdownItem divider />
        <CDropdownItem
          onClick={() => {
            userLogout();
            sessionStorage.removeItem("previous");
          }}
        >
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
}

export default TheHeaderDropdown
