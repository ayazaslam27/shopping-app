<template>
  <section>
    <div v-if="mobileVersion" class="row">
      <search></search>
    </div>
    <div class="row">
      <SideBar :style="openSideMenuStyle" :class="[mobileVersion ? 'col-12':'col-3']"/>
      <div :class="[mobileVersion ? 'position-absolute col-12':'col-9']">
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>

<script>
import SideBar from "../components/sideMenu/sideBar.vue";
import search from "../components/search/search.vue";
import { eventMixin } from "@/js/mixins";
export default {
  name: "front",
  props: {
    shouldOpenSideMenu: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    openSideMenuStyle() {
      if (this.shouldOpenSideMenu && this.mobileVersion) {
        return `transition: 0.5s; transform: translateX(0%)`;
      } else if (!this.shouldOpenSideMenu && this.mobileVersion) {
        return `transition: 0.5s; transform: translateX(-100%)`;
      } else {
        return "";
      }
    },
    mobileVersion() {
      return this.$store.getters.isMobileVersion;
    }
  },
  components: {
    SideBar,
    search
  },
  mixins: [eventMixin]
};
</script>