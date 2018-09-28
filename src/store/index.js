/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import Data from './data.js'

Vue.use(Vuex)

const store = ()=> {
	return new Vuex.Store({
		plugins: [ createPersistedState({ storage: window.sessionStorage }) ],
		modules: {
		  Data: Data
		}
	})
}

export default store