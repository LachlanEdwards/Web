<template>
  <div class="results">
    <div class="filter">
      <div class="filter-item">
        <div class="pre-text"><i class="icon-star-outline"></i> Rating</div>
        <options :items="['Any', '1', '2', '3', '4', '5']" param="score" id="filter-rating" class="custom-dropdown" v-on:option-select="update"></options>
      </div>
      <div v-if="allowed" class="filter-item action-item">
        <div class="action" v-on:click="$emit('compose')">Compose</div>
      </div>
    </div>
    <spinner :active="network" spinner="spinner" color="rgba(239,98,108,1)"/>
    <div v-if="r.results" class="results">
      <user-rating v-for="rating in r.results.content" v-bind:key="rating.id" :image="staticImage" :user="rating.user.first + ' ' + rating.user.last" :date="parseDate(rating.date)" :score="rating.score" :text="rating.comment"></user-rating>
    </div>
    <div class="switch">
      <div class="switch-position-center">
        <div class="prev switch-nav" v-if="r.filter.page > 0" onclick="window.scrollTo(0, 0);" v-on:click="r.filter.page--; next();"><i class="icon ion-ios-arrow-back"></i></div>
        <div class="disabled prev switch-nav" v-else><i class="icon ion-ios-arrow-back"></i></div>
        <div class="curr">{{ r.filter.page + 1 }} ... {{ r.results.totalPages}}</div>
        <div class="nex switch-nav" v-if="(r.results.totalPages - 1) > r.filter.page" onclick="window.scrollTo(0, 0);" v-on:click="r.filter.page++; next();"><i class="icon ion-ios-arrow-forward"></i></div>
        <div class="disabled nex switch-nav" v-else><i class="icon ion-ios-arrow-forward"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
import UserRating from './user.rating'
import Options from './options'
import Spinner from 'vue-element-loading'

export default {
  name: 'Results',
  components: {UserRating, Options, Spinner},
  props: {
    id: {
      type: String,
      required: true
    },
    allowed: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      network: true,
      r: {
        results: false,
        filter: {
          'score': 'Any',
          'page': 0
        }
      }
    }
  },
  methods: {
    initialise: function () {
      var vm = this
      this.$http('building/id/' + vm.id + '/reviews?page=' + vm.r.filter.page).then(r => {
        vm.r.results = r.data
        vm.network = false
      })
    },
    parseDate: function (date) {
      var formatted = new Date(date)
      return formatted.toLocaleString()
    },
    update: function (item, param) {
      var vm = this
      vm.network = true
      var base = 'building/id/' + vm.id + '/reviews'
      var additions = '?'
      vm.r.filter[param] = item
      for (var key in vm.r.filter) {
        if (vm.r.filter.hasOwnProperty(key) && key !== 'for' && vm.r.filter[key] !== 'Any') {
          additions += key + '=' + vm.r.filter[key].toString().replace('+', '') + '&'
        }
      }
      this.$http(base + additions).then(r => {
        vm.r.results = r.data
        vm.network = false
      })
    },
    next: function () {
      var vm = this
      vm.network = true
      var base = 'building/id/' + vm.id + '/reviews'
      var additions = '?'
      for (var key in vm.r.filter) {
        if (vm.r.filter.hasOwnProperty(key) && key !== 'for' && vm.r.filter[key] !== 'Any') {
          additions += key + '=' + vm.r.filter[key].toString().replace('+', '') + '&'
        }
      }
      this.$http(base + additions).then(r => {
        vm.r.results = r.data
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
  .filter-item.action-item {
    cursor: pointer;
    border: unset;
    height: 100%;
    font-weight: bold;
    .ml-style-linear-gradient();
    color: @white;
    padding: 1em;
  }
  .filter-item:not(:first-child) {
    margin: 0 0 0 1em;
  }
}
</style>
