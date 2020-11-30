import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "element-ui/lib/theme-chalk/index.css";
// import { MenuItem,Container,Header,Aside,Main,Input,Footer,Avatar, Menu, Table, TableColumn, Pagination ,Button} from "element-ui";
import eleUi from './components/eleUI'

Vue.config.productionTip = false;

// 引入插件
// vue.use
// Vue.use(axios)
//axios没有install方法，可以直接挂在在原型上使用
// 试了下另一种骚写法，希望能正常打包
Object.defineProperty(Vue.prototype, "axios", {
  get() {
    return axios;
  },
})
Vue.use(eleUi)
// for (let item of [MenuItem,Container,Header,Aside,Main,Input,Footer,Avatar, Menu, Table, TableColumn, Pagination,Button]) {
//   Vue.use(item);
// }
// Vue.use(Avatar);
// Vue.use(Menu)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Pagination)
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
  render: (h) => h(App),
}).$mount("#app");
