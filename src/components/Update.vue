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
                <li class="of-nav-link-item list-inline-item" :class="{active: page === 'update'}" v-on:click="page = 'update'">Update {{ form.name }}</li>
              </ul>
            </nav>
          </div>
          <div class="content" v-if="page === 'update'" id="#update">
            <form @submit.prevent="$validator.validateAll()">
              <div class="prop">
                <div class="title">Are you an official representative of the property?<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend">We will try to find an official representative if you're not.</label>
                  <options :items="['No', 'Yes']" param="class" id="representative" class="custom-dropdown" v-on:option-select="update"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Name<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('name')">{{ errors.first('name') }}</label>
                  <label class="field-set-legend" v-else>Example: Art House</label>
                  <input class="edit field-set-input" id="name" name="name" v-model="form.name" v-validate="'required|min:2|max:255'">
                </div>
              </div>
              <div class="prop">
                <div class="title">E-Mail Address<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('e-mail')">{{ errors.first('e-mail') }}</label>
                  <label class="field-set-legend" v-else>Example: example@arthouse.com.au</label>
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
                <div class="title">Website</div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('website')">{{ errors.first('website') }}</label>
                  <label class="field-set-legend" v-else>Example: arthouse.com.au</label>
                  <input class="edit field-set-input" id="website" v-model="form.website" name="website" v-validate="{url: {require_protocol: true }}">
                </div>
              </div>
              <div class="prop">
                <div class="title">Images</div>
                <div class="value">
                  <label class="field-set-legend" >You can select multiple items.</label>
                  <input class="edit field-set-input" id="images" type="file" multiple="multiple">
                </div>
              </div>
              <div class="prop">
                <div class="title">Description<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('description')">{{ errors.first('description') }}</label>
                  <label class="field-set-legend" v-else>You can use upto 999 characters.</label>
                  <input class="edit field-set-input" id="description" v-model="form.description" name="description" v-validate="'required|min:2|max:999'">
                </div>
              </div>
              <div class="prop">
                <div class="title">Contractor<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('contractor')">{{ errors.first('contractor') }}</label>
                  <label class="field-set-legend" v-else>Example: Mirvac or Mirvac[https://mirvac.com]</label>
                  <input class="edit field-set-input" id="contractor" v-model="form.contractor" name="contractor" v-validate="'required|min:2|max:255'">
                </div>
              </div>
              <div class="prop">
                <div class="title">Developer<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('developer')">{{ errors.first('developer') }}</label>
                  <label class="field-set-legend" v-else>Example: Mirvac or Mirvac[https://mirvac.com]</label>
                  <input class="edit field-set-input" id="developer" v-model="form.developer" name="developer" v-validate="'required|min:2|max:255'">
                </div>
              </div>
              <div class="prop">
                <div class="title">Management<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('management')">{{ errors.first('management') }}</label>
                  <label class="field-set-legend" v-else>Example: Aurora or Aurora[http://aaman.com.au/]</label>
                  <input class="edit field-set-input" id="management" v-model="form.management" name="management" v-validate="'required|min:2|max:255'">
                </div>
              </div>
              <div class="prop">
                <div class="title">Build Date<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('build date')">{{ errors.first('build date') }}</label>
                  <label class="field-set-legend" v-else>Practical completion timestamp in mm/dd/yyyy format.</label>
                  <input class="edit field-set-input" id="build-date" v-model="form.buildDate" name="build date" v-validate="'required|date_format:MM/dd/yyyy'">
                </div>
              </div>
              <div class="prop">
                <div class="title">Class<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend">Use the metropolis standard to determine this.</label>
                  <options :items="['Low-Rise', 'Mid-Rise', 'High-Rise']" param="buildingClass" id="buildingClass" class="custom-dropdown" v-on:option-select="update"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Cost<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend">Use market conditions to determine this.</label>
                  <options :items="['Low-Cost', 'Average-Cost', 'High-Cost']" param="buildingCost" id="buildingCost" class="custom-dropdown" v-on:option-select="update"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Density<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend">Use the metropolis standard to determine this.</label>
                  <options :items="['Low-Density', 'Mid-Density', 'High-Density']" param="buildingDensity" id="buildingDensity" class="custom-dropdown" v-on:option-select="update"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Plan</div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('planning and development')">{{ errors.first('planning and development') }}</label>
                  <label class="field-set-legend" v-else>Link to a public Planning and Development Application.</label>
                  <input class="edit field-set-input" id="plan" v-model="form.pda" name="planning and development" v-validate="{url: {require_protocol: true }}">
                </div>
              </div>
              <div class="prop">
                <div class="title">Environment Rating<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('environment rating')">{{ errors.first('environment rating') }}</label>
                  <label class="field-set-legend" v-else>Calculate the mean of the Australian WELS and E3 scheme stickers.</label>
                  <input class="edit field-set-input" id="environment-rating" v-model="form.environmentRating" name="environment rating" v-validate="'required|decimal:2'">
                </div>
              </div>
              <div class="prop">
                <div class="title">Master Plan</div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('master plan')">{{ errors.first('master plan') }}</label>
                  <label class="field-set-legend" v-else>Example: Hope Street Precinct.</label>
                  <input class="edit field-set-input" id="master-plan" v-model="form.masterPlan" name="master plan" v-validate="'min:2|max:255'">
                </div>
              </div>
              <div class="prop">
                <div class="title">Floors</div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('floors')">{{ errors.first('floors') }}</label>
                  <label class="field-set-legend" v-else>Example: 27.</label>
                  <input class="edit field-set-input" id="floors" v-model="form.floors" name="floors" type="number" v-validate="'required|min:1|max:3'">
                </div>
              </div>
              <div class="prop">
                <div class="title">Towers</div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('towers')">{{ errors.first('towers') }}</label>
                  <label class="field-set-legend" v-else>Example: 1.</label>
                  <input class="edit field-set-input" id="towers" v-model="form.towers" name="floors" type="number" v-validate="'required|digits:1'">
                </div>
              </div>
              <div class="prop">
                <div class="title">Unit</div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('unit')">{{ errors.first('unit') }}</label>
                  <label class="field-set-legend" v-else>Example: 0101</label>
                  <input class="edit field-set-input" id="unit" v-model="form.address.unit" name="unit" v-validate="'min:2|max:255'">
                </div>
              </div>
              <div class="prop">
                <div class="title">Number<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('number')">{{ errors.first('number') }}</label>
                  <label class="field-set-legend" v-else>Example: 19</label>

                  <input class="edit field-set-input" id="number" v-model="form.address.number" name="number" v-validate="'required|min:2|max:255'">
                </div>
              </div>
              <div class="prop">
                <div class="title">Street<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('street')">{{ errors.first('street') }}</label>
                  <label class="field-set-legend" v-else>Example: Hope</label>
                  <input class="edit field-set-input" id="street" v-model="form.address.streetName" name="street" v-validate="'required|min:2|max:255'">
                </div>
              </div>
              <div class="prop">
                <div class="title">Street Suffix<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend">Example: Street</label>
                  <options :items="['Alley', 'Arcade', 'Avenue', 'Boulevard', 'Bypass', 'Circuit', 'Close', 'Corner', 'Court', 'Crescent', 'Cul-de-sac', 'Drive', 'Esplanade', 'Green', 'Grove', 'Highway', 'Junction', 'Lane', 'Link', 'Mews', 'Parade', 'Place', 'Ridge', 'Road', 'Square', 'Street', 'Terrace']" param="suffix" id="suffix" class="custom-dropdown" v-on:option-select="update"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Suburb<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('suburb')">{{ errors.first('suburb') }}</label>
                  <label class="field-set-legend" v-else>Example: South Brisbane</label>
                  <input class="edit field-set-input" id="suburb" v-model="form.address.suburb" name="suburb" v-validate="'required|min:2|max:255'">
                </div>
              </div>
              <div class="prop">
                <div class="title">State<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend">Example: QLD</label>
                  <options :items="['NSW', 'VIC', 'QLD', 'SA', 'WA', 'NT', 'TAS', 'ACT']" param="state" id="state" class="custom-dropdown" v-on:option-select="update"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Post Code<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('post code')">{{ errors.first('post code') }}</label>
                  <label class="field-set-legend" v-else>Example: 4101</label>
                  <input class="edit field-set-input" id="post-code" v-model="form.address.postCode" name="post code" type="number" v-validate="'required|digits:4'">
                </div>
              </div>
              <div class="prop">
                <div class="title">Features<span class="required">*</span></div>
                <div class="value">
                  <label class="field-set-legend field-validation" v-if="errors.first('features')">{{ errors.first('features') }}</label>
                  <label class="field-set-legend" v-else>Example: Pool, Rooftop, Key-card Access, Car Park</label>
                  <input class="edit field-set-input" id="features" v-model="form.features" name="features" v-validate="'required|min:2|max:999'">
                </div>
              </div>
              <div class="prop">
                <div class="value">
                <button @click="saveChanges" type="submit" class="btn action-style">{{ button.text }}</button>
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
      page: 'update',
      user: false,
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
      },
      button: {
        text: 'Update Building'
      }
    }
  },
  methods: {
    initialise: function () {
      var vm = this
      this.$http('building/id/' + vm.$route.params.id).then(r => {
        if (vm.$store.getters.user.id !== r.data.adminId) {
          vm.$router.push({name: 'Unauthorized'})
        } else {
          vm.form = r.data
        }
      })
    },
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
    upload: function (id) {
      return new Promise((resolve, reject) => {
        const vm = this;
        const element = vm.select('images').files;
        var formData = new FormData();
        for (var i = 0; i < element.length; i++) {
          formData.append('file', element[i]);
        }
        this.$http({
          method: 'POST',
          url: 'building/id/' + id + '/multimedia',
          data: formData,
          headers: {
            'content-type': 'multipart/form-data'
          }
        }).then(r => {
          resolve(r)
        }).catch(function (error) {
          vm.$toasted.show(error)
          reject(error)
        })
      })
    },
    saveChanges: function () {
      const vm = this;
      if (this.errors.items.length <= 0) {
        vm.button.text = 'Creating new building...'
        vm.form.buildDate = vm.parseDate(vm.form.buildDate)
        this.$http({
          method: 'POST',
          url: 'building/update',
          data: vm.form
        }).then(async r => {
          vm.upload(r.data.id).then(data => {
            vm.button.text = 'Uploading ' + vm.select('images').files.length + ' images. This may take a minute.'
            vm.$router.push({path: `/building/${r.data.id}`})
          })
        }).catch(function (error) {
          vm.button.text = 'Update Building'
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
    vm.initialise();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../src/assets/css/stylesheet';
</style>
