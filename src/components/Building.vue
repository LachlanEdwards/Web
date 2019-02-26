<template>
  <main id="component" class="entity">
    <template_head v-if="building" v-bind:title="building.name" v-bind:subtitle="building.address.suburb" :source="staticImage" v-bind:rating=building.scorecard.cumulative></template_head>
    <div class="standard-fit container-fluid d-flex justify-content-end flex-column">
      <section class="section" id="live">
        <div class="heading">
          <h6 v-if="building">Residing in {{ building.name }}?</h6>
        </div>
        <div class="options">
          <div class="row">
            <div class="col-md-6">
              <div class="prop button">
                <a class="a-button red" href="#">Join</a>
              </div>
            </div>
            <div class="col-md-6">
              <div class="prop button">
                <a class="a-button grey" href="#">Peek</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section" id="profile">
        <div class="heading">
          <h6>Profile</h6>
        </div>
        <div v-if="building" class="profile">
          <div class="row">
            <div class="col-md-6">
              <div class="prop">
                <div class="title">Description:</div>
                <div class="value">
                  {{ building.description }}
                </div>
              </div>
              <div class="prop">
                <div class="title">Address:</div>
                <address class="value">
                  {{ building.address.number }} {{ building.address.streetName }} {{building.address.suffix}}<br>
                  {{ building.address.suburb }}, {{ building.address.postCode }}<br>
                  {{ building.address.state }}
                </address>
              </div>
              <div class="prop">
                <div class="title">Phone:</div>
                <div class="value">{{ building.phone }}</div>
              </div>
              <div class="prop">
                <div class="title">E-Mail:</div>
                <div class="value">{{ building.mail }}</div>
              </div>
              <div class="prop">
                <div class="title">Badges:</div>
                <div class="value">{{ building.buildingClass }}, {{ building.buildingCost }}, {{ building.buildingDensity }}</div>
              </div>
              <div class="prop">
                <div class="title">Environment Rating:</div>
                <div class="value">{{ building.er }}</div>
              </div>
              <div class="prop">
                <div class="title">Features:</div>
                <div class="value">Pool, Gym, Recreation Room, Recreation Deck, BBQ, Intercom, Secure Parking, Ducted Air Conditioning, Alarm System, Pet Friendly, High-Speed Broadband Connection, Pay TV Access, Visitor Parking, Smoking Permitted</div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="prop map-prop">
                <mapbox v-if="building" @map-load="marker" class="map" access-token="pk.eyJ1IjoibWV0bGVhc2UiLCJhIjoiY2pyYzA5ZW1sMThhdjN5cG45N24wZzk3aCJ9.sgPujNuDMhFzEElX-P83aQ" :map-options="{style: 'mapbox://styles/mapbox/streets-v11', center: [building.lon, building.lat], zoom: 15}"></mapbox>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section" id="gallery">
        <div class="heading">
          <h6>Gallery</h6>
        </div>
        <div class="carousel-container">
          <div class="images">
            <div class="image-previous image-container">
              <div v-if="gallery.index > 0" class="image" v-bind:style="{ backgroundImage: 'url(' + gallery.images[gallery.index - 1] + ')' } " v-on:click="rotateImage(0)"></div>
              <div v-else class="image gradient_red disabled"></div>
            </div>
            <div class="image-current image-container">
              <div class="image" v-bind:style="{ backgroundImage: 'url(' + gallery.images[gallery.index] + ')' }"></div>
            </div>
            <div class="image-next image-container">
              <div v-if="gallery.index < gallery.images.length - 1" class="image" v-bind:style="{ backgroundImage: 'url(' + gallery.images[gallery.index + 1] + ')' }" v-on:click="rotateImage(1)"></div>
              <div v-else class="image gradient_red disabled"></div>
            </div>
          </div>
          <div class="marker">
            <p>{{ gallery.index + 1 }} / {{ gallery.images.length }}</p>
          </div>
        </div>
      </section>
      <section v-if="building" class="section" id="scorecard">
        <div class="heading">
          <h6>Scorecard</h6>
        </div>
        <div class="row">
          <div class="col-lg-3 col-sm-6">
            <div class="prop scorecard cumulative">
              <div class="title">Cumulative</div>
              <div class="value">{{ building.scorecard.cumulative }}</div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="prop scorecard">
              <div class="title">Management</div>
              <div class="value">{{ building.scorecard.management }}</div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="prop scorecard">
              <div class="title">Functionality</div>
              <div class="value">{{ building.scorecard.functionality }}</div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="prop scorecard">
              <div class="title">Facilities</div>
              <div class="value">{{ building.scorecard.facilities }}</div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="prop scorecard">
              <div class="title">Neighbourhood</div>
              <div class="value">{{ building.scorecard.neighbourhood }}</div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="prop scorecard">
              <div class="title">Culture</div>
              <div class="value">{{ building.scorecard.culture }}</div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="prop scorecard">
              <div class="title">Fittings/Build</div>
              <div class="value">{{ building.scorecard.fittings }}</div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="prop scorecard">
              <div class="title">Noise</div>
              <div class="value">{{ building.scorecard.noise }}</div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="prop scorecard">
              <div class="title">Lifestyle <i class="fas fa-map-marked-alt"></i></div>
              <div class="value">{{ building.scorecard.lifestyle }}</div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="prop scorecard">
              <div class="title">Crime <i class="fas fa-map-marked-alt"></i></div>
              <div class="value">{{ building.scorecard.crime }}</div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="prop scorecard">
              <div class="title">Commute <i class="fas fa-map-marked-alt"></i></div>
              <div class="value">{{ building.scorecard.commute }}</div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="prop scorecard">
              <div class="title">Schools <i class="fas fa-map-marked-alt"></i></div>
              <div class="value">{{ building.scorecard.schools }}</div>
            </div>
          </div>
        </div>
      </section>
      <section class="section" id="rent">
        <div class="heading">
          <div class="select">
            For <options :items="['lease', 'sale']" id="filter-listing" param="for" class="custom-dropdown" v-on:option-select="updateApartments"></options>
          </div>
        </div>
        <div class="filter">
          <div class="filter-item">
            <div class="pre-text"><i class="fas fa-bed"></i> Bedrooms: </div>
            <options :items="['ANY', '1', '2', '3', '4', '5+']" param="bedroom" id="filter-bedrooms" class="custom-dropdown" v-on:option-select="updateApartments"></options>
          </div>
          <div class="filter-item">
            <div class="pre-text"><i class="fas fa-bath"></i> Bathrooms: </div>
            <options :items="['ANY', '1', '2', '3', '4', '5+']" param="bathroom" id="filter-bathrooms" class="custom-dropdown" v-on:option-select="updateApartments"></options>
          </div>
          <div class="filter-item">
            <div class="pre-text"><i class="fas fa-car"></i> Parking: </div>
            <options :items="['ANY', '1', '2', '3', '4', '5+']" param="parking" id="filter-parking" class="custom-dropdown" v-on:option-select="updateApartments"></options>
          </div>
          <div class="filter-item">
            <div class="pre-text"><i class="fas fa-dollar-sign"></i> Max Price: </div>
            <options :items="['ANY', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000+']" param="price" id="filter-price" class="custom-dropdown" v-on:option-select="updateApartments"></options>
          </div>
        </div>
        <div class="apartments">
          <div class="row" v-if="apartments.length > 0">
            <div class="col-md-6" v-for="ap in apartments" v-bind:key="ap.id">
              <div class="prop">
                <apartment_card :bed="ap.apartment.bedroom" :bath="ap.apartment.bathroom" :car="ap.apartment.garage" :cost="ap.cost" :frequency="ap.per" :title="ap.apartment.number" :source="'https://open.mapquestapi.com/staticmap/v4/getmap?key=oVKF5UwJv3UCuEII3CC2j3LiD0XTwdFF&size=1024%2C216&zoom=15&center=' + ap.apartment.building.lat + '%2C' + ap.apartment.building.lon" :rating=ap.apartment.building.scorecard.cumulative></apartment_card>
              </div>
            </div>
          </div>
          <div class="no-results" v-else>
            No Results
          </div>
        </div>
      </section>
      <section class="section" id="affiliates">
        <div class="heading">
          <h6>Affiliates</h6>
        </div>
        <div class="affiliates">
          <div class="prop">
            <div class="value">
              <blue_card subtitle="South Brisbane" title="Song Properties" source="https://open.mapquestapi.com/staticmap/v4/getmap?key=oVKF5UwJv3UCuEII3CC2j3LiD0XTwdFF&size=1024%2C216&zoom=15&center=-27.38006149%2C153.0387005" alternative_text="test" :rating=4 entity="Agency"></blue_card>
            </div>
          </div>
        </div>
      </section>
      <section class="section" id="posts">
        <div class="heading">
          <h6>Posts</h6>
        </div>
        <div class="posts">
          <div class="post prop">
            <div class="date">
              <div class="month">March</div>
              <div class="day">3</div>
            </div>
            <div class="content">
              <h4 class="title">Multiple new apartments settled.</h4>
              <p class="desc">Casino Tower out-performed market expectations and set a new record for the Brisbane property market for highest rate of successful settlemenets for a high-density apartment building.</p>
              <div class="meta">Song Properties &middot; No Attachments</div>
            </div>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="heading">
          <h6>News</h6>
        </div>
        <div class="articles" v-if="news">
          <div v-for="(article, index) in news.articles" class="article prop" v-bind:key="article.id">
            <div class="id">{{ index+1 }}</div>
            <div class="content">
              <h4 class="title">{{ article.title }}</h4>
              <p class="desc">{{ article.desc }}</p>
              <div class="meta">{{ article.source }} &middot; {{ article.date }}</div>
            </div>
          </div>
        </div>
      </section>
      <section class="section" id="reviews">
        <div class="heading">
          <h6>Reviews</h6>
        </div>
        <div class="user-reviews">
          <user_review v-for="review in reviews" v-bind:key="review.id" :image="staticImage" :user="review.user.first + ' ' + review.user.last" :date="parseDate(review.date)" :cumulative="review.cumulative" :management="review.management" :functionality="review.functionality" :fittings="review.fittings" :facilities="review.facilities" :culture="review.culture" :neighbourhood="review.neighbourhood" :noise="review.noise" :text="review.comment"></user_review>
        </div>
        <div class="submit-review">
          <div class="image">
            <img alt="" :src="staticImage">
          </div>
          <form class="user-review-form" v-on:submit.prevent="postUserReview">
            <div class="title">Leave a Comment</div>
            <div class="user" v-if="this.$user">Posting as {{ this.$user.username }}</div>
            <div class="score">
              <div class="prop cumulative">
                <div class="title">Cumulative</div>
                <div class="value">{{ calculateCumulativeScoreForReview() }}</div>
              </div>
              <div class="prop">
                <div class="title">Management</div>
                <div class="value">
                  <options :items="['5', '4', '3', '2', '1']" param="management" id="score-management" class="custom-dropdown" v-on:option-select="storeUserSelectedRatings"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Functionality</div>
                <div class="value">
                  <options :items="['5', '4', '3', '2', '1']" param="functionality" id="score-functionality" class="custom-dropdown" v-on:option-select="storeUserSelectedRatings"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Facilities</div>
                <div class="value">
                  <options :items="['5', '4', '3', '2', '1']" param="facilities" id="score-facilities" class="custom-dropdown" v-on:option-select="storeUserSelectedRatings"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Neighbourhood</div>
                <div class="value">
                <options :items="['5', '4', '3', '2', '1']" param="neighbourhood" id="score-neighbourhood" class="custom-dropdown" v-on:option-select="storeUserSelectedRatings"></options>
              </div>
              </div>
              <div class="prop">
                <div class="title">Culture</div>
                <div class="value">
                  <options :items="['5', '4', '3', '2', '1']" param="culture" id="score-culture" class="custom-dropdown" v-on:option-select="storeUserSelectedRatings"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Fittings</div>
                <div class="value">
                  <options :items="['5', '4', '3', '2', '1']" param="fittings" id="score-fittings" class="custom-dropdown" v-on:option-select="storeUserSelectedRatings"></options>
                </div>
              </div>
              <div class="prop">
                <div class="title">Noise</div>
                <div class="value">
                  <options :items="['5', '4', '3', '2', '1']" param="noise" id="score-noise" class="custom-dropdown" v-on:option-select="storeUserSelectedRatings"></options>
                </div>
              </div>
            </div>
            <textarea v-model="review.comment"></textarea>
            <button type="submit" class="submit-button">Submit</button>
          </form>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
/* eslint-disable semi */
/* eslint-disable camelcase */
import template_head from './template.head.vue';
import user_review from './user.rating';
import Blue_card from './blue.card';
import Apartment_card from './apartment.card';
import Options from './options';
import Mapbox from 'mapbox-gl-vue';
import mapboxgl from 'mapbox-gl';
const axios = require('axios');
const api = 'http://localhost:8081/';

export default {
  name: 'entity',
  components: {user_review, Blue_card, template_head, Mapbox, Apartment_card, Options},
  data () {
    return {
      entity: 'Building',
      building: false,
      news: false,
      apartments: false,
      reviews: false,
      filter: {
        'for': 'lease',
        'bedroom': 'ANY',
        'bathroom': 'ANY',
        'parking': 'ANY',
        'price': 'ANY'
      },
      review: {
        management: 5,
        functionality: 5,
        facilities: 5,
        neighbourhood: 5,
        culture: 5,
        fittings: 5,
        noise: 5,
        comment: ''
      },
      gallery: {
        images: ['../static/test_images/1.jpg', '../static/test_images/2.jpg', '../static/test_images/3.jpg', '../static/test_images/4.jpg'],
        index: 0
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
        vm.building = r.data;
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
      axios({
        method: 'GET',
        url: api + 'building/id/' + vm.$route.params.id + '/lease',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': vm.$cookies.get('JWT')
        }
      }).then(r => {
        vm.apartments = r.data;
      })
      axios({
        method: 'GET',
        url: api + 'building/id/' + vm.$route.params.id + '/reviews',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': vm.$cookies.get('JWT')
        }
      }).then(r => {
        vm.reviews = r.data;
      })
    },
    rotateImage: function (direction) {
      var vm = this;
      const left = 0;
      const right = 1;
      if (direction === left && vm.gallery.index > 0) {
        vm.gallery.index--
      } else if (direction === right && vm.gallery.index < vm.gallery.images.length - 1) {
        vm.gallery.index++
      }
    },
    parseDate: function (date) {
      var formatted = new Date(date);
      return formatted.toLocaleString();
    },
    marker: function (map) {
      var vm = this;
      // eslint-disable-next-line
      var marker = new mapboxgl.Marker().setLngLat([vm.building.lon, vm.building.lat]).addTo(map);
    },
    storeUserSelectedRatings: function (item, param) {
      var vm = this;
      vm.review[param] = item;
      vm.calculateCumulativeScoreForReview();
    },
    calculateCumulativeScoreForReview: function () {
      var vm = this;
      var length = Object.keys(vm.review).length - 1;
      var total = 0;
      for (var key in vm.review) {
        if (key !== 'comment') {
          total += parseInt(vm.review[key]);
        }
      }
      return Math.round(total / length);
    },
    postUserReview: function () {
      var vm = this;
      var base_url = 'building/id/' + vm.$route.params.id + '/reviews/new';
      var formattedPayload = vm.review;
      console.log(this.$user)
      formattedPayload['user'] = this.$user.id;
      axios({
        method: 'POST',
        url: api + base_url,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': vm.$cookies.get('JWT')
        },
        data: formattedPayload
      }).then(r => {
        vm.getReviews();
        console.log(r);
      })
    },
    getReviews: function () {
      var vm = this;
      axios({
        method: 'GET',
        url: api + 'building/id/' + vm.$route.params.id + '/reviews',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': vm.$cookies.get('JWT')
        }
      }).then(r => {
        vm.reviews = r.data;
      })
    },
    updateApartments: function (item, param) {
      var vm = this;
      var base_url = 'building/id/' + vm.$route.params.id + '/';
      var url_additions = '?';
      vm.filter[param] = item;
      for (var key in vm.filter) {
        if (vm.filter.hasOwnProperty(key) && key !== 'for' && vm.filter[key] !== 'ANY') {
          url_additions += key + '=' + vm.filter[key].replace('+', '') + '&';
          console.log(url_additions);
        }
      }
      axios({
        method: 'GET',
        url: api + base_url + vm.filter['for'] + url_additions,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': vm.$cookies.get('JWT')
        }
      }).then(r => {
        vm.apartments = r.data;
      })
    }
  },
  computed: {
    staticImage: function () {
      var vm = this;
      return 'https://api.mapbox.com/v4/mapbox.light/' + vm.building.lon + ',' + vm.building.lat + ',15/500x500@2x.png?access_token=pk.eyJ1IjoibWV0bGVhc2UiLCJhIjoiY2pyYzA5ZW1sMThhdjN5cG45N24wZzk3aCJ9.sgPujNuDMhFzEElX-P83aQ'
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
    margin-bottom: 108px;
    .section:not(:first-child) {
      margin-top: 2em;
    }
    #reviews {
      .submit-review {
        margin-top: 1em;
        display: flex;
        flex-direction: row;
        .image {
          display: flex;
          flex-direction: column;
          margin-right: 1em;
          width: 42px;
          height: 42px;
          img {
            width: 42px;
            height: 42px;
            border-radius: 100%;
            vertical-align: top;
          }
        }
        .user-review-form {
          display: flex;
          flex: 1;
          flex-direction: column;
          vertical-align: top;
          .title {
            font-weight: bold;
            font-size: 16px;
          }
          .user {
            text-transform: uppercase;
            color: @grey;
            font-size: 12px;
          }
          textarea {
            margin-top: 1em;
            border: 1px solid @grey;
            padding: 1em;
            height: 25vh;
            transition: box-shadow .5s, border .5s;
          }
          textarea:focus {
            .box_shadow_disp();
            border-color: transparent;
            outline: none;
          }
          .submit-button {
            border: 1px solid @grey;
            border-radius: 3px;
            text-align: center;
            padding: .5em 1em;
            display: inline-block;
            text-transform: uppercase;
            font-weight: bold;
            width: fit-content;
            margin-top: 1em;
            color: @grey;
            cursor: pointer;
          }
          .submit-button:hover {
            background-color: @grey;
            color: @white;
          }
          .score {
            .prop {
              border: 1px solid @grey;
              display: inline-block;
              font-size: 0;
              margin-top: 7px;
              .title {
                background-color: @grey;
                display: inline-block;
                padding: .5em 1em;
                color: @white;
                font-size: 12px;
                font-weight: normal;
              }
              .value {
                display: inline-block;
                padding: .5em 1em;
                font-size: 12px;
              }
            }
            .prop.cumulative {
              border: 1px solid @red;
              .title {
                .gradient_red();
              }
            }
          }
        }
      }
    }
    #gallery {
      .carousel-container {
        margin-top: @standard;
        .images {
          padding: calc(@standard + ((50vh * 0.2) / 2)) @standard;
          height: 50vh;
          white-space: nowrap;
          font-size: 0;
          .image-previous, .image-next {
            height: 100%;
            width: 16.5%;
            cursor: pointer;
          }
          .disabled {
            cursor: not-allowed;
          }
          .image-next {
            float: right;
          }
          .image-previous {
            float: left;
          }
          .image-current {
            height: 100%;
            width: 66%;
            z-index: 1;
            transform: scale(1.2);
            .box_shadow_disp();
            cursor: zoom-in;
          }
          .image-container {
            display: inline-block;
            .image {
              background-size: cover;
              background-position: center center;
              width: 100%;
              height: 100%;
              transition: background-image .3s;
            }
          }
        }
        .marker {
          margin-top: 1em;
          display: flex;
          justify-content: center;
          p {
            background: @grey;
            color: white;
            padding: .5em 1em;
            border-radius: 100px;
            font-weight: bold;
          }
        }
      }
    }
    #scorecard {
      .prop.scorecard {
        border-radius: 3px;
        border-color: @grey;
        border-width: 1px;
        border-style: solid;
        .title {
          background-color: @grey;
          color: @white;
          padding: 1em;
          text-align: center;
        }
        .value {
          padding: 1em;
          text-align: center;
        }
      }
      .prop.scorecard.cumulative {
        border-color: rgba(239, 98, 108, 1);
        .title {
          .gradient_red();
        }
      }
    }
    #rent {
      .apartments {
        .no-results {
          margin-top: 1em;
          font-weight: bold;
          text-transform: uppercase;
          color: @red;
          text-align: center;
        }
      }
    }
    .section {
      .heading {
        border-bottom: 1px solid @grey;
        text-transform: uppercase;
        h6, .select {
          font-weight: bold;
          color: @grey;
          font-size: 14px;
        }
      }
      .filter {
        margin-top: @standard;
        font-weight: bold;
        color: @grey;
        font-size: 14px;
        text-transform: uppercase;
        border: 1px solid @grey;
        padding: 1em;
        border-radius: 3px;
        .filter-item {
          display: inline-block;
          .pre-text {
            display: inherit;
          }
          .custom-select {
            display: inherit;
          }
        }
        .filter-item:not(:first-child) {
          .pre-text:before {
            content: "\00B7";
            padding-right: 1em;
            padding-left: 1em;
          }
        }
      }
      .prop {
        margin-top: 1em;
        .title {
          font-weight: bold;
        }
        .avg {
          text-align: center;
          text-transform: uppercase;
          font-weight: bold;
          .gradient_blue();
          color: white;
          border-radius: 3px;
          padding-top: .5em;
          padding-bottom: .5em;
        }
        .stat {
          font-size: 0;
          display: flex;
          .figure {
            display: inline;
            background: @grey;
            font-weight: bold;
            color: @white;
            padding: .5em;
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
            border: 1px solid @grey;
            font-size: 14px;
          }
          .data {
            display: inline;
            border-top: 1px solid @grey;
            border-right: 1px solid @grey;
            border-bottom: 1px solid @grey;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
            padding: .5em;
            font-size: 14px;
            flex-grow: 1;
            .value {
              display: inline;
            }
            .link {
              display: inline;
              float: right;
              a {
                color: @grey;
              }
              a:hover {
                text-decoration: none;
                color: @blue;
              }
            }
          }
        }
        .avg.low {}
        .avg.mid {}
        .avg.hi {}
      }
      .prop.button {
        .a-button {
          border-style: solid;
          border-width: 1px;
          border-radius: 3px;
          text-align: center;
          width: 100%;
          padding: 1em 2em;
          display: block;
          text-transform: uppercase;
          font-weight: bold;
        }
        .a-button:hover {
          text-decoration: none;
        }
        .a-button.grey {
          border-color: @grey;
          color: @grey;
        }
        .a-button.grey:hover {
          color: @white;
          background-color: @grey;
        }
        .a-button.red {
          border-color: @red;
          color: @red;
        }
        .a-button.red:hover {
          color: @white;
          .gradient_red();
        }
      }
      .prop.map-prop {
        width: 100%;
        height: 100%;
        .map {
          width: 100%;
          height: 100%;
        }
      }
      .prop.article, .prop.post {
        display: flex;
        margin-top: 1em;
        margin-bottom: 1em;
        .id, .date {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          font-weight: bold;
          color: @white;
          background-color: @grey;
          min-height: 108px;
          max-height: 108px;
          min-width: 108px;
          max-width: 108px;
        }
        .date {
          flex-direction: column;
          line-height: 1.2;
          .month {
            text-transform: uppercase;
            font-size: 16px;
          }
        }
        .content {
          margin-left: 1em;
          .title {
            margin: 0;
            font-size: 16px;
            font-weight: bold;
          }
          .desc {
            margin: 0;
          }
          .meta {
            color: @grey;
            text-transform: uppercase;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
