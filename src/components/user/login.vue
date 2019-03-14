<template>
  <div class="d-flex flex-column">
    <div class="heading d-flex justify-content-center position-relative">
      <i class="fas fa-user big-icon"></i>
      <span class="heading-title">I am already a Customer</span>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="d-flex flex-row py-2">
        <label class="col-4">username</label>
        <input
          type="text"
          name="Username"
          v-validate="'required'"
          v-model="user.username"
          class="form-control"
        >
      </div>
      <div class="d-flex flex-row pb-2">
        <label class="col-4">password</label>
        <input
          type="password"
          name="Password"
          v-validate="'required|min:6|max:35'"
          v-model="user.password"
          class="form-control"
        >
      </div>
      <div class="errors d-flex flex-row pl-4">
        <span v-for="error in errors.all()" :key="error">-{{error}}</span>
      </div>

      <div class="position-relative py-4">
        <button
          :disabled="!checkValidation"
          type="submit"
          class="btn custom-button float-right col-4"
        >Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import apiActions from "../../js/apiActions";
export default {
  name: "login",
  data() {
    return {
      user: {
        username: null,
        password: null,
        audience: "we.sell.com"
      }
    };
  },
  computed: {
    checkValidation() {
      return (
        this.user.username &&
        this.user.password &&
        this.errors.items.length == 0
      );
    }
  },
  methods: {
    onSubmit() {
      var that = this;

      apiActions
        .login(this.user)
        .then(result => {
          that.$store.dispatch("setUserAuthentication", result.success);
          if (result.success) {
            that.$store.dispatch("setUserInfo", result.user);
            localStorage.setItem("token", result.token);
            that.$router.push("/");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>


