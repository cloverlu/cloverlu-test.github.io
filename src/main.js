import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";

import Vant from "vant";
import "vant/lib/index.css";
import "@vant/touch-emulator";

Vue.config.productionTip = false;

Vue.use(Vant);

import "element-ui/lib/theme-chalk/index.css";
import "./assets/iconfont/iconfont.css";
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
