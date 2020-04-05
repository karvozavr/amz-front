import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';
import IconsPlugin from 'bootstrap-vue';
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import cors from 'cors';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(cors)