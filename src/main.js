import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';
import IconsPlugin from 'bootstrap-vue';
import Router from 'vue-router'
import App from './App.vue'
import SearchByAsin from './components/SearchByAsin'
import Keywords from './components/Keywords'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import cors from 'cors';
import KeywordsNew from "./components/KeywordsNew";

Vue.config.productionTip = false
Vue.use(Router)
const routes = [
  {path: '/asin', component: SearchByAsin},
  {path: '/keywords', component: Keywords},
  {path: '/keywords_new', component: KeywordsNew},
];
const router = new Router({routes,  mode: 'history'})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(cors)
