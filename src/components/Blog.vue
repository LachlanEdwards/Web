<template>
  <div class="posts">
    <spinner :active="network" spinner="spinner" color="rgba(239,98,108,1)"/>
    <div v-if="blog.posts" class="prop" v-for="el in blog.posts.content" v-bind:key="el.id">
      <blog-post :title="el.title" :datetime="el.date" :body="el.body"></blog-post>
    </div>
    <div class="switch">
      <div class="switch-position-center">
        <div class="prev switch-nav" v-if="blog.page > 0" onclick="window.scrollTo(0, 0);" v-on:click="blog.page--; initialise();"><i class="icon ion-ios-arrow-back"></i></div>
        <div class="disabled prev switch-nav" v-else><i class="icon ion-ios-arrow-back"></i></div>
        <div class="curr">{{ blog.page + 1 }} ... {{ blog.posts.totalPages}}</div>
        <div class="nex switch-nav" v-if="(blog.posts.totalPages - 1) > blog.page" onclick="window.scrollTo(0, 0);" v-on:click="blog.page++; initialise();"><i class="icon ion-ios-arrow-forward"></i></div>
        <div class="disabled nex switch-nav" v-else><i class="icon ion-ios-arrow-forward"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from './blog.post.vue'
import Options from './options'
import Spinner from 'vue-element-loading'
export default {
  name: 'ApartmentLease',
  components: {BlogPost, Options, Spinner},
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      network: true,
      blog: {
        page: 0,
        posts: false
      }
    }
  },
  methods: {
    initialise: function () {
      var vm = this
      vm.network = true
      this.$http('building/id/' + vm.id + '/blog?page=' + vm.blog.page).then(r => {
        vm.blog.posts = r.data
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
.posts {
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
