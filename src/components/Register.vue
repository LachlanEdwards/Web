<template>
  <div class="parent">
    <header class="header">
      <navbar></navbar>
      <div class="billboard"></div>
    </header>
    <main class="main">
      <div class="row">
        <div class="col-md-12 r">
          <div class="of-nav">
            <nav class="nav">
              <ul class="of-nav-list-items list-unstyled list-inline">
                <li class="of-nav-link-item list-inline-item" :class="{active: page === 'create'}" v-on:click="page = 'create'">Create an Account</li>
              </ul>
            </nav>
          </div>
          <div class="content" v-if="page === 'create'" id="#create">
            <form @submit.prevent="$validator.validateAll()">
              <div class="prop">
                <div class="title">Username<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('username')">{{ errors.first('username') }}</label>
                  <label class="field-set-legend" v-else>You'll use this to Sign-In.</label>
                  <input class="edit field-set-input" id="username" name="username" v-model="form.username" v-validate="'required|min:2|max:255'">
                </div>
              </div>
              <div class="prop">
                <div class="title">E-Mail Address<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('e-mail')">{{ errors.first('e-mail') }}</label>
                  <label class="field-set-legend" v-else>Example: example@metlease.com</label>
                  <input class="edit field-set-input" id="e-mail" name="e-mail" v-model="form.mail" v-validate="'required|min:2|max:255|email'">
                </div>
              </div>
              <div class="prop">
                <div class="title">Phone<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('phone')">{{ errors.first('phone') }}</label>
                  <label class="field-set-legend" v-else>Example: (07) 3036 7179</label>
                  <input class="edit field-set-input" id="phone" name="phone" v-model="form.phone" v-validate="'required|min:8|max:15'">
                </div>
              </div>
              <div class="prop">
                <div class="title">Password<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('password')">{{ errors.first('password') }}</label>
                  <label class="field-set-legend" v-else>You only need a minimum of 5 characters.</label>
                  <input class="edit field-set-input" id="password" v-model="form.password" name="password" type="password" v-validate="'required|min:5'" ref="password">
                </div>
              </div>
              <div class="prop">
                <div class="title">Confirm Password<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('confirm password')">{{ errors.first('confirm password') }}</label>
                  <label class="field-set-legend" v-else>Retype the password you created before.</label>
                  <input class="edit field-set-input" id="confirmPassword" name="confirm password" type="password" v-validate="'required|confirmed:password'" data-vv-as="password">
                </div>
              </div>
              <div class="prop">
                <div class="title">First<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('first name')">{{ errors.first('first name') }}</label>
                  <label class="field-set-legend" v-else>Example: Jane</label>
                  <input class="edit field-set-input" id="firstName" v-model="form.first" name="first name" v-validate="'required|min:2|max:255'">
                </div>
              </div>
              <div class="prop">
                <div class="title">Last<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('last name')">{{ errors.first('last name') }}</label>
                  <label class="field-set-legend" v-else>Example: Doe</label>
                  <input class="edit field-set-input" id="lastName" v-model="form.last" name="last name" v-validate="'required|min:2|max:255'">
                </div>
              </div>
              <div class="prop">
                <div class="title">Birthday<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('birthday')">{{ errors.first('birthday') }}</label>
                  <label class="field-set-legend" v-else>Birthday in mm/dd/yyyy format.</label>
                  <input class="edit field-set-input" id="birthday" v-model="form.birthday" name="birthday" v-validate="'required|date_format:MM/dd/yyyy'">
                </div>
              </div>
              <div class="prop">
                <div class="title">Gender<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend">You don't have to tell the truth. We only use this data to recover your account.</label>
                  <options :items="['Male', 'Female', 'Non-binary']" param="gender" id="gender" class="custom-dropdown" v-on:option-select="update"></options>
                </div>
              </div>
              <div class="prop">
                <div class="value">
                <button @click="saveChanges" type="submit" class="btn default-style">{{ button.text }}</button>
              </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
/* eslint-disable semi */
/* eslint-disable camelcase */
import Options from './options';
import Spinner from 'vue-element-loading';
import Mapbox from 'mapbox-gl-vue';
import Navbar from './nav.vue';
import ValidationProvider from 'vee-validate';

export default {
  name: 'Create',
  components: {Navbar, Options, Spinner, Mapbox, ValidationProvider},
  data () {
    return {
      local: 'http://localhost:8080/',
      page: 'create',
      user: false,
      form: {
        username: null,
        mail: null,
        phone: null,
        password: null,
        first: null,
        last: null,
        birthday: null,
        gender: 'Male'
      },
      button: {
        text: 'Create Account'
      }
    }
  },
  methods: {
    update: function (value, param) {
      const vm = this
      vm.form[param] = value;
    },
    parseDate: function (string) {
      return new Date(string).getTime();
    },
    edit: function (field) {
      const vm = this;
      var el = vm.select(field);
      vm.status[field] = false;
      el.focus();
    },
    select: function (el) {
      return document.getElementById(el);
    },
    saveChanges: function () {
      const vm = this;
      if (this.errors.items.length <= 0) {
        vm.button.text = 'Creating new account...'
        vm.form.birthday = vm.parseDate(vm.form.birthday)
        this.$http({
          method: 'POST',
          url: 'secure/create',
          data: vm.form
        }).then(async r => {
          this.$router.push({path: `/signin`})
        }).catch(function (error) {
          vm.button.text = 'Create Account'
          vm.$toasted.show(error)
        })
      } else {
        vm.$toasted.show('You have one or more invalid fields.')
      }
    }
  },
  created: function () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../src/assets/css/stylesheet';
</style>
