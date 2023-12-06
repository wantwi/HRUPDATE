import { CCol, CInput, CLabel, CRow, CSelect, CTextarea } from "@coreui/react";
import React, { useState, useEffect, useRef } from "react";
import PhoneInput from "react-phone-number-input";
import { useSelector } from "react-redux";
import useMultiFetch from "src/hooks/useMultiFetch";
import {
  GetAllGender,
  GetAllMarital,
  GetCountry,
  GetNationality,
  GetTitles,
} from "src/reusable/API/EmployeeDetailsEndpoints";
import {
  CSCheckbox,
  CSLab,
  CSLineLabel,
  CSRequiredIndicator,
} from "src/reusable/components";
import { GetLabelByName } from "src/reusable/configs/config";
import { capitalizeWord, validateEmail } from "src/reusable/utils/helper";
import DefaultProfile from "../../../../assets/profile.png";
import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
import useAuth from "src/hooks/useAuth";

// const COMPANY_REFRENCE = "00001_A01";

const PersonalDetailForm = ({
  setImage,
  personalFormDetails,
  setPersonalFormDetails,
  showPreview,
  setShowPreview,
  profileImage,
  setIsSubmitBtnClick,
  isSubmitBtnClick,
  resetFormVal,

}) => {
  const lan = useSelector((state) => state.language);
  const [genericPersonalData, setGenericPersonalData] = useState({});

  const {
    genderList = [],
    maritalStatusList = [],
    countryList = [],
    nationalityList = [],
    titleList = [],
  } = genericPersonalData;
  const emailAddressRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const genderRef = useRef(null);
  const dateOfBirthRef = useRef(null);
  const maritalStatusRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const countryRef = useRef(null);
  const nationalityRef = useRef(null);


  const { auth } = useAuth()
  const { companyReference: CompanyReference } = auth

  const refs = [
    firstNameRef,
    lastNameRef,
    genderRef,
    emailAddressRef,
    maritalStatusRef,
    dateOfBirthRef,
    phoneNumberRef,
    countryRef,
    nationalityRef,
  ];

  //  / refs ={{}}

  const multiFetchResponse = (response) => {
    let resObj = {};
    resObj.genderList = response[0].data;
    resObj.maritalStatusList = response[1].data;
    resObj.countryList = response[2].data;
    resObj.nationalityList = response[3].data;
    resObj.titleList = response[4].data;

    setGenericPersonalData(resObj);
  };

  useMultiFetch(
    [
      GetAllGender("GND"),
      GetAllMarital("MST"),
      GetCountry(),
      GetNationality(),
      GetTitles(CompanyReference),
    ],
    multiFetchResponse
  );

  const handleEmailFocusOut = () => {
    // if (personalFormDetails.emailAddress.length > 0) {
    //   if (!validateEmail(personalFormDetails.emailAddress)) {
    //     emailAddressRef.current.style.border = "1px solid red";
    //     // emailAddressRef.current.focus();
    //     toast.error(`Email address is not valid`);
    //     return;
    //   }
    // } else {
    //   emailAddressRef.current.style.border = "2px solid #d8dbe0";
    // }
  };

  // useEffect(() => {
  //   if (emailAddressRef.current?.value) {
  //     if (!validateEmail(personalFormDetails.emailAddress)) {
  //       emailAddressRef.current.style.border = "2px solid red";

  //       // emailAddressRef.current.focus();
  //       return;
  //     }

  //     emailAddressRef.current.style.border = "2px solid green";
  //   }

  //   return () => {
  //     //emailAddressRef.current.style.border = "2px solid #d8dbe0";
  //   };
  // }, [personalFormDetails.emailAddress]);

  const handleOnChange = (event) => {
    setPersonalFormDetails((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const getImageFileObject = (imageFile) => {
    setImage(imageFile);
  };
  const runAfterImageDelete = (file) => {
    setImage(null);
  };

  useEffect(() => {
    if (isSubmitBtnClick) {
      refs.forEach((ref) => {

        if (ref.current.value.length > 0) {
          ref.current.style.border = "1px solid green";
        } else {
          ref.current.style.border = "2px solid red";
        }
      });

      setIsSubmitBtnClick(false);
    }

    return () => { };
  }, [isSubmitBtnClick]);

  const checkForValue = (ref) => {
    if (ref.current.name === "emailAddress") {
      if (personalFormDetails.emailAddress.length > 0 && validateEmail(personalFormDetails.emailAddress)) {
        ref.current.style.border = "1px solid green";
      }
      else if (ref.current.value.length === 0 && !validateEmail(personalFormDetails.emailAddress)) {
        ref.current.style.border = "2px solid red";
      }
      else {
        ref.current.style.border = "2px solid red";
      }

    } else {
      if (ref.current.value.length > 0) {
        ref.current.style.border = "1px solid green";
      }
    }

  };

  // useEffect(() => {
  //   refs.forEach((ref) => {
  //     console.log({ refVal: ref.current.value });
  //     if (ref.current.value.length > 0) {
  //       ref.current.style.border = "1px solid green";
  //     } else {
  //       ref.current.style.border = "2px solid red";
  //     }
  //   });

  //   return () => {};
  // }, [personalFormDetails]);

  const PreviewImage = () => {
    return (
      <>
        <div className="mt-2 align-content-center" style={{ width: 250 }}>
          <img
            style={{ borderRadius: 10, width: 250, height: 250 }}
            alt="profile"
            src={profileImage?.base6 || DefaultProfile}
          />
          <button
            className="form-control mt-2 bg-danger"
            style={{ color: "#fff" }}
            onClick={() => setShowPreview(false)}
          >
            {
              GetLabelByName("HCM-IIQS2WWFTPP_KCMI", lan, "Delete")
            }

          </button>
        </div>
      </>
    );
  };

  useEffect(() => {
    refs.forEach((ref) => {
      ref.current.style.border = "1px solid #e1e2e3";
    });

    return () => { };
  }, [resetFormVal]);

  return (
    <>
      <CRow className={"bottom-spacing"}>
        {/* Details */}
        <CCol md="6">
          <CRow>
            <CCol md="4" xs="4">
              <CLabel>
                {" "}
                <CSLab code="HCM-KZPKH8ICPD-PSLL" />{" "}
              </CLabel>
              <CSelect
                name="titleId"
                value={personalFormDetails?.titleId || ""}
                onChange={handleOnChange}
              >

                <option value="">{GetLabelByName("HCM-EOH7D1YOS2G_LOLN", lan, "Select title")}</option>

                {titleList.map((x) => (
                  <option key={x.id} value={x.id}>
                    {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                  </option>
                ))}
              </CSelect>
            </CCol>
            <CCol md="4" xs="8">
              <CLabel>
                {" "}
                <CSLab code="HCM-KPH53NF08RG" />{" "}
              </CLabel>
              <CSRequiredIndicator />
              <input
                className="form-control"
                placeholder={GetLabelByName("HCM-M45LNYXVT6_LASN", lan)}
                name="firstName"
                value={personalFormDetails?.firstName || ""}
                onChange={(e) => {
                  handleOnChange(e);
                  checkForValue(firstNameRef);
                }}
                ref={firstNameRef}
              />
            </CCol>
            <CCol md="4">
              <CLabel>
                {" "}
                <CSLab code="HCM-ZYCFSGCKMC" />{" "}
              </CLabel>
              <CSRequiredIndicator />
              <input
                className="form-control"
                placeholder={GetLabelByName("HCM-B6FYFT3XE6S_HRPR", lan)}
                name="lastName"
                value={personalFormDetails?.lastName || ""}
                onChange={(e) => {
                  handleOnChange(e);
                  checkForValue(lastNameRef);
                }}
                ref={lastNameRef}
              />
            </CCol>
          </CRow>

          <CRow>
            <CCol md="4">
              <CLabel>
                {" "}
                <CSLab code="HCM-S2MUMDYJNP_HRPR" />{" "}
              </CLabel>
              <CInput
                placeholder={GetLabelByName("HCM-WOEVNX19YX-LASN", lan)}
                name="otherName"
                value={personalFormDetails?.otherName || ""}
                onChange={handleOnChange}
              />
            </CCol>

            <CCol md="4" xs="6">
              <CLabel>
                <CSLab code="HCM-7HTWFD0THEN-PSLL" />
              </CLabel>
              <CSRequiredIndicator />
              <select
                name="gender"
                className="form-control"
                value={personalFormDetails?.gender || -1}
                onChange={(e) => {
                  handleOnChange(e);
                  checkForValue(genderRef);
                }}
                ref={genderRef}
              >

                <option value="">{GetLabelByName("HCM-MM55OQ4NDNP_PSLL", lan, "Select gender")}</option>
                {genderList.map((x, i) => (
                  <option key={x.id} value={x.id}>
                    {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                  </option>
                ))}
              </select>
            </CCol>
            <CCol md="4" xs="6">
              <CLabel>
                <CSLab code="HCM-XYNVK7A8USK_PSLL" />
              </CLabel>
              <CSRequiredIndicator />
              <input
                className="form-control"
                name="dateOfBirth"
                value={personalFormDetails?.dateOfBirth || ""}
                max={new Date().toISOString().slice(0, -14)}
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) => {
                  handleOnChange(e);
                  checkForValue(dateOfBirthRef);
                }}
                type="date"
                ref={dateOfBirthRef}
              />
            </CCol>
            <CCol md="4">
              <CLabel htmlFor="">
                <CSLab code="HCM-76DW66H8FM-LANG" />
              </CLabel>
              <CSRequiredIndicator />

              <select
                className="form-control"
                name="maritalStatus"
                value={personalFormDetails?.maritalStatus || ""}
                onChange={(e) => {
                  handleOnChange(e);
                  checkForValue(maritalStatusRef);
                }}
                ref={maritalStatusRef}
              >

                <option value="">{GetLabelByName("HCM-24XO0WBOU79-HRPR", lan, "Select marital status")}</option>
                {maritalStatusList.map((x, i) => (
                  <option value={x.id} key={i}>
                    {capitalizeWord(GetLabelByName(`${x?.code || x?.name}`, lan, x.name))}

                  </option>
                ))}
              </select>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="12" style={{ marginTop: "5px" }}>
              <CSLineLabel name={"HCM-YD305CBYLEE_LOLN"} />
            </CCol>
            <CCol md="5">
              <CLabel>
                <CSLab code="HCM-CXLK7IYZ9B9-KCMI" />
              </CLabel>
              <CSRequiredIndicator />
              <input
                type="email"
                className="form-control"
                placeholder={GetLabelByName("HCM-61522DCMNA-LANG", lan)}
                name="emailAddress"
                value={personalFormDetails?.emailAddress || ""}
                onChange={(e) => {
                  handleOnChange(e);
                  checkForValue(emailAddressRef);
                }}
                ref={emailAddressRef}
                onBlur={handleEmailFocusOut}
              />
            </CCol>
            <CCol md="4" xs="6">
              <CLabel>
                <CSLab code="HCM-BOSPUEXHRP_PSLL" />
              </CLabel>
              <CSRequiredIndicator />
              <div style={{ padding: 0, margin: 0 }}>
                <PhoneInput
                  name="phoneNumber"
                  placeholder="Phone"
                  value={personalFormDetails?.phoneNumber || ""}
                  onChange={(e) => {
                    setPersonalFormDetails((prev) => ({
                      ...prev,
                      phoneNumber: e,
                    }));
                    checkForValue(phoneNumberRef);
                  }}
                  ref={phoneNumberRef}
                />
              </div>
            </CCol>
            <CCol md="3" xs="6">
              <CLabel>
                <CSLab code="HCM-W7SKIIIFCKE_PSLL" />
              </CLabel>
              <CInput
                placeholder={GetLabelByName("HCM-MLXT5911ZC-LASN", lan)}
                name="digitalAddress"
                value={personalFormDetails?.digitalAddress || ""}
                onChange={handleOnChange}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="12">
              <CLabel>
                <CSLab code="HCM-ZSJMVZ6F8MR-LOLN" />
              </CLabel>
              <CTextarea
                placeholder={GetLabelByName("HCM-AF2ZPOUARPA-PSLL", lan)}
                name="address"
                value={personalFormDetails?.address || ""}
                onChange={handleOnChange}
                style={{ height: "60px", resize: "none" }}
              ></CTextarea>
            </CCol>
          </CRow>
        </CCol>
        <CCol md="1">
          <div className="vl" style={{ height: "45vh" }}></div>
        </CCol>
        <CCol md="5">
          <CRow>
            <CCol md="6" xs="6">
              <CLabel>
                <CSLab code="HCM-CSKVMLLGNW" />
              </CLabel>
              <CSRequiredIndicator />
              <select
                name="country"
                className="form-control"
                value={personalFormDetails?.country || -1}
                onChange={(e) => {
                  handleOnChange(e);
                  checkForValue(countryRef);
                }}
                ref={countryRef}
              >

                <option value="">{GetLabelByName("HCM-SU6R69R7V1B-HRPR", lan, "Select country")}</option>
                {countryList.map((x, i) => (
                  <option key={i} value={x.id}>
                    {GetLabelByName(`${x?.code || x?.name}`, lan, x.name)}
                  </option>
                ))}
              </select>
            </CCol>
            <CCol md="6" xs="6">
              <CLabel>
                <CSLab code="HCM-IM8I8SKJ1J9_KCMI" />
              </CLabel>
              <CSRequiredIndicator />
              <select
                className="form-control"
                name="nationality"
                value={personalFormDetails?.nationality || -1}
                onChange={(e) => {
                  handleOnChange(e);
                  checkForValue(nationalityRef);
                }}
                ref={nationalityRef}
              >

                <option value="">{GetLabelByName("HCM-QBIJLIRXEVB-LASN", lan, "Select nationality")}</option>
                {nationalityList.map((x, i) => (
                  <option key={i} value={x.id}>
                    {GetLabelByName(`${x?.code || x?.demonym}`, lan, x.demonym)}
                  </option>
                ))}
              </select>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="6" xs="7">
              <CLabel>
                <CSLab code="HCM-WRKPLF34TW_LOLN" />
              </CLabel>
              <CInput
                placeholder={GetLabelByName("HCM-RHPFDVJQYK_LANG", lan)}
                name="nationalID"
                value={personalFormDetails?.nationalID || ""}
                onChange={handleOnChange}
              />
            </CCol>
            <CCol md="2" xs="5" style={{ marginTop: "15px" }}>
              <CSCheckbox
                label="HCM-95HTK1MHWY_PSLL"
                checked={personalFormDetails?.isResident || false}
                name="isResident"
                value={personalFormDetails?.isResident || false}
                onChange={(e) =>
                  setPersonalFormDetails((prev) => ({
                    ...prev,
                    isResident: e.target.checked,
                  }))
                }
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="12" style={{ marginTop: "5px" }}>
              <CRow>
                <CCol md="12">
                  <CSLineLabel name="HCM-VSHKR5ODJ1H_LANG" />{" "}
                </CCol>
                <CCol md="12">
                  <CSLab label="Profile Picture" code="HCM-AN601MNCJXE-LOLN" />
                  {showPreview ? (
                    <PreviewImage />
                  ) : (
                    <ImageUploader
                      onFileAdded={(img) => getImageFileObject(img)}
                      onFileRemoved={(img) => runAfterImageDelete(img)}
                      style={{
                        height: 250,
                        width: 250,
                        marginTop: 10,
                        borderRadius: 10,
                      }}
                    />
                  )}
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  );
};

export default PersonalDetailForm;
