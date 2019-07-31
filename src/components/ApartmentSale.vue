<template>
  <div class="results">
    <div class="filter">
      <div class="filter-item">
        <div class="pre-text"><i class="icon-bed-outline"></i></div>
        <options :items="['Any', '1', '2', '3', '4', '5+']" param="bedroom" id="filter-sale-bedrooms" class="custom-dropdown" v-on:option-select="update"></options>
      </div>
      <div class="filter-item">
        <div class="pre-text"><i class="icon-bath-outline"></i></div>
        <options :items="['Any', '1', '2', '3', '4', '5+']" param="bathroom" id="filter-sale-bathrooms" class="custom-dropdown" v-on:option-select="update"></options>
      </div>
      <div class="filter-item">
        <div class="pre-text"><i class="icon-bath-outline"></i></div>
        <options :items="['Any', '1', '2', '3', '4', '5+']" param="parking" id="filter-sale-parking" class="custom-dropdown" v-on:option-select="update"></options>
      </div>
      <div class="filter-item">
        <div class="pre-text"><i class="icon-bath-outline"></i></div>
        <options :items="['Any', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000+']" param="price" id="filter-sale-price" class="custom-dropdown" v-on:option-select="update"></options>
      </div>
    </div>
    <spinner :active="network" spinner="spinner" color="rgba(239,98,108,1)"/>
    <div v-if="re.apartments" class="results">
      <div class="row">
        <div class="null" v-if="re.apartments.content.length <= 0">Oops... I can't see any apartments for sale.</div>
        <div class="prop col-md-4" v-for="r in re.apartments.content" v-bind:key="r.id">
          <apartment-card class="apt-card" :bed="r.apartment.bedroom" :bath="r.apartment.bathroom" :car="r.apartment.garage" :cost="r.cost" frequency="pw" :title="r.apartment.number" v-bind:source="require('../assets/image/test_images/1.jpg')"></apartment-card>
        </div>
      </div>
      <div class="switch">
        <div class="switch-position-center">
          <div class="prev switch-nav" v-if="re.filter.page > 0" onclick="window.scrollTo(0, 0);" v-on:click="re.filter.page--; next();"><i class="icon ion-ios-arrow-back"></i></div>
          <div class="disabled prev switch-nav" v-else><i class="icon ion-ios-arrow-back"></i></div>
          <div class="curr">{{ re.filter.page + 1 }} ... {{ re.apartments.totalPages}}</div>
          <div class="nex switch-nav" v-if="(re.apartments.totalPages - 1) > re.filter.page" onclick="window.scrollTo(0, 0);" v-on:click="re.filter.page++; next();"><i class="icon ion-ios-arrow-forward"></i></div>
          <div class="disabled nex switch-nav" v-else><i class="icon ion-ios-arrow-forward"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApartmentCard from './apartment.card'
import Options from './options'
import Spinner from 'vue-element-loading'
export default {
  name: 'ApartmentSale',
  components: {ApartmentCard, Options, Spinner},
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      network: true,
      re: {
        apartments: null,
        filter: {
          'bedroom': 'Any',
          'bathroom': 'Any',
          'parking': 'Any',
          'price': 'Any',
          'page': 0
        }
      }
    }
  },
  methods: {
    initialise: function () {
      var vm = this
      this.$http('building/id/' + vm.id + '/sale?page=' + vm.re.filter.page).then(r => {
        vm.re.apartments = r.data
        vm.network = false
      })
    },
    update: function (item, param) {
      var vm = this
      vm.network = true
      var base = 'building/id/' + vm.id + '/sale'
      var additions = '?'
      vm.re.filter[param] = item
      for (var key in vm.re.filter) {
        if (vm.re.filter.hasOwnProperty(key) && key !== 'for' && vm.re.filter[key] !== 'Any') {
          additions += key + '=' + vm.re.filter[key].toString().replace('+', '') + '&'
        }
      }
      this.$http(base + additions).then(r => {
        vm.re.apartments = r.data
        vm.network = false
      })
    },
    next: function () {
      var vm = this
      vm.network = true
      var base = 'building/id/' + vm.id + '/sale'
      var additions = '?'
      for (var key in vm.re.filter) {
        if (vm.re.filter.hasOwnProperty(key) && key !== 'for' && vm.re.filter[key] !== 'Any') {
          additions += key + '=' + vm.re.filter[key].toString().replace('+', '') + '&'
        }
      }
      this.$http(base + additions).then(r => {
        vm.re.apartments = r.data
        vm.network = false
      })
    }
  },
  mounted: function () {
    var vm = this
    vm.initialise()
  }
}
</script>

<style lang="less" scoped>
@import '../../src/assets/css/stylesheet';
.results {
  margin: 1em 0 0 0;
  .apt-card {
    margin: 0 1em 1em 0;
  }
  .switch {
    display: flex;
    justify-content: center;
    .switch-position-center {
      display: inline-flex;
      flex-direction: row;
      border: 1px solid @border-grey;
      border-radius: 3px;
      .switch-nav {
        cursor: pointer;
        color: @black;
        padding: 1em;
      }
      .switch-nav.disabled {
        color: @border-grey;
        cursor: not-allowed;
      }
      .curr {
        padding: 1em;
        text-transform: uppercase;
        border-left: 1px solid @border-grey;
        border-right: 1px solid @border-grey;
        font-weight: bold;
      }
    }
  }
}
.filter {
  .filter-item {
    display: inline-flex;
    border: 1px solid @border-grey;
    border-radius: 3px;
    .pre-text {
      padding: 1em;
      border-right: 1px solid @border-grey;
    }
    .custom-dropdown {
      padding: 1em;
    }
  }
  .filter-item:not(:first-child) {
    margin: 0 0 0 1em;
  }
}
</style>
