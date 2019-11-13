<template>
  <div class="component">
    <div class="prop">
      <div class="title">Headline</div>
      <div class="value">
        <div class="static-text">{{ entity.description }}</div>
      </div>
    </div>
    <div class="prop">
      <div class="title">Badges</div>
      <div class="value">
        <div class="static-text">
          <i class="material-icons">business</i>
          <span class="text-capitalize">{{ entity.buildingClass.toLocaleLowerCase() }}</span>
        </div>
      </div>
      <div class="value">
        <div class="static-text">
          <i class="material-icons">money</i>
          <span class="text-capitalize">{{ entity.buildingCost.toLocaleLowerCase() }}</span>
        </div>
      </div>
      <div class="value">
        <div class="static-text">
          <i class="material-icons">people</i>
          <span class="text-capitalize">{{ entity.buildingDensity.toLocaleLowerCase() }}</span>
        </div>
      </div>
    </div>
    <div class="prop">
      <div class="title">Environment Rating</div>
      <div class="value">
        <div class="static-text">{{ entity.environmentRating }}</div>
      </div>
    </div>
    <div class="prop">
      <div class="title">Features</div>
      <div class="value">
        <div class="static-text">{{ entity.features }}</div>
      </div>
    </div>
    <div class="prop">
      <div class="title">Floors</div>
      <div class="value">
        <div class="static-text">{{ entity.floors }}</div>
      </div>
    </div>
    <div class="prop">
      <div class="title">Towers</div>
      <div class="value">
        <div class="static-text">{{ entity.towers }}</div>
      </div>
    </div>
    <div class="prop">
      <div class="title">Contact</div>
      <div class="value">
        <div class="static-text"><i class="material-icons">phone</i>{{ entity.phone }}</div>
      </div>
      <div class="value">
        <div class="static-text"><i class="material-icons">alternate_email</i>{{ entity.mail }}</div>
      </div>
      <div class="value">
        <div class="static-text"><i class="material-icons">link</i><a :href="entity.website">{{ entity.website }}</a></div>
      </div>
    </div>
    <div class="prop">
      <div class="title">Strata Levy</div>
      <div class="value">
        <div class="static-text">${{ entity.strataLevy }} per lot a quarter</div>
      </div>
    </div>
    <div class="prop">
      <div class="title">Contractor</div>
      <div class="value">
        <div class="static-text" v-if="url(entity.contractor)"><div class="href" @click="encode(url(entity.contractor)[2])">{{ url(entity.contractor)[1] }}</div></div>
        <div class="static-text" v-else>{{ entity.contractor }}</div>
      </div>
    </div>
    <div class="prop" v-if="entity.masterPlan">
      <div class="title">Master-Plan</div>
      <div class="value">
        <div class="static-text">{{ entity.masterPlan }}</div>
      </div>
    </div>
    <div class="prop">
      <div class="title">Developer</div>
      <div class="value">
        <div class="static-text" v-if="url(entity.developer)"><div class="href" @click="encode(url(entity.developer)[2])">{{ url(entity.developer)[1] }}</div></div>
        <div class="static-text" v-else>{{ entity.developer }}</div>
      </div>
    </div>
    <div class="prop">
      <div class="title">Manager</div>
      <div class="value">
        <div class="static-text" v-if="url(entity.management)"><div class="href" @click="encode(url(entity.management)[2])">{{ url(entity.management)[1] }}</div></div>
        <div class="static-text" v-else>{{ entity.management }}</div>
      </div>
    </div>
    <div class="prop" v-if="entity.pda">
      <div class="title">Plan</div>
      <div class="value">
        <div class="static-text">
          <a :href="entity.pda">Planning and Development Decision</a>
        </div>
      </div>
    </div>
    <div class="prop">
      <div class="title">Build Date</div>
      <div class="value">
        <div class="static-text">{{ entity.buildDate }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl-vue'
import mapboxgl from 'mapbox-gl'
export default {
  name: 'ProfilePage',
  components: {Mapbox, mapboxgl},
  props: {
    entity: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      expression: {
        url: /(.*?)\[(.*?)\]/gm
      }
    }
  },
  methods: {
    marker: function (map) {
      var vm = this
      // eslint-disable-next-line
      var marker = new mapboxgl.Marker().setLngLat([vm.entity.lon, vm.entity.lat]).addTo(map);
    },
    encode (url) {
      var vm = this
      vm.$router.push({
        name: 'Redirect',
        params: {
          url: url
        }
      })
    },
    url: function (prop) {
      let expression = /(.*?)\[(.*?)\]/gm
      let result = expression.exec(prop)
      if (result) {
        return result
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../src/assets/css/stylesheet';
  .href {
    color: #007bff;
    text-decoration: none;
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
    cursor: pointer;
  }
  .href:hover {
    color: #0056b3;
    text-decoration: underline;
  }
</style>
