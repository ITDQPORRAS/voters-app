import Vue from "vue";
import Vuex from "vuex";
import Resource from "src/api/resource";
import axios from "axios";
Vue.use(Vuex);

const state = {
  products: [],
  categories: [],
  types: []
};

const getters = {
  products: state => state.products,
  getContainer: state => containerid =>
    state.products.filter(p => p.status == "Active" && p.id == containerid),
  getActiveProducts: state => state.products.filter(p => p.status == "Active"),
  categories: state => state.categories,
  types: state => state.types
};
const mutations = {
  SETPRODUCTS: (state, data) => {
    state.products = data.products;
    state.categories = data.categories;
    state.types = data.types;
  },
  SETCATEGORY: (state, data) => {
    state.categories = data;
  }
};

const actions = {
  async getProductInfo({ commit }) {
    const resp = new Resource("Product");
    const { data } = await resp.list();
    commit("SETPRODUCTS", data);
  },
  async getCategories({ commit }) {
    const resp = new Resource("category");
    const { data } = await resp.list();
    commit("SETCATEGORY", data);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
