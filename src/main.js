import Vue from "vue";
import App from "./App.vue";
import router from "./js/router/router";

import store from "./js/vuex/store";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate, {
  validity: true,
  aria: true,
  classes: true,
  classNames: {
    valid: "is-valid",
    invalid: "is-invalid"
  }
});
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
