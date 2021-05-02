import Resource from "src/api/resource";

const state = {
    WRoutes: [],
    roles: [],
    userRole: [],
    permission_group: [],
    permission_list: [],
    brands: [],
    Storage: [],
    Employees: [],
    itemCategory: [],
    itemSubCategory: [],
    EmployeesContacts: {
        employees: [],
        contacts: []
    },
    Users: [],
    Customers: {
        main: [],
        Contacts: [],
        Addresses: [],
        Schedules: [],
        discounts: [],
    },
    Suppliers: {
        main: [],
        Contacts: [],
        Addresses: []
    }
};

const getters = {
    GETTERMS: state => state.Terms,
    GETCUSTOMERS: state => state.Customers.main,
    GETSUPPLIERS: state => state.Suppliers.main,
    GETCUSTOMERS_ACTIVE: state =>
        state.Customers.main.filter(x => x.status == "Active"),
    GETSUPPLIERS_ACTIVE: state =>
        state.Suppliers.main.filter(x => x.status == "Active"),
    GETCUSTOMER: state => id => {
        const data = {
            main: state.Customers.main.filter(x => x.id == id),
            Addresses: state.Customers.Addresses.filter(x => x.business_id == id),
            Contacts: state.Customers.Contacts.filter(x => x.business_id == id),
            Schedules: state.Customers.Schedules.filter(x => x.business_id == id),
            discounts: state.Customers.discounts.filter(x => x.business_id == id)
        };
        return data;
    },
    GETCUSTOMER_WITH_SUB_INFO: state => {
        const data = [];
        state.Customers.main.forEach(cust => {
            const indCust = {
                address: state.Customers.Addresses.filter(x => x.business_id == cust.id),
                contacts: state.Customers.Contacts.filter(x => x.business_id == cust.id)
            }
            Object.defineProperty(cust, 'address', {
                value: indCust.address.map(x => x.full_address),
                writable: true
            });

            Object.defineProperty(cust, 'contacts', {
                value: indCust.contacts.map(x => x.number),
                writable: true
            });

            data.push(cust);
        });
        return data;
    },
    GETSUPPLIER: state => id => {
        const data = {
            main: state.Suppliers.main.filter(x => x.id == id),
            Addresses: state.Suppliers.Addresses.filter(x => x.business_id == id),
            Contacts: state.Suppliers.Contacts.filter(x => x.business_id == id)
        };
        return data;
    },
    GETSTORAGES: state => state.Storage,
    GETEMPLOYEES: state => state.Employees,
    GETUSERS: state => state.Users,
    GETROLES: state => state.roles,
    GETPERMISSIONGROUP: state => state.permission_group,
    GETPERMISSIONLIST: state => state.permission_list,
    GETUSERROLE: state => state.userRole,
    getStorage: state => id => {
        const res = state.Storage.filter(x => x.id == id);
        return res;
    },
    getBrands: state => state.brands,
    itemCategories: state => state.itemCategory,
    itemSubCategories: state => state.itemSubCategory,
};
const mutations = {
    SET_CUSTOMERS: (state, data) => {
        state.Customers.main = data.main;
        state.Customers.Contacts = data.contacts;
        state.Customers.Addresses = data.addresses;
        state.Customers.Schedules = data.schedules;
        state.Customers.discounts = data.discounts;
    },
    SET_SUPPLIERS: (state, data) => {
        state.Suppliers.main = data.main;
        state.Suppliers.Contacts = data.contacts;
        state.Suppliers.Addresses = data.addresses;
        state.Suppliers.terms = data.terms;
    },
    SET_ROUTES: (state, data) => {
        state.WRoutes = data;
    },
    SET_BRANDS: (state, data) => {
        state.brands = data;
    },
    SET_STORAGES: (state, data) => {
        state.Storage = data;
    },
    SET_CATEGORY: (state, data) => {
        state.itemCategory = data;
    },
    SET_SUBCATEGORY: (state, data) => {
        state.itemSubCategory = data;
    },
    SET_EMPLOYEES: (state, data) => {
        state.Employees = data;
    },
    SET_USERS: (state, data) => {
        state.Users = data;
    },
    SET_EMPLOYEES_CONTACTS: (state, data) => {
        state.EmployeesContacts.employees = data.employees;
        state.EmployeesContacts.contacts = data.contacts;
    },

    SET_PERMISSION_GROUP: (state, group) => {
        state.permission_group = group;
    },
    SET_PERMISSION_LIST: (state, permission_list) => {
        state.permission_list = permission_list;
    },
    SET_USER_ROLE: (state, userRole) => {
        state.userRole = userRole;
    }
};

const actions = {
    GET_USERS_ROLE({ commit }) {
        const resp = new Resource("UserRole");
        resp.list().then(({ data }) => {
            commit("SET_USER_ROLE", data.userRole);
        }).catch(er =>
            console.log(er))
    },
    GET_ROLES({ commit }) {
        const resp = new Resource("Roles");
        resp.list().then(({ data }) => {
            commit("SET_ROLES", data.roles);
        }).catch(er =>
            console.log(er))
    },
    GET_PERMISSION_GROUP({ commit }) {
        const resp = new Resource("PermissionGroup");
        resp.list().then(({ data }) => {
            commit("SET_PERMISSION_GROUP", data.roles_group);
        }).catch(er =>
            console.log(er))
    },
    GET_PERMISSION_LIST({ commit }) {
        const resp = new Resource("Permissions");
        resp.list().then(({ data }) => {
            commit("SET_PERMISSION_LIST", data.permissions);
        }).catch(er =>
            console.log(er))
    },
    GET_CUSTOMERS({ commit }) {
        const resp = new Resource("Customer");
        resp.list().then(({ data }) => {
            commit("SET_CUSTOMERS", data);
        }).catch(er =>
            console.log(er))
    },
    GET_SUPPLIERS({ commit }) {
        const resp = new Resource("Supplier");
        resp.list().then(({ data }) => {
            commit("SET_SUPPLIERS", data);
        }).catch(er =>
            console.log(er))
    },
    GET_STORAGES({ commit }) {
        const resp = new Resource("Storage");
        resp.list().then(({ data }) => {
            commit("SET_STORAGES", data);
        }).catch(er =>
            console.log(er))
    },
    GET_CATEGORIES({ commit }) {
        const resp = new Resource("Category");
        resp.list().then(({ data }) => {
            commit("SET_CATEGORY", data);
        }).catch(er =>
            console.log(er))
    },
    GET_SUBCATEGORIES({ commit }, id) {
        let par = { id: id };
        const resp = new Resource("CategorySub");
        resp.list(par).then(({ data }) => {
            commit("SET_SUBCATEGORY", data);
        }).catch(er =>
            console.log(er))
    },
    GET_EMPLOYEES({ commit }) {
        const resp = new Resource("Employee");
        resp.list().then(({ data }) => {
            commit("SET_EMPLOYEES", data);
        }).catch(er =>
            console.log(er))
    },
    async GET_BRANDS({ commit }) {
        const resp = new Resource("Brand");
        resp.list().then(({ data }) => {
            commit("SET_BRANDS", data);
        }).catch(er =>
            console.log(er))
    },
    async GET_USERS({ commit }) {
        const resp = new Resource("User/getUsers");
        resp.list().then(({ data }) => {
            commit("SET_USERS", data);
        }).catch(er =>
            console.log(er))
    },
    async fetchEmployeesContacts({ commit }) {
        const resp = new Resource("Employee/employees");
        resp.list().then(({ data }) => {
            commit("SET_EMPLOYEES_CONTACTS", data);
        }).catch(er =>
            console.log(er))
    },
};
export default {
    state,
    getters,
    mutations,
    actions
};