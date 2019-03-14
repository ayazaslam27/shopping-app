<template>
  <div :class="primaryClass">
    <div :class="inputClass" class="bg-light">
      <input class="search-input" type="search" placeholder="Search">
    </div>

    <div class="d-inline-block position-relative search-button">
      <button class="search-button">
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",

  computed: {
    inputClass() {
      if (this.mobileVersion) {
        return "col-12";
      } else {
        return "col-12";
      }
    },
    mobileVersion() {
      return this.$store.getters.isMobileVersion;
    },
    primaryClass() {
      if (this.mobileVersion) {
        return "col-12 d-flex flex-row";
      } else {
        return "col-4 d-flex flex-row py-3";
      }
    }
  }
};
</script>
<style>
.search-input {
  border: none;
  border: 1px solid lightgray;
  border-radius: 10px;
  width: 100%;
  height: 2.5em;
  padding-left: 1em;
  padding-right: 3em;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}

.search-button {
  border: none;
  background: transparent;
  left: -3em;
  top: 0.5em;
}
</style>

