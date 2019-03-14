<template>
  <section class="sidebar-menu default d-flex" v-click-outside="clickedOutside">
    <div class="list w-100">
      <template v-for="(item, index) in menu">
        <item :item="item" :key="index + '-B'"></item>
      </template>
    </div>
  </section>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.css";
import item from "./item.vue";

export default {
  name: "SideBar",
  data() {
    return {
      openSideMenu: false
    };
  },
  components: { item },
  computed: {
    menu() {
      return this.$store.getters.getCategories;
    },
    mobileVersion() {
      return this.$store.getters.isMobileVersion;
    }
  },
  methods: {
    clickedOutside() {
      if (this.openSideMenu) {
        this.openSideMenu = false;
      }
    }
  },
  directives: {
    "click-outside": {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${
            binding.expression
          }' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }

          console.warn(warn);
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;

        // add Event Listeners
        document.addEventListener("click", handler);
      },

      unbind: function(el, binding) {
        // Remove Event Listeners
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../scss/sideBar.scss";
</style>
