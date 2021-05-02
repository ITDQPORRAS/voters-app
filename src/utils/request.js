import axios from 'axios';
import { Notify } from 'quasar';
import router from 'src/router';
import { axiosInstance } from 'src/boot/axios'
import { getToken, setToken } from '@/utils/auth';
import store from "src/store";
axiosInstance.interceptors.request.use(
    // config => {
    //   return config;
    // },
    // error => {
    //   console.log(error);
    //   Promise.reject(error);
    // }
    config => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + getToken(); // Set JWT token
            config.headers['Content-type'] = 'application/json'; // Set JWT token
        }
        return config;
    },
    error => {
        console.log(error);
        Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    response => {
        if (response.data.error === 'Unauthorized') {
            return store.dispatch('user/logout');
        }
        return response.data;
    },
    error => {
        let message = error.message;
        if (error.response.data && error.response.data.errors) {
            message = error.response.data.errors;
        } else if (error.response.data && error.response.data.error) {
            message = error.response.data.error;
        }
        if (JSON.stringify(message).includes("401")) {
            store.dispatch('user/logout');

        } else {
            Notify.create({
                message: message,
                color: 'warning',
                icon: 'report_problem',
                position: 'top'
            })
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;