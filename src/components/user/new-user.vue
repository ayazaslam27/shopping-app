<template>
  <div class="d-flex flex-column justify-content-center">
    <div class="heading d-flex justify-content-center position-relative">
      <i class="fas fa-user big-icon"></i>
      <span class="heading-title">I am a new Customer</span>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="d-flex flex-row py-2">
        <label class="col-4">Salutation</label>
        <select
          v-model="user.genderSelect"
          v-validate="'required'"
          name="genderSelect"
          class="form-control"
        >
          <option v-for="(option, index) in options" :key="index" :value="option">{{option.text}}</option>
        </select>
      </div>

      <div class="d-flex flex-row pb-2">
        <label class="col-4">First Name</label>
        <input
          type="text"
          v-validate="'required'"
          v-model="user.firstname"
          name="firstname"
          class="form-control"
        >
      </div>
      <div class="d-flex flex-row pb-2">
        <label class="col-4">Last Name</label>
        <input
          v-validate="'required'"
          type="text"
          name="lastname"
          v-model="user.lastname"
          class="form-control"
        >
      </div>

      <div class="d-flex flex-row pb-2">
        <label class="col-4">Username</label>
        <input
          v-validate="'required'"
          type="text"
          name="lastname"
          v-model="user.username"
          class="form-control"
        >
      </div>

      <div class="d-flex flex-row pb-2">
        <label class="col-4">Street / No</label>
        <div class="d-flex d-inline-block justify-content-between">
          <input
            type="text"
            v-validate="'required'"
            name="streetno"
            v-model="user.streetno"
            class="form-control col-9"
          >
          <input
            type="text"
            v-validate="'required|numeric'"
            name="houseno"
            v-model="user.houseno"
            class="form-control col-2"
          >
        </div>
      </div>

      <div class="d-flex flex-row pb-2">
        <label class="col-4">PostCode / City</label>
        <div class="d-flex flex-row justify-content-between">
          <input
            type="text"
            v-validate="'required|numeric'"
            name="postcode"
            v-model="user.postcode"
            class="form-control col-3"
          >
          <input
            type="text"
            v-validate="'required'"
            name="city"
            v-model="user.city"
            class="form-control col-8"
          >
        </div>
      </div>
      <div class="d-flex flex-row pb-2">
        <label class="col-4">Country</label>
        <country-select
          class="form-control"
          v-validate="'required'"
          name="country"
          v-model="user.country"
        />
      </div>
      <div class="d-flex flex-row pb-2">
        <label class="col-4">Email</label>
        <input
          type="email"
          v-validate="'required|email'"
          name="email"
          v-model="user.email"
          class="form-control"
        >
      </div>
      <div class="d-flex flex-row pb-2">
        <label class="col-4">Telephone</label>
        <input
          type="text"
          name="telephone"
          v-validate="'required'"
          v-model="user.telephone"
          class="form-control"
        >
      </div>
      <div class="d-flex flex-row pb-2">
        <label class="col-4">Select Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          ref="password"
          v-validate="'required|min:6|max:35'"
          v-model="user.password"
          class="form-control"
        >
      </div>
      <div class="d-flex flex-row pb-2">
        <label class="col-4">Confirm Password</label>
        <input
          type="password"
          name="passwordagain"
          placeholder="Confirm Password"
          v-validate="'required|confirmed:password'"
          v-model="passwordagain"
          class="form-control"
        >
      </div>

      <div
        class="text-small py-3 pl-3"
      >By clicking on "Register" I consent to the processing of my personal data in accordance with the privacy policy of wesell.com</div>
      <div class="position-relative declaration">
        <input
          type="checkbox"
          name="termsChecked"
          v-validate="'required'"
          class="form-check-input"
          v-model="termsChecked"
        >
        <div class="text-small">
          I agree that wesell.com recommend e-mail products and services from their assortment and may interview me to their satisfaction. I can revoke my consent at any time, for example via the unsubscribe link at the end of the newsletter. I am at least 16 years old.
          Further information, including the shipping service provider as well as the personalized evaluation, can be found in our privacy policy .
        </div>
      </div>
      <div class="position-relative py-4">
        <button
          :disabled="!checkValidation"
          type="submit"
          class="btn custom-button float-right col-4"
        >Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import apiActions from "../../js/restfulApiCaller/apiActions";
export default {
  name: "new-user",
  data() {
    return {
      options: [{ value: 0, text: "Male" }, { value: 1, text: "Female" }],
      termsChecked: false,
      passwordagain: null,

      user: {
        genderSelect: null,
        country: null,
        username: null,
        firstname: null,
        lastname: null,
        streetno: null,
        houseno: null,
        postcode: null,
        city: null,
        telephone: null,
        password: null
      }
    };
  },
  computed: {
    checkValidation() {
      return (
        this.user.genderSelect &&
        this.user.country &&
        this.termsChecked &&
        this.user.firstname &&
        this.user.lastname &&
        this.user.username &&
        this.user.streetno &&
        this.user.houseno &&
        this.user.postcode &&
        this.user.city &&
        this.user.telephone &&
        this.user.password &&
        this.passwordagain &&
        this.errors.items.length == 0
      );
    }
  },
  methods: {
    onSubmit() {
      apiActions.register(this.user, function(response) {
        console.log(response);
      });

      apiActions
        .register(this.user)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
input:invalid {
  border-color: red;
}
.errors {
  color: red;
}
input[aria-invalid="true"] {
  border-color: red;
}

.btn:disabled {
  opacity: 0.35;
}
</style>

