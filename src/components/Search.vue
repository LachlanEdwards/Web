<template>
  <div class="parent">
    <header class="header">
      <navbar></navbar>
      <billboard :image="require('../assets/image/cities/brisbane.jpeg')" :repeat=false></billboard>
    </header>
    <main class="main">
      <div class="row">
        <div class="col-md-12 r">
          <div class="of-nav">
            <nav class="nav">
              <ul class="of-nav-list-items list-unstyled list-inline">
                <li class="of-nav-link-item list-inline-item" :class="{active: page === 'results'}" v-on:click="page = 'results'">Results</li>
                <li class="of-nav-link-item list-inline-item" :class="{active: page === 'filter'}" v-on:click="page = 'filter'">Filter</li>
              </ul>
            </nav>
          </div>
          <div class="content" id="#results" v-if="page === 'results'">
            <form @submit.prevent="$validator.validateAll()">
              <div class="prop">
                <div class="title">Suburb</div>
                <div class="value">
                  <label class="field-set-legend">You can use the Filter tab to narrow down results.</label>
                  <input class="edit field-set-input" id="suburb" v-model="query" name="suburb" autocomplete="off" v-validate="'required|min:2|max:255'">
                  <autocomplete :query="query"></autocomplete>
                </div>
              </div>
            </form>
            <p>Surrounding can be done by co-ordinatesx</p>
          </div>
          <div class="content" id="#filter" v-if="page === 'filter'">
            <form @submit.prevent="$validator.validateAll()">
              <div class="prop">
                <div class="title">City</div>
                <div class="value">
                  <options :items="['Brisbane', 'Sydney', 'Melbourne']" param="city" id="city" class="custom-dropdown" v-on:option-select="update"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Rating</div>
                <div class="value">
                  <options :items="['Any', '1', '2', '3', '4', '5']" param="rating" id="rating" class="custom-dropdown" v-on:option-select="update"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Build Date</div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('build date')">{{ errors.first('build date') }}</label>
                  <label class="field-set-legend" v-else>Practical completion timestamp in mm/dd/yyyy format.</label>
                  <input class="edit field-set-input" id="build-date" v-model="form.buildDate" name="build date" v-validate="'required|date_format:MM/dd/yyyy'">
                </div>
              </div>
              <div class="prop">
                <div class="title">Environment Rating</div>
                <div class="value">
                  <options :items="['Any', '1', '2', '3', '4', '5']" param="environment" id="environment" class="custom-dropdown" v-on:option-select="update"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Elevators</div>
                <div class="value">
                  <options :items="['Any', '1', '2', '3', '4', '5+']" param="elevator" id="elevator" class="custom-dropdown" v-on:option-select="update"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Height</div>
                <div class="value">
                  <options :items="['Any', 'Low-Rise', 'Mid-Rise', 'High-Rise']" param="height" id="height" class="custom-dropdown" v-on:option-select="update"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Density</div>
                <div class="value">
                  <options :items="['Any', 'Low-Density', 'Mid-Density', 'High-Density']" param="density" id="density" class="custom-dropdown" v-on:option-select="update"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Cost</div>
                <div class="value">
                  <options :items="['Any', 'Low-Cost', 'Average-Cost', 'High-Cost']" param="cost" id="cost" class="custom-dropdown" v-on:option-select="update"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Amenities</div>
                <div class="value">
                  <label class="field-set-legend">Seperate values with a comma.</label>
                  <options :items="['Any', 'Low-Cost', 'Average-Cost', 'High-Cost']" param="buildingCost" id="buildingCost" class="custom-dropdown" v-on:option-select="update"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Renting or Selling</div>
                <div class="value">
                  <options :items="['Either','Renting', 'Selling']" param="state" id="state" class="custom-dropdown" v-on:option-select="update"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Available Size</div>
                <div class="value">
                  <label class="field-set-legend">Advertising this many bedrooms.</label>
                  <options :items="['Any', '1', '2', '3', '4', '5+']" param="bedrooms" id="bedrooms" class="custom-dropdown" v-on:option-select="update"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Available Additions</div>
                <div class="value">
                  <label class="field-set-legend">Advertising this many bathrooms.</label>
                  <options :items="['Any', '1', '2', '3', '4', '5+']" param="bathroom" id="bathroom" class="custom-dropdown" v-on:option-select="update"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Available Parking</div>
                <div class="value">
                  <label class="field-set-legend">Advertising this many car spaces.</label>
                  <options :items="['Any', '1', '2', '3', '4', '5+']" param="carpark" id="carpark" class="custom-dropdown" v-on:option-select="update"></options>
                </div>
              </div>
              <div class="prop">
                <div class="value">
                  <button @click="search" type="submit" class="btn default-style">Search</button>
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
import Navbar from './nav.vue';
import Billboard from './Billboard';
import ValidationProvider from 'vee-validate';

export default {
  name: 'Create',
  components: {Navbar, Options, Spinner, Billboard, ValidationProvider},
  data () {
    return {
      local: 'http://localhost:8080/',
      page: 'results',
      user: false,
      query: null,
      form: {
        mail: null,
        phone: null,
        image: null,
        website: null,
        description: null,
        name: null,
        contractor: null,
        developer: null,
        agent: null,
        agency: null,
        management: null,
        buildDate: null,
        buildingClass: 'Low-Rise',
        buildingCost: 'Low-Cost',
        buildingDensity: 'Low-Density',
        pda: null,
        features: null,
        environmentRating: null,
        masterPlan: null,
        towers: null,
        floors: null,
        address: {
          unit: null,
          number: null,
          suffix: 'Alley',
          suburb: null,
          state: 'NSW',
          streetName: null,
          postCode: null
        }
      }
    }
  },
  methods: {
    update: function (value, param) {
      const vm = this
      if (param === 'suffix' || param === 'state') {
        vm.form.address[param] = value;
      } else {
        vm.form[param] = value;
      }
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
    search: function () {
      console.log('nothing')
    }
  },
  computed: {
    staticImage: function () {
      var vm = this;
      return 'https://api.mapbox.com/v4/mapbox.light/' + vm.e.lon + ',' + vm.e.lat + ',15/500x500@2x.png?access_token=pk.eyJ1IjoibWV0bGVhc2UiLCJhIjoiY2pyYzA5ZW1sMThhdjN5cG45N24wZzk3aCJ9.sgPujNuDMhFzEElX-P83aQ'
    }
  },
  created: function () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../src/assets/css/stylesheet';
</style>
