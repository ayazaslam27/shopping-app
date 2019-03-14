<template>
  <div class="bg-light d-flex">
    <div v-if="mobileVersion" class="pl-3 pt-3 w-25" :class="[mobileVersion? 'col-1':'col-2']">
      <button class="btn btn-outline-info" v-on:click="toggleSideMenu">
        <i class="fas fa-toggle-on"></i>
      </button>
    </div>

    <template>
      <div :class="[!mobileVersion ? 'col-3 d-inline-block': 'col-6 d-inline-block']">
        <router-link class="navbar-brand py-3" to="/">
          <i class="fas fa-code-branch brand-icon px-2"></i>
          <span class="brand-heading">We Sell</span>
        </router-link>
      </div>

      <search v-if="!mobileVersion" :mobileVersion="mobileVersion"></search>

      <div :class="[!mobileVersion ? 'col-5 ': 'col-5']" class="d-inline-block py-3">
        <div @mouseover="showCart" @mouseleave="hideCart">
          <router-link
            :to="{name: 'checkout'}"
            :class="[!mobileVersion? 'mr-1': 'mr-0.5']"
            class="float-right btn we-sell-button"
          >
            <span v-if="!mobileVersion" class="pr-2">Shopping Cart</span>
            <i class="fas fa-shopping-cart"></i>
          </router-link>
        </div>
        <router-link
          v-if="!isUserLoggedIn"
          :to="{ name: 'registration'}"
          :class="[!mobileVersion? 'mr-1': 'mr-3']"
          class="float-right btn we-sell-button"
        >
          <span v-if="!mobileVersion" class="pr-2">Account</span>
          <i class="fas fa-user-circle"></i>
        </router-link>

        <div v-if="isUserLoggedIn" :class="[!mobileVersion? 'mr-1': 'mr-3']" class="float-right">
          <b-dropdown id="ddown1">
            <template slot="button-content">
              <span v-if="!mobileVersion" class="pr-2">{{loggedInUser.name}}</span>
              <i class="fas fa-user-circle"></i>
            </template>
            <b-dropdown-item>
              <router-link :to="{ name: 'profile'}">
                <span v-if="!mobileVersion" class="pr-2">Profile</span>
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link :to="{ name: ''}" exact v-on:click.native="logout">
                <span v-if="!mobileVersion" class="pr-2">Logout</span>
              </router-link>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import search from "../search/search.vue";

export default {
  name: "NavBar",
  data() {
    return {
      showCartonHover: true,
      openSideMenu: false,
      showModal: false,
      showLogoutLink: false
    };
  },
  methods: {
    showCart() {
      this.$parent.$emit("showCartEvent", true);
    },
    hideCart() {
      this.$parent.$emit("hideCartEvent");
    },
    toggleSideMenu() {
      this.openSideMenu = !this.openSideMenu;
      this.$parent.$emit("toggleSideMenu", this.openSideMenu);
    },
    logout() {
      this.$store.dispatch("setUserAuthentication", false);
      this.$store.dispatch("setUserInfo", {});
      this.$router.push("/");
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.getUser;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserAuthenticated;
    },
    mobileVersion() {
      return this.$store.getters.isMobileVersion;
    }
  },
  components: {
    search
  }
};
</script>
<style>
@media (max-width: 984px) {
  .navbar-brand {
    position: absolute;
    left: 70%;
    transform: translateX(-50%);
  }
}

.brand-heading {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  color: orangered;
  font-size: xx-large;
  font-weight: bolder;
  font-style: italic;
}
@media (max-width: 984px) {
  .brand-heading {
    font-size: x-large;
  }
}

.brand-icon {
  font-size: 2em;
  color: orangered;
}
</style>
