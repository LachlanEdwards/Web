<template>
  <div class="parent">
    <header class="header">
      <navbar></navbar>
      <div class="billboard"></div>
    </header>
    <spinner :active="!user" spinner="spinner" color="rgba(239,98,108,1)"/>
    <main class="main" v-if="user">
      <div class="row">
        <div class="col-md-3 l">
          <div class="card" v-if="b">
            <img src="../assets/image/test_images/1.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{ b.name }}, {{ b.address.suburb }}</h5>
              <div class="card-text card-text-score">
                <div class="score">
                  <div v-for="(n, index) in parseInt(b.mean)" :key="index+1" class="dot">
                    <div class="dot-inside"></div>
                  </div>
                  <div v-for="(n, index) in 5 - parseInt(b.mean)" :key="-index" class="dot-outline">
                    <div class="dot-outline-inside"></div>
                  </div>
                </div>
              </div>
              <address class="card-text">
                {{ b.address.number }} {{ b.address.streetName }} {{b.address.suffix}}<br>
                {{ b.address.suburb }}, {{ b.address.postCode }}<br>
                {{ b.address.state }}
              </address>
              <a href="#" class="btn default-style">See {{ b.name }}'s Profile</a>
            </div>
          </div>
        </div>
        <div class="col-md-9 r">
          <div class="of-nav">
            <nav class="nav">
              <ul class="of-nav-list-items list-unstyled list-inline">
                <li class="of-nav-link-item list-inline-item" :class="{active: page === 'general'}" v-on:click="page = 'general'">General</li>
                <li class="of-nav-link-item list-inline-item" :class="{active: page === 'security'}" v-on:click="page = 'security'">Security</li>
                <li class="of-nav-link-item list-inline-item" :class="{active: page === 'buildings'}" v-on:click="page = 'buildings'">Buildings</li>
                <li class="of-nav-link-item list-inline-item" :class="{active: page === 'apartments'}" v-on:click="page = 'apartments'">Apartments</li>
              </ul>
            </nav>
          </div>
          <div class="content" v-if="page === 'general'" id="#general">
            <div class="prop">
              <div class="title">Support ID</div>
              <div class="value">
                <label class="field-set-legend">You cannot change this field.</label>
                <input disabled class="edit field-set-input" id="id" :placeholder="user.id">
              </div>
            </div>
            <div class="prop">
              <div class="title">Username</div>
              <div class="value">
                <label class="field-set-legend field-validation" v-if="errors.first('username')">{{ errors.first('username') }}</label>
                <label class="field-set-legend" v-else>You'll need to Sign-In after editing this field.</label>
                <input class="edit field-set-input" id="username" name="username" :placeholder="user.username" v-model="user.username" v-validate="'required|min:2|max:255'">
              </div>
            </div>
            <div class="prop">
              <div class="title">First Name</div>
              <div class="value">
                <label class="field-set-legend field-validation" v-if="errors.first('first name')">{{ errors.first('first name') }}</label>
                <label class="field-set-legend" v-else>You will be addressed by this name on the platform.</label>
                <input class="edit field-set-input" id="first" name="first name" :placeholder="user.first" v-model="user.first" v-validate="'required|min:2|max:255'">
              </div>
            </div>
            <div class="prop">
              <div class="title">Last Name</div>
              <div class="value">
                <label class="field-set-legend field-validation" v-if="errors.first('last name')">{{ errors.first('last name') }}</label>
                <label class="field-set-legend" v-else> You will be addressed by this name on the platform.</label>
                <input class="edit field-set-input" id="last" name="last name" :placeholder="user.last" v-model="user.last" v-validate="'required|min:2|max:255'">
              </div>
            </div>
            <div class="prop">
              <div class="title">E-Mail Address</div>
              <div class="value">
                <label class="field-set-legend field-validation" v-if="errors.first('e-mail')">{{ errors.first('e-mail') }}</label>
                <label class="field-set-legend" v-else>You'll need this to recover this account.</label>
                <input class="edit field-set-input" id="email" name="e-mail" :placeholder="user.mail" v-model="user.mail" v-validate="'required|min:2|max:255|email'">
              </div>
            </div>
            <div class="prop">
              <div class="title">Phone Number</div>
              <div class="value">
                <label class="field-set-legend field-validation" v-if="errors.first('phone number')">{{ errors.first('phone number') }}</label>
                <label class="field-set-legend" v-else>You'll need this to recover this account.</label>
                <input class="edit field-set-input" id="phone" name="phone number" :placeholder="user.phone" v-model="user.phone" v-validate="'required|min:8|max:15'">
              </div>
            </div>
            <div class="prop">
              <div class="title">Gender</div>
              <div class="value">
                <label class="field-set-legend">You'll need this to recover your account.</label>
                <options :items="['Male', 'Female', 'Non-binary']" param="gender" id="select-gender" class="custom-dropdown" v-on:option-select="update"></options>
              </div>
            </div>
            <div class="prop">
              <div class="title">Birthdate</div>
              <div class="value">
                <label class="field-set-legend field-validation" v-if="errors.first('birthday')">{{ errors.first('birthday') }}</label>
                <label class="field-set-legend" v-else> You'll need this to recoever your account.</label>
                <input class="edit field-set-input" id="birthday" name="birthday" :placeholder="user.birthday" v-model="user.birthday" v-validate="'required|date_format:MM/dd/yyyy'">
              </div>
            </div>
            <div class="prop" v-if="compare !== JSON.stringify(user)">
              <div class="value">
                <button @click="saveChanges" class="btn action-style">{{ button.text }}</button>
              </div>
            </div>
          </div>
          <div class="content" v-if="page === 'security'" id="#security">
            <div class="prop">
              <div class="title">Reset Password</div>
              <div class="value">
                <label class="field-set-legend">You will be sent an e-mail to {{ user.mail }}.</label>
                <button @click="resetPassword" class="btn action-style">{{ button.resetPasswordText }}</button>
              </div>
            </div>
          </div>
          <div class="content" v-if="page === 'buildings'" id="#buildings">
            <div class="prop">
              <div class="title">{{user.username}}'s Buildings</div>
              <div class="value">
                <label class="field-set-legend">You're the admin of these buildings.</label>
                <div class="row">
                  <div class="col-md-4" v-for="building in buildings.data.content" v-bind:key="building.id">
                    <entity-card class="entity" :entity="building"></entity-card>
                  </div>
                </div>
              </div>
            </div>
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
import EntityCard from './entity.card';
var qs = require('qs')
const api = 'http://localhost:8081/';

export default {
  name: 'User',
  components: {Navbar, Options, Spinner, Mapbox, EntityCard},
  data () {
    return {
      local: 'http://localhost:8080/',
      page: 'general',
      compare: false,
      user: false,
      b: false,
      buildings: {
        data: false,
        page: 0
      },
      button: {
        text: 'Update Account',
        resetPasswordText: 'Reset Password'
      }
    }
  },
  methods: {
    update: function (value) {
      var vm = this
      vm.user.gender = value.toUpperCase()
    },
    setter: function () {
      var vm = this;
      this.$http('user/self').then(r => {
        if (r.data.building) {
          vm.resident(r.data.building);
        }
        vm.building(r.data.id);
        vm.user = r.data;
        vm.compare = JSON.stringify(r.data);
      })
    },
    resident: function (id) {
      var vm = this;
      this.$http('building/id/' + id).then(r => {
        vm.b = r.data;
      })
    },
    building: function (id) {
      var vm = this;
      this.$http('building/user/' + id + '?page=' + vm.buildings.page).then(r => {
        vm.buildings.data = r.data;
      })
    },
    parseDate: function (epoch) {
      var d = new Date(epoch);
      var date = d.getDate();
      var month = d.getMonth() + 1;
      var year = d.getFullYear();
      return date + '/' + month + '/' + year;
    },
    edit: function (field) {
      var vm = this;
      var el = vm.select(field);
      vm.status[field] = false;
      el.focus();
    },
    select: function (el) {
      return document.getElementById(el);
    },
    resetPassword: function () {
      var vm = this;
      vm.button.resetPasswordText = 'Working...'
      this.$http({
        method: 'POST',
        url: 'user/reset',
        data: qs.stringify({
          username: vm.user.username
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }).then(function (response) {
        if (response.data.error) {
          vm.$toasted.show(response.data.message)
        } else {
          vm.button.resetPasswordText = 'Done.'
        }
      }).catch(error => {
        vm.$toasted.show(error)
      })
    },
    saveChanges: function () {
      var vm = this;
      if (this.errors.items.length <= 0) {
        vm.button.text = 'Updating Account...'
        this.$http({
          method: 'POST',
          url: api + 'user/self/update',
          data: vm.user
        }).then(r => {
          vm.user = r.data;
          vm.compare = JSON.stringify(r.data);
          vm.button.text = 'Update Account'
          vm.$toasted.show('User Account Updated')
        }).catch(function (error) {
          vm.button.text = 'Update Account'
          vm.$toasted.show(error)
        })
      } else {
        vm.$toasted.show('You have one or more invalid fields.')
      }
    }
  },
  computed: {
    staticImage: function () {
      var vm = this;
      return 'https://api.mapbox.com/v4/mapbox.light/' + vm.e.lon + ',' + vm.e.lat + ',15/500x500@2x.png?access_token=pk.eyJ1IjoibWV0bGVhc2UiLCJhIjoiY2pyYzA5ZW1sMThhdjN5cG45N24wZzk3aCJ9.sgPujNuDMhFzEElX-P83aQ'
    }
  },
  created: function () {
    var vm = this;
    vm.setter();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../src/assets/css/stylesheet';
</style>
