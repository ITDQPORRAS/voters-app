import Resource from "src/api/resource";
const state = {
    url_back: "http://18.221.253.87/wh_bck/public/",
    group: []
};
const mutations = {
    SET_GROUP: (state, data) => {
        state.group = data;
    }
};
const actions = {
    async getGroup({ commit }) {
        const { data } = await new Resource("Group/getGroup").list();
        commit("SET_GROUP", data);
    },
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};