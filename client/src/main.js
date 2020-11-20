import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

// 引入插件
// vue.use
Vue.use(ElementUI);
// 试了下另一种骚写法，希望能正常打包
Object.defineProperty(Vue.prototype, "axios", {
  get() {
    return axios;
  }
});

//  全局过滤器
// 从猫眼拿图片，使用过滤器填充宽高字段
Vue.filter("picWH", (url, arg) => {
  return url.replace(/w\.h/, arg);
});

// 全局组件
import Scroller from "@/components/Scroller";
import OnLoading from "@/components/OnLoading";
Vue.component("Scroller", Scroller);
Vue.component("OnLoading", OnLoading);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
