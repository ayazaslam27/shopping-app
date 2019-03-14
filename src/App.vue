<template>
  <div id="app">
    <div :class="[!mobileVersion? 'container ': '']">
      <div class="row">
        <div class="col-12">
          <Navigation/>
          <cart ref="cart" :showCart="showCart && !mobileVersion"></cart>
          <router-view :shouldOpenSideMenu="openSideMenu"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/navBar/navBar.vue";
import cart from "./components/cart/cart";
import "bootstrap/dist/css/bootstrap.min.css";
import { eventMixin } from "./js/mixins";
import apiActions from "./js/restfulApiCaller/apiActions";
import jwt from "jsonwebtoken";

export default {
  name: "app",
  data() {
    return {
      mobileVersion: false
    };
  },
  mounted() {
    var that = this;
    this.$on("hideCartEvent", val => {
      setTimeout(function() {
        if (!that.$refs.cart.isActive) {
          that.showCart = false;
        }
      }, 400);
    });
    this.mobileVersion = this.$store.getters.isMobileVersion;
    setInterval(this.checkTokenExpiration(), 1000); //
  },
  created() {
    document.title = "We Sell";
  },
  beforeMount() {
    this.getCategories();
    this.getProducts();
  },
  methods: {
    getCategories: function() {
      var that = this;
      apiActions
        .getCategories()
        .then(result => {
          that.$store.dispatch("setCategories", result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getProducts() {
      var that = this;
      apiActions
        .getTopProducts()
        .then(result => {
          that.$store.dispatch("setTopProducts", result);
        })
        .catch(error => console.log(error));
    },
    checkTokenExpiration() {
      let token = localStorage.getItem("token");
      if (token !== null) {
        let decodedToken = jwt.decode(token);
        let expiredTime = decodedToken.exp;
        let isTokenValid = expiredTime > Date.now() / 1000;
        if (!isTokenValid) {
          localStorage.clear();
        }
      }
    }
  },
  components: {
    Navigation,
    cart
  },
  mixins: [eventMixin]
};
</script>

<style>
.we-sell-button {
  color: orangered;
  border-color: orange;
}

.we-sell-button:hover {
  background-color: orangered;
  border-color: orange;
  color: white;
}
.btn {
  background: orangered !important;
  color: white !important;
}

.btn:hover {
  background: salmon !important;
  color: white !important;
}
</style>


