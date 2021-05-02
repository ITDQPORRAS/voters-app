// import Vue from 'vue'
// import VueAxios from 'vue-axios'
// import VueSocialauth from 'vue-social-auth'
// import axios from 'axios';

// Vue.use(VueAxios, axios)
// Vue.use(VueSocialauth, {

//     providers: {
//         google: {
//             clientId: '990735916129-571uifuljrj6rm35jiltsqpk03kdfc1e.apps.googleusercontent.com',
//             redirectUri: '/auth/github/callback' // Your client app URL
//         }
//     }
// })

import Vue from 'vue';
const HelloJs = require('hellojs/dist/hello.all.min.js');
const VueHello = require('vue-hellojs');

HelloJs.init({
    google: '990735916129-571uifuljrj6rm35jiltsqpk03kdfc1e.apps.googleusercontent.com',
    // facebook: FACEBOOK_APP_CLIENT_ID
}, {
    redirect_uri: 'http://ec2-18-221-253-87.us-east-2.compute.amazonaws.com/redirect.html'
});
Vue.use(VueHello, HelloJs);