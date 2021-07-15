import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

const eventHub = new Vue();

Vue.mixin({
  data: function() {
    return {
      eventHub,
    };
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
