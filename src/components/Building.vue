<template>
    <div class="parent">
      <header class="header">
        <navbar></navbar>
        <div class="map">
          <mapbox v-if="b" @map-load="marker" access-token="pk.eyJ1IjoibWV0bGVhc2UiLCJhIjoiY2pyYzA5ZW1sMThhdjN5cG45N24wZzk3aCJ9.sgPujNuDMhFzEElX-P83aQ" :map-options="{style: 'mapbox://styles/mapbox/streets-v11', center: [b.longitude, b.latitude], zoom: 15}"></mapbox>
        </div>
      </header>
      <spinner :active="!b" spinner="spinner" color="rgba(128,128,128,1)"/>
      <main class="main" v-if="b">
        <div class="row">
          <div class="col-md-3 l">
            <div class="card">
              <img src="../assets/image/test_images/1.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">{{ b.name }}, {{ b.address.suburb }}</h5>
                <div class="card-text card-text-rating">
                  <div class="rating-helper">Rating out of 5</div>
                  <div :class="`rating-vis rating-${b.mean}`"></div>
                  <div class="rating-value">{{b.mean}}</div>
                </div>
                <!-- <div class="card-text card-text-score">
                  <div class="score">
                    <div v-for="(n, index) in parseInt(b.mean)" :key="index+1" class="icon-fill">
                      <i class="icon-star-fill"></i>
                    </div>
                    <div v-for="(n, index) in 5 - parseInt(b.mean)" :key="-index" class="">
                      <i class="icon-star-outline"></i>
                    </div>
                  </div>
                </div> -->
                <address class="card-text text-capitalize">
                  {{ b.address.number }} {{ b.address.streetName }} {{b.address.suffix.toLocaleLowerCase() }}<br>
                  {{ b.address.suburb }}, {{ b.address.postCode }}<br>
                  {{ b.address.state }}
                </address>
              </div>
              <div class="card-footer">
                <div class="row button-row">
                  <div class="col-md-6"><a href="#" class="btn"><i class="material-icons">person_add</i></a></div>
                  <div class="col-md-6"><a href="#" class="btn"><i class="material-icons">track_changes</i></a></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-9 r">
            <div class="of-nav">
              <nav class="nav">
                <ul class="of-nav-list-items list-unstyled list-inline">
                  <li class="of-nav-link-item list-inline-item" :class="{active: page === 'profile'}" v-on:click="page = 'profile'">Profile</li>
                  <li class="of-nav-link-item list-inline-item" :class="{active: page === 'images'}" v-on:click="page = 'images'">Images</li>
                  <li class="of-nav-link-item list-inline-item" :class="{active: page === 'lease'}" v-on:click="page = 'lease'">Leasing</li>
                  <li class="of-nav-link-item list-inline-item" :class="{active: page === 'sale'}" v-on:click="page = 'sale'">Selling</li>
                  <li class="of-nav-link-item list-inline-item" :class="{active: page === 'ratings'}" v-on:click="page = 'ratings'">Ratings</li>
                  <!-- <li class="of-nav-link-item list-inline-item" :class="{active: page === 'blog'}" v-on:click="page = 'blog'">Blog</li>
                  <li class="of-nav-link-item list-inline-item" :class="{active: page === 'feed'}" v-on:click="page = 'feed'">News</li>
                  <li class="of-nav-link-item list-inline-item" :class="{active: page === 'residents'}" v-on:click="page = 'residents'">Residents</li> -->
                </ul>
              </nav>
            </div>
            <div class="content" v-if="page === 'profile'" id="#profile">
              <profile-page :entity="b"></profile-page>
            </div>
            <div class="content" v-if="page === 'images'" id="#images">
              <images :id="$route.params.id"></images>
            </div>
            <div class="content" v-if="page === 'lease'" id="#lease">
              <apartment-lease :id="$route.params.id"></apartment-lease>
            </div>
            <div class="content" v-if="page === 'sale'" id="#sale">
              <apartment-sale :id="$route.params.id"></apartment-sale>
            </div>
            <div class="content" v-if="page === 'blog'" id="#blog">
              <blog :id="$route.params.id"></blog>
            </div>
            <div class="content" v-if="page === 'feed'" id="#feed">
              <news :id="$route.params.id"></news>
            </div>
            <div class="content" v-if="page === 'ratings'" id="#ratings">
              <ratings :id="$route.params.id" :allowed="true" v-on:compose="new_composer(1)"></ratings>
            </div>
            <div class="content" v-if="page === 'residents'" id="#residents">
              <residents :id="$route.params.id" :building="b"></residents>
            </div>
          </div>
        </div>
      </main>
    </div>
</template>

<script>
import Mapbox from 'mapbox-gl-vue'
import mapboxgl from 'mapbox-gl'
import Images from './Images'
import Blog from './Blog'
import Options from './options'
import ApartmentLease from './ApartmentLease'
import ApartmentSale from './ApartmentSale'
import Spinner from 'vue-element-loading'
import Navbar from './nav'
import ProfilePage from './ProfilePage'
import News from './News'
import Ratings from './Ratings'
import Composer from './Composer'
import Residents from './Residents'
export default {
  name: 'Building',
  components: {Mapbox, mapboxgl, Composer, Ratings, Navbar, News, ProfilePage, Blog, Images, Options, ApartmentLease, ApartmentSale, Spinner, Residents},
  data () {
    return {
      b: null,
      page: 'profile',
      pic: {
        lib: ['../assets/image/test_images/1.jpg', '../assets/image/test_images/2.jpg', '../assets/image/test_images/3.jpg', '../assets/image/test_images/4.jpg'],
        modal: null,
        display: false
      }
    }
  },
  methods: {
    marker: function (map) {
      var vm = this
      // eslint-disable-next-line
      var marker = new mapboxgl.Marker().setLngLat([vm.b.longitude, vm.b.latitude]).addTo(map);
    },
    setter: function () {
      var vm = this
      vm.initialise_b()
    },
    initialise_b: function () {
      var vm = this
      this.$http('building/id/' + vm.$route.params.id).then(r => {
        vm.b = r.data
      })
    }
  },
  created: function () {
    var vm = this
    vm.setter()
  }
}
</script>

<style lang="less" scoped>
  @import '../../src/assets/css/stylesheet';
</style>
