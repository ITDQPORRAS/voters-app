import { getData, getPopulation, showAppointed, Departments } from 'src/api/auth';
const state = {
  barangay: [],
  population: [],
  showAppointed: [],
  DepartmentList: []
};
const mutations = {
  SET_BARANGAY: (state, barangay) => {
    state.barangay = barangay;
  },
  SET_POPULATION: (state, data) => {
    state.population = data;
  },
  SET_APPOINTED: (state, data) => {
    state.showAppointed = data;
  },
  SET_DEPARTMENTLIST: (state, data) => {
    state.DepartmentList = data;
  },
};
const actions = {
  getData({ commit, state }) {
    return new Promise((resolve, reject) => {
      getData()
        .then(response => {
          const { data } = response;
          if (!data) {
            reject('Verification failed, please Login again.');
          }
          const { barangay } = data.data;
          commit('SET_BARANGAY', barangay);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getPopulation({ commit, state }) {
    return new Promise((resolve, reject) => {
      getPopulation()
        .then(response => {
          const { data } = response;
          if (!data) {
            reject('Verification failed, please Login again.');
          }
          commit('SET_POPULATION', data[0]);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  showAppointed({ commit, state }) {
    return new Promise((resolve, reject) => {
      showAppointed()
        .then(response => {
          const { data } = response;
          if (!data) {
            reject('Verification failed, please Login again.');
          }
          commit('SET_APPOINTED', data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  Departments({ commit, state }) {
    return new Promise((resolve, reject) => {
      Departments()
        .then(response => {
          const { data } = response;
          if (!data) {
            reject('Verification failed, please Login again.');
          }
          commit('SET_DEPARTMENTLIST', data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
