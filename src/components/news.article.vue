<template>
  <div class="article">
    <div class="content">
      <h4 class="title"><a :href="url" target="_blank">{{ title }}</a></h4>
      <p class="desc">{{ desc }}</p>
      <div class="meta">{{ source }} &middot; {{ date }}</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable semi */
export default {
  name: 'newsArticle',
  props: {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../src/assets/css/style';
  .article {
    margin: 0 0 2em 0;
    .content {
      .title {
        a {
          font-weight: bold;
          color: @black;
        }
        a:hover {
          color: @purple;
          text-decoration: underline;
        }
      }
      .meta {
        .small_text();
      }
    }
  }
</style>
