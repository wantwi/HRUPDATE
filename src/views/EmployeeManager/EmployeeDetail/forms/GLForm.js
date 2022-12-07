import { CCol, CLabel, CRow, CSelect } from "@coreui/react";
import React, {  useState } from "react";
import { useSelector } from "react-redux";
import useAuth from "src/hooks/useAuth";
import useFetch from "src/hooks/useFetch";
import { GetGLAccounts } from "src/reusable/API/EmployeeDetailsEndpoints";
import { CSLab, CSLineLabel } from "src/reusable/components";
import { GetLabelByName } from "src/reusable/configs/config";
const COMPANY_REFRENCE = "00001_A01";
const DEFAULT_GUID =  "00000000-0000-0000-0000-000000000000"
const GLForm = ({glFormData, setGlFormData}) => {
    const lan = useSelector((state) => state.language);
    
    const [gLAccountData, setGLAccountData] = useState([])
    const handleOnChange =(event)=>{
        setGlFormData(prev =>({
            ...prev,
            [event.target.name]:event.target.value
        }))
    }
    const {auth}= useAuth()
    const {companyReference: CompanyReference } = auth


    useFetch(GetGLAccounts(CompanyReference),(response) =>{
        setGLAccountData(response)
    })

   
    
  return (
    <>
      <CRow>
        <CCol md="12">{/* <CSLineLabel name="HCM-KKY1B2A9GJC_LOLN" /> */}</CCol>
        <CCol md="5">
          <CRow>
            <CCol md="12">
              <CSLineLabel name="HCM-E4VNOAZJPA_LASN" />
            </CCol>
          </CRow>

          <CRow>
            <CCol md="6">
              <CLabel>
                <CSLab code="HCM-WINM5J0YY5K-LANG" />
              </CLabel>
              <br />
              <CSelect
                value={glFormData?.salaryGLId || DEFAULT_GUID}
                name="salaryGLId"
                onChange={handleOnChange}
              >
                 <option value={DEFAULT_GUID}>{GetLabelByName("HCM-S21O1901NO-LANG",lan)} </option>
                {gLAccountData.map((x, i) => (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </CSelect>
            </CCol>
            <CCol md="6">
              <CLabel>
                <CSLab code="HCM-0CQE84MSYWAG-KCMI" />
              </CLabel>
              <br />
              <CSelect
                value={glFormData?.incomeTaxGLId || DEFAULT_GUID}
                name="incomeTaxGLId"
                onChange={handleOnChange}
              >
                <option value={DEFAULT_GUID}> {GetLabelByName("HCM-N0AWTBARHZA-KCMI",lan,"Select")} {GetLabelByName("HCM-0CQE84MSYWAG-KCMI",lan,"Income Tax")} </option>
                {gLAccountData.map((x, i) => (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </CSelect>
            </CCol>
          </CRow>

          <CRow>
            <CCol md="6">
              <CLabel>
                <CSLab code="HCM-EJ9UPUJMQCM-PSLL" />
              </CLabel>
              <br />
              <CSelect
                value={glFormData?.netSalaryPayableGLId || DEFAULT_GUID}
                name="netSalaryPayableGLId"
                onChange={handleOnChange}
              >
                 <option value={DEFAULT_GUID}>{GetLabelByName("HCM-N0AWTBARHZA-KCMI",lan,"Select")} {GetLabelByName("HCM-EJ9UPUJMQCM-PSLL",lan)} </option>
                {gLAccountData.map((x, i) => (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </CSelect>
            </CCol>
            <CCol md="6">
              <CLabel>
                <CSLab code="HCM-2BNAL7LG4ZS_PSLL" />
              </CLabel>
              <br />
              <CSelect
                value={glFormData?.operatingOvertimeGLId || DEFAULT_GUID}
                name="operatingOvertimeGLId"
                onChange={handleOnChange}
              >
                <option value={DEFAULT_GUID}>{GetLabelByName("HCM-N0AWTBARHZA-KCMI",lan,"Select")} {GetLabelByName("HCM-2BNAL7LG4ZS_PSLL",lan)} </option>
                {gLAccountData.map((x, i) => (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </CSelect>
            </CCol>
          </CRow>

          <CRow>
            <CCol md="6">
              <CLabel>
                <CSLab code="HCM-IJW6JZJJEYA-PSLL" />
              </CLabel>
              <br />
              <CSelect
                value={glFormData?.shiftAllowanceGLId || DEFAULT_GUID}
                name="shiftAllowanceGLId"
                onChange={handleOnChange}
              >
                 <option value={DEFAULT_GUID}>{GetLabelByName("HCM-N0AWTBARHZA-KCMI",lan,"Select")} {GetLabelByName("HCM-IJW6JZJJEYA-PSLL",lan)} </option>
                {gLAccountData.map((x, i) => (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </CSelect>
            </CCol>
            <CCol md="6">
              <CLabel>
                <CSLab code="HCM-A5BKMEIDEA6_LASN" />
              </CLabel>
              <br />
              <CSelect
                value={glFormData?.taxReliefGLId || DEFAULT_GUID}
                name="taxReliefGLId"
                onChange={handleOnChange}
              >
                 <option value={DEFAULT_GUID}>{GetLabelByName("HCM-N0AWTBARHZA-KCMI",lan,"Select")} {GetLabelByName("HCM-A5BKMEIDEA6_LASN",lan)} </option>
                {gLAccountData.map((x, i) => (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </CSelect>
            </CCol>
          </CRow>
        </CCol>

        <CCol md="1">
          <div className="vl" style={{ height: "45vh" }}></div>
        </CCol>
        <CCol md="6">
          <CRow>
            <CCol md="6">
              {/*  Saving Schemes */}
              <CSLineLabel name="HCM-9LW6QXJLQK-LASN" />
            </CCol>
            <CCol md="6">
              <CSLineLabel name="HCM-TPF2QMSQ1YG-LASN" />
            </CCol>
          </CRow>

          <CRow>
            <CCol md="6">
              <CRow>
                <CCol md="12">
                  <CLabel>
                    <CSLab code="HCM-VIEZQFX1BJA-LASN" />
                  </CLabel>
                  <br />
                  <CSelect
                    value={
                      glFormData?.mandatorySavingSchemeEmployeeContributionGLId ||
                      "00000000-0000-0000-0000-000000000000"
                    }
                    name="mandatorySavingSchemeEmployeeContributionGLId"
                    onChange={handleOnChange}
                  >
                     <option value={DEFAULT_GUID}>{GetLabelByName("HCM-N0AWTBARHZA-KCMI",lan,"Select")} {GetLabelByName("HCM-VIEZQFX1BJA-LASN",lan)} </option>
                    {gLAccountData.map((x, i) => (
                      <option key={x.id} value={x.id}>
                        {x.name}
                      </option>
                    ))}
                  </CSelect>
                </CCol>
                <CCol md="12">
                  <CLabel>
                    <CSLab code="HCM-4JZ72YP83IP-LANG" />
                  </CLabel>
                  <br />
                  <CSelect
                    value={
                      glFormData?.mandatorySavingSchemeEmployerContributionGLId ||
                      DEFAULT_GUID
                    }
                    name="mandatorySavingSchemeEmployerContributionGLId"
                    onChange={handleOnChange}
                  >
                    <option value={DEFAULT_GUID}>{GetLabelByName("HCM-N0AWTBARHZA-KCMI",lan,"Select")} {GetLabelByName("HCM-4JZ72YP83IP-LANG",lan)} </option>
                    {gLAccountData.map((x, i) => (
                      <option key={x.id} value={x.id}>
                        {x.name}
                      </option>
                    ))}
                  </CSelect>
                </CCol>
                <CCol md="12">
                  <CLabel>
                    <CSLab code="HCM-BHPWFP7WEX6-PSLL" />
                  </CLabel>
                  <br />
                  <CSelect
                    value={
                      glFormData?.mandatorySavingSchemeEmployerTotalPayableGLId ||
                      DEFAULT_GUID
                    }
                    name="mandatorySavingSchemeEmployerTotalPayableGLId"
                    onChange={handleOnChange}
                  >
                    <option value={DEFAULT_GUID}>{GetLabelByName("HCM-N0AWTBARHZA-KCMI",lan,"Select")} {GetLabelByName("HCM-BHPWFP7WEX6-PSLL",lan)} </option>
                    {gLAccountData.map((x, i) => (
                      <option key={x.id} value={x.id}>
                        {x.name}
                      </option>
                    ))}
                  </CSelect>
                </CCol>
              </CRow>
            </CCol>

            <CCol md="6">
              <CRow>
                <CCol md="12">
                  <CLabel>
                    <CSLab code="HCM-VIEZQFX1BJA-LASN" />
                  </CLabel>
                  <br />
                  <CSelect
                    value={
                      glFormData?.volontarySavingSchemeEmployeeContributionGLId ||
                      DEFAULT_GUID
                    }
                    name="volontarySavingSchemeEmployeeContributionGLId"
                    onChange={handleOnChange}
                  >
                    <option value={DEFAULT_GUID}>{GetLabelByName("HCM-N0AWTBARHZA-KCMI",lan,"Select")} {GetLabelByName("HCM-VIEZQFX1BJA-LASN",lan)} </option>
                    {gLAccountData.map((x, i) => (
                      <option key={x.id} value={x.id}>
                        {x.name}
                      </option>
                    ))}
                  </CSelect>
                </CCol>
                <CCol md="12">
                  <CLabel>
                    <CSLab code="HCM-4JZ72YP83IP-LANG" />
                  </CLabel>
                  <br />
                  <CSelect
                    value={
                      glFormData?.volontarySavingSchemeEmployerContributionGLId ||
                      DEFAULT_GUID
                    }
                    name="volontarySavingSchemeEmployerContributionGLId"
                    onChange={handleOnChange}
                  >
                     <option value={DEFAULT_GUID}>{GetLabelByName("HCM-N0AWTBARHZA-KCMI",lan,"Select")} {GetLabelByName("HCM-4JZ72YP83IP-LANG",lan)} </option>
                    {gLAccountData.map((x, i) => (
                      <option key={x.id} value={x.id}>
                        {x.name}
                      </option>
                    ))}
                  </CSelect>
                </CCol>
                <CCol md="12">
                  <CLabel htmlFor="rate">
                    <CSLab code="HCM-BKT38G6Y2NM_PSLL" />
                  </CLabel>
                  <br />
                  <CSelect
                    value={
                      glFormData?.volontarySavingSchemeEmployerTotalPayableGLId ||
                      DEFAULT_GUID
                    }
                    name="volontarySavingSchemeEmployerTotalPayableGLId"
                    onChange={handleOnChange}
                  >
                    <option value={DEFAULT_GUID}>{GetLabelByName("HCM-N0AWTBARHZA-KCMI",lan,"Select")} {GetLabelByName("HCM-BKT38G6Y2NM_PSLL",lan,"Employer Total Payable")} </option>
                    {gLAccountData.map((x, i) => (
                      <option key={x.id} value={x.id}>
                        {x.name}
                      </option>
                    ))}
                  </CSelect>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  );
};

export default GLForm;
