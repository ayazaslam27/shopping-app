<template>
  <div
    class="child-item"
    v-if="item"
    @mouseenter="mouseEnter($event)"
    @mouseleave="mouseleave($event)"
  >
    <template>
      <router-link
        :to="{ name: 'main-category-with-brand', params: {category: mainCategory, brand: item.Name}}"
        class="link pl-4"
      >
        <i v-if="item.icon" class="icon col-1" :class="item.icon"></i>
        <span class="title col-10">{{item.Name}}</span>
      </router-link>
      <i
        v-if="item.child"
        class="arrow child-arrow py-2 col-1"
        :style="arrowStyle"
        @click="showChildren = !showChildren"
      ></i>
    </template>

    <template v-if="showChildren">
      <template v-for="(childItem, index) in item.Brands">
        <ChildItem :item="childItem" :mobileVersion="mobileVersion" :key="index + '-A'"></ChildItem>
      </template>
    </template>
  </div>
</template>

<script>
import { itemMixin } from "../../js/mixins";

export default {
  name: "ChildItem",
  data() {
    return {
      showChildren: false
    };
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    mainCategory: {
      type: String,
      required: true
    }
  },
  created() {
    this.$on("closeAll", function() {
      this.showChildren = false;
    });
  },

  computed: {
    mobileVersion() {
      return this.$store.getters.isMobileVersion;
    }
  },
  mixins: [itemMixin],
  methods: {
    mouseEnter(event) {
      this.showChildren = true;
    },
    mouseleave(event) {
      this.$emit("closeAll");
    }
  }
};
</script>