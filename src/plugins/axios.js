import axios from 'axios'
const axiosinstance = window.axios.create({
    baseURL: 'http://localhost:8000/g/public/api/',
    timeout: 20000, // Request timeout
});
export default ({ Vue }) => {
    Vue.prototype.$axios = axiosinstance;
}
export { axiosinstance as Axios };