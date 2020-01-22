<template>
  <div class="ur">
    <div class="card mb-3" style="max-width: 100%">
      <div class="row no-gutters">
        <div class="col-md-1">
          <div class="rate">{{ score }}</div>
        </div>
        <div class="col-md-11">
          <div class="card-body">
            <h5 class="card-title">{{ user }}</h5>
            <p class="card-text">{{ text }}</p>
            <p class="card-text"><small class="text-muted">{{ date }}</small></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable semi */
export default {
  name: 'user_rating',
  props: {
    image: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../src/assets/css/stylesheet';
  .ur {
    .card {
      border-color: @border-grey;
      .rate {
        width: 100%;
        position: absolute;
        font-size: 72px;
        font-weight: bold;
        color: @theme;
        line-height: unset;
        text-align: center;
      }
    }
  }
</style>
