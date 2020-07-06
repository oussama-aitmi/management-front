import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Axios from 'axios'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'

Vue.config.productionTip = false

Vue.prototype.$http = Axios;

const token = localStorage.getItem('user-token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}


Vue.use(ArgonDashboard)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
