import request from 'src/utils/request';
import { axiosInstance } from 'src/boot/axios'
export function login(data) {
    return axiosInstance.post('/auth/login', data)
}
export function access() {
    return axiosInstance.get('/auth/check')
}
export function getInfo(token) {
    return request({
        url: '/user',
        method: 'get',
    });
}
export function logout() {
    return request({
        url: '/auth/logout',
        method: 'post',
    });
}
export function getData() {
    return request({
        url: '/globalVariable',
        method: 'get',
    });
}
export function getPopulation() {
    return request({
        url: '/Dashboard/population',
        method: 'get',
    });
}

export function register(data) {
    return request({
        url: '/storeRegister',
        method: 'post',
        data: data,
    });
}
export function showAppointed(data) {
    return request({
        url: '/Appointment/showAppointed',
        method: 'get',
        data: data,
    });
}
export function Departments(data) {
    return request({
        url: '/Reader/Departments',
        method: 'get',
        data: data,
    });
}
export function csrf() {
    return axiosInstance.get('/sanctum/csrf-cookie')
}
export function insertform(data) {
    return request({
        url: '/insertform',
        method: 'post',
        data: data,
    });
}