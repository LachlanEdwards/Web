<template>
    <div class="apartment-card">
      <div class="card-template">
        <div class="header">
          <div class="type">Apartment</div>
          <div class="rating">
            <div class="points">aggregate: {{ rating }}</div>
          </div>
        </div>
        <div class="main">
          <div class="inline-image">
            <div class="image">
              <div class="image-el" v-bind:style="'background-image: url('+source+')'"></div>
            </div>
            <div class="desc">
              <h6 class="subtitle">{{ bed }} <i class="fas fa-bed"></i> {{ bath }} <i class="fas fa-bath"></i> {{ car }} <i class="fas fa-car"></i> &middot; ${{ cost.toLocaleString() }}<span v-if="frequency"> /{{ frequency }}</span></h6>
              <h3 class="title">{{ title }}</h3>
            </div>
          </div>
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
      required: false
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
  .box_shadow_default_small {
    box-shadow: 0px 0px 0px 4px rgba(255,255,255,0.5);
    -webkit-box-shadow: 0px 0px 0px 4px rgba(255,255,255,0.5);
    -moz-box-shadow: 0px 0px 0px 4px rgba(255,255,255,0.5);
  }
  .apartment-card:hover {
    .box_shadow_disp();
    transform: scale(1.02);
  }
  .apartment-card {
    transition: box-shadow .5s, transform .5s;
    cursor: pointer;
    overflow: hidden;
    .card-template {
      .header {
        .purple_gradient_less();
        padding: 1em;
        text-transform: uppercase;
        font-size: 12px;
        color: @white;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        .type, .rating {
          color: @white;
          letter-spacing: 1px;
          font-size: 10px;
        }
      }
      .main {
        padding: 1em;
        .purple_gradient();
        .inline-image {
          display: flex;
          .image {
            margin-right: 1em;
            .image-el {
              width: 44px;
              height: 44px;
              -webkit-border-radius: 100%;
              -moz-border-radius: 100%;
              border-radius: 100%;
              .box_shadow_default_small();
              background-position: center center;
              background-size: cover;
            }
          }
          .desc {
            overflow: hidden;
            .subtitle {
              font-size: 14px;
              color: @white;
              opacity: 0.75;
              margin-bottom: 0;
              span {
                font-size: 10px;
                font-weight: bold;
                letter-spacing: 1px;
              }
            }
            .title {
              font-size: 24px;
              color: @white;
              opacity: 1;
              font-weight: bold;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
</style>
