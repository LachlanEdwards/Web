<template>
    <div class="apartment_card">
      <div class="card_template">
        <div class="header">
          <div class="type">Apartment</div>
          <div class="rating">
            <div class="points">{{ rating }}</div>
          </div>
        </div>
        <div class="main">
          <div class="inline_image">
            <div class="image">
              <div class="image_el" v-bind:style="'background-image: url('+source+')'"></div>
            </div>
            <div class="desc">
              <h6 class="subtitle">{{ bed }} <i class="fas fa-bed"></i> {{ bath }} <i class="fas fa-bath"></i> {{ car }} <i class="fas fa-car"></i> &middot; ${{ cost.toLocaleString() }}<small v-if="frequency"> PER {{ frequency }}</small></h6>
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
  @white: #FFFFFF;
  @sm: 576px;
  @md: 768px;
  @lg: 992px;
  @xl: 1200px;
  .gradient_blue {
    background: rgba(37,78,112,1);
    background: -moz-linear-gradient(left, rgba(37,78,112,1) 0%, rgba(55,113,142,1) 100%);
    background: -webkit-gradient(left top, right top, color-stop(0%, rgba(37,78,112,1)), color-stop(100%, rgba(55,113,142,1)));
    background: -webkit-linear-gradient(left, rgba(37,78,112,1) 0%, rgba(55,113,142,1) 100%);
    background: -o-linear-gradient(left, rgba(37,78,112,1) 0%, rgba(55,113,142,1) 100%);
    background: -ms-linear-gradient(left, rgba(37,78,112,1) 0%, rgba(55,113,142,1) 100%);
    background: linear-gradient(to right, rgba(37,78,112,1) 0%, rgba(55,113,142,1) 100%);
  }
  .gradient_red {
    background: rgba(239,98,108,1);
    background: -moz-linear-gradient(left, rgba(239,98,108,1) 0%, rgba(250,130,97,1) 100%);
    background: -webkit-gradient(left top, right top, color-stop(0%, rgba(239,98,108,1)), color-stop(100%, rgba(250,130,97,1)));
    background: -webkit-linear-gradient(left, rgba(239,98,108,1) 0%, rgba(250,130,97,1) 100%);
    background: -o-linear-gradient(left, rgba(239,98,108,1) 0%, rgba(250,130,97,1) 100%);
    background: -ms-linear-gradient(left, rgba(239,98,108,1) 0%, rgba(250,130,97,1) 100%);
    background: linear-gradient(to right, rgba(239,98,108,1) 0%, rgba(250,130,97,1) 100%);
  }
  .gradient_blue_opac {
    background: rgba(37,78,112,0.75);
    background: -moz-linear-gradient(left, rgba(37,78,112,1) 0%, rgba(55,113,142,0.75) 100%);
    background: -webkit-gradient(left top, right top, color-stop(0%, rgba(37,78,112,0.75)), color-stop(100%, rgba(55,113,142,1)));
    background: -webkit-linear-gradient(left, rgba(37,78,112,1) 0%, rgba(55,113,142,0.75) 100%);
    background: -o-linear-gradient(left, rgba(37,78,112,1) 0%, rgba(55,113,142,0.75) 100%);
    background: -ms-linear-gradient(left, rgba(37,78,112,1) 0%, rgba(55,113,142,0.75) 100%);
    background: linear-gradient(to right, rgba(37,78,112,1) 0%, rgba(55,113,142,0.75) 100%);
  }
  .box_shadow_disp {
    -webkit-box-shadow: 0px 0px 100px 0px rgba(0,0,0,0.25);
    -moz-box-shadow: 0px 0px 100px 0px rgba(0,0,0,0.25);
    box-shadow: 0px 0px 100px 0px rgba(0,0,0,0.25);
  }
  .bg_opac {
    background: rgba(255,255,255,0.5);
  }
  .box_shadow_default {
    box-shadow: 0px 0px 0px 0.5em rgba(255,255,255,0.5);
    -webkit-box-shadow: 0px 0px 0px 0.5em rgba(255,255,255,0.5);
    -moz-box-shadow: 0px 0px 0px 0.5em rgba(255,255,255,0.5);
  }
  .box_shadow_default_small {
    box-shadow: 0px 0px 0px 4px rgba(255,255,255,0.5);
    -webkit-box-shadow: 0px 0px 0px 4px rgba(255,255,255,0.5);
    -moz-box-shadow: 0px 0px 0px 4px rgba(255,255,255,0.5);
  }
  .apartment_card:hover {
    .box_shadow_disp();
    transform: scale(1.02);
  }
  .apartment_card {
    transition: box-shadow .5s, transform .5s;
    cursor: pointer;
    border-radius: 3px;
    overflow: hidden;
    .card_template {
      .header {
        .gradient_red_less();
        padding: 1em;
        text-transform: uppercase;
        font-size: 12px;
        color: @white;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        .type {}
        .rating {
          color: @white;
          box-shadow: 0px 0px 0px 4px rgba(255,255,255,0.5);
          -webkit-box-shadow: 0px 0px 0px 2px rgba(255,255,255);
          -moz-box-shadow: 0px 0px 0px 1px rgba(255,255,255,0.5);
          border-radius: 100%;
          width: 18px;
          text-align: center;
        }
      }
      .main {
        padding: 1em;
        .gradient_red();
        .inline_image {
          display: flex;
          .image {
            margin-right: 1em;
            .image_el {
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
