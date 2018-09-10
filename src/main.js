// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Element from "element-ui";
import router from "./router";
import animate from "animate.css";
import axios from "axios";
import "element-ui/lib/theme-chalk/index.css";
import vueEventCalendar from "vue-event-calendar";
import 'vue-event-calendar/dist/style.css'
Vue.use(vueEventCalendar, {
  locale: "zh"
});
import moment from "moment/moment.js";
Vue.use(Element, { size: "small" });
Vue.use(animate);
/* eslint-disable no-new */
axios.defaults.headers.common["sessionId"] =
  window.localStorage.getItem("sessionId") || "123456";

Vue.filter("filterDate", function(value, formatString) {
  formatString = formatString || "YYYY-MM-DD";
  return moment(value).format(formatString);
});

new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App }
});
