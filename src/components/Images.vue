<template>
  <div class="images">
    <image-modal v-if="overlay.show" :source="overlay.source.url" v-on:exit="overlay.show = false"></image-modal>
    <spinner :active="network" spinner="spinner" color="rgba(239,98,108,1)"/>
    <div class="image-grid-container">
      <div v-for="media in library.multimedia.content" class="image-grid-item" v-bind:key="media">
        <img :src="media.url" :alt="media.url" width="100%" height="100%" v-on:click="ioverlay(media)">
      </div>
    </div>
    <div class="switch">
      <div class="switch-position-center">
        <div class="prev switch-nav" v-if="library.page > 0" onclick="window.scrollTo(0, 0);" v-on:click="library.page--; initialise();"><i class="icon ion-ios-arrow-back"></i></div>
        <div class="disabled prev switch-nav" v-else><i class="icon ion-ios-arrow-back"></i></div>
        <div class="curr">{{ library.page + 1 }} ... {{ library.multimedia.totalPages}}</div>
        <div class="nex switch-nav" v-if="(library.multimedia.totalPages - 1) > library.page" onclick="window.scrollTo(0, 0);" v-on:click="library.page++; initialise();"><i class="icon ion-ios-arrow-forward"></i></div>
        <div class="disabled nex switch-nav" v-else><i class="icon ion-ios-arrow-forward"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from 'vue-element-loading'
import ImageModal from './image.modal'
export default {
  name: 'ApartmentLease',
  components: {ImageModal, Spinner},
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      network: true,
      overlay: {
        show: false,
        source: null
      },
      library: {
        page: 0,
        multimedia: false
      }
    }
  },
  methods: {
    ioverlay: function (source) {
      var vm = this
      vm.overlay.source = source
      vm.overlay.show = true
    },
    initialise: function () {
      var vm = this
      vm.network = true
      this.$http('building/id/' + vm.id + '/multimedia?page=' + vm.library.page).then(r => {
        vm.library.multimedia = r.data
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
  .image-grid-container {
    display: grid;
    grid-gap: 40px;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(50px, auto);
    .image-grid-item:nth-child(1) {
      grid-row: 1 / 4;
      grid-column: 1;
    }
    .image-grid-item:nth-child(2) {
      grid-row: 1 / 3;
      grid-column: 2;
    }
    .image-grid-item:nth-child(3) {
      grid-row: 1 / 4;
      grid-column: 3;
    }
    .image-grid-item:nth-child(4) {
      grid-row: 4 / 7;
      grid-column: 1;
    }
    .image-grid-item:nth-child(5) {
      grid-row: 3 / 7;
      grid-column: 2;
    }
    .image-grid-item:nth-child(6) {
      grid-row: 4 / 6;
      grid-column: 3;
    }
    .image-grid-item {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .images {
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
</style>
