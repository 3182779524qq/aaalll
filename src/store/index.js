import Vue from 'vue'
import Vuex from 'vuex'
import state from './state/index'
import actions from './action/index'
import mutations from './mutation/index'

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations,
    actions
})
