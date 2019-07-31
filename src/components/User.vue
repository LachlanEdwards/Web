<template>
  <div class="parent">
    <header class="header">
      <navbar></navbar>
      <div class="billboard"></div>
    </header>
    <spinner :active="!b" spinner="spinner" color="rgba(239,98,108,1)"/>
    <main class="main" v-if="b">
      <div class="row">
        <div class="col-md-3 l">
          <div class="card">
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
                <label class="field-set-legend">You'll need to Sign-In after editing this field.</label>
                <input class="edit field-set-input" id="username" :placeholder="user.username" v-model="user.username">
              </div>
            </div>
            <div class="prop">
              <div class="title">First Name</div>
              <div class="value">
                <label class="field-set-legend">You will be addressed by this name on the platform.</label>
                <input class="edit field-set-input" id="first" :placeholder="user.first" v-model="user.first">
              </div>
            </div>
            <div class="prop">
              <div class="title">Last Name</div>
              <div class="value">
                <label class="field-set-legend">You will be addressed by this name on the platform.</label>
                <input class="edit field-set-input" id="last" :placeholder="user.last" v-model="user.last">
              </div>
            </div>
            <div class="prop">
              <div class="title">E-Mail Address</div>
              <div class="value">
                <label class="field-set-legend">You'll need this to recover this account.</label>
                <input class="edit field-set-input" id="email" :placeholder="user.mail" v-model="user.mail">
              </div>
            </div>
            <div class="prop">
              <div class="title">Phone Number</div>
              <div class="value">
                <label class="field-set-legend">You'll need this to recover this account.</label>
                <input class="edit field-set-input" id="phone" :placeholder="user.phone" v-model="user.phone">
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
                <label class="field-set-legend">You'll need this to recoever your account.</label>
                <input class="edit field-set-input" id="birthday" :placeholder="user.birthday" v-model="user.birthday">
              </div>
            </div>
            <div class="prop" v-if="compare !== JSON.stringify(user)">
              <div class="value">
                <button @click="saveChanges" class="btn default-style">{{ button.text }}</button>
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
const api = 'http://localhost:8081/';

export default {
  name: 'User',
  components: {Navbar, Options, Spinner, Mapbox},
  data () {
    return {
      local: 'http://localhost:8080/',
      page: 'general',
      compare: false,
      user: false,
      b: false,
      button: {
        text: 'Save Changes'
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
    saveChanges: function () {
      var vm = this;
      vm.button.text = 'Saving...'
      this.$http({
        method: 'POST',
        url: api + 'user/self/update',
        data: vm.user
      }).then(r => {
        vm.user = r.data;
        vm.compare = JSON.stringify(r.data);
        vm.button.text = 'Save Changes'
        vm.$toasted.show('Saved!')
      }).catch(function (error) {
        vm.button.text = 'Save Changes'
        vm.$toasted.show(error)
      })
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
