import { CCol, CLabel, CRow } from '@coreui/react'
import React from 'react'
import CSLineLabel from '../LineTextComponent/CSLineLabel'
import { GetLabelByName } from 'src/reusable/configs/config'
import { CSLab } from "src/reusable/components"
import { useSelector } from 'react-redux'
import GLCombo from '../GLCombo/GLCombo'
// import FormDivider from 'src/views/EmployeeManager/EmployeeDetail/forms/FormDivider'

const GLFormComponent = ({ gLAccountData, submitData, setSubmitData, disabled }) => {
  const lan = useSelector((state) => state.language);
  return (
    <CRow>
      <CCol md="12">
        {/* <CSLineLabel name="HCM-KKY1B2A9GJC_LOLN" /> */}
      </CCol>
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
            <GLCombo
              name="salaryGLId"
              text={GetLabelByName(
                "HCM-S21O1901NO-LANG",
                lan
              )}
              defaultVal={
                gLAccountData.find(
                  (x) => x?.id === submitData?.salaryGLId
                ) || ""
              }
              gLAccountData={gLAccountData}
              state={submitData}
              setState={setSubmitData}
              disabled={disabled}
            />
          </CCol>
          <CCol md="6">
            <CLabel>
              <CSLab code="HCM-0CQE84MSYWAG-KCMI" />
            </CLabel>
            <br />
            <GLCombo
              name="incomeTaxGLId"
              text={GetLabelByName(
                "HCM-N0AWTBARHZA-KCMI",
                lan
              )}
              defaultVal={
                gLAccountData.find(
                  (x) => x?.id === submitData?.incomeTaxGLId
                ) || ""
              }
              gLAccountData={gLAccountData}
              state={submitData}
              setState={setSubmitData}
              disabled={disabled}

            />
          </CCol>
        </CRow>

        <CRow>
          <CCol md="6">
            <CLabel>
              <CSLab code="HCM-EJ9UPUJMQCM-PSLL" />
            </CLabel>
            <br />
            <GLCombo
              name="netSalaryPayableGLId"
              text={GetLabelByName(
                "HCM-N0AWTBARHZA-KCMI",
                lan
              )}
              defaultVal={
                gLAccountData.find(
                  (x) =>
                    x?.id === submitData?.netSalaryPayableGLId
                ) || ""
              }
              gLAccountData={gLAccountData}
              state={submitData}
              setState={setSubmitData}
              disabled={disabled}
            />
          </CCol>
          <CCol md="6">
            <CLabel>
              <CSLab code="HCM-2BNAL7LG4ZS_PSLL" />
            </CLabel>
            <br />
            <GLCombo
              name="operatingOvertimeGLId"
              text={GetLabelByName(
                "HCM-N0AWTBARHZA-KCMI",
                lan
              )}
              defaultVal={
                gLAccountData.find(
                  (x) =>
                    x?.id ===
                    submitData?.operatingOvertimeGLId
                ) || ""
              }
              gLAccountData={gLAccountData}
              state={submitData}
              setState={setSubmitData}
              disabled={disabled}
            />
          </CCol>
        </CRow>

        <CRow>
          <CCol md="6">
            <CLabel>
              <CSLab code="HCM-IJW6JZJJEYA-PSLL" />
            </CLabel>
            <br />
            <GLCombo
              name="shiftAllowanceGLId"
              text={GetLabelByName(
                "HCM-N0AWTBARHZA-KCMI",
                lan
              )}
              defaultVal={
                gLAccountData.find(
                  (x) =>
                    x?.id === submitData?.shiftAllowanceGLId
                ) || ""
              }
              gLAccountData={gLAccountData}
              state={submitData}
              setState={setSubmitData}
              disabled={disabled}
            />
          </CCol>
          <CCol md="6">
            <CLabel>
              <CSLab code="HCM-A5BKMEIDEA6_LASN" />
            </CLabel>
            <br />
            <GLCombo
              name="taxReliefGLId"
              text={GetLabelByName(
                "HCM-N0AWTBARHZA-KCMI",
                lan
              )}
              defaultVal={
                gLAccountData.find(
                  (x) => x?.id === submitData?.taxReliefGLId
                ) || ""
              }
              gLAccountData={gLAccountData}
              state={submitData}
              setState={setSubmitData}
              disabled={disabled}
            />
          </CCol>
        </CRow>
      </CCol>

      <CCol md="1">
        <div className="vl" style={{ height: "45vh" }}></div>
      </CCol>

      {/* <FormDivider /> */}
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
                <GLCombo
                  name="mandatorySavingSchemeEmployeeContributionGLId"
                  text={GetLabelByName(
                    "HCM-N0AWTBARHZA-KCMI",
                    lan
                  )}
                  defaultVal={
                    gLAccountData.find(
                      (x) =>
                        x?.id ===
                        submitData?.mandatorySavingSchemeEmployeeContributionGLId
                    ) || ""
                  }
                  gLAccountData={gLAccountData}
                  state={submitData}
                  setState={setSubmitData}
                  disabled={disabled}
                />
              </CCol>
              <CCol md="12">
                <CLabel>
                  <CSLab code="HCM-4JZ72YP83IP-LANG" />
                </CLabel>
                <br />
                <GLCombo
                  name="mandatorySavingSchemeEmployerContributionGLId"
                  text={GetLabelByName(
                    "HCM-N0AWTBARHZA-KCMI",
                    lan
                  )}
                  defaultVal={
                    gLAccountData.find(
                      (x) =>
                        x?.id ===
                        submitData?.mandatorySavingSchemeEmployerContributionGLId
                    ) || ""
                  }
                  gLAccountData={gLAccountData}
                  state={submitData}
                  setState={setSubmitData}
                  disabled={disabled}
                />
              </CCol>
              <CCol md="12">
                <CLabel>
                  <CSLab code="HCM-BHPWFP7WEX6-PSLL" />
                </CLabel>
                <br />
                <GLCombo
                  name="mandatorySavingSchemeEmployerTotalPayableGLId"
                  text={GetLabelByName(
                    "HCM-N0AWTBARHZA-KCMI",
                    lan
                  )}
                  defaultVal={
                    gLAccountData.find(
                      (x) =>
                        x?.id ===
                        submitData?.mandatorySavingSchemeEmployerTotalPayableGLId
                    ) || ""
                  }
                  gLAccountData={gLAccountData}
                  state={submitData}
                  setState={setSubmitData}
                  disabled={disabled}
                />
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
                <GLCombo
                  name="volontarySavingSchemeEmployeeContributionGLId"
                  text={GetLabelByName(
                    "HCM-N0AWTBARHZA-KCMI",
                    lan
                  )}
                  defaultVal={
                    gLAccountData.find(
                      (x) =>
                        x?.id ===
                        submitData?.volontarySavingSchemeEmployeeContributionGLId
                    ) || ""
                  }
                  gLAccountData={gLAccountData}
                  state={submitData}
                  setState={setSubmitData}
                  disabled={disabled}
                />
              </CCol>
              <CCol md="12">
                <CLabel>
                  <CSLab code="HCM-4JZ72YP83IP-LANG" />
                </CLabel>
                <br />
                <GLCombo
                  name="volontarySavingSchemeEmployerContributionGLId"
                  text={GetLabelByName(
                    "HCM-N0AWTBARHZA-KCMI",
                    lan
                  )}
                  defaultVal={
                    gLAccountData.find(
                      (x) =>
                        x?.id ===
                        submitData?.volontarySavingSchemeEmployerContributionGLId
                    ) || ""
                  }
                  gLAccountData={gLAccountData}
                  state={submitData}
                  setState={setSubmitData}
                  disabled={disabled}
                />
              </CCol>
              <CCol md="12">
                <CLabel htmlFor="rate">
                  <CSLab code="HCM-BKT38G6Y2NM_PSLL" />
                </CLabel>
                <br />
                <GLCombo
                  name="volontarySavingSchemeEmployerTotalPayableGLId"
                  text={GetLabelByName(
                    "HCM-N0AWTBARHZA-KCMI",
                    lan
                  )}
                  defaultVal={
                    gLAccountData.find(
                      (x) =>
                        x?.id ===
                        submitData?.volontarySavingSchemeEmployerTotalPayableGLId
                    ) || ""
                  }
                  gLAccountData={gLAccountData}
                  state={submitData}
                  setState={setSubmitData}
                  disabled={disabled}
                />
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  )
}

export default GLFormComponent