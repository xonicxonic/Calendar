require('./bootstrap');

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue'

import 'es6-promise/auto'
window.$ = window.jQuery = require('jquery');

import '@fortawesome/fontawesome-free/css/all.min.css'
import store from './store/store';

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(BootstrapVue)

window.moment = require('moment');

let routes = [
	{path : '/' 	, component : require('./views/Calendar.vue').default },
]

let router = new VueRouter({
	routes,
	base: __dirname,
	mode: 'history'
});

const app = new Vue({
	router,
	store,
    el: '#app',
});
