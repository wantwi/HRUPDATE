export const genericParameter = {
    'details': {
        "code": "",
        "name": "",
        "description": "",
        "type": "",
        "parentId": "00000000-0000-0000-0000-000000000000",
        "salaryGradeId": "00000000-0000-0000-0000-000000000000",
        "companyId": "00000000-0000-0000-0000-000000000000",
        "status": -1
    },
    "orgGLAccounts": {
        "salaryGLId": "00000000-0000-0000-0000-000000000000",
        "netSalaryPayableGLId": "00000000-0000-0000-0000-000000000000",
        "shiftAllowanceGLId": "00000000-0000-0000-0000-000000000000",
        "incomeTaxGLId": "00000000-0000-0000-0000-000000000000",
        "operatingOvertimeGLId": "00000000-0000-0000-0000-000000000000",
        "taxReliefGLId": "00000000-0000-0000-0000-000000000000",
        "mandatorySavingSchemeEmployeeContributionGLId": "00000000-0000-0000-0000-000000000000",
        "mandatorySavingSchemeEmployerContributionGLId": "00000000-0000-0000-0000-000000000000",
        "mandatorySavingSchemeEmployerTotalPayableGLId": "00000000-0000-0000-0000-000000000000",
        "volontarySavingSchemeEmployeeContributionGLId": "00000000-0000-0000-0000-000000000000",
        "volontarySavingSchemeEmployerContributionGLId": "00000000-0000-0000-0000-000000000000",
        "volontarySavingSchemeEmployerTotalPayableGLId": "00000000-0000-0000-0000-000000000000"
    },
    "orgLocations": [
        {
            "locationId": "00000000-0000-0000-0000-000000000000"
        }
    ],
    "orgEarnings": [
        {
            "earningId": "00000000-0000-0000-0000-000000000000",
            "calculationRule": "string",
            "currencyId": "00000000-0000-0000-0000-000000000000",
            "maximumAmount": 0
        }
    ],
    "orgDeductions": [
        {
            "deductionId": "00000000-0000-0000-0000-000000000000",
            "calculationRule": "string",
            "currencyId": "00000000-0000-0000-0000-000000000000",
            "maximumAmount": 0
        }
    ],
    "id": "00000000-0000-0000-0000-000000000000"
}


/**
 * This is the data model for the GL Account Setup [POST]
 */

export const glAccountData = {
    "code": "",
    "internalCode": "",
    "name": "",
    "description": "",
    "companyId": "",
    "isControledAC": false,
    "option": { "t1": false, "t2": false, "t3": false, "t4": false, "t5": false, "t6": false, "t7": false, "t8": false, "t9": false, "t10": false},
    "id": ""
  }


  export const savingSchemeType = [
    {value:'', name: 'Select Saving Scheme Types'},
    {value: 'PersonalPensionScheme', name: 'Personal Pension Scheme'},
    {value: 'DefinedBenefitBasicNSSS', name: 'Defined Benefit Basic NSSS' },
    {value:'OccupationalPensionScheme', name: 'Occupational Pension Scheme' }
  ]
