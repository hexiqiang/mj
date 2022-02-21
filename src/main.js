import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueWechatTitle from 'vue-wechat-title';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './assets/fonts/iconfont.css';
import BaiDuMap from 'vue-baidu-map';
import VCharts from 'v-charts'
import VueCookies from 'vue-cookies'
Vue.config.productionTip = false;
Vue.use(VueCookies)
Vue.use(VueAxios, axios)
Vue.use(VueWechatTitle);
Vue.use(ElementUI);
Vue.use(BaiDuMap,{
  ak: ''
});
Vue.use(VCharts);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
