<template>
  <main id="component" class="entity">
    <image-modal v-if="images.modalDisplay" :source="images.modalImage" @exit="images.modalDisplay = false"></image-modal>
    <div class="container-fluid data-container" id="#top">
      <div class="brand-container">
        <div class="ml">Metlease</div>
        <div class="user"><a class="user-page-link" href="#">Hello, {{ this.$user.username }}</a></div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <div class="name">
            <h2>{{ e.name }}</h2>
          </div>
          <div class="suburb">
            <i class="fas fa-map-marker-alt"></i><span> {{ e.address.suburb }}</span>
          </div>
          <div class="residing">
            <button class="link-user">Reside in {{ e.name }}</button>
          </div>
          <div class="rating-card">
            <div v-for="(value, key) in e.ratingCard" v-bind:key="key" v-if="key !== 'id'">
              <div class="title">{{ key }}</div>
              <div class="rating">{{ value }}</div>
              <div class="rating-bar" v-bind:style="{background: 'linear-gradient(to right, #7F7EFF 0%, #7F7EFF ' + parseInt(value) * 2 * 10 + '%, #A9B4C2 ' + parseInt(value) * 2 * 10 + '%, #A9B4C2 100%)'}"></div>
            </div>
          </div>
        </div>
        <div class="col-md-10">
          <div class="margin-left-large">
            <div class="overflow-nav">
              <nav class="nav">
                <a class="nav-link" :class="{active: page === 'profile'}" v-on:click="page = 'profile'">Page</a>
                <a class="nav-link" :class="{active: page === 'images'}" v-on:click="page = 'images'">Images</a>
                <a class="nav-link" :class="{active: page === 'leasing'}" v-on:click="page = 'leasing'">Leasing</a>
                <a class="nav-link" :class="{active: page === 'for_sale'}" v-on:click="page = 'for_sale'">Selling</a>
                <a class="nav-link" :class="{active: page === 'partners'}" v-on:click="page = 'partners'">Partners</a>
                <a class="nav-link" :class="{active: page === 'blog'}" v-on:click="page = 'blog'">Blog</a>
                <a class="nav-link" :class="{active: page === 'feed'}" v-on:click="page = 'feed'">Trending</a>
                <a class="nav-link" :class="{active: page === 'ratings'}" v-on:click="page = 'ratings'">Ratings</a>
                <a class="nav-link" :class="{active: page === 'residents'}" v-on:click="page = 'residents'">Residents</a>
              </nav>
            </div>
            <div class="content" v-if="page === 'profile'" id="#profile">
              <div class="row">
                <div class="col-md-6">
                  <div class="prop">
                    <div class="title">Description:</div>
                    <div class="value">
                      {{ e.description }}
                    </div>
                  </div>
                  <div class="prop">
                    <div class="title">Address:</div>
                    <address class="value">
                      {{ e.address.number }} {{ e.address.streetName }} {{e.address.suffix}}<br>
                      {{ e.address.suburb }}, {{ e.address.postCode }}<br>
                      {{ e.address.state }}
                    </address>
                  </div>
                  <div class="prop">
                    <div class="title">Phone:</div>
                    <div class="value">{{ e.phone }}</div>
                  </div>
                  <div class="prop">
                    <div class="title">E-Mail:</div>
                    <div class="value">{{ e.mail }}</div>
                  </div>
                  <div class="prop">
                    <div class="title">Badges:</div>
                    <div class="value">{{ e.buildingClass }}, {{ e.buildingCost }}, {{ e.buildingDensity }}</div>
                  </div>
                  <div class="prop">
                    <div class="title">Environment Rating:</div>
                    <div class="value">{{ e.er }}</div>
                  </div>
                  <div class="prop">
                    <div class="title">Features:</div>
                    <div class="value">Pool, Gym, Recreation Room, Recreation Deck, BBQ, Intercom, Secure Parking, Ducted Air Conditioning, Alarm System, Pet Friendly, High-Speed Broadband Connection, Pay TV Access, Visitor Parking, Smoking Permitted</div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="prop map-prop">
                    <div class="title">Map:</div>
                    <mapbox v-if="e" @map-load="marker" class="map" access-token="pk.eyJ1IjoibWV0bGVhc2UiLCJhIjoiY2pyYzA5ZW1sMThhdjN5cG45N24wZzk3aCJ9.sgPujNuDMhFzEElX-P83aQ" :map-options="{style: 'mapbox://styles/mapbox/streets-v11', center: [e.lon, e.lat], zoom: 15}"></mapbox>
                  </div>
                </div>
              </div>
            </div>
            <div class="content images" v-if="page === 'images'" id="#images">
              <div class="image-grid-container">
                <div v-for="image in images.lib" class="image-grid-item" v-bind:key="image">
                  <img :src="image" :alt="image" width="100%" height="100%" v-on:click="generateImageModal(image)">
                </div>
              </div>
            </div>
            <div class="content leasing" v-if="page === 'leasing'" id="#leasing">
              <div class="filter">
                <div class="filter-item">
                  <div class="pre-text"><i class="fas fa-bed"></i> Bedrooms</div>
                  <options :items="['Any', '1', '2', '3', '4', '5+']" param="bedroom" id="filter-lease-bedrooms" class="custom-dropdown" v-on:option-select="filterForLease"></options>
                </div>
                <div class="filter-item">
                  <div class="pre-text"><i class="fas fa-bath"></i> Bathrooms</div>
                  <options :items="['Any', '1', '2', '3', '4', '5+']" param="bathroom" id="filter-lease-bathrooms" class="custom-dropdown" v-on:option-select="filterForLease"></options>
                </div>
                <div class="filter-item">
                  <div class="pre-text"><i class="fas fa-car"></i> Parking</div>
                  <options :items="['Any', '1', '2', '3', '4', '5+']" param="parking" id="filter-lease-parking" class="custom-dropdown" v-on:option-select="filterForLease"></options>
                </div>
                <div class="filter-item">
                  <div class="pre-text"><i class="fas fa-dollar-sign"></i> Max Price</div>
                  <options :items="['Any', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000+']" param="price" id="filter-lease-price" class="custom-dropdown" v-on:option-select="filterForLease"></options>
                </div>
              </div>
              <div class="results">
                <div class="title">
                  <div class="left">{{ market.lease.totalElements }} <span v-if="market.lease.totalElements === 1">result</span><span v-else>results</span></div>
                  <div class="right"><span class="previous-page" v-if="market.filter.lease.page > 0" v-on:click="market.filter.lease.page--; fetchForLease();">Previous &middot; </span><span class="current-page">Page {{ market.filter.lease.page + 1 }}</span><span class="next-page" v-if="(market.lease.totalPages - 1) > market.filter.lease.page" v-on:click="market.filter.lease.page++; fetchForLease();"> &middot; Next</span></div>
                </div>
                <div class="prop" v-for="el in market.lease.content" v-bind:key="el.id">
                  <apartment-card :bed="el.apartment.bedroom" :bath="el.apartment.bathroom" :car="el.apartment.garage" :cost="el.cost" :frequency="el.per" :title="el.apartment.number" :source="'https://open.mapquestapi.com/staticmap/v4/getmap?key=oVKF5UwJv3UCuEII3CC2j3LiD0XTwdFF&size=1024%2C216&zoom=15&center=' + el.apartment.building.lat + '%2C' + el.apartment.building.lon" :rating=el.apartment.building.ratingCard.aggregate></apartment-card>
                </div>
                <div class="pagination">
                  <div class="right"><span class="previous-page" v-if="market.filter.lease.page > 0" onclick="window.scrollTo(0, 0);" v-on:click="market.filter.lease.page--; fetchForLease();">Previous &middot; </span><span class="current-page">Page {{ market.filter.lease.page + 1 }}</span><span class="next-page" v-if="(market.lease.totalPages - 1) > market.filter.lease.page" onclick="window.scrollTo(0, 0);" v-on:click="market.filter.lease.page++; fetchForLease();"> &middot; Next</span></div>
                </div>
              </div>
            </div>
            <div class="content selling" v-if="page === 'for_sale'" id="#for_sale">
              <div class="filter">
                <div class="filter-item">
                  <div class="pre-text"><i class="fas fa-bed"></i> Bedrooms</div>
                  <options :items="['Any', '1', '2', '3', '4', '5+']" param="bedroom" id="filter-sale-bedrooms" class="custom-dropdown" v-on:option-select="filterForSale"></options>
                </div>
                <div class="filter-item">
                  <div class="pre-text"><i class="fas fa-bath"></i> Bathrooms</div>
                  <options :items="['Any', '1', '2', '3', '4', '5+']" param="bathroom" id="filter-sale-bathrooms" class="custom-dropdown" v-on:option-select="filterForSale"></options>
                </div>
                <div class="filter-item">
                  <div class="pre-text"><i class="fas fa-car"></i> Parking</div>
                  <options :items="['Any', '1', '2', '3', '4', '5+']" param="parking" id="filter-sale-parking" class="custom-dropdown" v-on:option-select="filterForSale"></options>
                </div>
                <div class="filter-item">
                  <div class="pre-text"><i class="fas fa-dollar-sign"></i> Max Price</div>
                  <options :items="['Any', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000+']" param="price" id="filter-sale-price" class="custom-dropdown" v-on:option-select="filterForSale"></options>
                </div>
              </div>
              <div class="results">
                <div class="title">
                  <div class="left">{{ market.sale.totalElements }} <span v-if="market.sale.totalElements === 1">result</span><span v-else>results</span></div>
                  <div class="right"><span class="previous-page" v-if="market.filter.sale.page > 0" v-on:click="market.filter.sale.page--; fetchForSale();">Previous &middot; </span><span class="current-page">Page {{ market.filter.sale.page + 1 }}</span><span class="next-page" v-if="(market.sale.totalPages - 1) > market.filter.sale.page" v-on:click="market.filter.sale.page++; fetchForSale();"> &middot; Next</span></div>
                </div>
                <div class="prop" v-for="el in market.sale.content" v-bind:key="el.id">
                  <apartment-card :bed="el.apartment.bedroom" :bath="el.apartment.bathroom" :car="el.apartment.garage" :cost="el.cost" :frequency="el.per" :title="el.apartment.number" :source="'https://open.mapquestapi.com/staticmap/v4/getmap?key=oVKF5UwJv3UCuEII3CC2j3LiD0XTwdFF&size=1024%2C216&zoom=15&center=' + el.apartment.building.lat + '%2C' + el.apartment.building.lon" :rating=el.apartment.building.ratingCard.aggregate></apartment-card>
                </div>
                <div class="pagination">
                  <div class="right"><span class="previous-page" v-if="market.filter.sale.page > 0" onclick="window.scrollTo(0, 0);" v-on:click="market.filter.sale.page--; fetchForSale();">Previous &middot; </span><span class="current-page">Page {{ market.filter.sale.page + 1 }}</span><span class="next-page" v-if="(market.sale.totalPages - 1) > market.filter.sale.page" onclick="window.scrollTo(0, 0);" v-on:click="market.filter.sale.page++; fetchForSale();"> &middot; Next</span></div>
                </div>
              </div>
            </div>
            <div class="content" v-if="page === 'partners'" id="#partners">
              <p>partners</p>
            </div>
            <div class="content" v-if="page === 'blog'" id="#blog">
              <p>blog</p>
            </div>
            <div class="content" v-if="page === 'feed'" id="#feed">
              <div class="articles">
                <news-article v-for="art in news.articles" v-bind:key="art.date" :title="art.title" :desc="art.desc" :date="art.date" :source="art.source" :url="art.link"></news-article>
              </div>
            </div>
            <div class="content ratings" v-if="page === 'ratings'" id="#ratings">
              <form class="user-review-form" v-on:submit.prevent="postUserRating">
                <div class="meta">
                  <div class="image">
                    <img alt="" :src="staticImage">
                  </div>
                  <div class="text">
                    <div class="title">Leave a Rating</div>
                    <div class="user" v-if="this.$user">Posting as {{ this.$user.username }}</div>
                  </div>
                </div>
                <div class="rating" v-if="ratings.showTextArea">
                  <div class="prop aggregate">
                    <div class="title"><i class="fas fa-star"></i> Aggregate</div>
                    <div class="value">{{ userRatingData.aggregate }}</div>
                  </div>
                  <div class="prop">
                    <div class="title"><i class="fas fa-tasks"></i> Management</div>
                    <div class="value">
                      <options :items="['5', '4', '3', '2', '1']" param="management" id="score-management" class="custom-dropdown" v-on:option-select="storeUserSelectedRatings"></options>
                    </div>
                  </div>
                  <div class="prop">
                    <div class="title"><i class="fas fa-universal-access"></i> Functionality</div>
                    <div class="value">
                      <options :items="['5', '4', '3', '2', '1']" param="functionality" id="score-functionality" class="custom-dropdown" v-on:option-select="storeUserSelectedRatings"></options>
                    </div>
                  </div>
                  <div class="prop">
                    <div class="title"><i class="fas fa-swimming-pool"></i> Facilities</div>
                    <div class="value">
                      <options :items="['5', '4', '3', '2', '1']" param="facilities" id="score-facilities" class="custom-dropdown" v-on:option-select="storeUserSelectedRatings"></options>
                    </div>
                  </div>
                  <div class="prop">
                    <div class="title"><i class="fas fa-street-view"></i> Neighbourhood</div>
                    <div class="value">
                      <options :items="['5', '4', '3', '2', '1']" param="neighbourhood" id="score-neighbourhood" class="custom-dropdown" v-on:option-select="storeUserSelectedRatings"></options>
                    </div>
                  </div>
                  <div class="prop">
                    <div class="title"><i class="fas fa-smile-wink"></i> Culture</div>
                    <div class="value">
                      <options :items="['5', '4', '3', '2', '1']" param="culture" id="score-culture" class="custom-dropdown" v-on:option-select="storeUserSelectedRatings"></options>
                    </div>
                  </div>
                  <div class="prop">
                    <div class="title"><i class="fas fa-building"></i> Fittings</div>
                    <div class="value">
                      <options :items="['5', '4', '3', '2', '1']" param="fittings" id="score-fittings" class="custom-dropdown" v-on:option-select="storeUserSelectedRatings"></options>
                    </div>
                  </div>
                  <div class="prop">
                    <div class="title"><i class="fas fa-music"></i> Noise</div>
                    <div class="value">
                      <options :items="['5', '4', '3', '2', '1']" param="noise" id="score-noise" class="custom-dropdown" v-on:option-select="storeUserSelectedRatings"></options>
                    </div>
                  </div>
                </div>
                <textarea v-if="ratings.showTextArea" class="user-input" v-model="userRatingData.comment"></textarea>
                <button v-if="ratings.showTextArea" type="submit" class="enabled-submit-button submit-button">Submit</button>
                <button v-else-if="!ratings.showTextArea" class="disabled-submit-button submit-button">Thank you</button>
              </form>
              <div class="filter">
                <div class="filter-item">
                  <div class="pre-text"><i class="fas fa-star"></i> Aggregate</div>
                  <options :items="['Any', '1', '2', '3', '4', '5']" param="aggregate" id="filter-rating" class="custom-dropdown" v-on:option-select="filterRatings"></options>
                </div>
              </div>
              <div class="results">
                <div class="title">
                  <div class="left">{{ ratings.content.totalElements }} <span v-if="ratings.content.totalElements === 1">result</span><span v-else>results</span></div>
                  <div class="right"><span class="previous-page" v-if="ratings.filter.page > 0" v-on:click="ratings.filter.page--; fetchRatings();">Previous &middot; </span><span class="current-page">Page {{ ratings.filter.page + 1 }}</span><span class="next-page" v-if="(ratings.content.totalPages - 1) > ratings.filter.page" v-on:click="ratings.filter.page++; fetchRatings();"> &middot; Next</span></div>
                </div>
                <div class="user-ratings">
                  <user-rating v-for="rating in ratings.content.content" v-bind:key="rating.id" :image="staticImage" :user="rating.user.first + ' ' + rating.user.last" :date="parseDate(rating.date)" :aggregate="rating.aggregate" :management="rating.management" :functionality="rating.functionality" :fittings="rating.fittings" :facilities="rating.facilities" :culture="rating.culture" :neighbourhood="rating.neighbourhood" :noise="rating.noise" :text="rating.comment"></user-rating>
                </div>
                <div class="pagination">
                  <div class="right"><span class="previous-page" v-if="ratings.filter.page > 0" onclick="window.scrollTo(0, 0);" v-on:click="ratings.filter.page--; fetchRatings();">Previous &middot; </span><span class="current-page">Page {{ ratings.filter.page + 1 }}</span><span class="next-page" v-if="(ratings.content.totalPages - 1) > ratings.filter.page" onclick="window.scrollTo(0, 0);" v-on:click="ratings.filter.page++; fetchRatings();"> &middot; Next</span></div>
                </div>
              </div>
            </div>
            <div class="content" v-if="page === 'residents'" id="#residents">
              <p>residents</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
/* eslint-disable semi */
/* eslint-disable camelcase */
import templateHead from './template.head.vue';
import userRating from './user.rating';
import blueCard from './blue.card';
import apartmentCard from './apartment.card';
import Options from './options';
import imageModal from './image.modal';
import newsArticle from './news.article';
import Mapbox from 'mapbox-gl-vue';
import mapboxgl from 'mapbox-gl';
const axios = require('axios');
const api = 'http://localhost:8081/';

export default {
  name: 'entity',
  components: {userRating, blueCard, templateHead, Mapbox, apartmentCard, Options, imageModal, newsArticle},
  data () {
    return {
      e: false,
      page: 'profile',
      news: false,
      ratings: {
        content: false,
        showTextArea: true,
        filter: {
          'aggregate': 'Any',
          'page': 0
        }
      },
      userRatingData: {
        aggregate: 5,
        management: 5,
        functionality: 5,
        facilities: 5,
        neighbourhood: 5,
        culture: 5,
        fittings: 5,
        noise: 5,
        comment: ''
      },
      images: {
        lib: ['../static/test_images/1.jpg', '../static/test_images/2.jpg', '../static/test_images/3.jpg', '../static/test_images/4.jpg'],
        modalImage: null,
        modalDisplay: false
      },
      market: {
        lease: null,
        sale: null,
        filter: {
          lease: {
            'bedroom': 'Any',
            'bathroom': 'Any',
            'parking': 'Any',
            'price': 'Any',
            'page': 0
          },
          sale: {
            'bedroom': 'Any',
            'bathroom': 'Any',
            'parking': 'Any',
            'price': 'Any',
            'page': 0
          }
        }
      }
    }
  },
  methods: {
    setter: function () {
      var vm = this;
      axios({
        method: 'GET',
        url: api + 'building/id/' + vm.$route.params.id,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': vm.$cookies.get('JWT')
        }
      }).then(r => {
        vm.e = r.data;
      })
      axios({
        method: 'GET',
        url: api + 'building/id/' + vm.$route.params.id + '/lease?page=' + vm.market.filter.lease.page,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': vm.$cookies.get('JWT')
        }
      }).then(r => {
        vm.market.lease = r.data;
      })
      axios({
        method: 'GET',
        url: api + 'building/id/' + vm.$route.params.id + '/sale?page=' + vm.market.filter.sale.page,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': vm.$cookies.get('JWT')
        }
      }).then(r => {
        vm.market.sale = r.data;
      })
      axios({
        method: 'GET',
        url: api + 'building/id/' + vm.$route.params.id + '/reviews?page=' + vm.ratings.filter.page,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': vm.$cookies.get('JWT')
        }
      }).then(r => {
        vm.ratings.content = r.data;
      })
      axios({
        method: 'GET',
        url: api + 'news/b/' + vm.$route.params.id,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': vm.$cookies.get('JWT')
        }
      }).then(r => {
        vm.news = r.data;
      })
    },
    marker: function (map) {
      var vm = this;
      // eslint-disable-next-line
      var marker = new mapboxgl.Marker().setLngLat([vm.e.lon, vm.e.lat]).addTo(map);
    },
    parseDate: function (date) {
      var formatted = new Date(date);
      return formatted.toLocaleString();
    },
    generateImageModal: function (image) {
      var vm = this;
      vm.images.modalImage = image;
      vm.images.modalDisplay = true;
    },
    storeUserSelectedRatings: function (item, param) {
      var vm = this;
      vm.userRatingData[param] = item;
      vm.aggregateAlgorithm();
    },
    aggregateAlgorithm: function () {
      var vm = this;
      var length = Object.keys(vm.userRatingData).length - 1;
      var total = 0;
      for (var key in vm.userRatingData) {
        if (key !== 'comment') {
          total += parseInt(vm.userRatingData[key]);
        }
      }
      vm.userRatingData.aggregate = Math.round(total / length);
    },
    postUserRating: function () {
      var vm = this;
      var base_url = 'building/id/' + vm.$route.params.id + '/reviews/new';
      axios({
        method: 'POST',
        url: api + base_url,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': vm.$cookies.get('JWT')
        },
        data: vm.userRatingData
      }).then(r => {
        vm.fetchRatings();
        vm.ratings.showTextArea = false;
      })
    },
    fetchForLease: function () {
      var vm = this;
      var base_url = 'building/id/' + vm.$route.params.id + '/lease';
      var url_additions = '?';
      for (var key in vm.market.filter.lease) {
        if (vm.market.filter.lease.hasOwnProperty(key) && vm.market.filter.lease[key] !== 'Any') {
          url_additions += key + '=' + vm.market.filter.lease[key].toString().replace('+', '') + '&';
        }
      }
      axios({
        method: 'GET',
        url: api + base_url + url_additions,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': vm.$cookies.get('JWT')
        }
      }).then(r => {
        vm.market.lease = r.data;
      })
    },
    fetchRatings: function () {
      var vm = this;
      var base_url = 'building/id/' + vm.$route.params.id + '/reviews';
      var url_additions = '?';
      for (var key in vm.ratings.filter) {
        if (vm.ratings.filter.hasOwnProperty(key) && vm.ratings.filter[key] !== 'Any') {
          url_additions += key + '=' + vm.ratings.filter[key].toString().replace('+', '') + '&';
        }
      }
      axios({
        method: 'GET',
        url: api + base_url + url_additions,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': vm.$cookies.get('JWT')
        }
      }).then(r => {
        vm.ratings.content = r.data;
      })
    },
    fetchForSale: function () {
      var vm = this;
      var base_url = 'building/id/' + vm.$route.params.id + '/sale';
      var url_additions = '?';
      for (var key in vm.market.filter.sale) {
        if (vm.market.filter.sale.hasOwnProperty(key) && vm.market.filter.sale[key] !== 'Any') {
          url_additions += key + '=' + vm.market.filter.sale[key].toString().replace('+', '') + '&';
        }
      }
      axios({
        method: 'GET',
        url: api + base_url + url_additions,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': vm.$cookies.get('JWT')
        }
      }).then(r => {
        vm.market.sale = r.data;
      })
    },
    filterForLease: function (item, param) {
      var vm = this;
      var base_url = 'building/id/' + vm.$route.params.id + '/lease';
      var url_additions = '?';
      vm.market.filter.lease[param] = item;
      for (var key in vm.market.filter.lease) {
        if (vm.market.filter.lease.hasOwnProperty(key) && vm.market.filter.lease[key] !== 'Any') {
          url_additions += key + '=' + vm.market.filter.lease[key].toString().replace('+', '') + '&';
        }
      }
      axios({
        method: 'GET',
        url: api + base_url + url_additions,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': vm.$cookies.get('JWT')
        }
      }).then(r => {
        vm.market.lease = r.data;
      })
    },
    filterForSale: function (item, param) {
      var vm = this;
      var base_url = 'building/id/' + vm.$route.params.id + '/sale';
      var url_additions = '?';
      vm.market.filter.sale[param] = item;
      for (var key in vm.market.filter.sale) {
        if (vm.market.filter.sale.hasOwnProperty(key) && key !== 'for' && vm.market.filter.sale[key] !== 'Any') {
          url_additions += key + '=' + vm.market.filter.sale[key].toString().replace('+', '') + '&';
        }
      }
      axios({
        method: 'GET',
        url: api + base_url + url_additions,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': vm.$cookies.get('JWT')
        }
      }).then(r => {
        vm.market.sale = r.data;
      })
    },
    filterRatings: function (item, param) {
      var vm = this;
      var base_url = 'building/id/' + vm.$route.params.id + '/reviews';
      var url_additions = '?';
      vm.ratings.filter[param] = item;
      for (var key in vm.ratings.filter) {
        if (vm.ratings.filter.hasOwnProperty(key) && vm.ratings.filter[key] !== 'Any') {
          url_additions += key + '=' + vm.ratings.filter[key].toString().replace('+', '') + '&';
        }
      }
      axios({
        method: 'GET',
        url: api + base_url + url_additions,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': vm.$cookies.get('JWT')
        }
      }).then(r => {
        vm.ratings.content = r.data;
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
  @import '../../src/assets/css/style';
  .entity {
    .data-container {
      .margin-left-large {
        margin: 0 0 0 3em;
      }
      .brand-container {
        margin: 0 0 6em 0;
        div {
          display: inline-block;
        }
        .ml {
          display: inline-block;
          padding: .5em 1em;
          color: @white;
          font-size: 18px;
          .gradient_red();
          .brand();
        }
        .user {
          text-transform: none;
          margin: 0 0 0 1em;
          .user-page-link {
            color: @black;
            font-weight: bold;
          }
        }
      }
      .name {
        h2 {
          font-weight: bolder;
          margin-bottom: 0;
        }
      }
      .suburb {
        margin: 0 0 1em 0;
        font-weight: bold;
      }
      .residing {
        margin: 0 0 3em 0;
        .link-user {
          .purple_gradient();
          font-weight: bold;
          text-transform: uppercase;
          padding: 1em 2em;
          color: white;
          letter-spacing: 1px;
          font-size: 10px;
          border: 0;
          width: 100%;
          border-radius: 100px;
          cursor: pointer;
        }
      }
      .rating-card {
        .title {
          text-transform: uppercase;
          color: @light_grey;
          font-weight: bold;
          font-size: 10px;
          letter-spacing: 1px;
        }
        .rating {
          font-weight: 600;
          color: @purple;
        }
        .rating-bar {
          height: 2px;
          width: 100%;
          margin: 0 0 2em 0;
        }
      }
      .overflow-nav {
        .nav {
          -webkit-box-shadow: inset 0px -1px 0px 0px @light_grey;
          -moz-box-shadow: inset 0px -1px 0px 0px @light_grey;
          box-shadow: inset 0px -1px 0px 0px @light_grey;
          .nav-link {
            color: @light_grey;
            cursor: pointer;
          }
          .nav-link.active, .nav-link:hover {
            -webkit-box-shadow: inset 0px -2px 0px 0px @purple;
            -moz-box-shadow: inset 0px -2px 0px 0px @purple;
            box-shadow: inset 0px -2px 0px 0px @purple;
            color: @purple;
          }
        }
      }
      .content {
        margin-top: 2em;
        .prop.map-prop {
          width: 100%;
          height: 100%;
          .map {
            width: 100%;
            height: 100%;
          }
        }
        .prop:not(:last-child) {
          margin: 0 0 1em 0;
        }
        .prop {
          .title {
            text-transform: uppercase;
            color: @light_grey;
            font-weight: bold;
            font-size: 10px;
            letter-spacing: 1px;
          }
        }
      }
    }
    .images {
      .image-grid-container {
        display: grid;
        grid-gap: 1em;
        grid-template-columns: 33% 33% 33%;
      }
    }
    .leasing, .selling, .ratings {
      .filter, .results {
        margin-bottom: 2em;
        .title {
          .small_text();
          margin: 0 0 1em 0;
          .right, .left {
            display: inline-block;
          }
          .right {
            float: right;
            .previous-page, .next-page {
              cursor: pointer;
            }
          }
        }
        .pagination {
          .small_text();
          .right {
            text-align: right;
            width: 100%;
            .previous-page, .next-page {
              cursor: pointer;
            }
          }
        }
      }
      .filter {
        .filter-item {
          display: inline-block;
          margin-right: 1em;
          .pre-text {
            .small_text();
          }
        }
      }
    }
    .ratings {
      .filter {
        margin: 2em 0 1em 0;
      }
      .user-review-form {
        padding: 0 0 4em 0;
        .meta {
          margin-bottom: 1em;
          .image {
            display: inline-block;
            margin-right: 1em;
            width: 42px;
            height: 42px;
            vertical-align: top;
            img {
              width: 42px;
              height: 42px;
              border-radius: 100%;
              vertical-align: top;
            }
          }
          .text {
            display: inline-block;
            .title {
              font-weight: bold;
              font-size: 16px;
            }
            .user {
              color: @light_grey;
              font-size: 12px;
            }
          }
        }
        .rating {
          .prop {
            display: inline-block;
            margin-right: 1em;
          }
        }
        .user-input {
          display: block;
          width: 100%;
          margin-top: 1em;
          border: 1px solid @light_grey;
          padding: 1em;
          height: 25vh;
          transition: box-shadow .5s, border .5s;
        }
        .user-input:focus {
          .box_shadow_disp();
          border-color: transparent;
          outline: none;
        }
        .submit-button {
          .purple_gradient();
          font-weight: bold;
          text-transform: uppercase;
          padding: 1em 2em;
          color: white;
          letter-spacing: 1px;
          font-size: 10px;
          border: 0;
          width: fit-content;
          border-radius: 100px;
          margin: 1em 0 0 0;
        }
        .enabled-submit-button {
          cursor: pointer;
        }
        .disabled-submnit-button {
          cursor: default;
        }
      }
    }
  }
</style>
