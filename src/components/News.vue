<template>
  <div class="articles">
    <spinner :active="network" spinner="spinner" color="rgba(239,98,108,1)"/>
    <news-article v-if="results.articles" v-for="article in results.articles" v-bind:key="article.date" :title="article.title" :desc="article.desc" :date="article.date" :source="article.source" :url="article.link" :image="article.image"></news-article>
  </div>
</template>

<script>
import NewsArticle from './news.article.vue'
import Spinner from 'vue-element-loading'
export default {
  name: 'News',
  components: {NewsArticle, Spinner},
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      network: true,
      results: false
    }
  },
  methods: {
    initialise: function () {
      var vm = this
      vm.network = true
      this.$http('news/b/' + vm.id).then(r => {
        vm.results = r.data
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
