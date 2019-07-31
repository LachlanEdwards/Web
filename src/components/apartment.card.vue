<template>
    <div class="apartment-card">
      <div class="card-template">
        <div class="image">
          <div class="image-el" v-bind:style="'background-image: url('+source+')'"></div>
        </div>
        <div class="specs">
          <div class="spec"><i class="icon-bed-outline"></i> {{ bed }}</div>
          <div class="spec"><i class="icon-bath-outline"></i> {{ bath }}</div>
          <div class="spec"><i class="icon-bath-outline"></i> {{ car }}</div>
        </div>
        <div class="desc">
          <h3 class="cost"><div class="no">Apt. {{ title }}</div><div class="pw">${{ cost.toLocaleString() }}{{ frequency }}</div></h3>
        </div>
      </div>
    </div>
</template>

<script>
/* eslint-disable semi */
export default {
  name: 'apartment_card',
  props: {
    frequency: {
      type: String,
      required: false,
      default: ''
    },
    bed: {
      type: Number,
      required: true
    },
    bath: {
      type: Number,
      required: true
    },
    car: {
      type: Number,
      required: true
    },
    cost: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../src/assets/css/style';
  @default: #06d6a0;
  @grey: #efefef;
  @darker_grey: #8e8e8e;
  .apartment-card:hover {
  }
  .apartment-card {
    border: 1px solid @grey;
    transition: box-shadow .5s;
    cursor: pointer;
    overflow: hidden;
    border-radius: 3px;
    .card-template {
      .image {
        width: inherit;
        height: 300px;
        .image-el {
          width: inherit;
          height: inherit;
          background-position: center center;
          background-size: cover;
        }
      }
      .specs {
        float: right;
        display: inline-flex;
        flex-direction: row;
        margin: -18.5px 1em 0 0;
        background: @white;
        padding: .5em 1em;
        border: 1px solid @theme;
        border-radius: 3em;
        flex-wrap: wrap;
        -webkit-box-shadow: 0px 0px 1em 0px rgba(0,0,0,0.15);
        -moz-box-shadow: 0px 0px 1em 0px rgba(0,0,0,0.15);
        box-shadow: 0px 0px 1em 0px rgba(0,0,0,0.15);
        .spec:not(:last-child) {
          margin: 0 1em 0 0;
        }
        .spec {
          font-weight: normal;
          .ion {
            display: inline;
          }
        }
      }
      .desc {
        margin: 2em 0 0 0;
        padding: 1em;
        .date {
          margin: 0 0 .5em 0;
        }
        .cost {
          font-size: 24px;
          opacity: 1;
          font-weight: bold;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          margin-bottom: 0;
          display: inline-block;
          .pw, .no {
            display: inline-block;
          }
          .no {
            color: @black;
            padding: .25em .5em .25em 0;
          }
          .pw {
            color: @white;
            .theme();
            padding: .25em .5em;
          }
        }
      }
    }
  }
</style>
