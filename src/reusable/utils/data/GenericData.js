export const locations = [
    { id: 1, name: 'Accra, Tema', status: 1 },
    { id: 2, name: 'Osu', status: 1 },
    { id: 3, name: 'Bolgatanga', status: 1 },
    { id: 4, name: 'Cape Coast', status: 1 },
    { id: 5, name: 'Koforidua', status: 1 },
    { id: 6, name: 'Tamale', status: 1 }
];

export const Locations = {
    dataSource: locations, value: 'id', text: 'name', parentValue: "pid", hasChildren: 'hasChild',
    compProps: { name: 'Locations', id: 'location_multiselects', unCheckAllLabel: 'Unselect all Locations', checkAllLabel: 'Select all Locations' }
};

export const departments = [
    { id: 1, name: 'DevOps', status: 1 },
    { id: 2, name: 'Design', status: 1 },
    { id: 3, name: 'Deployments & Scaling', status: 1 }
];

export const Departments = {
    dataSource: departments, value: 'id', text: 'name', parentValue: "pid", hasChildren: 'hasChild',
    compProps: { name: 'Departments', id: 'departments_multiselects', unCheckAllLabel: 'Unselect all departments', checkAllLabel: 'Select all departments' }
};

export const divisions = [
    { id: 1, name: 'Software Development', status: 1 },
    { id: 2, name: 'Finance', status: 1 },
    { id: 3, name: 'Research and Development', status: 1 },
    { id: 4, name: 'Data Analysis', status: 1 },
    { id: 5, name: 'Data Entry', status: 1 },
    { id: 6, name: 'Customer Support', status: 1 },
];

export const historyDetails = [
    {id: 1, name: 'Nana Yaw', date: '26-05-2022'}, 
    {id: 2, name: 'Michael Nartey', date: '23-05-2022'},
    {id: 3, name: 'Kofi Manu', date: '22-05-2022'},
    {id: 4, name: 'Michael Ameyaw', date: '23-05-2022'},
    {id: 5, name: 'Ofori Antwi', date: '20-05-2022'},
    {id: 6, name: 'Kwesi Bodua', date: '10-05-2022'},
    {id: 7, name: 'Yaa Yaa', date: '12-05-2021'}
]
 
export const historyDetailsshow = [
    {id: 1, old: 'Software Developments', new: '_Software Development', date: '26-05-2022'},
    {id: 2, old: 'Customer Support', new: 'Customer Support Unit', date: '26-05-2022'},
    {id: 3, name: 'Consultation', date: '26-05-2022'},
    {id: 4, name: 'Admin', date: '26-05-2022'}
]


export const segments = [
    {id: -1, value: '', name: 'Select Segment' },
    {id: 1, value: 'DEP', name: 'Department' },
    { id: 2, value: 'DIV', name: 'Division' },
    { id: 3, value: 'EMT', name: 'Employee Types' },
    { id: 4,  value: 'UNI', name: 'Units' },
    { id: 5, value: 'SEC', name: 'Section' },
    { id:6,  value: 'POS', name: 'Position' },
];
// ['Select Basis', 'Varying Amount', 'Flat Amount', '% of Basic', '% of Daily Rate', '% of Hourly Rate']


export const title = [
    { id: -1, name: 'Select Title' },
    { id: 1, name: 'Mr' },
    { id: 2, name: 'Mrs' },
    { id: 3, name: 'Dr' },
    { id: 4, name: 'Reverend ' },
]

export const isSingleGLAccount = [
    { id: -1, value: '-1', name: 'Select GL Type' },
    { id: 1,value: '1', name: 'None' },
    { id: 2, value: 'true', name: 'Single' },
    { id: 3, value: 'false', name: 'Multiple' },
];

export const basesss = [
    { id: -1, value: '-1', name: 'Select Basis' },
    { id: 1, name: 'Deduct Hours From Basic Salary' },
    { id: 2, name: 'Deduct Hours From Payroll' },
    { id: 3,  name: 'Pro Rated' },
];


export const deducts = [
    { id: -1, value: '-1', name: 'Select Deduction' },
    { id: 1, name: 'Sample Test Deduction' },
    { id: 2, name: 'Lunch' },
];

export const gLTypes = [
    { id: -1, value: '-1', name: 'Select GL Type' },
    { id: 1,value: '1', name: 'None' },
    { id: 2, value: 'true', name: 'Single' },
    { id: 3, value: 'false', name: 'Multiple' },
];

export const letters = [
    { id: -1, name: 'Select Reference' },
    { id: 1, name: 'Reference 1' },
    { id: 2, name: 'Reference 2' },
    { id: 3, name: 'Reference 3' },
];

export const employeess = [
    { label: 'Joseph Dugbatey - PSL210', value: 'PSL210', pkid: 1 },
    { label: 'Mary Offei - PSL211', value: 'PSL211', pkid: 2 },
    { label: 'George Makron - PSL213', value: 'PSL213', pkid: 3 },
    { label: 'Norridge Bull - PSL214', value: 'PSL214', pkid: 4 },
    { label: 'Evans Zumalo - PSL215', value: 'PSL215', pkid: 5 }
];


export const defaultData = [
    { id: 1, name: 'One', status: 1 },
    { id: 2, name: 'two', status: 1 },
    { id: 3, name: 'three', status: 1 },
    { id: 4, name: 'four', status: 1 },
];

export const DefaultData = {
    dataSource: defaultData, value: 'id', text: 'name', parentValue: "pid", hasChildren: 'hasChild',
    compProps: { name: 'Data', id: 'data_select', unCheckAllLabel: 'Unselect all data', checkAllLabel: 'Select all Data' }
};

export const Divisions = {
    dataSource: divisions, value: 'id', text: 'name', parentValue: "pid", hasChildren: 'hasChild',
    compProps: { name: 'Divisions', id: 'division_select', unCheckAllLabel: 'Unselect all Divisions', checkAllLabel: 'Select all Divisions' }
};

export const incomeTax = [
    { id: 1, name: 'Income Tax One', status: 1 },
    { id: 2, name: 'Income Tax Two', status: 1 },
    { id: 3, name: 'Income Tax Three', status: 1 },
    { id: 4, name: 'Income Tax Four', status: 1 }
]

export const taxTable = [
    { id: 1, name: '2022 Overtime Tax', startDate: '01/01/2020', endDate: '--/--/----' },
    { id: 2, name: '2022 Overtime Tax', startDate: '01/01/2010', endDate: '21/05/2022' },
    { id: 3, name: '2022 Overtime Tax', startDate: '01/01/2020', endDate: '13/11/2013' },
    { id: 4, name: '2022 Overtime Tax', startDate: '01/01/2012', endDate: '--/--/----' },
   
]

// ['Select Type', 'Overtime', 'Bonus', 'Shift']

export const earningType = [
    { id: -1, name: 'Select Type', status: 1 },
    { id: 1, name: 'Overtime', status: 1 },
    { id: 2, name: 'Bonus', status: 1 },
    { id: 3, name: 'Shift', status: 1 }
]

export const network = [
    { id: -1, name: 'Select Network', status: 1 },
    { id: 1, name: 'Airtel/Tigo', status: 1 },
    { id: 2, name: 'MTN', status: 1 },
    { id: 3, name: 'Vodafone', status: 1 }
]


// ['Select Basis', 'Varying Amount', 'Flat Amount', '% of Basic', '% of Daily Rate', '% of Hourly Rate']
export const basis = [
    { id: -1,  name: 'Select Basis'},
    { id: 1,  name: 'Varying Amount'},
    { id: 2,  name: 'Flat Amount'},
    { id: 3,  name: 'Hourly'},
    { id: 4,  name: '% of Daily Rate'},
    { id: 5,  name: '% of Hourly Rate'}
]


export const EarnBasis = [
    { id: -1, name: 'Select Basis'},
    { id: 1, name: 'Varying Amount'},
    { id: 2, name: 'Flat Amount'},
    { id: 3, name: '% of Basic' },
    { id: 4, name: '% of Daily Rate' },
    { id: 5, name: '% of Hourly Rate'}
]

export const TaxReliefBasis = [
    { id: -1, value: '',  name: 'Select Basis', status: 1 },
    { id: 1,  name: 'Varying Amount', status: 1 },
    { id: 2, name: 'Flat Amount', status: 1 },
    { id: 3,  name: '% of Basic', status: 1 },
    { id: 4, name: '% of Gross', status: 1 }
]

export const taxRelief = [
    { id: 1, name: 'Child Education', effective: '01-Jan-2022', rate: '50%' },
    { id: 2, name: 'Disability', effective: '01-May-2020', rate: '70%' },
    { id: 3, name: 'Old Age', effective: '01-Feb-2021', rate: '40%' }   
]

//['Select Frequency', 'Recurring', 'Non-Recurring']
export const frequency = [
    { id: -1, name: 'Select Frequency', status: 1 },
    { id: 1,  name: 'Recurring', status: 1 },
    { id: 2,  name: 'Non-Recurring', status: 1 },
]

//['Select Transaction Analysis', ' T-Analysis 1', ' T-Analysis 2', 'T-Analysis 3']
export const transactionAnalysis = [
    { id: -1,  name: 'Select Transaction Analysis', status: 1 },
    { id: 1,value: '00000000-0000-0000-0000-000000000000',  name: 'Analysis 1', status: 1 },
    { id: 2,value: '00000000-0000-0000-0000-000000000000',  name: 'Analysis 2', status: 1 },
    { id: 3,value: '00000000-0000-0000-0000-000000000000',  name: 'Analysis 3', status: 1 },
    { id: 4,value: '00000000-0000-0000-0000-000000000000',  name: 'Analysis 4', status: 1 },
]

export const Earnfrequency = [
    { id: -1,  name: 'Select Frequency', status: 1 },
    { id: 1,  name: 'Recurring', status: 1 },
    { id: 2,  name: 'Non-Recurring', status: 1 },
]

//['Select Type', 'Overtime', 'Bonus', 'Shift']

export const type = [
    { id: -1,  name: 'Select Earning Type' },
    { id: 1,  name: 'Overtime' },
    { id: 2,  name: 'Bonus' },
    { id: 3,  name: 'Shift'},
    { id: 4,  name: 'General'},
]

export const IncomeTax = {
    dataSource: incomeTax, value: 'id', text: 'name', parentValue: "pid", hasChildren: 'hasChild',
    compProps: { name: 'Income Taxes', id: 'incomeTax_select', className: 'general-ledger-account-select' }
}

export const netPayGL = [
    { id: 1, name: '1', status: 1 },
    { id: 2, name: '2', status: 1 },
    { id: 3, name: '3', status: 1 },
    { id: 4, name: '4', status: 1 }
]
export const Bank = [
    { id: 1, name: '1', status: 1 },
    { id: 2, name: '2', status: 1 },
    { id: 3, name: '3', status: 1 },
    { id: 4, name: '4', status: 1 }
]


export const selector = [
    { id: 1, name: '0ne'  },
    { id: 2, name: 'two' },
    { id: 3, name: 'Three' }
]

export const selectBasis = [
    { id: 1, name: 'Percentage'  },
    { id: 2, name: 'Flat Amount' }
]

export const basedOnSelect = [
    { id: 1, name: '0ne'  },
    { id: 2, name: 'two' },
    { id: 3, name: 'Three' }
]


export const NetPayGL = {
    dataSource: netPayGL, value: 'id', text: 'name', parentValue: "pid", hasChildren: 'hasChild',
    compProps: { name: 'Net Pay GL', id: 'netPayGL_select', className: 'general-ledger-account-select' }
}

export const empStatus = [
    { id: 1, name: 'Active', status: 1 },
    { id: 2, name: 'Inactive', status: 1 }
    
]

['Select Payment Basis', '', '']
export const payBasis = [
    { id: -1, name: 'Select Payment Basis', },
    { id: 1, name: 'Fixed Amount' },
    { id: 2, name: 'Percentage of Net'}
    
]

export const EmpStatus = {
    dataSource: empStatus, value: 'id', text: 'name', parentValue: "pid", hasChildren: 'hasChild',
    compProps: { name: 'Employee Status', id: 'empStatus_select', className: 'general-ledger-account-select' }
}

export const year = [
    { id: -1, name: 'Select Year'},
    { id: 1, name: '2019'},
    { id: 2, name: '2020'},
    { id: 3, name: '2021'}    
]

export const fund = [
    { id: -1, name: 'Select Fund'},
    { id: 1, name: 'One'},
    { id: 2, name: 'Two'},
    { id: 3, name: 'Three'}   
]

export const GLAccount = [
    { id: -1, name: 'Select GL Account'},
    { id: 1, name: 'One'},
    { id: 2, name: 'Two'},
    { id: 3, name: 'Three'}   
]

export const salaryGrades = [
    { id: -1, name: ' Select Salary Grade'},
    { id: 'b70682a3-17c1-4001-b98a-2376b308d761', name: 'One'},
    { id: '2dbe465f-6cec-4e03-8aaa-346a3daed245', name: 'Two'},
    { id: '2dbe465f-6cec-4e03-8aaa-346a3daed245', name: 'Three'}   
]


export const getLognames = [
    {id: 1, name: "Michael Nartey"},
    {id: 2, name: "Michael Nartey"},
    {id: 3, name: "Michael Nartey"}
]

export const donor = [
    { id: -1, name: 'Select Donor'},
    { id: 1, name: 'One'},
    { id: 2, name: 'Two'},
    { id: 3, name: 'Three'}    
]

export const LoanCurrency = [
    { id: -1, name: 'Select Currency'},
    { id: 'E6146D1A-E411-4B5D-4E44-08DA538AA1DF', name: 'Ghanaian Cedi'},
       
]

//['Select payment option', 'Bank', 'Mobile Money','Cash']
export const accountType = [
    // { id: -1, name: 'Select Payment Option'},
    { id: 1, name: 'Bank', code:"HCM-9C7OD5FHV7Q_PSLL"},
    { id: 2, name: 'Mobile Money', code:"HCM-MY3JM2DB73N_KCMI"},
    { id: 3, name: 'Cash', code:"HCM-V7VI4JETNB_HRPR"}    
]
//['Select Loan Type', '', '']
export const loanType = [
    { id: -1,  name: 'Select Loan Type', status: 1 },
    { id: 1, name: 'Employer', status: 1 },
    { id: 2, name: 'Third-Party', status: 1 },
]

// ['Select Interest Rate Type', 'Fixed', 'Variable']
export const interestRateType = [
    { id: -1, value: '', name: 'Interest Rate Type', status: 1 },
    { id: 1, name: 'Fixed', status: 1 },
    { id: 2,  name: 'Variable', status: 1 },
]
//['Select Interest Calculation Rule', 'Annual', 'Simple', 'Absolute']
export const interestCalculationType = [
    { id: -1, name: 'Select Interest Calculation Rule', status: 1 },
    { id: 1, name: 'Annual', status: 1 },
    { id: 2, name: 'Simple', status: 1 },
    { id: 3, name: 'Absolute', status: 1 },
]

export const project = [
    { id: -1, name: 'Select project'},
    { id: 1, name: 'One'},
    { id: 2, name: 'Two'},
    { id: 3, name: 'Three'}   
]

export const BankAccountType = [
    { id: -1, name: 'Select Account Type'},
    { id: 1, name: 'Savings'},
    { id: 2, name: 'Current'},
    { id: 3, name: 'Partnership'}   
]

export const absenttype = [
    { id: -1, name: 'Select Project'},
    { id: 1, name: 'One'},
    { id: 2, name: 'Two'},
    { id: 3, name: 'Three'}   
]

//['Select Status', 'Suspended', 'Probation']
export const payrollStatus = [
    { id: -1, name: 'Select Payroll Status'},
    { id: 1, name: 'Suspended'},
    { id: 2, name: 'Probation'}   
]
//['Select Type', 'Salary', 'Wages']
export const salaryType = [
    { id: -1, name: 'Select  Salary Type'},
    { id: 1, name: 'Salary'},
    { id: 2, name: 'Wages'}   
]
export const Year = {
    dataSource: year, value: 'id', text: 'name', parentValue: "pid", hasChildren: 'hasChild',
    compProps: { name: 'Year', id: 'year_select', className: 'general-ledger-account-select' }
}

export const loans = [
    { id: 1, name: 'Car Loan', status: 1 }
]

export const Loans = {
    dataSource: loans, value: 'id', text: 'name', parentValue: "pid", hasChildren: 'hasChild',
    compProps: { name: 'Loans', id: 'loan_select', className: 'loan-select' }
}

export const variable = [
    { id: -1, name: 'Select Deduction Type' },
    { id: 1, name: 'Fixed' },
    { id: 2, name: 'Variable' }
]

export const Variable = {
    dataSource: variable, value: 'id', text: 'name', parentValue: "pid", hasChildren: 'hasChild',
    compProps: { name: 'deduction types', id: 'variable_select', className: 'variable-select' }

}

export const years = [
    { id: -1, name: 'Select Year' },
    { id: 2021, name: '2021' },
    { id: 2022, name: '2022' },
    { id: 2023, name: '2023' }
]

///TaxRelieftype

export const taxRelieftype = [
    { id: -1, name: 'Select Tax Relief Type' },
    { id: 1, name: 'Dependent Spouse or Dependent Children(up to 2)' },
    { id: 2, name: 'Old Age' },
    { id: 3, name: 'Child Education' },
    { id: 2, name: 'Training' },
    { id: 3, name: 'Disabled' }
]

export const PayrollActss = [
    { id: -1, name: 'Select Payroll Action' },
    { id: 1, name: 'Active' },
    { id: 2, name: 'Inactive' },
    { id: 3, name: 'Terminated' },
    { id: 4, name: 'No Salary' },
    { id: 5, name: 'Flat Amount' },
    { id: 6, name: 'Percentage of Basic' }
]