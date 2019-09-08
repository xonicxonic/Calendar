import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import Calendar from './Calendar.js';

Vue.config.debug = true
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules : {
 		Calendar,
 	}
})