import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import db from './db';

Vue.config.productionTip = false;
Vue.prototype.$db = db;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
