import Vue from 'vue'
import axios from 'axios'


/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */


// We create our own axios instance and set a custom base URL.
// Note that if we wouldn't set any config here we do not need
// a named export, as we could just `import axios from 'axios'`
const axiosInstance = axios.create({
    // baseURL: 'http://localhost/evoters-bck/public/',
    baseURL: 'http://localhost/evoters-bck/public/api/',
    // baseURL: 'http://192.168.1.4:8000/api/',
    withCredentials: true,
    timeout: 40000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
})

// for use inside Vue files through this.$axios
Vue.prototype.$axios = axiosInstance

// Here we define a named export
// that we can later use inside .js files:
export { axiosInstance }