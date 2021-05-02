import { login, logout, getInfo, access, insertform } from 'src/api/auth';
import { getToken, setToken, removeToken, setInfo } from 'src/utils/auth';
import router from 'src/router';
import store from 'src/store';
import { LocalStorage } from 'quasar';
const state = {
    id: null,
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    permissions: [],
    userName: '',
    access: [],
    isAdmin: 0,
    facilityName: ""
};
const mutations = {
    SET_ID: (state, id) => {
        state.id = id;
    },
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_ACCESS: (state, access) => {
        state.access = access;
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_USERNAME: (state, name) => {
        state.userName = name;
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    },
    SET_PERMISSIONS: (state, permissions) => {
        state.permissions = permissions;
    },
    SET_ADMIN: (state, data) => {
        state.isAdmin = data;
    },
    SET_FACILITY: (state, permissions) => {
        state.facilityName = permissions;
    },
};

const actions = {
    insertform({ commit }, datax) {
        return new Promise((resolve, reject) => {
            insertform(datax)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // user login
    login({ commit }, userInfo) {
        const { email, password } = userInfo;
        return new Promise((resolve, reject) => {
            login({ email: email.trim(), password: password })
                .then(response => {

                    commit('SET_TOKEN', response.data.token);
                    commit('SET_ACCESS', response.data.access);
                    // console.log(response.data.token)
                    setToken(response.data.token);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    setTokenz({ commit }, data) {

        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', data.access_token);
            setToken(data.access_token);
            resolve();
        });
    },
    loginGoogle({ commit }, datax) {
        const { email, password } = userInfo;
        return new Promise((resolve, reject) => {

            // login({ email: email.trim(), password: password })
            //     .then(response => {

            //         commit('SET_TOKEN', response.data.token);
            //         commit('SET_ACCESS', response.data.access);
            //         // console.log(response.data.token)
            //         setToken(response.data.token);
            //         resolve(response);
            //     })
            //     .catch(error => {
            //         reject(error);
            //     });
        });
    },
    access({ commit }) {
        return new Promise((resolve, reject) => {
            access()
                .then(response => {
                    // commit('SET_ACCESS', response);
                    resolve(response);
                })
                .catch(error => {
                    this.$router.push('/login')
                    reject(error);
                });
        });
    },
    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token)
                .then(response => {
                    const { data } = response;
                    if (!data) {
                        reject('Verification failed, please Login again.');
                    }
                    const { name, avatar, id, email, admin, access, facilityName } = data;
                    // roles must be a non-empty array
                    // if (!roles || roles.length <= 0) {
                    //   reject('getInfo: roles must be a non-null array!');
                    // }

                    // roles must be a non-empty array
                    // if (!roles || roles.length <= 0) {
                    //   reject('getInfo: roles must be a non-null array!');
                    // }
                    // commit('SET_ROLES', roles);
                    // commit('SET_PERMISSIONS', permissions);

                    commit('SET_FACILITY', facilityName);

                    LocalStorage.set("routes", access);
                    setInfo(data);
                    commit('SET_NAME', name);
                    commit('SET_AVATAR', avatar);
                    // commit('SET_INTRODUCTION', introduction);
                    commit('SET_ID', id)
                    commit('SET_ADMIN', admin)

                    commit('SET_USERNAME', email);
                    resolve(data);

                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            if (state.token) {
                logout(state.token)
                    .then(() => {
                        commit('SET_TOKEN', '');
                        this.$router.push(`/login`);
                        removeToken();
                        resolve();
                    })
                    .catch(error => {
                        this.$router.push(`/login`);
                        reject(error);
                    });
            } else {
                removeToken();
                commit('SET_TOKEN', '');
                this.$router.push(`/login`);
            }
        });
    },
    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '');
            removeToken();
            resolve();
        });
    },
    // Dynamically modify permissions
    changeRoles({ commit, dispatch }, role) {
        return new Promise(async resolve => {
            // const token = role + '-token';

            // commit('SET_TOKEN', token);
            // setToken(token);

            // const { roles } = await dispatch('getInfo');

            const roles = [role.name];
            const permissions = role.permissions.map(permission => permission.name);
            commit('SET_ROLES', roles);
            commit('SET_PERMISSIONS', permissions);
            resetRouter();

            // generate accessible routes map based on roles
            const accessRoutes = await store.dispatch('permission/generateRoutes', { roles, permissions });

            // dynamically add accessible routes
            router.addRoutes(accessRoutes);

            resolve();
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};