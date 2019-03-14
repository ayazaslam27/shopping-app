<template>
  <section
    class="d-flex col-12 justify-content-between"
    :class="[mobileVersion ? 'flex-column' : 'flex-row']"
  >
    <login class="d-flex" :class="[mobileVersion? 'col-12 order-1':'col-6 order-2']"></login>
    <newuser class="d-flex" :class="[mobileVersion? 'col-12 order-2':'col-6 order-1']"></newuser>
  </section>
</template>

<script>
import countryselect from "vue-country-region-select";
import newuser from "@/components/user/new-user";
import login from "@/components/user/login";
export default {
  name: "profile",
  components: {
    newuser,
    login
  },
  computed: {
    mobileVersion() {
      return this.$store.getters.isMobileVersion;
    }
  }
};
</script>

<style>
.big-icon {
  font-size: 48px;
  color: lightgrey;
}

.heading {
  border-bottom: 1px solid lightgray;
  padding: 1em;
}
.heading-title {
  padding-left: 1em;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: xx-large;
  color: orangered;
  font-weight: bold;
}
@media (max-width: 984px) {
  .heading-title {
    font-size: large;
    padding-top: 0.5em;
  }
}
.declaration {
  padding-left: 2.2em;
}
.custom-button {
  background-color: orangered;
  color: white;
  font-size: large;
  font-weight: bold;
}

.custom-button:hover {
  background-color: rgba(255, 130, 85, 0.7);
  font-style: italic;
  color: white;
}
</style>
