<template>
    <div class="post-item">
      <div class="post-meta">
        <h1 class="post-title">{{ title }}</h1>
        <p class="post-datetime">{{ parseDate(datetime) }}</p>
      </div>
      <div class="post-body">
        <p v-html="markdown(body)"></p>
      </div>
    </div>
</template>

<script>
/* eslint-disable semi */
import marked from 'marked';
export default {
  name: 'blog_post',
  data () {
    return {
      md: null
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    datetime: {
      type: Number,
      required: true
    }
  },
  methods: {
    markdown: function (input) {
      return marked(input, { sanitize: true })
    },
    parseDate: function (date) {
      var formatted = new Date(date);
      return formatted.toLocaleString();
    }
  },
  created: function () {
    var vm = this
    vm.md = vm.markdown(vm.body);
  }
}
</script>

<style lang="less" scoped>
  @import '../../src/assets/css/stylesheet';
  .post-item {
    margin: 0 0 4rem 0;
    border-radius: 1em;
    .post-meta {
      font-weight: bold;
      padding: 1.5rem;
      text-transform: capitalize;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .post-datetime, .post-title {
        padding: 0;
        margin: 0;
      }
      .post-title {
        font-weight: bold;
      }
      .post-datetime {
        text-transform: uppercase;
      }
    }
    .post-body {
      color: @default-grey;
      padding: 1.5rem;
    }
  }
</style>
