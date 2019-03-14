<template>
  <div class="item first-item" @mouseenter="mouseEnter()" @mouseleave="mouseleave()">
    <div>
      <router-link
        ref="link"
        :to="{ name: 'main-category', params: { category: item.Name }}"
        class="link"
      >
        <i v-if="item.icon" class="icon col-1" :class="item.icon"></i>
        <span class="title col-11">{{item.Name}}</span>
      </router-link>
      <i
        v-if="item.Brands"
        class="arrow child-arrow col-1 py-2"
        :style="arrowStyle"
        @click="showChildren = !showChildren"
      ></i>
    </div>

    <template v-if="showChildren">
      <template v-for="(childItem, index) in item.Brands">
        <childItem :item="childItem" :index="index" :mainCategory="item.Name" :key="index + '-A'"></childItem>
      </template>
    </template>
  </div>
</template>

<script>
import childItem from "./childItem.vue";
import { itemMixin } from "../../js/mixins";
export default {
  name: "Item",
  data() {
    return {
      showChildren: false
    };
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    childItem
  },
  computed: {
    mobileVersion() {
      return this.$store.getters.isMobileVersion;
    }
  },

  mixins: [itemMixin],
  methods: {
    mouseEnter() {
      if (!this.mobileVersion) this.showChildren = true;
    },
    mouseleave() {
      if (!this.mobileVersion) this.showChildren = false;
    }
  }
};
</script>

<style>
.child-arrow {
  z-index: 20 !important;
}

.icon {
  color: dodgerblue;
}
</style>


