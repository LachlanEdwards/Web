<template>
  <div class="article">
    <div class="image">
      <img :src="image" :alt="title" />
    </div>
    <div class="article-content">
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
    },
    image: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../src/assets/css/stylesheet';
  .article {
    margin: 0 0 2em 0;
    display: flex;
    flex-direction: row;
    .image {
      width: 64px;
      height: 64px;
      margin: 0 1em 0 0;
      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    .article-content {
      margin: 0;
      .title {
        margin: 0;
        a {
          font-weight: bold;
          color: @black;
        }
        a:hover {
          color: @theme;
          text-decoration: underline;
        }
      }
      .desc {
        margin: 0;
        color: @default-grey;
      }
      .meta {
        font-size: 10px;
        color: @default-grey;
      }
    }
  }
</style>
