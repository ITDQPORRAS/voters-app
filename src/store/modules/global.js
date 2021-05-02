import Resource from "src/api/resource";
const state = {
    url_back: "http://18.221.253.87/wh_bck/public/",
    customers: []
};
const mutations = {
    SET_CUSTOMERS: (state, data) => {
        state.customers = data;
    }
};
const actions = {
    async getCustomers({ commit }) {
        const { data } = await new Resource("Customer/show").list();
        commit("SET_CUSTOMERS", data);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};