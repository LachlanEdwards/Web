<template>
  <div class="user-review">
    <div class="title-card">
      <div class="image">
        <img alt="" :src="image">
      </div>
      <div class="meta">
        <div class="user">{{ user }}</div>
        <div class="date">{{ date }}</div>
        <div class="score">
          <div class="prop cumulative">
            <div class="title">Cumulative</div>
            <div class="value">{{ cumulative }}</div>
          </div>
          <div class="prop">
            <div class="title">Management</div>
            <div class="value">{{ management }}</div>
          </div>
          <div class="prop">
            <div class="title">Functionality</div>
            <div class="value">{{ functionality }}</div>
          </div>
          <div class="prop">
            <div class="title">Facilities</div>
            <div class="value">{{ facilities }}</div>
          </div>
          <div class="prop">
            <div class="title">Neighbourhood</div>
            <div class="value">{{ neighbourhood }}</div>
          </div>
          <div class="prop">
            <div class="title">Culture</div>
            <div class="value">{{ culture }}</div>
          </div>
          <div class="prop">
            <div class="title">Fittings</div>
            <div class="value">{{ fittings }}</div>
          </div>
          <div class="prop">
            <div class="title">Noise</div>
            <div class="value">{{ noise }}</div>
          </div>
        </div>
        <div class="text">
          <p>{{ text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable semi */
export default {
  name: 'user_review',
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
    cumulative: {
      type: Number,
      required: true
    },
    management: {
      type: Number,
      required: true
    },
    functionality: {
      type: Number,
      required: true
    },
    fittings: {
      type: Number,
      required: true
    },
    facilities: {
      type: Number,
      required: true
    },
    culture: {
      type: Number,
      required: true
    },
    neighbourhood: {
      type: Number,
      required: true
    },
    noise: {
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
  .user-review {
    .title-card {
      margin-top: 1em;
      display: flex;
      flex-direction: row;
      .image {
        display: flex;
        flex-direction: column;
        margin-right: 1em;
        width: 42px;
        height: 42px;
        img {
          width: 42px;
          height: 42px;
          border-radius: 100%;
          vertical-align: top;
        }
      }
      .meta {
        display: flex;
        flex: 1;
        flex-direction: column;
        vertical-align: top;
        .user {
          font-weight: bold;
          font-size: 16px;
        }
        .date {
          text-transform: uppercase;
          color: @grey;
          font-size: 12px;
        }
        .score {
          .prop {
            border: 1px solid @grey;
            display: inline-block;
            font-size: 0;
            margin-top: 7px;
            .title {
              background-color: @grey;
              display: inline-block;
              padding: .5em 1em;
              color: @white;
              font-size: 12px;
            }
            .value {
              display: inline-block;
              padding: .5em 1em;
              font-size: 12px;
            }
          }
          .prop.cumulative {
            border: 1px solid @red;
            .title {
              .gradient_red();
            }
          }
        }
        .text {
          margin-top: 1em;
        }
      }
    }
  }
</style>
