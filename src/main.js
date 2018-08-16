import Vue from 'vue'
import 'normalize.css/normalize.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import moduleEvent from './event/moduleEvent';
let myPlugin = {}
myPlugin.install = function (vue, options) {
  vue.prototype.$event = moduleEvent;
}
Vue.use(myPlugin);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
