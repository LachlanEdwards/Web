<template>
  <main id="component" class="entity" v-if="e && news && ratings.content && blog.posts && market.lease && market.sale">
    <image-modal v-if="images.modalDisplay" :source="images.modalImage" @exit="images.modalDisplay = false"></image-modal>
    <review-modal v-if="reviewModal" :building="e.name" :id="e.id" :suburb="e.address.suburb" v-on:closeReviewModal="closeReviewModal"></review-modal>
    <gl-nav></gl-nav>
    <div class="container-fluid" id="#top">
      <div class="row">
        <div class="col-md-2">
          <profile :entity="e"></profile>
        </div>
        <div class="col-md-10 r">
          <div class="margin-left-large">
            <div class="overflow-nav">
              <nav class="nav">
                <a class="nav-link" :class="{active: page === 'profile'}" v-on:click="page = 'profile'">Profile</a>
                <a class="nav-link" :class="{active: page === 'images'}" v-on:click="page = 'images'">Images</a>
                <a class="nav-link" :class="{active: page === 'leasing'}" v-on:click="page = 'leasing'">Leasing</a>
                <a class="nav-link" :class="{active: page === 'for_sale'}" v-on:click="page = 'for_sale'">Selling</a>
                <a class="nav-link" :class="{active: page === 'blog'}" v-on:click="page = 'blog'">Blog</a>
                <a class="nav-link" :class="{active: page === 'feed'}" v-on:click="page = 'feed'">Trending</a>
                <a class="nav-link" :class="{active: page === 'ratings'}" v-on:click="page = 'ratings'">Ratings</a>
                <a class="nav-link" :class="{active: page === 'residents'}" v-on:click="page = 'residents'">Residents</a>
              </nav>
            </div>
            <div class="content" v-if="page === 'profile'" id="#profile">
              <profile-page :entity="e"></profile-page>
            </div>
            <div class="content images" v-if="page === 'images'" id="#images">
              <div class="image-grid-container">
                <div v-for="image in images.lib" class="image-grid-item" v-bind:key="image">
                  <img :src="image" :alt="image" width="100%" height="100%" v-on:click="generateImageModal(image)">
                </div>
              </div>
            </div>
            <div class="content leasing" v-if="page === 'leasing'" id="#leasing">
              <apartment-results :list="market.lease" :filter="market.filter.lease" v-on:fetch="getForLease" v-on:filter="filterForLease(arguments); debug(arguments)"></apartment-results>
            </div>
            <div class="content selling" v-if="page === 'for_sale'" id="#for_sale">
              <div class="filter">
                <div class="filter-item">
                  <div class="pre-text"><i class="icon-bed-outline"></i></div>
                  <options :items="['Any', '1', '2', '3', '4', '5+']" param="bedroom" id="filter-sale-bedrooms" class="custom-dropdown" v-on:option-select="filterForSale"></options>
                </div>
                <div class="filter-item">
                  <div class="pre-text"><i class="icon-bath-outline"></i></div>
                  <options :items="['Any', '1', '2', '3', '4', '5+']" param="bathroom" id="filter-sale-bathrooms" class="custom-dropdown" v-on:option-select="filterForSale"></options>
                </div>
                <div class="filter-item">
                  <div class="pre-text"><i class="icon-bath-outline"></i></div>
                  <options :items="['Any', '1', '2', '3', '4', '5+']" param="parking" id="filter-sale-parking" class="custom-dropdown" v-on:option-select="filterForSale"></options>
                </div>
                <div class="filter-item">
                  <div class="pre-text"><i class="icon-bath-outline"></i></div>
                  <options :items="['Any', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000+']" param="price" id="filter-sale-price" class="custom-dropdown" v-on:option-select="filterForSale"></options>
                </div>
              </div>
              <div class="results">
                <div class="row">
                  <div class="prop col-md-4" v-for="el in market.sale.content" v-bind:key="el.id">
                    <apartment-card :bed="el.apartment.bedroom" :bath="el.apartment.bathroom" :car="el.apartment.garage" :cost="el.cost" :title="el.apartment.number" source="../static/test_images/1.jpg" :rating=el.apartment.building.mean></apartment-card>
                  </div>
                </div>
                <div class="ptn">
                  <div class="center">
                    <div class="previous-page ptn-nav-btn" v-if="market.filter.sale.page > 0" onclick="window.scrollTo(0, 0);" v-on:click="market.filter.sale.page--; getForSale();"><i class="icon ion-ios-arrow-back"></i></div>
                    <div class="disabled previous-page ptn-nav-btn" v-else><i class="icon ion-ios-arrow-back"></i></div>
                    <div class="current-page">{{ market.filter.sale.page + 1 }} ... {{ market.sale.totalPages}}</div>
                    <div class="next-page ptn-nav-btn" v-if="(market.sale.totalPages - 1) > market.filter.sale.page" onclick="window.scrollTo(0, 0);" v-on:click="market.filter.sale.page++; getForSale();"><i class="icon ion-ios-arrow-forward"></i></div>
                    <div class="disabled next-page ptn-nav-btn" v-else><i class="icon ion-ios-arrow-forward"></i></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content blog" v-if="page === 'blog'" id="#blog">
              <div class="posts">
                <div class="prop" v-for="el in blog.posts.content" v-bind:key="el.id">
                  <blog-post :title="el.title" :datetime="el.date" :body="el.body"></blog-post>
                </div>
                <div class="ptn">
                  <div class="center">
                    <div class="previous-page ptn-nav-btn" v-if="blog.page > 0" onclick="window.scrollTo(0, 0);" v-on:click="blog.page--; getForLease();"><i class="icon ion-ios-arrow-back"></i></div>
                    <div class="disabled previous-page ptn-nav-btn" v-else><i class="icon ion-ios-arrow-back"></i></div>
                    <div class="current-page">{{ blog.page + 1 }} ... {{ blog.posts.totalPages}}</div>
                    <div class="next-page ptn-nav-btn" v-if="(blog.posts.totalPages - 1) > blog.page" onclick="window.scrollTo(0, 0);" v-on:click="blog.page++; getForLease();"><i class="icon ion-ios-arrow-forward"></i></div>
                    <div class="disabled next-page ptn-nav-btn" v-else><i class="icon ion-ios-arrow-forward"></i></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content" v-if="page === 'feed'" id="#feed">
              <div class="articles">
                <news-article v-for="art in news.articles" v-bind:key="art.date" :title="art.title" :desc="art.desc" :date="art.date" :source="art.source" :url="art.link" :image="art.image"></news-article>
              </div>
            </div>
            <div class="content ratings" v-if="page === 'ratings'" id="#ratings">
              <div class="filter">
                <div class="filter-item">
                  <div class="pre-text"><i class="icon-star-outline"></i> Rating</div>
                  <options :items="['Any', '1', '2', '3', '4', '5']" param="score" id="filter-rating" class="custom-dropdown" v-on:option-select="filterRatings"></options>
                </div>
                <div v-if="reviewAllowed" class="filter-item action-item">
                  <div class="action" v-on:click="reviewModal = true">Write a review</div>
                </div>
              </div>
              <div class="results">
                <div class="user-ratings">
                  <user-rating v-for="rating in ratings.content.content" v-bind:key="rating.id" :image="staticImage" :user="rating.user.first + ' ' + rating.user.last" :date="parseDate(rating.date)" :score="rating.score" :text="rating.comment"></user-rating>
                </div>
                <div class="ptn">
                  <div class="center">
                    <div class="previous-page ptn-nav-btn" v-if="ratings.filter.page > 0" onclick="window.scrollTo(0, 0);" v-on:click="ratings.filter.page--; getRatings();"><i class="icon ion-ios-arrow-back"></i></div>
                    <div class="disabled previous-page ptn-nav-btn" v-else><i class="icon ion-ios-arrow-back"></i></div>
                    <div class="current-page">{{ ratings.filter.page + 1 }} ... {{ ratings.content.totalPages}}</div>
                    <div class="next-page ptn-nav-btn" v-if="(ratings.content.totalPages - 1) > ratings.filter.page" onclick="window.scrollTo(0, 0);" v-on:click="ratings.filter.page++; getRatings();"><i class="icon ion-ios-arrow-forward"></i></div>
                    <div class="disabled next-page ptn-nav-btn" v-else><i class="icon ion-ios-arrow-forward"></i></div>
                  </div>
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
  <div v-else>
    <div class="spinner">
      <img class="spin" src="../assets/image/spinner.png" width="24px" height="24px">
    </div>
  </div>
</template>

<script>
/* eslint-disable semi */
/* eslint-disable camelcase */
import profile from './Profile';

import templateHead from './template.head.vue';
import glNav from './nav.vue';
import userRating from './user.rating';
import entityCard from './entity.card';
import apartmentCard from './apartment.card';
import Options from './options';
import imageModal from './image.modal';
import reviewModal from './Composer';
import newsArticle from './news.article';
import blogPost from './blog.post';
import ProfilePage from './ProfilePage';
import ApartmentResults from './ApartmentLease';
const axios = require('axios');
const api = 'http://localhost:8081/';

export default {
  name: 'entity',
  components: {ApartmentResults, ProfilePage, profile, blogPost, reviewModal, glNav, userRating, templateHead, apartmentCard, Options, imageModal, newsArticle, entityCard},
  data () {
    return {
      local: 'http://localhost:8080/',
      e: false,
      page: 'profile',
      news: false,
      reviewModal: false,
      reviewAllowed: true,
      ratings: {
        content: false,
        showTextArea: true,
        filter: {
          'score': 'Any',
          'page': 0
        }
      },
      blog: {
        page: 0,
        posts: false
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
    debug (body) {
      console.log(body)
    },
    setter: function () {
      var vm = this;
      vm.initialiseBuilding();
      vm.initialiseLease();
      vm.initialiseSale();
      vm.initialiseReviews();
      vm.initialiseSelf();
      vm.initialiseNews();
      vm.initialiseBlog();
    },
    initialiseBuilding: function () {
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
    },
    initialiseLease: function () {
      var vm = this;
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
    },
    initialiseSale: function () {
      var vm = this;
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
    },
    initialiseReviews: function () {
      var vm = this;
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
    },
    initialiseNews: function () {
      var vm = this;
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
    initialiseSelf: function () {
      var vm = this;
      axios({
        method: 'GET',
        url: api + 'building/id/' + vm.$route.params.id + '/reviews/me',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': vm.$cookies.get('JWT')
        }
      }).then(r => {
        if (r.data) {
          vm.reviewAllowed = false;
        }
      })
    },
    initialiseBlog: function () {
      var vm = this;
      axios({
        method: 'GET',
        url: api + 'building/id/' + vm.$route.params.id + '/blog?page=' + vm.blog.page,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': vm.$cookies.get('JWT')
        }
      }).then(r => {
        vm.blog.posts = r.data;
      })
    },
    closeReviewModal: function () {
      var vm = this;
      vm.getRatings();
      vm.reviewModal = false;
      vm.reviewAllowed = false;
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
    getForLease: function () {
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
    getRatings: function () {
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
    getForSale: function () {
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
    filterForLease: function (args) {
      var vm = this;
      var base_url = 'building/id/' + vm.$route.params.id + '/lease';
      var url_additions = '?';
      vm.market.filter.lease[args.param] = args.item;
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
</style>
