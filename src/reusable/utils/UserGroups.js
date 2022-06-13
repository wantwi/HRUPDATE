export const UserGroup = [
    { id: 1, name: 'Expense Tracking Team', companies: ['Atlas One', 'React Store', 'Motion Group', 'Oceans Grill', 'Round Menu'], status: 0},
    { id: 2, name: 'Data Analysis Team', companies: ['Atlas One',  'Motion Group', 'Oceans Grill', 'Round Menu'], status: 1},
    { id: 3, name: 'Dreamville Team', companies: ['Atlas One', 'React Store', 'Motion Group', 'Oceans Grill', 'Round Menu'], status: 1},
    { id: 4, name: 'Business Process Team', companies: ['Atlas One', 'React Store', 'Motion Group', 'Oceans Grill', 'Round Menu'], status: 0},
    { id: 5, name: 'Networking Team', companies: ['Atlas One', 'React Store', 'Oceans Grill'], status: 1},
].map(x => {return{...x, strStatus: x.status === 1 ? 'Active' : 'Inactive', numberOfCompanies: x.companies.length}});