import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        ...modules
    }
})


const a = {
    ...modules
}
console.log(a);

export default store