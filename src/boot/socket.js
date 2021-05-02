import Vue from 'vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import store from '@/store';
// const socket = io('http://192.168.0.50:3000');
const socket = io('http://3.20.55.147:3000');
Vue.use(VueSocketIOExt, socket, { store });