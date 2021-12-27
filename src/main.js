import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import { Button, DatePicker, Card, Input, Icon, Message } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import VueLazyload from "vue-lazyload";
Vue.config.productionTip = false;
axios.defaults.baseURL = "http://134.175.224.127:7002";
// axios.defaults.baseURL = 'http://localhost:7002'
Vue.prototype.$axios = axios;
// Vue.use(ElementUI, { size: 'small'})

Vue.use(Button);
Vue.use(Card);
Vue.use(DatePicker);
Vue.use(Input);
Vue.use(Icon);
Vue.prototype.$message = Message;
Vue.use(VueLazyload, {
  loading: "./assets/load.jpg",
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
